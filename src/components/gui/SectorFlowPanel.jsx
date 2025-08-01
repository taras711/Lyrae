/** 
 * SectorFlowPanel component visualizes the flow of data between different sectors.
 */

import React, { useContext, useEffect, useState } from 'react';
import RulesContext from '../../context/RulesContext';

const SectorFlowPanel = () => {
  const { rules } = useContext(RulesContext);
  const [sectorFlows, setSectorFlows] = useState([]);
  // Define the sectors
  const sectors = [
    { name: 'Guest', x: 100, y: 100 },
    { name: 'Secure', x: 300, y: 100 },
    { name: 'Audit', x: 200, y: 250 }
  ];
  // Define the flows between sectors
  const flows = [
    { from: 'Guest', to: 'Secure', level: 1 },
    { from: 'Audit', to: 'Archive', level: 2 }
  ];

  // Fetch sector flow data
  useEffect(() => {
    const mockFlows = [
      { from: 'Guest', to: 'Secure', level: rules.allowGuestUpload ? 1 : 3 },
      { from: 'Audit', to: 'Archive', level: 2 }
    ];
    setSectorFlows(mockFlows);
  }, [rules]);

  return (
    <div className="sector-flow-panel">
      <h2>🧠 Tok sektorů podle pravidel</h2>
      <ul>
        {sectorFlows.map((flow, idx) => (
          <li key={idx}>
            {flow.from} ➡️ {flow.to} (Level: {flow.level})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorFlowPanel;