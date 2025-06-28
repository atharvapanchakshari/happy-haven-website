import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Occasions from './components/Occasions';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import HamperBuilder from './components/HamperBuilder';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'builder'>('home');
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'builder') {
      setCurrentView('builder');
      // Scroll to top when navigating to builder
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setCurrentView('home');
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
    // Convert occasion name to ID format for consistency
    const occasionId = occasionName.toLowerCase().replace(/\s+/g, '-');
    handleStartBuilder(occasionId);
  };

  if (currentView === 'builder') {
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigate={handleNavigate} currentView={currentView} />
        <HamperBuilder 
          preSelectedOccasion={selectedOccasion} 
          onNavigateHome={() => handleNavigate('hero')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} currentView={currentView} />
      <Hero onNavigate={handleNavigate} onStartBuilder={() => handleStartBuilder()} />
      <Products />
      <Occasions onOccasionSelect={handleOccasionSelect} />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;