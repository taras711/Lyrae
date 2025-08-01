/**
 
 * @author Starass

 * @module CommandInsights

 * @description This class provides insights into user commands and their context.

 */

class CommandInsights {
  constructor(logger) {
    this.logger = logger
    this.history = logger.getHistory()
    this.total = this.history.length
  }

  /**
   * Returns the timestamp of the last command.
   * @returns {string} - Timestamp of the last command
   */
  getTimestamp() {
    return this.history.at(-1)?.time || "none"
  }

  /**
   * Returns the most common commands.
   * @returns {Array} - List of most common commands
   */
  getTopCommands() {
    const counts = {}
    for (const entry of this.history) {
      counts[entry.command] = (counts[entry.command] || 0) + 1
    }

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([command, count]) => ({ command, count }))
  }

  /**
   * Detects user intent based on command history.
   * @returns {string} - User intent
   */
  detectFocus() {
    const top = this.getTopCommands()[0]?.command || "generic"

    if (top.includes("recovery")) return "recovery"
    if (top.includes("audit")) return "audit"
    if (top.includes("login")) return "login"
    if (top.includes("diagnostics")) return "diagnostics"

    return "generic"
  }

  /**
   * Detects recovery intent based on command history.
   * @returns {string} - Recovery intent
   */
  detectRecovery() {
    const recoveryHits = this.history.filter(h => h.command.includes("recovery")).length
    return recoveryHits >= 1
      ? "🛠️ User is likely addressing state recovery"
      : "✅ No signs of recovery or incident"
  }

  /**
   * Returns a summary of command insights.
   * @returns {Object} - Summary of command insights
   */
  getSummary() {
    return {
      totalCommands: this.total,
      mostUsed: this.getTopCommands(),
      lastCommandAt: this.getTimestamp(),
      focus: this.detectFocus(),            // new key for IntentRouter + DSL
      recoveryIntent: this.detectRecovery()
    }
  }
}

module.exports = CommandInsights