/*

This test suite contains tests for the SessionController.

*/

const SessionController = require("../../core/runtime/SessionController")

const controller = new SessionController({
  userId: "USR-905",
  role: "user",
  trustScore: 0.34
})

// Running Recovery Scenario
const recoveryLog = controller.activateScenario("recovery", {
  tokenValid: true,
  userKnown: true
})

// Component output
const view = controller.context.component

console.log("Recovery scenario log:")
console.log(recoveryLog.join("\n"))

console.log("\nComponent:")
console.log(view === "RecoveryPanel" ? "RecoveryPanel displayed." : "No component activated.")