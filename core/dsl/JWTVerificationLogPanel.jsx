import React from "react"
import "./JWTVerificationLogPanel.css"

/** * JWTVerificationLogPanel - Component for displaying JWT verification logs
 * @param {Object} param0 - Component props
 * @param {Array} param0.auditEntries - Array of audit log entries
 */
function JWTVerificationLogPanel({ auditEntries }) {
  return (
    <div className="jwt-log-panel">
      <h2>🔎 JWT Signature Audit Log</h2>
      <table>
        <thead>
          <tr>
            <th>User</th><th>Role</th><th>Trust</th><th>Result</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {auditEntries.map((entry, i) => (
            <tr key={i} className={entry.result === "valid" ? "valid" : "invalid"}>
              <td>{entry.userId}</td>
              <td>{entry.role}</td>
              <td>{(entry.trust * 100).toFixed(0)}%</td>
              <td>{entry.result}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JWTVerificationLogPanel