import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface StatItem {
  label: string;
  value: string | number;
  badge?: {
    text: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

interface StatsGridProps {
  title: string;
  stats: StatItem[];
  columns?: number;
}

export function StatsGrid({ title, stats, columns = 1 }: StatsGridProps) {
  const gridCols = columns === 2 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className="flex items-center space-x-2">
              <span>{stat.value}</span>
              {stat.badge && (
                <Badge variant={stat.badge.variant || 'secondary'}>
                  {stat.badge.text}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}