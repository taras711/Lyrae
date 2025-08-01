const {
  log,
  getAll,
  filterByUser,
  filterByType,
  exportToFile
} = require("../../core/services/PersistentAuditService")

// 🧑 Simulace uživatelů
const users = [
  { userId: "USR-1001", role: "user" },
  { userId: "USR-2002", role: "admin" }
]

// 📌 Simulace událostí
const entries = [
  { type: "scenario.activate", action: "LoginScenario.run", trust: 0.52, status: "✅ OK" },
  { type: "scenario.activate", action: "RecoveryScenario.run", trust: 0.77, status: "✅ OK" },
  { type: "module.call", action: "AuthCenter.initSession", trust: 0.91, status: "❌ Denied" },
  { type: "intent.reject", action: "ActivateSectorFlow", trust: 0.36, status: "❌ Blocked" }
]

// 🧠 Zaloguj události
users.forEach(user => {
  entries.forEach(entry => {
    log({ ...entry, userId: user.userId, role: user.role })
  })
})

// 📜 Výpis všech
console.log("📋 All audit entries:")
getAll().forEach(e => {
  console.log(`[${new Date(e.time).toLocaleTimeString()}] ${e.userId} (${e.role}) → ${e.type} → ${e.status}`)
})

// 🔎 Filtrování
console.log("\n🔍 Filter by user USR-2002:")
filterByUser("USR-2002").forEach(e => console.log(e.action, "→", e.status))

console.log("\n🔍 Filter by type 'module.call':")
filterByType("module.call").forEach(e => console.log(e.userId, "→", e.status))

// 📁 Export
exportToFile("audit_export_test.json")
console.log("\n📦 Audit log exported to audit_export_test.json")