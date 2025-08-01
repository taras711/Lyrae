const SecurityToken = require("../core/security/TokenSecurity")
const { signToken } = require("../core/security/TokenSecurityLayer")
const { inspectSecurityToken } = require("../tools/cli/SecurityTokenInspector")

const tokenString = signToken({
  userId: "USR-1499",
  role: "admin",
  trust: 0.81
})

const token = new SecurityToken(tokenString)

inspectSecurityToken(token).forEach(line => console.log(line))
