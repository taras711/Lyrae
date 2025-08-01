import React from "react"
import PropTypes from "prop-types"
import "./ScenarioRouterPanel.css"
/**
 * ScenarioRouterPanel - Component for displaying scenario routing information
 * @param {*} param0 - Component props
 * @returns {JSX.Element} - Rendered component element
 * @description This component displays information about the scenario including name, trust level, security level, and current status.
 */
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
      <p><strong>User:</strong> {trust >= 0.5 ? "✔️ Trusted" : "⚠️ Low Trust"} ({trust.toFixed(2)})</p>
      <p><strong>Security Level:</strong> {securityLevel} {securityLevel > 2 ? "🔐 High" : "🔓 Normal"}</p>
      <p><strong>Current Status:</strong> {status}</p>
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