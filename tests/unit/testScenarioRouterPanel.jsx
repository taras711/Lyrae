<ScenarioRouterPanel
  scenarioName="CriticalExport"
  trust={0.41}
  securityLevel={3}
  status="sandbox"
/>

import React from "react"
import PropTypes from "prop-types"
import "./ScenarioRouterPanel.css"
const ScenarioRouterPanel = ({ scenarioName, trust, securityLevel, status }) => {
  const renderIcon = () => {
    switch (status) {
      case "sandbox":
        return "🧪"
      case "standard":
        return "✅"
      case "blocked":
        return "⛔"
      default:
        return "❓"
    }
  }

  return (
    <div className="scenario-router-panel">
      <h2>{renderIcon()} {scenarioName}</h2>
      <p><strong>Uživatel:</strong> {trust >= 0.5 ? "✔️ Důvěryhodný" : "⚠️ Nízká důvěra"} ({trust.toFixed(2)})</p>
      <p><strong>Bezpečnostní úroveň:</strong> {securityLevel} {securityLevel > 2 ? "🔐 vysoká" : "🔓 běžná"}</p>
      <p><strong>Aktuální stav:</strong> {status}</p>
    </div>
  )
}

ScenarioRouterPanel.propTypes = {
  scenarioName: PropTypes.string.isRequired,
  trust: PropTypes.number.isRequired,
  securityLevel: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["sandbox", "standard", "blocked"]).isRequired
}

export default ScenarioRouterPanel