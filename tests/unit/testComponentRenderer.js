const SessionController = require("../../core/runtime/SessionController")
const CommandInterface = require("../../core/interface/CommandInterface")
const ComponentRenderer = require("../../components/ComponentRenderer")
const CommandLogger = require("../../services/logger/CommandLogger")

const controller = new SessionController({
  userId: "USR-101",
  role: "user",
  trustScore: 0.67
})

controller.start()

const cli = new CommandInterface(controller)
const logger = cli.logger

// Simulace příkazů
cli.run("run-scenario:recovery")
cli.run("run-scenario:recovery")
cli.run("diagnostics")
cli.run("get-token")

// Vykreslení podle záměru
const renderer = new ComponentRenderer({ component: "RecoveryPanel", commandLogger: logger })
const view = renderer.render()

console.log("🧭 Výstup komponenty podle záměru:")
console.log(view.join("\n"))