import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

type ViewState = 'landing' | 'dashboard';

const App: React.FC = () => {
  // Simple state to simulate navigation/auth
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const handleLogin = () => {
    // Simulate auth delay
    setTimeout(() => {
        setCurrentView('dashboard');
        window.scrollTo(0,0);
    }, 300);
  };

  const handleLogout = () => {
    setCurrentView('landing');
    window.scrollTo(0,0);
  };

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
};

export default App;