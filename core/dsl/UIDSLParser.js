/**
 * @author Starass

 * @module UIDSLParser

 * @description This module provides a parser for UIDSL.

 */

class UIDSLParser {
  constructor(source) {
    this.source = source
    this.panels = []
  }

  /**
   * Parses the UIDSL source code.
   * @returns {Array} - List of panels
   * @description This method parses the UIDSL source code and returns a list of panels.
   */
  parse() {
    // Split the source code into lines
    const lines = this.source
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length)

    let currentPanel = null // Current panel

    // Iterate over lines and parse panels
    for (const line of lines) {
      if (line.startsWith("panel ")) {
        const name = line.split(" ")[1]
        currentPanel = { name, props: {} }
      } else if (line === "}") {
        this.panels.push(currentPanel)
        currentPanel = null
      } else if (currentPanel && line.includes(":")) {
        const [key, valueRaw] = line.split(":")
        const value = valueRaw.trim().replace(/^"|"$/g, "")
        currentPanel.props[key.trim()] = value
      }
    }

    return this.panels
  }
}

module.exports = UIDSLParser