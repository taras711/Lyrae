const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const LoginSector = require("../../sectors/login/loginSector")
const ActionExecutor = require("../../services/executor/ActionExecutor")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🚀 Spouštím FullFlow test...\n")

// 1️⃣ Vytvoření tokenu
const token = new Token({
  userId: "USR-501",
  role: "admin",
  trustScore: 0.83
})

// 2️⃣ Inicializace scénáře s kontextem
const context = { session: {} }
const scenario = new LoginScenario(context)
scenario.run({ id: "USR-501", valid: true, trustScore: token.trustScore })

// 3️⃣ Sektorové vyhodnocení
const serverReply = { type: "success" }
const sector = new LoginSector(context, token)
const actions = sector.resolve(serverReply)

// 4️⃣ Vykonání akcí
const executor = new ActionExecutor(context, token)
const actionOutput = executor.run(actions)

// 5️⃣ Zobrazení komponenty
const renderer = new ComponentRenderer(context)
const renderOutput = renderer.render()

// 📋 Výpis
console.log("📝 Log scénáře:")
console.log(scenario.getLog().join("\n"))

console.log("\n⚙️ Akce sektoru:")
console.log(actionOutput.join("\n"))

console.log("\n🖼️ Komponenta:")
console.log(renderOutput.join("\n"))

console.log("\n🔐 Token audit mode:", token.auditMode ? "✅ Aktivní" : "❌ Neaktivní")