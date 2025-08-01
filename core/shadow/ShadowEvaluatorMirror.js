/**

 * @author Starass

 * @module ShadowEvaluatorMirror

 * @description This module handles mirroring of shadow evaluations.

 */

/**
 * Creates a shadow mirror for evaluating intents.
 * @param {Function} evaluatorDescribeFn - The function to describe the evaluator.
 * @returns {Object} - The shadow mirror object.
 */
function createShadowMirror(evaluatorDescribeFn) {
  const ruleset = evaluatorDescribeFn() // Invoke the evaluator describe function to get the ruleset

  function mirrorEvaluate(intent, ghostToken) {
    const rules = ruleset[intent] || []

    for (const rule of rules) {
      const trustOk = ghostToken.trust >= (rule.trustMin || 0)
      const roleOk = rule.role === ghostToken.role || rule.role === "*" || (ghostToken.hasPermission && ghostToken.hasPermission("*"))

      // Check if the ghost token meets the rule's trust and role requirements
      if (rule.mirror && trustOk && roleOk) {
        return {
          intent,
          approved: true,
          sector: rule.sector,
          mirror: true,
          reason: `🪞 Shadow mirror matched role '${rule.role}' and trust ≥ ${rule.trustMin}`
        }
      }
    }
    // No matching rule found
    return {
      intent,
      approved: false,
      mirror: true,
      reason: `🪞 No matching mirror rule for role '${ghostToken.role}' with trust ${ghostToken.trust}`
    }
  }

  return { mirrorEvaluate }
}

module.exports = { createShadowMirror }