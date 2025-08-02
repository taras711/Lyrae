/*

This test suite contains tests for the AlertScenario.

*/

const SecurityToken = require("../../core/security/SecurityToken")
const SectorNode = require("../../sectors/SectorNode")
const SectorOrchestrator = require("../../sectors/orchestration/SectorOrchestrator")
const InterSectorProtocol = require("../../sectors/orchestration/InterSectorProtocol")
const AlertScenario = require("../../sectors/AlertScenario")

// 1️⃣ Token
const token = new SecurityToken({
  userId: "USR-1499",
  role: "admin",
  trust: 0.95
})

// Sectors
const coreSector = new SectorNode({ id: "CoreSector", token })
const auditSector = new SectorNode({ id: "AuditCenter", token })

// Register scenarios
auditSector.registerScenario("alert", AlertScenario)

// Orchestrator
const orchestrator = new SectorOrchestrator()

orchestrator.registerSector("CoreSector", coreSector)
orchestrator.registerSector("AuditCenter", auditSector)

// Decision rules
orchestrator.evaluator.registerRule("recovery", [
  { role: "admin", trustMin: 0.9, sector: "CoreSector" }
])

orchestrator.evaluator.registerRule("alert", [
  { role: "admin", trustMin: 0.5, sector: "AuditCenter" }
])

// Reaction protocol
const protocol = new InterSectorProtocol()

protocol.registerReaction("recovery", {
  triggerStatus: "ABORTED",
  targetSector: "AuditCenter",
  forwardIntent: "alert"
})

// Test function
async function runTest() {
  const recoveryOutput = await orchestrator.activateIntent("recovery", token, {
    action: "simulate_failure"
  })

  console.log("Recovery output:", recoveryOutput)
  console.log("Received status:", recoveryOutput.status)

  const reactions = protocol.handleSectorOutput(recoveryOutput, orchestrator)
for (const reaction of reactions) {
    try {
        const result = await reaction
        console.log("Reaction output:", result)
    } catch (err) {
        console.error("Reaction error:", err)
    }
}

  console.log("Token reaction history:", protocol.describe().history)
}

runTest()