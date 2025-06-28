export interface Theme {
  id: string;
  name: string;
  description: string;
  image: string;
  color: string;
}

export const themes: Theme[] = [
  {
    id: 'luxury',
    name: 'Luxury Collection',
    description: 'Premium and sophisticated hampers for discerning tastes',
    image: 'https://images.pexels.com/photos/7525184/pexels-photo-7525184.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-primary-400 to-primary-600',
  },
  {
    id: 'traditional',
    name: 'Traditional Elegance',
    description: 'Classic hampers celebrating heritage and timeless traditions',
    image: 'https://images.pexels.com/photos/6334499/pexels-photo-6334499.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-accent-400 to-accent-600',
  },
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Contemporary designs with clean aesthetics and premium quality',
    image: 'https://images.pexels.com/photos/7525185/pexels-photo-7525185.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-neutral-400 to-neutral-600',
  },
  {
    id: 'wellness',
    name: 'Wellness & Care',
    description: 'Health-focused hampers promoting well-being and self-care',
    image: 'https://images.pexels.com/photos/7525186/pexels-photo-7525186.jpeg?auto=compress&cs=tinysrgb&w=800',
    color: 'from-green-400 to-green-600',
  },
];