package ee.hm.dop.rest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.Response;

import ee.hm.dop.common.test.ResourceIntegrationTestBase;
import ee.hm.dop.model.AuthenticatedUser;
import org.junit.Test;

/**
 * Created by mart on 18.08.15.
 */
public class DevelopmentLoginResourceTest extends ResourceIntegrationTestBase {

    @Test
    public void logIn() {
        Response response = doGet("dev/login/39011220011");
        AuthenticatedUser authenticatedUser = response.readEntity(new GenericType<AuthenticatedUser>() {
        });
        assertNotNull(authenticatedUser.getToken());
        assertEquals("Mati", authenticatedUser.getUser().getName());
        assertEquals("Maasikas", authenticatedUser.getUser().getSurname());
        assertEquals("mati.maasikas", authenticatedUser.getUser().getUsername());
        assertNull(authenticatedUser.getUser().getIdCode());
    }

    @Test
    public void loginWrongId() {
        Response response = doGet("dev/login/123");
        assertEquals(Response.Status.INTERNAL_SERVER_ERROR.getStatusCode(), response.getStatus());
    }

    @Test
    public void loginNullId() {
        Response response = doGet(null);
        assertEquals(Response.Status.NOT_FOUND.getStatusCode(), response.getStatus());

    }
}
