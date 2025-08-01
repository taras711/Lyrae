const Token = require("../../core/token/Token")
const ActionExecutor = require("../../services/executor/ActionExecutor")

const token = new Token({
  userId: "USR-501",
  role: "admin",
  trustScore: 0.83
})

const context = {}
const executor = new ActionExecutor(context, token)

const actions = ["EnableDashboard", "LoadAdminPanel", "ActivateAuditMode"]
const result = executor.run(actions)

console.log("⚡ Vykonané akce:")
console.log(result.join("\n"))
console.log("\n🧠 Context po vykonání:")
console.log(executor.getState())
console.log("🔐 Token audit mode:", token.auditMode)
// Output the final context and token state
console.log("🧠 Context:", context)
console.log("🧠 Token:", token.info())