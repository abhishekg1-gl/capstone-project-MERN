// Navbar component provides site navigation and user authentication controls
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Custom hook to access auth state and actions
import '../styles/Navbar.css'; // Import navbar-specific styles
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth(); // Get current user and logout function from context
  const nav = useNavigate(); // Hook to programmatically navigate routes

  const [menuOpen, setMenuOpen] = useState(false);


  // Handle logout button click: call logout and redirect to login page
  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      {/* Always show Home link */}
      <Link to="/">Home</Link>

      {/* Mobile menu toggle */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? '✖' : '☰'}
      </button>


      {/* Menu items (toggle visibility on mobile) */}
      <div className={`menu-links ${menuOpen ? "active" : ""}`}>
        {user ? (
          <>
            <span style={{ margin: '0 1rem' }}>Hi, {user.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link style={{ margin: '0 1rem' }} to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>

  );
}
