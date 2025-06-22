import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <h3>Quick Links</h3>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p className="footer-text">&copy; {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
