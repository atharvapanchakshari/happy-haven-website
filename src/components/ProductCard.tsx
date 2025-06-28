import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onOrderNow: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onOrderNow }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
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

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3">
            <button
              onClick={() => onViewDetails(product)}
              className="bg-white/90 hover:bg-white text-neutral-800 p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={() => onOrderNow(product)}
              className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif font-semibold text-neutral-800 line-clamp-2">
            {product.name}
          </h3>
          <span className="text-2xl font-bold text-primary-600 ml-4">
            {product.price}
          </span>
        </div>

        <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>

        {/* Category & Occasions */}
        <div className="mb-4">
          <span className="inline-block bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2">
            {product.category}
          </span>
          {product.occasion.slice(0, 2).map((occasion) => (
            <span
              key={occasion}
              className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
            >
              {occasion}
            </span>
          ))}
          {product.occasion.length > 2 && (
            <span className="inline-block text-neutral-500 text-xs">
              +{product.occasion.length - 2} more
            </span>
          )}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-700 mb-2">Includes:</h4>
          <ul className="text-xs text-neutral-600 space-y-1">
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 border border-neutral-300 text-neutral-700 hover:border-primary-400 hover:text-primary-600 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={() => onOrderNow(product)}
            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;