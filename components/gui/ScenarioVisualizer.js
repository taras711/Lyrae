
import React from 'react'
import './ScenarioVisualizer.css'
/**
 * ScenarioVisualizer - C
 * @param {*} param0 - Component props
 * @returns {JSX.Element} - Rendered component element
 * @description This component visualizes a scenario and its metadata.
 */
function ScenarioVisualizer({ scenario }) {
  const {
    intent,
    status,
    trustLevel,
    divergence,
    sectorId,
    triggeredBy,
    createdAt,
    alert,
    log,
    type,
    id
  } = scenario

  const statusColor = {
    pending: '#3b82f6',
    activated: '#10b981',
    expired: '#6b7280',
    alert: '#f59e0b'
  }[status?.toLowerCase()] || '#93c5fd'

  return (
    <div className={`scenario-card type-${type}`}>
      <header className="scenario-header" style={{ borderLeft: `4px solid ${statusColor}` }}>
        <h3>{intent} → {sectorId}</h3>
        <div className="meta">
          <span>Status: {status}</span>
          <span>Trust: {(trustLevel * 100).toFixed(0)}%</span>
          <span>Divergence: {divergence}</span>
          <span>Triggered By: {triggeredBy}</span>
          <span>Time: {new Date(createdAt).toLocaleString()}</span>
        </div>
      </header>

      {alert && (
        <div className={`alert-box alert-${alert.level}`}>
          <strong>{alert.level.toUpperCase()}:</strong> {alert.message}
        </div>
      )}

      <section className="scenario-log">
        {log?.map((entry, idx) => (
          <div key={idx} className="log-entry">
            🕒 {entry}
          </div>
        ))}
      </section>

      <footer className="scenario-footer">
        <small>Scenario ID: {id}</small>
      </footer>
    </div>
  )
}

export default ScenarioVisualizer