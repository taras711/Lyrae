/**

 * @author Starass

 * @module IntentRouter

 * @description This class routes user intent based on command insights and UIDSL components.

 */

const UIDSLComponentAdapter = require("../dsl/UIDSLComponentAdapter")
const CommandInsights = require("../insights/CommandInsights")

class IntentRouter {
  constructor(logger, dslSource) {
    this.logger = logger // Command logger for tracking user commands
    this.dslSource = dslSource // DSL source for component rendering
  }

  /**
   * Routes intent based on context and active panels.
   * @returns {Object} - Object containing intent and active panels
   */
  route() {
    const insights = new CommandInsights(this.logger)
    const summary = insights.getSummary()

    const adapter = new UIDSLComponentAdapter(this.dslSource, summary)
    const activePanels = adapter.getActivePanels()

    return {
      intent: summary, // Intent
      panels: activePanels // Active panels
    }
  }
}

module.exports = IntentRouter