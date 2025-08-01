const SectorNode = require("../../sectors/SectorNode")
const SectorOrchestrator = require("../../sectors/orchestration/SectorOrchestrator")
const SecurityToken = require("../../core/security/securityToken")

const token = new SecurityToken({ userId: "USR-1499", role: "admin", trust: 0.99 })
const coreSector = new SectorNode({ id: "CoreSector", token })
const diagSector = new SectorNode({ id: "DiagnosticsUnit", token })

const orchestrator = new SectorOrchestrator()
orchestrator.registerSector("CoreSector", coreSector)
orchestrator.registerSector("DiagnosticsUnit", diagSector)

orchestrator.mapIntent("recovery", "CoreSector")
orchestrator.mapIntent("diagnostics", "DiagnosticsUnit")

const output = orchestrator.activateIntent("recovery", token, { tokenValid: true })
console.log("🧠 Výstup aktivace záměru:", output)

orchestrator.send("DiagnosticsUnit", "Start diagnostics mode")

console.log("📜 Stav orchestrátoru:")
console.log(orchestrator.describe())