const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🎯 Spouštím behaviorální jazykový tok...\n")

// 1️⃣ Inicializace systému
const controller = new SessionController({
  userId: "USR-1499",
  role: "admin",
  trustScore: 0.86
})
controller.start()

// 2️⃣ Vytvoření příkazového rozhraní a loggeru
const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)
const logger = cli.logger

// 3️⃣ Simulace příkazové sekvence
cli.run("run-scenario:recovery")
cli.run("diagnostics")
cli.run("get-token")
cli.run("diagnostics")
cli.run("run-scenario:recovery")

// 4️⃣ Připojení komponenty a loggeru do kontextu
controller.context.component = "RecoveryPanel"
controller.context.commandLogger = cli.logger

// 5️⃣ Vykreslení výsledku
const renderer = new ComponentRenderer(controller.context)
const view = renderer.render()

console.log("🧭 Výstup vizualizace:")
console.log(view.join("\n"))

console.log("📋 Logger obsahuje:")
console.log(cli.logger.getHistory())
