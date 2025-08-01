const Token = require("../../core/token/Token")
const LoginSector = require("../../sectors/login/loginSector")

const token = new Token({
  userId: "USR-501",
  role: "admin",
  trustScore: 0.83
})

const sector = new LoginSector({}, token)
const serverReply = { type: "success" }

const result = sector.resolve(serverReply)

console.log("⚡ Sektorové akce:", result)