import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Home, User, CreditCard, Check } from 'lucide-react';

interface CartProps {
  onNavigateHome: () => void;
  onNavigateBuilder: () => void;
  onNavigateProducts: () => void;
}

const Cart: React.FC<CartProps> = ({ onNavigateHome, onNavigateBuilder, onNavigateProducts }) => {
  const { cart, updateQuantity, removeFromCart, calculateTotal, getCartItemCount, customerDetails, updateCustomerDetails } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { number: 1, title: 'Cart Review', description: 'Review your items' },
    { number: 2, title: 'Customer Details', description: 'Your information' },
    { number: 3, title: 'Final Order', description: 'Complete your order' }
  ];

  const handleOrderSubmit = () => {
    const orderDetails = `
🎁 *HAPPY HAVEN ORDER*

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

  const canGoToStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return true;
      case 2: return cart.length > 0;
      case 3: return cart.length > 0 && customerDetails.name && customerDetails.phone;
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
        Your Cart ({getCartItemCount()} items)
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Cart Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">Order Items</h3>
          
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">Your cart is empty</p>
              <button
                onClick={onNavigateBuilder}
                className="bg-primary-600 hover:bg-primary-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
              >
                Build Your First Hamper
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm sm:text-base">{item.name}</h4>
                      <p className="text-xs sm:text-sm text-neutral-600">
                        {item.type === 'custom' ? 'Custom Hamper' : 'Prebuilt Hamper'}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-semibold text-sm sm:text-base">₹{item.price}</span>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Cart Total:</span>
                  <span className="text-primary-600">₹{calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">What would you like to do?</h3>
          
          <div className="space-y-4">
            <div className="bg-primary-50 rounded-xl p-4">
              <h4 className="font-semibold text-primary-800 mb-2">Continue Shopping</h4>
              <p className="text-sm text-primary-600 mb-3">
                {cart.length === 0 
                  ? 'Start building your first custom hamper or browse our prebuilt options'
                  : 'Build another custom hamper or add prebuilt hampers to your order'
                }
              </p>
              <button
                onClick={onNavigateBuilder}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
              >
                {cart.length === 0 ? 'Build Your First Hamper' : 'Build Another Hamper'}
              </button>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Proceed to Checkout</h4>
              <p className="text-sm text-green-600 mb-3">
                Complete your order by providing delivery details
              </p>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={cart.length === 0}
                className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base ${
                  cart.length === 0
                    ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Checkout Now
              </button>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Add Prebuilt Hampers</h4>
              <p className="text-sm text-blue-600 mb-3">
                Browse our ready-made hampers and add them to your cart
              </p>
              <button
                onClick={onNavigateProducts}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
              >
                View Ready Hampers
              </button>
            </div>
            
            <div className="bg-neutral-50 rounded-xl p-4">
              <h4 className="font-semibold text-neutral-800 mb-2">Go to Home</h4>
              <p className="text-sm text-neutral-600 mb-3">
                Return to the main page to explore more options
              </p>
              <button
                onClick={onNavigateHome}
                className="w-full bg-neutral-600 hover:bg-neutral-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
        Customer Details
      </h2>
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-800">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={(e) => updateCustomerDetails({ name: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-800">
                Phone *
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={customerDetails.phone}
                onChange={(e) => updateCustomerDetails({ phone: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerDetails.email}
                onChange={(e) => updateCustomerDetails({ email: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-neutral-800">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={customerDetails.address}
                onChange={(e) => updateCustomerDetails({ address: e.target.value })}
                className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-center text-neutral-800 mb-6 sm:mb-8">
        Final Order
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">Order Summary</h3>
          
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex justify-between items-center py-2 border-b text-sm sm:text-base">
              <span className="font-medium">Total Items:</span>
              <span className="text-primary-600">{cart.length}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b text-sm sm:text-base">
              <span className="font-medium">Total Value:</span>
              <span className="text-primary-600">₹{calculateTotal()}</span>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
              <span>Total:</span>
              <span className="text-primary-600">₹{calculateTotal()}</span>
            </div>
          </div>
        </div>
        
        {/* Customer Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">Customer Details</h3>
          
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
            <p><strong>Name:</strong> {customerDetails.name}</p>
            <p><strong>Phone:</strong> {customerDetails.phone}</p>
            <p><strong>Email:</strong> {customerDetails.email}</p>
            <p><strong>Address:</strong> {customerDetails.address}</p>
          </div>
          
          <button
            onClick={handleOrderSubmit}
            className="w-full mt-4 sm:mt-6 bg-primary-600 hover:bg-primary-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-xl font-semibold transition-colors duration-200 text-sm sm:text-base"
          >
            Place Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 bg-neutral-50 min-h-screen" data-page="cart">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-2 text-neutral-600 hover:text-primary-600 transition-colors duration-200 text-sm sm:text-base"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-neutral-800 text-center flex-1">
            {currentStep === 1 ? 'Your Cart' : currentStep === 2 ? 'Customer Details' : 'Final Order'}
          </h1>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {renderStepIndicator()}
        
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          
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
              {currentStep === 2 && (!customerDetails.name || !customerDetails.phone) && (
                <p className="text-neutral-500 italic text-xs sm:text-sm">Please fill in your name and phone number</p>
              )}
            </div>

            <button
              onClick={() => {
                if (currentStep === 1 && cart.length > 0) {
                  setCurrentStep(2);
                } else if (currentStep === 2 && customerDetails.name && customerDetails.phone) {
                  setCurrentStep(3);
                }
              }}
              disabled={
                (currentStep === 1 && cart.length === 0) ||
                (currentStep === 2 && (!customerDetails.name || !customerDetails.phone)) ||
                currentStep === 3
              }
              className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                ((currentStep === 1 && cart.length === 0) ||
                 (currentStep === 2 && (!customerDetails.name || !customerDetails.phone)) ||
                 currentStep === 3)
                  ? 'text-neutral-400 cursor-not-allowed'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart; 