const crypto = require("crypto")
const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const {
  recordSignatureAttempt,
  getAllAttempts,
  exportAttemptsToJSON
} = require("../../core/services/JWTSignatureAudit")

// ✅ Testovací secret
const SECRET = "nebula-secret"

// 🧑 Simulace uživatelů
const testUsers = [
  { userId: "USR-1001", role: "user", trust: 0.42 },
  { userId: "USR-1002", role: "admin", trust: 0.89 },
  { userId: "USR-1003", role: "guest", trust: 0.13 }
]

// 🧪 Vytvoření tokenů a simulace ověření
testUsers.forEach(user => {
  const jwtString = signToken(user)
  const token = new SecurityToken(jwtString)

  // 🔁 Ověření s reálným secret
  const resultA = token.verifySignature(SECRET) ? "valid" : "invalid"
  recordSignatureAttempt({
    tokenId: jwtString.slice(0, 12),
    userId: token.userId,
    role: token.role,
    trust: token.trust,
    attemptedSignature: jwtString.split(".")[2],
    result: resultA
  })

  // 🔐 Ověření s chybným secret
  const resultB = token.verifySignature("wrong-secret") ? "valid" : "invalid"
  recordSignatureAttempt({
    tokenId: jwtString.slice(0, 12),
    userId: token.userId,
    role: token.role,
    trust: token.trust,
    attemptedSignature: jwtString.split(".")[2],
    result: resultB
  })
})

// 📜 Výpis auditních záznamů
console.log("🔍 JWT Signature Audit Log:")
getAllAttempts().forEach(entry => {
  console.log(`🕒 ${new Date(entry.timestamp).toLocaleTimeString()} | ${entry.userId} (${entry.role}) → ${entry.result}`)
})

// 📁 Export do souboru
exportAttemptsToJSON("signatureAuditLog.json")