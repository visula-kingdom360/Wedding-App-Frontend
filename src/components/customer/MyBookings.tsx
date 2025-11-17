import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { EventCard } from '../shared/EventCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, MapPin, Clock, User, Plus, CheckCircle, AlertCircle, Search, Bell, ArrowLeft } from 'lucide-react';
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface Event {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  progress: number;
  description: string;
  totalTasks: number;
  completedTasks: number;
  budget: number;
  spent: number;
}

interface MyBookingsProps {
  user?: User | null;
  onNewEvent?: () => void;
  onManageEvent?: (eventId: string) => void;
  onViewEvent?: (eventId: string, event: Event) => void;
  onNavigate?: (screen: string) => void;
  onBack?: () => void;
  userCreatedEvents?: Event[];
}

export function MyBookings({ user, onNewEvent, onManageEvent, onViewEvent, onNavigate, onBack, userCreatedEvents = [] }: MyBookingsProps) {
  const [activeTab, setActiveTab] = useState('current');
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [pastEventIndex, setPastEventIndex] = useState(0);
  
  // Calendar state
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const monthScrollRef = useRef<HTMLDivElement>(null);
  const dateScrollRef = useRef<HTMLDivElement>(null);
  
  // Generate years for dropdown (current year - 2 to current year + 5)
  const years = Array.from({ length: 8 }, (_, i) => selectedYear - 2 + i);
  
  // Month names
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
  
  // Generate dates for selected month
  const getDatesInMonth = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
    const dates = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      dates.push({
        date: i,
        day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()],
        fullDate: date
      });
    }
    return dates;
  };
  
  const datesInMonth = getDatesInMonth();
  
  // Auto-scroll selected month into view
  useEffect(() => {
    if (monthScrollRef.current) {
      const monthButtons = monthScrollRef.current.children;
      const selectedButton = monthButtons[selectedMonth] as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedMonth]);
  
  // Auto-scroll selected date into view
  useEffect(() => {
    if (dateScrollRef.current) {
      const dateButtons = dateScrollRef.current.children;
      const selectedButton = dateButtons[selectedDate - 1] as HTMLElement;
      if (selectedButton) {
        selectedButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedDate, selectedMonth, selectedYear]);

  const getFirstName = (user: User | null | undefined) => {
    if (!user) return 'Guest';
    return user.name.split(' ')[0];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Mock events - shown only if no user-created events exist
  const mockCurrentEvents: Event[] = [
    {
      id: '1',
      name: 'Birthday Party',
      type: 'Birthday',
      date: '2024-12-15',
      location: 'Grand Ballroom, Hotel Paradise',
      status: 'active',
      progress: 67,
      description: 'A wonderful birthday celebration with family and friends',
      totalTasks: 15,
      completedTasks: 10,
      budget: 200000,
      spent: 134000
    },
    {
      id: '2',
      name: 'Sarah & John\'s Wedding',
      type: 'Wedding',
      date: '2025-03-20',
      location: 'Botanical Gardens, Colombo',
      status: 'planning',
      progress: 23,
      description: 'An elegant outdoor wedding ceremony',
      totalTasks: 25,
      completedTasks: 6,
      budget: 500000,
      spent: 75000
    }
  ];

  // Combine user-created events with mock events
  const currentEvents: Event[] = userCreatedEvents.length > 0 
    ? [...userCreatedEvents, ...mockCurrentEvents]
    : mockCurrentEvents;

  const pastEvents: Event[] = [
    {
      id: '3',
      name: 'Anniversary Celebration',
      type: 'Anniversary',
      date: '2024-08-10',
      location: 'Beach Resort, Galle',
      status: 'completed',
      progress: 100,
      description: '25th wedding anniversary celebration',
      totalTasks: 12,
      completedTasks: 12,
      budget: 150000,
      spent: 142000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'planning':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // Carousel navigation handlers
  const handleCurrentPrevious = () => {
    setCurrentEventIndex(prev => Math.max(0, prev - 1));
  };

  const handleCurrentNext = () => {
    setCurrentEventIndex(prev => Math.min(currentEvents.length - 1, prev + 1));
  };

  const handlePastPrevious = () => {
    setPastEventIndex(prev => Math.max(0, prev - 1));
  };

  const handlePastNext = () => {
    setPastEventIndex(prev => Math.min(pastEvents.length - 1, prev + 1));
  };



  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      {/* Light Green Curved Top Header Section with Profile */}
      <div className="bg-cover bg-center bg-no-repeat rounded-b-[32px] pb-6 mb-6 shadow-sm" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="px-4 pt-4">
          {/* Greeting and Profile */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="text-white hover:bg-white/20 p-2 h-[45px] w-[45px] rounded-full flex items-center justify-center flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <button
              onClick={() => onNavigate && onNavigate('notifications')}
              className="relative h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <Bell className="h-6 w-6 text-[#FFBA00]" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Vendors, Venues, Services"
              className="pl-12 h-14 bg-white border-0 rounded-full shadow-md text-base placeholder:text-muted-foreground focus:ring-2 focus:ring-forest-green-500 cursor-pointer"
              readOnly
              onClick={() => onNavigate?.('vendor')}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 pb-6">
        {/* Header */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl">My Events</h2>
            <Button 
              onClick={onNewEvent}
              className="bg-rose-500 hover:bg-rose-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </div>
          <p className="text-muted-foreground">Manage all your events in one place</p>
        </div>

      {/* Stats Cards */}
      <div className="px-4">
        <div className="grid grid-cols-3 gap-3">
          {/* Active Events Card */}
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0C3B2E] via-[#0F4A38] to-[#0C3B2E] p-5 min-h-[140px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#6D9773]/20">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Top icon */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#6D9773]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-[#FFBA00]" />
              </div>
              <div className="w-2 h-2 rounded-full bg-[#FFBA00] animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-left mt-3">
              <p className="text-[10px] font-bold text-[#6D9773] uppercase tracking-wider mb-1">Active Events</p>
              <p className="text-4xl font-black text-white leading-none group-hover:text-[#FFBA00] transition-colors duration-300">{currentEvents.length}</p>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6D9773] via-[#FFBA00] to-[#6D9773] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Completed Card */}
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6D9773] via-[#7FAA85] to-[#6D9773] p-5 min-h-[140px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Top icon */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-left mt-3">
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-1">Completed</p>
              <p className="text-4xl font-black text-white leading-none group-hover:scale-110 transition-transform duration-300">{pastEvents.length}</p>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-[#FFBA00] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Progress Card */}
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0C3B2E] via-[#0F5A42] to-[#0C3B2E] p-5 min-h-[140px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#6D9773]/30">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            {/* Animated dots pattern */}
            <div className="absolute top-4 right-4 flex gap-1 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
              <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
              <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-75" />
              <div className="w-1 h-1 rounded-full bg-white animate-pulse delay-150" />
            </div>
            
            {/* Top icon */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#6D9773]/20 backdrop-blur-sm flex items-center justify-center group-hover:rotate-180 transition-transform duration-500">
                <div className="relative w-7 h-7">
                  <div className="absolute inset-0 rounded-full border-3 border-white/30 border-t-white" />
                  <div className="absolute inset-2 rounded-full bg-white" />
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-[#6D9773] animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 text-left mt-3">
              <p className="text-[10px] font-bold text-white/90 uppercase tracking-wider mb-1">Avg Progress</p>
              <p className="text-4xl font-black text-white leading-none group-hover:text-[#6D9773] transition-colors duration-300">
                {Math.round(currentEvents.reduce((sum, event) => sum + event.progress, 0) / Math.max(currentEvents.length, 1))}%
              </p>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6D9773] via-white to-[#6D9773] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      {/* Events Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Clean Calendar Selector */}
          <div className="mb-6 bg-white rounded-2xl p-4">
            {/* Top Bar - Year and Selected Date */}
            <div className="flex items-center justify-between mb-4">
              <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(parseInt(val))}>
                <SelectTrigger className="w-[100px] h-9 bg-transparent text-gray-900 border-0 hover:bg-gray-50 rounded-lg px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 rounded-lg">
                  {years.map((year) => (
                    <SelectItem 
                      key={year} 
                      value={year.toString()}
                      className="text-gray-900 hover:bg-gray-100 focus:bg-gray-100 data-[state=checked]:bg-transparent data-[state=checked]:text-gray-900"
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="text-right">
                <p className="text-xs text-gray-500">Selected</p>
                <p className="font-black text-sm text-gray-900">
                  {monthNames[selectedMonth]} {selectedDate}, {selectedYear}
                </p>
              </div>
            </div>

            {/* Month Tabs - Clean minimal design */}
            <div className="relative mb-5">
              <div 
                ref={monthScrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-8 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
              >
                {monthNames.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => setSelectedMonth(index)}
                    className={`flex-shrink-0 py-1 transition-all duration-300 snap-center border-b-2 ${
                      selectedMonth === index
                        ? 'text-gray-900 border-gray-900 scale-105'
                        : 'text-gray-400 border-transparent hover:text-gray-600 hover:scale-102'
                    }`}
                  >
                    <span className="text-sm">
                      {month}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Slider - Modern design with date on top, day below, and dots */}
            <div className="relative">
              <div 
                ref={dateScrollRef}
                className="flex gap-1 overflow-x-auto scrollbar-hide px-8 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth' }}
              >
                {datesInMonth.map((dateItem) => {
                  const isToday = dateItem.date === today.getDate() && 
                                  selectedMonth === today.getMonth() && 
                                  selectedYear === today.getFullYear();
                  const isSelected = selectedDate === dateItem.date;
                  const hasEvents = dateItem.date % 3 === 0; // Mock: every 3rd date has events
                  
                  return (
                    <button
                      key={dateItem.date}
                      onClick={() => setSelectedDate(dateItem.date)}
                      className={`flex-shrink-0 w-12 py-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 snap-center ${
                        isSelected
                          ? 'bg-[#0C3B2E] scale-105 shadow-md'
                          : 'hover:bg-gray-50 hover:scale-105'
                      }`}
                    >
                      <span className={`text-lg font-semibold mb-0.5 transition-all duration-300 ${
                        isSelected ? 'text-white' : 'text-gray-900'
                      }`}>
                        {dateItem.date}
                      </span>
                      <span className={`text-[10px] mb-1.5 transition-all duration-300 ${
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {dateItem.day}
                      </span>
                      {/* Indicator dots */}
                      <div className="flex gap-0.5">
                        {hasEvents && (
                          <div className={`w-1 h-1 rounded-full transition-all duration-300 ${
                            isSelected ? 'bg-[#FFBA00]' : 'bg-blue-500'
                          }`} />
                        )}
                        {isToday && !isSelected && (
                          <div className="w-1 h-1 rounded-full bg-[#0C3B2E]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modern Segmented Control Style Tabs */}
          <div className="relative mb-6">
            {/* Selection Chip Style Tabs */}
            <TabsList className="w-full h-auto p-2 bg-white/40 backdrop-blur-md rounded-[24px] border-2 border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.08)] grid grid-cols-2 gap-3">
              
              {/* Current Events Selector */}
              <TabsTrigger 
                value="current"
                className="group relative h-[72px] rounded-[18px] overflow-hidden transition-all duration-400 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0C3B2E] data-[state=active]:via-[#115239] data-[state=active]:to-[#0C3B2E] data-[state=active]:shadow-[0_6px_20px_rgba(12,59,46,0.35),0_0_0_2px_rgba(109,151,115,0.3)] data-[state=active]:scale-[1.02] data-[state=inactive]:bg-white/70 data-[state=inactive]:hover:bg-white/90 data-[state=inactive]:hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] data-[state=inactive]:hover:scale-[1.01] border-0"
              >
                {/* Pulse effect on active */}
                <div className="absolute inset-0 data-[state=active]:animate-pulse data-[state=active]:bg-[#6D9773]/10 opacity-0 data-[state=active]:opacity-100" />
                
                {/* Shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative z-10 flex items-center justify-center gap-3 px-5">
                  {/* Large Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 group-data-[state=active]:from-[#FFBA00] group-data-[state=active]:to-[#B46617] flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-300">
                      <Calendar className="w-6 h-6 text-[#0C3B2E] group-data-[state=active]:text-white group-hover:rotate-6 transition-transform duration-300" strokeWidth={2.5} />
                    </div>
                    {/* Count badge overlay */}
                    {currentEvents.length > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-gradient-to-br from-[#FFBA00] to-[#B46617] flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-[10px] font-black leading-none">{currentEvents.length}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="font-black text-base text-gray-900 group-data-[state=active]:text-white leading-tight transition-colors duration-300">
                      Current
                    </span>
                    <span className="text-xs font-semibold text-gray-600 group-data-[state=active]:text-white/90 leading-tight transition-colors duration-300">
                      Active Events
                    </span>
                  </div>

                  {/* Selection checkmark */}
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 group-data-[state=active]:border-white group-data-[state=active]:bg-white/20 flex items-center justify-center opacity-0 group-data-[state=active]:opacity-100 transition-all duration-300 mr-2">
                    <div className="w-2 h-2 rounded-full bg-white group-data-[state=active]:scale-100 scale-0 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-[#0C3B2E]/40 to-transparent blur-md opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
              </TabsTrigger>

              {/* Past Events Selector */}
              <TabsTrigger 
                value="past"
                className="group relative h-[72px] rounded-[18px] overflow-hidden transition-all duration-400 data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#6D9773] data-[state=active]:via-[#7FAA85] data-[state=active]:to-[#6D9773] data-[state=active]:shadow-[0_6px_20px_rgba(109,151,115,0.35),0_0_0_2px_rgba(12,59,46,0.2)] data-[state=active]:scale-[1.02] data-[state=inactive]:bg-white/70 data-[state=inactive]:hover:bg-white/90 data-[state=inactive]:hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)] data-[state=inactive]:hover:scale-[1.01] border-0"
              >
                {/* Pulse effect on active */}
                <div className="absolute inset-0 data-[state=active]:animate-pulse data-[state=active]:bg-white/10 opacity-0 data-[state=active]:opacity-100" />
                
                {/* Shine sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative z-10 flex items-center justify-center gap-3 px-5">
                  {/* Large Icon */}
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 group-data-[state=active]:from-white/30 group-data-[state=active]:to-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-300 backdrop-blur-sm">
                      <CheckCircle className="w-6 h-6 text-[#6D9773] group-data-[state=active]:text-white group-hover:rotate-6 transition-transform duration-300" strokeWidth={2.5} />
                    </div>
                    {/* Count badge overlay */}
                    {pastEvents.length > 0 && (
                      <div className="absolute -top-1.5 -right-1.5 min-w-[22px] h-[22px] px-1.5 rounded-full bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-[10px] font-black leading-none">{pastEvents.length}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Text */}
                  <div className="flex flex-col items-start flex-1 min-w-0">
                    <span className="font-black text-base text-gray-900 group-data-[state=active]:text-white leading-tight transition-colors duration-300">
                      Past
                    </span>
                    <span className="text-xs font-semibold text-gray-600 group-data-[state=active]:text-white/90 leading-tight transition-colors duration-300">
                      Completed
                    </span>
                  </div>

                  {/* Selection checkmark */}
                  <div className="w-6 h-6 rounded-full border-2 border-gray-400 group-data-[state=active]:border-white group-data-[state=active]:bg-white/20 flex items-center justify-center opacity-0 group-data-[state=active]:opacity-100 transition-all duration-300 mr-2">
                    <div className="w-2 h-2 rounded-full bg-white group-data-[state=active]:scale-100 scale-0 transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-gradient-to-r from-transparent via-[#6D9773]/40 to-transparent blur-md opacity-0 data-[state=active]:opacity-100 transition-opacity duration-500" />
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content with smooth transitions */}
          <TabsContent value="current" className="space-y-4 mt-0 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
            {currentEvents.length === 0 ? (
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-gray-50/50 to-white border-2 border-dashed border-gray-200/60 shadow-lg">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBDM0IyRSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
                <CardContent className="relative p-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-[20px] bg-gradient-to-br from-[#0C3B2E]/10 via-[#6D9773]/5 to-[#FFBA00]/10 flex items-center justify-center shadow-inner backdrop-blur-sm">
                    <Calendar className="w-10 h-10 text-[#0C3B2E] opacity-60" />
                  </div>
                  <h3 className="text-xl mb-2 font-black text-gray-900">No current events</h3>
                  <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                    Start planning your next special event and bring your vision to life
                  </p>
                  <Button 
                    onClick={onNewEvent}
                    className="group h-12 px-8 bg-gradient-to-br from-[#0C3B2E] via-[#0F4A38] to-[#0C3B2E] hover:shadow-[0_12px_32px_rgba(12,59,46,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 text-white rounded-2xl relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="relative">Create Your First Event</span>
                  </Button>
                </CardContent>
              </div>
            ) : (
              <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                <EventCard 
                  event={currentEvents[currentEventIndex]} 
                  onManage={onManageEvent}
                  onView={(eventId) => onViewEvent?.(eventId, currentEvents[currentEventIndex])}
                  showProgress={true}
                  currentIndex={currentEventIndex}
                  totalEvents={currentEvents.length}
                  onPrevious={handleCurrentPrevious}
                  onNext={handleCurrentNext}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-0 animate-in fade-in-50 slide-in-from-bottom-5 duration-700">
            {pastEvents.length === 0 ? (
              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-gray-50/50 to-white border-2 border-dashed border-gray-200/60 shadow-lg">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZEOTc3MyIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
                <CardContent className="relative p-10 text-center">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-[20px] bg-gradient-to-br from-[#6D9773]/10 via-[#0C3B2E]/5 to-[#6D9773]/10 flex items-center justify-center shadow-inner backdrop-blur-sm">
                    <CheckCircle className="w-10 h-10 text-[#6D9773] opacity-60" />
                  </div>
                  <h3 className="text-xl mb-2 font-black text-gray-900">No past events</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    Completed events will appear here for your records
                  </p>
                </CardContent>
              </div>
            ) : (
              <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                <EventCard 
                  event={pastEvents[pastEventIndex]} 
                  onView={(eventId) => onViewEvent?.(eventId, pastEvents[pastEventIndex])}
                  showProgress={true}
                  currentIndex={pastEventIndex}
                  totalEvents={pastEvents.length}
                  onPrevious={handlePastPrevious}
                  onNext={handlePastNext}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
}