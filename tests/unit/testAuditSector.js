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

console.log("🔍 AuditSector akce:")
console.log(actions.join("\n"))
console.log("\n🔐 Audit mode aktivní:", token.auditMode ? "✅ Ano" : "❌ Ne")