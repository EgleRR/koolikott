package ee.hm.dop.dao;

import ee.hm.dop.model.ImproperContent;
import ee.hm.dop.model.LearningObject;
import ee.hm.dop.model.User;

import javax.persistence.Query;
import javax.persistence.TypedQuery;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ImproperContentDao extends AbstractDao<ImproperContent> {

    public ImproperContent findByLearningObjectAndCreator(LearningObject learningObject, User creator) {
        return findByField("learningObject", learningObject, "creator", creator, "deleted", false);
    }

    public List<ImproperContent> findByLearningObject(LearningObject learningObject) {
        return findByFieldList("learningObject", learningObject, "deleted", false);
    }

    public void deleteAll(List<ImproperContent> impropers) {
        List<Long> ids = impropers.stream().map(ImproperContent::getId).collect(Collectors.toList());
        setDeleted(ids);
    }

    public long getImproperPortfolioCount() {
        return ((BigInteger) getEntityManager()
                .createNativeQuery("SELECT Count(DISTINCT imp.learningObject) FROM ImproperContent imp " +
                        "INNER JOIN Portfolio p ON imp.learningObject=p.id " +
                        "INNER JOIN LearningObject lo ON lo.id=p.id " +
                        "WHERE imp.deleted = false " +
                        "AND lo.deleted=false")
                .getSingleResult())
                .longValue();
    }

    public long getImproperMaterialCount() {
        return ((BigInteger) getEntityManager()
                .createNativeQuery("SELECT Count(DISTINCT imp.learningObject) FROM ImproperContent imp " +
                        "INNER JOIN Material m ON imp.learningObject=m.id " +
                        "INNER JOIN LearningObject lo ON lo.id=m.id " +
                        "WHERE imp.deleted = false " +
                        "AND lo.deleted=false")
                .getSingleResult())
                .longValue();
    }
}