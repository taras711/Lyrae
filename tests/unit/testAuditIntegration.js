/*

This test suite contains tests for the AuditIntegration.

*/

const SessionController = require("../../core/runtime/SessionController")
const controller = new SessionController({ userId: "USR-1499", role: "admin", trustScore: 0.92 })

controller.start()
controller.activateScenario("recovery", { tokenValid: true })
controller.activateScenario("login", { valid: false, retry: 2 })

console.log("Audit trail summary:")
console.log(controller.getAuditSummary())

console.log("Filtered audit log (recovery only):")
console.log(controller.getAuditLog({ scenario: "recovery" }))