import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { VendorCard } from '../shared/VendorCard';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Gift, 
  Camera, 
  Calendar,
  MapPin,
  ChevronRight,
  Search,
  User,
  Store,
  Package,
  CheckCircle,
  AlertCircle,
  Shield,
  Star,
  Bell,
  Sparkles,
  Tag
} from 'lucide-react';
import { vendors } from '../../data/vendors';
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface NotificationsProps {
  user: User | null;
  onVendorSelect?: (vendorId: string) => void;
  onNavigate?: (screen: string) => void;
}

export function Notifications({ user, onVendorSelect, onNavigate }: NotificationsProps) {
  const getFirstName = (user: User | null) => {
    if (!user) return 'Guest';
    return user.name.split(' ')[0];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const notifications = [
    {
      id: '1',
      title: 'New Vendor: Elegant Moments Photography',
      description: 'A new premium photography vendor has joined EventCore. Check out their stunning portfolio and exclusive packages.',
      tag: 'NEW VENDOR',
      tagColor: 'bg-forest-green-500 text-white',
      time: '2 hours ago',
      type: 'new-vendor'
    },
    {
      id: '2',
      title: 'Flash Sale: 30% Off Premium Packages',
      description: 'Limited time offer on all premium wedding packages. Save big on photography, videography, and decoration bundles.',
      tag: 'OFFER',
      tagColor: 'bg-gold-yellow-500 text-neutral-dark',
      time: '5 hours ago',
      type: 'promotion-primary'
    },
    {
      id: '3',
      title: 'Weekend Special: Venue Discounts',
      description: 'Book any venue this weekend and get 15% off on decoration services. Perfect for your dream wedding setup.',
      tag: 'DEAL',
      tagColor: 'bg-bronze-brown-500 text-white',
      time: '1 day ago',
      type: 'promotion-secondary'
    },
    {
      id: '4',
      title: 'Featured Merchant: Harmony Catering',
      description: 'This week\'s featured merchant offers exquisite catering services with customizable menus for your special day.',
      tag: 'FEATURED',
      tagColor: 'bg-gold-yellow-500 text-neutral-dark',
      time: '1 day ago',
      type: 'featured-merchant'
    },
    {
      id: '5',
      title: 'Featured Product: Royal Decoration Package',
      description: 'Discover our highlighted Royal Decoration Package featuring premium floral arrangements and elegant venue styling.',
      tag: 'FEATURED PRODUCT',
      tagColor: 'bg-sage-green-500 text-white',
      time: '2 days ago',
      type: 'featured-product'
    },
    {
      id: '6',
      title: 'Event Task Reminder',
      description: 'Don\'t forget to finalize your venue booking for "Sarah & John\'s Wedding". Deadline approaching in 3 days.',
      tag: 'TASK',
      tagColor: 'bg-bronze-brown-500 text-white',
      time: '3 days ago',
      type: 'event-task'
    },
    {
      id: '7',
      title: 'Pending Confirmation Required',
      description: 'Your booking request for Sunset Gardens Venue is pending. Please review and confirm your reservation details.',
      tag: 'PENDING',
      tagColor: 'bg-gold-yellow-500 text-neutral-dark',
      time: '4 days ago',
      type: 'event-pending'
    },
    {
      id: '8',
      title: 'Admin Notice: Platform Update',
      description: 'EventCore has added new features including enhanced event planning tools and improved vendor matching system.',
      tag: 'ADMIN',
      tagColor: 'bg-forest-green-500 text-white',
      time: '5 days ago',
      type: 'admin-notice'
    },
    {
      id: '9',
      title: 'New Vendor: Blissful Banquets',
      description: 'Blissful Banquets brings exceptional catering and venue services to EventCore. Explore their packages today.',
      tag: 'NEW VENDOR',
      tagColor: 'bg-forest-green-500 text-white',
      time: '6 days ago',
      type: 'new-vendor'
    },
    {
      id: '10',
      title: 'Early Bird Offer: Summer Weddings',
      description: 'Book your summer wedding packages now and save up to 25%. Available for June through August ceremonies.',
      tag: 'OFFER',
      tagColor: 'bg-gold-yellow-500 text-neutral-dark',
      time: '1 week ago',
      type: 'promotion-primary'
    }
  ];

  // Get featured vendors from vendors data
  const featuredVendors = Object.values(vendors).filter(vendor => vendor.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      {/* Light Green Curved Top Header Section with Profile */}
      <div className="bg-cover bg-center bg-no-repeat rounded-b-[32px] pb-6 mb-6 shadow-sm" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="px-4 pt-4">
          {/* Greeting and Profile */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Avatar
                className="h-[45px] w-[45px] border-[1.5px] border-white/30 cursor-pointer flex-shrink-0"
                onClick={() => onNavigate && onNavigate('profile')}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" />
                <AvatarFallback
                  className="bg-[#6D9773] text-white"
                  style={{ fontSize: "17px", fontWeight: 500 }}
                >
                  {getFirstName(user)[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white" style={{ fontSize: "12px", fontWeight: 400 }}>
                  Hey {getFirstName(user)},
                </p>
                <p className="text-white" style={{ fontSize: "16.8px", fontWeight: 600 }}>
                  {getGreeting()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('events')}
              className="relative h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <Calendar className="h-6 w-6 text-[#FFBA00]" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Vendors, Venues, Services"
              className="pl-12 h-11 bg-white border-0 rounded-full shadow-md text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-forest-green-500 cursor-pointer"
              readOnly
              onClick={() => onNavigate?.('vendor')}
            />
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4 pb-6">
        <div className="px-4">
          <h2 className="text-xl font-medium text-neutral-dark mb-4">Latest Updates</h2>
        </div>

        <div className="px-4 space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className="cursor-pointer hover:shadow-md transition-shadow bg-white rounded-2xl border border-gray-100"
            >
              <CardContent className="p-4 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-neutral-dark mb-2">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  
                  {/* Icon on right side */}
                  <div className="ml-4">
                    {/* Icon based on notification type */}
                    {notification.type === 'new-vendor' && (
                      <div className="w-10 h-10 bg-forest-green-100 rounded-full flex items-center justify-center">
                        <Store className="w-5 h-5 text-forest-green-600" />
                      </div>
                    )}
                    {notification.type === 'promotion-primary' && (
                      <div className="w-10 h-10 bg-gold-yellow-100 rounded-full flex items-center justify-center">
                        <Gift className="w-5 h-5 text-gold-yellow-600" />
                      </div>
                    )}
                    {notification.type === 'promotion-secondary' && (
                      <div className="w-10 h-10 bg-bronze-brown-100 rounded-full flex items-center justify-center">
                        <Tag className="w-5 h-5 text-bronze-brown-600" />
                      </div>
                    )}
                    {notification.type === 'featured-merchant' && (
                      <div className="w-10 h-10 bg-gold-yellow-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-gold-yellow-600" />
                      </div>
                    )}
                    {notification.type === 'featured-product' && (
                      <div className="w-10 h-10 bg-sage-green-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-sage-green-600" />
                      </div>
                    )}
                    {notification.type === 'event-task' && (
                      <div className="w-10 h-10 bg-bronze-brown-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-bronze-brown-600" />
                      </div>
                    )}
                    {notification.type === 'event-pending' && (
                      <div className="w-10 h-10 bg-gold-yellow-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-gold-yellow-600" />
                      </div>
                    )}
                    {notification.type === 'admin-notice' && (
                      <div className="w-10 h-10 bg-forest-green-100 rounded-full flex items-center justify-center">
                        <Shield className="w-5 h-5 text-forest-green-600" />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Badge in bottom-right corner */}
                <Badge className={`absolute bottom-3 right-3 text-xs font-medium ${notification.tagColor}`}>
                  {notification.tag}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Vendors Section */}
      <div className="mb-10 px-4 mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2
            className="text-[#1a1a1a]"
            style={{ fontSize: "20.7px", fontWeight: 500 }}
          >
            Featured Vendors
          </h2>

        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mr-4 pr-4">
          {featuredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex-shrink-0 cursor-pointer hover:opacity-90 transition-all"
              style={{
                width: "calc((100vw - 64px) / 1.47)",
              }}
              onClick={() => {
                if (onVendorSelect) {
                  onVendorSelect(vendor.id);
                } else if (onNavigate) {
                  onNavigate("vendor-detail");
                }
              }}
            >
              <div className="h-[135px] relative rounded-[9px] overflow-hidden mb-2">
                <ImageWithFallback
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4
                  className="text-[#1a1a1a]"
                  style={{
                    fontSize: "15.75px",
                    fontWeight: 600,
                    lineHeight: "1.2",
                  }}
                >
                  {vendor.name}
                </h4>
                <p
                  className="text-[#666666] mb-1"
                  style={{
                    fontSize: "11.25px",
                    fontWeight: 400,
                    lineHeight: "1.2",
                  }}
                >
                  Starting Packages from
                </p>
                <Badge
                  className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2 py-0.5 rounded-md"
                  style={{
                    fontSize: "12.75px",
                    fontWeight: 700,
                  }}
                >
                  {vendor.price}+
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State for Guests */}
      {!user && (
        <div className="px-4">
          <Card className="bg-forest-green-50 border-forest-green-200 rounded-2xl">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-forest-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-forest-green-800 mb-2">Get Personalized Offers</h3>
              <p className="text-sm text-forest-green-700 mb-4">
                Sign up to receive exclusive deals and updates from your favorite vendors
              </p>
              <Button className="bg-forest-green-500 hover:bg-forest-green-600 text-white">
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
