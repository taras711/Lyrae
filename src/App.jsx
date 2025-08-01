/**

 * @author Starass

 * @module App

 * @description This module is the main entry point for the application.

 */

import React, { useState, useEffect } from 'react';
import SectorFlowPanel from './components/gui/SectorFlowPanel';
import RulesContext from './context/RulesContext';
import { reloadRules } from './rules/RuleHotReloadService';

const App = () => {
  const [rules, setRules] = useState({}); // Loaded rules

  useEffect(() => {
    const configPath = './configs/rule-config.json'; // Path to the config file
    const fetchRules = async () => {
      const newRules = await reloadRules(configPath);
      setRules(newRules);
    };

    fetchRules(); // Initial fetch

    // Auto-reload on file change
    const fs = window.require?.('fs');
    if (fs) {
      fs.watchFile(configPath, () => {
        console.log('🔄 Config changed');
        fetchRules();
      });
    }
  }, []);

  return (
    <RulesContext.Provider value={{ rules }}>
      <SectorFlowPanel />
    </RulesContext.Provider>
  );
};

export default App;