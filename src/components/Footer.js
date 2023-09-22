// components/Footer.js
import React from 'react';
import './Footer.css'; // Import CSS file for styling

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} NGKast</p>
      {/* Add additional footer content or links here */}
    </footer>
  );
}

export default Footer;
