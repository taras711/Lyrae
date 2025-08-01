const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🚀 Spouštím behaviorálně řízený tok...\n")

// 1️⃣ Start controlleru
const controller = new SessionController({
  userId: "USR-1001",
  role: "admin",
  trustScore: 0.83
})

controller.start()

// 2️⃣ Vytvoření interface a loggeru
const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)
const logger = cli.logger

// 3️⃣ Simulace příkazové sekvence
cli.run("run-scenario:recovery")
cli.run("diagnostics")
cli.run("get-token")
cli.run("run-scenario:recovery")
cli.run("list-scenarios")

// 4️⃣ Vykreslení komponenty podle záměru
controller.context.commandLogger = logger
controller.context.component = "RecoveryPanel"

const renderer = new ComponentRenderer(controller.context)
const output = renderer.render()

// 5️⃣ Výpis
console.log("🧭 Výstup systému řízený záměrem:")
console.log(output.join("\n"))