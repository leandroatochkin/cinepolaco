import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './views/admin/AdminDashboard'
import Login from './views/login/Login';
import Home from './views/home/Home';

const App = () => {


  useEffect(() => {
    // Add event listener for scrolling
    const log = () => {console.log('scrolling')}
    window.addEventListener("scroll", log);
    return () => window.removeEventListener("scroll", log);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
