import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Occasions from './components/Occasions';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HamperBuilder from './components/HamperBuilder';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'builder' | 'cart'>('home');
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'builder') {
      setCurrentView('builder');
      // Scroll to top when navigating to builder
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (sectionId === 'cart') {
      setCurrentView('cart');
      // Scroll to top when navigating to cart
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // If we're in builder or cart view and navigating to any section, go back to home first
    if (currentView === 'builder' || currentView === 'cart') {
      setCurrentView('home');
      // For home navigation, just scroll to top
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Wait for the view to change, then scroll to the section
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
      return;
    }
    
    // If we're already in home view, just scroll to the section
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  const handleStartBuilder = (occasionId?: string) => {
    setSelectedOccasion(occasionId || null);
    setCurrentView('builder');
    // Scroll to top when starting builder
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOccasionSelect = (occasionName: string) => {
    // Special handling for custom hamper - open WhatsApp directly
    if (occasionName === 'Custom') {
      const message = `Hi! I'd like to create a custom gift hamper. Can you help me design the perfect hamper for my special occasion?`;
      const whatsappUrl = `https://wa.me/918007191513?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }
    
    // Convert occasion name to ID format for consistency
    const occasionId = occasionName.toLowerCase().replace(/\s+/g, '-');
    handleStartBuilder(occasionId);
  };

  return (
    <CartProvider>
      {currentView === 'builder' ? (
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentView={currentView} />
          <HamperBuilder 
            preSelectedOccasion={selectedOccasion} 
            onNavigateHome={() => handleNavigate('hero')}
            onNavigateCart={() => handleNavigate('cart')}
          />
          <Footer onNavigate={handleNavigate} currentView={currentView} />
        </div>
      ) : currentView === 'cart' ? (
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentView={currentView} />
          <Cart 
            onNavigateHome={() => handleNavigate('hero')}
            onNavigateBuilder={() => handleNavigate('builder')}
            onNavigateProducts={() => handleNavigate('products')}
          />
          <Footer onNavigate={handleNavigate} currentView={currentView} />
        </div>
      ) : (
        <div className="min-h-screen bg-white">
          <Header onNavigate={handleNavigate} currentView={currentView} />
          <Hero onNavigate={handleNavigate} onStartBuilder={() => handleStartBuilder()} />
          <Products onNavigateCart={() => handleNavigate('cart')} />
          <Occasions onOccasionSelect={handleOccasionSelect} />
          <About />
          <Contact />
          <Footer onNavigate={handleNavigate} currentView={currentView} />
        </div>
      )}
    </CartProvider>
  );
}

export default App;