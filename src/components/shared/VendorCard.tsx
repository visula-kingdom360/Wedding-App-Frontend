import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Star, MapPin } from 'lucide-react';

interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    image?: string;
    price: string;
    rating?: number;
    location?: string;
    category?: string;
    featured?: boolean;
    description?: string;
  };
  onView: (id: string) => void;
  layout?: 'grid' | 'list';
}

export function VendorCard({ vendor, onView, layout = 'grid' }: VendorCardProps) {
  if (layout === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="flex">
            <div className="w-24 h-24 bg-gradient-to-br from-sage-green-100 to-forest-green-100 flex items-center justify-center">
              <span className="text-forest-green-500 text-xs text-center px-2 font-medium">{vendor.category || 'Vendor'}</span>
            </div>
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-sm">{vendor.name}</h3>
                  {vendor.description && (
                    <p className="text-xs text-muted-foreground line-clamp-1">{vendor.description}</p>
                  )}
                </div>
                {vendor.featured && (
                  <Badge className="bg-gold-yellow-500 text-neutral-dark text-xs font-medium">Featured</Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-bronze-brown-500">{vendor.price}</p>
                  {vendor.rating && (
                    <div className="flex items-center text-xs">
                      <Star className="w-3 h-3 fill-gold-yellow-500 text-gold-yellow-500 mr-1" />
                      <span>{vendor.rating}</span>
                    </div>
                  )}
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onView(vendor.id)}
                  className="bg-forest-green-500 hover:bg-forest-green-600 text-white text-xs px-3 py-1 h-7"
                >
                  View Vendor
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square bg-gradient-to-br from-sage-green-100 to-forest-green-100 flex items-center justify-center relative">
          {vendor.featured && (
            <Badge className="absolute top-2 right-2 bg-gold-yellow-500 text-neutral-dark text-xs font-medium">
              Featured
            </Badge>
          )}
          <span className="text-forest-green-500 text-sm text-center px-4 font-medium">
            {vendor.category || vendor.name}
          </span>
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-medium text-sm line-clamp-1">{vendor.name}</h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-bronze-brown-500 font-medium">{vendor.price}</p>
            {vendor.rating && (
              <div className="flex items-center text-xs">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-1" />
                <span>{vendor.rating}</span>
              </div>
            )}
          </div>
          {vendor.location && (
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="line-clamp-1">{vendor.location}</span>
            </div>
          )}
          <Button 
            size="sm" 
            onClick={() => onView(vendor.id)}
            className="w-full bg-forest-green-500 hover:bg-forest-green-600 text-white text-xs py-1 h-7"
          >
            View Vendor
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}