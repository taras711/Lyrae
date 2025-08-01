/**

 * @author Starass

 * @module SignatureAnomalyDetector

 * @description This module detects anomalies in user authentication attempts.

 */

/**
 * Detects anomalies in user authentication attempts.
 * @param {Array} attempts - The list of authentication attempts.
 * @param {number} threshold - The threshold for invalid attempts.
 * @returns {Array} - List of tokens with invalid attempts above the threshold.
 */
function detectAnomalies(attempts, threshold = 3) {
  const map = {}

  for (const a of attempts) {
    const key = a.tokenId
    if (!map[key]) map[key] = { valid: 0, invalid: 0 }
    map[key][a.result]++
  }
    // Filter tokens with invalid attempts above threshold
  const filtered = Object.entries(map)
    .filter(([_, stats]) => stats.invalid >= threshold)
    .map(([tokenId, stats]) => ({ tokenId, ...stats }))

  return filtered
  // Return tokens with invalid attempts above threshold
  // Format: [{ tokenId, valid, invalid }, ...]
  // Example: [{ tokenId: "USR-1001", valid: 2, invalid: 5 }, ...]
}
module.exports = {
  detectAnomalies
}