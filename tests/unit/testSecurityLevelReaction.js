const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const { recordTokenSnapshot } = require("../../core/security/history/SecurityTokenHistory")
const { detectTrustAnomalies } = require("../../core/security/analysis/TrustAnomalyDetector")
const { raiseSecurityLevel, getSecurityLevel } = require("../../core/security/SystemSecurityManager")

// 🧑 Simulace uživatele
const user = { userId: "USR-9010", role: "dev", trust: 0.75 }
const token = new SecurityToken(signToken(user))

// 📜 Vytvoř dva snapshoty s propadem trust
recordTokenSnapshot(token, "pre-anomaly")
token.trust = 0.38 // 🚨 prudký propad
recordTokenSnapshot(token, "anomaly-trigger")

// 🔎 Detekce anomálií
const history = require("../../core/security/history/SecurityTokenHistory").getHistoryForUser(user.userId)
const anomalies = detectTrustAnomalies(history)

if (anomalies.length === 0) {
  console.log("✅ Žádné důvěryhodnostní anomálie.")
} else {
  anomalies.forEach(a => {
    console.log(`${a.severity} ${a.type} ${Math.round(a.from * 100)}% → ${Math.round(a.to * 100)}%`)
    if (a.severity === "🚨") {
      const result = raiseSecurityLevel(user.userId, "Trust drop detected")
      console.log("🛡️ Security raised:", result)
    }
  })

  const level = getSecurityLevel(user.userId)
  console.log("🔐 Aktuální bezpečnostní úroveň:", level)
}