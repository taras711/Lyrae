/**

 * @author Starass

 * @module TrustSupervisor

 * @description This module supervises user trust levels and detects anomalies.

 */

const { recordTokenSnapshot, getHistoryForUser } = require("./history/SecurityTokenHistory")
const { detectTrustAnomalies } = require("./analysis/TrustAnomalyDetector")
const { raiseSecurityLevel } = require("./SystemSecurityManager")


class TrustSupervisor {
  /**
   * @constructor
   */
  constructor() {
    this.records = {} // { userId: { trust: 0.7, attempts: 0, success: 0, denied: 0 } }
    this.history = []
  }

  /**
   * Observes user intent.
   * @param {Object} param - Monitoring parameters.
   * @param {Object} param.token - User token.
   * @param {string} param.intent - User intent.
   * @param {boolean} param.approved - Approved or denied.
   */
  observeIntent({ token, intent, approved }) {
    const snapshot = recordTokenSnapshot(token, "TrustObservation")
    const userId = token.userId
    const record = this.records[userId] ||= {
      trust: token.trust,
      attempts: 0,
      success: 0,
      denied: 0
    }
    const history = getHistoryForUser(token.userId) // User history
    const anomalies = detectTrustAnomalies(history) // Trust anomaly detection


    record.attempts++

    if (approved) {
      record.success++
    } else {
      record.denied++
    }

    if (anomalies.length > 0) {
      console.warn("🚨 Trust anomaly detected for user:", token.userId)
      anomalies.forEach(a => {
        console.warn(`🔍 ${a.type}: ${Math.round(a.from * 100)}% → ${Math.round(a.to * 100)}%`)
      })
      // System response — e.g. raise security level
      // systemSecurity.raiseLevel(token.userId, "anomaly")
    }

    // Logging anomalies
    if (anomalies.length > 0) {
      anomalies.forEach(a => {
        log({
          type: "trust.anomaly",
          userId: token.userId,
          delta: a.delta,
          from: a.from,
          to: a.to,
          status: "⚠️ Detected",
          time: a.time
        })

        // System response
        if (a.severity === "🚨") {
          raiseSecurityLevel(token.userId, "Trust drop anomaly")
        }
      })
    }


    // Fine-tuning trust based on user activity
      const successRate = record.success / record.attempts // Success rate
      const deniedRatio = record.denied / record.attempts // Denied ratio
      const base = token.trust // Base trust

      // Fine adjustment
    const newTrust = Math.max(0.01, Math.min(1.0, base + successRate * 0.05 - deniedRatio * 0.07))

    record.trust = newTrust // Update trust

    // Logging history
    this.history.push({
      time: Date.now(),
      intent,
      snapshot,
      userId: token.userId,
      approved,
      oldTrust: base,
      newTrust
    })

    return { ...record }
  }

  /**
   * Returns the trust level for a user.
   * @param {string} userId - User ID.
   * @returns {number|null} - User trust or null.
   */
  getTrustFor(userId) {
    return this.records[userId]?.trust || null
  }

  /**
   * Returns a description of a user.
   * @param {string} userId - User ID.
   * @returns {Object|null} - User description or null.
   */
  describeUser(userId) {
    return this.records[userId] || null
  }

  /**
   * Returns the monitoring history.
   * @returns {Array} - Monitoring history.
   */
  getHistory() {
    return this.history
  }
}

module.exports = TrustSupervisor