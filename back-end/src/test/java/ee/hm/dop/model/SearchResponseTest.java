package ee.hm.dop.model;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import com.fasterxml.jackson.databind.ObjectMapper;
import ee.hm.dop.common.test.GuiceTestRunner;
import ee.hm.dop.model.solr.Document;
import ee.hm.dop.model.solr.ResponseHeader;
import ee.hm.dop.model.solr.SearchResponse;
import org.junit.Test;
import org.junit.runner.RunWith;

/**
 * Tests JSON deserialization
 * 
 * @author Jordan Silva
 *
 */
@RunWith(GuiceTestRunner.class)
public class SearchResponseTest {

    @Inject
    ObjectMapper mapper;

    @Test
    public void deserialize() throws Exception {
        String searchResult = "{\n" + //
                "  \"responseHeader\":{\n" + //
                "    \"status\":0,\n" + //
                "    \"QTime\":1,\n" + //
                "    \"params\":{\n" + //
                "      \"q\":\"*:*\",\n" + //
                "      \"indent\":\"true\",\n" + //
                "      \"wt\":\"python\",\n" + //
                "      \"_\":\"1435915217768\"}},\n" + //
                "  \"status\":\"testStatus\",\n" + //
                "  \"response\":{\"numFound\":8,\"start\":0,\"docs\":[\n" + //
                "      {\n" + //
                "        \"id\":\"6\",\n" + //
                "        \"_version_\":1505661585112170496},\n" + //
                "      {\n" + //
                "        \"id\":\"1\",\n" + //
                "        \"_version_\":1505661585116364800},\n" + //
                "      {\n" + //
                "        \"id\":\"2\",\n" + //
                "        \"_version_\":1505661585119510528},\n" + //
                "      {\n" + //
                "        \"id\":\"4\",\n" + //
                "        \"_version_\":1505661585121607680},\n" + //
                "      {\n" + //
                "        \"id\":\"5\",\n" + //
                "        \"_version_\":1505661585123704832},\n" + //
                "      {\n" + //
                "        \"id\":\"3\",\n" + //
                "        \"_version_\":1505661585124753408},\n" + //
                "      {\n" + //
                "        \"id\":\"7\",\n" + //
                "        \"_version_\":1505661585127899136},\n" + //
                "      {\n" + //
                "        \"id\":\"8\",\n" + //
                "        \"_version_\":1505661585129996288}]\n" + //
                "  }}";

        SearchResponse searchResponse = mapper.readValue(searchResult, SearchResponse.class);
        assertNotNull(searchResponse);
        assertNotNull(searchResponse.getResponse());
        assertEquals("testStatus", searchResponse.getStatus());

        List<Document> documents = searchResponse.getResponse().getDocuments();
        assertEquals(8, documents.size());
        assertEquals(6, documents.get(0).getId());
        assertEquals(1, documents.get(1).getId());
        assertEquals(2, documents.get(2).getId());
        assertEquals(4, documents.get(3).getId());
        assertEquals(5, documents.get(4).getId());
        assertEquals(3, documents.get(5).getId());
        assertEquals(7, documents.get(6).getId());
        assertEquals(8, documents.get(7).getId());
        assertEquals(8, searchResponse.getResponse().getTotalResults());
        assertEquals(0, searchResponse.getResponse().getStart());

        ResponseHeader responseHeader = searchResponse.getResponseHeader();
        assertNotNull(responseHeader);
        assertEquals(0, responseHeader.getStatus());
    }

    @Test
    public void deserializeNoDocuments() throws Exception {
        String searchResult = " {\n" + //
                "        \"responseHeader\": {\n" + //
                "          \"status\": 0,\n" + //
                "          \"QTime\": 1,\n" + //
                "          \"params\": {\n" + //
                "            \"q\": \"asasa\",\n" + //
                "            \"indent\": \"true\",\n" + //
                "            \"wt\": \"json\",\n" + //
                "            \"_\": \"1435920941028\"\n" + //
                "          }\n" + //
                "        },\n" + //
                "        \"status\":\"testStatus\",\n" + //
                "        \"response\": {\n" + //
                "          \"numFound\": 0,\n" + //
                "          \"start\": 0,\n" + //
                "          \"docs\": []\n" + //
                "        },\n" + //
                "        \"statusMessages\": {\n" + //
                "          \"Total Documents Processed\": \"17\",\n" + //
                "          \"Delta Dump started\": \"2016-02-23 10:50:59\",\n" + //
                "          \"Total Changed Documents\": \"17\"\n" + //
                "        }\n" + //
                "      }";

        SearchResponse searchResponse = mapper.readValue(searchResult, SearchResponse.class);
        assertNotNull(searchResponse);
        assertNotNull(searchResponse.getResponse());
        assertNotNull(searchResponse.getResponse().getDocuments());
        assertEquals(0, searchResponse.getResponse().getDocuments().size());
        assertEquals(0, searchResponse.getResponse().getTotalResults());
        assertEquals(0, searchResponse.getResponse().getStart());
        assertEquals("testStatus", searchResponse.getStatus());

        Map<String, String> messages = searchResponse.getStatusMessages();
        assertNotNull(messages.size());
        assertEquals("17", messages.get("Total Documents Processed"));
        assertEquals("2016-02-23 10:50:59", messages.get("Delta Dump started"));
        assertEquals("17", messages.get("Total Changed Documents"));

        ResponseHeader responseHeader = searchResponse.getResponseHeader();
        assertNotNull(responseHeader);
        assertEquals(0, responseHeader.getStatus());
    }

    @Test
    public void deserializeErrorResponse() throws Exception {
        String searchResult = "{\n" + //
                "        \"responseHeader\": {\n" + //
                "          \"status\": 400,\n" + //
                "          \"QTime\": 1,\n" + //
                "          \"params\": {\n" + //
                "            \"q\": \"\\\"\",\n" + //
                "            \"wt\": \"json\",\n" + //
                "            \"_\": \"1435934978154\"\n" + //
                "          }\n" + //
                "        },\n" + //
                "        \"status\":\"testStatus\",\n" + //
                "        \"error\": {\n" + //
                "          \"msg\": \"org.apache.solr.search.SyntaxError: Cannot parse '\\\"': Lexical " + //
                "error at line 1, column 2.  Encountered: <EOF> after : \\\"\\\"\",\n" + //
                "          \"code\": 400\n" + "        }\n" + //
                "      }";

        SearchResponse searchResponse = mapper.readValue(searchResult, SearchResponse.class);
        assertNotNull(searchResponse);
        assertNull(searchResponse.getResponse());
        assertEquals("testStatus", searchResponse.getStatus());

        ResponseHeader responseHeader = searchResponse.getResponseHeader();
        assertNotNull(responseHeader);
        assertEquals(400, responseHeader.getStatus());
    }

}
