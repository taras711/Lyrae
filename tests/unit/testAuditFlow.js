/*

This test suite contains tests for the AuditFlow.

*/

const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const AuditSector = require("../../sectors/audit/AuditSector")
const AuditLogger = require("../../services/logger/AuditLogger")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("Running AuditFlow...\n")

// Low trust token
const token = new Token({
  userId: "USR-999",
  role: "user",
  trustScore: 0.29
})

// Context and scenario setup
const context = { session: {} }
const scenario = new LoginScenario(context)
scenario.run({ id: "USR-999", valid: true, trustScore: token.trustScore })

// Audit sector analyzes scenario log
const auditSector = new AuditSector(context, token, scenario.getLog())
const auditActions = auditSector.resolve()

// Audit logger processes actions
const logger = new AuditLogger()
auditActions.forEach(msg => {
  logger.log({ message: msg, token, scenario })
})

// Component reacts to audit mode
const renderer = new ComponentRenderer(context)
const output = renderer.render()

// Output
console.log("Audit logs:")
console.log(logger.exportAsJSON())

console.log("\nComponent visualization:")
console.log(output.join("\n"))

console.log("\nToken audit mode:", token.auditMode ? "Active" : "Inactive")