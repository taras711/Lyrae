const SecurityToken = require("../../core/security/securityToken")
const SectorNode = require("../../sectors/SectorNode")
const SectorOrchestrator = require("../../sectors/orchestration/SectorOrchestrator")
const InterSectorProtocol = require("../../sectors/orchestration/InterSectorProtocol")

// 1️⃣ Příprava tokenu
const token = new SecurityToken({
  userId: "USR-1499",
  role: "admin",
  trust: 0.6
})

// 2️⃣ Sektory
const coreSector = new SectorNode({ id: "CoreSector", token })
const auditSector = new SectorNode({ id: "AuditCenter", token })

// 3️⃣ Orchestrátor
const orchestrator = new SectorOrchestrator()
orchestrator.registerSector("CoreSector", coreSector)
orchestrator.registerSector("AuditCenter", auditSector)

orchestrator.evaluator.registerRule("recovery", [
  { role: "admin", trustMin: 0.5, sector: "CoreSector" } // token nesplňuje → DENIED
])
orchestrator.evaluator.registerRule("alert", [
  { role: "admin", trustMin: 0.5, sector: "AuditCenter" }
])

// 4️⃣ Protokol
const protocol = new InterSectorProtocol()

protocol.registerReaction("recovery", {
  triggerStatus: "ABORTED",
  targetSector: "AuditCenter",
  forwardIntent: "alert"
})

// 5️⃣ Spuštění recovery záměru → odepřen
const recoveryResult = orchestrator.activateIntent("recovery", token, { reason: "Test flow" })
console.log("🧠 Výstup recovery:", recoveryResult)

// 6️⃣ Vyhodnocení mezisektorové reakce
const reactions = protocol.handleSectorOutput(recoveryResult, orchestrator)
console.log("🔁 Spuštěné reakce:", reactions)

// 7️⃣ Log historie
console.log("📜 Tok reakční historie:")
console.log(protocol.describe().history)