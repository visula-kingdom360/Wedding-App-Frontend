import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Camera, 
  Utensils, 
  Music, 
  Flower, 
  MapPin, 
  Sparkles,
  Search
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface CategoriesProps {
  user: User | null;
  onCategorySelect: (category: string) => void;
  onNavigate?: (screen: string) => void;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  vendorCount: string;
  bgColor: string;
}

export function Categories({ user, onCategorySelect, onNavigate }: CategoriesProps) {
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

  const categories: Category[] = [
    {
      id: 'photography',
      name: 'Photography',
      icon: Camera,
      vendorCount: '120+ vendors',
      bgColor: 'bg-[#B8D4C5]'
    },
    {
      id: 'decoration',
      name: 'Decoration',
      icon: Sparkles,
      vendorCount: '85+ vendors',
      bgColor: 'bg-[#B8D4C5]'
    },
    {
      id: 'catering',
      name: 'Catering',
      icon: Utensils,
      vendorCount: '95+ vendors',
      bgColor: 'bg-[#B8D4C5]'
    },
    {
      id: 'venues',
      name: 'Venues',
      icon: MapPin,
      vendorCount: '65+ vendors',
      bgColor: 'bg-[#B8D4C5]'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: Music,
      vendorCount: '45+ vendors',
      bgColor: 'bg-[#B8D4C5]'
    },
    {
      id: 'flowers',
      name: 'Flowers',
      icon: Flower,
      vendorCount: '70+ vendors',
      bgColor: 'bg-[#B8D4C5]'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      {/* Light Green Curved Top Header Section with Profile */}
      <div className="bg-gradient-to-br from-sage-green-50 to-forest-green-50 rounded-b-[32px] pb-6 mb-6 shadow-sm">
        <div className="px-4 pt-4">
          {/* Greeting and Profile */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-medium text-neutral-dark">
                Hi {getFirstName(user)},
              </h1>
              <p className="text-neutral-dark">{getGreeting()}</p>
            </div>
            <Avatar 
              className="h-12 w-12 border-2 border-white shadow-sm cursor-pointer"
              onClick={() => onNavigate && onNavigate('profile')}
            >
              <AvatarImage src="" />
              <AvatarFallback className="bg-forest-green-500 text-white">
                {getFirstName(user)[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Vendors, Venues, Services"
              className="pl-12 h-14 bg-white border-0 rounded-full shadow-md text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-forest-green-500"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="pb-6">
        <div className="px-4 mb-4">
          <h2 className="text-xl font-medium text-neutral-dark">Browse Categories</h2>
        </div>
        <div className="px-4">
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="cursor-pointer"
              >
                <div className="space-y-2">
                  <div className={`${category.bgColor} h-24 w-full rounded-2xl flex flex-col items-center justify-center`}>
                    <category.icon className="w-8 h-8 text-white mb-1" />
                    <span className="text-xs text-white font-medium">{category.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Services Section */}
      <div className="px-4">
        <h3 className="text-base font-medium text-neutral-dark mb-4">Popular This Week</h3>
        <div className="space-y-3">
          <Card className="bg-white rounded-2xl border border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#B8D4C5] rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-dark">Wedding Photography</h4>
                  <p className="text-sm text-muted-foreground">Starting from LKR 25,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-sage-green-600">120+ vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl border border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#B8D4C5] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-dark">Event Decoration</h4>
                  <p className="text-sm text-muted-foreground">Starting from LKR 15,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-sage-green-600">85+ vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl border border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#B8D4C5] rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-neutral-dark">Catering Services</h4>
                  <p className="text-sm text-muted-foreground">Starting from LKR 2,500/person</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-sage-green-600">95+ vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
