import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from 'react-router-dom';
import Home from './pages/Home';
import CreatorStudio from './pages/CreatorStudio';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-white'
    : 'text-gray-400 hover:text-white';

export default function App() {
  return (
    <Router>
      <nav className="bg-gray-900 p-4 flex space-x-4">
        <NavLink to="/" end className={linkClasses}>
          Home
        </NavLink>
        <NavLink to="/studio" className={linkClasses}>
          Studio
        </NavLink>
        <NavLink to="/profile" className={linkClasses}>
          Profile
        </NavLink>
        <NavLink to="/settings" className={linkClasses}>
          Settings
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<CreatorStudio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}



