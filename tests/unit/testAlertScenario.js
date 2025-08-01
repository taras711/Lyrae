// ✅ Imports
const SecurityToken = require("../../core/security/securityToken")
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

// 2️⃣ Sektory
const coreSector = new SectorNode({ id: "CoreSector", token })
const auditSector = new SectorNode({ id: "AuditCenter", token })

// 3️⃣ Registrace scénářů
auditSector.registerScenario("alert", AlertScenario)

// 4️⃣ Orchestrátor
const orchestrator = new SectorOrchestrator()

orchestrator.registerSector("CoreSector", coreSector)
orchestrator.registerSector("AuditCenter", auditSector)

// Pravidla rozhodování
orchestrator.evaluator.registerRule("recovery", [
  { role: "admin", trustMin: 0.9, sector: "CoreSector" }
])

orchestrator.evaluator.registerRule("alert", [
  { role: "admin", trustMin: 0.5, sector: "AuditCenter" }
])

// 5️⃣ Protokol reakcí
const protocol = new InterSectorProtocol()

protocol.registerReaction("recovery", {
  triggerStatus: "ABORTED",
  targetSector: "AuditCenter",
  forwardIntent: "alert"
})

async function runTest() {
  const recoveryOutput = await orchestrator.activateIntent("recovery", token, {
    action: "simulate_failure"
  })

  console.log("🧠 Výstup recovery:", recoveryOutput)
  console.log("🔍 Received status:", recoveryOutput.status)

  const reactions = protocol.handleSectorOutput(recoveryOutput, orchestrator)
for (const reaction of reactions) {
    try {
        const result = await reaction
        console.log("📡 Výstup reakce:", result)
    } catch (err) {
        console.error("❌ Chyba reakce:", err)
    }
}

  console.log("📜 Tok reakční historie:", protocol.describe().history)
}

runTest()