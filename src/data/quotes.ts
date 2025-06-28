export const inspirationalQuotes = [
  "A gift is a reflection of the giver's heart.",
  "The best gifts come from the heart, wrapped with love.",
  "Every hamper tells a story of thoughtfulness.",
  "Luxury isn't about price, it's about experience.",
  "Moments become memories when shared with perfect gifts.",
  "The art of gifting lies in understanding hearts.",
  "Elegance is not about being noticed, it's about being remembered.",
  "Curated with care, delivered with love.",
  "Great gifts create lasting impressions.",
  "The joy of giving multiplies when shared."
];

export const getRandomQuote = () => {
  return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
};