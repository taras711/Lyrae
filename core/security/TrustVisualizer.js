/**

 * @author Starass

 * @module TrustVisualizer

 * @description This module visualizes user trust levels.

 */

class TrustVisualizer {
  /**
   * @constructor
   * @param {TrustSupervisor} trustSupervisor - Instance of TrustSupervisor.
   */
  constructor(trustSupervisor) {
    this.trustSource = trustSupervisor
  }

  /**
   * Returns the trust evolution for a user.
   * @param {string} userId - User ID.
   * @returns {Array} - Trust evolution.
   */
  getTrustEvolution(userId) {
    const log = this.trustSource.getHistory().filter(e => e.userId === userId)
    return log.map(entry => ({
      time: new Date(entry.time).toISOString(),
      intent: entry.intent,
      approved: entry.approved,
      trustBefore: entry.oldTrust,
      trustAfter: entry.newTrust
    }))
  }

  /**
   * Draws an ASCII trust chart for a user.
   * @param {string} userId - User ID.
   * @returns {string} - ASCII trust chart.
   */
  drawAsciiTrustChart(userId) {
    const data = this.getTrustEvolution(userId)
    const chart = []

    for (const entry of data) {
      const value = Math.round(entry.trustAfter * 100)
      const bar = "█".repeat(Math.floor(value / 2)).padEnd(50, "░")
      chart.push(`${entry.time} | ${entry.intent.padEnd(12)} | ${bar} ${value}%`)
    }

    return chart.join("\n")
  }

  /**
   * Summarizes user information.
   * @param {string} userId - User ID.
   * @returns {Object} - User information summary.
   */
  summary(userId) {
    const latest = this.trustSource.describeUser(userId)
    return {
      userId,
      trust: latest?.trust ?? null,
      success: latest?.success,
      denied: latest?.denied,
      attempts: latest?.attempts
    }
  }
}

module.exports = TrustVisualizer