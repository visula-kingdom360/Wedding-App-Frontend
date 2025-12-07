import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ArrowLeft, Upload, Calendar, CreditCard, CheckCircle2, Sparkles, Package, X, Plus, Search, Filter } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { vendorPackages } from '../../data/vendors';

interface PromotionFormProps {
  onClose: () => void;
  promotionType: 'main' | 'secondary' | 'featured';
}

interface DurationPlan {
  id: string;
  label: string;
  months: number;
  price: number;
  discount?: number;
}

export function PromotionForm({ onClose, promotionType }: PromotionFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
  });

  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<DatePicker>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [showProductPicker, setShowProductPicker] = useState(false);
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock vendor ID - in production this would come from auth context
  const currentVendorId = '1';
  const availablePackages = vendorPackages[currentVendorId] || [];
  
  // Extract unique categories from packages
  const uniqueCategories = ['all', ...Array.from(new Set(availablePackages.map(p => p.category)))];
  
  // Filter packages based on search and category
  const filteredPackages = availablePackages
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(productSearchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .slice(0, 4); // Limit to 4 products

  const durationPlans: DurationPlan[] = [
    { id: '1month', label: '1 Month', months: 1, price: 15000 },
    { id: '2months', label: '2 Months', months: 2, price: 28000, discount: 7 },
    { id: 'quarterly', label: 'Quarterly (3 Months)', months: 3, price: 40000, discount: 11 },
    { id: 'semi', label: 'Semi-Annually (6 Months)', months: 6, price: 75000, discount: 17 },
    { id: 'annual', label: 'Annually (12 Months)', months: 12, price: 140000, discount: 22 },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUploadedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateEndDate = (startDate: string, months: number) => {
    if (!startDate) return '';
    
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + months);
    
    return end.toISOString().split('T')[0];
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = durationPlans.find(p => p.id === planId);
    if (plan && formData.startDate) {
      const calculatedEndDate = calculateEndDate(formData.startDate, plan.months);
      setEndDate(calculatedEndDate);
    }
  };

  const handleStartDateChange = (date: string) => {
    handleInputChange('startDate', date);
    if (selectedPlan) {
      const plan = durationPlans.find(p => p.id === selectedPlan);
      if (plan) {
        const calculatedEndDate = calculateEndDate(date, plan.months);
        setEndDate(calculatedEndDate);
      }
    }
  };

  const handleDatePickerChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const dateString = date.toISOString().split('T')[0];
      handleStartDateChange(dateString);
    }
  };

  const handleProductSelect = (product: any) => {
    if (selectedProducts.length < 3 && !selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
      if (selectedProducts.length === 2) {
        setShowProductPicker(false);
      }
    }
  };

  const handleProductRemove = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
  };

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setPaymentComplete(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const selectedPlanData = durationPlans.find(p => p.id === selectedPlan);

  const getPromotionTitle = () => {
    switch (promotionType) {
      case 'main': return 'Main Promotion';
      case 'secondary': return 'Secondary Promotion';
      case 'featured': return 'Featured Listing';
      default: return 'Promotion';
    }
  };

  const getPromotionColor = () => {
    switch (promotionType) {
      case 'main': return 'text-[#FFBA00]';
      case 'secondary': return 'text-[#B46617]';
      case 'featured': return 'text-[#6D9773]';
      default: return 'text-forest-green-500';
    }
  };

  if (paymentComplete) {
    return (
      <div className="fixed inset-0 z-50 min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 rounded-full bg-forest-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-16 h-16 text-forest-green-500" />
          </div>
          <h2 className="text-3xl font-semibold text-neutral-dark mb-3">Payment Successful!</h2>
          <p className="text-lg text-muted-foreground">Your promotion has been activated</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 min-h-screen bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6 text-neutral-dark" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
              promotionType === 'main' ? 'from-[#FFBA00] to-[#FFD700]' :
              promotionType === 'secondary' ? 'from-[#B46617] to-[#D4A574]' :
              'from-[#6D9773] to-[#8FB897]'
            } flex items-center justify-center`}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-medium ${getPromotionColor()}`}>
                {getPromotionTitle()}
              </h1>
              <p className="text-xs text-muted-foreground">Boost your visibility</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24 space-y-6">
        {!showPayment ? (
          <>
            {/* Image Upload */}
            {promotionType !== 'secondary' && (
              <div className="space-y-2">
                <Label className="text-neutral-dark">Promotion Image *</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 bg-white">
                  {uploadedImage ? (
                    <div className="relative">
                      <ImageWithFallback
                        src={uploadedImage}
                        alt="Promotion"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setUploadedImage('')}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md"
                      >
                        <ArrowLeft className="w-4 h-4 rotate-45" />
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="promo-image" className="cursor-pointer block text-center">
                      <Upload className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-neutral-dark mb-1">Upload promotion image</p>
                      <p className="text-xs text-muted-foreground">Recommended: 1200x800px (16:9 ratio)</p>
                      <input
                        type="file"
                        id="promo-image"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-neutral-dark">Promotion Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Special Wedding Package Offer"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-neutral-dark">Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your promotion offer..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl min-h-20"
                rows={3}
              />
            </div>

            {/* Featured Products Selection - Only for Featured Listings */}
            {promotionType === 'featured' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-neutral-dark">Featured Products *</Label>
                  <Badge className="bg-sage-green-100 text-sage-green-700">
                    {selectedProducts.length}/3 Selected
                  </Badge>
                </div>

                {/* Selected Products */}
                <div className="space-y-2">
                  {selectedProducts.map((product) => (
                    <div key={product.id} className="p-3 bg-white rounded-xl border-2 border-forest-green-200 flex items-center gap-3">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-neutral-dark text-sm truncate">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.price}</p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleProductRemove(product.id)}
                        className="shrink-0 p-2 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  ))}

                  {/* Add Product Button */}
                  {selectedProducts.length < 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowProductPicker(true)}
                      className="w-full border-2 border-dashed border-gray-300 hover:border-forest-green-400 rounded-xl py-6 text-neutral-dark hover:bg-forest-green-50"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Product ({3 - selectedProducts.length} remaining)
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Duration Plans */}
            <div className="space-y-3">
              <Label className="text-neutral-dark">Select Duration *</Label>
              <div className="grid gap-3">
                {durationPlans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all bg-white ${
                      selectedPlan === plan.id
                        ? 'border-forest-green-500 bg-forest-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-neutral-dark">{plan.label}</p>
                        <p className="text-sm text-muted-foreground">{plan.months} month{plan.months > 1 ? 's' : ''} of visibility</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-forest-green-600">LKR {plan.price.toLocaleString()}</p>
                        {plan.discount && (
                          <Badge className="bg-bronze-brown-100 text-bronze-brown-600 text-xs">
                            Save {plan.discount}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-neutral-dark">Start Date *</Label>
              <div 
                className="relative cursor-pointer"
                onClick={() => datePickerRef.current?.setFocus()}
              >
                <Calendar 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10 cursor-pointer" 
                  onClick={() => datePickerRef.current?.setFocus()}
                />
                <DatePicker
                  ref={datePickerRef}
                  selected={selectedDate}
                  onChange={handleDatePickerChange}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select start date"
                  className="w-full bg-white border-2 border-gray-200 focus:border-[#0C3B2E] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 cursor-pointer text-neutral-dark"
                  calendarClassName="eventcore-calendar"
                  wrapperClassName="w-full"
                />
              </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
              .eventcore-calendar {
                font-family: inherit;
                border: 2px solid #0C3B2E !important;
                border-radius: 12px !important;
                box-shadow: 0 10px 25px rgba(12, 59, 46, 0.15) !important;
                background: white !important;
              }
              
              .react-datepicker__header {
                background-color: white !important;
                border-bottom: 2px solid #e5e7eb !important;
                padding-top: 16px !important;
                border-radius: 12px 12px 0 0 !important;
              }
              
              .react-datepicker__current-month {
                color: #0C3B2E !important;
                font-weight: 600 !important;
                font-size: 16px !important;
                margin-bottom: 12px !important;
              }
              
              .react-datepicker__day-name {
                color: #6D9773 !important;
                font-weight: 600 !important;
                font-size: 13px !important;
              }
              
              .react-datepicker__day {
                color: #374151 !important;
                font-weight: 500 !important;
                border-radius: 8px !important;
                transition: all 0.2s !important;
              }
              
              .react-datepicker__day:hover {
                background-color: #6D9773 !important;
                color: white !important;
              }
              
              .react-datepicker__day--selected {
                background-color: #0C3B2E !important;
                color: white !important;
                font-weight: 600 !important;
              }
              
              .react-datepicker__day--keyboard-selected {
                background-color: #6D9773 !important;
                color: white !important;
              }
              
              .react-datepicker__day--today {
                font-weight: 700 !important;
                color: #0C3B2E !important;
                border: 2px solid #0C3B2E !important;
              }
              
              .react-datepicker__day--disabled {
                color: #d1d5db !important;
                cursor: not-allowed !important;
              }
              
              .react-datepicker__day--disabled:hover {
                background-color: transparent !important;
                color: #d1d5db !important;
              }
              
              .react-datepicker__navigation {
                top: 16px !important;
              }
              
              .react-datepicker__navigation-icon::before {
                border-color: #0C3B2E !important;
              }
              
              .react-datepicker__navigation:hover *::before {
                border-color: #6D9773 !important;
              }
              
              .react-datepicker__month {
                margin: 12px !important;
              }
              
              .react-datepicker__triangle {
                display: none !important;
              }
            `}} />

            {/* End Date Display */}
            {endDate && (
              <div className="p-4 bg-forest-green-50 rounded-xl border border-forest-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Promotion End Date</p>
                    <p className="font-medium text-forest-green-700">
                      {new Date(endDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-forest-green-500" />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t space-y-3">
              <Button
                type="button"
                onClick={handleProceedToPayment}
                disabled={
                  !formData.title || 
                  !formData.description || 
                  !selectedPlan || 
                  !formData.startDate || 
                  (promotionType !== 'secondary' && !uploadedImage) ||
                  (promotionType === 'featured' && selectedProducts.length !== 3)
                }
                className="w-full bg-forest-green-500 hover:bg-forest-green-600 text-white rounded-xl py-6"
              >
                Proceed to Payment
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Payment Summary */}
            <div className="space-y-4">
              <h3 className="font-semibold text-neutral-dark text-lg">Payment Summary</h3>
              
              <div className="space-y-3 p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Promotion Type</span>
                  <span className="font-medium text-neutral-dark">{getPromotionTitle()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-neutral-dark">{selectedPlanData?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Start Date</span>
                  <span className="font-medium text-neutral-dark">
                    {new Date(formData.startDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">End Date</span>
                  <span className="font-medium text-neutral-dark">
                    {new Date(endDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-neutral-dark">Total Amount</span>
                    <span className="text-2xl font-semibold text-forest-green-600">
                      LKR {selectedPlanData?.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <Label className="text-neutral-dark">Payment Method</Label>
                <div className="p-4 rounded-xl border-2 border-forest-green-500 bg-forest-green-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-forest-green-500 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-dark">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Secure payment gateway</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock Payment Info */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Demo Mode:</strong> This is a demonstration. No actual payment will be processed.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPayment(false)}
                  className="w-full rounded-xl py-6"
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handlePayment}
                  className="w-full bg-forest-green-500 hover:bg-forest-green-600 text-white rounded-xl py-6"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Complete Payment
                </Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Product Picker Modal */}
      {showProductPicker && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[80vh] flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 border-b sticky top-0 bg-white rounded-t-3xl sm:rounded-t-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Package className="w-6 h-6 text-forest-green-500" />
                  <div>
                    <h3 className="font-semibold text-neutral-dark">Select Product</h3>
                    <p className="text-xs text-muted-foreground">Choose from your packages</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProductPicker(false)}
                  className="p-2"
                >
                  <X className="w-6 h-6 text-neutral-dark" />
                </Button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-200 focus:border-forest-green-500 rounded-xl"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                {uniqueCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-forest-green-500 text-white'
                        : 'bg-gray-100 text-neutral-dark hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Product List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {availablePackages.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-muted-foreground">No packages available</p>
                  <p className="text-sm text-muted-foreground mt-1">Create packages first to feature them</p>
                </div>
              ) : filteredPackages.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-1">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                  {filteredPackages.map((product) => {
                    const isSelected = selectedProducts.find(p => p.id === product.id);
                    const isDisabled = !isSelected && selectedProducts.length >= 3;

                    return (
                      <div
                        key={product.id}
                        onClick={() => !isSelected && !isDisabled && handleProductSelect(product)}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-forest-green-500 bg-forest-green-50 opacity-50'
                            : isDisabled
                            ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-forest-green-300 cursor-pointer hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.title}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-neutral-dark text-sm mb-1 line-clamp-1">
                              {product.title}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-forest-green-600 text-sm">
                                {product.price}
                              </p>
                              {product.badge && (
                                <Badge className="bg-bronze-brown-100 text-bronze-brown-600 text-xs">
                                  {product.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="shrink-0">
                              <CheckCircle2 className="w-6 h-6 text-forest-green-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Show count if more than 4 total matches */}
                  {availablePackages.filter(p => {
                    const matchesSearch = p.title.toLowerCase().includes(productSearchTerm.toLowerCase());
                    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
                    return matchesSearch && matchesCategory;
                  }).length > 4 && (
                    <div className="text-center py-3">
                      <p className="text-sm text-muted-foreground">
                        Showing 4 of {availablePackages.filter(p => {
                          const matchesSearch = p.title.toLowerCase().includes(productSearchTerm.toLowerCase());
                          const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
                          return matchesSearch && matchesCategory;
                        }).length} products
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Refine your search to see specific products
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-gray-50 rounded-b-3xl sm:rounded-b-2xl">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">
                  {selectedProducts.length} of 3 products selected
                </p>
                <Badge className="bg-forest-green-100 text-forest-green-700">
                  {3 - selectedProducts.length} remaining
                </Badge>
              </div>
              <Button
                onClick={() => setShowProductPicker(false)}
                disabled={selectedProducts.length === 0}
                className="w-full bg-forest-green-500 hover:bg-forest-green-600 text-white rounded-xl py-3"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
