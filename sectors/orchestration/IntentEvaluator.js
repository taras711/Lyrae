/**

 * @author Starass

 * @module IntentEvaluator

 * @description This module handles the evaluation of intents based on user roles and trust levels.

 */

class IntentEvaluator {

  /**
   * @constructor
   * @param {Object} rules - The initial rules for intent evaluation.
   */
  constructor(rules = {}) {
    this.rules = rules // Example: { diagnostics: [{ role: 'admin', trustMin: 0.6, sector: 'DiagnosticsUnit' }] }
  }

  /**
   * Registers a new rule for intent evaluation.
   * @param {string} intent - The intent to register the rule for.
   * @param {Array} conditions - The conditions for the rule.
   */
  registerRule(intent, conditions) {
    this.rules[intent] = conditions // array of condition objects
  }

  /**
   * Evaluates an intent against the provided token and context.
   * @param {string} intent - The intent to evaluate.
   * @param {Object} token - The token representing the user's context.
   * @param {Object} context - Additional context for the evaluation.
   * @returns {Object} The result of the evaluation.
   */
  evaluate(intent, token, context = {}) {
    const candidates = this.rules[intent] || []

    for (const rule of candidates) {
      const trustOk = token.trust >= (rule.trustMin || 0)
      const roleOk = rule.role === token.role || rule.role === "*" || token.hasPermission("*")

      if (trustOk && roleOk) {
        return {
          intent,
          approved: true,
          sector: rule.sector,
          reason: `Matched role '${rule.role}' with trust ≥ ${rule.trustMin}`
        }
      }
    }

    return {
      intent,
      approved: false,
      reason: `No matching rule for role '${token.role}' with trust ${token.trust}`
    }
  }

  /**
   * Describes the current rules.
   * @returns {Object} The current rules.
   */
  describe() {
    return this.rules
  }
}

module.exports = IntentEvaluator