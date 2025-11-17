import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface Activity {
  id: string;
  action: string;
  subject?: string;
  time: string;
  status?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface ActivityFeedProps {
  title: string;
  activities: Activity[];
}

export function ActivityFeed({ title, activities }: ActivityFeedProps) {
  const getStatusVariant = (status?: string) => {
    switch (status) {
      case 'approved':
      case 'completed':
      case 'active':
        return 'default';
      case 'pending':
      case 'scheduled':
        return 'secondary';
      case 'cancelled':
      case 'rejected':
      case 'investigating':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className={`flex items-center justify-between p-3 border rounded-lg border-l-4 ${getPriorityColor(activity.priority)}`}
          >
            <div className="space-y-1">
              <p>{activity.action}</p>
              {activity.subject && (
                <p className="text-sm text-muted-foreground">{activity.subject}</p>
              )}
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            {activity.status && (
              <Badge variant={getStatusVariant(activity.status)}>
                {activity.status}
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}