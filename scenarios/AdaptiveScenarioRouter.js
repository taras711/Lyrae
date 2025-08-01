/**

 * @author Starass

 * @module AdaptiveScenarioRouter

 * @description This module handles routing of adaptive scenarios based on user trust and security level.

 */

const { getSecurityLevel } = require("../core/security/SystemSecurityManager")
const { log } = require("../core/services/PersistentAuditService")

/**
 * Routes the scenario based on user trust and security level.
 * @param {Object} token - The user token.
 * @param {Object} variants - The scenario variants.
 * @returns {Promise<string>} The result of the routed scenario.
 */
function routeScenario(token, variants = {}) {
  const trust = token.trust // User trust level
  const level = getSecurityLevel(token.userId) // User security level

  // Scenario variants
  const {
    name = "UnnamedAdaptiveScenario",
    standardScenario,
    sandboxScenario,
    blockedScenario,
    minTrust = 0.5,
    maxSecurityLevel = 2
  } = variants

  // Check trust and security level
  if (trust < minTrust || level > maxSecurityLevel) {
    log({
      type: "scenario.routed",
      userId: token.userId,
      trust,
      securityLevel: level,
      status: "🔁 Redirected to sandbox",
      scenario: name,
      time: Date.now()
    })

    // Fallback — pokud scénář nemá sandbox
    if (typeof sandboxScenario === "function") {
      return sandboxScenario(token)
    }
    return `⛔ Scenario '${name}' cannot run — no sandbox available`
  }

  // Check if standard scenario is a function
  if (typeof standardScenario === "function") {
    log({
      type: "scenario.routed",
      userId: token.userId,
      trust,
      securityLevel: level,
      status: "✅ Routed to standard",
      scenario: name,
      time: Date.now()
    })
    return standardScenario(token)
  }

  // Check if sandbox scenario is a function
  if (typeof sandboxScenario === "function") {
    return sandboxScenario(token)
  }

  return `🔒 Scenario '${name}' blocked by AdaptiveScenarioRouter`
}

module.exports = {
  routeScenario
}