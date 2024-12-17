import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaHome, FaMoneyBillWave, FaCarrot, FaCalendarAlt, FaInfoCircle, FaShoppingCart, FaCreditCard, FaEdit } from 'react-icons/fa';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';
import anndaata from '../assets/anndaata.jpg';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    handleMenuClose();
    navigate('/'); // Redirect to sign-in page
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={anndaata} alt="Logo" className="logo-navbar" />
        <h1 className="brand-name">Anndaata</h1>
      </div>

      <ul className="navbar-menu">
        <li><Link to="/" className="nav-link"><FaHome style={{ marginRight: '8px' }} /> Home</Link></li>
        <li><Link to="/sell" className="nav-link"><FaMoneyBillWave style={{ marginRight: '8px' }} /> Sell Your Grains</Link></li>
        <li><Link to="/Liverates" className="nav-link"><FaCarrot style={{ marginRight: '8px' }} /> Live Rates</Link></li>
        <li><Link to="/BookFertilizer" className="nav-link"><FaCalendarAlt style={{ marginRight: '8px' }} /> Book Fertilizers</Link></li>
        <li><Link to="/Events" className="nav-link"><FaCalendarAlt style={{ marginRight: '8px' }} /> Events</Link></li>
        <li><Link to="/Aboutus" className="nav-link"><FaInfoCircle style={{ marginRight: '8px' }} /> About</Link></li>
        <li><Link to="/cart" className="nav-link"><FaShoppingCart style={{ marginRight: '8px' }} /> Cart</Link></li>

        <li>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuClick} className="user-menu-btn">
                <FaUserAlt style={{ marginRight: '8px' }} /> My Profile
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <FaEdit style={{ marginRight: '8px' }} /> <Link to="/EditProfile">Edit Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} className="menu-item">
                  <FaCreditCard style={{ marginRight: '8px' }} /><Link to="/payment">Payment</Link> 
                </MenuItem>
                <MenuItem onClick={handleLogout} className="menu-item">Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/signin" className="nav-link">
              <FaUserAlt style={{ marginRight: '8px' }} /> Log In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
