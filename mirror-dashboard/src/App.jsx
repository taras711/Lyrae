import MirrorActivationDiffPanel from 'components/gui/MirrorActivationDiffPanel'
import { comparisonData } from './data/mock'

function App() {
  return (
    <div>
      <MirrorActivationDiffPanel comparisonData={comparisonData} />
    </div>
  )
}
