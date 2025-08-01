/**

 * @author Starass

 * @module IntentFlowTracer

 * @description This module handles tracing of intent flows.

 */

class IntentFlowTracer {

  /**
   * @constructor
   */
  constructor() {
    this.flowLog = []
  }

  /**
   * Traces the intent flow.
   * @param {Object} params - The parameters for tracing the intent.
   * @param {string} params.intent - The intent being traced.
   * @param {Object} params.token - The token representing the user's context.
   * @param {Object} params.evaluatorResult - The result of the intent evaluation.
   * @param {Object} params.sectorResponse - The response from the target sector.
   */
  traceIntent({ intent, token, evaluatorResult, sectorResponse }) {
    const trace = {
      time: Date.now(),
      intent,
      actor: token.userId,
      role: token.role,
      trust: token.trust,
      approved: evaluatorResult.approved,
      targetSector: evaluatorResult.sector || "N/A",
      reason: evaluatorResult.reason,
      result: sectorResponse?.status || "UNKNOWN",
      output: sectorResponse
    }

    this.flowLog.push(trace)
    return trace
  }

  /**
   * Describes the flow at a specific index.
   * @param {number} index - The index of the flow to describe.
   * @returns {Object|null} The flow description or null if not found.
   */
  describeFlow(index = null) {
    if (index !== null && this.flowLog[index]) {
      return this.flowLog[index]
    }

    return {
      totalFlows: this.flowLog.length,
      lastTrace: this.flowLog.at(-1),
      all: this.flowLog
    }
  }

  /**
   * Exports the flow log as a JSON string.
   * @returns {string} The JSON representation of the flow log.
   */
  exportJSON() {
    return JSON.stringify(this.flowLog, null, 2)
  }
}

module.exports = IntentFlowTracer