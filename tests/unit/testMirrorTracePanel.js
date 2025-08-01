import MirrorTracePanel from "./components/MirrorTracePanel"
import { shadowHistory } from "../../core/shadow/store" // nebo runtime buffer

function ShadowOverview() {
  return (
    <div>
      <MirrorTracePanel traceList={shadowHistory} />
    </div>
  )
}
