package ee.hm.dop.rest;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import ee.hm.dop.model.Role;

/**
 * Created by mart on 30.11.16.
 */
@Path("role")
public class RoleResource extends BaseResource {
    @GET
    @RolesAllowed("ADMIN")
    @Produces(MediaType.APPLICATION_JSON)
    public Role[] getAll() {
        return Role.values();
    }
}
