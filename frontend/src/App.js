import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalFonts from './statics/font/font';
import Dashboard from './pages/userDashboard';
import CleanEnergy from './pages/cleanEnergy';

function App() {
  return (
    <div className="App">
      <GlobalFonts />
      <BrowserRouter>
        <Routes>
          <Route path='/userDashboard' exact element={Dashboard()} />
          <Route path='/cleanEnergy' exact element={CleanEnergy()} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
