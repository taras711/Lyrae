/**

 * @author Starass

 * @module JWTVerificationStats

 * @description This module handles auditing of JWT verification attempts.

 */

/**
 * Extracts statistics from JWT verification attempts.
 * @param {Array<Object>} attempts - The JWT verification attempts.
 * @returns {Object} - The extracted statistics.
 */
function extractSignatureStats(attempts) {
  const total = attempts.length
  const valid = attempts.filter(e => e.result === "valid").length
  const invalid = attempts.filter(e => e.result === "invalid").length

  return {
    totalAttempts: total,
    valid,
    invalid,
    validRate: ((valid / total) * 100).toFixed(1) + "%",
    invalidRate: ((invalid / total) * 100).toFixed(1) + "%"
  }
}

module.exports = { extractSignatureStats }