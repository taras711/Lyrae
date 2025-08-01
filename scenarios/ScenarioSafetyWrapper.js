/**

 * @author Starass

 * @module ScenarioSafetyWrapper

 * @description This module handles auditing of scenario execution attempts.

 */

const { getSecurityLevel } = require("../core/security/SystemSecurityManager")
const { log } = require("../core/services/PersistentAuditService")
const { redirectBlockedScenario } = require("./ScenarioSandboxRedirector")

/**
 * Wraps a scenario function with safety checks.
 * @param {Function} scenarioFn - The scenario function to wrap.
 * @param {Object} token - The user token.
 * @param {Object} options - Additional options for wrapping.
 * @returns {Object} The result of the wrapped scenario.
 */
function wrapScenario(scenarioFn, token, options = {}) {
  const minTrust = options.minTrust || 0.5 // Max level of trust
  const maxRiskLevel = options.maxSecurityLevel || 3 // Max risk level

  const actualTrust = token.trust // Actual trust level
  const securityLevel = getSecurityLevel(token.userId) // Security level
  const isBlocked = actualTrust < minTrust || securityLevel > maxRiskLevel // Blocked status

  // Log blocked scenario
  if (isBlocked) {
    const blockInfo = {
      type: "scenario.blocked",
      userId: token.userId,
      role: token.role,
      trust: actualTrust,
      status: "❌ Blocked",
      reason: "Trust or security restriction",
      scenario: options.name || "UnnamedScenario",
      time: Date.now(),
      securityLevel,
      minTrust,
      maxSecurityLevel: maxRiskLevel
    }
    // Log blocked scenario
    log(blockInfo)

    // Call onBlock callback if provided
    if (typeof options.onBlock === "function") {
      options.onBlock(blockInfo)
    }

    // Log blocked scenario
    console.warn(`🚫 Scenario "${options.name || "UnnamedScenario"}" blocked for user ${token.userId} due to low trust (${actualTrust}) or elevated security level (${securityLevel}).`)

    return {
      allowed: false,
      reason: "Blocked due to low trust or elevated security level",
      trust: actualTrust,
      securityLevel
    }
  }

  // Log allowed scenario
  log({
    type: "scenario.allowed",
    userId: token.userId,
    role: token.role,
    trust: actualTrust,
    status: "✅ Allowed",
    scenario: options.name || "UnnamedScenario",
    time: Date.now()
  })

  // Execute scenario
  const result = scenarioFn(token)

  return {
    allowed: true,
    result
  }
}

module.exports = {
  wrapScenario
}