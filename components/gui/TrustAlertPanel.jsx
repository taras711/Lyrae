import React from "react"
import "./TrustAlertPanel.css"
/**
 * TrustAlertPanel - Component for displaying trust anomalies
 * @param {*} param0 - Component props
 * @returns {JSX.Element} - Rendered component element
 * @description This component displays trust warnings based on anomalies in the data.
 */
function TrustAlertPanel({ anomalies }) {
  if (!anomalies || anomalies.length === 0) {
    return <div className="trust-alert">✅ No trust anomalies</div>
  }

  return (
    <div className="trust-alert">
      <h3>🚨 Warning: Trust Anomalies Detected</h3>
      <ul>
        {anomalies.map((a, i) => (
          <li key={i}>
            {a.severity} {a.type}: {Math.round(a.from * 100)}% → {Math.round(a.to * 100)}%  
            <span style={{ fontSize: "0.8em", color: "#655" }}>
              ({new Date(a.time).toLocaleTimeString()})
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrustAlertPanel