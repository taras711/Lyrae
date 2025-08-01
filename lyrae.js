// Load configuration and required modules
const config = require('./config.js');
const fs = require('fs');
const path = require('path');

/**
 * Starts the Lyrae environment.
 */
function startLyraeEnvironment() {
    console.log("Starting Lyrae environment...");
    console.log(`App Name: ${config.appName}`);
    console.log(`Version: ${config.version}`);
    console.log(`Environment: ${config.env}`);
    console.log(`Listening on port: ${config.port}`);
    console.log(`Database: ${config.db.database} at ${config.db.host}:${config.db.port}`);
    console.log(`JWT Secret: ${config.jwtSecret}`);
    console.log(`Log Level: ${config.logLevel}`);
    console.log(`API Prefix: ${config.api.prefix}`);
    console.log(`Features: ${JSON.stringify(config.features)}`);
    // Ensure necessary directories exist
    const folders = [
        path.join(__dirname, 'data'),
        path.join(__dirname, 'logs'),
        path.join(__dirname, 'tmp')
    ];
    folders.forEach(folder => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    });
    // Initialization and startup logic for your environment goes here
    // For example, loading configuration, starting REPL, handling commands
}

startLyraeEnvironment();