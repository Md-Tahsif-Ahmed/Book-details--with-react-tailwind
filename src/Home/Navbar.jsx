import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center space-x-3 p-4 bg-blue-500 text-white">
      <Link to="/" className="text-lg">Home</Link>
      <Link to="/wishlist" className="text-lg">Wishlist</Link>
    </nav>
  );
};

export default Navbar;
