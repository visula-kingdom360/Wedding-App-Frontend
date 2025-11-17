export interface Design {
  id: string;
  name: string;
  image: string;
  location?: string;
  rating: number;
  reviewCount: number;
  categories: { name: string; }[];
  featured?: boolean;
  description?: string;
}

export const designs: Record<string, Design> = {
  "design-1": {
    id: "design-1",
    name: "Elegant Garden Wedding",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop",
    location: "Garden Venue",
    rating: 4.9,
    reviewCount: 245,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    featured: true,
    description: "Stunning outdoor garden wedding with lush greenery"
  },
  "design-2": {
    id: "design-2",
    name: "Rustic Barn Reception",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=1200&fit=crop",
    location: "Countryside Barn",
    rating: 4.8,
    reviewCount: 189,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    description: "Charming rustic barn with wooden accents and fairy lights"
  },
  "design-3": {
    id: "design-3",
    name: "Luxury Ballroom Setup",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=1200&fit=crop",
    location: "Grand Hotel",
    rating: 5.0,
    reviewCount: 312,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    featured: true,
    description: "Opulent ballroom with crystal chandeliers and gold accents"
  },
  "design-4": {
    id: "design-4",
    name: "Beach Wedding Ceremony",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop",
    location: "Tropical Beach",
    rating: 4.9,
    reviewCount: 276,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    description: "Beautiful beachfront ceremony with ocean views"
  },
  "design-5": {
    id: "design-5",
    name: "Romantic Table Setting",
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?w=800&h=1200&fit=crop",
    location: "Reception Design",
    rating: 4.7,
    reviewCount: 198,
    categories: [{ name: "Decoration" }, { name: "Catering" }],
    description: "Elegant table decorations with floral centerpieces"
  },
  "design-6": {
    id: "design-6",
    name: "Bohemian Wedding Arch",
    image: "https://images.unsplash.com/photo-1522673607108-4b6b2f7e8c5b?w=800&h=1200&fit=crop",
    location: "Outdoor Ceremony",
    rating: 4.8,
    reviewCount: 234,
    categories: [{ name: "Decoration" }],
    featured: true,
    description: "Boho-style ceremony arch with pampas grass and florals"
  },
  "design-7": {
    id: "design-7",
    name: "Modern Minimalist Reception",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1200&fit=crop",
    location: "Contemporary Venue",
    rating: 4.9,
    reviewCount: 267,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    description: "Sleek modern design with clean lines and greenery"
  },
  "design-8": {
    id: "design-8",
    name: "Vintage Wedding Decor",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=1200&fit=crop",
    location: "Historic Mansion",
    rating: 4.8,
    reviewCount: 221,
    categories: [{ name: "Decoration" }],
    description: "Vintage-inspired decorations with antique details"
  },
  "design-9": {
    id: "design-9",
    name: "Romantic Photo Moment",
    image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=1200&fit=crop",
    location: "Photography Inspiration",
    rating: 5.0,
    reviewCount: 345,
    categories: [{ name: "Photography" }],
    featured: true,
    description: "Stunning couple photography with golden hour lighting"
  },
  "design-10": {
    id: "design-10",
    name: "Elegant Cake Display",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=1200&fit=crop",
    location: "Reception Details",
    rating: 4.9,
    reviewCount: 289,
    categories: [{ name: "Catering" }, { name: "Decoration" }],
    description: "Beautiful wedding cake with floral decorations"
  },
  "design-11": {
    id: "design-11",
    name: "Outdoor Reception Setup",
    image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=1200&fit=crop",
    location: "Garden Party",
    rating: 4.8,
    reviewCount: 256,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    description: "Charming outdoor reception with string lights"
  },
  "design-12": {
    id: "design-12",
    name: "DJ & Dance Floor",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=1200&fit=crop",
    location: "Entertainment Setup",
    rating: 4.7,
    reviewCount: 178,
    categories: [{ name: "Music" }],
    description: "Professional DJ setup with lighting and dance floor"
  },
  "design-13": {
    id: "design-13",
    name: "Floral Ceremony Aisle",
    image: "https://images.unsplash.com/photo-1529634597217-02d68c8b95b6?w=800&h=1200&fit=crop",
    location: "Ceremony Design",
    rating: 5.0,
    reviewCount: 334,
    categories: [{ name: "Decoration" }],
    featured: true,
    description: "Gorgeous floral-lined ceremony aisle"
  },
  "design-14": {
    id: "design-14",
    name: "Cocktail Hour Setup",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=1200&fit=crop",
    location: "Bar & Catering",
    rating: 4.8,
    reviewCount: 212,
    categories: [{ name: "Catering" }],
    description: "Stylish cocktail bar and appetizer station"
  },
  "design-15": {
    id: "design-15",
    name: "Intimate Chapel Wedding",
    image: "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?w=800&h=1200&fit=crop",
    location: "Chapel Venue",
    rating: 4.9,
    reviewCount: 298,
    categories: [{ name: "Venue" }],
    description: "Beautiful intimate chapel ceremony"
  },
  "design-16": {
    id: "design-16",
    name: "Candlelit Reception",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=1200&fit=crop",
    location: "Evening Ambiance",
    rating: 5.0,
    reviewCount: 387,
    categories: [{ name: "Decoration" }],
    featured: true,
    description: "Romantic candlelit reception ambiance"
  },
  "design-17": {
    id: "design-17",
    name: "Live Band Performance",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=1200&fit=crop",
    location: "Entertainment",
    rating: 4.9,
    reviewCount: 245,
    categories: [{ name: "Music" }],
    description: "Live band setup for wedding entertainment"
  },
  "design-18": {
    id: "design-18",
    name: "Gourmet Food Display",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=1200&fit=crop",
    location: "Catering Station",
    rating: 4.8,
    reviewCount: 223,
    categories: [{ name: "Catering" }],
    description: "Elegant buffet and food presentation"
  },
  "design-19": {
    id: "design-19",
    name: "Portrait Photography",
    image: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800&h=1200&fit=crop",
    location: "Photo Inspiration",
    rating: 5.0,
    reviewCount: 412,
    categories: [{ name: "Photography" }],
    description: "Beautiful bridal portrait photography"
  },
  "design-20": {
    id: "design-20",
    name: "Fairy Light Canopy",
    image: "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&h=1200&fit=crop",
    location: "Outdoor Decoration",
    rating: 4.9,
    reviewCount: 356,
    categories: [{ name: "Decoration" }, { name: "Venue" }],
    featured: true,
    description: "Magical fairy light canopy for outdoor reception"
  },
  "design-21": {
    id: "design-21",
    name: "Greenhouse Wedding",
    image: "https://images.unsplash.com/photo-1525258961312-6e768b89c4a1?w=800&h=1200&fit=crop",
    location: "Botanical Venue",
    rating: 5.0,
    reviewCount: 389,
    categories: [{ name: "Venue" }, { name: "Decoration" }],
    description: "Stunning greenhouse venue with natural light"
  },
  "design-22": {
    id: "design-22",
    name: "Classic White Decor",
    image: "https://images.unsplash.com/photo-1519167758481-83f29da8ba0a?w=800&h=1200&fit=crop",
    location: "Traditional Setup",
    rating: 4.8,
    reviewCount: 267,
    categories: [{ name: "Decoration" }],
    description: "Timeless white and green wedding decorations"
  },
  "design-23": {
    id: "design-23",
    name: "Acoustic Music Setup",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=1200&fit=crop",
    location: "Ceremony Music",
    rating: 4.7,
    reviewCount: 198,
    categories: [{ name: "Music" }],
    description: "Acoustic guitarist for ceremony and cocktail hour"
  },
  "design-24": {
    id: "design-24",
    name: "Sunset Ceremony",
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&h=1200&fit=crop",
    location: "Outdoor Evening",
    rating: 5.0,
    reviewCount: 445,
    categories: [{ name: "Venue" }, { name: "Photography" }],
    featured: true,
    description: "Breathtaking sunset ceremony location"
  }
};
