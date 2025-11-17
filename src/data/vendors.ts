import image_5977d9532091fcd2af098d5f1292332deb5dac64 from 'figma:asset/5977d9532091fcd2af098d5f1292332deb5dac64.png';
import image_3dea001b075df2df5f50c785440fe2515a113d3a from 'figma:asset/3dea001b075df2df5f50c785440fe2515a113d3a.png';
import image_2dd38c0b8cb4a1694527a1d01d9cccba4709dbe6 from 'figma:asset/2dd38c0b8cb4a1694527a1d01d9cccba4709dbe6.png';
import image_8134149d63c357cead7015609d2826aa319dbd25 from 'figma:asset/8134149d63c357cead7015609d2826aa319dbd25.png';
import image_f651fbb8a42fe11e91bde1deab4b2df3648ea8db from 'figma:asset/f651fbb8a42fe11e91bde1deab4b2df3648ea8db.png';
import image_deb58569ce9a998a75d63a07d619281107242072 from 'figma:asset/deb58569ce9a998a75d63a07d619281107242072.png';
import image_209f16b8e6052c6ee523fa05b3f87bb9b7a37655 from 'figma:asset/209f16b8e6052c6ee523fa05b3f87bb9b7a37655.png';
import image_7ef3d60b7b45df643c1a3f94b858fb8ddbf764ec from 'figma:asset/7ef3d60b7b45df643c1a3f94b858fb8ddbf764ec.png';
// Vendor data - different vendors with unique services and packages
import {
  Camera,
  Music,
  Cake,
  Flower2,
  Sparkles,
  PartyPopper,
  Users,
  Briefcase,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  UtensilsCrossed,
  Palette,
  Building2,
  Mail,
  Car,
  Gem,
  Zap,
  Mic2,
  Scissors,
} from 'lucide-react';

export interface VendorData {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: string;
  location: string;
  image: string;
  logo: string;
  featured: boolean;
  followers: string;
  followersGrowth: string;
  completedBusinesses: number;
  businessGrowth: string;
  phone?: string;
  email?: string;
  categories: Array<{
    name: string;
    icon: any;
    color: string;
  }>;
  socials: Array<{
    name: string;
    icon: any;
    color: string;
  }>;
}

export interface PackageData {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge: string;
  category: string;
  image: string;
}

