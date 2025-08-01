const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")

const controller = new SessionController({
  userId: "USR-505",
  role: "admin",
  trustScore: 0.91
})

controller.start()

const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)

console.log("🧭 Příkaz: diagnostics")
console.log(cli.run("diagnostics").join("\n"))

console.log("\n🔐 Příkaz: get-token")
console.log(cli.run("get-token"))

console.log("\n🖼️ Příkaz: get-component")
console.log(cli.run("get-component"))

console.log("\n📦 Příkaz: list-scenarios")
console.log(cli.run("list-scenarios"))

console.log("\n🔄 Příkaz: run-scenario:recovery")
console.log(cli.run("run-scenario:recovery").join("\n"))