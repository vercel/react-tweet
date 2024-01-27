import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './app.js';
import App2 from './app2.js';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app2" element={<App2 />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);