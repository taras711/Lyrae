/*

  It tests the routing of intents based on the provided DSL and command logger.

*/

const CommandLogger = require("../../services/logger/CommandLogger")
const IntentRouter = require("../../core/router/IntentRouter")

const logger = new CommandLogger()
logger.log({ command: "run-scenario:recovery", result: ["OK"] })
logger.log({ command: "diagnostics", result: ["State: Recovery"] })

const dsl = `
panel RecoveryPanel {
  when: intent.focus == "recovery"
  show: true
}
panel AuditPanel {
  when: intent.focus == "audit"
  show: true
}
`

const router = new IntentRouter(logger, dsl)
const result = router.route()

console.log("🧭 Routing decision:")
console.log(result)