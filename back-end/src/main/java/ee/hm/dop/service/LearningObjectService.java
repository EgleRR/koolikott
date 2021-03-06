package ee.hm.dop.service;

import ee.hm.dop.dao.LearningObjectDAO;
import ee.hm.dop.dao.MaterialDAO;
import ee.hm.dop.dao.PortfolioDAO;
import ee.hm.dop.dao.UserFavoriteDAO;
import ee.hm.dop.model.ChangedLearningObject;
import ee.hm.dop.model.LearningObject;
import ee.hm.dop.model.Material;
import ee.hm.dop.model.ReducedLearningObject;
import ee.hm.dop.model.ResourceType;
import ee.hm.dop.model.Tag;
import ee.hm.dop.model.TagDTO;
import ee.hm.dop.model.TargetGroup;
import ee.hm.dop.model.User;
import ee.hm.dop.model.UserFavorite;
import ee.hm.dop.model.taxon.Taxon;
import ee.hm.dop.service.learningObject.LearningObjectHandler;
import ee.hm.dop.service.learningObject.LearningObjectHandlerFactory;
import org.joda.time.DateTime;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.function.BiFunction;

public class LearningObjectService extends BaseService {

    @Inject
    private LearningObjectDAO learningObjectDAO;

    @Inject
    private SolrEngineService solrEngineService;

    @Inject
    private UserFavoriteDAO userFavoriteDAO;

    @Inject
    private MaterialDAO materialDAO;

    @Inject
    private PortfolioDAO portfolioDAO;

    @Inject
    private TaxonService taxonService;

    @Inject
    private TargetGroupService targetGroupService;

    @Inject
    private ResourceTypeService resourceTypeService;

    @Inject
    private ChangedLearningObjectService changedLearningObjectService;

    @Inject
    private TagService tagService;

    public LearningObject get(long learningObjectId, User user) {
        LearningObject learningObject = getLearningObjectDAO().findById(learningObjectId);

        if (!hasPermissionsToAccess(user, learningObject)) {
            learningObject = null;
        }

        return learningObject;
    }

    boolean hasPermissionsToAccess(User user, LearningObject learningObject) {
        if (learningObject == null) {
            return false;
        }

        LearningObjectHandler learningObjectHandler = getLearningObjectHandler(learningObject);
        return learningObjectHandler.hasPermissionsToAccess(user, learningObject);
    }

    public LearningObject addTag(LearningObject learningObject, Tag tag, User user) {
        LearningObject updatedLearningObject;
        if (!hasPermissionsToAccess(user, learningObject)) {
            throw new RuntimeException("Access denied");
        }

        List<Tag> tags = learningObject.getTags();
        if (tags.contains(tag)) {
            throw new RuntimeException("Learning Object already contains tag");
        }

        tags.add(tag);
        updatedLearningObject = getLearningObjectDAO().update(learningObject);
        solrEngineService.updateIndex();

        return updatedLearningObject;
    }

    public TagDTO addSystemTag(Long learningObjectId, String type, String tagName, User user) {
        LearningObject learningObject = getLearningObjectByType(learningObjectId, type);
        if (learningObject == null) {
            throw new NoSuchElementException();
        }

        Tag tag = tagService.getTagByName(tagName);
        if (tag == null) {
            tag = new Tag();
            tag.setName(tagName);
        }

        LearningObject newLearningObject = addTag(learningObject, tag, user);

        if (!hasPermissionsToAccess(user, learningObject)) {
            throw new RuntimeException("Access denied");
        }

        return getTagDTO(tagName, newLearningObject, user);
    }

    private TagDTO getTagDTO(String tagName, LearningObject learningObject, User user) {
        TagDTO tagDTO = new TagDTO();

        ChangedLearningObject changedLearningObject = new ChangedLearningObject();
        changedLearningObject.setLearningObject(learningObject);
        changedLearningObject.setChanger(user);
        changedLearningObject.setAdded(DateTime.now());

        Taxon taxon = getTaxonByTranslation(tagName);
        ResourceType resourceType = resourceTypeService.findResourceByTranslation(tagName);
        TargetGroup targetGroup = targetGroupService.getByTranslation(tagName);

        boolean hasChanged = false;
        if (taxon != null) {
            addTaxon(learningObject, taxon);
            changedLearningObject.setTaxon(taxon);
            tagDTO.setTagTypeName("taxon");
            hasChanged = true;
        } else if (learningObject instanceof Material && resourceType != null) {
            addResourceType((Material) learningObject, resourceType);
            changedLearningObject.setResourceType(resourceType);
            tagDTO.setTagTypeName("resourcetype");
            hasChanged = true;
        } else if (targetGroup != null) {
            addTargetGroup(targetGroup, learningObject);
            changedLearningObject.setTargetGroup(targetGroup);
            tagDTO.setTagTypeName("targetgroup");
            hasChanged = true;
        }

        changedLearningObjectService.addChanged(changedLearningObject);

        LearningObject updatedLearningObject = getLearningObjectDAO().update(learningObject);
        updatedLearningObject.setChanged(hasChanged ? (updatedLearningObject.getChanged() + 1) : updatedLearningObject.getChanged());
        tagDTO.setLearningObject(updatedLearningObject);

        solrEngineService.updateIndex();

        return tagDTO;
    }

