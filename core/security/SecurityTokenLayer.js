/**

 * @author Starass

 * @module SecurityTokenLayer

 * @description This module provides functions for working with JWT tokens.

 */

const jwt = require("jsonwebtoken")
const SECRET_KEY = "nebula-secret"

/**
 * Signs a JWT token.
 * @param {Object} payload - Payload for the token.
 * @returns {string} - Signed JWT token.
 */
function signToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
}

/**
 * Verifies the validity of a JWT token.
 * @param {string} token - JWT token as a string.
 * @returns {Object|null} - Decoded payload or null if an error occurred.
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (err) {
    return null
  }
}

module.exports = {
  signToken,
  verifyToken
}