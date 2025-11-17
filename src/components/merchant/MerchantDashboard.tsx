import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DollarSign, Calendar, MessageSquare, User, Plus, Settings, BarChart3, Camera, TrendingUp, Package, Phone, Mail, MapPin } from 'lucide-react';
import type { MerchantScreen } from './MerchantApp';

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
  const stats = {
    earnings: 28900,
    bookings: 24,
    reviews: 4.8,
    profileViews: 156,
    growth: 12.5,
    totalPackages: 4,
    activePromotions: 2,
    whatsappEnquiries: 15,
    callEnquiries: 8,
    emailEnquiries: 12,
    locationRequests: 5
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Performance Summary Cards */}
      <div className="px-4">
        <h2 className="text-lg font-medium text-neutral-dark mb-4">Performance Summary</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Enquiries Breakdown */}
          <Card className="col-span-2">
            <CardContent className="p-4">
              <h3 className="font-medium text-neutral-dark mb-3">Enquiries</h3>
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-lg font-bold text-forest-green-500">{stats.whatsappEnquiries}</p>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-lg font-bold text-forest-green-500">{stats.callEnquiries}</p>
                  <p className="text-xs text-muted-foreground">Calls</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-lg font-bold text-forest-green-500">{stats.emailEnquiries}</p>
                  <p className="text-xs text-muted-foreground">Emails</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-lg font-bold text-forest-green-500">{stats.locationRequests}</p>
                  <p className="text-xs text-muted-foreground">Location</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                  <p className="text-xl font-bold text-forest-green-500">{stats.profileViews}</p>
                </div>
                <User className="w-8 h-8 text-bronze-brown-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">This month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Social Interactions</p>
                  <p className="text-xl font-bold text-forest-green-500">42</p>
                </div>
                <MessageSquare className="w-8 h-8 text-bronze-brown-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">Likes & shares</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <h3 className="font-medium text-neutral-dark mb-3">Quick Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold text-forest-green-500">{stats.profileViews}</p>
              <p className="text-sm text-muted-foreground">Total Profile Views</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold text-forest-green-500">{stats.totalPackages}</p>
              <p className="text-sm text-muted-foreground">Total Packages</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-lg font-bold text-forest-green-500">{stats.activePromotions}</p>
              <p className="text-sm text-muted-foreground">Active Promotions</p>
            </CardContent>
          </Card>
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
              className="w-full justify-start h-auto p-4"
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
              className="w-full justify-start h-auto p-4"
              onClick={() => onNavigate('notifications')}
            >
              <BarChart3 className="w-5 h-5 mr-3 text-bronze-brown-500" />
              <div className="text-left">
                <div className="font-medium">View Notifications</div>
                <div className="text-sm text-muted-foreground">Check latest updates and bookings</div>
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
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('notifications')}>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <Badge className="bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center p-0">
                    5
                  </Badge>
                </div>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-forest-green-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">New booking received</p>
                <p className="text-xs text-muted-foreground">Wedding Photography - Sarah & John</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Badge className="bg-gold-yellow-500 text-neutral-dark">New</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-sage-green-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">Payment received</p>
                <p className="text-xs text-muted-foreground">LKR 25,000 from completed booking</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
              <Badge variant="secondary">Completed</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-bronze-brown-50 rounded-lg">
              <div>
                <p className="font-medium text-sm">New review</p>
                <p className="text-xs text-muted-foreground">5-star review from Emma</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
              <Badge variant="outline">Review</Badge>
            </div>
          </CardContent>
        </Card>
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
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-bronze-brown-500">12 enquiries</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-gold-yellow-600">4.8 ⭐</span>
                </div>
              </div>
              <Badge className="bg-gold-yellow-500 text-neutral-dark">Popular</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-sage-green-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">Basic Wedding Package</p>
                <p className="text-xs text-muted-foreground">LKR 25,000 • Photography</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-bronze-brown-500">8 enquiries</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-gold-yellow-600">4.6 ⭐</span>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-bronze-brown-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-sm">Destination Wedding Package</p>
                <p className="text-xs text-muted-foreground">LKR 75,000 • Photography</p>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-xs text-bronze-brown-500">5 enquiries</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-gold-yellow-600">4.9 ⭐</span>
                </div>
              </div>
              <Badge variant="outline">Premium</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}