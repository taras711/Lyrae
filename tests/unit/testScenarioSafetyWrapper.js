const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const { raiseSecurityLevel } = require("../../core/security/SystemSecurityManager")
const { wrapScenario } = require("../../scenarios/ScenarioSafetyWrapper")

// 🔐 Vytvoř token
const token = new SecurityToken(signToken({
  userId: "USR-7001",
  role: "developer",
  trust: 0.42
}))

// ⛔ Zvýšíme bezpečnostní úroveň ručně
raiseSecurityLevel(token.userId, "Test elevation")

// 🧪 Simuluj scénář
function sampleScenario(token) {
  return `✅ Scénář spuštěn pro ${token.userId}`
}

// 🛡️ Obalíme
const result = wrapScenario(sampleScenario, token, {
  minTrust: 0.5,
  maxSecurityLevel: 2,
  name: "AccessRestrictedScenario"
})

wrapScenario(sampleScenario, token, {
  minTrust: 0.5,
  maxSecurityLevel: 2,
  name: "SensitiveScenario",
  onBlock: (info) => {
    console.warn(`🛑 Blokováno: ${info.scenario} pro ${info.userId} (${Math.round(info.trust * 100)}%)`)
    // ...např. trigger GUI upozornění nebo interní metriky
  }
})


console.log("🧪 Scenario result:", result)