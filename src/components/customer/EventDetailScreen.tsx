import { ArrowLeft, Share2, Heart, MapPin, Calendar, Users, DollarSign, TrendingUp, CheckCircle, Clock, Sparkles, ChevronRight, ChevronDown, Plus, Edit2, Trash2, X, Save, List, Search, ChevronUp, Phone, MessageSquare, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Switch } from "../ui/switch";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import { useState } from "react";
import heroBackground from "figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png";
import type { CustomerScreen } from "./CustomerApp";
import type { Task } from "../../data/tasks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAvatarForEmail } from "../../data/users";
import { getVendor } from "../../data/vendors";

// Spotlight/Completed Event Data (from CustomerHome)
export interface EventData {
  id: string;
  eventTitle: string;
  eventType: string;
  image: string;
  date: string;
  location: string;
  guestCount: string;
  description: string;
  story: string;
  highlights: Array<{
    title: string;
    description: string;
  }>;
  vendors: Array<{
    category: string;
    name: string;
  }>;
  gallery: string[];
}

// User Created Event Data (from NewEventForm)
export interface CreatedEventData {
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
  categories?: Array<{
    id: string;
    name: string;
    selected: boolean;
  }>;
  budgetType?: string;
}

interface EventDetailScreenProps {
  event?: EventData;
  createdEvent?: CreatedEventData;
  categoryBudgets?: Record<string, { amount: number; percentage: number }>;
  eventVendors?: Array<{ 
    id: string; 
    category: string; 
    addedAt: string;
    comments?: string;
    agreedPrice?: string;
    priceFinalized?: boolean;
  }>;
  tasks?: Task[];
  setTasks?: (tasks: Task[]) => void;
  onTaskClick?: (taskId: string) => void;
  onCategoryClick?: (category: string) => void;
  onVendorSearch?: (category: string, maxPrice: number) => void;
  onBack: () => void;
  onNavigate: (screen: CustomerScreen) => void;
}

// Expense Item Interface
interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  status: 'paid' | 'pending' | 'partial';
}

// Category Expenses State
interface CategoryExpenses {
  [categoryId: string]: ExpenseItem[];
}

