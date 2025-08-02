/**
 * @module config
 * @description Configuration settings for the LyraeLangProject.
 */

"use strict";
require("dotenv").config();

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
    jwtSecret: (() => {
        if (!process.env.JWT_SECRET) {
            throw new Error("❌ JWT_SECRET is not set. Define it in your environment variables.");
        }
        return process.env.JWT_SECRET;
    })(),
    security: {
        tokenExpiration: "1h",
        encryptionAlgorithm: "aes-256-cbc"
    },
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