export const vendors: Record<string, VendorData> = {
  '1': {
    id: '1',
    name: 'Great Photography',
    description: 'Capture every special moment with professional photographers who bring your events to life. Specializing in wedding photography with artistic and candid shots.',
    rating: 4.8,
    price: 'Starting from LKR 20,000',
    location: 'Boralla, Jambugasmulla Junction, Colombo 08',
    phone: '+94 77 123 4567',
    email: 'info@greatphotography.lk',
    image: 'https://images.unsplash.com/photo-1667782511520-25bd639fabd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBncmVlbmVyeXxlbnwxfHx8fDE3NjIzNzczNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1699562862446-4407feedab84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE5NzY5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '45.2K',
    followersGrowth: '+12.5%',
    completedBusinesses: 342,
    businessGrowth: '+8.3%',
    categories: [
      { name: 'Photography', icon: Camera, color: 'bg-purple-300' },
      { name: 'Videography', icon: Camera, color: 'bg-blue-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Twitter', icon: Twitter, color: 'bg-blue-400' },
      { name: 'YouTube', icon: Youtube, color: 'bg-red-600' },
      { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '2': {
    id: '2',
    name: 'Daddy Band',
    description: 'Professional live music band bringing energy and entertainment to your special day. Over 10 years of experience performing at weddings and corporate events across Sri Lanka.',
    rating: 4.9,
    price: 'Starting from LKR 55,000',
    location: 'Mount Lavinia, Colombo',
    phone: '+94 76 234 5678',
    email: 'bookings@daddyband.lk',
    image: 'https://images.unsplash.com/photo-1738225734899-30852be7e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMGJhbmQlMjBncmVlbmVyeXxlbnwxfHx8fDE3NjIzNzczNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjE5NzUyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '38.5K',
    followersGrowth: '+15.2%',
    completedBusinesses: 287,
    businessGrowth: '+11.7%',
    categories: [
      { name: 'Music', icon: Music, color: 'bg-blue-300' },
      { name: 'Entertainment', icon: Sparkles, color: 'bg-pink-300' },
      { name: 'DJ Services', icon: PartyPopper, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'YouTube', icon: Youtube, color: 'bg-red-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '3': {
    id: '3',
    name: 'Kulunu Weddings',
    description: 'Full-service wedding planning and decoration specialists. We transform venues into magical spaces with elegant floral arrangements, lighting, and custom decor tailored to your vision.',
    rating: 4.7,
    price: 'Starting from LKR 75,000',
    location: 'Nugegoda, Colombo',
    phone: '+94 75 345 6789',
    email: 'hello@kulunuweddings.lk',
    image: 'https://images.unsplash.com/photo-1563392317152-12e7e2d48be0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3JhbCUyMGdyZWVufGVufDF8fHx8MTc2MjM3NzM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1664530140722-7e3bdbf2b870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYyMDQwODQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '52.8K',
    followersGrowth: '+18.9%',
    completedBusinesses: 425,
    businessGrowth: '+14.2%',
    categories: [
      { name: 'Decoration', icon: Flower2, color: 'bg-yellow-300' },
      { name: 'Planning', icon: Briefcase, color: 'bg-green-300' },
      { name: 'Floral Design', icon: Sparkles, color: 'bg-pink-300' },
      { name: 'Event Styling', icon: Users, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Pinterest', icon: Twitter, color: 'bg-red-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '4': {
    id: '4',
    name: 'Royal Catering Services',
    description: 'Premium catering service offering exquisite cuisine for your wedding. Specializing in traditional Sri Lankan and international dishes with professional service staff.',
    rating: 4.6,
    price: 'Starting from LKR 1,500 per person',
    location: 'Dehiwala, Colombo',
    phone: '+94 74 456 7890',
    email: 'reservations@royalcatering.lk',
    image: 'https://images.unsplash.com/photo-1738225734899-30852be7e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2F0ZXJpbmclMjBncmVlbmVyeXxlbnwxfHx8fDE3NjIzNzczNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1761416376088-d6456fcd76fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MjAyMzg2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    followers: '28.3K',
    followersGrowth: '+9.8%',
    completedBusinesses: 198,
    businessGrowth: '+6.5%',
    categories: [
      { name: 'Catering', icon: UtensilsCrossed, color: 'bg-orange-300' },
      { name: 'Buffet', icon: Cake, color: 'bg-red-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '5': {
    id: '5',
    name: 'Glam Makeup Studio',
    description: 'Professional bridal makeup and hair styling services. Our expert team creates stunning looks tailored to your style with premium products and techniques.',
    rating: 4.9,
    price: 'Starting from LKR 15,000',
    location: 'Bambalapitiya, Colombo 04',
    phone: '+94 71 567 8901',
    email: 'bookings@glammakeup.lk',
    image: 'https://images.unsplash.com/photo-1667562695041-e75480f05aad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlkYWwlMjBtYWtldXAlMjBib3RhbmljYWwlMjBncmVlbmVyeXxlbnwxfHx8fDE3NjIzNzczNzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1698181842513-2179d5f8bc65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzYyMDQwODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    followers: '34.5K',
    followersGrowth: '+16.2%',
    completedBusinesses: 276,
    businessGrowth: '+13.8%',
    categories: [
      { name: 'Makeup', icon: Palette, color: 'bg-pink-300' },
      { name: 'Hair Styling', icon: Scissors, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'YouTube', icon: Youtube, color: 'bg-red-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '6': {
    id: '6',
    name: 'Sweet Dreams Cakes',
    description: 'Custom wedding cake designers creating edible masterpieces. From classic elegance to modern designs, each cake is handcrafted to perfection.',
    rating: 4.8,
    price: 'Starting from LKR 25,000',
    location: 'Wellawatte, Colombo 06',
    phone: '+94 77 678 9012',
    email: 'orders@sweetdreamscakes.lk',
    image: 'https://images.unsplash.com/photo-1738025277237-d7e0c59bc011?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGJvdGFuaWNhbCUyMGdyZWVuZXJ5fGVufDF8fHx8MTc2MjM3NzM3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2FrZSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYyMDQwODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    followers: '22.1K',
    followersGrowth: '+11.4%',
    completedBusinesses: 189,
    businessGrowth: '+9.2%',
    categories: [
      { name: 'Wedding Cakes', icon: Cake, color: 'bg-yellow-300' },
      { name: 'Desserts', icon: Sparkles, color: 'bg-pink-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '7': {
    id: '7',
    name: 'The Grand Palace',
    description: 'Luxury wedding venue with stunning architecture and spacious halls. Accommodates 500+ guests with world-class facilities and professional event management.',
    rating: 4.7,
    price: 'Starting from LKR 350,000',
    location: 'Rajagiriya, Colombo',
    phone: '+94 76 789 0123',
    email: 'events@grandpalace.lk',
    image: 'https://images.unsplash.com/photo-1738225734899-30852be7e396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwdmVudWUlMjBncmVlbmVyeXxlbnwxfHx8fDE3NjIzNzczNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1625619080917-7d6ff39e0675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBiYWxscm9vbXxlbnwxfHx8fDE3NjIwNDA4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '48.7K',
    followersGrowth: '+14.6%',
    completedBusinesses: 312,
    businessGrowth: '+10.9%',
    categories: [
      { name: 'Venue', icon: Building2, color: 'bg-blue-300' },
      { name: 'Banquet Hall', icon: Users, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '8': {
    id: '8',
    name: 'Elegant Invitations',
    description: 'Bespoke wedding invitation designers creating unique and memorable cards. From traditional to modern designs with premium printing and finishing.',
    rating: 4.5,
    price: 'Starting from LKR 150 per card',
    location: 'Maharagama, Colombo',
    phone: '+94 75 890 1234',
    email: 'designs@elegantinvitations.lk',
    image: 'https://images.unsplash.com/photo-1639291492775-b2dba15cb3e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwaW52aXRhdGlvbnMlMjBib3RhbmljYWwlMjBncmVlbnxlbnwxfHx8fDE3NjIzNzczNzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1548839186-d3eaf749120f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZpdGF0aW9uJTIwY2FyZHMlMjBlbGVnYW50fGVufDF8fHx8MTc2MjA0MDg0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '15.6K',
    followersGrowth: '+7.3%',
    completedBusinesses: 156,
    businessGrowth: '+5.8%',
    categories: [
      { name: 'Invitations', icon: Mail, color: 'bg-green-300' },
      { name: 'Printing', icon: Sparkles, color: 'bg-yellow-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '9': {
    id: '9',
    name: 'Luxury Ride Rentals',
    description: 'Premium wedding car rental service featuring luxury vehicles including vintage cars, limousines, and modern luxury sedans with professional chauffeurs.',
    rating: 4.8,
    price: 'Starting from LKR 35,000',
    location: 'Kollupitiya, Colombo 03',
    phone: '+94 74 901 2345',
    email: 'bookings@luxuryride.lk',
    image: 'https://images.unsplash.com/photo-1580494767389-2e3c67ddec11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2FyJTIwZ3JlZW5lcnl8ZW58MXx8fHwxNzYyMzc3MzcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1541239370886-851049f91487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBsdXh1cnklMjB2ZWhpY2xlfGVufDF8fHx8MTc2MjA0MDg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    followers: '19.8K',
    followersGrowth: '+10.1%',
    completedBusinesses: 234,
    businessGrowth: '+8.7%',
    categories: [
      { name: 'Transportation', icon: Car, color: 'bg-blue-300' },
      { name: 'Luxury Cars', icon: Sparkles, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '10': {
    id: '10',
    name: 'Sparkle Jewelry',
    description: 'Exquisite bridal jewelry and accessories rental service. Featuring traditional and contemporary designs with precious stones and metals.',
    rating: 4.6,
    price: 'Starting from LKR 5,000 rental',
    location: 'Pettah, Colombo 11',
    phone: '+94 71 012 3456',
    email: 'rentals@sparklejewelry.lk',
    image: image_3dea001b075df2df5f50c785440fe2515a113d3a,
    logo: 'https://images.unsplash.com/photo-1580582173810-6bda1de3ff5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXdlbHJ5JTIwZGlhbW9uZHMlMjByaW5nc3xlbnwxfHx8fDE3NjIwNDA4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '26.4K',
    followersGrowth: '+12.3%',
    completedBusinesses: 167,
    businessGrowth: '+7.9%',
    categories: [
      { name: 'Jewelry', icon: Gem, color: 'bg-yellow-300' },
      { name: 'Accessories', icon: Sparkles, color: 'bg-pink-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '11': {
    id: '11',
    name: 'Dance Masters',
    description: 'Professional wedding choreography and dance instruction. We create memorable first dances and group performances tailored to your style and skill level.',
    rating: 4.7,
    price: 'Starting from LKR 18,000',
    location: 'Kirulapone, Colombo 05',
    phone: '+94 77 123 4567',
    email: 'classes@dancemasters.lk',
    image: image_8134149d63c357cead7015609d2826aa319dbd25,
    logo: 'https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYW5jZSUyMHBlcmZvcm1hbmNlJTIwd2VkZGluZ3xlbnwxfHx8fDE3NjIwNDA4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '31.2K',
    followersGrowth: '+15.7%',
    completedBusinesses: 203,
    businessGrowth: '+11.4%',
    categories: [
      { name: 'Choreography', icon: Zap, color: 'bg-orange-300' },
      { name: 'Dance Classes', icon: Users, color: 'bg-pink-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'YouTube', icon: Youtube, color: 'bg-red-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '12': {
    id: '12',
    name: 'Perfect Hosts',
    description: 'Professional wedding MCs and event hosts. Our experienced presenters ensure smooth event flow with engaging commentary in English, Sinhala, and Tamil.',
    rating: 4.8,
    price: 'Starting from LKR 25,000',
    location: 'Kotte, Colombo',
    phone: '+94 76 234 5678',
    email: 'mc@perfecthosts.lk',
    image: image_5977d9532091fcd2af098d5f1292332deb5dac64,
    logo: 'https://images.unsplash.com/photo-1561264819-1ccc1c6e0ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGJhbmQlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjE5NzUyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: false,
    followers: '24.9K',
    followersGrowth: '+13.5%',
    completedBusinesses: 289,
    businessGrowth: '+12.1%',
    categories: [
      { name: 'MC Services', icon: Mic2, color: 'bg-blue-300' },
      { name: 'Hosting', icon: Users, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  },
  '13': {
    id: '13',
    name: 'Bridal Couture',
    description: 'Custom bridal dress designers and rental boutique. Featuring elegant wedding gowns, traditional attire, and accessories with expert alterations and styling.',
    rating: 4.9,
    price: 'Starting from LKR 45,000',
    location: 'Borella, Colombo 08',
    phone: '+94 75 345 6789',
    email: 'bridal@bridalcouture.lk',
    image: 'https://images.unsplash.com/photo-1617880828721-a507efe5e27f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmlkYWwlMjBkcmVzcyUyMGdyZWVuZXJ5fGVufDF8fHx8MTc2MjM3NzM3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    logo: 'https://images.unsplash.com/photo-1698181842513-2179d5f8bc65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBiZWF1dHl8ZW58MXx8fHwxNzYyMDQwODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '41.3K',
    followersGrowth: '+17.8%',
    completedBusinesses: 328,
    businessGrowth: '+14.5%',
    categories: [
      { name: 'Bridal Wear', icon: Sparkles, color: 'bg-pink-300' },
      { name: 'Fashion', icon: Scissors, color: 'bg-purple-300' },
      { name: 'Wedding', icon: Sparkles, color: 'bg-pink-300' },
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Pinterest', icon: Twitter, color: 'bg-red-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  }
};

export const vendorPackages: Record<string, PackageData[]> = {
  '1': [
    {
      id: '1-1',
      title: 'Professional Photography Package',
      description: 'Capture every special moment with professional photographers who bring your events to life. From candid wedding shots to formal portraits.',
      price: 'LKR 20,000',
      originalPrice: 'LKR 28,000',
      badge: 'FEATURED',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=400&fit=crop'
    },
    {
      id: '1-2',
      title: 'Premium Wedding Album',
      description: 'Luxury wedding photo album with premium printing and custom design. Includes 50 pages of your best moments.',
      price: 'LKR 35,000',
      originalPrice: 'LKR 45,000',
      badge: 'POPULAR',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1627364155535-9ed50e63aece?w=800&h=400&fit=crop'
    },
    {
      id: '1-3',
      title: 'Photography + Videography Combo',
      description: 'Complete coverage with both photography and videography services. Perfect for capturing every moment.',
      price: 'LKR 55,000',
      badge: 'BEST VALUE',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1708134128335-1ea956d44c97?w=800&h=400&fit=crop'
    },
    {
      id: '1-4',
      title: 'Pre-Wedding Photoshoot',
      description: 'Romantic pre-wedding photo session at scenic locations with professional editing.',
      price: 'LKR 25,000',
      badge: 'TRENDING',
      category: 'Photography',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop'
    },
  ],
  '2': [
    {
      id: '2-1',
      title: 'Live Band Performance',
      description: 'Professional live music band for your special day. 4-hour performance with 5-piece band including vocals, guitar, drums, keyboard, and bass.',
      price: 'LKR 55,000',
      originalPrice: 'LKR 70,000',
      badge: 'FEATURED',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=400&fit=crop'
    },
    {
      id: '2-2',
      title: 'DJ & Sound System',
      description: 'Premium sound system and experienced DJ to keep your guests entertained throughout the event.',
      price: 'LKR 35,000',
      originalPrice: 'LKR 45,000',
      badge: 'POPULAR',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=400&fit=crop'
    },
    {
      id: '2-3',
      title: 'Complete Entertainment Package',
      description: 'Live band + DJ combo for the ultimate entertainment experience. Includes lights and effects.',
      price: 'LKR 85,000',
      badge: 'PREMIUM',
      category: 'Entertainment',
      image: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=400&fit=crop'
    },
    {
      id: '2-4',
      title: 'Acoustic Session',
      description: 'Intimate acoustic performance for cocktail hour or ceremony. 2-hour performance.',
      price: 'LKR 30,000',
      badge: 'NEW',
      category: 'Music',
      image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=400&fit=crop'
    },
  ],
  '3': [
    {
      id: '3-1',
      title: 'Grand Decoration Package',
      description: 'Premium stage and hall decoration with floral arrangements, lighting, and custom backdrops to create a magical atmosphere.',
      price: 'LKR 85,000',
      originalPrice: 'LKR 100,000',
      badge: 'FEATURED',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=400&fit=crop'
    },
    {
      id: '3-2',
      title: 'Floral Design Package',
      description: 'Beautiful floral arrangements for ceremony, reception, and tables. Includes bridal bouquet and centerpieces.',
      price: 'LKR 65,000',
      originalPrice: 'LKR 80,000',
      badge: 'POPULAR',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=400&fit=crop'
    },
    {
      id: '3-3',
      title: 'Full Wedding Planning',
      description: 'Complete wedding planning service from concept to execution. Includes vendor coordination and day-of coordination.',
      price: 'LKR 150,000',
      badge: 'PREMIUM',
      category: 'Planning',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=400&fit=crop'
    },
    {
      id: '3-4',
      title: 'Lighting & Effects',
      description: 'Professional lighting setup with uplighting, fairy lights, and special effects to enhance your venue.',
      price: 'LKR 45,000',
      badge: 'TRENDING',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1613637819407-98ac477ba128?w=800&h=400&fit=crop'
    },
    {
      id: '3-5',
      title: 'Ceremony Decoration',
      description: 'Elegant ceremony setup with aisle decorations, arch, and seating arrangements.',
      price: 'LKR 55,000',
      badge: 'NEW',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c6f0?w=800&h=400&fit=crop'
    },
  ],
  '4': [
    {
      id: '4-1',
      title: 'Traditional Sri Lankan Buffet',
      description: 'Authentic Sri Lankan cuisine with rice, curries, and traditional dishes. Serves 100 guests.',
      price: 'LKR 150,000',
      badge: 'POPULAR',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=400&fit=crop'
    },
    {
      id: '4-2',
      title: 'International Buffet Package',
      description: 'Mixed international and local cuisine featuring Asian, Western, and fusion dishes.',
      price: 'LKR 200,000',
      badge: 'FEATURED',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop'
    },
    {
      id: '4-3',
      title: 'Premium Fine Dining',
      description: 'Multi-course plated dinner with gourmet dishes and professional waitstaff service.',
      price: 'LKR 350,000',
      badge: 'PREMIUM',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop'
    },
  ],
  '5': [
    {
      id: '5-1',
      title: 'Bridal Makeup Package',
      description: 'Complete bridal makeup with airbrush foundation, eye makeup, and professional styling.',
      price: 'LKR 18,000',
      badge: 'POPULAR',
      category: 'Makeup',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop'
    },
    {
      id: '5-2',
      title: 'Bridal Hair & Makeup',
      description: 'Full package including hairstyling, makeup, and saree draping with trial session.',
      price: 'LKR 28,000',
      badge: 'FEATURED',
      category: 'Makeup',
      image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&h=400&fit=crop'
    },
    {
      id: '5-3',
      title: 'Bridal Party Package',
      description: 'Makeup and hair for bride plus 5 bridesmaids. Includes trial for bride.',
      price: 'LKR 45,000',
      badge: 'BEST VALUE',
      category: 'Makeup',
      image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=400&fit=crop'
    },
  ],
  '6': [
    {
      id: '6-1',
      title: '3-Tier Wedding Cake',
      description: 'Elegant 3-tier cake with custom design and choice of flavors. Serves 150 guests.',
      price: 'LKR 35,000',
      badge: 'POPULAR',
      category: 'Wedding Cakes',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&h=400&fit=crop'
    },
    {
      id: '6-2',
      title: '5-Tier Grand Cake',
      description: 'Luxurious 5-tier masterpiece with intricate fondant work. Serves 250 guests.',
      price: 'LKR 65,000',
      badge: 'PREMIUM',
      category: 'Wedding Cakes',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=400&fit=crop'
    },
    {
      id: '6-3',
      title: 'Dessert Table Package',
      description: 'Wedding cake plus assorted desserts including cupcakes, macarons, and pastries.',
      price: 'LKR 85,000',
      badge: 'FEATURED',
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e5b027ab?w=800&h=400&fit=crop'
    },
  ],
  '7': [
    {
      id: '7-1',
      title: 'Grand Ballroom Package',
      description: 'Main ballroom rental for 500 guests with AC, lighting, and audio system.',
      price: 'LKR 400,000',
      badge: 'POPULAR',
      category: 'Venue',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29da8c6f0?w=800&h=400&fit=crop'
    },
    {
      id: '7-2',
      title: 'Garden Wedding Package',
      description: 'Outdoor garden venue with gazebo setup for 200 guests. Weather backup included.',
      price: 'LKR 350,000',
      badge: 'FEATURED',
      category: 'Venue',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=400&fit=crop'
    },
    {
      id: '7-3',
      title: 'Full Day Package',
      description: 'Venue access from morning to night with multiple spaces for ceremony and reception.',
      price: 'LKR 550,000',
      badge: 'PREMIUM',
      category: 'Venue',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&h=400&fit=crop'
    },
  ],
  '8': [
    {
      id: '8-1',
      title: 'Classic Invitation Package',
      description: 'Traditional design invitations with quality paper and printing. 200 cards.',
      price: 'LKR 30,000',
      badge: 'POPULAR',
      category: 'Invitations',
      image: 'https://images.unsplash.com/photo-1524824267900-2fa9cbf7a506?w=800&h=400&fit=crop'
    },
    {
      id: '8-2',
      title: 'Premium Custom Design',
      description: 'Bespoke invitation design with premium materials and embossing. 200 cards.',
      price: 'LKR 55,000',
      badge: 'FEATURED',
      category: 'Invitations',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=400&fit=crop'
    },
    {
      id: '8-3',
      title: 'Complete Stationery Package',
      description: 'Invitations, RSVP cards, thank you cards, and menu cards with matching design.',
      price: 'LKR 75,000',
      badge: 'BEST VALUE',
      category: 'Printing',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop'
    },
  ],
  '9': [
    {
      id: '9-1',
      title: 'Vintage Car Rental',
      description: 'Classic vintage car with chauffeur for bride and groom transportation.',
      price: 'LKR 45,000',
      badge: 'POPULAR',
      category: 'Transportation',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop'
    },
    {
      id: '9-2',
      title: 'Luxury Limousine',
      description: 'Stretch limousine with premium interior for bridal party transportation.',
      price: 'LKR 65,000',
      badge: 'FEATURED',
      category: 'Luxury Cars',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=400&fit=crop'
    },
    {
      id: '9-3',
      title: 'Full Day Package',
      description: 'Multiple luxury vehicles for entire day including pickup and drop-off services.',
      price: 'LKR 120,000',
      badge: 'PREMIUM',
      category: 'Transportation',
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=400&fit=crop'
    },
  ],
  '10': [
    {
      id: '10-1',
      title: 'Bridal Jewelry Set',
      description: 'Complete traditional jewelry set including necklace, earrings, and hair accessories. 3-day rental.',
      price: 'LKR 8,000',
      badge: 'POPULAR',
      category: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=400&fit=crop'
    },
    {
      id: '10-2',
      title: 'Premium Diamond Set',
      description: 'Luxury diamond jewelry set with matching accessories. Fully insured.',
      price: 'LKR 15,000',
      badge: 'FEATURED',
      category: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=400&fit=crop'
    },
    {
      id: '10-3',
      title: 'Antique Gold Collection',
      description: 'Traditional antique gold jewelry with intricate designs. Perfect for cultural weddings.',
      price: 'LKR 12,000',
      badge: 'TRENDING',
      category: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&h=400&fit=crop'
    },
  ],
  '11': [
    {
      id: '11-1',
      title: 'First Dance Choreography',
      description: 'Custom choreography for couple\'s first dance with 5 practice sessions.',
      price: 'LKR 20,000',
      badge: 'POPULAR',
      category: 'Choreography',
      image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=400&fit=crop'
    },
    {
      id: '11-2',
      title: 'Bridal Party Dance',
      description: 'Group choreography for bridal party performance with rehearsals.',
      price: 'LKR 35,000',
      badge: 'FEATURED',
      category: 'Choreography',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=400&fit=crop'
    },
    {
      id: '11-3',
      title: 'Complete Dance Package',
      description: 'First dance, parent dances, and group performance with unlimited practice.',
      price: 'LKR 55,000',
      badge: 'BEST VALUE',
      category: 'Dance Classes',
      image: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&h=400&fit=crop'
    },
  ],
  '12': [
    {
      id: '12-1',
      title: 'Bilingual MC Service',
      description: 'Professional hosting in English and Sinhala for full event duration.',
      price: 'LKR 28,000',
      badge: 'POPULAR',
      category: 'MC Services',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop'
    },
    {
      id: '12-2',
      title: 'Trilingual MC Service',
      description: 'Expert hosting in English, Sinhala, and Tamil with entertainment elements.',
      price: 'LKR 38,000',
      badge: 'FEATURED',
      category: 'MC Services',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop'
    },
    {
      id: '12-3',
      title: 'Premium Host Package',
      description: 'Celebrity MC with pre-event consultation and custom script preparation.',
      price: 'LKR 55,000',
      badge: 'PREMIUM',
      category: 'Hosting',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop'
    },
  ],
  '13': [
    {
      id: '13-1',
      title: 'Designer Bridal Gown',
      description: 'Custom-designed wedding gown with fittings and alterations included.',
      price: 'LKR 75,000',
      badge: 'FEATURED',
      category: 'Bridal Wear',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=400&fit=crop'
    },
    {
      id: '13-2',
      title: 'Traditional Saree Package',
      description: 'Premium bridal saree with matching jewelry and accessories. Includes draping service.',
      price: 'LKR 55,000',
      badge: 'POPULAR',
      category: 'Bridal Wear',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=400&fit=crop'
    },
    {
      id: '13-3',
      title: 'Complete Bridal Package',
      description: 'Wedding gown, going away dress, and traditional attire with full styling.',
      price: 'LKR 120,000',
      badge: 'PREMIUM',
      category: 'Bridal Wear',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop'
    },
    {
      id: '13-4',
      title: 'Groom\'s Suit Package',
      description: 'Custom tailored suit with shirt, tie, and accessories.',
      price: 'LKR 45,000',
      badge: 'NEW',
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=400&fit=crop'
    },
  ]
};

export const getVendor = (vendorId: string): VendorData | null => {
  return vendors[vendorId] || null;
};

export const getVendorPackages = (vendorId: string): PackageData[] => {
  return vendorPackages[vendorId] || [];
};
