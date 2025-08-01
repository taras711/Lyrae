const AuditService = require("../../core/services/AuditService")
const audit = new AuditService()

audit.log({
  scenario: "recovery",
  userId: "USR-1499",
  command: "run-scenario:recovery",
  trust: 0.86
})

audit.log({
  scenario: "login",
  userId: "USR-1499",
  command: "run-scenario:login",
  trust: 0.86
})

console.log("📜 Audit historie:")
console.log(audit.getHistory({ userId: "USR-1499" }))

console.log("📊 Audit souhrn:")
console.log(audit.summarize())