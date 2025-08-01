/**

 * @author Starass

 * @module TokenLifecycleManager

 * @description This module manages the lifecycle of tokens, including expiration and revocation.

 */

const fs = require("fs")
const path = require("path")
const { log } = require("../../core/services/PersistentAuditService")

const BLACKLIST_FILE = path.join(__dirname, "revoked_tokens.json") // Files for the token blacklist
let tokenBlacklist = [] // Storing revoked tokens

/**
 * Checks if a token is expiring soon.
 * @param {Object} token - Token object.
 * @param {number} thresholdMinutes - Threshold value in minutes.
 * @returns {boolean} - True if the token is expiring soon, otherwise false.
 */
function isExpiringSoon(token, thresholdMinutes = 5) {
  const remaining = token.getRemainingLifetime("minutes")
  return remaining <= thresholdMinutes
}

/**
 * Revokes a token.
 * @param {string} tokenId - Token ID.
 * @param {string} userId - User ID.
 * @param {string} reason - Reason for revocation.
 * @returns {boolean} - True if the token was successfully revoked, otherwise false.
 */
function revokeToken(tokenId, userId = "system", reason = "manual") {
  if (!tokenId || isRevoked(tokenId)) return false

  tokenBlacklist.push(tokenId)

  log({
    type: "token.revoke",
    tokenId,
    userId,
    role: "system",
    status: "✅ Token revoked",
    reason
  })

  saveBlacklist()
  return true
}

/**
 * Checks if a token is revoked.
 * @param {string} tokenId - Token ID.
 * @returns {boolean} - True if the token is revoked, otherwise false.
 */
function isRevoked(tokenId) {
  return tokenBlacklist.includes(tokenId)
}

/**
 * Returns a list of revoked tokens.
 * @returns {Array} - List of revoked tokens.
 */
function getRevokedList() {
  return tokenBlacklist.slice()
}

/**
 * Saves the token blacklist.
 */
function saveBlacklist() {
  fs.writeFileSync(BLACKLIST_FILE, JSON.stringify(tokenBlacklist, null, 2))
}

/**
 * Loads the token blacklist.
 */
function loadBlacklist() {
  if (fs.existsSync(BLACKLIST_FILE)) {
    try {
      tokenBlacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE, "utf-8"))
    } catch {
      tokenBlacklist = []
    }
  }
}

// Automatic loading on startup
loadBlacklist()

module.exports = {
  isExpiringSoon,
  revokeToken,
  isRevoked,
  getRevokedList,
  saveBlacklist
}