/**

 * @author Starass

 * @module PersistentAuditService

 * @description This module handles the persistent storage of audit logs.

 */

const fs = require("fs")
const path = require("path")

const AUDIT_FILE = path.join(__dirname, "audit_log.json") // Path to the audit log file
let auditLog = [] // In-memory audit log

/**
 * Logs an audit entry.
 * @param {Object} entry - The audit entry to log.
 * @returns {Object} - The logged audit entry.
 */
function log(entry) {
  const enriched = {
    time: Date.now(),
    traceId: generateTraceId(),
    ...entry
  }
  auditLog.push(enriched)
  console.log("✅ Audit push:", enriched)

  return enriched
}

/**
 * Retrieves all audit entries.
 * @returns {Array} - List of all audit entries.
 */
function getAll() {
  return auditLog
}

/**
 * Filters audit entries by user ID.
 * @param {string} userId - The user ID to filter by.
 * @returns {Array} - List of audit entries for the specified user.
 */
function filterByUser(userId) {
  return auditLog.filter(e => e.userId === userId)
}

/**
 * Filters audit entries by type.
 * @param {string} type - The type to filter by.
 * @returns {Array} - List of audit entries for the specified type.
 */
function filterByType(type) {
  return auditLog.filter(e => e.type === type)
}

/**
 * Exports the audit log to a file.
 * @param {string} filename - The name of the file to export to.
 */
function exportToFile(filename = "exported_audit.json") {
  fs.writeFileSync(filename, JSON.stringify(auditLog, null, 2))
}

/**
 * Generates a unique trace ID.
 * @returns {string} - The generated trace ID.
 */
function generateTraceId() {
  return "TRACE-" + Math.random().toString(36).substring(2, 10).toUpperCase()
}

/**
 * Loads the audit log from disk.
 */
function loadFromDisk() {
  if (fs.existsSync(AUDIT_FILE)) {
    try {
      auditLog = JSON.parse(fs.readFileSync(AUDIT_FILE, "utf-8"))
    } catch {
      auditLog = []
    }
  }
}

/**
 * Saves the audit log to disk.
 */
function saveToDisk() {
  fs.writeFileSync(AUDIT_FILE, JSON.stringify(auditLog, null, 2))
}

// 💡 Auto persistence
loadFromDisk()
setInterval(saveToDisk, 10000) // every 10 seconds

module.exports = {
  log,
  saveToDisk,
  loadFromDisk,
  getAll,
  filterByUser,
  filterByType,
  exportToFile
}