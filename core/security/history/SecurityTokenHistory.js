/**

 * @author Starass

 * @module SecurityTokenHistory

 * @description This module manages the history of security tokens.

 */

const fs = require("fs")
const path = require("path")

const HISTORY_FILE = path.join(__dirname, "token_history.json") // File for token history
let tokenHistory = [] // Token history

/**
 * Records a snapshot of the token into history.
 * @param {Object} token - The token to record.
 * @param {string} [source="system"] - Source of the record.
 * @returns {Object} - Recorded snapshot.
 */
function recordTokenSnapshot(token, source = "system") {
  const snapshot = {
    time: Date.now(),
    source,
    userId: token.userId,
    role: token.role,
    trust: token.trust,
    expired: token.isExpired(),
    valid: token.isValid(),
    issuedAt: token.issuedAt,
    validUntil: token.validUntil
  }

  tokenHistory.push(snapshot)
  saveHistory()
  return snapshot
}

/**
 * Gets the token history for a specific user.
 * @param {string} userId - User ID.
 * @returns {Array} - List of history records for the user.
 */
function getHistoryForUser(userId) {
  return tokenHistory.filter(entry => entry.userId === userId)
}

/**
 * Gets all token snapshots.
 * @returns {Array} - List of all snapshots.
 */
function getAllSnapshots() {
  return tokenHistory.slice()
}

/**
 * Saves the token history to a file.
 */
function saveHistory() {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(tokenHistory, null, 2))
}

/**
 * Loads the token history from a file.
 */
function loadHistory() {
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      tokenHistory = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"))
    } catch {
      tokenHistory = []
    }
  }
}

loadHistory() // Load token history on startup

module.exports = {
  recordTokenSnapshot,
  getHistoryForUser,
  getAllSnapshots
}