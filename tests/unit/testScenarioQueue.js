// ✅ Test: testGhostScenarioQueue.js

const {
  enqueueGhostScenario,
  listGhostScenarios,
  expireGhostScenario,
  activateGhostScenario
} = require("../../sectors/orchestration/ghostScenarioQueue")

console.log("🧪 Začíná testování ghostScenarioQueue...")

// 🔹 Vložení scénáře
const ghost1 = enqueueGhostScenario({
  clientId: "USR-1499",
  intent: "alert",
  sectorId: "AuditCenter",
  trustLevel: 0.82
})
console.log("➕ Vložen ghost scénář:", ghost1)

// 🔹 Vložení druhého scénáře
const ghost2 = enqueueGhostScenario({
  clientId: "USR-1500",
  intent: "recovery",
  sectorId: "RecoveryHub",
  trustLevel: 0.9
})
console.log("➕ Vložen ghost scénář:", ghost2)

// 🔍 Výpis všech scénářů
const allScenarios = listGhostScenarios()
console.log("📋 Seznam latentních scénářů:", allScenarios)

// 🧯 Expirace jednoho scénáře
expireGhostScenario(ghost1.id)
console.log(`⚠️ Scénář ${ghost1.id} označen jako expirovaný.`)

// 🚀 Aktivace druhého scénáře
activateGhostScenario(ghost2.id)
console.log(`✅ Scénář ${ghost2.id} aktivován.`)

// 📋 Znovu výpis pro kontrolu stavů
const updatedScenarios = listGhostScenarios()
console.log("📜 Aktualizovaný seznam scénářů:", updatedScenarios)