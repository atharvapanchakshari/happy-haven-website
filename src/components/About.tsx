import React from 'react';
import { Heart, Award, Truck, Shield } from 'lucide-react';
// Import your about image (uncomment when you add your image)
// import aboutImage from '../assets/about-image.jpg';

const About: React.FC = () => {
  const features = [
    {
      icon: Heart,
      title: 'Crafted with Love',
      description: 'Every hamper is carefully assembled with attention to detail and genuine care for your recipients.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest products from trusted suppliers to ensure exceptional quality.'
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'Timely and secure delivery ensures your gifts reach their destination fresh and beautiful.'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every product is carefully inspected to meet our high standards before packaging.'
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">
            About <span className="text-primary-600">Happy Haven</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
            We believe that every gift should tell a story, convey emotion, and create lasting memories. 
            That's why we've dedicated ourselves to curating the most thoughtful gift experiences.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16 sm:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-800 mb-6 sm:mb-8">
              Our Story
            </h3>
            
            {/* Add about image (uncomment when you add your image) */}
            {/* <div className="mb-8">
              <img 
                src={aboutImage} 
                alt="Happy Haven Team" 
                className="w-full max-w-2xl mx-auto rounded-2xl shadow-lg"
              />
            </div> */}
            
            <div className="space-y-4 sm:space-y-6 text-neutral-600 leading-relaxed text-base sm:text-lg">
              <p>
                Happy Haven was born from a simple belief: that gifting should be an art form. 
                We noticed that in our fast-paced world, the personal touch in gift-giving was often lost. 
                So we set out to change that.
              </p>
              <p>
                Each hamper we create is a carefully orchestrated symphony of quality products and thoughtful presentation. 
                From the moment you place an order to the joy on your recipient's face, we ensure every detail 
                reflects the care and thought you want to convey.
              </p>
              <p>
                Our team works tirelessly to source the finest products, create stunning presentations, 
                and deliver experiences that exceed expectations. Because we believe that when you give 
                with intention, you create moments that last forever.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-primary-200 group-hover:to-primary-300 transition-all duration-300">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-2 sm:mb-3">
                {feature.title}
              </h4>
              <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;