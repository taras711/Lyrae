/*

This test suite contains tests for the SessionController.

*/

const SessionController = require("../../core/runtime/SessionController")

const controller = new SessionController({
  userId: "USR-901",
  role: "admin",
  trustScore: 0.86
})

const output = controller.start()

console.log("Output:")
console.log("Scenario:", output.state)
console.log("Component:", output.componentView.join("\n"))
console.log("Audit log:", output.auditLog)
console.log("Token info:", output.tokenInfo)