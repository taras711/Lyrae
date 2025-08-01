const SecurityToken = require("../../core/security/securityToken")
const TrustSupervisor = require("../../core/security/TrustSupervisor")

const token = new SecurityToken({ userId: "USR-1499", role: "admin", trust: 0.7 })
const supervisor = new TrustSupervisor()

console.log("🔍 Start trust:", token.trust)

supervisor.observeIntent({ token, intent: "recovery", approved: false })
supervisor.observeIntent({ token, intent: "audit", approved: true })
supervisor.observeIntent({ token, intent: "diagnostics", approved: false })

console.log("📊 Výsledek pro USR-1499:")
console.log(supervisor.describeUser("USR-1499"))

console.log("📜 Historie:")
console.log(supervisor.log())