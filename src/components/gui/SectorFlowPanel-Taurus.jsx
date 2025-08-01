/**

 * @author Starass

 * @module SectorFlowPanel

 * @description This module handles the visualization of sector flows.

 */

import React, { useEffect, useState, useContext } from 'react';
import RulesContext from '../../context/RulesContext';

const SectorFlowPanel = () => {
  const { rules } = useContext(RulesContext); // Dynamic rules
  const [sectorData, setSectorData] = useState([]);
  const sectors = [
    { name: 'Guest', x: 100, y: 100 },
    { name: 'Secure', x: 300, y: 100 },
    { name: 'Audit', x: 200, y: 250 }
  ];

  const flows = [
    { from: 'Guest', to: 'Secure' },
    { from: 'Audit', to: 'Guest' }
  ];

  const getSector = (name) => sectors.find(s => s.name === name);


  useEffect(() => {
    fetchSectorFlow(); // Fetch data on startup
  }, []);

  useEffect(() => {
    // Respond to changes in rules (e.g. allowGuestUpload)
    if (rules.allowGuestUpload) {
      highlightSector('Guest'); // Visualize according to rule
    }
  }, [rules]);

  const fetchSectorFlow = async () => {
    // 🔁 Place for API call or local simulation
    const mockFlow = [
      { from: 'Public', to: 'Secure', level: 2 },
      { from: 'Guest', to: 'Audit', level: 1 }
    ];
    setSectorData(mockFlow);
  };

  const highlightSector = (name) => {
    console.log(`🔍 Highlighting sector: ${name}`);
    // Interact with SVG / Canvas or DOM element
  };

  return (
    <div className="sector-flow-panel">
      <h2>🔄 Sector Flows</h2>
      <ul>
        {sectorData.map((flow, index) => (
          <li key={index}>
            {flow.from} ➡️ {flow.to} (Level: {flow.level})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectorFlowPanel;