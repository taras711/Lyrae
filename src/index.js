import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // pokud index.js je ve složce `app` a App.jsx taky

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);