export function EventDetailScreen({ 
  event, 
  createdEvent,
  categoryBudgets = {},
  eventVendors = [],
  tasks = [],
  setTasks,
  onTaskClick,
  onCategoryClick,
  onVendorSearch,
  onBack, 
  onNavigate 
}: EventDetailScreenProps) {
  // Current logged-in user (in production, this would come from auth context)
  const currentUser = {
    name: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  };

  // Filter tasks for this event
  const eventTasks = createdEvent ? tasks.filter(task => task.eventId === createdEvent.id) : [];
  // Define all available categories (fallback for old events)
  const allAvailableCategories = [
    { id: 'venue', name: 'Venue', selected: false },
    { id: 'photography', name: 'Photography', selected: false },
    { id: 'catering', name: 'Catering', selected: false },
    { id: 'decoration', name: 'Decoration', selected: false },
    { id: 'music', name: 'Music & DJ', selected: false },
    { id: 'flowers', name: 'Flowers', selected: false }
  ];

  // Get all categories (merge event categories with defaults)
  const getAllCategories = () => {
    if (!createdEvent?.categories || createdEvent.categories.length === 0) {
      return allAvailableCategories;
    }
    
    // If event has categories, merge with all available to ensure we show everything
    const eventCategoryIds = createdEvent.categories.map(c => c.id);
    const missingCategories = allAvailableCategories.filter(
      c => !eventCategoryIds.includes(c.id)
    );
    
    return [...createdEvent.categories, ...missingCategories];
  };

  // Generate sample expenses based on actual categories
  const getInitialExpenses = (): CategoryExpenses => {
    if (!createdEvent?.categories) return {};
    
    const sampleExpenses: CategoryExpenses = {};
    const selectedCategories = createdEvent.categories.filter(c => c.selected);
    
    selectedCategories.forEach(category => {
      // Add sample expenses based on category ID
      switch (category.id) {
        case 'venue':
          sampleExpenses[category.id] = [
            { id: `${category.id}-1`, name: 'Venue Booking Deposit', amount: 50000, status: 'paid' },
            { id: `${category.id}-2`, name: 'Venue Final Payment', amount: 0, status: 'pending' },
          ];
          break;
        case 'catering':
          sampleExpenses[category.id] = [
            { id: `${category.id}-1`, name: 'Catering Advance', amount: 30000, status: 'paid' },
            { id: `${category.id}-2`, name: 'Menu Tasting Fee', amount: 5000, status: 'paid' },
          ];
          break;
        case 'photography':
          sampleExpenses[category.id] = [
            { id: `${category.id}-1`, name: 'Photography Package', amount: 25000, status: 'partial' },
          ];
          break;
        case 'decoration':
          sampleExpenses[category.id] = [
            { id: `${category.id}-1`, name: 'Floral Arrangements', amount: 15000, status: 'paid' },
            { id: `${category.id}-2`, name: 'Stage Decoration', amount: 0, status: 'pending' },
          ];
          break;
        case 'music':
          sampleExpenses[category.id] = [
            { id: `${category.id}-1`, name: 'DJ Booking Fee', amount: 12000, status: 'paid' },
            { id: `${category.id}-2`, name: 'Sound Equipment', amount: 8000, status: 'pending' },
          ];
          break;
        case 'flowers':
          sampleExpenses[category.id] = [
            { id: `${category.id}-1`, name: 'Bridal Bouquet', amount: 8000, status: 'paid' },
            { id: `${category.id}-2`, name: 'Centerpieces', amount: 12000, status: 'pending' },
          ];
          break;
        default:
          // Empty array for custom categories or any other categories
          sampleExpenses[category.id] = [];
          break;
      }
    });
    
    return sampleExpenses;
  };

  // State for managing expenses
  const [categoryExpenses, setCategoryExpenses] = useState<CategoryExpenses>(() => getInitialExpenses());

  // Dialog states
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{ id: string; name: string } | null>(null);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  
  // Form states
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseStatus, setExpenseStatus] = useState<'paid' | 'pending' | 'partial'>('pending');

  // Vendor expansion state
  const [expandedVendorId, setExpandedVendorId] = useState<string | null>(null);

  // Add new expense
  const handleAddExpense = () => {
    if (!selectedCategory || !expenseName || !expenseAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      status: expenseStatus,
    };

    setCategoryExpenses(prev => ({
      ...prev,
      [selectedCategory.id]: [...(prev[selectedCategory.id] || []), newExpense],
    }));

    toast.success(`Added "${expenseName}" to ${selectedCategory.name}`);
    
    // Reset form
    setExpenseName('');
    setExpenseAmount('');
    setExpenseStatus('pending');
    setIsAddExpenseOpen(false);
  };

  // Edit expense
  const handleEditExpense = () => {
    if (!selectedCategory || !editingExpense || !expenseName || !expenseAmount) {
      toast.error('Please fill in all fields');
      return;
    }

    setCategoryExpenses(prev => ({
      ...prev,
      [selectedCategory.id]: prev[selectedCategory.id].map(exp =>
        exp.id === editingExpense.id
          ? { ...exp, name: expenseName, amount: parseFloat(expenseAmount), status: expenseStatus }
          : exp
      ),
    }));

    toast.success('Expense updated successfully');
    
    // Reset form
    setExpenseName('');
    setExpenseAmount('');
    setExpenseStatus('pending');
    setEditingExpense(null);
    setIsEditExpenseOpen(false);
  };

  // Delete expense
  const handleDeleteExpense = (categoryId: string, expenseId: string, expenseName: string) => {
    setCategoryExpenses(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(exp => exp.id !== expenseId),
    }));
    toast.success(`Deleted "${expenseName}"`);
  };

  // Open add expense dialog
  const openAddExpense = (categoryId: string, categoryName: string) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setExpenseName('');
    setExpenseAmount('');
    setExpenseStatus('pending');
    setIsAddExpenseOpen(true);
  };

  // Open edit expense dialog
  const openEditExpense = (categoryId: string, categoryName: string, expense: ExpenseItem) => {
    setSelectedCategory({ id: categoryId, name: categoryName });
    setEditingExpense(expense);
    setExpenseName(expense.name);
    setExpenseAmount(expense.amount.toString());
    setExpenseStatus(expense.status);
    setIsEditExpenseOpen(true);
  };
  
  // Render spotlight/completed event
  if (event) {
    return (
      <div className="min-h-screen bg-white pb-20">
        <div className="relative">
          {/* Hero Image - Extended to top */}
          <div className="relative bg-[#E5E5E5] h-[36vh]">
            <ImageWithFallback
              src={event.image}
              alt={event.eventTitle}
              className="w-full h-full object-cover"
            />
            
            {/* Back, Heart and Share Buttons - Overlaid on Image */}
            <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-4 z-30">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Button>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
                >
                  <Heart className="w-5 h-5 text-white" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - Curved top */}
          <div className="bg-white px-5 pt-6 pb-5 rounded-t-3xl -mt-6 relative z-10">
            {/* Event Title */}
            <h1
              className="text-[#1a1a1a] mb-2"
              style={{ fontSize: "28px", fontWeight: 700, lineHeight: "1.2" }}
            >
              {event.eventTitle}
            </h1>

            {/* Event Type */}
            <div className="mb-4">
              <span className="inline-block bg-[#E8F4F1] text-[#0C3B2E] px-3 py-1.5 rounded-full text-sm font-medium">
                {event.eventType}
              </span>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex flex-col items-center bg-[#F8F9FA] rounded-[12px] p-3">
                <Calendar className="w-5 h-5 text-[#0C3B2E] mb-1.5" />
                <span className="text-[#666666] text-xs mb-0.5">Date</span>
                <span className="text-[#1a1a1a] text-sm font-semibold">{event.date}</span>
              </div>
              <div className="flex flex-col items-center bg-[#F8F9FA] rounded-[12px] p-3">
                <Users className="w-5 h-5 text-[#0C3B2E] mb-1.5" />
                <span className="text-[#666666] text-xs mb-0.5">Guests</span>
                <span className="text-[#1a1a1a] text-sm font-semibold">{event.guestCount}</span>
              </div>
              <div className="flex flex-col items-center bg-[#F8F9FA] rounded-[12px] p-3">
                <Sparkles className="w-5 h-5 text-[#0C3B2E] mb-1.5" />
                <span className="text-[#666666] text-xs mb-0.5">Photos</span>
                <span className="text-[#1a1a1a] text-sm font-semibold">{event.gallery.length}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 mb-6">
              <MapPin className="w-4 h-4 text-[#0C3B2E] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#666666]">{event.location}</p>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3
                className="text-[#1a1a1a] mb-2"
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                About This Event
              </h3>
              <p
                className="text-[#666666]"
                style={{ fontSize: "14px", fontWeight: 400, lineHeight: "1.6" }}
              >
                {event.description}
              </p>
            </div>

            {/* Story */}
            <div className="mb-6">
              <h3
                className="text-[#1a1a1a] mb-3"
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Event Story
              </h3>
              <div className="bg-gradient-to-br from-[#E8F4F1] to-[#F0F8F5] rounded-[16px] p-5">
                <p
                  className="text-[#1a1a1a] italic"
                  style={{ fontSize: "14px", fontWeight: 400, lineHeight: "1.7" }}
                >
                  "{event.story}"
                </p>
              </div>
            </div>

            {/* Event Highlights */}
            <div className="mb-6">
              <h3
                className="text-[#1a1a1a] mb-3"
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Event Highlights
              </h3>
              <div className="space-y-3">
                {event.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[12px] p-4 border border-gray-200"
                  >
                    <h4
                      className="text-[#1a1a1a] mb-1.5"
                      style={{ fontSize: "15px", fontWeight: 600 }}
                    >
                      {highlight.title}
                    </h4>
                    <p
                      className="text-[#666666]"
                      style={{ fontSize: "13px", fontWeight: 400, lineHeight: "1.5" }}
                    >
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="mb-6">
              <h3
                className="text-[#1a1a1a] mb-3"
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Event Gallery
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {event.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-[12px] overflow-hidden"
                  >
                    <ImageWithFallback
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Vendors Used */}
            <div className="mb-6">
              <h3
                className="text-[#1a1a1a] mb-3"
                style={{ fontSize: "18px", fontWeight: 600 }}
              >
                Vendors
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {event.vendors.map((vendor, index) => (
                  <div
                    key={index}
                    className="bg-[#F8F9FA] rounded-[12px] p-3"
                  >
                    <p
                      className="text-[#666666] mb-0.5"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      {vendor.category}
                    </p>
                    <p
                      className="text-[#1a1a1a]"
                      style={{ fontSize: "13px", fontWeight: 600 }}
                    >
                      {vendor.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] rounded-[20px] p-6 text-center">
              <h3
                className="text-white mb-2"
                style={{ fontSize: "18px", fontWeight: 700 }}
              >
                Plan Your Dream Event
              </h3>
              <p
                className="text-white/90 mb-4"
                style={{ fontSize: "13px", fontWeight: 400 }}
              >
                Work with the same amazing vendors
              </p>
              <Button
                onClick={() => onNavigate("vendor")}
                className="bg-[#FFBA00] hover:bg-[#E6A800] text-[#1a1a1a] px-8 py-2.5 rounded-full w-full shadow-lg"
                style={{ fontSize: "14px", fontWeight: 600 }}
              >
                Browse Vendors
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render user-created event with budgets
  if (createdEvent) {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-700 border-green-200';
        case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-amber-100 text-amber-700 border-amber-200';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'completed': return <CheckCircle className="w-4 h-4" />;
        case 'active': return <Clock className="w-4 h-4 animate-pulse" />;
        default: return <Sparkles className="w-4 h-4" />;
      }
    };

    const totalBudgetAllocated = Object.values(categoryBudgets).reduce((sum, b) => sum + b.amount, 0);
    const budgetPercentage = createdEvent.budget > 0 ? (createdEvent.spent / createdEvent.budget) * 100 : 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pb-24">
        {/* Futuristic Header with Glassmorphism */}
        <div className="relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C3B2E] via-[#115239] to-[#0C3B2E] opacity-95" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          
          <div className="relative overflow-hidden px-5 pt-6 pb-8 mb-6">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={heroBackground}
                alt="Event Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0C3B2E]/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header Actions - Back, Share, Favorite */}
              <div className="flex items-center justify-between mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onBack}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-105"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-105"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-105"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Event Title & Type */}
              <div className="space-y-3 mb-6">
                <h1 className="text-white text-3xl font-black leading-tight">
                  {createdEvent.name}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`${getStatusColor(createdEvent.status)} border px-3 py-1 rounded-full flex items-center gap-1.5`}>
                    {getStatusIcon(createdEvent.status)}
                    {createdEvent.status.charAt(0).toUpperCase() + createdEvent.status.slice(1)}
                  </Badge>
                  <Badge className="bg-white/15 text-white border-white/30 backdrop-blur-md px-3 py-1 rounded-full">
                    {createdEvent.type}
                  </Badge>
                </div>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white/70 text-xs">Event Date</p>
                      <p className="text-white font-black text-[12px]">
                        {new Date(createdEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-xs">Location</p>
                      <p className="text-white font-black truncate text-sm text-[12px]">
                        {createdEvent.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Curved Bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-white via-gray-50 to-white rounded-t-[32px]" />
        </div>

        {/* Main Content */}
        <div className="px-5 -mt-4 space-y-5">
          {/* Event Progress */}
          <Card className="border-2 border-gray-200 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-black text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#6D9773]" />
                  Event Progress
                </h3>
                <span className="text-2xl font-black text-[#0C3B2E]">
                  {createdEvent.progress}%
                </span>
              </div>
              <Progress value={createdEvent.progress} className="h-3 mb-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {createdEvent.completedTasks} of {createdEvent.totalTasks} tasks completed
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('task-calendar')}
                  className="text-[#6D9773] hover:text-[#0C3B2E] hover:bg-[#6D9773]/10"
                >
                  View Tasks
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Budget Overview Card */}
          <Card className="border-2 border-[#6D9773]/20 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-[#6D9773]/5 via-white to-[#FFBA00]/5 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFBA00] to-[#B46617] flex items-center justify-center shadow-lg">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900">Total Budget</h3>
                    <p className="text-xs text-gray-600">{createdEvent.budgetType === 'flexible' ? 'Flexible' : 'Fixed'} Budget</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] bg-clip-text text-transparent">
                    LKR {createdEvent.budget.toLocaleString('en-US')}
                  </p>
                  {totalBudgetAllocated !== createdEvent.budget && (
                    <p className="text-xs text-gray-600">
                      Allocated: LKR {totalBudgetAllocated.toLocaleString('en-US')}
                    </p>
                  )}
                </div>
              </div>

              {/* Budget Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Spent</span>
                  <span className="font-black text-gray-900">
                    LKR {createdEvent.spent.toLocaleString('en-US')} ({budgetPercentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6D9773] to-[#0C3B2E] rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Remaining: LKR {(createdEvent.budget - createdEvent.spent).toLocaleString('en-US')}</span>
                </div>
              </div>

              {/* Collapsible Budget Breakdown */}
              <Collapsible className="mt-4">
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-all group"
                  >
                    <span className="text-sm text-gray-700 group-hover:text-[#0C3B2E]">View All Categories & Spending</span>
                    <ChevronDown className="w-4 h-4 text-gray-700 group-hover:text-[#0C3B2E] transition-transform group-data-[state=open]:rotate-180" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="space-y-3 pt-3 border-t border-gray-200">
                    {getAllCategories().map((category) => {
                      const budget = categoryBudgets[category.id] || { amount: 0, percentage: 0 };

                      // Get expenses for this category
                      const itemizedSpending = categoryExpenses[category.id] || [];
                      
                      // Get vendor allocations for this category (only finalized prices count as spent)
                      const categoryVendors = eventVendors.filter(v => v.category === category.name);
                      const vendorSpent = categoryVendors.reduce((sum, vendorAllocation) => {
                        if (vendorAllocation.priceFinalized && vendorAllocation.agreedPrice) {
                          const price = parseFloat(vendorAllocation.agreedPrice.replace(/,/g, ''));
                          return sum + price;
                        }
                        return sum;
                      }, 0);
                      
                      const manualSpent = itemizedSpending.reduce((sum, item) => sum + item.amount, 0);
                      const spentAmount = manualSpent + vendorSpent;
                      const spentPercentage = budget.amount > 0 ? (spentAmount / budget.amount) * 100 : 0;
                      
                      // Calculate real category progress from tasks
                      const categoryTasksList = eventTasks.filter(task => 
                        task.category.toLowerCase() === category.name.toLowerCase() ||
                        (category.id === 'music' && task.category.toLowerCase().includes('entertainment'))
                      );
                      const categoryTasks = {
                        completed: categoryTasksList.filter(t => t.completed).length,
                        total: categoryTasksList.length
                      };
                      const categoryProgress = categoryTasks.total > 0 
                        ? Math.round((categoryTasks.completed / categoryTasks.total) * 100)
                        : 0;

                      return (
                        <div 
                          key={category.id} 
                          className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-sm"
                        >
                          {/* Header Section */}
                          <div className="flex items-center justify-between p-4 border-b-2 border-[#0C3B2E]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#0C3B2E] flex items-center justify-center shadow-md">
                                <Sparkles className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-black text-gray-900">{category.name}</h4>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-red-600 font-black">
                                -{spentAmount.toLocaleString('en-US')} LKR
                              </p>
                              <p className="text-xs text-[#6D9773] mt-0.5">
                                {spentAmount.toLocaleString('en-US')} / {budget.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })} LKR
                              </p>
                              <p className="text-xs text-gray-500">remaining</p>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="p-4 space-y-3">
                            {(() => {
                              // Get vendors allocated to this category from Event Management
                              const categoryVendors = eventVendors.filter(v => v.category === category.name);
                              
                              return (
                                <>
                                  {/* Vendors Added Section */}
                                  {categoryVendors.length > 0 && (
                                    <>
                                      <p className="text-xs font-semibold text-gray-700">Vendors Added</p>
                                      <div className="space-y-3">
                                        {categoryVendors.map((vendorRef) => {
                                          const vendorData = getVendor(vendorRef.id);
                                          if (!vendorData) return null;
                                          
                                          const isExpanded = expandedVendorId === vendorRef.id;
                                          
                                          return (
                                            <div key={vendorRef.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                              {/* Vendor Card */}
                                              <div className="p-3">
                                                {/* Top Row: Logo, Name & Price, Actions */}
                                                <div className="flex items-start gap-3 mb-3">
                                                  {/* Vendor Logo */}
                                                  <img 
                                                    src={vendorData.logo} 
                                                    alt={vendorData.name}
                                                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                                                  />
                                                  
                                                  {/* Vendor Name & Price */}
                                                  <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                      <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900">{vendorData.name}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">Starting from {vendorData.price}</p>
                                                      </div>
                                                      <div className="flex items-center gap-1 flex-shrink-0">
                                                        <Button
                                                          variant="ghost"
                                                          size="sm"
                                                          onClick={() => setExpandedVendorId(isExpanded ? null : vendorRef.id)}
                                                          className="h-6 w-6 p-0 hover:bg-gray-100"
                                                        >
                                                          {isExpanded ? (
                                                            <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
                                                          ) : (
                                                            <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
                                                          )}
                                                        </Button>
                                                        <Button
                                                          variant="ghost"
                                                          size="sm"
                                                          className="h-6 w-6 p-0 hover:bg-red-50"
                                                          disabled
                                                        >
                                                          <X className="w-3.5 h-3.5 text-red-500" />
                                                        </Button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                {/* Description and Price Row - Only show when collapsed */}
                                                {!isExpanded && (
                                                  <div className="flex items-start justify-between gap-3">
                                                    {/* Comments/Description */}
                                                    <div className="flex-1 min-w-0">
                                                      {vendorRef.comments && (
                                                        <p className="text-xs text-gray-600 leading-relaxed">
                                                          {vendorRef.comments}
                                                        </p>
                                                      )}
                                                    </div>
                                                    
                                                    {/* Agreed Price */}
                                                    <div className="flex-shrink-0 text-right">
                                                      {vendorRef.agreedPrice && (
                                                        <div>
                                                          <div className="flex items-center justify-end gap-1 mb-0.5">
                                                            <p className="text-[10px] text-gray-500">
                                                              {vendorRef.priceFinalized ? 'Actual:' : 'Agreed:'}
                                                            </p>
                                                            {vendorRef.priceFinalized && (
                                                              <CheckCircle className="w-3 h-3 text-green-600" />
                                                            )}
                                                          </div>
                                                          <p className={`text-sm font-semibold ${vendorRef.priceFinalized ? 'text-green-600' : 'text-[#0C3B2E]'}`}>
                                                            LKR {vendorRef.agreedPrice}
                                                          </p>
                                                        </div>
                                                      )}
                                                    </div>
                                                  </div>
                                                )}

                                                {/* Finalize Switch - Only show when collapsed */}
                                                {!isExpanded && vendorRef.agreedPrice && (
                                                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                                                    <Label htmlFor={`finalize-readonly-${vendorRef.id}`} className="text-xs text-gray-700 cursor-not-allowed">
                                                      Finalized Price
                                                    </Label>
                                                    <Switch
                                                      id={`finalize-readonly-${vendorRef.id}`}
                                                      checked={vendorRef.priceFinalized || false}
                                                      disabled
                                                      className="data-[state=checked]:bg-green-600"
                                                    />
                                                  </div>
                                                )}

                                                {/* Expanded Details */}
                                                {isExpanded && (
                                                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                                                    {/* Contact Information */}
                                                    <div className="bg-gray-50 p-3 rounded-lg space-y-2.5">
                                                      <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2 mb-1">
                                                          <MapPin className="w-3 h-3 text-[#6D9773]" />
                                                          <p className="text-[10px] font-semibold text-gray-700">Location</p>
                                                        </div>
                                                        <p className="text-xs text-gray-900">{vendorData.location || 'Location not available'}</p>
                                                      </div>

                                                      {/* Contact Options */}
                                                      <div className="space-y-1.5">
                                                        {/* Phone/Call */}
                                                        {vendorData.phone && (
                                                          <a
                                                            href={`tel:${vendorData.phone}`}
                                                            className="flex items-center gap-2 hover:text-[#6D9773] transition-colors group"
                                                          >
                                                            <Phone className="w-3 h-3 text-[#6D9773]" />
                                                            <span className="text-xs text-gray-900 group-hover:underline">{vendorData.phone}</span>
                                                          </a>
                                                        )}

                                                        {/* WhatsApp */}
                                                        {vendorData.phone && (
                                                          <a
                                                            href={`https://wa.me/${vendorData.phone.replace(/[\s+-]/g, '')}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 hover:text-green-600 transition-colors group"
                                                          >
                                                            <MessageSquare className="w-3 h-3 text-green-600" />
                                                            <span className="text-xs text-gray-900 group-hover:underline">WhatsApp</span>
                                                          </a>
                                                        )}

                                                        {/* Email */}
                                                        {vendorData.email && (
                                                          <a
                                                            href={`mailto:${vendorData.email}`}
                                                            className="flex items-center gap-2 hover:text-[#B46617] transition-colors group"
                                                          >
                                                            <Mail className="w-3 h-3 text-[#B46617]" />
                                                            <span className="text-xs text-gray-900 group-hover:underline">{vendorData.email}</span>
                                                          </a>
                                                        )}
                                                      </div>
                                                    </div>

                                                    {/* Comments and Agreed Price in expanded view */}
                                                    <div className="flex items-start justify-between gap-3">
                                                      {/* Comments/Description */}
                                                      <div className="flex-1 min-w-0">
                                                        {vendorRef.comments && (
                                                          <div>
                                                            <p className="text-[10px] font-semibold text-gray-700 mb-1">Comments</p>
                                                            <p className="text-xs text-gray-600 leading-relaxed">
                                                              {vendorRef.comments}
                                                            </p>
                                                          </div>
                                                        )}
                                                      </div>
                                                      
                                                      {/* Agreed Price */}
                                                      <div className="flex-shrink-0 text-right">
                                                        {vendorRef.agreedPrice && (
                                                          <div>
                                                            <div className="flex items-center justify-end gap-1 mb-0.5">
                                                              <p className="text-[10px] text-gray-500">
                                                                {vendorRef.priceFinalized ? 'Actual:' : 'Agreed:'}
                                                              </p>
                                                              {vendorRef.priceFinalized && (
                                                                <CheckCircle className="w-3 h-3 text-green-600" />
                                                              )}
                                                            </div>
                                                            <p className={`text-sm font-semibold ${vendorRef.priceFinalized ? 'text-green-600' : 'text-[#0C3B2E]'}`}>
                                                              LKR {vendorRef.agreedPrice}
                                                            </p>
                                                          </div>
                                                        )}
                                                      </div>
                                                    </div>

                                                    {/* Finalize Switch in expanded view */}
                                                    {vendorRef.agreedPrice && (
                                                      <div className={`p-3 rounded-lg border-2 ${vendorRef.priceFinalized ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                                        <div className="flex items-center justify-between">
                                                          <div className="flex-1">
                                                            <Label htmlFor={`finalize-expanded-${vendorRef.id}`} className="text-xs font-semibold text-gray-900 cursor-not-allowed flex items-center gap-1.5">
                                                              {vendorRef.priceFinalized && (
                                                                <CheckCircle className="w-3.5 h-3.5 text-green-600 fill-green-600" />
                                                              )}
                                                              Finalize Price
                                                            </Label>
                                                            <p className="text-[10px] text-gray-600 mt-0.5">
                                                              {vendorRef.priceFinalized 
                                                                ? 'This price is locked and counts as actual spend'
                                                                : 'Price marked as final agreed price for budget tracking'}
                                                            </p>
                                                          </div>
                                                          <Switch
                                                            id={`finalize-expanded-${vendorRef.id}`}
                                                            checked={vendorRef.priceFinalized || false}
                                                            disabled
                                                            className="data-[state=checked]:bg-green-600"
                                                          />
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </Card>

          {/* Description */}
          {createdEvent.description && (
            <Card className="border-2 border-gray-200 shadow-md">
              <CardContent className="p-5">
                <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFBA00]" />
                  Event Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {createdEvent.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Tasks Section */}
          {createdEvent && (
            <Card className="border-2 border-gray-200 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-[#0C3B2E] to-[#115239] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-white" />
                    <h3 className="font-black text-white">Tasks</h3>
                  </div>
                  <Button
                    onClick={() => onNavigate('task-calendar')}
                    className="h-8 px-4 bg-white hover:bg-gray-100 text-[#0C3B2E]"
                  >
                    View All
                  </Button>
                </div>
                <p className="text-white/80 text-xs mt-1">
                  {eventTasks.filter(t => t.completed).length} of {eventTasks.length} tasks completed
                </p>
              </div>
              <CardContent className="p-5">
                {eventTasks.length > 0 ? (
                  <div className="space-y-3">
                    {eventTasks.slice(0, 5).map((task) => {
                      const isCompleted = task.completed;
                      const avatarInfo = task.assignedTo && task.assignedTo.length > 0 
                        ? getAvatarForEmail(task.assignedTo[0])
                        : null;

                      return (
                        <div 
                          key={task.id}
                          onClick={() => onTaskClick && onTaskClick(task.id)}
                          className={`group p-4 border-2 rounded-xl transition-all duration-300 cursor-pointer ${
                            isCompleted 
                              ? 'bg-gray-50 border-gray-200' 
                              : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-[#6D9773] hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                isCompleted 
                                  ? 'bg-[#6D9773] border-[#6D9773]' 
                                  : 'border-gray-300 group-hover:border-[#6D9773]'
                              }`}>
                                {isCompleted && <CheckCircle className="w-4 h-4 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                  {task.title}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`text-xs px-2 py-0 h-5 ${
                                    task.priority === 'high' 
                                      ? 'bg-red-100 text-red-700 border-red-200' 
                                      : task.priority === 'medium'
                                      ? 'bg-orange-100 text-orange-700 border-orange-200'
                                      : 'bg-green-100 text-green-700 border-green-200'
                                  }`}>
                                    {task.priority}
                                  </Badge>
                                  <span className="text-xs text-gray-500">{task.category}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {/* Avatar or Current User */}
                              {!task.assignedTo || task.assignedTo.length === 0 ? (
                                <Avatar className="w-8 h-8 border-2 border-white">
                                  <AvatarImage src={currentUser.avatar} />
                                  <AvatarFallback className="text-xs bg-[#0C3B2E] text-white">
                                    {currentUser.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              ) : avatarInfo && (
                                <Avatar className="w-8 h-8 border-2 border-white">
                                  <AvatarImage src={avatarInfo.url} />
                                  <AvatarFallback className="text-xs bg-[#0C3B2E] text-white">
                                    {avatarInfo.isRegistered 
                                      ? avatarInfo.name.split(' ').map(n => n[0]).join('')
                                      : task.assignedTo[0].charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#0C3B2E] transition-colors" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {eventTasks.length > 5 && (
                      <Button
                        onClick={() => onNavigate('task-calendar')}
                        variant="outline"
                        className="w-full border-2 border-dashed border-gray-300 hover:border-[#0C3B2E] text-[#0C3B2E] hover:bg-[#0C3B2E]/5"
                      >
                        View {eventTasks.length - 5} More Tasks
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <List className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No tasks yet for this event</p>
                    <Button
                      onClick={() => onNavigate('task-calendar')}
                      className="bg-gradient-to-r from-[#6D9773] to-[#0C3B2E] hover:from-[#5a8060] hover:to-[#0a2f23] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Tasks
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Budget Breakdown by Category */}
          {createdEvent.categories && createdEvent.categories.length > 0 && (
            <Card className="border-2 border-gray-200 shadow-md overflow-hidden">

              <CardContent className="p-5">
                <div className="space-y-4">
                  {createdEvent.categories.filter(c => c.selected).map((category) => {
                    const budget = categoryBudgets[category.id];
                    if (!budget) return null;

                    return (
                      <div 
                        key={category.id} 
                        className="group p-4 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl hover:border-[#6D9773] hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                              <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-black text-gray-900">{category.name}</h4>
                              <p className="text-xs text-gray-600">Service Category</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-black text-[#0C3B2E]">
                              LKR {budget.amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                            </p>
                            <p className="text-xs text-gray-600">{budget.percentage.toFixed(1)}% of total</p>
                          </div>
                        </div>
                        
                        {/* Visual Progress Bar */}
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FFBA00] to-[#B46617] rounded-full transition-all duration-1000"
                            style={{ width: `${budget.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-[#6D9773] via-[#0C3B2E] to-[#115239] p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative">
                <Sparkles className="w-12 h-12 text-[#FFBA00] mx-auto mb-3" />
                <h3 className="text-white text-xl font-black mb-2">
                  Ready to Add Services?
                </h3>
                <p className="text-white/90 text-sm mb-5">
                  Browse vendors and book services for your event
                </p>
                <Button
                  onClick={() => onNavigate("vendor")}
                  className="bg-[#FFBA00] hover:bg-[#E6A800] text-[#0C3B2E] px-8 py-3 rounded-full shadow-2xl hover:shadow-[0_0_40px_rgba(255,186,0,0.5)] transition-all duration-300 hover:scale-105 font-black"
                >
                  Browse Vendors
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Add Expense Dialog */}
        <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#0C3B2E]" />
                Add Expense to {selectedCategory?.name}
              </DialogTitle>
              <DialogDescription>
                Add a new expense item to track your spending in this category.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  placeholder="e.g., Venue Deposit"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-amount">Amount (LKR)</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="0"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expense-status">Payment Status</Label>
                <Select value={expenseStatus} onValueChange={(value: 'paid' | 'pending' | 'partial') => setExpenseStatus(value)}>
                  <SelectTrigger id="expense-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsAddExpenseOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddExpense}
                className="bg-gradient-to-r from-[#6D9773] to-[#0C3B2E] hover:from-[#5a8060] hover:to-[#0a2f23] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Expense Dialog */}
        <Dialog open={isEditExpenseOpen} onOpenChange={setIsEditExpenseOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-[#0C3B2E]" />
                Edit Expense
              </DialogTitle>
              <DialogDescription>
                Update the details of this expense item.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-expense-name">Expense Name</Label>
                <Input
                  id="edit-expense-name"
                  placeholder="e.g., Venue Deposit"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expense-amount">Amount (LKR)</Label>
                <Input
                  id="edit-expense-amount"
                  type="number"
                  placeholder="0"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-expense-status">Payment Status</Label>
                <Select value={expenseStatus} onValueChange={(value: 'paid' | 'pending' | 'partial') => setExpenseStatus(value)}>
                  <SelectTrigger id="edit-expense-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsEditExpenseOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditExpense}
                className="bg-gradient-to-r from-[#6D9773] to-[#0C3B2E] hover:from-[#5a8060] hover:to-[#0a2f23] text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Fallback
  return (
    <div className="min-h-screen bg-white p-5">
      <Button onClick={onBack}>Go Back</Button>
      <p className="mt-4 text-gray-600">No event data available</p>
    </div>
  );
}
