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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('hero')}>
            <Gift className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 transition-colors duration-300 ${shouldUseDarkText ? 'text-primary-600' : 'text-white'}`} />
            <span className={`text-lg sm:text-xl font-serif font-bold transition-colors duration-300 ${shouldUseDarkText ? 'text-neutral-800' : 'text-white'}`}>
              Happy Haven
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`font-medium text-sm xl:text-base transition-colors duration-300 ${
                  shouldUseDarkText 
                    ? 'text-neutral-700 hover:text-primary-600' 
                    : 'text-white hover:text-primary-200'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Contact Info - Hidden on smaller screens */}
          <div className="hidden xl:flex items-center space-x-3 2xl:space-x-4">
            <a
              href="tel:+918007191513"
              className={`flex items-center space-x-1 text-xs 2xl:text-sm transition-colors duration-300 ${
                shouldUseDarkText 
                  ? 'text-neutral-600 hover:text-primary-600' 
                  : 'text-white hover:text-primary-200'
              }`}
            >
              <Phone className="h-3 w-3 2xl:h-4 2xl:w-4" />
              <span className="hidden 2xl:inline">+91 8007191513</span>
              <span className="xl:inline 2xl:hidden">Call</span>
            </a>
            <a
              href="https://wa.me/918007191513"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1 text-xs 2xl:text-sm transition-colors duration-300 ${
                shouldUseDarkText 
                  ? 'text-neutral-600 hover:text-green-600' 
                  : 'text-white hover:text-green-300'
              }`}
            >
              <MessageCircle className="h-3 w-3 2xl:h-4 2xl:w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-md transition-colors duration-300 ${
              shouldUseDarkText 
                ? 'text-neutral-700 hover:bg-neutral-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile Contact Links */}
              <div className="border-t pt-3 mt-3 space-y-2">
                <a
                  href="tel:+918007191513"
                  className="flex items-center space-x-3 px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 8007191513</span>
                </a>
                <a
                  href="https://wa.me/918007191513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-3 py-2 text-neutral-600 hover:text-green-600 hover:bg-neutral-50 rounded-md transition-colors duration-200"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;