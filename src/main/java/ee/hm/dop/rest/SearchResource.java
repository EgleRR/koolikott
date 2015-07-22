package ee.hm.dop.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import ee.hm.dop.model.Material;
import ee.hm.dop.service.SearchService;

@Path("search")
public class SearchResource {

    @Inject
    private SearchService searchService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Material> search(@QueryParam("q") String query, @DefaultValue("0") @QueryParam("start") long start) {
        return searchService.search(query, start);
    }
    
    @GET
    @Path("countResults")
    @Produces(MediaType.APPLICATION_JSON)
    public long countResults(@QueryParam("q") String query) {
        return searchService.countResults(query);
    }
}
