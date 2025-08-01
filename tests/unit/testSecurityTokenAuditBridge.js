const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const {
  log,
  getAll,
  filterByUser,
  filterByType,
  exportToFile
} = require("../../core/services/PersistentAuditService")

// 🔐 Vytvoř token pro test
const token = new SecurityToken(signToken({
  userId: "USR-5555",
  role: "tester",
  trust: 0.44
}))

// 🔑 Vytvoř auditní záznam
console.log("🔑 Token audit entry generated for user:", token.userId)
token.generateAuditEntry("token.verify", "✅ Valid check")

// 🔍 Získej záznamy typu 'token.activity'
const tokenAudits = filterByType("token.activity")
console.log("🧠 Token Audit Entries:")

if (!tokenAudits || tokenAudits.length === 0) {
  console.log("📭 Žádné auditní záznamy typu 'token.activity' nebyly nalezeny.")
} else {
  tokenAudits.forEach(e => {
    console.log(`[${new Date(e.time).toLocaleTimeString()}] ${e.userId} → ${e.action} → ${e.status}`)
  })
}

// 🔬 Debug: výpis všech typů auditních záznamů
const allTypes = getAll().map(e => e.type)
console.log("🔬 Debug log:", allTypes)