import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { PackageCard } from '../shared/PackageCard';
import { PackageDetailScreen } from './PackageDetailScreen';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Heart, 
  Phone, 
  MessageCircle, 
  Mail,
  Camera,
  User,
  ChevronDown,
  Share2,
  Tag,
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
  Package,
  Copy,
  Check
} from 'lucide-react';
import promoBanner from 'figma:asset/a8604063f048683b4cb156d44c348ad8093cd663.png';
import Slider from 'react-slick';
import { getVendorPromotions } from '../../data/vendorPromotions';
import { getVendor, getVendorPackages } from '../../data/vendors';
import { getVendorReviews } from '../../data/vendorReviews';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface VendorDetailScreenProps {
  user: User | null;
  onBack: () => void;
  vendorId?: string;
  initialPackageId?: string;
  initialPromotionId?: string;
  userEvents?: any[];
  onAddVendorToEvent?: (eventId: string, vendorId: string, category: string) => void;
}

export function VendorDetailScreen({ user, onBack, vendorId, initialPackageId, initialPromotionId, userEvents = [], onAddVendorToEvent }: VendorDetailScreenProps) {
  const [showPackages, setShowPackages] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'none' | 'price-low' | 'price-high'>('none');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [showReviewsDialog, setShowReviewsDialog] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [shareOpen, setShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showAddToEventDialog, setShowAddToEventDialog] = useState(false);
  const [selectedEventForVendor, setSelectedEventForVendor] = useState<string>('');
  const [selectedCategoryForVendor, setSelectedCategoryForVendor] = useState<string>('');
  
  // Ref for scrolling to promotion section
  const promoSectionRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Auto-open package if initialPackageId is provided
  useEffect(() => {
    if (initialPackageId) {
      const packageToOpen = packages.find(pkg => pkg.id === initialPackageId);
      if (packageToOpen) {
        setSelectedPackage(packageToOpen);
      }
    }
  }, [initialPackageId]);

  // Scroll to promotion section if initialPromotionId is provided
  useEffect(() => {
    if (initialPromotionId && promoSectionRef.current) {
      // Delay scroll to ensure content is rendered
      setTimeout(() => {
        promoSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    }
  }, [initialPromotionId]);

  // Lock body scroll when dialogs are open
  useEffect(() => {
    if (showReviewsDialog || showRatingDialog) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [showReviewsDialog, showRatingDialog]);

  // Get vendor data based on vendorId prop, default to vendor '1' if not provided
  const currentVendorId = vendorId || '1';
  const vendorData = getVendor(currentVendorId);
  
  // Fallback vendor if vendor not found
  const vendor = vendorData || {
    id: '1',
    name: 'Great Photography',
    description: 'Capture every special moment with professional photographers who bring your events to life.',
    rating: 4.6,
    price: 'Starting from LKR 20,000',
    location: 'Boralla, Jambugasmulla Junction, Colombo 08',
    image: 'https://images.unsplash.com/photo-1735052709798-2abcc8c0d6e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwaG90b2dyYXBoZXIlMjB3ZWRkaW5nfGVufDF8fHx8MTc2MTU4NTE4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    logo: 'https://images.unsplash.com/photo-1699562862446-4407feedab84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoZXIlMjBjYW1lcmElMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjE5NzY5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    featured: true,
    followers: '45.2K',
    followersGrowth: '+12.5%',
    completedBusinesses: 342,
    businessGrowth: '+8.3%',
    categories: [
      { name: 'Photography', icon: Camera, color: 'bg-purple-300' }
    ],
    socials: [
      { name: 'Instagram', icon: Instagram, color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
      { name: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
      { name: 'Message', icon: MessageCircle, color: 'bg-green-500' }
    ]
  };

  // Get vendor-specific promotions
  const vendorPromotions = getVendorPromotions(vendor.id);

  // Find the initial slide index based on promotionId
  const initialSlideIndex = initialPromotionId 
    ? vendorPromotions.findIndex(promo => promo.id === initialPromotionId)
    : 0;
  
  // Use the found index, or default to 0 if not found
  const startSlide = initialSlideIndex >= 0 ? initialSlideIndex : 0;

  // Slider settings for promo carousel
  const promoSettings = {
    dots: true,
    infinite: vendorPromotions.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: vendorPromotions.length > 1,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    initialSlide: startSlide,
    dotsClass: 'slick-dots !bottom-3',
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-all" />
    ),
  };

  // Mock reviews data
  const reviews = [
    { id: 1, name: 'Sarah Johnson', rating: 5, date: '2 weeks ago', comment: 'Absolutely amazing service! The photographer captured every beautiful moment of our wedding. Highly recommend!' },
    { id: 2, name: 'Michael Chen', rating: 5, date: '1 month ago', comment: 'Professional and talented team. The photos turned out stunning and exceeded our expectations.' },
    { id: 3, name: 'Emily Rodriguez', rating: 4, date: '1 month ago', comment: 'Great experience overall. Very responsive and accommodating to our special requests.' },
    { id: 4, name: 'David Kumar', rating: 5, date: '2 months ago', comment: 'The best decision we made for our wedding! Beautiful work and great to work with.' },
    { id: 5, name: 'Jessica Williams', rating: 4, date: '2 months ago', comment: 'Wonderful photography and excellent customer service. Would definitely recommend to friends.' },
    { id: 6, name: 'James Anderson', rating: 5, date: '3 months ago', comment: 'Outstanding quality and professionalism. The photos are absolutely perfect!' },
    { id: 7, name: 'Maria Garcia', rating: 5, date: '3 months ago', comment: 'Incredible attention to detail. Every shot was perfect and the team was so friendly.' },
    { id: 8, name: 'Robert Taylor', rating: 4, date: '4 months ago', comment: 'Very satisfied with the service. The team was professional and delivered high-quality work.' },
    { id: 9, name: 'Linda Martinez', rating: 5, date: '4 months ago', comment: 'These photographers are true artists! They made our special day even more memorable.' },
    { id: 10, name: 'Christopher Lee', rating: 5, date: '5 months ago', comment: 'Exceptional service from start to finish. Couldn\'t be happier with the results!' }
  ];

  // Get packages for this vendor
  const packages = getVendorPackages(vendor.id);

  // Filter packages based on selected category
  let filteredPackages = selectedCategory === 'All' 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  // Sort packages based on price
  if (sortBy === 'price-low') {
    filteredPackages = [...filteredPackages].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      return priceA - priceB;
    });
  } else if (sortBy === 'price-high') {
    filteredPackages = [...filteredPackages].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
      return priceB - priceA;
    });
  }

  // Share functionality
  const vendorUrl = `https://eventcore.app/vendors/${currentVendorId}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(vendorUrl);
      setLinkCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: string) => {
    const text = `Check out ${vendor.name} on EventCore!`;
    const encodedUrl = encodeURIComponent(vendorUrl);
    const encodedText = encodeURIComponent(text);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
      setShareOpen(false);
    }
  };

  // If a package is selected, show the package detail screen
  if (selectedPackage) {
    return (
      <PackageDetailScreen 
        package={selectedPackage}
        vendor={{
          id: vendor.id,
          name: vendor.name,
          rating: vendor.rating,
          location: vendor.location,
          image: vendor.image
        }}
        onBack={() => setSelectedPackage(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="relative">
        {/* Vendor Hero Image */}
        <div className="relative bg-[#E5E5E5] h-[36vh]">
          <img 
            src={vendor.image} 
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
          
          {/* Featured Badge - Centered between icons */}
          {vendor.featured && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <div className="bg-[#FFBA00] text-[#1a1a1a] px-6 py-1.5 font-semibold text-sm tracking-wide shadow-lg">
                  FEATURED
                </div>
                <div className="absolute -bottom-1.5 left-0 w-0 h-0 border-l-[8px] border-l-transparent border-t-[6px] border-t-[#c79500]"></div>
                <div className="absolute -bottom-1.5 right-0 w-0 h-0 border-r-[8px] border-r-transparent border-t-[6px] border-t-[#c79500]"></div>
              </div>
            </div>
          )}
          
          {/* Back and Share Buttons - Overlaid on Image */}
          <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-30">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-[#0C3B2E]/40 backdrop-blur-md hover:bg-[#0C3B2E]/60 border border-white/30"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </Button>
            <Popover open={shareOpen} onOpenChange={setShareOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-10 h-10 rounded-full bg-[#0C3B2E]/40 backdrop-blur-md hover:bg-[#0C3B2E]/60 border border-white/30"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" align="end">
                <div className="space-y-2">
                  <p className="text-sm mb-3">Share this vendor</p>
                  
                  {/* Social media options */}
                  <button
                    onClick={() => handleShare('facebook')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <Facebook className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">Share on Facebook</span>
                  </button>

                  <button
                    onClick={() => handleShare('twitter')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                      <Twitter className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">Share on Twitter</span>
                  </button>

                  <button
                    onClick={() => handleShare('whatsapp')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => handleShare('linkedin')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center flex-shrink-0">
                      <Linkedin className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">Share on LinkedIn</span>
                  </button>

                  <button
                    onClick={() => handleShare('email')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm">Share via Email</span>
                  </button>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>

                  {/* Copy link */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0C3B2E] flex items-center justify-center flex-shrink-0">
                      {linkCopied ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-sm">{linkCopied ? 'Link copied!' : 'Copy link'}</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Avatar - Positioned Higher in Image Area */}
        <div className="absolute left-4 top-[calc(36vh-64px)] z-20">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
            <ImageWithFallback
              src={vendor.logo}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Vendor Details Card */}
        <div className="bg-white px-5 pt-4 pb-5 rounded-t-3xl -mt-6 relative z-10">
          {/* Rating Section and Icon Layout */}
          <div className="flex items-start justify-between gap-3 mb-6">
            {/* Left Side: Avatar Spacer + Rating */}
            <div className="flex items-start gap-3">
              {/* Spacer for avatar */}
              <div className="w-28 flex-shrink-0"></div>
              
              {/* Rating Container */}
              <div className="flex flex-col gap-0.5">
                {/* Stars and Rating Number */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className="w-5 h-5 fill-[#FFBA00] text-[#FFBA00]" 
                    />
                  ))}
                  <span className="ml-1.5 text-lg">{vendor.rating}</span>
                </div>
                
                {/* Review Count */}
                <button 
                  onClick={() => setShowReviewsDialog(true)}
                  className="text-sm text-gray-500 hover:text-[#0C3B2E] transition-colors cursor-pointer"
                >
                  (120 Reviews)
                </button>
              </div>
            </div>

            {/* Right Side: Review Icon Button */}
            <Button 
              variant="outline"
              size="icon"
              onClick={() => setShowRatingDialog(true)}
              className="w-9 h-9 rounded-full border-2 border-gray-300 hover:bg-gray-50 flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-gray-600" />
            </Button>
          </div>

          {/* Merchant Name */}
          <h2 className="text-2xl text-[#1a1a1a] mb-2 font-semibold">{vendor.name}</h2>

          {/* Description - Limited to 3 lines */}
          <p className="text-sm text-[#1a1a1a] leading-relaxed mb-4 line-clamp-3">
            {vendor.description}
          </p>

          {/* Price - Creative Badge Style */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-[#567568] px-4 py-2.5 rounded-full">
              <Tag className="w-4 h-4 text-white" />
              <span className="text-sm text-white">
                Starting From <span className="font-semibold text-white">LKR 20,000+</span>
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start space-x-2 mb-4">
            <MapPin className="w-4 h-4 text-[#1a1a1a] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#1a1a1a]">{vendor.location}</p>
          </div>

          {/* Add to Event and Contact Actions */}
          <div className="flex items-center gap-3 pt-2">
            {/* Add to Event Button */}
            <Button 
              className="flex-1 bg-[#FF4757] hover:bg-[#FF3344] text-white rounded-full h-12 flex items-center justify-center space-x-2"
              disabled={!user}
              onClick={() => {
                if (user && userEvents.length > 0) {
                  setShowAddToEventDialog(true);
                } else if (user && userEvents.length === 0) {
                  toast('No events found', {
                    description: 'Please create an event first to add vendors.',
                    className: 'bg-white border-[#6D9773]',
                    style: { color: '#0C3B2E' }
                  });
                }
              }}
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Add to Event</span>
            </Button>

            {/* Contact Actions */}
            <Button 
              variant="outline" 
              size="icon"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-50"
            >
              <Phone className="w-5 h-5 text-[#1a1a1a]" />
            </Button>
            <Button 
              size="icon"
              className="w-12 h-12 rounded-full bg-[#567568] hover:bg-[#567568]/90 border-0"
            >
              <MessageCircle className="w-5 h-5 text-white" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="w-12 h-12 rounded-full border-2 border-gray-300 hover:bg-gray-50"
            >
              <Mail className="w-5 h-5 text-[#1a1a1a]" />
            </Button>
          </div>
        </div>

      {/* Stats Card */}
      <div className="mt-4">
        <div className="mx-3.5 bg-gradient-to-br from-[#0C3B2E] via-[#1a5540] to-[#6D9773] rounded-3xl shadow-xl px-5 py-5 relative overflow-hidden">
          {/* Decorative celebration icon */}
          <div className="absolute top-2 right-2 opacity-20">
            <PartyPopper className="w-16 h-16 text-white transform rotate-12" strokeWidth={1.5} />
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute top-4 right-12">
            <Sparkles className="w-3 h-3 text-[#FFBA00] animate-pulse" />
          </div>
          <div className="absolute top-8 right-6">
            <Sparkles className="w-2 h-2 text-[#FFBA00] animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
          
          <div className="relative z-10">
            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Total Followers */}
              <div className="flex flex-col gap-2">
                <p className="text-white text-xs">Total Followers</p>
                <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm px-3 py-2 rounded-2xl border border-white/20">
                  <div className="flex items-center justify-center gap-1.5">
                    <Users className="w-4 h-4 text-[#FFBA00]" />
                    <span className="text-xl text-white">{vendor.followers}</span>
                  </div>
                </div>
              </div>
              
              {/* Completed Businesses */}
              <div className="flex flex-col gap-2">
                <p className="text-white text-xs">Total Bookings</p>
                <div className="bg-gradient-to-br from-white/25 to-white/10 backdrop-blur-sm px-3 py-2 rounded-2xl border border-white/20">
                  <div className="flex items-center justify-center gap-1.5">
                    <span className="text-xl text-white">{vendor.completedBusinesses}+</span>
                    <Briefcase className="w-4 h-4 text-[#FFBA00]" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Icons - Scrollable to edge */}
            <div className="border-t border-white/20 pt-3 -mx-4 px-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {vendor.socials.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <button
                      key={index}
                      className={`group relative w-12 h-12 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white/25 flex-shrink-0 border border-white/20`}
                    >
                      <IconComponent className="w-5 h-5 text-white relative z-10" strokeWidth={2} />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Banner - Only show if vendor has active promotions */}
      {vendorPromotions.length > 0 && (
        <div ref={promoSectionRef} className="px-5 mt-4">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes boxOpen {
              0%, 20% { transform: scale(1) rotateX(0deg); }
              30% { transform: scale(1.05) rotateX(-10deg); }
              40% { transform: scale(1) rotateX(0deg); }
              100% { transform: scale(1) rotateX(0deg); }
            }
            @keyframes celebrate {
              0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 0; }
              20% { opacity: 1; }
              100% { transform: var(--celebration-end) scale(1.5) rotate(360deg); opacity: 0; }
            }
            .vendor-box-animation { animation: boxOpen 3s ease-in-out infinite; }
            .vendor-celebration { animation: celebrate 2s ease-out infinite; }
          ` }} />
          <Slider {...promoSettings}>
            {vendorPromotions.map((promo) => (
              <div key={promo.id} className="outline-none">
                {promo.type === 'main' ? (
                  // Image-based promotion (matches home page first promotion)
                  <div className="relative h-[180px] rounded-[20px] overflow-hidden">
                    <img
                      src={promo.image}
                      alt={promo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // Animated gradient promotion (matches home page secondary promotion)
                  <div className="bg-gradient-to-br from-[#FFD166] to-[#FFA940] rounded-[20px] p-5 relative overflow-visible h-[180px] flex flex-col">
                    <div className="absolute bottom-4 right-4 opacity-20 vendor-box-animation">
                      <Package
                        className="w-20 h-20 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    {/* Celebration sparkles */}
                    <div className="absolute bottom-14 right-14 vendor-celebration" style={{ '--celebration-end': 'translate(-40px, -60px)', animationDelay: '1s' } as React.CSSProperties}>
                      <Sparkles className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-14 right-14 vendor-celebration" style={{ '--celebration-end': 'translate(40px, -60px)', animationDelay: '1.1s' } as React.CSSProperties}>
                      <Sparkles className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-14 right-14 vendor-celebration" style={{ '--celebration-end': 'translate(0px, -70px)', animationDelay: '1.2s' } as React.CSSProperties}>
                      <Sparkles className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-14 right-14 vendor-celebration" style={{ '--celebration-end': 'translate(-60px, -30px)', animationDelay: '1.15s' } as React.CSSProperties}>
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-14 right-14 vendor-celebration" style={{ '--celebration-end': 'translate(60px, -30px)', animationDelay: '1.25s' } as React.CSSProperties}>
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-6 h-6 text-white fill-white animate-pulse flex-shrink-0" style={{ animationDuration: '1.5s' }} />
                        <h3
                          className="text-white whitespace-nowrap overflow-hidden text-ellipsis"
                          style={{
                            fontSize: "22px",
                            fontWeight: 700,
                          }}
                        >
                          {promo.title}
                        </h3>
                      </div>
                      <p
                        className="text-white mb-3 leading-relaxed flex-1 line-clamp-2"
                        style={{ fontSize: "15px", fontWeight: 400 }}
                      >
                        {promo.description}
                      </p>
                      <div>
                        <Button
                          className="bg-white/90 backdrop-blur-md hover:bg-white text-[#1a1a1a] rounded-xl px-6 py-2 shadow-md border border-white/50 hover:scale-105 transition-transform"
                          style={{ fontSize: "14px", fontWeight: 600 }}
                        >
                          View Offer
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Available Categories */}
      <div className="px-5 py-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#1a1a1a]">Find your perfect match</h3>
          <div className="relative">
            <button 
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <span>Sorting</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>
            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => {
                    setSortBy('none');
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'none' ? 'text-[#0C3B2E]' : 'text-gray-700'}`}
                >
                  Default
                </button>
                <button
                  onClick={() => {
                    setSortBy('price-low');
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'price-low' ? 'text-[#0C3B2E]' : 'text-gray-700'}`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => {
                    setSortBy('price-high');
                    setShowSortMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${sortBy === 'price-high' ? 'text-[#0C3B2E]' : 'text-gray-700'}`}
                >
                  Price: High to Low
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {/* All Categories Option */}
          <button
            onClick={() => setSelectedCategory('All')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0 transition-all duration-200 ${
              selectedCategory === 'All'
                ? 'bg-[#0C3B2E] text-white shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {selectedCategory === 'All' ? (
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20">
                <Tag className="w-4 h-4 text-white" />
              </div>
            ) : (
              <Tag className="w-5 h-5 text-gray-600 flex-shrink-0" />
            )}
            <span className="text-sm">
              All
            </span>
          </button>
          
          {/* Individual Categories */}
          {vendor.categories.map((category, index) => {
            const IconComponent = category.icon;
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0 transition-all duration-200 ${
                  isSelected 
                    ? 'bg-[#0C3B2E] text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-white/20">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <IconComponent className="w-5 h-5 text-gray-600 flex-shrink-0" />
                )}
                <span className="text-sm">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Packages Section */}
      <div className="px-5 py-4 mt-0">
        {filteredPackages.length > 0 ? (
          <div className="space-y-3">
            {filteredPackages.map((pkg, index) => (
              <div 
                key={pkg.id} 
                onClick={() => setSelectedPackage(pkg)}
                className="bg-white rounded-2xl border border-gray-300 overflow-hidden hover:shadow-lg transition-all cursor-pointer shadow-sm relative"
              >
                {/* Featured Ribbon Badge */}
                {pkg.badge === 'FEATURED' && (
                  <div className="absolute top-3 left-0 z-10">
                    <div className="bg-[#FFBA00] text-[#1a1a1a] px-2.5 py-1 text-[10px] font-semibold shadow-md relative">
                      FEATURED
                      {/* Triangular fold on right side */}
                      <div className="absolute right-0 top-full w-0 h-0 border-t-[6px] border-t-[#c79500] border-r-[6px] border-r-transparent"></div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-stretch h-[120px]">
                  {/* Package Image - Full Height Left */}
                  <div className="w-28 flex-shrink-0">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Package Details */}
                  <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-[#1a1a1a] mb-1 leading-tight line-clamp-1">
                          {pkg.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {pkg.category} Package
                        </p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-400 -rotate-90 flex-shrink-0 mt-1" />
                    </div>
                    
                    <div className="flex flex-col justify-end min-h-[42px]">
                      {pkg.originalPrice ? (
                        <p className="text-xs text-gray-400 line-through leading-tight mb-0.5">
                          {pkg.originalPrice}
                        </p>
                      ) : (
                        <div className="h-[16px]"></div>
                      )}
                      <p className="text-2xl font-bold text-[#0C3B2E] leading-tight">{pkg.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No packages available for this category.</p>
          </div>
        )}
      </div>

      {/* Rating Dialog */}
      <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
        <DialogContent className="max-w-[380px] rounded-3xl p-6 border-0">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-center">Rate {vendor.name}</DialogTitle>
            <DialogDescription className="text-center text-xs">
              Share your experience with this vendor
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-5 py-2">
            {/* Star Rating */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs text-gray-600">How would you rate this vendor?</p>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star 
                      className={`w-7 h-7 transition-colors ${
                        star <= (hoverRating || userRating)
                          ? 'fill-[#FFBA00] text-[#FFBA00]'
                          : 'fill-none text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {userRating > 0 && (
                <p className="text-sm font-medium text-[#0C3B2E]">
                  {userRating === 1 && 'Poor'}
                  {userRating === 2 && 'Fair'}
                  {userRating === 3 && 'Good'}
                  {userRating === 4 && 'Very Good'}
                  {userRating === 5 && 'Excellent'}
                </p>
              )}
            </div>

            {/* Review Text */}
            <div className="space-y-1.5">
              <label htmlFor="review" className="text-xs font-medium text-gray-700">
                Write your review (optional)
              </label>
              <Textarea
                id="review"
                placeholder="Tell us about your experience with this vendor..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="min-h-[100px] resize-none text-sm rounded-xl"
                maxLength={500}
              />
              <p className="text-xs text-gray-500">
                {reviewText.length}/500 characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-2.5 pt-1">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRatingDialog(false);
                  setUserRating(0);
                  setReviewText('');
                  setHoverRating(0);
                }}
                className="flex-1 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle submit logic here
                  console.log('Rating:', userRating, 'Review:', reviewText);
                  toast.success('Review submitted successfully!', {
                    description: 'Thank you for sharing your experience.',
                  });
                  setShowRatingDialog(false);
                  setUserRating(0);
                  setReviewText('');
                  setHoverRating(0);
                }}
                disabled={userRating === 0}
                className="flex-1 bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-xl"
              >
                Submit Review
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reviews List Dialog */}
      <Dialog open={showReviewsDialog} onOpenChange={setShowReviewsDialog}>
        <DialogContent className="max-w-[380px] max-h-[75vh] rounded-3xl p-0 overflow-hidden border-0 shadow-2xl bg-white">
          <DialogHeader className="px-5 pt-5 pb-3 border-b border-gray-200">
            <DialogTitle>Customer Reviews</DialogTitle>
            <DialogDescription className="text-xs">
              {reviews.length} reviews for {vendor.name}
            </DialogDescription>
          </DialogHeader>
          
          {/* Overall Rating Summary */}
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-semibold text-[#0C3B2E]">{vendor.rating}</span>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className="w-3.5 h-3.5 fill-[#FFBA00] text-[#FFBA00]" 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 mt-0.5">120 reviews</span>
              </div>
              
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = rating === 5 ? 85 : rating === 4 ? 28 : rating === 3 ? 5 : rating === 2 ? 2 : 0;
                  const percentage = (count / 120) * 100;
                  return (
                    <div key={rating} className="flex items-center gap-1.5 text-[10px]">
                      <span className="w-2 text-gray-600">{rating}</span>
                      <Star className="w-2.5 h-2.5 fill-[#FFBA00] text-[#FFBA00]" />
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FFBA00] rounded-full" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-gray-500 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="overflow-y-auto max-h-[40vh] px-5 py-3 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="space-y-3">
              {reviews.map((review) => (
                <div key={review.id} className="pb-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#6D9773] flex items-center justify-center text-white text-xs">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-xs">{review.name}</p>
                        <p className="text-[10px] text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star}
                          className={`w-3 h-3 ${
                            star <= review.rating 
                              ? 'fill-[#FFBA00] text-[#FFBA00]' 
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed ml-10">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
            <Button
              onClick={() => {
                setShowReviewsDialog(false);
                setShowRatingDialog(true);
              }}
              className="w-full bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-xl h-9"
            >
              Add Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add to Event Dialog */}
      <Dialog open={showAddToEventDialog} onOpenChange={setShowAddToEventDialog}>
        <DialogContent className="max-w-[380px] rounded-3xl p-0 overflow-hidden border-0 shadow-2xl bg-white">
          <DialogHeader className="px-5 pt-5 pb-3 border-b border-gray-200">
            <DialogTitle>Add to Event</DialogTitle>
            <DialogDescription className="text-xs">
              Select an event and category for {vendor.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-5 space-y-4">
            {/* Event Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0C3B2E]">Select Event</label>
              <select
                value={selectedEventForVendor}
                onChange={(e) => {
                  setSelectedEventForVendor(e.target.value);
                  setSelectedCategoryForVendor(''); // Reset category when event changes
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6D9773] bg-white text-sm"
              >
                <option value="">Choose an event...</option>
                {userEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.name} - {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selection - Only show if vendor has multiple categories */}
            {selectedEventForVendor && vendor.categories.length > 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0C3B2E]">Select Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {vendor.categories.map((cat) => {
                    const IconComponent = cat.icon;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => setSelectedCategoryForVendor(cat.name)}
                        className={`flex items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                          selectedCategoryForVendor === cat.name
                            ? 'border-[#0C3B2E] bg-[#0C3B2E]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${cat.color}`}>
                          <IconComponent className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-medium">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Auto-selected category message if vendor has only one category */}
            {selectedEventForVendor && vendor.categories.length === 1 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#6D9773]/10 border border-[#6D9773]/20">
                <div className={`p-1.5 rounded-lg ${vendor.categories[0].color}`}>
                  {(() => {
                    const IconComponent = vendor.categories[0].icon;
                    return <IconComponent className="w-4 h-4 text-white" />;
                  })()}
                </div>
                <span className="text-xs text-[#0C3B2E]">
                  Will be added to <span className="font-semibold">{vendor.categories[0].name}</span>
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddToEventDialog(false);
                  setSelectedEventForVendor('');
                  setSelectedCategoryForVendor('');
                }}
                className="flex-1 rounded-xl border-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const categoryToAdd = vendor.categories.length === 1 
                    ? vendor.categories[0].name 
                    : selectedCategoryForVendor;

                  if (selectedEventForVendor && categoryToAdd) {
                    if (onAddVendorToEvent) {
                      onAddVendorToEvent(selectedEventForVendor, vendor.id, categoryToAdd);
                    }
                    
                    const selectedEvent = userEvents.find(e => e.id === selectedEventForVendor);
                    toast('Vendor Added!', {
                      description: `${vendor.name} added to ${selectedEvent?.name} under ${categoryToAdd}`,
                      className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                      style: { color: '#0C3B2E' }
                    });
                    
                    setShowAddToEventDialog(false);
                    setSelectedEventForVendor('');
                    setSelectedCategoryForVendor('');
                  }
                }}
                disabled={
                  !selectedEventForVendor || 
                  (vendor.categories.length > 1 && !selectedCategoryForVendor)
                }
                className="flex-1 bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-xl disabled:opacity-50"
              >
                Add Vendor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}