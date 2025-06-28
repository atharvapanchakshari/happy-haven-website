import React from 'react';
import { Gift, Phone, Mail, MessageCircle, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400" />
                <span className="text-xl sm:text-2xl font-serif font-bold">Happy Haven</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                Creating unforgettable gift experiences through thoughtfully curated hampers. 
                Every moment deserves to be celebrated with care and elegance.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 sm:space-y-3">
                <a
                  href="tel:+918007191513"
                  className="flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base"
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>+91 8007191513</span>
                </a>
                <a
                  href="mailto:atharvapanchakshari@gmail.com"
                  className="flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm sm:text-base"
                >
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="break-all">atharvapanchakshari@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/918007191513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 sm:space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base"
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                {['Home', 'Products', 'Occasions', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(`#${link.toLowerCase()}`)}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-left text-sm sm:text-base"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Our Services</h3>
              <ul className="space-y-2 sm:space-y-3 text-gray-300 text-sm sm:text-base">
                <li>Custom Gift Hampers</li>
                <li>Corporate Gifts</li>
                <li>Festival Specials</li>
                <li>Birthday Hampers</li>
                <li>Anniversary Gifts</li>
                <li>Bulk Orders</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center space-x-2 text-gray-400 text-sm sm:text-base">
              <span>© {currentYear} Happy Haven. Made with</span>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 fill-current" />
              <span>for special moments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;