import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Check,
  Share2,
  Calendar,
  Clock,
  Headphones,
  CreditCard,
  Phone,
  Mail,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react';

interface Package {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  badge?: string;
  category: string;
  image: string;
}

interface Vendor {
  id: string;
  name: string;
  rating: number;
  location: string;
  image: string;
}

interface PackageDetailScreenProps {
  package: Package;
  vendor: Vendor;
  onBack: () => void;
}

export function PackageDetailScreen({ package: pkg, vendor, onBack }: PackageDetailScreenProps) {
  const [shareOpen, setShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Share functionality
  const packageUrl = `https://eventcore.app/vendors/${vendor.id}/packages/${pkg.id}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(packageUrl);
      setLinkCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleShare = (platform: string) => {
    const text = `Check out ${pkg.title} from ${vendor.name} on EventCore!`;
    const encodedUrl = encodeURIComponent(packageUrl);
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

  const features = [
    'Professional service with experienced team',
    'High-quality equipment and materials',
    'Customizable options to fit your needs',
    'On-time delivery guaranteed',
    'Full customer support before and after',
    'Flexible scheduling options',
    'Insurance coverage included',
    'Additional consultation sessions'
  ];

  const suggestedPackages = [
    {
      id: '2',
      title: 'Deluxe Floral Decoration Package',
      description: 'Complete floral decoration for your special day',
      price: 'LKR 45,000',
      originalPrice: 'LKR 60,000',
      badge: 'POPULAR',
      category: 'Decoration',
      image: 'https://images.unsplash.com/photo-1684243920725-956d93ff391a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYxNjAyMDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      title: 'Premium Venue Package',
      description: 'Elegant venue with complete setup',
      price: 'LKR 85,000',
      category: 'Venue',
      image: 'https://images.unsplash.com/photo-1674924258890-f4a5d99bb28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBlbGVnYW50fGVufDF8fHx8MTc2MTU2Njg3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      title: 'Luxury Catering Service',
      description: 'Full service catering with premium menu',
      price: 'LKR 120,000',
      originalPrice: 'LKR 150,000',
      badge: 'NEW',
      category: 'Catering',
      image: 'https://images.unsplash.com/photo-1733479189782-0d7d1283d019?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBmb29kfGVufDF8fHx8MTc2MTYwMjA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const hasDiscount = pkg.originalPrice && pkg.originalPrice !== pkg.price;
  const discountPercentage = hasDiscount 
    ? Math.round((1 - parseInt(pkg.price.replace(/[^0-9]/g, '')) / parseInt(pkg.originalPrice!.replace(/[^0-9]/g, ''))) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="relative">
        {/* Package Hero Image */}
        <div className="relative bg-[#E5E5E5] h-[36vh]">
          <img 
            src={pkg.image} 
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          
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
                  <p className="text-sm mb-3">Share this package</p>
                  
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

          {/* Featured Badge (if applicable) */}
          {pkg.badge === 'FEATURED' && (
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
        </div>

        {/* Main Content - Curved top */}
        <div className="bg-white px-5 pt-6 pb-5 rounded-t-3xl -mt-6 relative z-10">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block bg-[#E8F4F1] text-[#0C3B2E] px-3 py-1 rounded-full text-sm font-medium">
              {pkg.category}
            </span>
          </div>

          {/* Package Title */}
          <h1 className="text-2xl text-[#1a1a1a] mb-3 font-semibold">{pkg.title}</h1>

          {/* Price Section */}
          <div className="mb-4">
            {hasDiscount ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-[#0C3B2E] font-semibold">{pkg.price}</span>
                  <span className="text-base text-gray-400 line-through">{pkg.originalPrice}</span>
                </div>
                <div className="bg-[#FFBA00] text-[#1a1a1a] px-2.5 py-1 rounded-full text-sm font-semibold">
                  {discountPercentage}% OFF
                </div>
              </div>
            ) : (
              <span className="text-2xl text-[#0C3B2E] font-semibold">{pkg.price}</span>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a1a1a] mb-2">About this package</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a1a1a] mb-3">What's Included</h3>
            <div className="space-y-2.5">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E8F4F1] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#0C3B2E]" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Details Grid */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a1a1a] mb-3">Package Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-[#6D9773]" />
                  <span className="text-xs text-gray-500">Coverage Period</span>
                </div>
                <p className="text-sm font-semibold text-[#1a1a1a]">4 Hours</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Headphones className="w-4 h-4 text-[#6D9773]" />
                  <span className="text-xs text-gray-500">Customer Support</span>
                </div>
                <p className="text-sm font-semibold text-[#1a1a1a]">24/7</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-[#6D9773]" />
                  <span className="text-xs text-gray-500">Booking Notice</span>
                </div>
                <p className="text-sm font-semibold text-[#1a1a1a]">2 Weeks Advance</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <CreditCard className="w-4 h-4 text-[#6D9773]" />
                  <span className="text-xs text-gray-500">Payment Terms</span>
                </div>
                <p className="text-sm font-semibold text-[#1a1a1a]">50% Advance / 50% After</p>
              </div>
            </div>
          </div>

          {/* Vendor Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a1a1a] mb-3">Provided By</h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#1a1a1a]">{vendor.name}</h4>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-[#FFBA00] text-[#FFBA00]" />
                    <span className="text-sm text-gray-600">{vendor.rating}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">120 Reviews</span>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-[#FFBA00] hover:text-[#1a1a1a] hover:border-[#FFBA00]"
                >
                  View Profile
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{vendor.location}</span>
              </div>
            </div>
          </div>

          {/* Add to Event and Contact Actions */}
          <div className="flex items-center gap-3 pt-2 mb-6">
            {/* Add to Event Button */}
            <Button 
              className="flex-1 bg-[#FF4757] hover:bg-[#FF3344] text-white rounded-full h-12 flex items-center justify-center space-x-2"
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

          {/* Suggested Packages */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#1a1a1a] mb-3">More from {vendor.name}</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {suggestedPackages.map((suggestedPkg) => (
                <div 
                  key={suggestedPkg.id}
                  className="bg-white rounded-2xl border border-gray-300 overflow-hidden hover:shadow-lg transition-all cursor-pointer shadow-sm flex-shrink-0 w-[280px]"
                >
                  {/* Package Image */}
                  <div className="relative h-[140px] bg-gray-100">
                    <img 
                      src={suggestedPkg.image} 
                      alt={suggestedPkg.title}
                      className="w-full h-full object-cover"
                    />
                    {suggestedPkg.badge && (
                      <div className="absolute top-3 left-0">
                        <div className="bg-[#FFBA00] text-white px-3 py-1 text-xs font-semibold shadow-md relative">
                          {suggestedPkg.badge}
                          <div className="absolute right-0 top-full w-0 h-0 border-t-[6px] border-t-[#c79500] border-r-[6px] border-r-transparent"></div>
                        </div>
                      </div>
                    )}
                    {/* Price Badge - Top Right Corner */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-lg">
                        {suggestedPkg.originalPrice && (
                          <p className="text-[10px] text-gray-400 line-through leading-tight">
                            {suggestedPkg.originalPrice}
                          </p>
                        )}
                        <p className="text-sm font-bold text-[#0C3B2E] leading-tight">{suggestedPkg.price}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Package Details */}
                  <div className="p-3.5">
                    <p className="text-xs text-gray-500 mb-1">{suggestedPkg.category} Package</p>
                    <h3 className="font-bold text-[#1a1a1a] mb-2 leading-tight line-clamp-2">
                      {suggestedPkg.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
