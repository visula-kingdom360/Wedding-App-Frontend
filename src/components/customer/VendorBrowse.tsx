import image_37d6402d0dbff843d1b5c6ec5e8768af14c27df1 from 'figma:asset/37d6402d0dbff843d1b5c6ec5e8768af14c27df1.png';
import image_f1dc0e70962ebf113ca201757d38cc7e359e3b65 from 'figma:asset/f1dc0e70962ebf113ca201757d38cc7e359e3b65.png';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command';
import { VendorCard } from '../shared/VendorCard';
import { Search, MapPin, DollarSign, Calendar, Star, User, ChevronRight, Check, ChevronDown, SlidersHorizontal, Grid, Camera, Palette, UtensilsCrossed, Building2, Music, Bell, Sparkles, X, ArrowLeft } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from '../ui/drawer';
import { Slider } from '../ui/slider';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import ReactSlick from 'react-slick';
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';
import { vendors as vendorsData } from '../../data/vendors';
import { getActivePromotions } from '../../data/vendorPromotions';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface VendorBrowseProps {
  user: User | null;
  onVendorSelect: (vendorId: string, packageId?: string, promotionId?: string) => void;
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
  initialCategory?: string;
  initialMaxPrice?: number;
}

export function VendorBrowse({ user, onVendorSelect, onNavigate, onBack, initialCategory, initialMaxPrice }: VendorBrowseProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [eventType, setEventType] = useState('all');
  const [category, setCategory] = useState(initialCategory || 'all');
  const [locationOpen, setLocationOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceValues, setPriceValues] = useState([0, initialMaxPrice || 10000000]);
  const [appliedFromEvent, setAppliedFromEvent] = useState(false);

  // Get active vendor promotions
  const allPromoBanners = getActivePromotions();
  
  // Filter promotions based on selected category
  const promoBanners = allPromoBanners.filter(banner => {
    // If no category is selected, show all promotions
    if (category === 'all' || !category) return true;
    
    // Get the vendor for this promotion
    const vendor = vendorsData[banner.vendorId];
    if (!vendor) return false;
    
    // Check if the vendor has the selected category
    const vendorCategories = vendor.categories.map(cat => cat.name);
    return vendorCategories.includes(category);
  });

  const bannerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Check for search parameters from EventManagement
    const savedParams = localStorage.getItem('vendorSearchParams');
    console.log('VendorBrowse mounted, savedParams:', savedParams);
    if (savedParams) {
      try {
        const params = JSON.parse(savedParams);
        console.log('Parsed params:', params);
        setAppliedFromEvent(true);
        if (params.eventType && params.eventType !== 'all') {
          console.log('Setting eventType to:', params.eventType);
          setEventType(params.eventType);
        }
        if (params.category) {
          console.log('Setting category to:', params.category);
          setCategory(params.category);
        }
        if (params.maxBudget) {
          console.log('Setting price range to: [0,', params.maxBudget, ']');
          setPriceValues([0, params.maxBudget]);
        }
        // Clear the stored params after reading
        localStorage.removeItem('vendorSearchParams');
      } catch (e) {
        console.error('Failed to parse vendor search params', e);
      }
    }
  }, []);

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

  // Get all vendors from the data file
  const vendors = Object.values(vendorsData);

  // Image mapping for vendor categories
  const getCategoryImage = (category: string) => {
    const imageMap: { [key: string]: string } = {
      'Photography': image_37d6402d0dbff843d1b5c6ec5e8768af14c27df1,
      'Decoration': 'https://images.unsplash.com/photo-1664530140722-7e3bdbf2b870?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZGVjb3JhdGlvbiUyMGZsb3dlcnN8ZW58MXx8fHwxNzYxODk2OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'Catering': 'https://images.unsplash.com/photo-1680342648571-b95876a6c24d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRlcmluZyUyMGZvb2QlMjBldmVudHxlbnwxfHx8fDE3NjE5MjM3MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'Venues': 'https://images.unsplash.com/photo-1625619080917-7d6ff39e0675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwdmVudWUlMjBiYWxscm9vbXxlbnwxfHx8fDE3NjE5MDE0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'Entertainment': 'https://images.unsplash.com/photo-1677845100757-f4ff89b22df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZW50ZXJ0YWlubWVudCUyMG11c2ljfGVufDF8fHx8MTc2MTkxMTU0NHww&ixlib=rb-4.1.0&q=80&w=1080'
    };
    return imageMap[category] || imageMap['Photography'];
  };

  // First filter all vendors based on search and filter criteria
  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = location === 'all' || !location || vendor.location.toLowerCase().includes(location.toLowerCase());
    
    // Check if vendor has the matching category in their categories array
    const vendorCategories = vendor.categories.map(cat => cat.name);
    const matchesEventType = eventType === 'all' || !eventType || vendorCategories.includes(eventType);
    const matchesCategory = category === 'all' || !category || vendorCategories.includes(category);
    
    // Parse vendor price for filtering (extract number from "Starting from LKR 20,000")
    const priceMatch = vendor.price.match(/LKR\s*([\d,]+)/);
    const vendorPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
    const matchesPrice = vendorPrice >= priceValues[0] && vendorPrice <= priceValues[1];
    
    return matchesSearch && matchesLocation && matchesEventType && matchesCategory && matchesPrice;
  });

  // Debug logging when coming from event
  if (appliedFromEvent) {
    console.log('=== VendorBrowse Filter Debug ===');
    console.log('EventType:', eventType);
    console.log('Category:', category);
    console.log('Price Range:', priceValues);
    console.log('Total Vendors:', vendors.length);
    console.log('Filtered Vendors:', filteredVendors.length);
    
    vendors.forEach(vendor => {
      const vendorCategories = vendor.categories.map(cat => cat.name);
      const matchesEventType = eventType === 'all' || !eventType || vendorCategories.includes(eventType);
      const matchesCategory = category === 'all' || !category || vendorCategories.includes(category);
      const priceMatch = vendor.price.match(/LKR\s*([\d,]+)/);
      const vendorPrice = priceMatch ? parseInt(priceMatch[1].replace(/,/g, '')) : 0;
      const matchesPrice = vendorPrice >= priceValues[0] && vendorPrice <= priceValues[1];
      
      console.log(`\n${vendor.name}:`);
      console.log(`  Categories: [${vendorCategories.join(', ')}]`);
      console.log(`  Event Match (${eventType}): ${matchesEventType}`);
      console.log(`  Category Match (${category}): ${matchesCategory}`);
      console.log(`  Price ${vendorPrice} in [${priceValues[0]}, ${priceValues[1]}]: ${matchesPrice}`);
    });
  }
  
  // Then separate filtered vendors into featured and regular
  const featuredVendors = filteredVendors.filter(vendor => vendor.featured);
  const regularVendors = filteredVendors.filter(vendor => !vendor.featured);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Curved Top Header Section with Search */}
      <div className="bg-cover bg-center bg-no-repeat rounded-b-[32px] pb-6 mb-6 shadow-sm" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="px-4 pt-4">
          {/* Greeting and Profile */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => onBack ? onBack() : onNavigate && onNavigate('home')}
                className="h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => onNavigate && onNavigate('profile')}>
                <Avatar
                  className="h-[45px] w-[45px] border-[1.5px] border-white/30 flex-shrink-0"
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
                  <p className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                    Let's plan your next event!
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('notifications')}
              className="relative h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <Bell className="h-6 w-6 text-[#FFBA00]" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#FFBA00] rounded-full"></span>
            </button>
          </div>

          {/* Search Bar with Filter Button */}
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Vendors, Venues, Services"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-11 bg-white border-0 rounded-full shadow-md text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-forest-green-500"
              />
            </div>
            <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
              <DrawerTrigger asChild>
                <Button
                  size="icon"
                  className="h-11 w-11 rounded-full bg-white hover:bg-white shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                >
                  <SlidersHorizontal className="h-5 w-5 text-forest-green-600" />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[72vh] p-0">
                <DrawerHeader className="border-b pb-4">
                  <DrawerTitle className="text-center">Filter Vendors</DrawerTitle>
                  <DrawerDescription className="sr-only">
                    Filter vendors by event type, category, location, and price range
                  </DrawerDescription>
                </DrawerHeader>
                
                <div className="overflow-y-scroll px-4 pb-20 scrollbar-hide" style={{ maxHeight: 'calc(72vh - 140px)' }}>
                  <div className="space-y-6 py-6">
                    {/* Event Type Filter - Toggle Badges */}
                    <div className="space-y-3">
                      <label className="font-semibold text-neutral-dark">Event Type</label>
                      <div className="overflow-x-scroll scrollbar-hide">
                        <div className="flex gap-2 pb-2">
                          {['All Events', 'Wedding', 'Birthday', 'Anniversary', 'Corporate'].map((type) => (
                            <Badge
                              key={type}
                              variant={eventType === (type === 'All Events' ? 'all' : type) ? 'default' : 'outline'}
                              className={`cursor-pointer px-4 py-2 transition-all whitespace-nowrap ${
                                eventType === (type === 'All Events' ? 'all' : type)
                                  ? 'bg-forest-green-600 hover:bg-forest-green-700 text-white'
                                  : 'hover:bg-sage-green-50 hover:border-forest-green-400'
                              }`}
                              onClick={() => setEventType(type === 'All Events' ? 'all' : type)}
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Category Filter - Icon Cards */}
                    <div className="space-y-3">
                      <label className="font-semibold text-neutral-dark">Category</label>
                      <div className="overflow-x-scroll scrollbar-hide">
                        <div className="flex gap-3 pb-2">
                          {[
                            { name: 'All', value: 'all', icon: Grid },
                            { name: 'Photography', value: 'Photography', icon: Camera },
                            { name: 'Decoration', value: 'Decoration', icon: Palette },
                            { name: 'Catering', value: 'Catering', icon: UtensilsCrossed },
                            { name: 'Venues', value: 'Venue', icon: Building2 },
                            { name: 'Entertainment', value: 'Entertainment', icon: Music }
                          ].map(({ name, value, icon: Icon }) => (
                            <button
                              key={value}
                              onClick={() => setCategory(value)}
                              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all min-w-[90px] ${
                                category === value
                                  ? 'border-forest-green-600 bg-forest-green-50'
                                  : 'border-gray-200 hover:border-forest-green-300 bg-white'
                              }`}
                            >
                              <Icon className={`w-6 h-6 ${category === value ? 'text-forest-green-600' : 'text-gray-600'}`} />
                              <span className={`text-xs whitespace-nowrap ${category === value ? 'text-forest-green-600 font-semibold' : 'text-gray-600'}`}>
                                {name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Location Filter - Chips */}
                    <div className="space-y-3">
                      <label className="font-semibold text-neutral-dark">Location</label>
                      <div className="overflow-x-scroll scrollbar-hide">
                        <div className="flex gap-2 pb-2">
                          {['All', 'Colombo', 'Kandy', 'Galle', 'Negombo'].map((loc) => (
                            <Badge
                              key={loc}
                              variant={location === (loc === 'All' ? 'all' : loc.toLowerCase()) ? 'default' : 'outline'}
                              className={`cursor-pointer px-4 py-2 transition-all whitespace-nowrap ${
                                location === (loc === 'All' ? 'all' : loc.toLowerCase())
                                  ? 'bg-forest-green-600 hover:bg-forest-green-700 text-white'
                                  : 'hover:bg-sage-green-50 hover:border-forest-green-400'
                              }`}
                              onClick={() => setLocation(loc === 'All' ? 'all' : loc.toLowerCase())}
                            >
                              <MapPin className="w-3 h-3 mr-1" />
                              {loc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price Range Filter - Slider */}
                    <div className="space-y-4">
                      <div>
                        <label className="font-semibold text-neutral-dark">Price Range</label>
                      </div>
                      
                      {/* Draggable Slider */}
                      <div className="px-1 py-4">
                        <Slider
                          value={priceValues}
                          onValueChange={setPriceValues}
                          min={0}
                          max={10000000}
                          step={100000}
                          className="w-full"
                        />
                      </div>
                      
                      {/* Price Value Display */}
                      <div className="flex justify-between items-center px-1">
                        <div className="font-semibold text-neutral-dark">
                          {priceValues[0].toLocaleString()}
                        </div>
                        <div className="font-semibold text-neutral-dark">
                          {priceValues[1].toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fixed Bottom Buttons */}
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEventType('all');
                      setLocation('all');
                      setCategory('all');
                      setPriceValues([0, 10000000]);
                      setAppliedFromEvent(false);
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    className="flex-1 bg-forest-green-600 hover:bg-forest-green-700"
                    onClick={() => setFilterOpen(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Filter Buttons - Inside the curved section */}
        <div className="px-4 mt-4">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-2">
            {/* Event Type Filter */}
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="!h-9 !py-0 min-w-[150px] w-auto bg-white border-0 rounded-full px-5 shadow-md hover:shadow-lg transition-shadow whitespace-nowrap !flex !items-center !justify-between [&>span]:flex [&>span]:items-center [&>span]:gap-2">
                <SelectValue>
                  <Calendar className="w-4 h-4 text-forest-green-600 flex-shrink-0" />
                  <span className="text-neutral-dark font-medium">
                    {eventType === 'all' ? 'Event Type' : eventType}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">All Events</SelectItem>
                <SelectItem value="Wedding" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Wedding</SelectItem>
                <SelectItem value="Birthday" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Birthday</SelectItem>
                <SelectItem value="Anniversary" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Anniversary</SelectItem>
                <SelectItem value="Corporate" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Corporate Event</SelectItem>
                <SelectItem value="Photography" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Photography</SelectItem>
                <SelectItem value="Decoration" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Decoration</SelectItem>
                <SelectItem value="Catering" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Catering</SelectItem>
                <SelectItem value="Venue" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Venues</SelectItem>
                <SelectItem value="Entertainment" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Entertainment</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="!h-9 !py-0 w-fit bg-white border-0 rounded-full px-5 shadow-md hover:shadow-lg transition-shadow whitespace-nowrap !flex !items-center !justify-between [&>span]:flex [&>span]:items-center [&>span]:gap-2">
                <SelectValue>
                  <Grid className="w-4 h-4 text-forest-green-600 flex-shrink-0" />
                  <span className="text-neutral-dark font-medium">
                    {category === 'all' ? 'Category' : category}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">All Categories</SelectItem>
                <SelectItem value="Photography" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Photography</SelectItem>
                <SelectItem value="Videography" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Videography</SelectItem>
                <SelectItem value="Decoration" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Decoration</SelectItem>
                <SelectItem value="Catering" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Catering</SelectItem>
                <SelectItem value="Venue" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Venues</SelectItem>
                <SelectItem value="Entertainment" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Entertainment</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter - Searchable */}
            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger asChild>
                <button
                  role="combobox"
                  aria-expanded={locationOpen}
                  className="!h-9 min-w-[130px] w-auto bg-white border-0 rounded-full px-5 shadow-md hover:shadow-lg transition-shadow whitespace-nowrap cursor-pointer outline-none flex items-center justify-between text-sm"
                  onClick={() => setLocationOpen(!locationOpen)}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-forest-green-600 flex-shrink-0" />
                    <span className="text-neutral-dark font-medium">
                      {location === 'all' ? 'Location' : location.charAt(0).toUpperCase() + location.slice(1)}
                    </span>
                  </span>
                  <ChevronDown className="w-4 h-4 opacity-50 flex-shrink-0 ml-2" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search location..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem
                        value="all"
                        onSelect={() => {
                          setLocation('all');
                          setLocationOpen(false);
                        }}
                        className={location === 'all' ? 'bg-[#14533C] text-white transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white' : 'transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white'}
                      >
                        <Check className={`mr-2 h-4 w-4 ${location === 'all' ? 'opacity-100' : 'opacity-0'}`} />
                        All Locations
                      </CommandItem>
                      <CommandItem
                        value="colombo"
                        onSelect={() => {
                          setLocation('colombo');
                          setLocationOpen(false);
                        }}
                        className={location === 'colombo' ? 'bg-[#14533C] text-white transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white' : 'transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white'}
                      >
                        <Check className={`mr-2 h-4 w-4 ${location === 'colombo' ? 'opacity-100' : 'opacity-0'}`} />
                        Colombo
                      </CommandItem>
                      <CommandItem
                        value="kandy"
                        onSelect={() => {
                          setLocation('kandy');
                          setLocationOpen(false);
                        }}
                        className={location === 'kandy' ? 'bg-[#14533C] text-white transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white' : 'transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white'}
                      >
                        <Check className={`mr-2 h-4 w-4 ${location === 'kandy' ? 'opacity-100' : 'opacity-0'}`} />
                        Kandy
                      </CommandItem>
                      <CommandItem
                        value="galle"
                        onSelect={() => {
                          setLocation('galle');
                          setLocationOpen(false);
                        }}
                        className={location === 'galle' ? 'bg-[#14533C] text-white transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white' : 'transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white'}
                      >
                        <Check className={`mr-2 h-4 w-4 ${location === 'galle' ? 'opacity-100' : 'opacity-0'}`} />
                        Galle
                      </CommandItem>
                      <CommandItem
                        value="negombo"
                        onSelect={() => {
                          setLocation('negombo');
                          setLocationOpen(false);
                        }}
                        className={location === 'negombo' ? 'bg-[#14533C] text-white transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white' : 'transition-all duration-200 data-[selected=true]:bg-[#14533C] data-[selected=true]:text-white'}
                      >
                        <Check className={`mr-2 h-4 w-4 ${location === 'negombo' ? 'opacity-100' : 'opacity-0'}`} />
                        Negombo
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="!h-9 !py-0 min-w-[110px] w-auto bg-white border-0 rounded-full px-5 shadow-md hover:shadow-lg transition-shadow whitespace-nowrap !flex !items-center !justify-between [&>span]:flex [&>span]:items-center [&>span]:gap-2">
                <SelectValue>
                  <DollarSign className="w-4 h-4 text-forest-green-600 flex-shrink-0" />
                  <span className="text-neutral-dark font-medium">Price</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">All Prices</SelectItem>
                <SelectItem value="low" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Under LKR 25,000</SelectItem>
                <SelectItem value="medium" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">LKR 25,000 - 50,000</SelectItem>
                <SelectItem value="high" className="transition-all duration-200 hover:bg-[#14533C] hover:text-white focus:bg-[#14533C] focus:text-white data-[state=checked]:bg-[#14533C] data-[state=checked]:text-white">Above LKR 50,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Active Filters Badge - From Event Management */}
      {appliedFromEvent && (eventType !== 'all' || category !== 'all' || priceValues[1] < 100000) && (
        <div className="px-4 mb-4">
          <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-[#0C3B2E]/10 to-[#6D9773]/10 rounded-2xl border-2 border-[#6D9773]/30">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#6D9773] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 mb-2">
                <span className="font-black">Filters from Event Management</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {eventType !== 'all' && (
                  <Badge className="bg-[#0C3B2E] text-white hover:bg-[#0C3B2E]/90">
                    Event: {eventType}
                  </Badge>
                )}
                {category !== 'all' && (
                  <Badge className="bg-[#6D9773] text-white hover:bg-[#6D9773]/90">
                    Category: {category}
                  </Badge>
                )}
                {priceValues[1] < 100000 && (
                  <Badge className="bg-gradient-to-r from-[#B46617] to-[#FFBA00] text-white">
                    Budget: {priceValues[1].toLocaleString()} LKR
                  </Badge>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 hover:bg-gray-200 rounded-full"
              onClick={() => {
                setEventType('all');
                setCategory('all');
                setPriceValues([0, 100000]);
                setAppliedFromEvent(false);
              }}
            >
              <X className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
      )}
      
      {/* Active Filters Badge */}
      {initialMaxPrice && (
        <div className="px-4 mb-4">
          <Badge className="bg-gradient-to-r from-[#B46617] to-[#FFBA00] text-white px-4 py-2 shadow-md">
            <Search className="w-3.5 h-3.5 mr-2" />
            Filtered by budget: LKR {initialMaxPrice.toLocaleString('en-US')}
          </Badge>
        </div>
      )}

      {/* Promo Banner Slider */}
      {promoBanners.length > 0 && filteredVendors.length > 0 && (
        <div className="mb-6 mt-6">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-medium text-neutral-dark">Special Offers</h2>
          </div>
          <div className="px-4">
            <ReactSlick {...bannerSettings}>
              {promoBanners.map((banner) => (
                <div key={banner.id} className="outline-none">
                  <div
                    className="relative h-[180px] rounded-[20px] overflow-hidden cursor-pointer"
                    onClick={() => {
                      if (banner.vendorId) {
                        // Navigate to vendor detail with promotion ID to scroll to promotions section
                        onVendorSelect(banner.vendorId, undefined, banner.id);
                      }
                    }}
                  >
                    <ImageWithFallback
                      src={banner.image}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </ReactSlick>
          </div>
        </div>
      )}

      {/* Featured Section - Horizontal Scrolling */}
      {featuredVendors.length > 0 && (
        <div className="space-y-4 mb-6">
          <div className="px-4">
            <h2 className="text-xl font-medium text-neutral-dark">Featured Vendors</h2>
          </div>
          
          {/* Horizontal Scrolling Featured Vendor Cards */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
              <div className={`flex gap-4 px-4 pb-2 ${featuredVendors.length === 1 ? 'justify-center' : ''}`}>
                {featuredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="flex-shrink-0 w-[320px] cursor-pointer"
                    onClick={() => onVendorSelect(vendor.id)}
                  >
                    <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white rounded-xl border border-gray-200 shadow-sm">
                      <CardContent className="pt-[0px] pr-[0px] pb-[8px] pl-[0px]">
                        {/* Vendor Image */}
                        <div className="relative h-[144px] bg-[#D9E8E0] rounded-t-xl overflow-hidden">
                          <img 
                            src={vendor.image} 
                            alt={vendor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Vendor Details */}
                        <div className="space-y-[7px] px-[16px] pt-[17px] pb-[3px]">
                          {/* Name and Featured Badge */}
                          <div className="flex items-center gap-2">
                            <h3 
                              className="text-neutral-dark flex-1"
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              {vendor.name}
                            </h3>
                            {vendor.featured && (
                              <Badge
                                className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2 py-0.5 rounded flex-shrink-0"
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                }}
                              >
                                Featured
                              </Badge>
                            )}
                          </div>

                          {/* Description */}
                          <p 
                            className="text-gray-500 leading-snug line-clamp-2"
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {vendor.description}
                          </p>

                          {/* Price */}
                          <p 
                            className="text-[#FFBA00]"
                            style={{
                              fontSize: "20.16px",
                              fontWeight: 600,
                            }}
                          >
                            {vendor.price}
                          </p>

                          {/* Categories and Rating */}
                          <div className="flex items-center justify-between pt-[3px]">
                            <div className="flex items-center gap-1.5 text-[20px]">
                              <span 
                                className="text-gray-500"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                }}
                              >
                                {vendor.category}
                              </span>
                              <span className="text-gray-400">•</span>
                              <span 
                                className="text-gray-500"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 400,
                                }}
                              >
                                {vendor.location}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="fill-[#FFBA00] text-[#FFBA00]" style={{ width: "19.6px", height: "19.6px" }} />
                              <span 
                                className="text-neutral-dark"
                                style={{
                                  fontSize: "18.2px",
                                  fontWeight: 600,
                                }}
                              >
                                {vendor.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
        </div>
      )}

      {/* All Vendors Section */}
      <div className="space-y-3 pb-6">
        <div className="px-4">
          <h2 
            className="text-neutral-dark"
            style={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            All Vendors
          </h2>
          <p 
            className="text-gray-500"
            style={{
              fontSize: "13px",
              fontWeight: 400,
            }}
          >
            {filteredVendors.length} vendors found
          </p>
        </div>
        
        <div className="px-4 space-y-3.5">
          {filteredVendors.map((vendor) => (
            <Card
              key={vendor.id}
              className="cursor-pointer hover:shadow-md transition-shadow bg-white rounded-xl border border-gray-200"
              onClick={() => onVendorSelect(vendor.id)}
            >
              <CardContent className="p-0 overflow-hidden rounded-lg">
                {/* Vendor Image Section */}
                <div className="relative h-[192px] overflow-hidden">
                  <img 
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Vendor Info Section - Below Image */}
                <div className="bg-white px-3 pt-3 pb-2 space-y-1.5">
                  {/* Logo, Name and Rating Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <div className="w-10 h-10 rounded-full bg-[#0C3B2E]/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-[#0C3B2E]" />
                      </div>
                      <h3 
                        className="text-neutral-dark"
                        style={{
                          fontSize: "22px",
                          fontWeight: 600,
                        }}
                      >
                        {vendor.name}
                      </h3>
                    </div>
                    {/* Rating - Right Side */}
                    <div className="flex items-center gap-1 bg-[#0C3B2E]/10 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-[#FFBA00] text-[#FFBA00]" />
                      <span 
                        className="text-neutral-dark"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        {vendor.rating}
                      </span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p 
                    className="text-gray-600 line-clamp-2"
                    style={{
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {vendor.description}
                  </p>
                  
                  {/* Starting Packages Row */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span 
                      className="text-gray-600"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      Starting Packages From
                    </span>
                    <Badge
                      className="bg-[#FFBA00] hover:bg-[#FFBA00] text-[#1a1a1a] px-2 py-0.5 rounded-sm"
                      style={{
                        fontSize: "16px",
                        fontWeight: 400,
                      }}
                    >
                      LKR 20,000
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredVendors.length === 0 && (
        <div className="px-4 pb-6">
          <Card className="bg-white rounded-2xl border border-gray-100">
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-neutral-dark mb-2">No vendors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms
              </p>
            </CardContent>
          </Card>
        </div>
      )}

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
