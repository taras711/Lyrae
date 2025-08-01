const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const LoginSector = require("../../sectors/login/loginSector")
const ActionExecutor = require("../../services/executor/ActionExecutor")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🚨 Spouštím LowTrustFlow test...\n")

// 1️⃣ Token s nízkou důvěrou
const token = new Token({
  userId: "USR-999",
  role: "user",
  trustScore: 0.25
})

// 2️⃣ Inicializace scénáře
const context = { session: {} }
const scenario = new LoginScenario(context)
scenario.run({ id: "USR-999", valid: true, trustScore: token.trustScore })

// 3️⃣ Simulace odpovědi ze serveru
const serverReply = { type: "success" } // i pozitivní odpověď nestačí kvůli nízkému trustScore

// 4️⃣ Sektor rozhoduje
const sector = new LoginSector(context, token)
const actions = sector.resolve(serverReply)

// 5️⃣ Executor vykonává
const executor = new ActionExecutor(context, token)
const actionOutput = executor.run(actions)

// 6️⃣ Renderer zobrazuje výstup
const renderer = new ComponentRenderer(context)
const renderOutput = renderer.render()

// 📋 Výstup
console.log("📝 Log scénáře:")
console.log(scenario.getLog().join("\n"))

console.log("\n⚙️ Sektorové akce:")
console.log(actionOutput.join("\n"))

console.log("\n🖼️ Komponenta:")
console.log(renderOutput.join("\n"))

console.log("\n🔐 Token audit mode:", token.auditMode ? "✅ Aktivní" : "❌ Neaktivní")