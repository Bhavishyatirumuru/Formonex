import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    
      <Routes>
        <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <LoginPage onLogin={() => setLoggedIn(true)} />} />
        <Route path="/dashboard" element={
          loggedIn ? <Dashboard onLogout={() => setLoggedIn(false)} /> : <Navigate to="/" />
        } />
      </Routes>
  
  );
}

export default App;