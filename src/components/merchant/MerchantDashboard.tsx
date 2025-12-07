import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DollarSign, Calendar, MessageSquare, User, Plus, Settings, BarChart3, Camera, TrendingUp, Package, Phone, Mail, MapPin, CalendarDays, Instagram, Facebook, Linkedin, Twitter, Youtube, Globe } from 'lucide-react';
import type { MerchantScreen } from './MerchantApp';
import ReactSlick from 'react-slick';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantDashboardProps {
  user: User;
  onNavigate: (screen: MerchantScreen) => void;
  onLogout: () => void;
}

export function MerchantDashboard({ user, onNavigate, onLogout }: MerchantDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState('WhatsApp');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Monthly');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-06-30');
  
  // State for Views Analytics
  const [selectedViewsMetric, setSelectedViewsMetric] = useState('Profile Views');
  const [selectedViewsTimeRange, setSelectedViewsTimeRange] = useState('Monthly');
  const [viewsStartDate, setViewsStartDate] = useState('2024-01-01');
  const [viewsEndDate, setViewsEndDate] = useState('2024-06-30');
  
  const stats = {
    earnings: 28900,
    bookings: 24,
    reviews: 4.8,
    profileViews: 156,
    growth: 12.5,
    totalPackages: 4,
    activePromotions: 2,
    whatsappViews: 15,
    callViews: 8,
    emailViews: 12,
    locationRequests: 5
  };

  // Data for different categories
  const analyticsData: Record<string, any[]> = {
    'WhatsApp': [
      { month: 'Jan', value: 45 },
      { month: 'Feb', value: 52 },
      { month: 'Mar', value: 48 },
      { month: 'Apr', value: 70 },
      { month: 'May', value: 85 },
      { month: 'Jun', value: 95 },
    ],
    'Calls': [
      { month: 'Jan', value: 30 },
      { month: 'Feb', value: 35 },
      { month: 'Mar', value: 40 },
      { month: 'Apr', value: 45 },
      { month: 'May', value: 50 },
      { month: 'Jun', value: 55 },
    ],
    'Emails': [
      { month: 'Jan', value: 60 },
      { month: 'Feb', value: 65 },
      { month: 'Mar', value: 62 },
      { month: 'Apr', value: 75 },
      { month: 'May', value: 80 },
      { month: 'Jun', value: 90 },
    ],
    'Sales': [
      { month: 'Jan', value: 120000 },
      { month: 'Feb', value: 145000 },
      { month: 'Mar', value: 135000 },
      { month: 'Apr', value: 180000 },
      { month: 'May', value: 210000 },
      { month: 'Jun', value: 250000 },
    ],
    'Location Requests': [
      { month: 'Jan', value: 15 },
      { month: 'Feb', value: 18 },
      { month: 'Mar', value: 20 },
      { month: 'Apr', value: 25 },
      { month: 'May', value: 28 },
      { month: 'Jun', value: 32 },
    ],
  };

  // Data for Views Analytics
  const viewsAnalyticsData: Record<string, any[]> = {
    'Profile Views': [
      { month: 'Jan', value: 120 },
      { month: 'Feb', value: 135 },
      { month: 'Mar', value: 142 },
      { month: 'Apr', value: 158 },
      { month: 'May', value: 165 },
      { month: 'Jun', value: 180 },
    ],
    'Package Views': [
      { month: 'Jan', value: 85 },
      { month: 'Feb', value: 92 },
      { month: 'Mar', value: 88 },
      { month: 'Apr', value: 105 },
      { month: 'May', value: 118 },
      { month: 'Jun', value: 125 },
    ],
  };

  const currentData = analyticsData[selectedCategory] || analyticsData['WhatsApp'];

  // Function to generate custom date range data
  const getCustomRangeData = () => {
    if (selectedTimeRange !== 'Custom') {
      return currentData;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const data = [];
    
    // Calculate number of days in range
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Generate daily data points for the custom range
    const current = new Date(start);
    while (current <= end) {
      const dateStr = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Generate realistic random data based on category
      let value;
      if (selectedCategory === 'Sales') {
        value = Math.floor(Math.random() * 50000) + 100000; // Random sales between 100k-150k
      } else if (selectedCategory === 'WhatsApp') {
        value = Math.floor(Math.random() * 30) + 40; // Random 40-70
      } else if (selectedCategory === 'Calls') {
        value = Math.floor(Math.random() * 20) + 30; // Random 30-50
      } else if (selectedCategory === 'Emails') {
        value = Math.floor(Math.random() * 20) + 60; // Random 60-80
      } else {
        value = Math.floor(Math.random() * 15) + 15; // Location requests 15-30
      }
      
      data.push({ 
        month: dateStr, 
        value: value,
        fullDate: current.toISOString().split('T')[0]
      });
      
      // Move to next day, but limit data points to max 30 for readability
      if (daysDiff > 30) {
        current.setDate(current.getDate() + Math.ceil(daysDiff / 30)); // Sample every few days
      } else {
        current.setDate(current.getDate() + Math.max(1, Math.floor(daysDiff / 10))); // Show ~10 points
      }
      
      if (data.length >= 15) break; // Max 15 data points for chart readability
    }
    
    return data.length > 0 ? data : currentData;
  };

  const displayData = getCustomRangeData();

  const currentViewsData = viewsAnalyticsData[selectedViewsMetric] || viewsAnalyticsData['Profile Views'];

  // Function to generate custom date range data for views
  const getViewsCustomRangeData = () => {
    if (selectedViewsTimeRange !== 'Custom') {
      return currentViewsData;
    }

    const start = new Date(viewsStartDate);
    const end = new Date(viewsEndDate);
    const data = [];
    
    // Calculate number of days in range
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Generate daily data points for the custom range
    const current = new Date(start);
    while (current <= end) {
      const dateStr = current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Generate realistic random data based on metric
      let value;
      if (selectedViewsMetric === 'Profile Views') {
        value = Math.floor(Math.random() * 50) + 120; // Random 120-170
      } else {
        value = Math.floor(Math.random() * 40) + 85; // Random 85-125
      }
      
      data.push({ 
        month: dateStr, 
        value: value,
        fullDate: current.toISOString().split('T')[0]
      });
      
      // Move to next day, but limit data points to max 30 for readability
      if (daysDiff > 30) {
        current.setDate(current.getDate() + Math.ceil(daysDiff / 30)); // Sample every few days
      } else {
        current.setDate(current.getDate() + Math.max(1, Math.floor(daysDiff / 10))); // Show ~10 points
      }
      
      if (data.length >= 15) break; // Max 15 data points for chart readability
    }
    
    return data.length > 0 ? data : currentViewsData;
  };

  const displayViewsData = getViewsCustomRangeData();

  return (
    <div className="space-y-6 pb-6">
      {/* Performance Summary Cards */}
      <div className="px-4">
        <h2 className="text-lg font-medium text-neutral-dark mb-[16px] font-bold mt-[24px] mr-[0px] ml-[0px]">Merchant Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Views Breakdown */}
          <Card className="col-span-2">
            <CardContent className="p-4">
              <h3 className="font-medium text-neutral-dark mb-3">Views</h3>
              <div className="views-slider -mx-2">
                <ReactSlick
                  dots={false}
                  infinite={false}
                  speed={300}
                  slidesToShow={3.2}
                  slidesToScroll={1}
                  arrows={false}
                  swipeToSlide={true}
                  responsive={[
                    {
                      breakpoint: 640,
                      settings: {
                        slidesToShow: 2.5,
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2.2,
                      }
                    }
                  ]}
                >
                  <div className="px-2">
                    <div className="bg-gradient-to-br from-forest-green-600 to-forest-green-700 rounded-3xl p-5 text-white shadow-md">
                      <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-white/80 mb-1">WhatsApp</p>
                      <p className="text-xs text-white/70 mb-2">Per Day</p>
                      <p className="text-2xl font-bold text-white">{stats.whatsappViews}</p>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="bg-gradient-to-br from-sage-green-500 to-sage-green-600 rounded-3xl p-5 text-white shadow-md">
                      <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-white/80 mb-1">Calls</p>
                      <p className="text-xs text-white/70 mb-2">Per Day</p>
                      <p className="text-2xl font-bold text-white">{stats.callViews}</p>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="bg-gradient-to-br from-bronze-brown-500 to-bronze-brown-600 rounded-3xl p-5 text-white shadow-md">
                      <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-white/80 mb-1">Emails</p>
                      <p className="text-xs text-white/70 mb-2">Per Day</p>
                      <p className="text-2xl font-bold text-white">{stats.emailViews}</p>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <div className="bg-gradient-to-br from-gold-yellow-500 to-gold-yellow-600 rounded-3xl p-5 text-white shadow-md">
                      <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-xs text-white/80 mb-1">Location</p>
                      <p className="text-xs text-white/70 mb-2">Requests</p>
                      <p className="text-2xl font-bold text-white">{stats.locationRequests}</p>
                    </div>
                  </div>
                </ReactSlick>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Analytics Chart */}
          <Card className="col-span-2 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-neutral-dark">Monthly Analytics</h3>
              </div>
              
              {/* Filter Controls */}
              <div className="flex gap-2 mb-3">
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="flex-[2] px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Calls">Calls</option>
                  <option value="Emails">Emails</option>
                  <option value="Sales">Sales (LKR)</option>
                  <option value="Location Requests">Location Requests</option>
                </select>
                
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Custom">Custom Range</option>
                </select>
              </div>

              {/* Date Range Inputs - Show only when Custom is selected */}
              {selectedTimeRange === 'Custom' && (
                <div className="flex gap-2 mb-5">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                    />
                  </div>
                </div>
              )}

              {/* Chart Container with EventCore green background */}
              <div className="bg-gradient-to-br from-forest-green-50 via-sage-green-50 to-forest-green-100/50 rounded-2xl p-4 mt-5">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart
                    data={displayData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: -20,
                      bottom: 5
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#6D9773" strokeOpacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#0C3B2E', fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#0C3B2E', fontSize: 12 }}
                      tickFormatter={(value) => {
                        if (selectedCategory === 'Sales') {
                          return `${(value / 1000).toFixed(0)}k`;
                        }
                        return value;
                      }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #6D9773',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}
                      formatter={(value: any) => {
                        if (selectedCategory === 'Sales') {
                          return [`LKR ${value.toLocaleString()}`, selectedCategory];
                        }
                        return [value, selectedCategory];
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0C3B2E" 
                      strokeWidth={3}
                      dot={{ fill: '#0C3B2E', r: 5, strokeWidth: 2, stroke: 'white' }}
                      activeDot={{ r: 7, fill: '#6D9773', stroke: 'white', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-4 h-4 text-forest-green-500" />
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                  </div>
                  <p className="text-2xl font-bold text-neutral-dark">{stats.profileViews}</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-4 h-4 text-forest-green-500" />
                    <p className="text-sm text-muted-foreground">Package Views</p>
                  </div>
                  <p className="text-2xl font-bold text-neutral-dark">{stats.totalPackages}</p>
                  <p className="text-xs text-muted-foreground mt-1">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Views Analytics Chart */}
        <Card className="overflow-hidden" style={{ background: 'linear-gradient(135deg, #0C3B2E 0%, #6D9773 100%)' }}>
          <CardContent className="p-5">
            <div className="mb-4">
              <h3 className="text-white font-medium mb-3">Views Analytics</h3>
              
              {/* Metric and Time Range Selectors */}
              <div className="flex gap-2 mb-4">
                <select 
                  value={selectedViewsMetric}
                  onChange={(e) => setSelectedViewsMetric(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                >
                  <option value="Profile Views">Profile Views</option>
                  <option value="Package Views">Package Views</option>
                </select>
                
                <select 
                  value={selectedViewsTimeRange}
                  onChange={(e) => setSelectedViewsTimeRange(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Custom">Custom Range</option>
                </select>
              </div>

              {/* Date Range Inputs - Show only when Custom is selected */}
              {selectedViewsTimeRange === 'Custom' && (
                <div className="flex gap-2 mb-5">
                  <div className="flex-1">
                    <label className="text-xs text-white/80 mb-1 block">Start Date</label>
                    <input
                      type="date"
                      value={viewsStartDate}
                      onChange={(e) => setViewsStartDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-white/80 mb-1 block">End Date</label>
                    <input
                      type="date"
                      value={viewsEndDate}
                      onChange={(e) => setViewsEndDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-forest-green-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="bg-white/10 rounded-lg pt-4 pr-4 pb-4 pl-0">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={displayViewsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="white"
                    tick={{ fill: 'white', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="white"
                    tick={{ fill: 'white', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0C3B2E', 
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    labelFormatter={(label) => {
                      if (selectedViewsTimeRange === 'Custom') {
                        return label;
                      }
                      return label;
                    }}
                    formatter={(value: any) => {
                      return [value, selectedViewsMetric];
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0C3B2E" 
                    strokeWidth={3}
                    dot={{ fill: '#0C3B2E', r: 5, strokeWidth: 2, stroke: 'white' }}
                    activeDot={{ r: 7, fill: '#6D9773', stroke: 'white', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <h3 className="font-medium text-neutral-dark mb-3 mt-[5%]">Social Media Views</h3>
        <div className="relative">
          <ReactSlick
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            arrows={false}
            autoplay={false}
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              }
            ]}
          >
            {/* Instagram */}
            <div className="px-2">
              <Card className="overflow-hidden border-2 border-transparent hover:border-[#E4405F] transition-all duration-300 cursor-pointer group h-[180px]">
                <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Instagram className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl font-bold text-neutral-dark mb-1">2.4K</p>
                    <p className="text-xs text-muted-foreground">Profile Visits</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Facebook */}
            <div className="px-2">
              <Card className="overflow-hidden border-2 border-transparent hover:border-[#1877F2] transition-all duration-300 cursor-pointer group h-[180px]">
                <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Facebook className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl font-bold text-neutral-dark mb-1">1.8K</p>
                    <p className="text-xs text-muted-foreground">Page Views</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* LinkedIn */}
            <div className="px-2">
              <Card className="overflow-hidden border-2 border-transparent hover:border-[#0A66C2] transition-all duration-300 cursor-pointer group h-[180px]">
                <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#0A66C2] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Linkedin className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl font-bold text-neutral-dark mb-1">956</p>
                    <p className="text-xs text-muted-foreground">Profile Clicks</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Twitter/X */}
            <div className="px-2">
              <Card className="overflow-hidden border-2 border-transparent hover:border-black transition-all duration-300 cursor-pointer group h-[180px]">
                <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Twitter className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl font-bold text-neutral-dark mb-1">1.2K</p>
                    <p className="text-xs text-muted-foreground">Link Clicks</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* YouTube */}
            <div className="px-2">
              <Card className="overflow-hidden border-2 border-transparent hover:border-[#FF0000] transition-all duration-300 cursor-pointer group h-[180px]">
                <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF0000] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Youtube className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl font-bold text-neutral-dark mb-1">3.1K</p>
                    <p className="text-xs text-muted-foreground">Video Views</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Website */}
            <div className="px-2">
              <Card className="overflow-hidden border-2 border-transparent hover:border-forest-green-500 transition-all duration-300 cursor-pointer group h-[180px]">
                <CardContent className="p-5 text-center h-full flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-green-500 to-sage-green-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <p className="text-2xl font-bold text-neutral-dark mb-1">4.5K</p>
                    <p className="text-xs text-muted-foreground">Website Visits</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ReactSlick>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-auto p-4 hover:bg-forest-green-500 hover:text-white hover:border-forest-green-500 transition-colors duration-300"
              onClick={() => onNavigate('packages')}
            >
              <Package className="w-5 h-5 mr-3 text-forest-green-500" />
              <div className="text-left">
                <div className="font-medium">Add New Package</div>
                <div className="text-sm text-muted-foreground">Create new service package</div>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-auto p-4 hover:bg-forest-green-500 hover:text-white hover:border-forest-green-500 transition-colors duration-300"
              onClick={() => onNavigate('notifications')}
            >
              <BarChart3 className="w-5 h-5 mr-3 text-bronze-brown-500" />
              <div className="text-left">
                <div className="font-medium">View Notifications</div>
                <div className="text-sm text-muted-foreground">Check latest updates and bookings</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-auto p-4 hover:bg-forest-green-500 hover:text-white hover:border-forest-green-500 transition-colors duration-300"
            >
              <TrendingUp className="w-5 h-5 mr-3 text-gold-yellow-500" />
              <div className="text-left">
                <div className="font-medium">Request Main Promotion</div>
                <div className="text-sm text-muted-foreground">Get featured on homepage</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-auto p-4 hover:bg-forest-green-500 hover:text-white hover:border-forest-green-500 transition-colors duration-300"
            >
              <Camera className="w-5 h-5 mr-3 text-sage-green-500" />
              <div className="text-left">
                <div className="font-medium">Request Secondary Promotion</div>
                <div className="text-sm text-muted-foreground">Boost visibility in search results</div>
              </div>
            </Button>

            <Button 
              variant="outline" 
              className="w-full justify-start h-auto p-4 hover:bg-forest-green-500 hover:text-white hover:border-forest-green-500 transition-colors duration-300"
            >
              <User className="w-5 h-5 mr-3 text-bronze-brown-500" />
              <div className="text-left">
                <div className="font-medium">Request Featured Merchant</div>
                <div className="text-sm text-muted-foreground">Apply for featured merchant status</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Shortcuts */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Access</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => onNavigate('profile')}
              >
                <User className="w-6 h-6 text-forest-green-500" />
                <span className="text-sm">Profile</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => onNavigate('reviews')}
              >
                <MessageSquare className="w-6 h-6 text-gold-yellow-500" />
                <span className="text-sm">Reviews</span>
                <span className="text-xs text-muted-foreground">(24)</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-4">

      </div>

      {/* My Top Packages */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>My Top Packages</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('packages')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-forest-green-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">Premium Wedding Package</p>
                <p className="text-xs text-muted-foreground">LKR 45,000 • Photography</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-bronze-brown-500">12 views</span>
                </div>
              </div>
              <Badge className="bg-forest-green-500 text-white">Photography</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-sage-green-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">Basic Wedding Package</p>
                <p className="text-xs text-muted-foreground">LKR 25,000 • Photography</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-bronze-brown-500">8 views</span>
                </div>
              </div>
              <Badge className="bg-forest-green-500 text-white">Photography</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-bronze-brown-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">Destination Wedding Package</p>
                <p className="text-xs text-muted-foreground">LKR 75,000 • Photography</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-bronze-brown-500">5 views</span>
                </div>
              </div>
              <Badge className="bg-forest-green-500 text-white">Photography</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}