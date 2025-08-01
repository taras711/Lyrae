// 📦 gui/components/MirrorTracePanel.js

import React from "react"
import "./MirrorTracePanel.css"
/**
 * MirrorTracePanel - Component for displaying shadow trace records
 * @param {*} param0 - Component props
 * @returns {JSX.Element} - Rendered component element
 * @description This component displays shadow trace records with information about intent, source, sector, and trust.
 * Records are sorted by time and display approval or denial of the record.
 * Each record includes a reason for approval/denial and other metadata.
 */
function MirrorTracePanel({ traceList }) {
  return (
    <div className="mirror-trace-panel">
      <h2>🪞 Shadow Mirror Trace</h2>
      {traceList.length === 0 && <p>Žádné záznamy zatím nejsou.</p>}
      {traceList.map((trace, index) => (
        <div
          key={index}
          className={`trace-card ${trace.approved ? "approved" : "denied"}`}
        >
          <header>
            <strong>{trace.intent}</strong>
            <span>{trace.approved ? "✅ Approved" : "❌ Denied"}</span>
          </header>
          <div className="trace-meta">
            <span>🧍 {trace.source}</span>
            <span>📦 Sector: {trace.sector}</span>
            <span>💬 Trust: {(trace.trust * 100).toFixed(0)}%</span>
            <span>🕒 {new Date(trace.time).toLocaleString()}</span>
          </div>
          <div className="trace-reason">
            <em>{trace.reason}</em>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MirrorTracePanel
