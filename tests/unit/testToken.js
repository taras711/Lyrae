const Token = require("../../core/token/Token")

console.log("🔐 Generuji test tokenu...")

const myToken = new Token({
  userId: "USR-501",
  role: "admin",
  trustScore: 0.83,
  auditMode: false
})

console.log("🧠 Token validní:", myToken.isValid())
console.log("🧠 Fingerprint:", myToken.getFingerprint())
console.log("🧠 Info:", myToken.info())