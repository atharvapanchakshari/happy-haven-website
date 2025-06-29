import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  type: 'custom' | 'prebuilt';
  name: string;
  price: number;
  quantity: number;
  // For custom hampers
  hamper?: {
    occasion: string;
    vibe: string;
    packaging: string;
    contents: string[];
  };
  // For prebuilt hampers
  product?: {
    category: string;
    description: string;
    occasions: string[];
    features: string[];
    contents: string[];
    packaging: string;
    deliveryInfo: string;
  };
}

export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface CartContextType {
  cart: CartItem[];
  customerDetails: CustomerDetails;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  updateCustomerDetails: (details: Partial<CustomerDetails>) => void;
  calculateTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: Date.now().toString()
    };
    setCart(prev => [...prev, newItem]);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity > 0) {
      setCart(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity, price: (item.price / item.quantity) * quantity }
          : item
      ));
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateCustomerDetails = (details: Partial<CustomerDetails>) => {
    setCustomerDetails(prev => ({ ...prev, ...details }));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value: CartContextType = {
    cart,
    customerDetails,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    updateCustomerDetails,
    calculateTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}; 