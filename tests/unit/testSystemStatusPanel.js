const SessionController = require("../../core/runtime/SessionController")
const SystemDiagnostics = require("../../core/diagnostics/SystemDiagnostics")
const SystemStatusPanel = require("../../components/system/SystemStatusPanel")

const controller = new SessionController({
  userId: "USR-901",
  role: "admin",
  trustScore: 0.86
})

controller.start()

const diagnostics = new SystemDiagnostics(controller)
const panel = new SystemStatusPanel(diagnostics.analyze())
const output = panel.render()

console.log("📊 Systémový přehled:")
console.log(output.join("\n"))