const path = require("path")
const fs = require("fs")
const { loadRulesFromJSON, getRule, reloadRules } = require("../../core/rules/RuleHotReloadService")
// Cesta k testovacímu JSON
const configPath = path.resolve(__dirname, "../../configs/rule-config.json")

console.log("🔍 Test configPath", configPath)
if (!fs.existsSync(configPath)) {
  console.error("❌ Test config not found at:", configPath)
  process.exit(1)
}
// Zkontroluj, jestli je JSON platný
try {
// 1️⃣ Načti původní pravidla
const initialRules = loadRulesFromJSON(configPath)
console.log("🧾 Původní pravidla:", initialRules)

// 2️⃣ Změň JSON soubor (simulace ruční úpravy)
fs.writeFileSync(configPath, JSON.stringify({
  ...initialRules,
  allowGuestUpload: true
}, null, 2))

// 3️⃣ Reload pravidel
const reloadedRules = reloadRules(configPath)
console.log("🔄 Po reloadu:", reloadedRules)

// 4️⃣ Ověř specifické pravidlo
console.log("🕵️ allowGuestUpload:", getRule("allowGuestUpload"))

fs.watchFile(configPath, (curr, prev) => {
  console.log(`🛠️ Konfigurace změněna: ${curr.mtime}`);
  reloadRules(configPath);
});
} catch (error) {
  console.error("❌ Chyba při načítání pravidel:", error.message)
  process.exit(1)
}