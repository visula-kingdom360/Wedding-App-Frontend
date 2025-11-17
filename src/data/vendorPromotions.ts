import image_c1d83af9c7035a0ef80cf297ca7e88c41c8a5b9d from 'figma:asset/c1d83af9c7035a0ef80cf297ca7e88c41c8a5b9d.png';
import image_2597b521fcb0286e251848f5c0c65e149fcae80f from 'figma:asset/2597b521fcb0286e251848f5c0c65e149fcae80f.png';
import image_5bb2a673614c8819ec87ece6234725a642a72ef5 from 'figma:asset/5bb2a673614c8819ec87ece6234725a642a72ef5.png';
// Vendor promotions data - shared across home page and vendor detail screens
// Only vendors with active promotions will show promo banners

export interface VendorPromotion {
  id: string;
  vendorId: string;
  vendorName: string;
  title: string;
  description?: string; // Optional description for secondary promotions
  image: string;
  bgColor: string;
  isActive: boolean;
  type: 'main' | 'secondary'; // Type of promotion
}

export const vendorPromotions: VendorPromotion[] = [
  // Main Promotions (Carousel banners)
  {
    id: '1',
    vendorId: '1',
    vendorName: 'Great Photography',
    title: 'WEDDING\\nPHOTOGRAPHY\\n20% OFF',
    image: image_c1d83af9c7035a0ef80cf297ca7e88c41c8a5b9d,
    bgColor: 'from-[#0C3B2E]/70 to-[#0C3B2E]/50',
    isActive: true,
    type: 'main',
  },
  {
    id: '2',
    vendorId: '2',
    vendorName: 'Daddy Band',
    title: 'BOOK NOW\\nSAVE 15%\\nLIVE MUSIC',
    image: 'https://images.unsplash.com/photo-1677845100757-f4ff89b22df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwYmFuZCUyMG11c2ljfGVufDF8fHx8MTc2MjM3NjA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'from-[#B46617]/70 to-[#B46617]/50',
    isActive: true,
    type: 'main',
  },
  {
    id: '3',
    vendorId: '3',
    vendorName: 'Kulunu Weddings',
    title: 'EXCLUSIVE\\nDECOR\\nPACKAGES',
    image: image_5bb2a673614c8819ec87ece6234725a642a72ef5,
    bgColor: 'from-[#6D9773]/70 to-[#6D9773]/50',
    isActive: true,
    type: 'main',
  },
  
  // Secondary Promotions (Limited Time Offers section)
  {
    id: '4',
    vendorId: '4',
    vendorName: 'Royal Catering Services',
    title: 'Flash Sale - Catering Deals',
    description: 'Book our premium catering service and save 25% on packages over LKR 100,000',
    image: 'https://images.unsplash.com/photo-1624763149686-1893acf73092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50fGVufDF8fHx8MTc2MjM3NjA5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'from-[#FFD166] to-[#FFA940]',
    isActive: true,
    type: 'secondary',
  },
  {
    id: '5',
    vendorId: '5',
    vendorName: 'Glam Makeup Studio',
    title: 'Bridal Beauty Bonanza',
    description: 'Get 20% off on complete bridal makeup packages this season',
    image: 'https://images.unsplash.com/photo-1645862754489-bba248d67609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBicmlkYWwlMjBtYWtldXAlMjBjcmVhdGl2ZXxlbnwxfHx8fDE3NjIzNzYwODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'from-[#FFD166] to-[#FFA940]',
    isActive: true,
    type: 'secondary',
  },
  {
    id: '6',
    vendorId: '7',
    vendorName: 'The Grand Palace',
    title: 'Venue Special - Limited Slots',
    description: 'Reserve your dream venue now and enjoy 15% discount on weekend bookings',
    image: 'https://images.unsplash.com/photo-1761499101631-92cde2434bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwd2VkZGluZyUyMHZlbnVlJTIwbHV4dXJ5fGVufDF8fHx8MTc2MjM3NjA5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'from-[#FFD166] to-[#FFA940]',
    isActive: true,
    type: 'secondary',
  },
  {
    id: '7',
    vendorId: '9',
    vendorName: 'Luxury Ride Rentals',
    title: 'Premium Transport Offer',
    description: 'Book luxury wedding cars and save up to 18% on full-day rentals',
    image: 'https://images.unsplash.com/photo-1761671612738-2ac97bc59141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3ZWRkaW5nJTIwY2FyJTIwZWxlZ2FudHxlbnwxfHx8fDE3NjIzNzYwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'from-[#FFD166] to-[#FFA940]',
    isActive: true,
    type: 'secondary',
  },
  {
    id: '8',
    vendorId: '6',
    vendorName: 'Sweet Dreams Cakes',
    title: 'Wedding Cake Extravaganza',
    description: 'Order your custom wedding cake and get 22% off on 3-tier designs',
    image: 'https://images.unsplash.com/photo-1571616050325-2b2c1f55324c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGx1eHVyeSUyMHdlZGRpbmclMjBjYWtlfGVufDF8fHx8MTc2MjM3NjA5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    bgColor: 'from-[#FFD166] to-[#FFA940]',
    isActive: true,
    type: 'secondary',
  },
];

// Helper function to get promotions for a specific vendor
export const getVendorPromotions = (vendorId: string): VendorPromotion[] => {
  return vendorPromotions.filter(
    (promo) => promo.vendorId === vendorId && promo.isActive
  );
};

// Helper function to get all active promotions (for home page carousel)
export const getActivePromotions = (): VendorPromotion[] => {
  return vendorPromotions.filter((promo) => promo.isActive && promo.type === 'main');
};

// Helper function to get all active secondary promotions
export const getActiveSecondaryPromotions = (): VendorPromotion[] => {
  return vendorPromotions.filter((promo) => promo.isActive && promo.type === 'secondary');
};
