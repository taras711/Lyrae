const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")

const tokenString = signToken({
  userId: "USR-1499",
  role: "admin",
  trust: 0.81
})

const token = new SecurityToken(tokenString)
console.log("Token info:", token.info())
console.log("🔍 JWT debug:", token.describeJWT())
console.log("Is valid:", token.isValid())
console.log("Is admin:", token.isAdmin())
console.log("Is user:", token.isUser())
console.log("Is guest:", token.isGuest())
