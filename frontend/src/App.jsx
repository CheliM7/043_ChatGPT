import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBar from './components/navBar';
import StartPage from './pages/startPage';
import HomePage from './pages/homePage';
import CandidatesPage from './pages/candidatesPage';
import VotingPage from './pages/votingPage';


// Layout component that conditionally renders the NavBar based on the current route
const Layout = ({ children }) => {
  const location = useLocation();
  const showNavBar = location.pathname !== '/'; // Hide NavBar on the start page

  return (
    <div style={{ paddingTop: showNavBar ? '0rem' : '0' }}>
      {showNavBar && <NavBar />}
      {children}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><StartPage /></Layout>} />
        <Route path="/home" element={<Layout><HomePage /></Layout>} />
        <Route path="/vote" element={<Layout><VotingPage /></Layout>} />
        <Route path="/candidates" element={<Layout><CandidatesPage /></Layout>}  />
      </Routes>
    </Router>
  );
};

export default App;
