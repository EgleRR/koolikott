package ee.hm.dop.dao;

import ee.hm.dop.model.ChangedLearningObject;

import java.util.List;

public class ChangedLearningObjectDao extends AbstractDao<ChangedLearningObject> {

    public List<ChangedLearningObject> getAllByLearningObject(long learningObjectId) {
        return getEntityManager().createQuery("FROM ChangedLearningObject clo WHERE clo.learningObject.id = :id", entity()) //
                .setParameter("id", learningObjectId).getResultList();
    }

    public boolean removeById(long id) {
        return getEntityManager().createQuery("DELETE FROM ChangedLearningObject clo WHERE clo.id = :id")
                .setParameter("id", id)
                .executeUpdate() > 0;
    }

    public boolean removeAllByLearningObject(long id) {
        return getEntityManager().createQuery("DELETE FROM ChangedLearningObject clo WHERE clo.learningObject.id = :id")
                .setParameter("id", id)
                .executeUpdate() > 0;
    }

    public long getCount() {
        return (long) getEntityManager().createQuery("SELECT COUNT(DISTINCT clo.learningObject) FROM ChangedLearningObject clo").getSingleResult();
    }
}