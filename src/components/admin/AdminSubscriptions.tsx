import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Search, Plus, Edit, Trash2, DollarSign, Users, TrendingUp, Crown } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AdminSubscriptionsProps {
  user: User;
}

interface Subscription {
  id: string;
  merchantName: string;
  email: string;
  plan: 'basic' | 'premium' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  amount: number;
  features: string[];
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export function AdminSubscriptions({ user }: AdminSubscriptionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const subscriptions: Subscription[] = [
    {
      id: '1',
      merchantName: 'Perfect Moments Photography',
      email: 'contact@perfectmoments.com',
      plan: 'premium',
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      amount: 99,
      features: ['Unlimited Listings', 'Priority Support', 'Analytics Dashboard']
    },
    {
      id: '2',
      merchantName: 'Elite Catering Co.',
      email: 'info@elitecatering.com',
      plan: 'enterprise',
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      amount: 199,
      features: ['All Premium Features', 'Custom Branding', 'API Access', 'Dedicated Support']
    },
    {
      id: '3',
      merchantName: 'Garden Venues Ltd.',
      email: 'bookings@gardenvenues.com',
      plan: 'basic',
      status: 'expired',
      startDate: '2023-12-01',
      endDate: '2024-12-01',
      amount: 29,
      features: ['Basic Listings', 'Standard Support']
    },
    {
      id: '4',
      merchantName: 'Wedding Planners Inc.',
      email: 'hello@weddingplanners.com',
      plan: 'premium',
      status: 'cancelled',
      startDate: '2024-03-10',
      endDate: '2024-09-10',
      amount: 99,
      features: ['Unlimited Listings', 'Priority Support', 'Analytics Dashboard']
    }
  ];

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      interval: 'monthly',
      features: ['Up to 5 listings', 'Basic support', 'Standard visibility']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      interval: 'monthly',
      features: ['Unlimited listings', 'Priority support', 'Enhanced visibility', 'Analytics dashboard'],
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      interval: 'monthly',
      features: ['All Premium features', 'Custom branding', 'API access', 'Dedicated account manager']
    }
  ];

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRevenue: subscriptions.reduce((sum, sub) => sum + sub.amount, 0),
    activeSubscriptions: subscriptions.filter(sub => sub.status === 'active').length,
    churnRate: '3.2%',
    avgRevenue: Math.round(subscriptions.reduce((sum, sub) => sum + sub.amount, 0) / subscriptions.length)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'cancelled': return 'destructive';
      case 'expired': return 'secondary';
      case 'pending': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'basic': return 'secondary';
      case 'premium': return 'default';
      case 'enterprise': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">Subscription Management</h1>
          <p className="text-muted-foreground">Manage merchant subscription plans and billing</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">Monthly recurring revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Currently paying merchants</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Churn Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{stats.churnRate}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Avg Revenue</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">${stats.avgRevenue}</div>
            <p className="text-xs text-muted-foreground">Per merchant</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subscriptions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="subscriptions" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search merchants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subscriptions Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Merchant</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell>
                      <div>
                        <div>{subscription.merchantName}</div>
                        <div className="text-sm text-muted-foreground">{subscription.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPlanColor(subscription.plan)}>
                        {subscription.plan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(subscription.status)}>
                        {subscription.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{subscription.startDate}</TableCell>
                    <TableCell>{subscription.endDate}</TableCell>
                    <TableCell>${subscription.amount}/mo</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Subscription Plans</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Plan</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="planName">Plan Name</Label>
                    <Input id="planName" placeholder="Enter plan name" />
                  </div>
                  <div>
                    <Label htmlFor="planPrice">Price</Label>
                    <Input id="planPrice" type="number" placeholder="Enter price" />
                  </div>
                  <div>
                    <Label htmlFor="planInterval">Billing Interval</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full">Create Plan</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.isPopular ? 'border-primary' : ''}`}>
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl">
                    LKR {plan.price}
                    <span className="text-base text-muted-foreground">/{plan.interval}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}