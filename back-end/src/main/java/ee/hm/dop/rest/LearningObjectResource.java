package ee.hm.dop.rest;

import ee.hm.dop.model.LearningObject;
import ee.hm.dop.model.SearchResult;
import ee.hm.dop.model.Searchable;
import ee.hm.dop.model.Tag;
import ee.hm.dop.model.TagDTO;
import ee.hm.dop.model.UserFavorite;
import ee.hm.dop.service.LearningObjectService;
import ee.hm.dop.service.TagService;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("learningObject")
public class LearningObjectResource extends BaseResource {

    @Inject
    private LearningObjectService learningObjectService;

    @Inject
    private TagService tagService;

    @PUT
    @Path("{learningObjectId}/tags")
    @RolesAllowed({"USER", "ADMIN", "MODERATOR"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public LearningObject addTag(@PathParam("learningObjectId") Long learningObjectId, Tag newTag) {
        LearningObject learningObject = learningObjectService.get(learningObjectId, getLoggedInUser());
        if (learningObject == null) {
            throwNotFoundException("No such learning object");
        }

        Tag tag = tagService.getTagByName(newTag.getName());
        if (tag == null) {
            tag = newTag;
        }

        return learningObjectService.addTag(learningObject, tag, getLoggedInUser());
    }

    @GET
    @Path("{learningObjectId}/system_tags")
    @RolesAllowed({"USER", "ADMIN", "MODERATOR"})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public TagDTO addSystemTag(@PathParam("learningObjectId") Long learningObjectId, @QueryParam("type") String type, @QueryParam("name") String tagName) {
        return learningObjectService.addSystemTag(learningObjectId, type, tagName, getLoggedInUser());
    }

    @GET
    @Path("favorite")
    @RolesAllowed({"USER", "ADMIN", "MODERATOR", "RESTRICTED"})
    public UserFavorite hasSetFavorite(@QueryParam("id") Long id) {
        return learningObjectService.hasFavorited(id, getLoggedInUser());
    }

    @GET
    @Path("usersFavorite")
    @RolesAllowed({"USER", "ADMIN", "MODERATOR", "RESTRICTED"})
    public SearchResult getUsersFavorites(@QueryParam("start") int start, @QueryParam("maxResults") int maxResults) {
        if (maxResults == 0) maxResults = 12;

        List<Searchable> userFavorites = new ArrayList<>(learningObjectService.getUserFavorites(getLoggedInUser(), start, maxResults));
        return new SearchResult(userFavorites, learningObjectService.getUserFavoritesSize(getLoggedInUser()), start);
    }

    @GET
    @Path("usersFavorite/count")
    @RolesAllowed({"USER", "ADMIN", "MODERATOR", "RESTRICTED"})
    public Long getUsersFavoritesCount() {
        return learningObjectService.getUserFavoritesSize(getLoggedInUser());
    }

    @POST
    @Path("favorite")
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed({"USER", "ADMIN", "MODERATOR"})
    public UserFavorite favoriteLearningObject(LearningObject learningObject) {
        return learningObjectService.addUserFavorite(learningObject, getLoggedInUser());
    }

    @DELETE
    @Path("favorite")
    @RolesAllowed({"USER", "ADMIN", "MODERATOR"})
    public void removeUserFavorite(@QueryParam("id") long id) {
        learningObjectService.removeUserFavorite(id, getLoggedInUser());
    }
}
