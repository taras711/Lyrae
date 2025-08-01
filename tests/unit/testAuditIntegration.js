const SessionController = require("../../core/runtime/SessionController")
const controller = new SessionController({ userId: "USR-1499", role: "admin", trustScore: 0.92 })

controller.start()
controller.activateScenario("recovery", { tokenValid: true })
controller.activateScenario("login", { valid: false, retry: 2 })

console.log("📊 Shrnutí auditní stopy:")
console.log(controller.getAuditSummary())

console.log("📜 Filtrovaný audit log (pouze recovery):")
console.log(controller.getAuditLog({ scenario: "recovery" }))