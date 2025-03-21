import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png"; // Professional Logo
import "./Navbar1.css"; // Import CSS

const Navbar1 = () => {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="navbar-logo">
        <NavLink to="/home">
          <img src={logo} alt="Company Logo" marginLeft="30px" height="70px" width="100%" />
        </NavLink>
      </div>

      {/* Right Side - Navigation Links & Profile */}
      <div className="navbar-right">
        <NavLink to="/home" className="nav-link">Home</NavLink>
        <NavLink to="/tenant" className="nav-link">Tenant</NavLink>
        <NavLink to="/landlord" className="nav-link">Landlord</NavLink>
        <NavLink to="/about" className="nav-link">About</NavLink>

        {/* Profile Dropdown */}
        {currentUser && (
          <div className="navbar-profile">
            <img 
              src={currentUser.photoURL || "https://via.placeholder.com/50"} 
              alt="User" 
              className="profile-pic" 
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <div className="profile-dropdown">
                <p className="profile-name">{currentUser.displayName || "User"}</p>
                <p className="profile-email">{currentUser.email}</p>
                <hr />
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar1;
