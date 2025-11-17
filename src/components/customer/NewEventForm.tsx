import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Checkbox } from '../ui/checkbox';
import { CategoryCard } from '../shared/CategoryCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Plus,
  Camera,
  Utensils,
  Music,
  Flower,
  Car,
  Sparkles,
  Bell,
  Search,
  Check,
  Zap,
  TrendingUp,
  Users
} from 'lucide-react';
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface NewEventFormProps {
  user: User | null;
  onBack: () => void;
  onCreateEvent: (eventData: any) => void;
  onNavigate?: (screen: string) => void;
}

export function NewEventForm({ user, onBack, onCreateEvent, onNavigate }: NewEventFormProps) {
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: '',
    description: '',
    date: '',
    location: '',
    guestCount: '',
    totalBudget: '',
    budgetType: 'flexible'
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [filterByLocation, setFilterByLocation] = useState(false);

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

  const suggestedCategories = [
    { id: 'venue', name: 'Venue', icon: MapPin, price: 'LKR 200,000', selected: false },
    { id: 'photography', name: 'Photography', icon: Camera, price: 'LKR 50,000', selected: false },
    { id: 'catering', name: 'Catering', icon: Utensils, price: 'LKR 150,000', selected: false },
    { id: 'decoration', name: 'Decoration', icon: Sparkles, price: 'LKR 75,000', selected: false },
    { id: 'music', name: 'Music & DJ', icon: Music, price: 'LKR 40,000', selected: false },
    { id: 'flowers', name: 'Flowers', icon: Flower, price: 'LKR 25,000', selected: false }
  ];

  const [selectedCategories, setSelectedCategories] = useState(suggestedCategories);
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, { amount: number; percentage: number }>>({});
  const [manualBudgets, setManualBudgets] = useState<Record<string, number>>({});
  
  // Calculate the displayed total budget (auto-updates in flexible mode)
  const getDisplayedBudget = () => {
    const isFlexible = formData.budgetType === 'flexible';
    const hasCustomBudgets = Object.keys(manualBudgets).length > 0;
    
    if (isFlexible && hasCustomBudgets && Object.keys(categoryBudgets).length > 0) {
      // In flexible mode with custom budgets, show the actual total
      const actualTotal = Object.values(categoryBudgets).reduce((sum, b) => sum + b.amount, 0);
      return actualTotal.toFixed(0);
    }
    
    // Otherwise show the manually entered budget
    return formData.totalBudget;
  };
  const [budgetDialogOpen, setBudgetDialogOpen] = useState(false);
  const [selectedCategoryForBudget, setSelectedCategoryForBudget] = useState<string | null>(null);
  const [customBudgetInput, setCustomBudgetInput] = useState('');
  
  // Custom category dialog state
  const [customCategoryDialogOpen, setCustomCategoryDialogOpen] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');

  // Calculate budget distribution when budget changes
  useEffect(() => {
    const totalBudget = parseFloat(formData.totalBudget);
    const isFlexible = formData.budgetType === 'flexible';
    
    // Distribute budget across ALL categories when budget is entered
    if (!isNaN(totalBudget) && totalBudget > 0) {
      const budgets: Record<string, { amount: number; percentage: number }> = {};
      
      if (isFlexible) {
        // FLEXIBLE BUDGET MODE
        // Custom budgets don't affect others, total budget increases
        
        // Calculate base equal distribution for all categories
        const numCategories = selectedCategories.length;
        const baseAmount = totalBudget / numCategories;
        
        // Categories without manual budgets get the base equal amount
        selectedCategories.forEach(cat => {
          if (manualBudgets[cat.id]) {
            // Use custom budget
            budgets[cat.id] = {
              amount: manualBudgets[cat.id],
              percentage: 0 // Will calculate after we know actual total
            };
          } else {
            // Use base equal distribution
            budgets[cat.id] = {
              amount: baseAmount,
              percentage: 0 // Will calculate after we know actual total
            };
          }
        });
        
        // Calculate actual total (original + any custom overages)
        const actualTotal = Object.values(budgets).reduce((sum, b) => sum + b.amount, 0);
        
        // Now calculate percentages based on actual total
        Object.keys(budgets).forEach(catId => {
          budgets[catId].percentage = (budgets[catId].amount / actualTotal) * 100;
        });
        
      } else {
        // FIXED BUDGET MODE
        // Custom budgets are deducted first, remaining is split equally
        
        // Calculate total manually allocated budget
        const manualTotal = Object.values(manualBudgets).reduce((sum, val) => sum + val, 0);
        const remainingBudget = totalBudget - manualTotal;
        
        // Count categories without manual budgets
        const categoriesWithoutManual = selectedCategories.filter(cat => !manualBudgets[cat.id]);
        const numAutoCategories = categoriesWithoutManual.length;
        
        // Set manual budgets
        Object.entries(manualBudgets).forEach(([catId, amount]) => {
          budgets[catId] = {
            amount,
            percentage: (amount / totalBudget) * 100
          };
        });
        
        // Distribute remaining budget equally among non-manual categories
        if (numAutoCategories > 0 && remainingBudget > 0) {
          const equalAmount = remainingBudget / numAutoCategories;
          categoriesWithoutManual.forEach(cat => {
            budgets[cat.id] = {
              amount: equalAmount,
              percentage: (equalAmount / totalBudget) * 100
            };
          });
        }
      }
      
      setCategoryBudgets(budgets);
    } else {
      setCategoryBudgets({});
    }
  }, [formData.totalBudget, formData.budgetType, manualBudgets, selectedCategories]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId ? { ...cat, selected: !cat.selected } : cat
      )
    );
  };

  const openBudgetDialog = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCategoryForBudget(categoryId);
    const currentBudget = categoryBudgets[categoryId]?.amount || 0;
    setCustomBudgetInput(currentBudget.toFixed(0));
    setBudgetDialogOpen(true);
  };

  const handleSaveCustomBudget = () => {
    if (!selectedCategoryForBudget) return;
    
    const amount = parseFloat(customBudgetInput);
    if (!isNaN(amount) && amount > 0) {
      setManualBudgets(prev => ({
        ...prev,
        [selectedCategoryForBudget]: amount
      }));
    }
    
    setBudgetDialogOpen(false);
    setSelectedCategoryForBudget(null);
    setCustomBudgetInput('');
  };

  const handleResetBudget = () => {
    if (!selectedCategoryForBudget) return;
    
    setManualBudgets(prev => {
      const newManual = { ...prev };
      delete newManual[selectedCategoryForBudget];
      return newManual;
    });
    
    setBudgetDialogOpen(false);
    setSelectedCategoryForBudget(null);
    setCustomBudgetInput('');
  };

  const handleAddCustomCategory = () => {
    if (!customCategoryName.trim()) return;
    
    // Create a unique ID for the custom category
    const customId = `custom-${Date.now()}`;
    
    // Add the new custom category to the list
    const newCategory = {
      id: customId,
      name: customCategoryName.trim(),
      icon: Sparkles, // Default icon for custom categories
      price: 'Custom',
      selected: true // Auto-select the newly added category
    };
    
    setSelectedCategories(prev => [...prev, newCategory]);
    
    // Close dialog and reset input
    setCustomCategoryDialogOpen(false);
    setCustomCategoryName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCats = selectedCategories.filter(cat => cat.selected);
    const eventData = {
      ...formData,
      categories: selectedCategories, // Store ALL categories (both selected and unselected)
      categoryBudgets: categoryBudgets,
      id: Date.now().toString(),
      status: 'planning',
      progress: 0
    };
    onCreateEvent(eventData);
  };

  if (!user) {
    return (
      <div className="p-4 text-center">
        <div className="py-8">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl mb-2">Login Required</h2>
          <p className="text-muted-foreground mb-4">
            Please log in to create and manage your events
          </p>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      {/* Light Green Curved Top Header Section with Profile */}
      <div className="bg-cover bg-center bg-no-repeat rounded-b-[32px] pb-6 mb-6 shadow-sm relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="px-4 pt-4">
          {/* Header with Back Button and Notification */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-3 flex-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-white hover:bg-white/20 p-2 h-[45px] w-[45px] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex flex-col gap-1 pt-2">
                <h1 className="text-2xl text-white">Create New Event</h1>
                <p className="text-sm text-white/90">Let's plan your special moment together</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('notifications')}
              className="relative h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <Bell className="h-6 w-6 text-[#FFBA00]" />
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 space-y-6">
        {/* Event Details Card */}
        <Card className="relative overflow-hidden border-2 border-white/60 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0C3B2E]/5 via-transparent to-[#6D9773]/5 pointer-events-none" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFBA00]/40 to-[#B46617]/40 rounded-2xl blur-lg" />
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0C3B2E] via-[#115239] to-[#0C3B2E] flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-[#FFBA00]" />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-gray-900">Event Details</span>
                <span className="text-xs text-gray-500 font-normal">Tell us about your celebration</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 relative z-10">
            {/* Event Name Input */}
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-sm font-black text-gray-700 flex items-center gap-2">
                Event Name
                {formData.eventName && <Check className="w-4 h-4 text-[#6D9773]" />}
              </Label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#0C3B2E] via-[#6D9773] to-[#FFBA00] rounded-xl transition-all duration-300 ${
                  focusedField === 'eventName' ? 'opacity-100 blur-sm' : 'opacity-0'
                }`} />
                <Input
                  id="eventName"
                  placeholder="e.g., Sarah & John's Wedding"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange('eventName', e.target.value)}
                  onFocus={() => setFocusedField('eventName')}
                  onBlur={() => setFocusedField(null)}
                  className={`relative h-14 bg-white border-2 transition-all duration-300 ${
                    focusedField === 'eventName' 
                      ? 'border-[#0C3B2E] shadow-lg scale-[1.02]' 
                      : 'border-gray-200 hover:border-[#6D9773]'
                  } rounded-xl px-4`}
                  required
                />
                {focusedField === 'eventName' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 rounded-full bg-[#FFBA00] animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Event Type Select */}
            <div className="space-y-2">
              <Label htmlFor="eventType" className="text-sm font-black text-gray-700 flex items-center gap-2">
                Event Type
                {formData.eventType && <Check className="w-4 h-4 text-[#6D9773]" />}
              </Label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6D9773] via-[#0C3B2E] to-[#6D9773] rounded-xl transition-all duration-300 ${
                  focusedField === 'eventType' ? 'opacity-100 blur-sm' : 'opacity-0'
                }`} />
                <Select 
                  value={formData.eventType} 
                  onValueChange={(value) => handleInputChange('eventType', value)}
                >
                  <SelectTrigger 
                    className={`relative h-14 bg-white border-2 transition-all duration-300 ${
                      focusedField === 'eventType' 
                        ? 'border-[#6D9773] shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-[#6D9773]'
                    } rounded-xl`}
                    onFocus={() => setFocusedField('eventType')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-[#6D9773]/30 [&_[data-slot=select-item]]:focus:bg-[#6D9773]/20 [&_[data-slot=select-item]]:focus:text-[#0C3B2E] [&_[data-slot=select-item][data-state=checked]]:bg-[#6D9773] [&_[data-slot=select-item][data-state=checked]]:text-white">
                    <SelectItem value="wedding">💒 Wedding</SelectItem>
                    <SelectItem value="engagement">💍 Engagement</SelectItem>
                    <SelectItem value="anniversary">🎊 Anniversary</SelectItem>
                    <SelectItem value="birthday">🎂 Birthday Party</SelectItem>
                    <SelectItem value="corporate">💼 Corporate Event</SelectItem>
                    <SelectItem value="other">✨ Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-black text-gray-700 flex items-center gap-2">
                Description
                {formData.description && <Check className="w-4 h-4 text-[#6D9773]" />}
              </Label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br from-[#FFBA00] via-[#B46617] to-[#FFBA00] rounded-xl transition-all duration-300 ${
                  focusedField === 'description' ? 'opacity-100 blur-sm' : 'opacity-0'
                }`} />
                <Textarea
                  id="description"
                  placeholder="Tell us about your special event..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  className={`relative bg-white border-2 transition-all duration-300 ${
                    focusedField === 'description' 
                      ? 'border-[#B46617] shadow-lg scale-[1.02]' 
                      : 'border-gray-200 hover:border-[#6D9773]'
                  } rounded-xl px-4 py-3 min-h-[100px]`}
                  rows={3}
                />
              </div>
            </div>

            {/* Date and Location Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Event Date */}
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-black text-gray-700 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#0C3B2E]" />
                  Date
                  {formData.date && <Check className="w-4 h-4 text-[#6D9773]" />}
                </Label>
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] rounded-xl transition-all duration-300 ${
                    focusedField === 'date' ? 'opacity-100 blur-sm' : 'opacity-0'
                  }`} />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    onFocus={() => setFocusedField('date')}
                    onBlur={() => setFocusedField(null)}
                    className={`relative h-14 bg-white border-2 transition-all duration-300 ${
                      focusedField === 'date' 
                        ? 'border-[#0C3B2E] shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-[#6D9773]'
                    } rounded-xl px-3`}
                    required
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-black text-gray-700 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B46617]" />
                  Location
                  {formData.location && <Check className="w-4 h-4 text-[#6D9773]" />}
                </Label>
                <div className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#B46617] to-[#FFBA00] rounded-xl transition-all duration-300 ${
                    focusedField === 'location' ? 'opacity-100 blur-sm' : 'opacity-0'
                  }`} />
                  <Input
                    id="location"
                    placeholder="Venue"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    onFocus={() => setFocusedField('location')}
                    onBlur={() => setFocusedField(null)}
                    className={`relative h-14 bg-white border-2 transition-all duration-300 ${
                      focusedField === 'location' 
                        ? 'border-[#B46617] shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-[#6D9773]'
                    } rounded-xl px-3`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Guest Count */}
            <div className="space-y-2">
              <Label htmlFor="guestCount" className="text-sm font-black text-gray-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#6D9773]" />
                Guest Count
                {formData.guestCount && <Check className="w-4 h-4 text-[#6D9773]" />}
              </Label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6D9773] to-[#0C3B2E] rounded-xl transition-all duration-300 ${
                  focusedField === 'guestCount' ? 'opacity-100 blur-sm' : 'opacity-0'
                }`} />
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="e.g., 150"
                  value={formData.guestCount}
                  onChange={(e) => handleInputChange('guestCount', e.target.value)}
                  onFocus={() => setFocusedField('guestCount')}
                  onBlur={() => setFocusedField(null)}
                  className={`relative h-14 bg-white border-2 transition-all duration-300 ${
                    focusedField === 'guestCount' 
                      ? 'border-[#6D9773] shadow-lg scale-[1.02]' 
                      : 'border-gray-200 hover:border-[#6D9773]'
                  } rounded-xl px-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  min="1"
                />
                {focusedField === 'guestCount' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 rounded-full bg-[#6D9773] animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Filter by Location Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <Checkbox 
                id="filterByLocation" 
                checked={filterByLocation}
                onCheckedChange={(checked) => setFilterByLocation(checked as boolean)}
                className="border-2 border-gray-300 data-[state=checked]:bg-[#6D9773] data-[state=checked]:border-[#6D9773]"
              />
              <Label 
                htmlFor="filterByLocation" 
                className="text-sm text-gray-700 cursor-pointer font-normal"
              >
                Filter vendors of the selected location
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Budget Planning Card */}
        <Card className="relative overflow-hidden border-2 border-white/60 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFBA00]/5 via-transparent to-[#B46617]/5 pointer-events-none" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFBA00] to-[#B46617] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span>Budget Planning</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 relative z-10">
            {/* Total Budget */}
            <div className="space-y-2">
              <Label htmlFor="totalBudget" className="text-sm font-black text-gray-700 flex items-center gap-2">
                Total Budget (LKR)
                {formData.totalBudget && <Check className="w-4 h-4 text-[#6D9773]" />}
                {formData.budgetType === 'flexible' && Object.keys(manualBudgets).length > 0 && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-[#FFBA00]/10 text-[#B46617] border-[#FFBA00] ml-auto">
                    Auto-calculated
                  </Badge>
                )}
              </Label>
              <div className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r from-[#FFBA00] via-[#B46617] to-[#FFBA00] rounded-xl transition-all duration-300 ${
                  focusedField === 'totalBudget' ? 'opacity-100 blur-sm' : 'opacity-0'
                }`} />
                <div className="relative">
                  <DollarSign className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                    focusedField === 'totalBudget' ? 'text-[#B46617]' : 'text-gray-400'
                  }`} />
                  <Input
                    id="totalBudget"
                    type="number"
                    placeholder="e.g., 500000"
                    value={getDisplayedBudget()}
                    onChange={(e) => handleInputChange('totalBudget', e.target.value)}
                    onFocus={() => setFocusedField('totalBudget')}
                    onBlur={() => setFocusedField(null)}
                    className={`relative h-14 bg-white border-2 transition-all duration-300 pl-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                      focusedField === 'totalBudget' 
                        ? 'border-[#B46617] shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-[#6D9773]'
                    } rounded-xl ${formData.budgetType === 'flexible' && Object.keys(manualBudgets).length > 0 ? 'bg-[#FFBA00]/5' : ''}`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Budget Type Radio */}
            <div className="space-y-3">
              <Label className="text-sm font-black text-gray-700">Budget Type</Label>
              <RadioGroup 
                value={formData.budgetType} 
                onValueChange={(value) => handleInputChange('budgetType', value)}
                className="grid grid-cols-2 gap-3"
              >
                {/* Flexible Budget */}
                <div 
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    formData.budgetType === 'flexible' 
                      ? 'border-[#6D9773] bg-gradient-to-br from-[#6D9773]/10 to-[#0C3B2E]/5 shadow-lg scale-[1.02]' 
                      : 'border-gray-200 bg-white hover:border-[#6D9773] hover:shadow-md'
                  }`}
                  onClick={() => handleInputChange('budgetType', 'flexible')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative p-4 flex items-center gap-3 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, budgetType: 'flexible' }))}>
                    {formData.budgetType === 'flexible' ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#115239] flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <RadioGroupItem value="flexible" id="flexible" className="border-2 border-[#6D9773] pointer-events-none" />
                    )}
                    <div className="flex-1">
                      <Label htmlFor="flexible" className="cursor-pointer font-black text-gray-900">
                        Flexible
                      </Label>
                      <p className="text-xs text-gray-600 mt-0.5">Adjust as needed</p>
                    </div>
                  </div>
                </div>

                {/* Fixed Budget */}
                <div 
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    formData.budgetType === 'fixed' 
                      ? 'border-[#0C3B2E] bg-gradient-to-br from-[#0C3B2E]/10 to-[#6D9773]/5 shadow-lg scale-[1.02]' 
                      : 'border-gray-200 bg-white hover:border-[#0C3B2E] hover:shadow-md'
                  }`}
                  onClick={() => handleInputChange('budgetType', 'fixed')}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="relative p-4 flex items-center gap-3 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, budgetType: 'fixed' }))}> 
                    {formData.budgetType === 'fixed' ? (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#115239] flex items-center justify-center shrink-0">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <RadioGroupItem value="fixed" id="fixed" className="border-2 border-[#0C3B2E] pointer-events-none" />
                    )}
                    <div className="flex-1">
                      <Label htmlFor="fixed" className="cursor-pointer font-black text-gray-900">
                        Fixed
                      </Label>
                      <p className="text-xs text-gray-600 mt-0.5">Strict limit</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Services Selection Card */}
        <Card className="relative overflow-hidden border-2 border-white/60 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6D9773]/5 via-transparent to-[#FFBA00]/5 pointer-events-none" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D9773] to-[#7FAA85] flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span>Select Services</span>
            </CardTitle>
            <p className="text-sm text-gray-600">
              Choose the services you'll need for your event
            </p>
            {formData.totalBudget && parseFloat(formData.totalBudget) > 0 && (
              <div className="mt-3 p-3 bg-gradient-to-r from-[#FFBA00]/10 to-[#B46617]/10 border-l-4 border-[#FFBA00] rounded-lg">
                <p className="text-xs font-black text-[#0C3B2E]">
                  {Object.keys(manualBudgets).length > 0 
                    ? `💰 ${Object.keys(manualBudgets).length} custom budget${Object.keys(manualBudgets).length > 1 ? 's' : ''} set • Click + to adjust`
                    : `💰 Budget distributed equally across ${selectedCategories.length} categories • Click + to customize`
                  }
                </p>
                {formData.budgetType === 'flexible' && Object.keys(manualBudgets).length > 0 && (
                  <p className="text-xs text-[#B46617] mt-1">
                    {(() => {
                      const actualTotal = Object.values(categoryBudgets).reduce((sum, b) => sum + b.amount, 0);
                      const originalBudget = parseFloat(formData.totalBudget);
                      if (actualTotal > originalBudget) {
                        return `📈 Total increased to LKR ${actualTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })} (flexible mode)`;
                      }
                      return null;
                    })()}
                  </p>
                )}
              </div>
            )}
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-2 gap-3">
              {selectedCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 p-4 text-left cursor-pointer ${
                    category.selected 
                      ? 'border-[#0C3B2E] bg-gradient-to-br from-[#0C3B2E]/10 to-[#6D9773]/5 shadow-lg scale-[1.02]' 
                      : 'border-gray-200 bg-white hover:border-[#6D9773] hover:shadow-md'
                  }`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <div className="relative space-y-2">
                    <div className="flex items-start justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        category.selected 
                          ? 'bg-gradient-to-br from-[#FFBA00] to-[#B46617] scale-110' 
                          : 'bg-gray-100 group-hover:bg-[#6D9773]/10'
                      }`}>
                        <category.icon className={`w-5 h-5 transition-colors duration-300 ${
                          category.selected ? 'text-white' : 'text-[#0C3B2E]'
                        }`} />
                      </div>
                      <div className="flex items-center gap-2">
                        {manualBudgets[category.id] && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-[#FFBA00]/10 text-[#B46617] border-[#FFBA00]">
                            Custom
                          </Badge>
                        )}
                        {categoryBudgets[category.id] && (
                          <button
                            type="button"
                            onClick={(e) => openBudgetDialog(category.id, e)}
                            className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5 text-white" />
                          </button>
                        )}
                        {category.selected && !categoryBudgets[category.id] && (
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#115239] flex items-center justify-center animate-in zoom-in-50 duration-300">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-sm">{category.name}</h4>
                      {categoryBudgets[category.id] ? (
                        <div className="space-y-0.5">
                          <p className="text-xs font-black text-[#0C3B2E] mt-0.5">
                            LKR {categoryBudgets[category.id].amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                          </p>
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-[#FFBA00] to-[#B46617] rounded-full transition-all duration-500"
                                style={{ width: `${categoryBudgets[category.id].percentage}%` }}
                              />
                            </div>
                            <span className="text-xs font-black text-[#B46617]">
                              {categoryBudgets[category.id].percentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-600 mt-0.5">{category.price}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setCustomCategoryDialogOpen(true)}
              className="w-full mt-4 h-12 border-2 border-dashed border-[#6D9773]/40 text-[#0C3B2E] hover:bg-[#6D9773]/5 hover:border-[#6D9773] hover:text-[#6D9773] rounded-xl group"
            >
              <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300 group-hover:text-[#6D9773]" />
              Add Custom Category
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="space-y-3 pb-6">
          <Button 
            type="submit" 
            className="group relative w-full h-16 bg-gradient-to-br from-[#0C3B2E] via-[#115239] to-[#0C3B2E] hover:shadow-[0_12px_40px_rgba(12,59,46,0.4)] text-white rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFBA00]/0 via-[#FFBA00]/20 to-[#FFBA00]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center justify-center gap-2 font-black text-lg">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Create Event
              <Sparkles className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" />
            </span>
          </Button>
          <p className="text-xs text-gray-600 text-center">
            You can add more details and vendors after creating your event
          </p>
        </div>
      </form>

      {/* Budget Adjustment Dialog */}
      <Dialog open={budgetDialogOpen} onOpenChange={setBudgetDialogOpen}>
        <DialogContent className="sm:max-w-md border-2 border-[#6D9773]/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFBA00] to-[#B46617] flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span>Adjust Budget</span>
            </DialogTitle>
            <DialogDescription>
              Set a custom budget allocation for this service category
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customBudget" className="text-sm font-black text-gray-700">
                {selectedCategoryForBudget && 
                  selectedCategories.find(c => c.id === selectedCategoryForBudget)?.name
                } Budget (LKR)
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B46617]" />
                <Input
                  id="customBudget"
                  type="number"
                  placeholder="Enter amount"
                  value={customBudgetInput}
                  onChange={(e) => setCustomBudgetInput(e.target.value)}
                  className="h-12 pl-10 border-2 border-gray-200 focus:border-[#B46617] rounded-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              {formData.totalBudget && (
                <p className="text-xs text-gray-600">
                  Total budget: LKR {parseFloat(formData.totalBudget).toLocaleString('en-US')}
                </p>
              )}
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            {manualBudgets[selectedCategoryForBudget || ''] && (
              <Button
                type="button"
                variant="outline"
                onClick={handleResetBudget}
                className="border-2 border-gray-300 hover:bg-gray-100 rounded-xl h-11"
              >
                Reset to Auto
              </Button>
            )}
            <Button
              type="button"
              onClick={handleSaveCustomBudget}
              className="bg-gradient-to-br from-[#0C3B2E] to-[#115239] hover:shadow-lg text-white rounded-xl h-11 flex-1"
            >
              Save Budget
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Custom Category Dialog */}
      <Dialog open={customCategoryDialogOpen} onOpenChange={setCustomCategoryDialogOpen}>
        <DialogContent className="sm:max-w-md border-2 border-[#6D9773]/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span>Add Custom Category</span>
            </DialogTitle>
            <DialogDescription>
              Create a custom service category for your event
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName" className="text-sm font-black text-gray-700">
                Category Name
              </Label>
              <div className="relative">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6D9773]" />
                <Input
                  id="categoryName"
                  type="text"
                  placeholder="e.g., Transportation, Makeup Artist"
                  value={customCategoryName}
                  onChange={(e) => setCustomCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomCategory();
                    }
                  }}
                  className="h-12 pl-10 border-2 border-gray-200 focus:border-[#6D9773] rounded-xl"
                  autoFocus
                />
              </div>
              <p className="text-xs text-gray-600">
                Add any service category you need for your event
              </p>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCustomCategoryDialogOpen(false);
                setCustomCategoryName('');
              }}
              className="border-2 border-gray-300 hover:bg-gray-100 rounded-xl h-11"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddCustomCategory}
              disabled={!customCategoryName.trim()}
              className="bg-gradient-to-br from-[#6D9773] to-[#0C3B2E] hover:shadow-lg text-white rounded-xl h-11 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
