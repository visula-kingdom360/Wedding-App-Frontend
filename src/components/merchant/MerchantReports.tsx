import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  Download,
  BarChart3,
  PieChart,
  ArrowLeft
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantReportsProps {
  user: User;
  onBack: () => void;
}

export function MerchantReports({ user, onBack }: MerchantReportsProps) {
  const salesData = [
    { month: 'Jan', revenue: 12500, bookings: 15 },
    { month: 'Feb', revenue: 18200, bookings: 22 },
    { month: 'Mar', revenue: 24100, bookings: 28 },
    { month: 'Apr', revenue: 19800, bookings: 24 },
    { month: 'May', revenue: 32400, bookings: 35 },
    { month: 'Jun', revenue: 28900, bookings: 31 }
  ];

  const topServices = [
    { name: 'Wedding Photography', bookings: 45, revenue: 67500 },
    { name: 'Portrait Sessions', bookings: 28, revenue: 22400 },
    { name: 'Event Coverage', bookings: 18, revenue: 27000 },
    { name: 'Commercial Shoots', bookings: 12, revenue: 18000 }
  ];

  const monthlyStats = {
    totalRevenue: 28900,
    totalBookings: 31,
    avgBookingValue: 932,
    growthRate: 15.2
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-green-500 to-sage-green-500 px-4 py-4 text-white">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Business Reports</h1>
            <p className="text-sm text-white/80">Track your performance and growth</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:bg-white/20 border border-white/30"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-xl font-bold text-forest-green-500">
                    LKR {monthlyStats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-bronze-brown-500" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{monthlyStats.growthRate}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Bookings</p>
                  <p className="text-xl font-bold text-forest-green-500">{monthlyStats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-bronze-brown-500" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-muted-foreground">This month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sales Chart Placeholder */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-forest-green-500" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-br from-sage-green-50 to-forest-green-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-2 text-forest-green-500" />
                <p className="text-sm text-muted-foreground">Sales Chart Visualization</p>
                <p className="text-xs text-muted-foreground">6-month revenue trend</p>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-4">
              {salesData.map((data, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground">{data.month}</p>
                  <p className="text-sm font-medium text-forest-green-500">
                    {(data.revenue / 1000).toFixed(0)}K
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Services */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-forest-green-500" />
              Top Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-sage-green-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{service.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {service.bookings} bookings
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-bronze-brown-500">
                      LKR {service.revenue.toLocaleString()}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-forest-green-50 rounded-lg">
                <p className="text-2xl font-bold text-forest-green-500">
                  LKR {monthlyStats.avgBookingValue}
                </p>
                <p className="text-sm text-muted-foreground">Avg Booking Value</p>
              </div>
              <div className="text-center p-3 bg-bronze-brown-50 rounded-lg">
                <p className="text-2xl font-bold text-bronze-brown-500">94%</p>
                <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <div className="px-4">
        <Card>
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Download Revenue Report (PDF)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Export Booking Data (CSV)
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="w-4 h-4 mr-2" />
              Performance Summary (Excel)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}