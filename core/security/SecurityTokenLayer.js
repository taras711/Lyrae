"use strict";

const config = require("../../config");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const readline = require("readline");
require("dotenv").config();

function getSecretKey() {
  if (!config.jwtSecret || config.jwtSecret === "default_secret_key") {
    console.error("JWT_SECRET is not set. Please define it in your .env file.");
    process.exit(1);
  }
  return config.jwtSecret;
}


/**
 * Signs a JWT token.
 * @param {Object} payload - Payload for the token.
 * @returns {string} - Signed JWT token.
 */
function signToken(payload) {
  return jwt.sign(payload, getSecretKey(), { expiresIn: "1h" });
}

/**
 * Verifies the validity of a JWT token.
 * @param {string} token - JWT token as a string.
 * @returns {Object|null} - Decoded payload or null if an error occurred.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, getSecretKey());
  } catch (err) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken
};