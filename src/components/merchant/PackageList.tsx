import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  MoreVertical,
  Package,
  Sparkles,
  Star,
  Zap,
  ShoppingBag,
  Power,
  Filter
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { PromotionForm } from './PromotionForm';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface PackageListProps {
  user: User;
  onBack: () => void;
  onAddPackage: () => void;
  onEditPackage: (packageId: string) => void;
  onViewPackage?: (packageId: string) => void;
}

export function PackageList({ user, onBack, onAddPackage, onEditPackage, onViewPackage }: PackageListProps) {
  const [packages, setPackages] = useState([
    {
      id: '1',
      title: 'Basic Wedding Package',
      description: 'Perfect for intimate weddings with essential photography coverage and edited photos.',
      price: 'LKR 25,000',
      category: 'Photography',
      status: 'active',
      enquiries: 12,
      lastUpdated: '2 days ago'
    },
    {
      id: '2',
      title: 'Premium Wedding Package',
      description: 'Comprehensive wedding photography with engagement shoot and premium album included.',
      price: 'LKR 45,000',
      category: 'Photography',
      status: 'active',
      enquiries: 8,
      lastUpdated: '1 week ago'
    },
    {
      id: '3',
      title: 'Destination Wedding Package',
      description: 'Special package for destination weddings including travel and accommodation coverage.',
      price: 'LKR 75,000',
      category: 'Photography',
      status: 'active',
      enquiries: 5,
      lastUpdated: '3 days ago'
    },
    {
      id: '4',
      title: 'Engagement Photography',
      description: 'Beautiful engagement photo session at your preferred location with professional editing.',
      price: 'LKR 15,000',
      category: 'Photography',
      status: 'draft',
      enquiries: 0,
      lastUpdated: '1 day ago'
    }
  ]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showPromotionForm, setShowPromotionForm] = useState(false);
  const [promotionType, setPromotionType] = useState<'main' | 'secondary' | 'featured'>('main');

  const handleDeletePackage = (packageId: string) => {
    // Handle package deletion
    console.log('Delete package:', packageId);
  };

  const handleToggleStatus = (packageId: string) => {
    setPackages(prevPackages => 
      prevPackages.map(pkg => {
        if (pkg.id === packageId) {
          const newStatus = pkg.status === 'active' ? 'inactive' : 'active';
          return { ...pkg, status: newStatus };
        }
        return pkg;
      })
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-forest-green-500 text-white';
      case 'inactive':
        return 'bg-gray-400 text-white';
      case 'draft':
        return 'bg-bronze-brown-100 text-bronze-brown-600';
      case 'paused':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Get unique categories from packages
  const categories = Array.from(new Set(packages.map(pkg => pkg.category)));

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Filter packages based on selected categories
  const filteredPackages = selectedCategories.length === 0 
    ? packages 
    : packages.filter(pkg => selectedCategories.includes(pkg.category));

  const handleOpenPromotion = (type: 'main' | 'secondary' | 'featured') => {
    setPromotionType(type);
    setShowPromotionForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6 text-neutral-dark" />
          </Button>
          <h1 className="text-xl font-medium text-neutral-dark">My Packages</h1>
        </div>
        <Badge className="bg-forest-green-100 text-forest-green-600">
          {packages.filter(p => p.status === 'active').length} Active
        </Badge>
      </div>

      {/* Promotional Management Section */}
      <div className="p-4 pt-6">
        <div className="mb-3">
          <h2 className="text-sm uppercase tracking-wide text-muted-foreground mb-1">Promotional Tools</h2>
          <p className="text-xs text-muted-foreground">Boost your visibility and attract more customers</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Add Products */}
          <Card className="bg-[#0C3B2E] border-0 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95" onClick={onAddPackage}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <ShoppingBag className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <h3 className="font-semibold text-white text-sm drop-shadow-md">Add Products</h3>
              <p className="text-xs text-white/90 drop-shadow-sm mt-1">Manage inventory</p>
            </CardContent>
          </Card>

          {/* Add Main Promotion */}
          <Card className="bg-[#FFBA00] border-0 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95" onClick={() => handleOpenPromotion('main')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Sparkles className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <h3 className="font-semibold text-white text-sm drop-shadow-md">Main Promotion</h3>
              <p className="text-xs text-white/90 drop-shadow-sm mt-1">Top spotlight</p>
            </CardContent>
          </Card>

          {/* Secondary Promotion */}
          <Card className="bg-[#B46617] border-0 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95" onClick={() => handleOpenPromotion('secondary')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <h3 className="font-semibold text-white text-sm drop-shadow-md">Secondary Promo</h3>
              <p className="text-xs text-white/90 drop-shadow-sm mt-1">Extra visibility</p>
            </CardContent>
          </Card>

          {/* Add Featured */}
          <Card className="bg-[#6D9773] border-0 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95" onClick={() => handleOpenPromotion('featured')}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center h-32">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-white drop-shadow-md" />
              </div>
              <h3 className="font-semibold text-white text-sm drop-shadow-md">Add Featured</h3>
              <p className="text-xs text-white/90 drop-shadow-sm mt-1">Premium listing</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category Filter */}
      <div className="px-4 pb-4">
        <h3 className="text-sm text-neutral-dark mb-3">Filter your products</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategories([])}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              selectedCategories.length === 0
                ? 'bg-forest-green-600 text-white'
                : 'bg-gray-100 text-neutral-dark hover:bg-gray-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>All</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategories.includes(category)
                  ? 'bg-forest-green-600 text-white'
                  : 'bg-gray-100 text-neutral-dark hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Package List */}
      <div className="px-4 pb-4 space-y-4 pb-20">
        {filteredPackages.length === 0 ? (
          <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <CardContent className="p-8 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-neutral-dark mb-2">
                {packages.length === 0 ? 'No packages yet' : 'No packages match the selected filters'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {packages.length === 0 
                  ? 'Create your first package to start receiving bookings'
                  : 'Try selecting different categories or clear the filters'
                }
              </p>
              {packages.length === 0 ? (
                <Button 
                  onClick={onAddPackage}
                  className="bg-forest-green-500 hover:bg-forest-green-600 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Package
                </Button>
              ) : (
                <Button 
                  onClick={() => setSelectedCategories([])}
                  className="bg-forest-green-500 hover:bg-forest-green-600 text-white"
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer ${pkg.status === 'inactive' ? 'opacity-60' : ''}`}
              onClick={() => onViewPackage?.(pkg.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-neutral-dark">{pkg.title}</h3>
                        <Badge className={`text-xs ${getStatusColor(pkg.status)}`}>
                          {pkg.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-bronze-brown-500">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{pkg.category}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-2"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onViewPackage?.(pkg.id); }}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEditPackage(pkg.id); }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={(e) => { e.stopPropagation(); handleToggleStatus(pkg.id); }}
                          className={pkg.status === 'active' ? 'text-orange-600' : 'text-forest-green-600'}
                        >
                          <Power className="w-4 h-4 mr-2" />
                          {pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={(e) => { e.stopPropagation(); handleDeletePackage(pkg.id); }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-forest-green-500">{pkg.enquiries}</p>
                        <p className="text-xs text-muted-foreground">Enquiries</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Updated {pkg.lastUpdated}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onEditPackage(pkg.id); }}
                        className="border-forest-green-200 text-forest-green-600 hover:bg-gray-100 hover:text-forest-green-600"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-[calc(5rem+5vh)] right-4">
        <Button 
          onClick={onAddPackage}
          className="w-14 h-14 rounded-full bg-forest-green-500 hover:bg-forest-green-600 text-white shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Promotion Form Modal */}
      {showPromotionForm && (
        <PromotionForm
          promotionType={promotionType}
          onClose={() => setShowPromotionForm(false)}
        />
      )}
    </div>
  );
}
