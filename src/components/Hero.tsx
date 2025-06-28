import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Gift } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
  onStartBuilder: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, onStartBuilder }) => {
  const quotes = [
    "Gifts that speak from the heart",
    "Creating moments that matter",
    "Where thoughtfulness meets elegance",
    "Curated with love, delivered with care"
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with CSS patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-800 via-accent-700 to-primary-600"></div>
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-repeat" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
      </div>

      {/* Floating Elements - Responsive positioning */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-10 animate-float">
        <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary-300 opacity-60" />
      </div>
      <div className="absolute top-32 sm:top-40 right-8 sm:right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-primary-400 opacity-40" />
      </div>
      <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-primary-200 opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
            Happy <span className="text-primary-300">Haven</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 sm:mb-4 font-light">
            Thoughtfully Curated Gift Hampers
          </p>
          <div className="h-12 sm:h-16 flex items-center justify-center">
            <p className="text-base sm:text-lg text-primary-200 italic transition-all duration-500 ease-in-out px-4">
              "{currentQuote}"
            </p>
          </div>
        </div>

        <div className="animate-slide-up mt-8 sm:mt-12 space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
            Creating memorable moments with carefully selected gift hampers for every special occasion. 
            From birthdays to corporate events, we make gifting meaningful and unforgettable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-6 sm:mt-8 px-4">
            <button
              onClick={onStartBuilder}
              className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
            >
              <Gift className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Build Your Hamper</span>
            </button>
            <button
              onClick={() => onNavigate('products')}
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-accent-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105"
            >
              View Ready Hampers
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Completely separate from content */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="animate-bounce">
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-white/70" />
        </div>
      </div>
    </section>
  );
};

export default Hero;