/**
 * @author Starass
 
 * @module UIDSLComponentAdapter

 * @description This module provides an adapter for UIDSL components.

 */

const UIDSLParser = require("./UIDSLParser")
const UIDSLRuntime = require("../runtime/UIDSLRuntime")

class UIDSLComponentAdapter {
  constructor(dslSource, intentContext = {}) {
    this.dslSource = dslSource // Source of the DSL
    this.intentContext = intentContext // Intent context
  }

  /**
   * Gets active panels from the DSL.
   * @returns {Array} - List of active panels
   */
  getActivePanels() {
    const parser = new UIDSLParser(this.dslSource) // Initialize parser
    const panels = parser.parse() // Parse DSL

    const runtime = new UIDSLRuntime(panels, { intent: this.intentContext })
    return runtime.getVisiblePanels()
  }
}

module.exports = UIDSLComponentAdapter