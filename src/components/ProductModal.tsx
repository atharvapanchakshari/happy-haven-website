import React from 'react';
import { X, Star, Package, Truck, Shield, MessageCircle } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderNow: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose, onOrderNow }) => {
  if (!isOpen || !product) return null;

  const handleWhatsAppOrder = () => {
    const message = `Hi! I'm interested in ordering the ${product.name} (${product.price}). Could you provide more details?`;
    const whatsappUrl = `https://wa.me/918007191513?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-neutral-600" />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isPopular && (
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>Popular</span>
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="bg-accent-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
                  <Package className="h-6 w-6 text-primary-600 mb-2" />
                  <span className="text-xs font-medium text-neutral-700">Premium Packaging</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
                  <Truck className="h-6 w-6 text-primary-600 mb-2" />
                  <span className="text-xs font-medium text-neutral-700">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-neutral-50 rounded-lg">
                  <Shield className="h-6 w-6 text-primary-600 mb-2" />
                  <span className="text-xs font-medium text-neutral-700">Quality Assured</span>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-serif font-bold text-neutral-800 mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-primary-600">
                    {product.price}
                  </span>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-2">Description</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">What's Included</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      <span className="text-neutral-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Occasions */}
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-3">Perfect For</h3>
                <div className="flex flex-wrap gap-2">
                  {product.occasion.map((occasion) => (
                    <span
                      key={occasion}
                      className="bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Order via WhatsApp</span>
                </button>
                <button
                  onClick={() => onOrderNow(product)}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-semibold text-lg transition-colors duration-200"
                >
                  Order Now
                </button>
                <p className="text-sm text-neutral-500 text-center">
                  Free delivery within city limits • Custom packaging available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;