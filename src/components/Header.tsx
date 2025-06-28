import React, { useState, useEffect } from 'react';
import { Menu, X, Gift, Phone, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  currentView?: 'home' | 'builder';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if we should use dark text (for light backgrounds)
  // Use dark text if we're scrolled OR if we're on the builder page
  const shouldUseDarkText = isScrolled || currentView === 'builder';

  const navigationItems = [
    { name: 'Home', id: 'hero' },
    { name: 'Build Hamper', id: 'builder' },
    { name: 'Ready Hampers', id: 'products' },
    { name: 'Occasions', id: 'occasions' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      shouldUseDarkText ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('hero')}>
            <Gift className={`h-8 w-8 transition-colors duration-300 ${shouldUseDarkText ? 'text-primary-600' : 'text-white'}`} />
            <span className={`text-xl font-serif font-bold transition-colors duration-300 ${shouldUseDarkText ? 'text-neutral-800' : 'text-white'}`}>
              Happy Haven
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium transition-colors duration-300 ${
                  shouldUseDarkText 
                    ? 'text-neutral-700 hover:text-primary-600' 
                    : 'text-white hover:text-primary-200'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+918007191513"
              className={`flex items-center space-x-1 text-sm transition-colors duration-300 ${
                shouldUseDarkText 
                  ? 'text-neutral-600 hover:text-primary-600' 
                  : 'text-white hover:text-primary-200'
              }`}
            >
              <Phone className="h-4 w-4" />
              <span>+91 8007191513</span>
            </a>
            <a
              href="https://wa.me/918007191513"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1 text-sm transition-colors duration-300 ${
                shouldUseDarkText 
                  ? 'text-neutral-600 hover:text-green-600' 
                  : 'text-white hover:text-green-300'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
              shouldUseDarkText 
                ? 'text-neutral-700 hover:bg-neutral-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;