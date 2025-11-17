import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import searchImage from 'figma:asset/f5da1c85b014635251b7ef283db8dce012434154.png';
import { Search, MapPin, DollarSign, Calendar, Star, ChevronRight, Camera } from 'lucide-react';
import { vendors } from '../../data/vendors';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface SearchScreenProps {
  user: User | null;
  onVendorSelect: (vendorId: string) => void;
  onNavigate?: (screen: string) => void;
}

export function SearchScreen({ user, onVendorSelect, onNavigate }: SearchScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [eventType, setEventType] = useState('all');

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
  const allVendors = Object.values(vendors);
  
  // Show all vendors in the list
  const featuredVendors = allVendors;

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border-0 rounded-full shadow-md text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-forest-green-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pb-6">
      {/* Filters Section */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search your Vendors or Services"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border border-gray-200 rounded-2xl shadow-sm text-base placeholder:text-muted-foreground focus:border-forest-green-500 focus:ring-1 focus:ring-forest-green-500"
          />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="px-4">
        <div className="flex space-x-3">
          {/* Price Filter */}
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-auto h-12 bg-white border border-gray-200 rounded-2xl px-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="text-neutral-dark">Price</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="low">Under LKR 25,000</SelectItem>
              <SelectItem value="medium">LKR 25,000 - 50,000</SelectItem>
              <SelectItem value="high">Above LKR 50,000</SelectItem>
            </SelectContent>
          </Select>

          {/* Location Filter */}
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-auto h-12 bg-white border border-gray-200 rounded-2xl px-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-neutral-dark">Location</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="colombo">Colombo</SelectItem>
              <SelectItem value="kandy">Kandy</SelectItem>
              <SelectItem value="galle">Galle</SelectItem>
              <SelectItem value="negombo">Negombo</SelectItem>
            </SelectContent>
          </Select>

          {/* Event Type Filter */}
          <Select value={eventType} onValueChange={setEventType}>
            <SelectTrigger className="w-auto h-12 bg-white border border-gray-200 rounded-2xl px-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-neutral-dark">Event Type</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Photography">Photography</SelectItem>
              <SelectItem value="Venues">Venues</SelectItem>
              <SelectItem value="Catering">Catering</SelectItem>
              <SelectItem value="Decoration">Decoration</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Featured Vendors Section */}
      <div className="space-y-4">
        <div className="px-4 flex items-center justify-between">
          <h2 className="text-xl font-medium text-neutral-dark">Featured Vendors</h2>
          <button 
            className="text-bronze-brown-500 hover:text-bronze-brown-600 transition-colors"
            style={{ fontSize: "14px", fontWeight: 500 }}
            onClick={() => onNavigate && onNavigate('vendor')}
          >
            View All
          </button>
        </div>

        {/* Horizontal Scrolling Featured Vendor Cards */}
        <div className="relative">
          {/* Left Scroll Indicator - Dark vertical bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-r from-gray-900/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Right Scroll Indicator - Dark vertical bar */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-l from-gray-900/80 to-transparent z-10 pointer-events-none"></div>
          
          {/* Horizontal scroll container */}
          <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ scrollbarWidth: 'thin' }}>
            <div className="flex gap-4 px-4 pb-2">
              {featuredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex-shrink-0 w-[320px] cursor-pointer"
                  onClick={() => onVendorSelect(vendor.id)}
                >
                <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white rounded-xl border border-gray-200 shadow-sm">
                  <CardContent className="p-0">
                    {/* Vendor Image with Icon */}
                    <div className="relative h-[160px] bg-[#D9E8E0] rounded-t-xl flex items-center justify-center">
                      <div className="relative">
                        {/* Camera body */}
                        <div className="w-16 h-12 bg-[#5A6B7A] rounded-lg relative">
                          {/* Camera lens */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#3D4854] rounded-full border-3 border-[#4A5765]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#2C3440] rounded-full"></div>
                          </div>
                          {/* Flash */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-[#FFD700] rounded-t-lg"></div>
                          {/* Viewfinder */}
                          <div className="absolute -top-0.5 right-1.5 w-2.5 h-1.5 bg-[#2C3440] rounded-sm"></div>
                        </div>
                      </div>
                    </div>

                    {/* Vendor Details */}
                    <div className="p-4 space-y-2">
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
                        className="text-[#B46617]"
                        style={{
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        {vendor.price}
                      </p>

                      {/* Categories and Rating */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="text-gray-500"
                            style={{
                              fontSize: "12px",
                              fontWeight: 400,
                            }}
                          >
                            {vendor.categories[0]?.name || 'Service'}
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
                          <Star className="w-3.5 h-3.5 fill-[#FFBA00] text-[#FFBA00]" />
                          <span 
                            className="text-neutral-dark"
                            style={{
                              fontSize: "13px",
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
      </div>
      </div>
    </div>
  );
}