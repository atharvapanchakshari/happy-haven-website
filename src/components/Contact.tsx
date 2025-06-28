import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    occasion: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hi! I'm interested in your gift hampers.
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Occasion: ${formData.occasion}

Message: ${formData.message}`;

    const whatsappUrl = `https://wa.me/918007191513?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const occasions = [
    'Birthday', 'Anniversary', 'Wedding', 'Corporate Event', 'Festival', 
    'Housewarming', 'Thank You', 'Other'
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">
            Get in <span className="text-primary-600">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to make someone's day special? We're here to help you create the perfect gift experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-800 mb-6 sm:mb-8">
              Contact Information
            </h3>
            
            <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl border border-primary-200 hover:from-primary-100 hover:to-primary-150 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-800">Phone</h4>
                  <a
                    href="tel:+918007191513"
                    className="text-primary-700 hover:text-primary-800 font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    +91 8007191513
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-800">WhatsApp</h4>
                  <a
                    href="https://wa.me/918007191513"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-800 font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    +91 8007191513
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-neutral-800">Email</h4>
                  <a
                    href="mailto:atharvapanchakshari@gmail.com"
                    className="text-blue-700 hover:text-blue-800 font-medium transition-colors duration-200 text-sm sm:text-base break-all"
                  >
                    atharvapanchakshari@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://wa.me/918007191513"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+918007191513"
                className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-gradient-to-br from-neutral-50 to-primary-50 rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">
                Send us a Message
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-green-700 mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-neutral-600 text-sm sm:text-base">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all duration-200 text-sm sm:text-base"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all duration-200 text-sm sm:text-base"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all duration-200 text-sm sm:text-base"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="occasion" className="block text-sm font-medium text-neutral-700 mb-2">
                      Occasion
                    </label>
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all duration-200 text-sm sm:text-base"
                    >
                      <option value="">Select an occasion</option>
                      {occasions.map(occasion => (
                        <option key={occasion} value={occasion}>{occasion}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white transition-all duration-200 resize-none text-sm sm:text-base"
                      placeholder="Tell us about your requirements, budget, delivery date, and any special requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;