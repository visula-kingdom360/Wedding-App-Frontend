import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Camera, 
  Star, 
  Edit, 
  Save, 
  X,
  Plus,
  Trash2,
  Settings,
  Shield,
  Bell,
  CreditCard,
  Package,
  Check,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { MerchantProfileEdit } from './MerchantProfileEdit';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantProfileProps {
  user: User;
  onBack?: () => void;
  onLogout?: () => void;
}

export function MerchantProfile({ user, onLogout }: MerchantProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);
  const [showSubscriptionPage, setShowSubscriptionPage] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    businessName: 'Demo Photography Studio',
    ownerName: 'Demo Merchant',
    email: 'demo@photography.com',
    phone: '+94 77 123 4567',
    address: '123 Main Street, Colombo 03',
    website: 'www.demophotography.com',
    description: 'Professional wedding and event photography services with over 10 years of experience. We specialize in capturing your special moments with creativity and style.',
    services: ['Wedding Photography', 'Event Photography', 'Portrait Sessions', 'Commercial Photography'],
    eventTypes: ['Weddings', 'Birthdays', 'Corporate Events', 'Engagements'],
    coverageAreas: ['Colombo', 'Gampaha', 'Kalutara', 'Kandy'],
    languages: ['English', 'Sinhala', 'Tamil'],
    socialMedia: {
      instagram: '@demophotography',
      facebook: 'Demo Photography Studio',
      youtube: 'Demo Photography'
    }
  });

  const [businessStats] = useState({
    totalBookings: 156,
    activePackages: 8,
    averageRating: 4.8,
    totalEarnings: 'LKR 2,450,000'
  });

  // Current subscription data
  const [currentSubscription] = useState({
    plan: 'Quarterly',
    startDate: '2025-09-01',
    expiryDate: '2025-12-01',
    price: 'LKR 45,000'
  });

  // Subscription plans
  const subscriptionPlans = [
    { id: '1-month', name: '1 Month', price: 18000, duration: '30 days' },
    { id: '2-months', name: '2 Months', price: 34000, duration: '60 days', savings: 'Save LKR 2,000' },
    { id: 'quarterly', name: 'Quarterly', price: 45000, duration: '90 days', savings: 'Save LKR 9,000', popular: true },
    { id: 'semi-annually', name: 'Semi Annually', price: 85000, duration: '180 days', savings: 'Save LKR 23,000' },
    { id: 'annually', name: 'Annually', price: 150000, duration: '365 days', savings: 'Save LKR 66,000' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

  const handleSaveEditPage = (data: any) => {
    setProfileData(data);
    setShowEditPage(false);
    // Additional save logic here
  };

  // Payment methods
  const paymentMethods = [
    { id: 'credit-debit-card', name: 'Credit/Debit Card', icon: '💳', description: 'Visa, Mastercard, Amex' },
    { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦', description: 'Direct bank transfer' },
    { id: 'mobile-payment', name: 'Mobile Payment', icon: '📱', description: 'eZ Cash, mCash' }
  ];

  // Show edit page if requested
  if (showEditPage) {
    return (
      <MerchantProfileEdit 
        onClose={() => setShowEditPage(false)}
        onSave={handleSaveEditPage}
      />
    );
  }

  // Show subscription page if requested
  if (showSubscriptionPage) {
    const selectedPlanDetails = subscriptionPlans.find(p => p.id === selectedPlan);
    const calculateNewExpiryDate = () => {
      const start = new Date(startDate);
      const daysToAdd = parseInt(selectedPlanDetails?.duration || '0');
      start.setDate(start.getDate() + daysToAdd);
      return start.toISOString().split('T')[0];
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-green-50 via-white to-sage-green-50">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setShowSubscriptionPage(false);
                  setSelectedPlan(null);
                  setSelectedPaymentMethod(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-neutral-dark">Subscription Management</h1>
                <p className="text-sm text-gray-600">Choose your plan and complete payment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-3 md:px-4 py-6 space-y-6">
          {/* Current Subscription Card */}
          <Card className="bg-gradient-to-r from-forest-green-500 to-sage-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-forest-green-100 text-sm mb-1">Current Plan</p>
                  <h2 className="text-3xl font-bold">{currentSubscription.plan}</h2>
                </div>
                <Badge className="bg-white text-forest-green-700 border-0">Active</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-forest-green-100 text-sm">Start Date</p>
                  <p className="font-semibold mt-1">{new Date(currentSubscription.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-forest-green-100 text-sm">Expiry Date</p>
                  <p className="font-semibold mt-1">{new Date(currentSubscription.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-forest-green-100 text-sm">Amount Paid</p>
                  <p className="text-2xl font-bold mt-1">{currentSubscription.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Plan Selection */}
            <div className="md:col-span-2 space-y-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="border-b bg-gray-50">
                  <CardTitle className="text-lg">Select Your Plan</CardTitle>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="space-y-3">
                    {subscriptionPlans.map((plan) => (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative border-2 rounded-xl p-3 md:p-5 cursor-pointer transition-all hover:shadow-md ${
                          selectedPlan === plan.id
                            ? 'border-forest-green-500 bg-forest-green-50 shadow-md'
                            : 'border-gray-200 hover:border-forest-green-300 bg-white'
                        }`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 right-4">
                            <Badge className="bg-gradient-to-r from-bronze-brown-500 to-gold-yellow-500 text-white border-0 shadow-md">
                              ⭐ Most Popular
                            </Badge>
                          </div>
                        )}
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              selectedPlan === plan.id
                                ? 'border-forest-green-500 bg-forest-green-500'
                                : 'border-gray-300'
                            }`}
                          >
                            {selectedPlan === plan.id && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-1">
                              <h4 className="font-bold text-lg text-neutral-dark">{plan.name}</h4>
                              <span className="text-sm text-gray-600">{plan.duration}</span>
                            </div>
                            {plan.savings && (
                              <p className="text-sm text-sage-green-600 font-medium">
                                💰 {plan.savings}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-bronze-brown-600">
                              {plan.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              LKR {Math.round(plan.price / (parseInt(plan.duration) / 30)).toLocaleString()}/mo
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>


            </div>

            {/* Right Column - Order Summary */}
            <div className="md:col-span-1">
              <Card className="shadow-lg border-0 sticky top-24">
                <CardHeader className="border-b bg-gradient-to-r from-forest-green-50 to-sage-green-50">
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {selectedPlan ? (
                    <>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Selected Plan</p>
                        <p className="font-bold text-lg text-neutral-dark">{selectedPlanDetails?.name}</p>
                        <p className="text-sm text-gray-600">{selectedPlanDetails?.duration}</p>
                      </div>

                      <div>
                        <Label className="text-sm text-gray-600 mb-2 block">Start Date</Label>
                        <Input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.4] [&::-webkit-calendar-picker-indicator]:sepia [&::-webkit-calendar-picker-indicator]:saturate-[5] [&::-webkit-calendar-picker-indicator]:hue-rotate-[100deg] [&::-webkit-calendar-picker-indicator]:brightness-[0.9]"
                        />
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">LKR {selectedPlanDetails?.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax (0%)</span>
                          <span className="font-medium">LKR 0</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold">Total</span>
                            <span className="font-bold text-xl text-bronze-brown-600">
                              LKR {selectedPlanDetails?.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-sage-green-50 border border-sage-green-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-semibold">New Expiry Date:</span>
                        </p>
                        <p className="font-bold text-forest-green-700">
                          {new Date(calculateNewExpiryDate()).toLocaleDateString('en-GB', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>

                      <Button
                        onClick={() => {
                          alert(`Processing payment of LKR ${selectedPlanDetails?.price.toLocaleString()}`);
                          setShowSubscriptionPage(false);
                        }}
                        className="w-full bg-gradient-to-r from-forest-green-600 to-sage-green-600 hover:from-forest-green-700 hover:to-sage-green-700 text-white py-6 text-lg shadow-lg"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Proceed to Payment
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        🔒 Your payment information is secure and encrypted
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Select a plan to continue</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-forest-green-500 to-sage-green-500 px-4 py-8">
        <div className="text-white text-center">
          <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
            <Camera className="w-12 h-12 text-forest-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{profileData.businessName}</h1>
          <p className="text-white/80 mb-2">{profileData.ownerName}</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-gold-yellow-500 text-gold-yellow-500" />
              <span>{businessStats.averageRating}</span>
            </div>
            <span>•</span>
            <span>{businessStats.totalBookings} Bookings</span>
          </div>
        </div>
      </div>

      {/* Business Stats */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white rounded-xl">
            <CardContent className="p-4 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-forest-green-500" />
              <p className="text-2xl font-bold text-forest-green-500">{businessStats.activePackages}</p>
              <p className="text-sm text-muted-foreground">Active Packages</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl">
            <CardContent className="p-4 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-gold-yellow-500" />
              <p className="text-2xl font-bold text-gold-yellow-500">3</p>
              <p className="text-sm text-muted-foreground">Active Promotions</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="px-4">
        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Business Information Tab */}
          <TabsContent value="business" className="space-y-4">
            <Card className="bg-white rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Business Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditPage(true)}
                  className="border-forest-green-500 text-forest-green-500"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Information
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={profileData.businessName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, businessName: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ownerName">Owner Name</Label>
                      <Input
                        id="ownerName"
                        value={profileData.ownerName}
                        onChange={(e) => setProfileData(prev => ({ ...prev, ownerName: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        value={profileData.description}
                        onChange={(e) => setProfileData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                      />
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleSave} className="bg-forest-green-500 hover:bg-forest-green-600">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-neutral-dark">{profileData.businessName}</p>
                          <p className="text-sm text-muted-foreground">Business Name</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-neutral-dark">{profileData.email}</p>
                          <p className="text-sm text-muted-foreground">Email Address</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-neutral-dark">{profileData.phone}</p>
                          <p className="text-sm text-muted-foreground">Phone Number</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-neutral-dark">{profileData.address}</p>
                          <p className="text-sm text-muted-foreground">Business Address</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-neutral-dark">{profileData.website}</p>
                          <p className="text-sm text-muted-foreground">Website</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <h4 className="font-medium text-neutral-dark mb-2">About</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {profileData.description}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-4">
            <Card className="bg-white rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Events Covered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-dark mb-3">Categories Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.services.map((service, index) => (
                      <Badge key={index} className="bg-forest-green-100 text-forest-green-700">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-dark mb-3">Event Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.eventTypes.map((eventType, index) => (
                      <Badge key={index} className="bg-bronze-brown-100 text-bronze-brown-700">
                        {eventType}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-dark mb-3">Coverage Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.coverageAreas.map((area, index) => (
                      <Badge key={index} variant="outline" className="border-sage-green-300 text-sage-green-700">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-dark mb-3">Languages</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((language, index) => (
                      <Badge key={index} className="bg-bronze-brown-100 text-bronze-brown-700">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-white rounded-xl">
              <CardHeader>
                <CardTitle className="text-lg">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Subscription Progress */}
                <div className="bg-gradient-to-r from-forest-green-50 to-sage-green-50 border-2 border-forest-green-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-dark">Current Subscription</h3>
                      <p className="text-sm text-gray-600">{currentSubscription.plan} Plan</p>
                    </div>
                    <Badge className="bg-forest-green-500 text-white">Active</Badge>
                  </div>
                  
                  {/* Calculate days remaining */}
                  {(() => {
                    const today = new Date();
                    const expiry = new Date(currentSubscription.expiryDate);
                    const start = new Date(currentSubscription.startDate);
                    const totalDays = Math.ceil((expiry.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
                    const daysRemaining = Math.max(0, Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
                    const progressPercentage = Math.max(0, Math.min(100, ((totalDays - daysRemaining) / totalDays) * 100));
                    
                    return (
                      <>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Days Remaining</span>
                            <span className="font-semibold text-forest-green-600">{daysRemaining} days</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-forest-green-500 to-sage-green-500 h-full rounded-full transition-all duration-500"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Started: {new Date(currentSubscription.startDate).toLocaleDateString()}</span>
                            <span>Expires: {new Date(currentSubscription.expiryDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowSubscriptionPage(true)}
                  >
                    <Package className="w-4 h-4 mr-3" />
                    My Subscription
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-3" />
                    Notification Preferences
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-3" />
                    Privacy & Security
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-3" />
                    Help and Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sign Out Option */}
      <div className="px-4 pb-6">
        <Button 
          variant="outline" 
          className="w-full justify-center border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>


    </div>
  );
}