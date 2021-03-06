package ee.hm.dop.dao;

import ee.hm.dop.common.test.DatabaseTestBase;
import ee.hm.dop.model.Chapter;
import ee.hm.dop.model.Comment;
import ee.hm.dop.model.LearningObject;
import ee.hm.dop.model.Portfolio;
import ee.hm.dop.model.Recommendation;
import ee.hm.dop.model.TargetGroupEnum;
import ee.hm.dop.model.User;
import ee.hm.dop.model.taxon.Subject;
import org.joda.time.DateTime;
import org.junit.Test;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class PortfolioDAOTest extends DatabaseTestBase {

    @Inject
    private PortfolioDAO portfolioDAO;

    @Inject
    private UserDAO userDAO;

    private int threadsDone;

    @Test
    public void findById() {
        Portfolio portfolio = portfolioDAO.findByIdNotDeleted(101);

        assertPortfolio1(portfolio);
    }

    @Test
    public void findByIdWhenPortfolioDoesNotExist() {
        Portfolio portfolio = portfolioDAO.findByIdNotDeleted(100000);
        assertNull(portfolio);
    }

    @Test
    public void findByIdOnlyMandatoryFields() {
        Long id = 102L;
        Portfolio portfolio = portfolioDAO.findByIdNotDeleted(id);

        assertNotNull(portfolio);
        assertEquals(id, portfolio.getId());
        assertEquals("New ways how to do it", portfolio.getTitle());
        assertEquals(new DateTime("2012-12-29T08:00:01.000+02:00"), portfolio.getAdded());
        assertTrue(portfolio.getTaxons().size() == 0);
        assertEquals(new Long(4), portfolio.getCreator().getId());
        assertEquals("voldemar.vapustav2", portfolio.getCreator().getUsername());
        assertNull(portfolio.getSummary());
        assertEquals(new Long(14), portfolio.getViews());
        assertTrue(portfolio.getChapters().isEmpty());
        assertTrue(portfolio.getTags().isEmpty());
    }

    @Test
    public void findAllById() {
        List<Long> idList = new ArrayList<>();
        idList.add(101L);
        idList.add(102L);
        idList.add(103L);

        List<LearningObject> result = portfolioDAO.findAllById(idList);

        assertEquals(3, result.size());

        for (LearningObject portfolio : result) {
            idList.remove(portfolio.getId());
        }

        assertTrue(idList.isEmpty());
    }

    @Test
    public void findAllByIdNoResult() {
        List<Long> idList = new ArrayList<>();
        idList.add((long) 90123);

        List<LearningObject> result = portfolioDAO.findAllById(idList);

        assertEquals(0, result.size());
    }

    @Test
    public void findAllByIdEmptyList() {
        List<LearningObject> result = portfolioDAO.findAllById(new ArrayList<>());

        assertEquals(0, result.size());
    }

    @Test
    public void findByCreator() {
        User creator = new User();
        creator.setId(6L);

        List<LearningObject> portfolios = portfolioDAO.findByCreator(creator, 0, Integer.MAX_VALUE);
        assertEquals(3, portfolios.size());
        DateTime previous = null;

        for (LearningObject portfolio : portfolios) {
            assertEquals("mati.maasikas-vaarikas", portfolio.getCreator().getUsername());
            if (portfolio.getId().equals(101L)) {
                assertPortfolio1((Portfolio) portfolio);
            }

            if (previous != null) {
                assertTrue(previous.isAfter(portfolio.getAdded()));
            }

            previous = portfolio.getAdded();
        }
    }

    private void assertPortfolio1(Portfolio portfolio) {
        assertNotNull(portfolio);
        assertEquals(Long.valueOf(101), portfolio.getId());
        assertEquals("The new stock market", portfolio.getTitle());
        assertEquals(new DateTime("2000-12-29T08:00:01.000+02:00"), portfolio.getAdded());
        assertEquals(new DateTime("2004-12-29T08:00:01.000+02:00"), portfolio.getUpdated());

        Subject mathematics = (Subject) portfolio.getTaxons().get(0);
        assertEquals("Mathematics", mathematics.getName());
        assertEquals(new Long(21), mathematics.getId());
        assertEquals(2, mathematics.getDomain().getSubjects().size());
        assertEquals(2, mathematics.getDomain().getEducationalContext().getDomains().size());

        assertEquals(new Long(6), portfolio.getCreator().getId());
        assertEquals("mati.maasikas-vaarikas", portfolio.getCreator().getUsername());
        assertEquals(new Long(5), portfolio.getOriginalCreator().getId());
        assertEquals("The changes after 2008.", portfolio.getSummary());
        assertEquals(new Long(95455215), portfolio.getViews());
        assertEquals(5, portfolio.getTags().size());

        List<Chapter> chapters = portfolio.getChapters();
        assertEquals(3, chapters.size());
        Chapter chapter = chapters.get(0);
        assertEquals(new Long(1), chapter.getId());
        assertEquals("The crisis", chapter.getTitle());
        assertNull(chapter.getText());
        List<LearningObject> materials = chapter.getContentRows().get(0).getLearningObjects();
        assertEquals(1, materials.size());
        assertEquals(new Long(1), materials.get(0).getId());
        assertEquals(2, chapter.getSubchapters().size());
        Chapter subchapter1 = chapter.getSubchapters().get(0);
        assertEquals(new Long(4), subchapter1.getId());
        assertEquals("Subprime", subchapter1.getTitle());
        assertNull(subchapter1.getText());
        materials = subchapter1.getContentRows().get(0).getLearningObjects();
        assertEquals(1, materials.size());
        assertEquals(new Long(8), materials.get(0).getId());
        Chapter subchapter2 = chapter.getSubchapters().get(1);
        assertEquals(new Long(5), subchapter2.getId());
        assertEquals("The big crash", subchapter2.getTitle());
        assertEquals("Bla bla bla\nBla bla bla bla bla bla bla", subchapter2.getText());
        materials = subchapter2.getContentRows().get(0).getLearningObjects();
        assertEquals(1, materials.size());
        assertEquals(new Long(3), materials.get(0).getId());

        chapter = chapters.get(1);
        assertEquals(new Long(3), chapter.getId());
        assertEquals("Chapter 2", chapter.getTitle());
        assertEquals("Paragraph 1\n\nParagraph 2\n\nParagraph 3\n\nParagraph 4", chapter.getText());
        assertEquals(1, chapter.getContentRows().get(0).getLearningObjects().size());
        assertEquals(0, chapter.getSubchapters().size());

        chapter = chapters.get(2);
        assertEquals(new Long(2), chapter.getId());
        assertEquals("Chapter 3", chapter.getTitle());
        assertEquals("This is some text that explains what is the Chapter 3 about.\nIt can have many lines\n\n\n"
                + "And can also have    spaces   betwenn    the words on it", chapter.getText());
        assertEquals(1, chapter.getContentRows().get(0).getLearningObjects().size());
        assertEquals(0, chapter.getSubchapters().size());

        assertEquals(2, portfolio.getTargetGroups().size());
        assertTrue(TargetGroupEnum.containsTargetGroup(portfolio.getTargetGroups(), TargetGroupEnum.ZERO_FIVE));
        assertTrue(TargetGroupEnum.containsTargetGroup(portfolio.getTargetGroups(), TargetGroupEnum.SIX_SEVEN));
        assertEquals("Lifelong_learning_and_career_planning", portfolio.getCrossCurricularThemes().get(0).getName());
        assertEquals("Cultural_and_value_competence", portfolio.getKeyCompetences().get(0).getName());
        assertFalse(portfolio.isDeleted());

        Recommendation recommendation = portfolio.getRecommendation();
        assertNotNull(recommendation);
        assertEquals(Long.valueOf(3), recommendation.getId());
    }

    @Test
    public void increaseViewCount() {
        Portfolio portfolio = portfolioDAO.findByIdNotDeleted(102);
        long originalViews = portfolio.getViews();
        assertSame(14L, originalViews);

        portfolio.setViews(++originalViews);
        portfolioDAO.incrementViewCount(portfolio);

        Portfolio returnedPortfolio = portfolioDAO.findByIdNotDeleted(102);
        assertSame(15L, returnedPortfolio.getViews());

        returnedPortfolio.setViews(14L);
        Portfolio originalPortfolio = (Portfolio) portfolioDAO.update(returnedPortfolio);
        assertSame(14L, originalPortfolio.getViews());
    }

    @Test
    public void increaseViewCountAtTheSameTime() {
        threadsDone = 0;

        class IncreaseViewCountThread implements Runnable {

            @Override
            public void run() {
                Portfolio portfolio = new Portfolio();
                portfolio.setId(2L);

                for (int i = 0; i < 10; i++) {
                    portfolioDAO.incrementViewCount(portfolio);
                }

                threadsDone++;
            }
        }

        int totalThreads = 10;
        for (int i = 0; i < totalThreads; i++) {
            new IncreaseViewCountThread().run();
        }

        while (threadsDone < totalThreads) {
            try {
                Thread.sleep(30);
            } catch (InterruptedException e) {
                // ignore
            }
        }

        Portfolio newPortfolio = portfolioDAO.findByIdNotDeleted(102L);
        assertSame(14L, newPortfolio.getViews());

        newPortfolio.setViews(14L);
        portfolioDAO.update(newPortfolio);
    }

    @Test
    public void addComment() {

        User user = userDAO.findUserByIdCode("37066990099");

        String unique_comment = "UNIQUE" + System.currentTimeMillis();

        Comment comment = new Comment();
        comment.setText(unique_comment);
        comment.setCreator(user);
        comment.setAdded(DateTime.now());

        Portfolio newPortfolio = portfolioDAO.findByIdNotDeleted(102L);
        newPortfolio.getComments().add(comment);

        portfolioDAO.update(newPortfolio);
    }

}
