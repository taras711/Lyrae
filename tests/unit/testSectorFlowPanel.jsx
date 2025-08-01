import React, { useState } from 'react';
import RulesContext from '../../src/context/RulesContext';
import SectorFlowPanel from '../../src/components/gui/SectorFlowPanel';

const App = () => {
  const [rules, setRules] = useState({
    maxExportSize: 50,
    allowGuestUpload: false,
    securityOverrides: { auditor: true, guest: false }
  });

  return (
    <RulesContext.Provider value={{ rules }}>
      <SectorFlowPanel />
    </RulesContext.Provider>
  );
};

export default App;