/*

This test suite contains tests for the AuditLogger.

*/

const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const AuditLogger = require("../../services/logger/AuditLogger")

console.log("Testing AuditLogger...\n")

const token = new Token({
  userId: "USR-404",
  role: "user",
  trustScore: 0.29
})

const scenario = new LoginScenario({ session: {} })
scenario.run({ id: "USR-404", valid: true, trustScore: token.trustScore })

const logger = new AuditLogger()

logger.log({
  message: "Scenario locked due to low trustScore",
  token,
  scenario
})

logger.log({
  message: "Token requires audit mode",
  token,
  scenario
})

console.log("Audit log history:")
console.log(logger.getHistory())