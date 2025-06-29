import React from 'react';
import { occasions } from '../data/occasions';
import { ArrowRight, Calendar, Heart, Briefcase, Sparkles, Home } from 'lucide-react';

// Import occasion images
import birthdayImage from '../assets/birthday-occasion.jpg';
import anniversaryImage from '../assets/anniversary-occasion.jpg';
import corporateImage from '../assets/corporate-occasion.jpg';
import festivalsImage from '../assets/festivals-occasion.jpg';
import weddingImage from '../assets/wedding-occasion.JPG';
import babyShowerImage from '../assets/baby-shower-occasion.jpg';
import housewarmingImage from '../assets/House-warming-occasion.JPG';

const iconMap = {
  birthday: Calendar,
  anniversary: Heart,
  corporate: Briefcase,
  festivals: Sparkles,
  wedding: Heart,
  'baby-shower': Sparkles,
  housewarming: Home,
};

// Image mapping
const imageMap = {
  birthday: birthdayImage,
  anniversary: anniversaryImage,
  corporate: corporateImage,
  festivals: festivalsImage,
  wedding: weddingImage,
  'baby-shower': babyShowerImage,
  housewarming: housewarmingImage,
};

interface OccasionsProps {
  onOccasionSelect: (occasionName: string) => void;
}

const Occasions: React.FC<OccasionsProps> = ({ onOccasionSelect }) => {
  return (
    <section id="occasions" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">
            Perfect for Every <span className="text-primary-600">Occasion</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
            Life is full of special moments worth celebrating. Our thoughtfully curated hampers 
            are designed to make every occasion memorable and meaningful.
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {occasions.map((occasion, index) => {
            const IconComponent = iconMap[occasion.id as keyof typeof iconMap] || Calendar;
            const occasionImage = imageMap[occasion.id as keyof typeof imageMap];
            
            return (
              <div
                key={occasion.id}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onOccasionSelect(occasion.name)}
              >
                {/* Background Image */}
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img 
                    src={occasionImage} 
                    alt={occasion.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Subtle overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {/* Icon */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-lg">
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
                      {occasion.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-xs leading-relaxed mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {occasion.description}
                    </p>

                    {/* CTA Button */}
                    <div className="flex items-center space-x-1 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:text-primary-200">
                      <span className="text-xs sm:text-sm">Build Custom Hamper</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Hover Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 2px, transparent 2px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-neutral-800 mb-3 sm:mb-4">
                Can't Find the Perfect Occasion?
              </h3>
              <p className="text-neutral-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                We create custom hampers for any celebration. Tell us about your special moment, 
                and we'll craft the perfect gift experience just for you.
              </p>
              <button
                onClick={() => onOccasionSelect('Custom')}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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