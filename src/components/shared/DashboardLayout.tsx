import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  onLogout: () => void;
  children: ReactNode;
  headerActions?: ReactNode;
}

export function DashboardLayout({ 
  title, 
  subtitle, 
  user, 
  onLogout, 
  children, 
  headerActions 
}: DashboardLayoutProps) {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-4">
          {headerActions}
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}