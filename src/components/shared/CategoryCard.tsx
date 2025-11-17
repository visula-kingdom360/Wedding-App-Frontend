import { Card, CardContent } from '../ui/card';

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon?: any;
    image?: string;
    vendorCount?: number;
  };
  onClick: (id: string) => void;
  size?: 'small' | 'medium' | 'large';
}

export function CategoryCard({ category, onClick, size = 'medium' }: CategoryCardProps) {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-24 h-24', 
    large: 'aspect-square'
  };

  const textClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onClick(category.id)}
    >
      <CardContent className="p-0">
        <div className={`${size === 'large' ? 'aspect-square' : sizeClasses[size]} bg-gradient-to-br from-sage-green/20 to-forest-green/30 flex items-center justify-center group-hover:from-sage-green/30 group-hover:to-forest-green/40 transition-colors`}>
          {category.icon ? (
            <category.icon className="w-6 h-6 text-rose-600" />
          ) : (
            <span className={`${textClasses[size]} text-forest-green font-medium text-center px-2`}>
              {category.name}
            </span>
          )}
        </div>
        {size !== 'small' && (
          <div className="p-2 text-center">
            <h3 className={`${textClasses[size]} font-medium line-clamp-1`}>
              {category.name}
            </h3>
            {category.vendorCount && (
              <p className="text-xs text-muted-foreground">
                {category.vendorCount} vendors
              </p>
            )}
          </div>
        )}
        {size === 'small' && (
          <div className="p-1 text-center">
            <p className="text-xs font-medium line-clamp-1">{category.name}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}