const SessionController = require("../../core/runtime/SessionController")

const controller = new SessionController({
  userId: "USR-905",
  role: "user",
  trustScore: 0.34
})

// 🧯 Spuštění Recovery scénáře
const recoveryLog = controller.activateScenario("recovery", {
  tokenValid: true,
  userKnown: true
})

// 🎨 Výstup komponenty
const view = controller.context.component

console.log("🧠 Recovery scénář log:")
console.log(recoveryLog.join("\n"))

console.log("\n🖼️ Komponenta:")
console.log(view === "RecoveryPanel" ? "✅ RecoveryPanel zobrazen." : "❌ Žádná komponenta aktivována.")