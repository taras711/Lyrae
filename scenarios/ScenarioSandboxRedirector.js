/**

 * @author Starass

 * @module ScenarioSandboxRedirector

 * @description This module handles redirecting blocked scenarios to a sandbox environment.

 */

/**
 * Redirects a blocked scenario to a sandbox environment.
 * @param {Object} info - Information about the blocked scenario.
 * @param {Object} token - The user token.
 * @param {Function} sandboxFn - The sandbox function to execute.
 * @returns {Object} The result of the sandbox execution.
 */
function redirectBlockedScenario(info, token, sandboxFn) {
  console.warn(`🚧 Redirected to sandbox for ${info.userId} (${Math.round(info.trust * 100)}%)`)

  const result = sandboxFn(token) // Execute sandbox function

  return {
    redirected: true,
    originalScenario: info.scenario,
    reason: info.reason,
    trust: info.trust,
    securityLevel: info.securityLevel,
    sandboxResult: result
  }
}

module.exports = {
  redirectBlockedScenario
}