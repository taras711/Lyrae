/**

 * @author Starass

 * @module MirrorVsActivationComparator

 * @description This module handles the comparison of mirror and activation traces.

 */

/**
 * Compares mirror traces with activation logs.
 * @param {Array<object>} mirrorTrace - The mirror trace data.
 * @param {Array<object>} activationLog - The activation log data.
 * @returns {Array<object>} The comparison results.
 */
function compareMirrorWithActivation(mirrorTrace, activationLog) {
  const results = []

  for (const mirror of mirrorTrace) {
    const matching = activationLog.find(
      act => act.intent === mirror.intent && act.actor === mirror.source
    )

    const comparison = {
      intent: mirror.intent,
      actor: mirror.source,
      mirrorApproved: mirror.approved,
      activationPerformed: !!matching,
      activationStatus: matching?.approved ?? false,
      activationSector: matching?.sectorId ?? null,
      mirrorSector: mirror.sector,
      trustMirror: mirror.trust,
      trustActivation: matching?.trustAfter ?? null,
      match: mirror.approved === matching?.approved
    }

    results.push(comparison)
  }

  return results
}