const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const {
  recordTokenSnapshot,
  getHistoryForUser,
  getAllSnapshots
} = require("../../core/security/history/SecurityTokenHistory")

const user = { userId: "USR-3090", role: "analyst", trust: 0.71 }

// 🔑 Vytvoření tokenu
const token = new SecurityToken(signToken(user))

// 📜 Zaloguj stav
recordTokenSnapshot(token, "testRun")

// 📋 Zobraz historie pro uživatele
const history = getHistoryForUser("USR-3090")
console.log("📜 Token History for USR-3090:")
history.forEach(entry => {
  console.log(
    `⏱️ ${new Date(entry.time).toLocaleTimeString()} | Role: ${entry.role} | Trust: ${entry.trust} | Expired: ${entry.expired}`
  )
})

// 📦 Zobraz celý log
console.log("\n📋 Full History Snapshot:", getAllSnapshots().length)