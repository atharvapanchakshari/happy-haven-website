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
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Gift className="h-8 w-8 text-amber-400" />
                <span className="text-2xl font-serif font-bold">Happy Haven</span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Creating unforgettable gift experiences through thoughtfully curated hampers. 
                Every moment deserves to be celebrated with care and elegance.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href="tel:+918007191513"
                  className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5" />
                  <span>+91 8007191513</span>
                </a>
                <a
                  href="mailto:atharvapanchakshari@gmail.com"
                  className="flex items-center space-x-3 text-gray-300 hover:text-amber-400 transition-colors duration-200"
                >
                  <Mail className="h-5 w-5" />
                  <span>atharvapanchakshari@gmail.com</span>
                </a>
                <a
                  href="https://wa.me/918007191513"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'Products', 'Occasions', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => handleLinkClick(`#${link.toLowerCase()}`)}
                      className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3 text-gray-300">
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
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {currentYear} Happy Haven. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for special moments</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;