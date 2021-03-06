package ee.hm.dop.service;

import ee.hm.dop.model.solr.SearchResponse;
import ee.hm.dop.tokenizer.DOPSearchStringTokenizer;
import org.apache.commons.configuration.Configuration;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrRequest;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.Suggestion;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import static ee.hm.dop.utils.ConfigurationProperties.SEARCH_SERVER;
import static java.lang.String.format;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.apache.commons.lang3.StringUtils.isBlank;

@Singleton
public class SolrService implements SolrEngineService {

    private static final Logger logger = LoggerFactory.getLogger(SolrService.class);

    private static final int RESULTS_PER_PAGE = 24;
    private static final int SUGGEST_COUNT = 5;
    private static final String SEARCH_PATH = "select?q=%s&sort=%s&wt=json&start=%d&rows=%d";
    private static final String SUGGEST_URL = "/suggest";
    private static final String SUGGEST_TAG_URL = "/suggest_tag";


    static final String SOLR_IMPORT_PARTIAL = "dataimport?command=delta-import&wt=json";

    static final String SOLR_DATAIMPORT_STATUS = "dataimport?command=status&wt=json";

    static final String SOLR_STATUS_BUSY = "busy";

    @Inject
    private Client client;

    @Inject
    private Configuration configuration;

    private SolrClient solrClient;

    private SolrIndexThread indexThread;

    SolrService() {
        solrClient = new HttpSolrClient("http://localhost:8983/solr/dop");
        indexThread = new SolrIndexThread();
        indexThread.start();
    }

    @Override
    public SearchResponse search(String query, long start, String sort) {
        return search(query, start, RESULTS_PER_PAGE, sort);
    }

    @Override
    public SearchResponse search(String query, long start, long limit, String sort) {
        return executeCommand(
                format(SEARCH_PATH, encodeQuery(query), formatSort(sort), start, Math.min(limit, RESULTS_PER_PAGE)));
    }

    @Override
    public List<String> suggest(String query, boolean suggestTags) {
        if (query.isEmpty()) {
            return null;
        }
        QueryResponse qr = null;
        SolrQuery solrQuery = new SolrQuery();
        solrQuery.setRequestHandler(suggestTags ? SUGGEST_TAG_URL : SUGGEST_URL);
        solrQuery.setQuery(query);
        List<String> suggestions = new ArrayList<>();

        try {
            qr = solrClient.query(solrQuery, SolrRequest.METHOD.POST);
        } catch (SolrServerException | IOException e) {
            logger.error("The SolrServer encountered an error.");
        }

        if (qr != null && qr.getSuggesterResponse() != null) {
            List<Suggestion> combinedSuggestions = new ArrayList<>();

            if (suggestTags) {
                combinedSuggestions.addAll(qr.getSuggesterResponse().getSuggestions().get("dopTagSuggester"));
            } else {
                combinedSuggestions.addAll(qr.getSuggesterResponse().getSuggestions().get("linkSuggester"));
                combinedSuggestions.addAll(qr.getSuggesterResponse().getSuggestions().get("dopSuggester"));
            }

            for (Suggestion suggestion : combinedSuggestions) {
                suggestions.add(suggestion.getTerm());
            }

            return suggestions.size() > SUGGEST_COUNT ? suggestions.subList(0, SUGGEST_COUNT - 1) : suggestions;
        }


        return null;
    }


    @Override
    public void updateIndex() {
        indexThread.updateIndex();
    }

    private boolean isIndexingInProgress() {
        SearchResponse response = executeCommand(SOLR_DATAIMPORT_STATUS);
        return response.getStatus().equals(SOLR_STATUS_BUSY);
    }

    SearchResponse executeCommand(String command) {
        SearchResponse searchResponse = getTarget(command).request(MediaType.APPLICATION_JSON)
                .get(SearchResponse.class);

        logCommand(command, searchResponse);

        return searchResponse;
    }

    private void logCommand(String command, SearchResponse searchResponse) {
        long responseCode = searchResponse.getResponseHeader().getStatus();

        String statusMessages = "";
        if (searchResponse.getStatusMessages() != null) {
            statusMessages = "Status messages: " + searchResponse.getStatusMessages().entrySet() //
                    .stream().map(Entry::toString).collect(Collectors.joining(";", "[", "]"));
        }

        String logMessage = String.format("Solr responded with code %s, url was %s %s", responseCode,
                configuration.getString(SEARCH_SERVER) + command, statusMessages);

        if (responseCode != 0) {
            logger.info(logMessage);
        } else {
            logger.debug(logMessage);
        }
    }

    private WebTarget getTarget(String path) {
        return client.target(getFullURL(path));
    }

    private String getFullURL(String path) {
        String serverUrl = configuration.getString(SEARCH_SERVER);
        return serverUrl + path;
    }

    static String getTokenizedQueryString(String query) {
        StringBuilder sb = new StringBuilder();
        if (!isBlank(query)) {
            query = query.replaceAll("\\+", " ");
            DOPSearchStringTokenizer tokenizer = new DOPSearchStringTokenizer(query);
            while (tokenizer.hasMoreTokens()) {
                sb.append(tokenizer.nextToken());
                if (tokenizer.hasMoreTokens()) {
                    sb.append(" ");
                }
            }
        }
        return sb.toString();
    }

    private String encodeQuery(String query) {
        String encodedQuery;
        try {
            encodedQuery = URLEncoder.encode(query, UTF_8.name());
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        return encodedQuery;
    }

    private String formatSort(String sort) {
        if (sort != null) {
            return encodeQuery(sort);
        } else {
            return "";
        }
    }

    private class SolrIndexThread extends Thread {
        private boolean updateIndex;

        private final Object lock = new Object();

        public void updateIndex() {
            synchronized (lock) {
                updateIndex = true;
            }
        }

        @Override
        public void run() {
            try {
                while (true) {
                    if (updateIndex) {
                        synchronized (lock) {
                            updateIndex = false;
                            lock.notifyAll();
                            logger.info("Updating Solr index.");
                            executeCommand(SOLR_IMPORT_PARTIAL);
                            waitForCommandToFinish();
                        }
                    }

                    sleep(1000);
                }
            } catch (InterruptedException e) {
                logger.info("Solr indexing thread interrupted.");
            }
        }

        private void waitForCommandToFinish() throws InterruptedException {
            while (isIndexingInProgress()) {
                sleep(1000);
            }
        }
    }
}
