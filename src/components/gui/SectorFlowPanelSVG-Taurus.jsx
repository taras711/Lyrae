/**

 * @author Starass

 * @module SectorFlowPanel

 * @description This module handles the visualization of sector flows.

 */

import React, { useContext } from 'react';
import RulesContext from '../../context/RulesContext';

const SectorFlowPanel = () => {
  const { rules } = useContext(RulesContext); // Access dynamic rules

  // Define the sectors
  const sectors = [
    { name: 'Guest', x: 100, y: 100 },
    { name: 'Secure', x: 300, y: 100 },
    { name: 'Audit', x: 200, y: 250 }
  ];

  // Define the flows between sectors
  const flows = [
    { from: 'Guest', to: 'Secure' },
    { from: 'Audit', to: 'Guest' }
  ];

  const getSector = (name) => sectors.find(s => s.name === name); // Get sector by name

  return (
    <svg width="400" height="300" style={{ border: '1px solid #ccc' }}>
      {/* Sektory */}
      {sectors.map((s, idx) => (
        <g key={idx}>
          <circle cx={s.x} cy={s.y} r="30" fill="#f0f0f0" stroke="#333" />
          <text x={s.x} y={s.y + 5} textAnchor="middle" fontSize="14">{s.name}</text>
        </g>
      ))}

      {/* Toky */}
      {flows.map((flow, idx) => {
        const from = getSector(flow.from);
        const to = getSector(flow.to);
        const arrowHead = 'M0,-5 L10,0 L0,5'; // Primitive arrow head

        return (
          <g key={idx}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="blue"
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          </g>
        );
      })}

      {/* Definition of arrow marker */}
      <defs>
        <marker
          id="arrow"
          markerWidth="10"
          markerHeight="10"
          refX="10"
          refY="0"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,-5 L10,0 L0,5" fill="blue" />
        </marker>
      </defs>
    </svg>
  );
};

export default SectorFlowPanel;