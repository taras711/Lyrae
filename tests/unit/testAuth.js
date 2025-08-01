const AuthCenter = require("../../modules/auth/AuthCenter")

const context = { session: null }

if (context.session == null) {
  context.session = {}
}
// Testování metody initSession
console.log("🔵 Spouštím test initSession...")

const result = AuthCenter.invoke("initSession", {
  userData: { id: "USR-501", valid: true, trustScore: 0.83 }
}, context)

console.log("🟢 Výsledek:", result) // → "ACTIVE"
console.log("🟢 Session:", context.session)
console.log("🟢 Status:", AuthCenter.getProperty("status"))