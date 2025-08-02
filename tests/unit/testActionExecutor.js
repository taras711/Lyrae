/*

This test suite contains tests for the ActionExecutor.

*/

const Token = require("../../core/token/Token")
const ActionExecutor = require("../../services/executor/ActionExecutor")

const token = new Token({
  userId: "USR-501",
  role: "admin",
  trustScore: 0.83
})

const context = {}
const executor = new ActionExecutor(context, token)

const actions = ["EnableDashboard", "LoadAdminPanel", "ActivateAuditMode"]
const result = executor.run(actions)

console.log("Executed actions:")
console.log(result.join("\n"))
console.log("\n Context after execution:")
console.log(executor.getState())
console.log("Token audit mode:", token.auditMode)
// Output the final context and token state
console.log("Context:", context)
console.log("Token:", token.info())