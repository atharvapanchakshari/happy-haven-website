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
    image: 'birthday-occasion.jpg'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    description: 'Celebrate love and milestones with elegant anniversary hampers',
    image: 'anniversary-occasion.jpg'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    description: 'Professional hampers for business relationships and events',
    image: 'corporate-occasion.jpg'
  },
  {
    id: 'festivals',
    name: 'Festivals',
    description: 'Traditional and festive hampers for all celebrations',
    image: 'festivals-occasion.jpg'
  },
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Celebrate the union of two hearts with elegant wedding hampers',
    image: 'wedding-occasion.jpg'
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower',
    description: 'Welcome the little one with thoughtful baby shower gifts',
    image: 'baby-shower-occasion.jpg'
  },
  {
    id: 'housewarming',
    name: 'Housewarming',
    description: 'Welcome friends to their new home with thoughtful gifts',
    image: 'housewarming-occasion.jpg'
  }
];