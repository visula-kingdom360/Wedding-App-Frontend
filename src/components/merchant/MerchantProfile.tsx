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
  Package
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantProfileProps {
  user: User;
  onBack?: () => void;
}

export function MerchantProfile({ user }: MerchantProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: 'Demo Photography Studio',
    ownerName: 'Demo Merchant',
    email: 'demo@photography.com',
    phone: '+94 77 123 4567',
    address: '123 Main Street, Colombo 03',
    website: 'www.demophotography.com',
    description: 'Professional wedding and event photography services with over 10 years of experience. We specialize in capturing your special moments with creativity and style.',
    services: ['Wedding Photography', 'Event Photography', 'Portrait Sessions', 'Commercial Photography'],
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

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
  };

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
              <p className="text-lg font-bold text-gold-yellow-500">{businessStats.totalEarnings}</p>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
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
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="border-forest-green-500 text-forest-green-500"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-1" /> : <Edit className="w-4 h-4 mr-1" />}
                  {isEditing ? 'Save' : 'Edit'}
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
                <CardTitle className="text-lg">Services Offered</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-dark mb-3">Photography Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.services.map((service, index) => (
                      <Badge key={index} className="bg-forest-green-100 text-forest-green-700">
                        {service}
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
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-3" />
                    General Settings
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
                    <CreditCard className="w-4 h-4 mr-3" />
                    Payment Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}