    private void addResourceType(Material learningObject, ResourceType resourceType) {
        List<ResourceType> resourceTypes = learningObject.getResourceTypes();
        resourceTypes.add(resourceType);
    }

    private void addTargetGroup(TargetGroup targetGroup, LearningObject learningObject) {
        List<TargetGroup> targetGroups = learningObject.getTargetGroups();
        targetGroups.add(targetGroup);
    }

    private void addTaxon(LearningObject learningObject, Taxon taxon) {
        List<Taxon> learningObjectTaxons = learningObject.getTaxons();
        if (learningObjectTaxons != null) {
            learningObjectTaxons.add(taxon);
        }
    }

    private Taxon getTaxonByTranslation(String tagName) {
        return taxonService.findTaxonByTranslation(tagName);
    }

    private LearningObject getLearningObjectByType(Long learningObjectId, String type) {
        LearningObject learningObject = null;

        if (isMaterial(type)) {
            learningObject = materialDAO.findById(learningObjectId);
        } else if (isPortfolio(type)) {
            learningObject = portfolioDAO.findById(learningObjectId);
        }

        return learningObject;
    }

    private boolean isMaterial(String type) {
        return ".Material".equals(type) || ".ReducedMaterial".equals(type);
    }

    private boolean isPortfolio(String type) {
        return ".Portfolio".equals(type) || ".ReducedPortfolio".equals(type);
    }

    private List<LearningObject> getPublicLearningObjects(int numberOfLearningObjects,
                                                          BiFunction<Integer, Integer, List<LearningObject>> functionToGetLearningObjects) {
        List<LearningObject> returnableLearningObjects = new ArrayList<>();
        int startPosition = 0;
        int count = numberOfLearningObjects;
        while (returnableLearningObjects.size() != numberOfLearningObjects) {
            List<LearningObject> learningObjects = functionToGetLearningObjects.apply(count, startPosition);
            if (learningObjects.size() == 0) {
                break;
            }

            learningObjects.removeIf(learningObject -> !getLearningObjectHandler(learningObject).isPublic(
                    learningObject));
            returnableLearningObjects.addAll(learningObjects);
            startPosition += count;
            count = numberOfLearningObjects - returnableLearningObjects.size();
        }

        return returnableLearningObjects;
    }

    List<LearningObject> getNewestLearningObjects(int numberOfLearningObjects) {
        return getPublicLearningObjects(numberOfLearningObjects, getLearningObjectDAO()::findNewestLearningObjects);
    }

    LearningObjectHandler getLearningObjectHandler(LearningObject learningObject) {
        return LearningObjectHandlerFactory.get(learningObject.getClass());
    }

    LearningObjectDAO getLearningObjectDAO() {
        return learningObjectDAO;
    }

    public UserFavorite addUserFavorite(LearningObject learningObject, User loggedInUser) {
        validateLearningObjectAndIdNotNull(learningObject);

        UserFavorite userFavorite = new UserFavorite();
        userFavorite.setAdded(DateTime.now());
        userFavorite.setCreator(loggedInUser);
        userFavorite.setLearningObject(learningObject);

        return userFavoriteDAO.update(userFavorite);
    }

    public void removeUserFavorite(Long id, User loggedInUser) {
        LearningObject learningObject = learningObjectDAO.findById(id);

        validateLearningObjectAndIdNotNull(learningObject);
        userFavoriteDAO.deleteByLearningObjectAndUser(learningObject, loggedInUser);
    }

    public UserFavorite hasFavorited(Long id, User loggedInUser) {
        if(id == null || loggedInUser == null) return null;
        return userFavoriteDAO.findFavoriteByUserAndLearningObject(id, loggedInUser);
    }

    public List<ReducedLearningObject> getUserFavorites(User loggedInUser, int start, int maxResult) {
        return userFavoriteDAO.findUsersFavoritedLearningObjects(loggedInUser, start, maxResult);
    }

    private void validateLearningObjectAndIdNotNull(LearningObject learningObject) {
        if (learningObject == null || learningObject.getId() == null) {
            throw new RuntimeException("LearningObject not found");
        }
    }

    public long getUserFavoritesSize(User loggedInUser) {
        return userFavoriteDAO.findUsersFavoritedLearningObjectsCount(loggedInUser);
    }
}
