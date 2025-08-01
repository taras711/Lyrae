/**

 * @author Starass

 * @module JWTSignatureAudit

 * @description This module handles auditing of JWT signature attempts.

 */

const signatureAttempts = [] // Array to hold JWT signature attempts

/**
 * Records a JWT signature attempt.
 * @param {Object} attempt - The signature attempt details.
 * @returns {Object} - The recorded signature attempt.
 */
function recordSignatureAttempt({
  tokenId,
  userId,
  role,
  trust,
  algorithm = "HS256",
  attemptedSignature,
  result,
  timestamp = Date.now()
}) {
  const entry = {
    tokenId,
    userId,
    role,
    trust,
    algorithm,
    attemptedSignature,
    result, // "valid" | "invalid" | "error"
    timestamp
  }

  signatureAttempts.push(entry)
  return entry
}

/**
 * Retrieves all JWT signature attempts.
 * @returns {Array} - List of all signature attempts.
 */
function getAllAttempts() {
  return signatureAttempts
}

/**
 * Exports all JWT signature attempts to a JSON file.
 * @param {string} filename - The name of the file to export to.
 */
function exportAttemptsToJSON(filename = "signatureAuditLog.json") {
  const fs = require("fs")
  fs.writeFileSync(filename, JSON.stringify(signatureAttempts, null, 2))
}

module.exports = {
  recordSignatureAttempt,
  getAllAttempts,
  exportAttemptsToJSON
}