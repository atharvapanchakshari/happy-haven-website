import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check, ShoppingCart, Eye, X, Gift, Package, Sparkles, Home, Plus, Minus, User, Trash2 } from 'lucide-react';
import { occasions, vibes, packaging, contents, Occasion, Vibe, Packaging, Content } from '../data/hamperBuilder';
import { useCart } from '../contexts/CartContext';

// Import all occasion images
import birthdayImage from '../assets/birthday-occasion.jpg';
import anniversaryImage from '../assets/anniversary-occasion.jpg';
import corporateImage from '../assets/corporate-occasion.jpg';
import festivalsImage from '../assets/festivals-occasion.jpg';
import weddingImage from '../assets/wedding-occasion.JPG';
import babyShowerImage from '../assets/baby-shower-occasion.jpg';
import housewarmingImage from '../assets/House-warming-occasion.JPG';

// Image mapping for occasions
const occasionImageMap = {
  birthday: birthdayImage,
  anniversary: anniversaryImage,
  corporate: corporateImage,
  festivals: festivalsImage,
  wedding: weddingImage,
  'baby-shower': babyShowerImage,
  housewarming: housewarmingImage,
};

interface HamperSelection {
  occasion: Occasion | null;
  vibe: Vibe | null;
  packaging: Packaging | null;
  contents: Content[];
}

interface CartItem {
  id: string;
  hamper: HamperSelection;
  quantity: number;
  price: number;
}

interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface HamperBuilderProps {
  preSelectedOccasion?: string | null;
  onNavigateHome: () => void;
  onNavigateCart: () => void;
}

