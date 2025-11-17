import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: LucideIcon;
  iconColor?: string;
  description?: string;
}

export function KPICard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon, 
  iconColor = 'text-muted-foreground',
  description 
}: KPICardProps) {
  const getTrendIcon = () => {
    if (!change) return null;
    
    if (changeType === 'positive') {
      return <TrendingUp className="w-3 h-3 mr-1 text-green-600" />;
    } else if (changeType === 'negative') {
      return <TrendingDown className="w-3 h-3 mr-1 text-red-600" />;
    } else {
      return <TrendingUp className="w-3 h-3 mr-1" />;
    }
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 ${iconColor}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl">{value}</div>
        {change && (
          <div className={`flex items-center text-xs ${getChangeColor()}`}>
            {getTrendIcon()}
            {change} {description || 'from last month'}
          </div>
        )}
        {description && !change && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}