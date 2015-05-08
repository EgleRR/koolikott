package ee.hm.dop;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ee.hm.dop.server.EmbeddedJetty;

public class ApplicationLauncher {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationLauncher.class);

    public static void startApplication() {
        startServer();
        addShutdownHook();
        startCommandListener();
    }

    private static void addShutdownHook() {
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            @Override
            public void run() {
                stopServer();
            }
        }, "shutdown-hook"));
    }

    private static void startServer() {
        try {
            logger.info("Starting application server");
            EmbeddedJetty.instance().start();
        } catch (Exception e) {
            logger.error("Error inicializing Jetty Server. Existing application.", e);
            System.exit(1);
        }
    }

    synchronized private static void stopServer() {
        logger.info("Stopping server...");
        try {
            EmbeddedJetty.instance().stop();
        } catch (Exception e) {
            logger.info("Error stopping server!", e);
        }
    }

    private static void startCommandListener() {
        Thread commandListener = new Thread(new ApplicationManager.CommandListener());
        commandListener.setName("command-listener");
        commandListener.setDaemon(true);
        commandListener.start();
    }

    public static void main(String[] args) throws Exception {
        if (args.length == 1 && "stop".equalsIgnoreCase(args[0])) {
            ApplicationManager.stop();
        } else {
            startApplication();
        }
    }
}