const HamperBuilder: React.FC<HamperBuilderProps> = ({ preSelectedOccasion, onNavigateHome, onNavigateCart }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selection, setSelection] = useState<HamperSelection>({
    occasion: null,
    vibe: null,
    packaging: null,
    contents: []
  });
  const [showMockup, setShowMockup] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { cart, addToCart, updateQuantity, removeFromCart, calculateTotal, getCartItemCount, customerDetails, updateCustomerDetails } = useCart();

  // Handle pre-selected occasion
  useEffect(() => {
    if (preSelectedOccasion) {
      // Find matching occasion or create a custom one
      let matchedOccasion = occasions.find(occ => 
        occ.id === preSelectedOccasion || 
        occ.name.toLowerCase() === preSelectedOccasion.toLowerCase() ||
        occ.id === preSelectedOccasion.replace(/\s+/g, '-').toLowerCase()
      );

      if (!matchedOccasion && preSelectedOccasion.toLowerCase() !== 'custom') {
        // Create a custom occasion for unmatched ones
        matchedOccasion = {
          id: preSelectedOccasion.replace(/\s+/g, '-').toLowerCase(),
          name: preSelectedOccasion.charAt(0).toUpperCase() + preSelectedOccasion.slice(1),
          description: `Custom hamper for ${preSelectedOccasion}`,
          image: 'gradient-custom'
        };
      }

      if (matchedOccasion) {
        setSelection(prev => ({ ...prev, occasion: matchedOccasion }));
        setCurrentStep(2); // Skip to vibe selection
      }
    }
  }, [preSelectedOccasion]);

  const steps = [
    { number: 1, title: 'Choose Occasion', description: 'What\'s the celebration?' },
    { number: 2, title: 'Select Vibe', description: 'What\'s your style?' },
    { number: 3, title: 'Pick Packaging', description: 'How should we wrap it?' },
    { number: 4, title: 'Choose Contents', description: 'What goes inside?' },
    { number: 5, title: 'Review & Add to Cart', description: 'Add to your order' }
  ];

  const handleOccasionSelect = (occasion: Occasion) => {
    setSelection(prev => ({ ...prev, occasion }));
    setCurrentStep(2);
  };

  const handleVibeSelect = (vibe: Vibe) => {
    setSelection(prev => ({ ...prev, vibe }));
    setCurrentStep(3);
  };

  const handlePackagingSelect = (pkg: Packaging) => {
    setSelection(prev => ({ ...prev, packaging: pkg }));
    setCurrentStep(4);
  };

  const handleContentToggle = (content: Content) => {
    setSelection(prev => ({
      ...prev,
      contents: prev.contents.find(c => c.id === content.id)
        ? prev.contents.filter(c => c.id !== content.id)
        : [...prev.contents, content]
    }));
  };

  const calculateHamperPrice = () => {
    const packagingPrice = selection.packaging?.price || 0;
    const contentsPrice = selection.contents.reduce((sum, content) => sum + content.price, 0);
    return packagingPrice + contentsPrice;
  };

  const addToCartHandler = () => {
    if (selection.occasion && selection.vibe && selection.packaging && selection.contents.length > 0) {
      addToCart({
        type: 'custom',
        name: `${selection.occasion.name} Hamper`,
        price: calculateHamperPrice(),
        quantity: quantity,
        hamper: {
          occasion: selection.occasion.name,
          vibe: selection.vibe.name,
          packaging: selection.packaging.name,
          contents: selection.contents.map(c => c.name)
        }
      });
      
      // Reset selection and quantity for next hamper
      setSelection({
        occasion: null,
        vibe: null,
        packaging: null,
        contents: []
      });
      setQuantity(1);
      setCurrentStep(1);
      
      // Navigate to cart page
      onNavigateCart();
    }
  };

  const handleOrderSubmit = () => {
    const orderDetails = `
🎁 *CUSTOM HAMPER ORDER*

👤 *Customer Details:*
• Name: ${customerDetails.name}
• Phone: ${customerDetails.phone}
• Email: ${customerDetails.email}
• Address: ${customerDetails.address}

📦 *Order Summary:*
${cart.map((item, index) => `
*Item ${index + 1}:*
• Name: ${item.name}
• Type: ${item.type === 'custom' ? 'Custom Hamper' : 'Prebuilt Hamper'}
• Quantity: ${item.quantity}
• Price: ₹${item.price}
${item.type === 'custom' && item.hamper ? `
• Occasion: ${item.hamper.occasion}
• Vibe: ${item.hamper.vibe}
• Packaging: ${item.hamper.packaging}
• Contents: ${item.hamper.contents.join(', ')}
` : ''}
${item.type === 'prebuilt' && item.product ? `
• Category: ${item.product.category}
• Contents: ${item.product.contents.join(', ')}
` : ''}
`).join('\n')}

💰 *Total Amount:* ₹${calculateTotal()}

Please confirm availability and provide delivery details.`;

    const whatsappUrl = `https://wa.me/918007191513?text=${encodeURIComponent(orderDetails)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getOccasionGradient = (id: string) => {
    switch (id) {
      case 'wedding': return 'from-pink-400 to-rose-600';
      case 'baby-shower': return 'from-blue-400 to-cyan-600';
      case 'birthday': return 'from-yellow-400 to-orange-600';
      case 'anniversary': return 'from-red-400 to-pink-600';
      case 'corporate': return 'from-blue-400 to-indigo-600';
      case 'housewarming': return 'from-green-400 to-emerald-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  const getVibeGradient = (id: string) => {
    switch (id) {
      case 'earthy': return 'from-green-400 to-emerald-600';
      case 'elegant': return 'from-purple-400 to-violet-600';
      case 'minimalist': return 'from-gray-400 to-slate-600';
      case 'festive': return 'from-red-400 to-rose-600';
      case 'rustic': return 'from-amber-400 to-orange-600';
      case 'modern': return 'from-blue-400 to-cyan-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  const getPackagingGradient = (id: string) => {
    switch (id) {
      case 'cloth-wrap': return 'from-purple-400 to-violet-600';
      case 'jute-basket': return 'from-amber-400 to-orange-600';
      case 'wooden-box': return 'from-amber-600 to-brown-600';
      case 'gift-box': return 'from-pink-400 to-rose-600';
      case 'wicker-basket': return 'from-yellow-400 to-amber-600';
      case 'metal-tin': return 'from-gray-400 to-slate-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  const getContentGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'candles': return 'from-orange-400 to-red-600';
      case 'snacks': return 'from-yellow-400 to-orange-600';
      case 'skincare': return 'from-green-400 to-emerald-600';
      case 'accessories': return 'from-purple-400 to-violet-600';
      case 'beverages': return 'from-blue-400 to-cyan-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  const canGoToStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return true;
      case 2: return selection.occasion !== null;
      case 3: return selection.occasion !== null && selection.vibe !== null;
      case 4: return selection.occasion !== null && selection.vibe !== null && selection.packaging !== null;
      case 5: return selection.occasion !== null && selection.vibe !== null && selection.packaging !== null && selection.contents.length > 0;
      default: return false;
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8 sm:mb-12">
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4 px-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div 
                className={`flex flex-col items-center min-w-0 cursor-pointer ${
                  currentStep >= step.number ? 'text-primary-600' : 'text-neutral-400'
                } ${canGoToStep(step.number) ? 'hover:text-primary-700' : 'cursor-not-allowed'}`}
                onClick={() => canGoToStep(step.number) && setCurrentStep(step.number)}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all duration-200 ${
                  currentStep > step.number 
                    ? 'bg-primary-600 text-white' 
                    : currentStep === step.number
                    ? 'bg-primary-100 text-primary-600 border-2 border-primary-600'
                    : canGoToStep(step.number)
                    ? 'bg-neutral-200 text-neutral-600 hover:bg-primary-100 hover:text-primary-600'
                    : 'bg-neutral-200 text-neutral-400'
                }`}>
                  {currentStep > step.number ? <Check className="h-3 w-3 sm:h-5 sm:w-5" /> : step.number}
                </div>
                <div className="text-center">
                  <div className="text-xs sm:text-sm font-medium">{step.title}</div>
                  <div className="text-xs hidden sm:block">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-2 sm:mx-4 ${
                  currentStep > step.number ? 'bg-primary-600' : 'bg-neutral-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
        Choose Your Occasion
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {occasions.map((occasion) => {
          const occasionImage = occasionImageMap[occasion.id as keyof typeof occasionImageMap];
          
          return (
            <div
              key={occasion.id}
              onClick={() => handleOccasionSelect(occasion)}
              className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
                selection.occasion?.id === occasion.id ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="relative h-28 sm:h-32 overflow-hidden rounded-xl">
                <img 
                  src={occasionImage} 
                  alt={occasion.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Icon */}
                <div className="absolute top-2 left-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                    <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>

                {/* Selected indicator */}
                {selection.occasion?.id === occasion.id && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-primary-600 text-white rounded-full p-1">
                      <Check className="h-2 w-2 sm:h-3 sm:w-3" />
                    </div>
                  </div>
                )}
                
                {/* Subtle overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <h3 className="text-sm sm:text-base font-serif font-bold">{occasion.name}</h3>
                  <p className="text-xs opacity-90 line-clamp-1">{occasion.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
        Select Your Vibe
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {vibes.map((vibe) => (
          <div
            key={vibe.id}
            onClick={() => handleVibeSelect(vibe)}
            className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
              selection.vibe?.id === vibe.id ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${getVibeGradient(vibe.id)}`}>
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.3) 3px, transparent 3px)`,
                  backgroundSize: '35px 35px'
                }}></div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 right-2">
                <span className={`${vibe.color} text-white px-2 py-0.5 rounded-full text-xs font-medium`}>
                  {vibe.name}
                </span>
              </div>

              {/* Selected indicator */}
              {selection.vibe?.id === vibe.id && (
                <div className="absolute top-2 left-2">
                  <div className="bg-primary-600 text-white rounded-full p-1">
                    <Check className="h-2 w-2 sm:h-3 sm:w-3" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-2 left-2 right-2 text-white">
                <h3 className="text-sm sm:text-base font-serif font-bold">{vibe.name}</h3>
                <p className="text-xs opacity-90 line-clamp-1">{vibe.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
        Choose Packaging
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {packaging.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => handlePackagingSelect(pkg)}
            className={`group cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${
              selection.packaging?.id === pkg.id ? 'ring-2 ring-primary-500' : ''
            }`}
          >
            <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${getPackagingGradient(pkg.id)}`}>
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4) 2px, transparent 2px)`,
                  backgroundSize: '30px 30px'
                }}></div>
              </div>
              
              {/* Icon */}
              <div className="absolute top-2 left-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                </div>
              </div>

              {/* Selected indicator */}
              {selection.packaging?.id === pkg.id && (
                <div className="absolute top-2 right-2">
                  <div className="bg-primary-600 text-white rounded-full p-1">
                    <Check className="h-2 w-2 sm:h-3 sm:w-3" />
                  </div>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 right-2">
                <span className="bg-primary-600 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  ₹{pkg.price}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-white">
                <h3 className="text-sm sm:text-base font-serif font-bold">{pkg.name}</h3>
                <p className="text-xs opacity-90 line-clamp-1">{pkg.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => {
    const categories = Array.from(new Set(contents.map(c => c.category)));
    
    return (
      <div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
          Choose Contents
        </h2>
        <p className="text-center text-neutral-600 mb-6 sm:mb-8 text-sm sm:text-base">
          Select multiple items to create your perfect hamper
        </p>
        
        {categories.map((category) => (
          <div key={category} className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-serif font-bold text-neutral-800 mb-3 sm:mb-4">{category}</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
              {contents.filter(c => c.category === category).map((content) => {
                const isSelected = selection.contents.find(c => c.id === content.id);
                return (
                  <div
                    key={content.id}
                    onClick={() => handleContentToggle(content)}
                    className={`cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 ${
                      isSelected ? 'border-primary-500' : 'border-transparent'
                    }`}
                  >
                    <div className={`relative h-20 sm:h-24 bg-gradient-to-br ${getContentGradient(content.category)}`}>
                      {/* Decorative patterns */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                          backgroundImage: `radial-gradient(circle at 60% 60%, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      
                      {/* Icon */}
                      <div className="absolute top-1 left-1">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-1">
                          <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="absolute top-1 right-1 bg-primary-600 text-white rounded-full p-0.5">
                          <Check className="h-2 w-2 sm:h-3 sm:w-3" />
                        </div>
                      )}
                      <div className="absolute bottom-1 left-1">
                        <span className="bg-black/70 text-white px-1 py-0.5 rounded text-xs font-medium">
                          ₹{content.price}
                        </span>
                      </div>
                    </div>
                    <div className="p-2 sm:p-3">
                      <h4 className="font-semibold text-neutral-800 mb-1 text-xs sm:text-sm line-clamp-1">{content.name}</h4>
                      <p className="text-xs text-neutral-600 line-clamp-2">{content.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {selection.contents.length > 0 && (
          <div className="text-center mt-6 sm:mt-8">
            <button
              onClick={() => setCurrentStep(5)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 sm:px-8 py-3 rounded-full font-semibold transition-colors duration-200 text-sm sm:text-base"
            >
              Continue to Review ({selection.contents.length} items selected)
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderStep5 = () => (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
        Review Your Hamper
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Current Hamper Review */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">Your Hamper Details</h3>
          
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex justify-between items-center py-2 border-b text-sm sm:text-base">
              <span className="font-medium">Occasion:</span>
              <span className="text-primary-600">{selection.occasion?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b text-sm sm:text-base">
              <span className="font-medium">Vibe:</span>
              <span className="text-primary-600">{selection.vibe?.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b text-sm sm:text-base">
              <span className="font-medium">Packaging:</span>
              <span className="text-primary-600">{selection.packaging?.name} - ₹{selection.packaging?.price}</span>
            </div>
          </div>
          
          <h4 className="font-semibold text-neutral-800 mb-3 sm:mb-4 text-sm sm:text-base">Contents ({selection.contents.length} items):</h4>
          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 max-h-32 sm:max-h-40 overflow-y-auto">
            {selection.contents.map((content) => (
              <div key={content.id} className="flex justify-between items-center py-1">
                <span className="text-xs sm:text-sm">{content.name}</span>
                <span className="text-xs sm:text-sm font-medium">₹{content.price}</span>
              </div>
            ))}
          </div>
          
          {/* Quantity Selection */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-sm font-medium text-neutral-800 mb-2">Quantity:</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary-600">₹{calculateHamperPrice() * quantity}</span>
            </div>
          </div>
          
          <button
            onClick={addToCartHandler}
            className="w-full mt-4 sm:mt-6 bg-primary-600 hover:bg-primary-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
        
        {/* Hamper Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">Your Hamper Preview</h3>
          
          <div className="relative mb-4 sm:mb-6">
            <div className={`w-full h-48 sm:h-64 bg-gradient-to-br ${getPackagingGradient(selection.packaging?.id || '')} rounded-xl relative overflow-hidden`}>
              {/* Decorative patterns */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full" style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 3px, transparent 3px)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                <h4 className="text-base sm:text-lg font-bold">{selection.occasion?.name} Hamper</h4>
                <p className="text-xs sm:text-sm opacity-90">{selection.vibe?.name} Style</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {selection.contents.slice(0, 4).map((content) => (
              <div key={content.id} className="relative">
                <div className={`w-full h-16 sm:h-20 bg-gradient-to-br ${getContentGradient(content.category)} rounded-lg relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-medium text-center px-1">
                      {content.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selection.contents.length > 4 && (
            <p className="text-xs sm:text-sm text-neutral-600 text-center mb-4 sm:mb-6">
              +{selection.contents.length - 4} more items included
            </p>
          )}
          
          <button
            onClick={() => setShowMockup(true)}
            className="w-full border border-primary-600 text-primary-600 hover:bg-primary-50 py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
          >
            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>View Full Mockup</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 bg-neutral-50 min-h-screen hamper-builder" data-page="builder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Home Button and Cart */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm sm:text-base"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-neutral-800 text-center flex-1">
            Build Your Perfect Hamper
          </h1>
          
          {/* Cart Indicator */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateCart()}
              className="relative flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm sm:text-base"
            >
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>View Cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {renderStepIndicator()}
        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 sm:mt-12">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                currentStep === 1
                  ? 'text-neutral-400 cursor-not-allowed'
                  : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Previous</span>
            </button>
            
            <div className="text-center">
              {currentStep === 4 && selection.contents.length === 0 && (
                <p className="text-neutral-500 italic text-xs sm:text-sm">Select at least one item to continue</p>
              )}
            </div>

            <button
              onClick={() => {
                if (currentStep === 4 && selection.contents.length > 0) {
                  setCurrentStep(5);
                } else if (currentStep < 4) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              disabled={
                (currentStep === 1 && !selection.occasion) ||
                (currentStep === 2 && !selection.vibe) ||
                (currentStep === 3 && !selection.packaging) ||
                (currentStep === 4 && selection.contents.length === 0) ||
                currentStep === 5
              }
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                ((currentStep === 1 && !selection.occasion) ||
                 (currentStep === 2 && !selection.vibe) ||
                 (currentStep === 3 && !selection.packaging) ||
                 (currentStep === 4 && selection.contents.length === 0) ||
                 currentStep === 5)
                  ? 'text-neutral-400 cursor-not-allowed'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
        
        {/* Mockup Modal */}
        {showMockup && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4">
            <div className="flex min-h-screen items-center justify-center">
              <div 
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setShowMockup(false)}
              />
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6 sm:p-8">
                <button
                  onClick={() => setShowMockup(false)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">
                  Your Custom Hamper Mockup
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <div className={`w-full h-64 sm:h-80 bg-gradient-to-br ${getPackagingGradient(selection.packaging?.id || '')} rounded-xl relative overflow-hidden`}>
                      {/* Decorative patterns */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full" style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 4px, transparent 4px)`,
                          backgroundSize: '50px 50px'
                        }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-800 mb-4">
                      {selection.occasion?.name} Hamper - {selection.vibe?.name} Style
                    </h4>
                    
                    <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                      <p><strong>Packaging:</strong> {selection.packaging?.name}</p>
                      <p><strong>Total Items:</strong> {selection.contents.length}</p>
                      <p><strong>Total Value:</strong> ₹{calculateHamperPrice()}</p>
                    </div>
                    
                    <div className="mt-4 sm:mt-6">
                      <h5 className="font-semibold mb-3 text-sm sm:text-base">Included Items:</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 sm:max-h-40 overflow-y-auto">
                        {selection.contents.map((content) => (
                          <div key={content.id} className="text-xs sm:text-sm bg-neutral-50 p-2 rounded">
                            {content.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={addToCartHandler}
                      className="w-full mt-4 sm:mt-6 bg-primary-600 hover:bg-primary-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HamperBuilder;