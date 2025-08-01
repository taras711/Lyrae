const Token = require("../../core/token/Token")
const SecurityGroup = require("../../sectors/groups/SecurityGroup")
const ActionExecutor = require("../../services/executor/ActionExecutor")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🔒 Testuji SecurityGroup flow...\n")

const token = new Token({
  userId: "USR-404",
  role: "user",
  trustScore: 0.52
})

const context = {}
const serverReply = { type: "success" }

const group = new SecurityGroup(context, token, serverReply)
const actions = group.resolveAll()

const executor = new ActionExecutor(context, token)
const actionOutput = executor.run(actions)

const renderer = new ComponentRenderer(context)
const renderOutput = renderer.render()

console.log("⚙️ Sektorové akce:")
console.log(actionOutput.join("\n"))

console.log("\n🖼️ Komponenta:")
console.log(renderOutput.join("\n"))

console.log("\n🧩 Report sektoru:")
console.log(group.report())