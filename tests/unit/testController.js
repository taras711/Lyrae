const SessionController = require("../../core/runtime/SessionController")

const controller = new SessionController({
  userId: "USR-901",
  role: "admin",
  trustScore: 0.86
})

const output = controller.start()

console.log("🔁 Výstup controlleru:")
console.log("Scénář:", output.state)
console.log("Komponenta:", output.componentView.join("\n"))
console.log("Audit log:", output.auditLog)
console.log("Token info:", output.tokenInfo)