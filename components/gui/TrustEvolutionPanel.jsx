import React from "react"
import "./TrustEvolutionPanel.css"
/**
 * TrustEvolutionPanel - Component for displaying user trust evolution
 * @param {*} param0 - Component props
 * @returns {JSX.Element} - Rendered component element
 * @description This component displays user trust evolution based on historical data.
 */
function TrustEvolutionPanel({ history }) {
  if (!history || history.length === 0) {
    return <div className="trust-panel">📭 No trust history available</div>
  }

  const sorted = [...history].sort((a, b) => a.time - b.time)

  return (
    <div className="trust-panel">
      <h2>🔐 Evoluce důvěry uživatele</h2>
      <div className="trust-graph">
        {sorted.map((entry, i) => (
          <div key={i} className="trust-point">
            <div className="trust-bar" style={{ height: `${entry.trust * 100}%` }}></div>
            <div className="trust-time">{new Date(entry.time).toLocaleTimeString()}</div>
            <div className="trust-score">{(entry.trust * 100).toFixed(0)}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrustEvolutionPanel