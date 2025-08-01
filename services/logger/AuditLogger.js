/**

 * @author Starass

 * @module AuditLogger

 * @description This module handles logging of audit events within the system.
 * It records events with timestamps, user fingerprints, and scenario states.

 */

class AuditLogger {

  /**
   * Creates an instance of the AuditLogger.
   */
  constructor() {
    this.entries = []
  }

  /**
   * Logs an audit event.
   * @param {object} params - The parameters for the log entry.
   * @param {string} params.message - The log message.
   * @param {object} params.token - The user token.
   * @param {object} params.scenario - The scenario object.
   * @param {number} [params.timestamp=Date.now()] - The timestamp for the log entry.
   */
  log({ message, token, scenario, timestamp = Date.now() + Math.random() * 1000 }) {
    const entry = {
      time: new Date(timestamp).toISOString(),
      fingerprint: token?.getFingerprint() || "anonymous",
      scenarioState: scenario?.state || "unknown",
      message
    }
    this.entries.push(entry)
  }

  /**
   * Gets the complete audit log history.
   * @returns {Array<object>} The audit log entries.
   */
  getHistory() {
    return this.entries
  }

  /**
   * Filters the audit log entries by user ID.
   * @param {string} userId - The user ID to filter by.
   * @returns {Array<object>} The filtered audit log entries.
   */
  filterByUser(userId) {
    return this.entries.filter(e => e.fingerprint.startsWith(userId))
  }

  /**
   * Clears the audit log entries.
   */
  clear() {
    this.entries = []
  }

  /**
   * Exports the audit log entries as a JSON string.
   * @returns {string} The JSON string representation of the audit log entries.
   */
  exportAsJSON() {
    return JSON.stringify(this.entries, null, 2)
  }
}

module.exports = AuditLogger