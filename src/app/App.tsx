import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthPage, DashboardPage } from '@pages/index';

const App = () => (
  <Routes>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/auth" element={<AuthPage />} />
  </Routes>
);

export default App;
