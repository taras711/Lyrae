/*

This test suite contains tests for the AuditSector.

*/

const Token = require("../../core/token/Token")
const AuditSector = require("../../sectors/audit/AuditSector")

const token = new Token({
  userId: "USR-999",
  role: "user",
  trustScore: 0.29
})

const mockLog = [
  "→ State: INIT",
  "Auth result: LOCKED",
  "→ State changed to: LOCKED"
]

const sector = new AuditSector({}, token, mockLog)
const actions = sector.resolve()

console.log("AuditSector actions:")
console.log(actions.join("\n"))
console.log("\nAudit mode active:", token.auditMode ? "Yes" : "No")