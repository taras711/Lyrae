import React from "react"
import TrustEvolutionPanel from "./components/TrustEvolutionPanel"
import { getHistoryForUser } from "../core/security/history/SecurityTokenHistory"

function UserInsightsPanel({ userId }) {
  const history = getHistoryForUser(userId)
  return <TrustEvolutionPanel history={history} />
}