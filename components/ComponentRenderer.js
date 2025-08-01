/**
 * @author Starass

 * @description Renders various components based on the context

 */

const BehavioralIntentPanel = require("./intent/BehavioralIntentPanel")
const CommandInsights = require("../core/insights/CommandInsights")
const UIDSLComponentAdapter = require("../core/dsl/UIDSLComponentAdapter")

class ComponentRenderer {
  /**
   * @param {*} context - The rendering context
   */
  constructor(context) {
    this.context = context
    this.output = []

    this.logger = context.commandLogger // Command logger for tracking user commands
    this.dslSource = context.dsl || "" // DSL source for component rendering
  }

  /**
   * Renders the component output
   * @returns {Array} - The rendered output
   */
  render() {
    const entries = this.logger?.getHistory() || []
    let intentSummary = null

    if (entries.length) {
      const insights = new CommandInsights(this.logger)
      intentSummary = insights.getSummary()

      const intentPanel = new BehavioralIntentPanel(intentSummary)
      this.output.push(...intentPanel.render())
    } else {
      this.output.push("🧠 Žádné příkazy nejsou k dispozici pro analýzu záměru.")
    }

    // 🎯 DSL rozhodování komponenty
    if (this.dslSource && intentSummary) {
      const adapter = new UIDSLComponentAdapter(this.dslSource, intentSummary)
      const activePanels = adapter.getActivePanels()

      if (activePanels.length) {
        activePanels.forEach(panel => {
          this.output.push(`🖼️ DSL aktivní komponenta: ${panel}`)

          // Volitelný výstup podle jména panelu
          switch (panel) {
            case "RecoveryPanel":
              this.output.push("🛠️ Zobrazen panel obnovy přístupu.")
              break
            case "DashboardPanel":
              this.output.push("📊 Zobrazen hlavní dashboard.")
              break
            case "AuditPanel":
              this.output.push("📁 Zobrazen auditní výpis.")
              break
            default:
              this.output.push(`📦 Panel "${panel}" byl aktivován.`)
          }
        })
      } else {
        this.output.push("🚫 DSL neaktivuje žádnou komponentu.")
      }
    }

    return this.output
  }
}

module.exports = ComponentRenderer