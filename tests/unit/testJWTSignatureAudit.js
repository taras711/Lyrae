
const crypto = require("crypto")
const config = require("../../config")
const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const {
  recordSignatureAttempt,
  getAllAttempts,
  exportAttemptsToJSON
} = require("../../core/services/JWTSignatureAudit")

const SECRET = config.jwtSecret

// User simulation
const testUsers = [
  { userId: "USR-1001", role: "user", trust: 0.42 },
  { userId: "USR-1002", role: "admin", trust: 0.89 },
  { userId: "USR-1003", role: "guest", trust: 0.13 }
]

// Token creation and verification simulation
testUsers.forEach(user => {
  const jwtString = signToken(user)
  const token = new SecurityToken(jwtString)

  // Verification with real secret
  const resultA = token.verifySignature(SECRET) ? "valid" : "invalid"
  recordSignatureAttempt({
    tokenId: jwtString.slice(0, 12),
    userId: token.userId,
    role: token.role,
    trust: token.trust,
    attemptedSignature: jwtString.split(".")[2],
    result: resultA
  })

  // Verification with incorrect secret
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

// Audit log extract
console.log("JWT Signature Audit Log:")
getAllAttempts().forEach(entry => {
  console.log(`${new Date(entry.timestamp).toLocaleTimeString()} | ${entry.userId} (${entry.role}) → ${entry.result}`)
})

// Export to file
exportAttemptsToJSON("signatureAuditLog.json")