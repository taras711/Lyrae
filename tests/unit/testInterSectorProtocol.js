/*

  It tests the inter-sector protocol for handling intents and reactions between sectors.

*/

const SecurityToken = require("../../core/security/SecurityToken")
const SectorNode = require("../../sectors/SectorNode")
const SectorOrchestrator = require("../../sectors/orchestration/SectorOrchestrator")
const InterSectorProtocol = require("../../sectors/orchestration/InterSectorProtocol")

// Token preparation
const token = new SecurityToken({
  userId: "USR-1499",
  role: "admin",
  trust: 0.6
})

// Sector setup
const coreSector = new SectorNode({ id: "CoreSector", token })
const auditSector = new SectorNode({ id: "AuditCenter", token })

// Orchestrator
const orchestrator = new SectorOrchestrator()
orchestrator.registerSector("CoreSector", coreSector)
orchestrator.registerSector("AuditCenter", auditSector)

orchestrator.evaluator.registerRule("recovery", [
  { role: "admin", trustMin: 0.5, sector: "CoreSector" } // token does not comply → DENIED
])
orchestrator.evaluator.registerRule("alert", [
  { role: "admin", trustMin: 0.5, sector: "AuditCenter" }
])

// Protocol setup
const protocol = new InterSectorProtocol()

protocol.registerReaction("recovery", {
  triggerStatus: "ABORTED",
  targetSector: "AuditCenter",
  forwardIntent: "alert"
})

// Run the protocol
console.log("launching the inter-sector protocol...\n")
const recoveryResult = orchestrator.activateIntent("recovery", token, { reason: "Test flow" })
console.log("Recovery output:", recoveryResult)

// Evaluation of intersectoral response
const reactions = protocol.handleSectorOutput(recoveryResult, orchestrator)
console.log("Triggered reactions:", reactions)

// Log history of the protocol
console.log("\nProtocol history")
console.log("Flow of reaction history:")
console.log(protocol.describe().history)