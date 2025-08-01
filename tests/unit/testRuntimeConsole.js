const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")
const RuntimeConsole = require("../../components/runtime/RuntimeConsole")

const controller = new SessionController({
  userId: "USR-999",
  role: "admin",
  trustScore: 0.81
})

controller.start()

const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)
const consoleUI = new RuntimeConsole(cli)

const commands = ["diagnostics", "get-token", "list-scenarios", "run-scenario:recovery"]

commands.forEach(cmd => {
  const view = consoleUI.render(cmd)
  console.log(view.join("\n"))
  console.log("─".repeat(40))
})