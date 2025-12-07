import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CreateMerchantWizard } from './CreateMerchantWizard';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Store,
  Users,
  DollarSign,
  Star,
  AlertTriangle,
  Check,
  X,
  Camera,
  Clock,
  MapPin,
  Phone,
  Mail,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus as PlusIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface Merchant {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  rating: number;
  totalBookings: number;
  revenue: number;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  joinDate: string;
  subscription: 'basic' | 'premium' | 'enterprise';
  description: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AdminMerchantsProps {
  user: User;
}

export function AdminMerchants({ user }: AdminMerchantsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const mockMerchants: Merchant[] = [
    {
      id: '1',
      name: 'Perfect Venues Ltd.',
      email: 'contact@perfectvenues.com',
      phone: '+1 (555) 123-4567',
      category: 'Venue',
      location: 'New York, NY',
      rating: 4.8,
      totalBookings: 156,
      revenue: 89500,
      status: 'active',
      joinDate: '2023-06-15',
      subscription: 'premium',
      description: 'Luxury wedding venues across the city'
    },
    {
      id: '2',
      name: 'Moments Photography',
      email: 'hello@momentsphotography.com',
      phone: '+1 (555) 234-5678',
      category: 'Photography',
      location: 'Los Angeles, CA',
      rating: 4.9,
      totalBookings: 89,
      revenue: 125000,
      status: 'active',
      joinDate: '2023-08-22',
      subscription: 'enterprise',
      description: 'Professional wedding photography services'
    },
    {
      id: '3',
      name: 'Elite Catering Co.',
      email: 'info@elitecatering.com',
      phone: '+1 (555) 345-6789',
      category: 'Catering',
      location: 'Chicago, IL',
      rating: 4.6,
      totalBookings: 234,
      revenue: 178000,
      status: 'pending',
      joinDate: '2024-01-10',
      subscription: 'basic',
      description: 'Gourmet catering for special occasions'
    },
    {
      id: '4',
      name: 'Bloom Flowers',
      email: 'orders@bloomflowers.com',
      phone: '+1 (555) 456-7890',
      category: 'Florist',
      location: 'Miami, FL',
      rating: 4.4,
      totalBookings: 67,
      revenue: 34500,
      status: 'suspended',
      joinDate: '2023-11-05',
      subscription: 'basic',
      description: 'Fresh flowers and floral arrangements'
    }
  ];

  const filteredMerchants = mockMerchants.filter(merchant => {
    const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         merchant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || merchant.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'suspended': return 'destructive';
      case 'rejected': return 'outline';
      default: return 'secondary';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'basic': return 'outline';
      case 'premium': return 'secondary';
      case 'enterprise': return 'default';
      default: return 'outline';
    }
  };

  const handleCreateMerchant = () => {
    // Handle merchant creation
    setIsCreateDialogOpen(false);
  };

  const handleApprove = (merchantId: string) => {
    // Handle merchant approval
    console.log('Approving merchant:', merchantId);
  };

  const handleReject = (merchantId: string) => {
    // Handle merchant rejection
    console.log('Rejecting merchant:', merchantId);
  };

  const handleWizardComplete = (formData: any) => {
    console.log('Merchant created:', formData);
    toast.success('Merchant account created successfully!');
    setIsCreateDialogOpen(false);
  };

  const handleWizardCancel = () => {
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Merchant Management</h1>
          <p className="text-muted-foreground">Manage and monitor all platform merchants</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Merchant
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Complete Merchant Profile</DialogTitle>
              <DialogDescription>Set up a comprehensive merchant account with all business details</DialogDescription>
            </DialogHeader>
            <CreateMerchantWizard
              onComplete={handleWizardComplete}
              onCancel={handleWizardCancel}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Merchants</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMerchants.length}</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMerchants.filter(m => m.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently serving
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMerchants.filter(m => m.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockMerchants.reduce((acc, m) => acc + m.revenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Platform commission
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
                placeholder="Search merchants..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Merchants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Merchants List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Subscription</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMerchants.map((merchant) => (
                <TableRow key={merchant.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          {merchant.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{merchant.name}</div>
                        <div className="text-sm text-muted-foreground">{merchant.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{merchant.category}</TableCell>
                  <TableCell>{merchant.location}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{merchant.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>{merchant.totalBookings}</TableCell>
                  <TableCell>${merchant.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getSubscriptionColor(merchant.subscription)}>
                      {merchant.subscription}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(merchant.status)}>
                      {merchant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {merchant.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(merchant.id)}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleReject(merchant.id)}
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </Button>
                        </>
                      )}
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