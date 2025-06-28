export interface Occasion {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const occasions: Occasion[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    description: 'Make birthdays special with our thoughtfully curated hampers',
    image: 'gradient-birthday'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    description: 'Celebrate love and milestones with elegant anniversary hampers',
    image: 'gradient-anniversary'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional hampers for business relationships and events',
    image: 'gradient-corporate'
  },
  {
    id: 'festivals',
    name: 'Festivals',
    description: 'Traditional and festive hampers for all celebrations',
    image: 'gradient-festivals'
  }
];