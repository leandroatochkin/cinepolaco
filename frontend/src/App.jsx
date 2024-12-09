import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './views/admin/AdminDashboard'
import Articles from './views/articles/Articles';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
