import React from "react"
import "./AuditTimelinePanel.css"
/**
 * AuditTimelinePanel - Component for displaying audit records in a timeline format
 * @param {*} param0 - Component props
 * @returns {JSX.Element} - Rendered component element
 * @description This component displays audit records in a table with a timeline.
 * Records are sorted by time and display information about the user, action, type, status, and trust.
 */
function AuditTimelinePanel({ entries }) {
  if (!entries || entries.length === 0) {
    return <div className="audit-panel">📭 No records to display</div>
  }

  const sorted = [...entries].sort((a, b) => b.time - a.time)

  return (
    <div className="audit-panel">
      <h2>🕒 Auditní časová osa</h2>
      <table className="audit-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>User</th>
            <th>Action</th>
            <th>Type</th>
            <th>Status</th>
            <th>Trust</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((e, i) => (
            <tr key={i}>
              <td>{new Date(e.time).toLocaleTimeString()}</td>
              <td>{e.userId} ({e.role})</td>
              <td>{e.action || e.tokenId}</td>
              <td>{e.type}</td>
              <td>{e.status}</td>
              <td>{(e.trust * 100).toFixed(0)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuditTimelinePanel