/**

 * @author Starass

 * @module AuditService

 * @description This module handles auditing of user actions.

 */

class AuditService {
  /**
   * @constructor
   */
  constructor() {
    this.entries = []
  }

  /**
   * Logs an audit entry.
   * @param {Object} entry - Audit entry.
   */
  log(entry) {
    const enriched = {
      ...entry,
      time: entry.time || Date.now(),
      traceId: this.generateTraceId(entry),
      actor: entry.userId || "unknown"
    }
    this.entries.push(enriched)
  }

  /**
   * Generates a unique trace ID for an audit entry.
   * @param {Object} entry - Audit entry.
   * @returns {string} - Generated trace ID.
   */
  generateTraceId(entry) {
    return `${entry.userId || "X"}-${entry.scenario || "GEN"}-${Date.now().toString(36)}`
  }

  /**
   * Retrieves the audit history.
   * @param {Object} filter - Filter criteria.
   * @returns {Array} - Filtered audit history.
   */
  getHistory(filter = {}) {
    return this.entries.filter(entry => {
      for (const key in filter) {
        if (entry[key] !== filter[key]) return false
      }
      return true
    })
  }

  /**
   * Summarizes audit entries.
   * @returns {Object} - Summary of audit entries.
   */
  summarize() {
    const countByScenario = {}

    for (const entry of this.entries) {
      const key = entry.scenario || "generic"
      countByScenario[key] = (countByScenario[key] || 0) + 1
    }

    return {
      total: this.entries.length,
      byScenario: countByScenario
    }
  }

  /**
   * Clears the audit history.
   */
  clear() {
    this.entries = []
  }
}

module.exports = AuditService