import React, { useState } from 'react';
import { products, Product } from '../data/products';
import { Eye, MessageCircle, Star, Package, Gift, Heart, AlertCircle, X, CheckCircle } from 'lucide-react';

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<Product | null>(null);

  const handleOrderNow = (product: Product) => {
    setShowConfirmation(product);
  };

  const confirmOrder = (product: Product) => {
    const orderSummary = `
🎁 *ORDER SUMMARY*

📦 *Product:* ${product.name}
💰 *Price:* ${product.price}
🏷️ *Category:* ${product.category}

📋 *Complete Contents:*
${product.contents.map((item, index) => `${index + 1}. ${item}`).join('\n')}

📦 *Packaging:* ${product.packaging}
🚚 *Delivery:* ${product.deliveryInfo}

🎯 *Perfect for:* ${product.occasions.join(', ')}

✨ *Special Features:*
${product.features.map(feature => `• ${feature}`).join('\n')}

Please confirm this order and provide delivery details.`;

    const whatsappUrl = `https://wa.me/918007191513?text=${encodeURIComponent(orderSummary)}`;
    window.open(whatsappUrl, '_blank');
    setShowConfirmation(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'premium': return Star;
      case 'festive': return Gift;
      case 'corporate': return Package;
      case 'wellness': return Heart;
      default: return Gift;
    }
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'premium': return 'from-amber-400 to-amber-600';
      case 'festive': return 'from-red-400 to-red-600';
      case 'corporate': return 'from-blue-400 to-blue-600';
      case 'wellness': return 'from-green-400 to-green-600';
      case 'gourmet': return 'from-purple-400 to-purple-600';
      case 'baby & family': return 'from-pink-400 to-pink-600';
      default: return 'from-primary-400 to-primary-600';
    }
  };

  return (
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-800 mb-4 sm:mb-6">
            Our <span className="text-primary-600">Gift Hampers</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
            Discover our carefully curated collection of gift hampers, each designed to create 
            memorable moments and express your heartfelt sentiments with elegance and style.
          </p>
        </div>

        {/* Products Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {products.map((product, index) => {
            const CategoryIcon = getCategoryIcon(product.category);
            const gradientClass = getCategoryGradient(product.category);
            
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Header with CSS Design */}
                <div className={`relative h-48 sm:h-56 md:h-64 bg-gradient-to-br ${gradientClass} overflow-hidden`}>
                  {/* Decorative patterns */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                      backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 2px, transparent 2px)`,
                      backgroundSize: '30px 30px'
                    }}></div>
                  </div>
                  
                  {/* Category Icon */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3">
                      <CategoryIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <span className="bg-white/90 text-neutral-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center space-x-1">
                      <Star className="h-2 w-2 sm:h-3 sm:w-3" />
                      <span>{product.category}</span>
                    </span>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white/90 hover:bg-white text-neutral-800 p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                      >
                        <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => handleOrderNow(product)}
                        className="bg-primary-600 hover:bg-primary-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                      >
                        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Product Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xl sm:text-2xl font-bold text-primary-300">
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 sm:p-6">
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Occasions */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-2">Perfect for:</h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {product.occasions.slice(0, 3).map((occasion) => (
                        <span
                          key={occasion}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {occasion}
                        </span>
                      ))}
                      {product.occasions.length > 3 && (
                        <span className="text-neutral-500 text-xs">+{product.occasions.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-700 mb-2">Key Features:</h4>
                    <ul className="text-xs text-neutral-600 space-y-1">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 border border-neutral-300 text-neutral-700 hover:border-primary-400 hover:text-primary-600 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleOrderNow(product)}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Order Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4">
            <div className="flex min-h-screen items-center justify-center">
              <div 
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setShowConfirmation(null)}
              ></div>
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setShowConfirmation(null)}
                  className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="h-6 w-6" />
                </button>
                
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-amber-600" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-800 mb-2">
                      Confirm Your Order
                    </h3>
                    
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Please review your hamper details before ordering
                    </p>
                  </div>

                  {/* Product Summary */}
                  <div className="bg-neutral-50 rounded-xl p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-serif font-bold text-neutral-800">
                          {showConfirmation.name}
                        </h4>
                        <p className="text-neutral-600 text-sm mt-1">
                          {showConfirmation.category} Category
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-primary-600">
                          {showConfirmation.price}
                        </p>
                      </div>
                    </div>

                    <p className="text-neutral-600 text-sm mb-4">
                      {showConfirmation.description}
                    </p>

                    {/* Occasions */}
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-neutral-700 mb-2">Perfect for:</h5>
                      <div className="flex flex-wrap gap-2">
                        {showConfirmation.occasions.map((occasion) => (
                          <span
                            key={occasion}
                            className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {occasion}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Complete Contents */}
                  <div className="mb-6">
                    <h4 className="text-base sm:text-lg font-semibold text-neutral-800 mb-4 flex items-center">
                      <Package className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary-600" />
                      What's Included in Your Hamper
                    </h4>
                    
                    <div className="bg-white border border-neutral-200 rounded-xl p-4 max-h-48 sm:max-h-64 overflow-y-auto">
                      <div className="space-y-3">
                        {showConfirmation.contents.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3 p-2 hover:bg-neutral-50 rounded-lg transition-colors duration-200">
                            <div className="bg-primary-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-neutral-700 text-xs sm:text-sm flex-1">{item}</span>
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-neutral-600">
                        <strong>{showConfirmation.contents.length} premium items</strong> carefully selected for this hamper
                      </p>
                    </div>
                  </div>

                  {/* Packaging & Delivery Info */}
                  <div className="bg-blue-50 rounded-xl p-4 mb-6">
                    <h5 className="font-semibold text-neutral-800 mb-3 text-sm sm:text-base">Packaging & Delivery</h5>
                    <div className="space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center space-x-2">
                        <Package className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{showConfirmation.packaging}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{showConfirmation.deliveryInfo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Features */}
                  <div className="mb-8">
                    <h5 className="font-semibold text-neutral-800 mb-3 text-sm sm:text-base">Special Features</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {showConfirmation.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-neutral-600">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setShowConfirmation(null)}
                      className="flex-1 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 py-3 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => confirmOrder(showConfirmation)}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Yes, Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto p-4">
            <div className="flex min-h-screen items-center justify-center">
              <div 
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setSelectedProduct(null)}
              ></div>
              <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 text-neutral-400 hover:text-neutral-600 text-2xl bg-white rounded-full p-2 shadow-lg"
                >
                  ×
                </button>
                
                <div className="p-6 sm:p-8">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${getCategoryGradient(selectedProduct.category)} rounded-xl p-4 sm:p-6 mb-6 text-white`}>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-2">
                      {selectedProduct.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <p className="text-2xl sm:text-4xl font-bold">
                        {selectedProduct.price}
                      </p>
                      <span className="bg-white/20 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-base sm:text-lg font-medium self-start sm:self-auto">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Left Column */}
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Description</h4>
                        <p className="text-neutral-600 leading-relaxed text-sm sm:text-base">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Perfect For</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.occasions.map((occasion) => (
                            <span
                              key={occasion}
                              className="bg-accent-100 text-accent-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                            >
                              {occasion}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Special Features</h4>
                        <div className="space-y-2">
                          {selectedProduct.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <span className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0"></span>
                              <span className="text-neutral-700 text-sm sm:text-base">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div>
                      <div className="mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Complete Contents</h4>
                        <div className="bg-neutral-50 rounded-xl p-4 max-h-48 sm:max-h-64 overflow-y-auto">
                          <div className="space-y-2">
                            {selectedProduct.contents.map((item, index) => (
                              <div key={index} className="flex items-start space-x-3 text-sm">
                                <span className="bg-primary-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-medium mt-0.5 flex-shrink-0">
                                  {index + 1}
                                </span>
                                <span className="text-neutral-700 flex-1 text-xs sm:text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-3">Packaging & Delivery</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0" />
                            <span className="text-neutral-700 text-sm sm:text-base">{selectedProduct.packaging}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 flex-shrink-0" />
                            <span className="text-neutral-700 text-sm sm:text-base">{selectedProduct.deliveryInfo}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedProduct(null);
                          handleOrderNow(selectedProduct);
                        }}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-base sm:text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Order via WhatsApp</span>
                      </button>
                    </div>
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

export default Products;