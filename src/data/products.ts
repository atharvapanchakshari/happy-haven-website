export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  occasions: string[];
  features: string[];
  contents: string[];
  packaging: string;
  deliveryInfo: string;
}

export const products: Product[] = [
  {
    id: 'premium-luxury-hamper',
    name: 'Premium Luxury Hamper',
    description: 'An exquisite collection of premium items carefully curated for the most discerning recipients. Perfect for making a lasting impression on special occasions.',
    price: '₹3,500',
    category: 'Premium',
    occasions: ['Birthday', 'Anniversary', 'Corporate Events', 'Housewarming'],
    features: [
      'Premium Quality Items',
      'Elegant Wooden Box Packaging',
      'Personalized Greeting Card',
      'Free Same-Day Delivery',
      'Gift Wrapping Included',
      'Custom Message Option'
    ],
    contents: [
      'Artisanal Dark Chocolate Box (200g)',
      'Premium Scented Candles Set (3 pieces)',
      'Gourmet Mixed Nuts (250g)',
      'Organic Herbal Tea Collection (5 varieties)',
      'Luxury Hand Cream & Body Lotion Set',
      'Decorative Silk Scarf',
      'Handcrafted Ceramic Mug',
      'Premium Cookies & Biscuits (300g)',
      'Natural Face Mask Set (3 pieces)',
      'Elegant Bookmark with Tassel'
    ],
    packaging: 'Elegant wooden box with velvet lining and ribbon',
    deliveryInfo: 'Free delivery within 24 hours in city limits'
  },
  {
    id: 'festive-celebration-hamper',
    name: 'Festive Celebration Hamper',
    description: 'Celebrate festivals and special occasions with our traditional yet modern festive hamper filled with seasonal delights and cultural treasures.',
    price: '₹2,200',
    category: 'Festive',
    occasions: ['Diwali', 'Christmas', 'New Year', 'Eid', 'Holi', 'Raksha Bandhan'],
    features: [
      'Traditional & Modern Items',
      'Festive Themed Packaging',
      'Seasonal Specialties',
      'Cultural Significance',
      'Family-Friendly Contents',
      'Eco-Friendly Materials'
    ],
    contents: [
      'Traditional Sweets Box (400g)',
      'Decorative Diyas Set (6 pieces)',
      'Festive Rangoli Stencils',
      'Aromatic Incense Sticks (5 varieties)',
      'Dry Fruits Premium Mix (300g)',
      'Handmade Soap Collection (4 pieces)',
      'Traditional Brass Items (Small decorative)',
      'Festive Greeting Cards Set',
      'Organic Gulal Colors (Holi special)',
      'Decorative Lantern (LED)',
      'Traditional Fabric Pouch',
      'Festive Recipe Book'
    ],
    packaging: 'Traditional jute basket with colorful fabric lining',
    deliveryInfo: 'Express delivery available during festival seasons'
  },
  {
    id: 'corporate-executive-hamper',
    name: 'Corporate Executive Hamper',
    description: 'Professional and sophisticated hampers designed to strengthen business relationships and show appreciation to valued clients and employees.',
    price: '₹4,200',
    category: 'Corporate',
    occasions: ['Corporate Events', 'Client Appreciation', 'Employee Recognition', 'Business Meetings'],
    features: [
      'Professional Presentation',
      'Custom Branding Available',
      'Bulk Order Discounts',
      'Executive Quality Items',
      'Business Card Holder',
      'Corporate Packaging'
    ],
    contents: [
      'Premium Coffee Bean Collection (500g)',
      'Executive Pen Set (2 pieces)',
      'Leather Business Card Holder',
      'Gourmet Chocolate Selection (300g)',
      'Stress Relief Essential Oil Set',
      'High-Quality Notebook & Planner',
      'Premium Green Tea Collection',
      'Desk Organizer (Bamboo)',
      'Wireless Phone Charger Pad',
      'Corporate Branded Mug',
      'Healthy Snack Mix (250g)',
      'Motivational Quote Cards Set',
      'USB Drive (16GB) - Custom branded'
    ],
    packaging: 'Professional black gift box with company logo option',
    deliveryInfo: 'Scheduled delivery for corporate events'
  },
  {
    id: 'wellness-selfcare-hamper',
    name: 'Wellness & Self-Care Hamper',
    description: 'A thoughtfully curated collection focused on wellness, relaxation, and self-care. Perfect for showing someone you care about their well-being.',
    price: '₹2,800',
    category: 'Wellness',
    occasions: ['Get Well Soon', 'Stress Relief', 'Birthday', 'Thank You', 'Self-Care'],
    features: [
      'Natural & Organic Products',
      'Stress Relief Focus',
      'Aromatherapy Elements',
      'Skin Care Essentials',
      'Relaxation Items',
      'Health-Conscious Selection'
    ],
    contents: [
      'Aromatherapy Essential Oil Set (5 oils)',
      'Natural Face Mask Collection (6 pieces)',
      'Organic Body Scrub (200ml)',
      'Herbal Tea Wellness Blend (8 varieties)',
      'Meditation Cushion (Small)',
      'Scented Bath Salts (300g)',
      'Natural Lip Balm Set (3 flavors)',
      'Yoga Mat (Travel size)',
      'Healthy Granola Mix (250g)',
      'Mindfulness Journal',
      'Bamboo Facial Cleansing Brush',
      'Relaxation Music CD',
      'Organic Hand Sanitizer (100ml)'
    ],
    packaging: 'Eco-friendly wicker basket with organic cotton lining',
    deliveryInfo: 'Careful handling for fragile wellness items'
  },
  {
    id: 'gourmet-foodie-hamper',
    name: 'Gourmet Foodie Hamper',
    description: 'A delicious journey for food lovers featuring artisanal treats, gourmet snacks, and culinary delights from around the world.',
    price: '₹3,100',
    category: 'Gourmet',
    occasions: ['Food Lovers', 'Housewarming', 'Thank You', 'Anniversary', 'Birthday'],
    features: [
      'Artisanal Food Items',
      'International Flavors',
      'Premium Ingredients',
      'Chef-Curated Selection',
      'Recipe Cards Included',
      'Food-Safe Packaging'
    ],
    contents: [
      'Artisanal Cheese Selection (3 varieties)',
      'Gourmet Crackers Assortment',
      'Imported Olive Oil (250ml)',
      'Specialty Honey Collection (3 types)',
      'Premium Dark Chocolate (70% cocoa)',
      'Exotic Spice Mix Set (6 spices)',
      'Gourmet Pasta (2 varieties)',
      'Truffle-infused Salt',
      'Organic Jam Collection (3 flavors)',
      'Artisanal Bread Mix',
      'Wine Pairing Guide',
      'Gourmet Recipe Cards (10 recipes)',
      'Specialty Tea Blends (4 types)'
    ],
    packaging: 'Insulated cooler bag with ice packs for freshness',
    deliveryInfo: 'Temperature-controlled delivery for perishable items'
  },
  {
    id: 'new-parent-hamper',
    name: 'New Parent Celebration Hamper',
    description: 'Celebrate the arrival of a new baby with this thoughtful hamper designed for new parents, featuring both baby essentials and parent care items.',
    price: '₹2,600',
    category: 'Baby & Family',
    occasions: ['Baby Shower', 'New Born', 'Christening', 'First Birthday'],
    features: [
      'Baby-Safe Products',
      'Parent Care Items',
      'Organic Materials',
      'Gender-Neutral Options',
      'Practical & Thoughtful',
      'Keepsake Items'
    ],
    contents: [
      'Organic Baby Blanket (Soft cotton)',
      'Baby Photo Album (First year)',
      'Natural Baby Lotion & Shampoo Set',
      'Soft Plush Toy (Hypoallergenic)',
      'Parent Relaxation Tea Blend',
      'Baby Milestone Cards Set',
      'Organic Baby Wipes (3 packs)',
      'Soothing Night Light',
      'New Parent Survival Kit (Snacks)',
      'Baby Handprint Kit',
      'Lullaby Music Collection',
      'Parenting Tips Booklet',
      'Congratulations Greeting Card'
    ],
    packaging: 'Soft fabric basket with baby-themed decoration',
    deliveryInfo: 'Gentle handling with baby-safe packaging materials'
  }
];