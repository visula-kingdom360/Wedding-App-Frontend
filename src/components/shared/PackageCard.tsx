import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface PackageCardProps {
  package: {
    id: string;
    title: string;
    description: string;
    price: string;
    originalPrice?: string;
    badge?: string;
    features?: string[];
    popular?: boolean;
    image?: string;
    category?: string;
  };
  onSelect: (id: string) => void;
  disabled?: boolean;
}

export function PackageCard({ package: pkg, onSelect, disabled = false }: PackageCardProps) {
  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!pkg.originalPrice) return null;
    const original = parseFloat(pkg.originalPrice.replace(/[^0-9.]/g, ''));
    const current = parseFloat(pkg.price.replace(/[^0-9.]/g, ''));
    if (isNaN(original) || isNaN(current)) return null;
    const discount = Math.round(((original - current) / original) * 100);
    return discount > 0 ? discount : null;
  };

  const discount = getDiscountPercentage();

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer rounded-2xl ${pkg.popular ? 'ring-2 ring-gold-yellow-500 ring-offset-2' : ''}`} onClick={() => onSelect(pkg.id)}>
      {/* Package Image with Featured Badge */}
      {pkg.image && (
        <div className="relative h-48 bg-gray-100">
          <img 
            src={pkg.image} 
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          
          {/* Featured Ribbon Badge */}
          {pkg.badge === 'FEATURED' && (
            <div className="absolute top-3 left-0 z-10">
              <div className="bg-[#FFBA00] text-[#1a1a1a] px-2.5 py-1 text-[10px] font-semibold shadow-md relative">
                FEATURED
                {/* Triangular fold on right side */}
                <div className="absolute right-0 top-full w-0 h-0 border-t-[6px] border-t-[#c79500] border-r-[6px] border-r-transparent"></div>
              </div>
            </div>
          )}
        </div>
      )}

      <CardContent className="p-5">
        <div className="space-y-3">
          {/* Category Label */}
          {pkg.category && (
            <p className="text-sm text-[#0C3B2E] font-medium">{pkg.category}</p>
          )}

          {/* Title */}
          <h4 className="text-xl font-medium text-[#1a1a1a] line-clamp-2 leading-tight">{pkg.title}</h4>

          {/* Price Section */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-2xl font-semibold text-[#1a1a1a]">{pkg.price}</span>
            {pkg.originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">{pkg.originalPrice}</span>
                {discount && (
                  <Badge className="bg-[#FFBA00] text-[#1a1a1a] hover:bg-[#FFBA00] text-xs px-2 py-0.5 font-semibold">
                    {discount}% OFF
                  </Badge>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
