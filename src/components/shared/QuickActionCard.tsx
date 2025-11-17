import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { LucideIcon } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
  color?: string;
}

interface QuickActionCardProps {
  title: string;
  actions: QuickAction[];
}

export function QuickActionCard({ title, actions }: QuickActionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-full h-auto p-4 justify-start"
            onClick={action.action}
          >
            <action.icon className={`w-5 h-5 mr-3 ${action.color || ''}`} />
            <div className="text-left">
              <div>{action.title}</div>
              <div className="text-sm text-muted-foreground">{action.description}</div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}