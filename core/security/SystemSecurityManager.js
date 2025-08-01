/**

 * @author Starass

 * @module SystemSecurityManager

 * @description This module manages user security levels.

 */

const securityLevels = {} // Storing user security levels

/**
 * Raises the security level of a user.
 * @param {string} userId - User ID.
 * @param {string} reason - Reason for raising the level.
 * @returns {Object} - Information about the raised level.
 */
function raiseSecurityLevel(userId, reason = "unknown") {
  const current = securityLevels[userId] || 1
  const raised = Math.min(current + 1, 5)

  securityLevels[userId] = raised

  console.warn(`🔐 Security level raised for ${userId}: ${current} → ${raised} | Reason: ${reason}`)

  return {
    userId,
    newLevel: raised,
    reason,
    time: Date.now()
  }
}

/**
 * Returns the current security level of a user.
 * @param {string} userId - User ID.
 * @returns {number} - Current security level.
 */
function getSecurityLevel(userId) {
  return securityLevels[userId] || 1
}

module.exports = {
  raiseSecurityLevel,
  getSecurityLevel
}