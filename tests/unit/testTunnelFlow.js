const SessionController = require("../../core/runtime/SessionController")
const controller = new SessionController({ userId: "USR-1499", role: "admin", trustScore: 0.86 })

controller.tunnel.listen("audit", entry => {
  console.log("🧾 Audit log:")
  console.log(entry)
})

controller.start()
controller.activateScenario("recovery", { tokenValid: true })