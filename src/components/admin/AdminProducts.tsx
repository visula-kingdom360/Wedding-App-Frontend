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
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Package,
  DollarSign,
  Tag,
  TrendingUp
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  basePrice: number;
  avgPrice: number;
  totalListings: number;
  popularityScore: number;
  status: 'active' | 'inactive' | 'deprecated';
  tags: string[];
}

interface ServiceMapping {
  id: string;
  serviceName: string;
  category: string;
  merchantCount: number;
  avgRating: number;
  bookingsCount: number;
  revenueShare: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AdminProductsProps {
  user: User;
}

export function AdminProducts({ user }: AdminProductsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wedding Photography Package',
      category: 'Photography',
      subcategory: 'Full Day Coverage',
      description: 'Complete wedding day photography with digital gallery',
      basePrice: 1500,
      avgPrice: 2200,
      totalListings: 45,
      popularityScore: 8.7,
      status: 'active',
      tags: ['photography', 'wedding', 'digital', 'album']
    },
    {
      id: '2',
      name: 'Venue Rental - Outdoor Garden',
      category: 'Venue',
      subcategory: 'Garden/Outdoor',
      description: 'Beautiful outdoor garden venue for ceremonies',
      basePrice: 2000,
      avgPrice: 3500,
      totalListings: 18,
      popularityScore: 9.2,
      status: 'active',
      tags: ['venue', 'outdoor', 'garden', 'ceremony']
    },
    {
      id: '3',
      name: 'Catering Service - Premium Menu',
      category: 'Catering',
      subcategory: 'Fine Dining',
      description: 'Multi-course gourmet dining experience',
      basePrice: 85,
      avgPrice: 120,
      totalListings: 67,
      popularityScore: 7.9,
      status: 'active',
      tags: ['catering', 'fine-dining', 'gourmet', 'multi-course']
    },
    {
      id: '4',
      name: 'Floral Arrangements - Bridal Bouquet',
      category: 'Florist',
      subcategory: 'Bridal Flowers',
      description: 'Custom bridal bouquet with seasonal flowers',
      basePrice: 150,
      avgPrice: 280,
      totalListings: 89,
      popularityScore: 8.4,
      status: 'active',
      tags: ['flowers', 'bridal', 'bouquet', 'custom']
    },
    {
      id: '5',
      name: 'DJ Services - Reception Entertainment',
      category: 'Entertainment',
      subcategory: 'Music/DJ',
      description: 'Professional DJ services for wedding reception',
      basePrice: 800,
      avgPrice: 1200,
      totalListings: 34,
      popularityScore: 7.6,
      status: 'inactive',
      tags: ['dj', 'music', 'entertainment', 'reception']
    }
  ];

  const mockServiceMappings: ServiceMapping[] = [
    {
      id: '1',
      serviceName: 'Wedding Photography',
      category: 'Photography',
      merchantCount: 45,
      avgRating: 4.7,
      bookingsCount: 324,
      revenueShare: 15
    },
    {
      id: '2',
      serviceName: 'Venue Rental',
      category: 'Venue',
      merchantCount: 28,
      avgRating: 4.5,
      bookingsCount: 189,
      revenueShare: 12
    },
    {
      id: '3',
      serviceName: 'Catering Services',
      category: 'Catering',
      merchantCount: 67,
      avgRating: 4.6,
      bookingsCount: 456,
      revenueShare: 18
    },
    {
      id: '4',
      serviceName: 'Floral Design',
      category: 'Florist',
      merchantCount: 52,
      avgRating: 4.8,
      bookingsCount: 278,
      revenueShare: 10
    }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredServices = mockServiceMappings.filter(service => {
    const matchesSearch = service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'deprecated': return 'destructive';
      default: return 'secondary';
    }
  };

  const categories = ['Photography', 'Venue', 'Catering', 'Florist', 'Entertainment', 'Planning'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products & Services</h1>
          <p className="text-muted-foreground">Manage product categories and service mappings</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add {activeTab === 'products' ? 'Product' : 'Service'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New {activeTab === 'products' ? 'Product' : 'Service'}</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new {activeTab === 'products' ? 'product' : 'service'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {activeTab === 'products' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subcategory">Subcategory</Label>
                      <Input id="subcategory" placeholder="Enter subcategory" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="basePrice">Base Price (LKR)</Label>
                      <Input id="basePrice" type="number" placeholder="0.00" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="tag1, tag2, tag3" />
                  </div>
                </>
              )}
              {activeTab === 'services' && (
                <div className="space-y-2">
                  <Label htmlFor="revenueShare">Revenue Share (%)</Label>
                  <Input id="revenueShare" type="number" placeholder="15" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter description" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Add {activeTab === 'products' ? 'Product' : 'Service'}
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
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Across all categories
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProducts.filter(p => p.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Product Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              LKR {Math.round(mockProducts.reduce((acc, p) => acc + p.avgPrice, 0) / mockProducts.length)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              Available categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'products' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('products')}
        >
          Products
        </Button>
        <Button
          variant={activeTab === 'services' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('services')}
        >
          Service Mappings
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      {activeTab === 'products' && (
        <Card>
          <CardHeader>
            <CardTitle>Products List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Avg. Price</TableHead>
                  <TableHead>Listings</TableHead>
                  <TableHead>Popularity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.subcategory}</div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>LKR {product.basePrice}</TableCell>
                    <TableCell>LKR {product.avgPrice}</TableCell>
                    <TableCell>{product.totalListings}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{product.popularityScore}/10</span>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${product.popularityScore * 10}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(product.status)}>
                        {product.status}
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
      )}

      {/* Service Mappings Table */}
      {activeTab === 'services' && (
        <Card>
          <CardHeader>
            <CardTitle>Service Mappings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Merchants</TableHead>
                  <TableHead>Avg. Rating</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Revenue Share</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.serviceName}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.merchantCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <span>{service.avgRating}</span>
                        <span className="text-muted-foreground text-sm">/ 5.0</span>
                      </div>
                    </TableCell>
                    <TableCell>{service.bookingsCount}</TableCell>
                    <TableCell>{service.revenueShare}%</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
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
      )}
    </div>
  );
}