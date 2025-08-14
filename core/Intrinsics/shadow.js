// src/lyrae/intrinsics/shadow.js
const { simulateShadowSync } = require('../shadow/shadowSimulator')
const { evaluateShadowResponse } = require('../shadow/shadowReactor')
const { createShadowMirror } = require('../shadow/ShadowEvaluatorMirror')
const { processMirrorEvaluation } = require('../shadow/ShadowEvaluatorHelper')

function installShadowIntrinsics(vm, orchestration) {
  const mirror = createShadowMirror(orchestration.evaluatorDescribe)

  vm.registerIntrinsic('shadow.frame', (ghostToken) => simulateShadowSync(ghostToken))
  vm.registerIntrinsic('shadow.eval', (frame) => evaluateShadowResponse(frame, orchestration))
  vm.registerIntrinsic('shadow.mirror', (intent, ghostToken) => mirror.mirrorEvaluate(intent, ghostToken))
  vm.registerIntrinsic('shadow.process', (mirrorResult, ghostToken, history) =>
    processMirrorEvaluation(mirrorResult, ghostToken, history))

  // Virtuální kolekce
  vm.registerCollection('shadow.history', {
    getAll: () => orchestration.shadowHistory, // Array<Trace>
    idOf: (t) => `${t.time}:${t.source}:${t.intent}`
  })
  vm.registerCollection('shadow.scenarios', {
    getAll: () => orchestration.ghostScenarioQueue.peekAll(),
    idOf: (s) => s.id
  })

  // Signálovací bus
  vm.registerIntrinsic('shadow.emit', (delta) => orchestration.signalBus.publish(delta))
}

module.exports = { installShadowIntrinsics }