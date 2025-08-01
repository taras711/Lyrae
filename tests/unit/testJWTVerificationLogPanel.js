import React from "react"
import JWTVerificationLogPanel from "./components/JWTVerificationLogPanel"
import { getAllAttempts } from "../services/audit/JWTSignatureAudit"

function AuditLogView() {
  const entries = getAllAttempts()
  return <JWTVerificationLogPanel auditEntries={entries} />
}

export default AuditLogView