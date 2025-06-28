import React from 'react';
import { occasions } from '../data/occasions';
import { ArrowRight, Calendar, Heart, Briefcase, Sparkles } from 'lucide-react';

const iconMap = {
  birthday: Calendar,
  anniversary: Heart,
  corporate: Briefcase,
  festivals: Sparkles,
};

interface OccasionsProps {
  onOccasionSelect: (occasionName: string) => void;
}

const Occasions: React.FC<OccasionsProps> = ({ onOccasionSelect }) => {
  const getOccasionGradient = (id: string) => {
    switch (id) {
      case 'birthday': return 'from-pink-400 to-pink-600';
      case 'anniversary': return 'from-red-400 to-red-600';
      case 'corporate': return 'from-blue-400 to-blue-600';
      case 'festivals': return 'from-purple-400 to-purple-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  return (
    <section id="occasions" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-6">
            Perfect for Every <span className="text-primary-600">Occasion</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            Life is full of special moments worth celebrating. Our thoughtfully curated hampers 
            are designed to make every occasion memorable and meaningful.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {occasions.map((occasion, index) => {
            const IconComponent = iconMap[occasion.id as keyof typeof iconMap] || Calendar;
            const gradientClass = getOccasionGradient(occasion.id);
            
            return (
              <div
                key={occasion.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onOccasionSelect(occasion.name)}
              >
                {/* CSS Background Design */}
                <div className={`relative h-80 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 3px, transparent 3px)`,
                      backgroundSize: '40px 40px'
                    }}></div>
                  </div>
                  
                  {/* Floating shapes */}
                  <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                  <div className="absolute bottom-20 left-10 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-bold text-white mb-2">
                      {occasion.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {occasion.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center space-x-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 hover:text-primary-200">
                      <span>Build Custom Hamper</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 2px, transparent 2px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-neutral-800 mb-4">
                Can't Find the Perfect Occasion?
              </h3>
              <p className="text-neutral-600 mb-6 max-w-2xl mx-auto">
                We create custom hampers for any celebration. Tell us about your special moment, 
                and we'll craft the perfect gift experience just for you.
              </p>
              <button
                onClick={() => onOccasionSelect('Custom')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Create Custom Hamper
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Occasions;