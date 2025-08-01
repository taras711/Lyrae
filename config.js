/**
 * @module config
 * @description Configuration settings for the LyraeLangProject.
 */

module.exports = {
    appName: "Lyrae",
    version: "1.0.0",
    port: 3000,
    env: process.env.NODE_ENV || "development",
    db: {
        host: "localhost",
        port: 5432,
        user: "lyrae_user",
        password: "lyrae_pass",
        database: "lyrae_db"
    },
    jwtSecret: "your_jwt_secret_here",
    logLevel: "info",
    api: {
        prefix: "/api"
    },
    features: {
        enableAuth: true,
        enableLogging: true,
        enableRateLimit: false
    }
};