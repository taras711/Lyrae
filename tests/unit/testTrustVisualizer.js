const SecurityToken = require("../../core/security/securityToken")
const TrustSupervisor = require("../../core/security/TrustSupervisor")
const TrustVisualizer = require("../../core/security/TrustVisualizer")

const token = new SecurityToken({ userId: "USR-1499", role: "user", trust: 0.7 })
const supervisor = new TrustSupervisor()

supervisor.observeIntent({ token, intent: "recovery", approved: false })
supervisor.observeIntent({ token, intent: "audit", approved: true })
supervisor.observeIntent({ token, intent: "diagnostics", approved: false })

const visualizer = new TrustVisualizer(supervisor)

console.log("📊 Evoluce důvěry:")
console.log(visualizer.drawAsciiTrustChart("USR-1499"))

console.log("\n🧠 Shrnutí:")
console.log(visualizer.summary("USR-1499"))