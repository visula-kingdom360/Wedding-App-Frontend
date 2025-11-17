import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  ArrowRight, 
  ArrowLeft, 
  Store, 
  User, 
  Package, 
  Clock, 
  Image as ImageIcon,
  Check,
  X,
  Plus,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MerchantFormData {
  // Step 1: Basic Information
  businessName: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  address: string;
  city: string;
  postalCode: string;
  description: string;
  
  // Step 2: Business Details
  website: string;
  foundedYear: string;
  teamSize: string;
  languages: string[];
  serviceAreas: string[];
  
  // Step 3: Packages & Services
  packages: Array<{
    id: string;
    title: string;
    description: string;
    price: string;
    features: string[];
  }>;
  
  // Step 4: Availability & Schedule
  businessHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  leadTime: string;
  maxBookingsPerDay: string;
  
  // Step 5: Media & Portfolio
  logoUrl: string;
  coverImageUrl: string;
  portfolioImages: string[];
  
  // Step 6: Social Media & Marketing
  instagramUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  
  // Step 7: Subscription & Pricing
  subscription: string;
  commissionRate: string;
  status: string;
}

interface CreateMerchantWizardProps {
  onComplete: (data: MerchantFormData) => void;
  onCancel: () => void;
}

export function CreateMerchantWizard({ onComplete, onCancel }: CreateMerchantWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<MerchantFormData>({
    businessName: '',
    email: '',
    phone: '',
    category: '',
    location: '',
    address: '',
    city: '',
    postalCode: '',
    description: '',
    website: '',
    foundedYear: '',
    teamSize: '',
    languages: [],
    serviceAreas: [],
    packages: [],
    businessHours: {
      monday: { open: '09:00', close: '17:00', closed: false },
      tuesday: { open: '09:00', close: '17:00', closed: false },
      wednesday: { open: '09:00', close: '17:00', closed: false },
      thursday: { open: '09:00', close: '17:00', closed: false },
      friday: { open: '09:00', close: '17:00', closed: false },
      saturday: { open: '09:00', close: '17:00', closed: false },
      sunday: { open: '09:00', close: '17:00', closed: true },
    },
    leadTime: '7',
    maxBookingsPerDay: '3',
    logoUrl: '',
    coverImageUrl: '',
    portfolioImages: [],
    instagramUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    subscription: 'basic',
    commissionRate: '15',
    status: 'active',
  });

  const totalSteps = 7;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPackage = () => {
    const newPackage = {
      id: Date.now().toString(),
      title: '',
      description: '',
      price: '',
      features: [''],
    };
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, newPackage],
    }));
  };

  const removePackage = (id: string) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter(p => p.id !== id),
    }));
  };

  const updatePackage = (id: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const addPackageFeature = (packageId: string) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(p => 
        p.id === packageId ? { ...p, features: [...p.features, ''] } : p
      ),
    }));
  };

  const updatePackageFeature = (packageId: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(p => 
        p.id === packageId 
          ? { ...p, features: p.features.map((f, i) => i === index ? value : f) }
          : p
      ),
    }));
  };

  const removePackageFeature = (packageId: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.map(p => 
        p.id === packageId 
          ? { ...p, features: p.features.filter((_, i) => i !== index) }
          : p
      ),
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(formData);
    toast.success('Merchant created successfully!');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0C3B2E] flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Basic Information</h3>
                <p className="text-sm text-muted-foreground">Enter the merchant's basic business details</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  placeholder="e.g., Perfect Venues Ltd."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => updateFormData('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venue">Venue</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="videography">Videography</SelectItem>
                    <SelectItem value="catering">Catering</SelectItem>
                    <SelectItem value="florist">Florist</SelectItem>
                    <SelectItem value="music">Music & Entertainment</SelectItem>
                    <SelectItem value="planning">Event Planning</SelectItem>
                    <SelectItem value="decoration">Decoration</SelectItem>
                    <SelectItem value="cake">Cake & Desserts</SelectItem>
                    <SelectItem value="makeup">Makeup & Hair</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="invitation">Invitations & Stationery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  placeholder="contact@business.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  placeholder="+94 77 123 4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="Colombo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">State/Province</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  placeholder="Western Province"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={formData.postalCode}
                  onChange={(e) => updateFormData('postalCode', e.target.value)}
                  placeholder="00800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Business Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData('description', e.target.value)}
                placeholder="Describe your business, services, and what makes you unique..."
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#6D9773] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Business Details</h3>
                <p className="text-sm text-muted-foreground">Additional information about the business</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="https://www.business.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  value={formData.foundedYear}
                  onChange={(e) => updateFormData('foundedYear', e.target.value)}
                  placeholder="2020"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Select value={formData.teamSize} onValueChange={(value) => updateFormData('teamSize', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 employees</SelectItem>
                  <SelectItem value="6-10">6-10 employees</SelectItem>
                  <SelectItem value="11-20">11-20 employees</SelectItem>
                  <SelectItem value="21-50">21-50 employees</SelectItem>
                  <SelectItem value="50+">50+ employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                value={formData.languages.join(', ')}
                onChange={(e) => updateFormData('languages', e.target.value.split(',').map(l => l.trim()))}
                placeholder="English, Sinhala, Tamil"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceAreas">Service Areas (comma separated)</Label>
              <Input
                id="serviceAreas"
                value={formData.serviceAreas.join(', ')}
                onChange={(e) => updateFormData('serviceAreas', e.target.value.split(',').map(a => a.trim()))}
                placeholder="Colombo, Gampaha, Kandy"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#FFBA00] flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Packages & Services</h3>
                  <p className="text-sm text-muted-foreground">Define service packages offered</p>
                </div>
              </div>
              <Button onClick={addPackage} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Package
              </Button>
            </div>

            {formData.packages.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">No packages added yet</p>
                  <Button onClick={addPackage} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Package
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {formData.packages.map((pkg, index) => (
                  <Card key={pkg.id}>
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <Badge>Package {index + 1}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePackage(pkg.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Package Title</Label>
                          <Input
                            value={pkg.title}
                            onChange={(e) => updatePackage(pkg.id, 'title', e.target.value)}
                            placeholder="e.g., Basic Photography Package"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price (LKR)</Label>
                          <Input
                            value={pkg.price}
                            onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                            placeholder="50000"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          value={pkg.description}
                          onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                          placeholder="Describe what's included in this package..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Features Included</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addPackageFeature(pkg.id)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Feature
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {pkg.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex gap-2">
                              <Input
                                value={feature}
                                onChange={(e) => updatePackageFeature(pkg.id, featureIndex, e.target.value)}
                                placeholder="e.g., 6 hours coverage"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removePackageFeature(pkg.id, featureIndex)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#B46617] flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Availability & Schedule</h3>
                <p className="text-sm text-muted-foreground">Set business hours and booking preferences</p>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <Label>Business Hours</Label>
                {Object.entries(formData.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-32 capitalize">{day}</div>
                    <Input
                      type="time"
                      value={hours.open}
                      onChange={(e) => updateFormData('businessHours', {
                        ...formData.businessHours,
                        [day]: { ...hours, open: e.target.value }
                      })}
                      disabled={hours.closed}
                      className="w-32"
                    />
                    <span className="text-muted-foreground">to</span>
                    <Input
                      type="time"
                      value={hours.close}
                      onChange={(e) => updateFormData('businessHours', {
                        ...formData.businessHours,
                        [day]: { ...hours, close: e.target.value }
                      })}
                      disabled={hours.closed}
                      className="w-32"
                    />
                    <Button
                      variant={hours.closed ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => updateFormData('businessHours', {
                        ...formData.businessHours,
                        [day]: { ...hours, closed: !hours.closed }
                      })}
                    >
                      {hours.closed ? 'Closed' : 'Open'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leadTime">Lead Time (days)</Label>
                <Input
                  id="leadTime"
                  type="number"
                  value={formData.leadTime}
                  onChange={(e) => updateFormData('leadTime', e.target.value)}
                  placeholder="7"
                />
                <p className="text-xs text-muted-foreground">Minimum days before booking</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxBookings">Max Bookings Per Day</Label>
                <Input
                  id="maxBookings"
                  type="number"
                  value={formData.maxBookingsPerDay}
                  onChange={(e) => updateFormData('maxBookingsPerDay', e.target.value)}
                  placeholder="3"
                />
                <p className="text-xs text-muted-foreground">Maximum simultaneous bookings</p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0C3B2E] flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Media & Portfolio</h3>
                <p className="text-sm text-muted-foreground">Upload business logo, cover, and portfolio images</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Business Logo URL</Label>
              <Input
                id="logoUrl"
                value={formData.logoUrl}
                onChange={(e) => updateFormData('logoUrl', e.target.value)}
                placeholder="https://example.com/logo.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImageUrl">Cover Image URL</Label>
              <Input
                id="coverImageUrl"
                value={formData.coverImageUrl}
                onChange={(e) => updateFormData('coverImageUrl', e.target.value)}
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioImages">Portfolio Images (comma separated URLs)</Label>
              <Textarea
                id="portfolioImages"
                value={formData.portfolioImages.join(', ')}
                onChange={(e) => updateFormData('portfolioImages', e.target.value.split(',').map(url => url.trim()))}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Add multiple image URLs separated by commas</p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#6D9773] flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Social Media & Marketing</h3>
                <p className="text-sm text-muted-foreground">Connect social media profiles</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4" />
                    Instagram Profile
                  </div>
                </Label>
                <Input
                  id="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={(e) => updateFormData('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/yourbusiness"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebookUrl">
                  <div className="flex items-center gap-2">
                    <Facebook className="w-4 h-4" />
                    Facebook Page
                  </div>
                </Label>
                <Input
                  id="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={(e) => updateFormData('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/yourbusiness"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterUrl">
                  <div className="flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    Twitter Profile
                  </div>
                </Label>
                <Input
                  id="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={(e) => updateFormData('twitterUrl', e.target.value)}
                  placeholder="https://twitter.com/yourbusiness"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    YouTube Channel
                  </div>
                </Label>
                <Input
                  id="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={(e) => updateFormData('youtubeUrl', e.target.value)}
                  placeholder="https://youtube.com/@yourbusiness"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#FFBA00] flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Subscription & Status</h3>
                <p className="text-sm text-muted-foreground">Set subscription plan and account status</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subscription">Subscription Plan</Label>
              <Select value={formData.subscription} onValueChange={(value) => updateFormData('subscription', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic - LKR 5,000/month</SelectItem>
                  <SelectItem value="premium">Premium - LKR 15,000/month</SelectItem>
                  <SelectItem value="enterprise">Enterprise - LKR 30,000/month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                value={formData.commissionRate}
                onChange={(e) => updateFormData('commissionRate', e.target.value)}
                placeholder="15"
              />
              <p className="text-xs text-muted-foreground">Platform commission on each booking</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Account Status</Label>
              <Select value={formData.status} onValueChange={(value) => updateFormData('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active - Merchant can accept bookings</SelectItem>
                  <SelectItem value="pending">Pending - Awaiting approval</SelectItem>
                  <SelectItem value="suspended">Suspended - Temporarily disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Summary Card */}
            <Card className="mt-6 bg-[#F5F1E8]">
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-4">Merchant Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Business Name:</span>
                    <span className="font-medium">{formData.businessName || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium capitalize">{formData.category || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-medium">{formData.email || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{formData.phone || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Packages:</span>
                    <span className="font-medium">{formData.packages.length} package(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subscription:</span>
                    <Badge variant="secondary" className="capitalize">{formData.subscription}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="default" className="capitalize">{formData.status}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4, 5, 6, 7].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                step === currentStep
                  ? 'bg-[#0C3B2E] text-white'
                  : step < currentStep
                  ? 'bg-[#6D9773] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            {step < 7 && (
              <div
                className={`h-1 w-12 mx-2 transition-colors ${
                  step < currentStep ? 'bg-[#6D9773]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className={currentStep === 1 ? 'text-[#0C3B2E] font-medium' : ''}>Basic Info</span>
        <span className={currentStep === 2 ? 'text-[#0C3B2E] font-medium' : ''}>Details</span>
        <span className={currentStep === 3 ? 'text-[#0C3B2E] font-medium' : ''}>Packages</span>
        <span className={currentStep === 4 ? 'text-[#0C3B2E] font-medium' : ''}>Schedule</span>
        <span className={currentStep === 5 ? 'text-[#0C3B2E] font-medium' : ''}>Media</span>
        <span className={currentStep === 6 ? 'text-[#0C3B2E] font-medium' : ''}>Social</span>
        <span className={currentStep === 7 ? 'text-[#0C3B2E] font-medium' : ''}>Subscription</span>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] max-h-[500px] overflow-y-auto">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onCancel : handlePrevious}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentStep === 1 ? 'Cancel' : 'Previous'}
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
        {currentStep < totalSteps ? (
          <Button onClick={handleNext} className="bg-[#0C3B2E] hover:bg-[#0C3B2E]/90">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-[#0C3B2E] hover:bg-[#0C3B2E]/90">
            <Check className="w-4 h-4 mr-2" />
            Create Merchant
          </Button>
        )}
      </div>
    </div>
  );
}
