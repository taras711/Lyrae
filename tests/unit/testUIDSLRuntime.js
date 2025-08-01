const UIDSLParser = require("../../core/dsl/UIDSLParser")
const UIDSLRuntime = require("../../core/runtime/UIDSLRuntime")

const dsl = `
panel RecoveryPanel {
  when: intent.focus == "recovery"
  show: true
}
panel DashboardPanel {
  when: intent.focus == "diagnostics"
  show: true
}
`

const parser = new UIDSLParser(dsl)
const panels = parser.parse()

const context = {
  intent: { focus: "recovery" }
}

const runtime = new UIDSLRuntime(panels, context)
const visible = runtime.getVisiblePanels()

console.log("🎨 Aktivní panely podle DSL:")
console.log(visible)