/**

 * @author Starass

 * @module UIDSLRuntime

 * @description Runtime for evaluating and processing UI DSL.

 */

class UIDSLRuntime {
  constructor(parsedPanels, context = {}) {
    this.panels = parsedPanels // Store panels
    this.context = context // Store context
    this.intent = context.intent || {} // Store intent
  }

  /**
   * Evaluates a condition.
   * @param {string} expr - Expression to evaluate.
   * @returns {boolean} - Result of the evaluation.
   * @description Evaluates the condition based on the intent.
   */
  evaluateCondition(expr) {
    // Simple parser for expression like: intent.focus == "recovery"
    const [left, , right] = expr.split(" ")
    const [scope, key] = left.split(".")

    if (scope === "intent" && this.intent[key]) {
      return this.intent[key] === right.replace(/"/g, "")
    }

    return false
  }

  /**
   * Returns the visible panels.
   * @returns {Array} - List of visible panels.
   */
  getVisiblePanels() {
    const active = []

    for (const panel of this.panels) {
      const { name, props } = panel
      const when = props.when || null
      const show = props.show === "true"

      if (when && this.evaluateCondition(when) && show) {
        active.push(name)
      }
    }

    return active
  }
}

module.exports = UIDSLRuntime