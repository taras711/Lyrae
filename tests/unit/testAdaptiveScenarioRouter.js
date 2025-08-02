/*

This test suite contains tests for the AdaptiveScenarioRouter.

*/

const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const { raiseSecurityLevel } = require("../../core/security/SystemSecurityManager")
const { routeScenario } = require("../../scenarios/AdaptiveScenarioRouter")

const token = new SecurityToken(signToken({
  userId: "USR-1007",
  role: "auditor",
  trust: 0.41
}))

raiseSecurityLevel(token.userId, "Triggered elevation")

const output = routeScenario(token, {
  name: "CriticalExport",
  minTrust: 0.5,
  maxSecurityLevel: 2,
  standardScenario: (t) => `Standard mode for ${t.userId}`,
  sandboxScenario: (t) => `Sandbox mode for ${t.userId} (read-only)`,
  blockedScenario: (t) => `Blocked for ${t.userId}`
})

console.log("Scenario routing output:", output)