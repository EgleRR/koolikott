package ee.hm.dop.dao;

import java.util.List;

import javax.persistence.Query;
import javax.persistence.TypedQuery;

import ee.hm.dop.model.LearningObject;
import ee.hm.dop.model.Portfolio;
import ee.hm.dop.model.User;

public class PortfolioDAO extends LearningObjectDAO {

    @Override
    public Portfolio findByIdNotDeleted(long portfolioId) {
        return castTo(Portfolio.class, super.findByIdNotDeleted(portfolioId));
    }

    public Portfolio findDeletedById(long portfolioId) {
        return findById(portfolioId, true);
    }

    private Portfolio findById(long portfolioId, boolean includeDeleted) {
        TypedQuery<Portfolio> findById = createQuery(
                "SELECT p FROM Portfolio p WHERE p.id = :id AND p.deleted = :includeDeleted", Portfolio.class);

        TypedQuery<Portfolio> query = findById.setParameter("id", portfolioId).setParameter("includeDeleted",
                includeDeleted);
        return getSingleResult(query, Portfolio.class);
    }

    public Portfolio findByIdFromAll(long portfolioId) {
        return castTo(Portfolio.class, super.findById(portfolioId));
    }

    public List<Portfolio> findDeletedPortfolios() {
        TypedQuery<Portfolio> query = createQuery("SELECT p FROM Portfolio p WHERE p.deleted = true", Portfolio.class);
        return query.getResultList();
    }

    public Long findCountByCreator(User creator) {
        Query query = getEntityManager()
                .createQuery("SELECT count(*) FROM Portfolio p WHERE p.creator = :creator AND p.deleted = false")
                .setParameter("creator", creator);
        return (Long) query.getSingleResult();
    }

    /**
     * Finds all portfolios contained in the idList. There is no guarantee about
     * in which order the portfolios will be in the result list.
     *
     * @param idList the list with portfolio identifiers
     * @return a list of portfolios specified by idList
     */
    @Override
    public List<LearningObject> findAllById(List<Long> idList) {
        List<LearningObject> learningObjects = super.findAllById(idList);
        removeNot(Portfolio.class, learningObjects);
        return learningObjects;
    }

    @Override
    public List<LearningObject> findByCreator(User creator, int start, int maxResults) {
        List<LearningObject> learningObjects = super.findByCreator(creator, start, maxResults);
        removeNot(Portfolio.class, learningObjects);
        return learningObjects;
    }

    public Long findDeletedPortfoliosCount() {
        Query query = getEntityManager().createQuery("SELECT count(*) FROM Portfolio p WHERE p.deleted = true");
        return (Long) query.getSingleResult();
    }

    public List<Portfolio> findNewestPortfolios(int numberOfMaterials, int startPosition) {
        return createQuery("FROM Portfolio port WHERE port.deleted = false ORDER BY added DESC, id DESC",
                Portfolio.class).setFirstResult(startPosition).setMaxResults(numberOfMaterials)
                .getResultList();
    }
}
