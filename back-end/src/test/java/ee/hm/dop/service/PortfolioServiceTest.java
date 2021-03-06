package ee.hm.dop.service;

import static org.easymock.EasyMock.createMock;
import static org.easymock.EasyMock.expect;
import static org.easymock.EasyMock.newCapture;
import static org.easymock.EasyMock.replay;
import static org.easymock.EasyMock.verify;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.fail;

import ee.hm.dop.dao.PortfolioDAO;
import ee.hm.dop.model.Portfolio;
import ee.hm.dop.model.Recommendation;
import ee.hm.dop.model.Role;
import ee.hm.dop.model.User;
import ee.hm.dop.model.Visibility;
import org.easymock.Capture;
import org.easymock.EasyMock;
import org.easymock.EasyMockRunner;
import org.easymock.IAnswer;
import org.easymock.Mock;
import org.easymock.TestSubject;
import org.junit.Test;
import org.junit.runner.RunWith;

@RunWith(EasyMockRunner.class)
public class PortfolioServiceTest {

    @TestSubject
    private PortfolioService portfolioService = new PortfolioService();

    @Mock
    private PortfolioDAO portfolioDAO;

    @Mock
    private SolrEngineService solrEngineService;

    @Test
    public void get() {
        int portfolioId = 125;
        Portfolio portfolio = createMock(Portfolio.class);
        expect(portfolioDAO.findByIdNotDeleted(portfolioId)).andReturn(portfolio);
        expect(portfolio.getVisibility()).andReturn(Visibility.PUBLIC);
        expect(portfolio.isDeleted()).andReturn(false);

        replayAll(portfolio);

        Portfolio result = portfolioService.get(portfolioId, null);

        verifyAll(portfolio);

        assertSame(portfolio, result);
    }

    @Test
    public void incrementViewCount() {
        Portfolio portfolio = new Portfolio();
        portfolio.setId(99L);
        Portfolio originalPortfolio = createMock(Portfolio.class);
        expect(portfolioDAO.findByIdFromAll(portfolio.getId())).andReturn(originalPortfolio);
        portfolioDAO.incrementViewCount(originalPortfolio);
        solrEngineService.updateIndex();

        replayAll(originalPortfolio);

        portfolioService.incrementViewCount(portfolio);

        verifyAll(originalPortfolio);
    }

    @Test
    public void incrementViewCountPortfolioNotFound() {
        Portfolio portfolio = new Portfolio();
        portfolio.setId(99L);
        expect(portfolioDAO.findByIdFromAll(portfolio.getId())).andReturn(null);

        replayAll();

        try {
            portfolioService.incrementViewCount(portfolio);
            fail("Exception expected");
        } catch (Exception e) {
            // expected
        }

        verifyAll();
    }

    @Test
    public void addRecommendation() {
        Capture<Portfolio> capturedPortfolio = newCapture();

        User user = new User();
        user.setId(111L);
        user.setRole(Role.USER);

        User admin = new User();
        admin.setId(222L);
        admin.setRole(Role.ADMIN);

        Portfolio portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setTitle("Super title");

        Portfolio originalPortfolio = new Portfolio();
        originalPortfolio.setId(1L);
        originalPortfolio.setTitle("Super title");
        originalPortfolio.setCreator(user);

        expect(portfolioDAO.findByIdNotDeleted(1L)).andReturn(originalPortfolio);
        expectPortfolioUpdate(capturedPortfolio);
        solrEngineService.updateIndex();

        replayAll();

        Recommendation returnedRecommendation = portfolioService.addRecommendation(portfolio, admin);

        verifyAll();

        Recommendation recommendation = capturedPortfolio.getValue().getRecommendation();
        assertNotNull(recommendation);
        assertEquals(admin.getId(), recommendation.getCreator().getId());
        assertEquals(recommendation, returnedRecommendation);
    }

    private void expectPortfolioUpdate(Capture<Portfolio> capturedPortfolio) {
        expect(portfolioDAO.update(EasyMock.capture(capturedPortfolio))).andAnswer(new IAnswer<Portfolio>() {
            @Override
            public Portfolio answer() throws Throwable {
                return capturedPortfolio.getValue();
            }
        });
    }

    @Test
    public void removeRecommendation() {
        Capture<Portfolio> capturedPortfolio = newCapture();

        User user = new User();
        user.setId(111L);
        user.setRole(Role.USER);

        User admin = new User();
        admin.setId(222L);
        admin.setRole(Role.ADMIN);

        Portfolio portfolio = new Portfolio();
        portfolio.setId(1L);
        portfolio.setTitle("Super title");

        Portfolio originalPortfolio = new Portfolio();
        originalPortfolio.setId(1L);
        originalPortfolio.setTitle("Super title");
        originalPortfolio.setCreator(user);

        expect(portfolioDAO.findByIdNotDeleted(1L)).andReturn(originalPortfolio);
        expectPortfolioUpdate(capturedPortfolio);
        solrEngineService.updateIndex();

        replayAll();

        portfolioService.removeRecommendation(portfolio, admin);

        verifyAll();

        Recommendation recommendation = capturedPortfolio.getValue().getRecommendation();
        assertNull(recommendation);
    }

    private void replayAll(Object... mocks) {
        replay(portfolioDAO, solrEngineService);

        if (mocks != null) {
            for (Object object : mocks) {
                replay(object);
            }
        }
    }

    private void verifyAll(Object... mocks) {
        verify(portfolioDAO, solrEngineService);

        if (mocks != null) {
            for (Object object : mocks) {
                verify(object);
            }
        }
    }

}
