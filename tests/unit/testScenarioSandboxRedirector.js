const { redirectBlockedScenario } = require("../../scenarios/ScenarioSandboxRedirector")
const { wrapScenario } = require("../../scenarios/ScenarioSafetyWrapper")

// 🔐 Vytvoř token
const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const user = { userId: "USR-7001", role: "developer", trust: 0.42 }
const token = new SecurityToken(signToken(user))
// ⛔ Zvýšíme bezpečnostní úroveň ručně
const mainScenario = (token) => {
  return `✅ Scénář spuštěn pro ${token.userId}`
}
const { raiseSecurityLevel } = require("../../core/security/SystemSecurityManager")
raiseSecurityLevel(token.userId, "Test elevation")
const output = wrapScenario(mainScenario, token, {
  minTrust: 0.5,
  maxSecurityLevel: 2,
  name: "DataExportScenario",
  onBlock: (info) => {
    const result = redirectBlockedScenario(info, token, (t) => {
      return `🧪 Sandbox export for ${t.userId} (read-only mode)`
    })
    console.log("🔄 Sandbox result:", result)
  }
})
console.log("🧪 Scenario output:", output)
