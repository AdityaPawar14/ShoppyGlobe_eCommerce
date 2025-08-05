import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, Search, Globe, Github } from 'lucide-react';
import { selectCartQuantity } from '../../store/cartSlice';

const Header = ({ searchTerm, onSearchChange }) => {
  const cartQuantity = useSelector(selectCartQuantity);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
           
            <span>ShoppyGlobe🛒</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Search products..."
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </Link>
            
            <Link
              to="/cart"
              className={`relative flex items-center space-x-1 font-medium transition-colors ${
                isActive('/cart') 
                  ? 'text-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Cart</span>
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartQuantity}
                </span>
              )}
            </Link>

            {/* GitHub Link */}
            <a 
              href="https://github.com/AdityaPawar14/ShoppyGlobe_eCommerce" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="View on GitHub"
            > 
              <Github className="h-6 w-6" /> (GitHub)
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;