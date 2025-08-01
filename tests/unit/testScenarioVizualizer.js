import ScenarioVisualizer from './components/gui/ScenarioVisualizer'
import { listGhostScenarios } from '../sectors/orchestration/ghostScenarioQueue'

function ScenarioDashboard() {
  const scenarios = listGhostScenarios()

  return (
    <div>
      <h2>👻 Latentní scénáře</h2>
      {scenarios.map(s => (
        <ScenarioVisualizer key={s.id} scenario={s} />
      ))}
    </div>
  )
}
