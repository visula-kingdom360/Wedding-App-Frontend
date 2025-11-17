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
  Package
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

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
  const [packages] = useState([
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

  const handleDeletePackage = (packageId: string) => {
    // Handle package deletion
    console.log('Delete package:', packageId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-forest-green-500 text-white';
      case 'draft':
        return 'bg-bronze-brown-100 text-bronze-brown-600';
      case 'paused':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
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

      {/* Package List */}
      <div className="p-4 space-y-4 pb-20">
        {packages.length === 0 ? (
          <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <CardContent className="p-8 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-neutral-dark mb-2">No packages yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first package to start receiving bookings
              </p>
              <Button 
                onClick={onAddPackage}
                className="bg-forest-green-500 hover:bg-forest-green-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Package
              </Button>
            </CardContent>
          </Card>
        ) : (
          packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
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
                        className="border-forest-green-200 text-forest-green-600 hover:bg-forest-green-50"
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
      <div className="fixed bottom-20 right-4">
        <Button 
          onClick={onAddPackage}
          className="w-14 h-14 rounded-full bg-forest-green-500 hover:bg-forest-green-600 text-white shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
