export interface Occasion {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Vibe {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

export interface Packaging {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface Content {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
}

export const occasions: Occasion[] = [
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Celebrate the union of two hearts with elegant wedding hampers',
    image: 'gradient-wedding'
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    description: 'Welcome the little one with thoughtful baby shower gifts',
    image: 'gradient-baby'
  },
  {
    id: 'birthday',
    name: 'Birthday',
    description: 'Make birthdays unforgettable with personalized hampers',
    image: 'gradient-birthday'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    description: 'Celebrate love and milestones with romantic hampers',
    image: 'gradient-anniversary'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional hampers for business relationships',
    image: 'gradient-corporate'
  },
  {
    id: 'housewarming',
    name: 'Housewarming',
    description: 'Welcome friends to their new home with thoughtful gifts',
    image: 'gradient-housewarming'
  }
];

export const vibes: Vibe[] = [
  {
    id: 'earthy',
    name: 'Earthy',
    description: 'Natural, organic, and eco-friendly aesthetic',
    image: 'gradient-earthy',
    color: 'bg-green-500'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated and luxurious presentation',
    image: 'gradient-elegant',
    color: 'bg-purple-500'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple, and modern design',
    image: 'gradient-minimalist',
    color: 'bg-gray-500'
  },
  {
    id: 'festive',
    name: 'Festive',
    description: 'Colorful and celebratory theme',
    image: 'gradient-festive',
    color: 'bg-red-500'
  },
  {
    id: 'rustic',
    name: 'Rustic',
    description: 'Warm, cozy, and traditional feel',
    image: 'gradient-rustic',
    color: 'bg-amber-600'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary and trendy styling',
    image: 'gradient-modern',
    color: 'bg-blue-500'
  }
];

export const packaging: Packaging[] = [
  {
    id: 'cloth-wrap',
    name: 'Cloth Wrap',
    description: 'Elegant fabric wrapping with ribbon ties',
    image: 'gradient-cloth',
    price: 150
  },
  {
    id: 'jute-basket',
    name: 'Jute Basket',
    description: 'Eco-friendly woven jute basket',
    image: 'gradient-jute',
    price: 200
  },
  {
    id: 'wooden-box',
    name: 'Wooden Box',
    description: 'Premium wooden box with custom engraving',
    image: 'gradient-wooden',
    price: 350
  },
  {
    id: 'gift-box',
    name: 'Gift Box',
    description: 'Classic cardboard gift box with bow',
    image: 'gradient-gift-box',
    price: 100
  },
  {
    id: 'wicker-basket',
    name: 'Wicker Basket',
    description: 'Traditional wicker basket with handle',
    image: 'gradient-wicker',
    price: 250
  },
  {
    id: 'metal-tin',
    name: 'Metal Tin',
    description: 'Reusable decorative metal container',
    image: 'gradient-metal',
    price: 180
  }
];

export const contents: Content[] = [
  // Candles
  {
    id: 'scented-candles',
    name: 'Scented Candles',
    description: 'Premium soy wax candles with natural fragrances',
    image: 'gradient-candles',
    category: 'Candles',
    price: 450
  },
  {
    id: 'tea-light-set',
    name: 'Tea Light Set',
    description: 'Set of 6 decorative tea light candles',
    image: 'gradient-tea-lights',
    category: 'Candles',
    price: 250
  },
  
  // Snacks
  {
    id: 'gourmet-chocolates',
    name: 'Gourmet Chocolates',
    description: 'Artisanal chocolates in premium packaging',
    image: 'gradient-chocolates',
    category: 'Snacks',
    price: 650
  },
  {
    id: 'mixed-nuts',
    name: 'Mixed Nuts',
    description: 'Premium dry fruits and nuts selection',
    image: 'gradient-nuts',
    category: 'Snacks',
    price: 400
  },
  {
    id: 'cookies-biscuits',
    name: 'Cookies & Biscuits',
    description: 'Handmade cookies and artisanal biscuits',
    image: 'gradient-cookies',
    category: 'Snacks',
    price: 350
  },
  
  // Skincare
  {
    id: 'face-mask-set',
    name: 'Face Mask Set',
    description: 'Natural face masks for different skin types',
    image: 'gradient-face-mask',
    category: 'Skincare',
    price: 550
  },
  {
    id: 'body-lotion',
    name: 'Body Lotion',
    description: 'Moisturizing body lotion with natural ingredients',
    image: 'gradient-lotion',
    category: 'Skincare',
    price: 380
  },
  {
    id: 'lip-balm-set',
    name: 'Lip Balm Set',
    description: 'Set of 3 flavored lip balms',
    image: 'gradient-lip-balm',
    category: 'Skincare',
    price: 280
  },
  
  // Accessories
  {
    id: 'silk-scarf',
    name: 'Silk Scarf',
    description: 'Elegant silk scarf with beautiful patterns',
    image: 'gradient-scarf',
    category: 'Accessories',
    price: 750
  },
  {
    id: 'jewelry-box',
    name: 'Jewelry Box',
    description: 'Compact jewelry organizer box',
    image: 'gradient-jewelry',
    category: 'Accessories',
    price: 450
  },
  {
    id: 'keychain',
    name: 'Custom Keychain',
    description: 'Personalized keychain with engraving',
    image: 'gradient-keychain',
    category: 'Accessories',
    price: 150
  },
  
  // Beverages
  {
    id: 'herbal-tea',
    name: 'Herbal Tea Set',
    description: 'Collection of premium herbal teas',
    image: 'gradient-tea',
    category: 'Beverages',
    price: 480
  },
  {
    id: 'coffee-beans',
    name: 'Artisan Coffee',
    description: 'Freshly roasted coffee beans',
    image: 'gradient-coffee',
    category: 'Beverages',
    price: 520
  }
];