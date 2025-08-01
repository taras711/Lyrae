import React from "react"
import AuditTimelinePanel from "./components/AuditTimelinePanel"
import { getAll } from "../services/audit/PersistentAuditService"

function AdminView() {
  const entries = getAll()
  return <AuditTimelinePanel entries={entries} />
}
export default AdminView
// This component renders the audit timeline panel with all entries from the persistent audit service.