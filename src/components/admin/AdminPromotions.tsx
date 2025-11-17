import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Gift,
  TrendingUp,
  Users,
  DollarSign,
  Play,
  Pause,
  Copy
} from 'lucide-react';

interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  type: 'percentage' | 'fixed' | 'bogo' | 'free_shipping';
  value: number;
  minAmount: number;
  maxDiscount: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  categories: string[];
  merchants: string[];
  status: 'active' | 'inactive' | 'expired' | 'scheduled';
  targetAudience: 'all' | 'new_customers' | 'returning_customers' | 'merchants';
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AdminPromotionsProps {
  user: User;
}

export function AdminPromotions({ user }: AdminPromotionsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const mockPromotions: Promotion[] = [
    {
      id: '1',
      title: 'Winter Wedding Special',
      description: '20% off all wedding photography packages booked for winter dates',
      code: 'WINTER20',
      type: 'percentage',
      value: 20,
      minAmount: 1000,
      maxDiscount: 500,
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      usageLimit: 100,
      usedCount: 23,
      categories: ['Photography'],
      merchants: ['Moments Photography', 'Perfect Shots Studio'],
      status: 'active',
      targetAudience: 'all'
    },
    {
      id: '2',
      title: 'New Customer Welcome',
      description: 'LKR 100 off first booking for new customers',
      code: 'WELCOME100',
      type: 'fixed',
      value: 100,
      minAmount: 500,
      maxDiscount: 100,
      startDate: '2024-10-01',
      endDate: '2025-03-31',
      usageLimit: 500,
      usedCount: 87,
      categories: ['All'],
      merchants: [],
      status: 'active',
      targetAudience: 'new_customers'
    },
    {
      id: '3',
      title: 'Spring Venue Special',
      description: 'Book 2 venues, get 1 consultation free',
      code: 'SPRING2FOR1',
      type: 'bogo',
      value: 1,
      minAmount: 2000,
      maxDiscount: 0,
      startDate: '2025-03-01',
      endDate: '2025-05-31',
      usageLimit: 50,
      usedCount: 0,
      categories: ['Venue'],
      merchants: ['Perfect Venues Ltd.', 'Garden Venues Co.'],
      status: 'scheduled',
      targetAudience: 'all'
    },
    {
      id: '4',
      title: 'Loyalty Rewards',
      description: '15% off for returning customers',
      code: 'LOYAL15',
      type: 'percentage',
      value: 15,
      minAmount: 750,
      maxDiscount: 300,
      startDate: '2024-09-01',
      endDate: '2024-10-31',
      usageLimit: 200,
      usedCount: 198,
      categories: ['All'],
      merchants: [],
      status: 'expired',
      targetAudience: 'returning_customers'
    }
  ];

  const filteredPromotions = mockPromotions.filter(promotion => {
    const matchesSearch = promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promotion.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || promotion.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'expired': return 'destructive';
      case 'scheduled': return 'outline';
      default: return 'secondary';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'percentage': return '%';
      case 'fixed': return '$';
      case 'bogo': return 'BOGO';
      case 'free_shipping': return 'Free Ship';
      default: return type;
    }
  };

  const handleToggleStatus = (promotionId: string, currentStatus: string) => {
    // Handle promotion status toggle
    console.log('Toggling promotion status:', promotionId, currentStatus);
  };

  const handleDuplicate = (promotionId: string) => {
    // Handle promotion duplication
    console.log('Duplicating promotion:', promotionId);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Promotions Management</h1>
          <p className="text-muted-foreground">Create and manage platform promotions and discounts</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Promotion
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Promotion</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Promotion Title</Label>
                  <Input id="title" placeholder="Enter promotion title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Promotion Code</Label>
                  <Input id="code" placeholder="PROMO20" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Promotion description" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                      <SelectItem value="free_shipping">Free Shipping</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Discount Value</Label>
                  <Input id="value" type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Minimum Amount ($)</Label>
                  <Input id="minAmount" type="number" placeholder="100" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usageLimit">Usage Limit</Label>
                  <Input id="usageLimit" type="number" placeholder="100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="new_customers">New Customers</SelectItem>
                      <SelectItem value="returning_customers">Returning Customers</SelectItem>
                      <SelectItem value="merchants">Merchants</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                      <SelectItem value="venue">Venue</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="florist">Florist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Promotion
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Promotions</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPromotions.length}</div>
            <p className="text-xs text-muted-foreground">
              All time created
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPromotions.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently running
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPromotions.reduce((acc, p) => acc + p.usedCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Times used
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Given</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">LKR 45,678</div>
            <p className="text-xs text-muted-foreground">
              Customer savings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Promotions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promotions List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promotion</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Valid Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{promotion.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">
                        {promotion.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono">
                      {promotion.code}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {getTypeLabel(promotion.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {promotion.type === 'percentage' ? `${promotion.value}%` : 
                     promotion.type === 'fixed' ? `$${promotion.value}` :
                     promotion.type === 'bogo' ? 'BOGO' : 'Free'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {promotion.usedCount}/{promotion.usageLimit}
                      <div className="w-full bg-muted rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full" 
                          style={{ width: `${(promotion.usedCount / promotion.usageLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(promotion.startDate).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">
                        to {new Date(promotion.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(promotion.status)}>
                      {promotion.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleStatus(promotion.id, promotion.status)}
                      >
                        {promotion.status === 'active' ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDuplicate(promotion.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}