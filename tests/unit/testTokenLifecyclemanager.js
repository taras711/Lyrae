const { isExpiringSoon, revokeToken, isRevoked } = require("../../core/security/TokenLifecycleManager")
const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")

const tokenString = signToken({ userId: "USR-1010", role: "user", trust: 0.5 })
const token = new SecurityToken(tokenString)

console.log("⏱️ Expiring soon:", isExpiringSoon(token))           // false
revokeToken(token.rawToken.slice(0, 12))
console.log("🛑 Revoked:", isRevoked(token.rawToken.slice(0, 12))) // true
console.log("🔍 Is revoked:", isRevoked(token.rawToken.slice(0, 12))) // true
console.log("🔍 Is revoked (new token):", isRevoked(signToken({ userId: "USR-1010", role: "user", trust: 0.5 })))