/*

This test suite contains tests for the Auth module.

*/

const AuthCenter = require("../../modules/auth/AuthCenter")

const context = { session: null }

if (context.session == null) {
  context.session = {}
}
// Testing the initSession method
console.log("Starting test initSession...")

const result = AuthCenter.invoke("initSession", {
  userData: { id: "USR-501", valid: true, trustScore: 0.83 }
}, context)

console.log("Result:", result) // → "ACTIVE"
console.log("Session:", context.session)
console.log("Status:", AuthCenter.getProperty("status"))