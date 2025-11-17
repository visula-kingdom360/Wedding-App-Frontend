import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Package, 
  Gift, 
  CreditCard, 
  LogOut,
  Shield
} from 'lucide-react';
type AdminView = 'dashboard' | 'events' | 'products' | 'merchants' | 'promotions' | 'subscriptions';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AdminSidebarProps {
  currentView: AdminView;
  onNavigate: (view: AdminView) => void;
  user: User;
  onLogout: () => void;
}

export function AdminSidebar({ currentView, onNavigate, user, onLogout }: AdminSidebarProps) {
  const menuItems = [
    { id: 'dashboard' as AdminView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'events' as AdminView, label: 'Events', icon: Calendar },
    { id: 'merchants' as AdminView, label: 'Merchants', icon: Users },
    { id: 'products' as AdminView, label: 'Products & Services', icon: Package },
    { id: 'promotions' as AdminView, label: 'Promotions', icon: Gift },
    { id: 'subscriptions' as AdminView, label: 'Subscriptions', icon: CreditCard },
  ];

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Wedding Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={currentView === item.id ? "default" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
            {item.id === 'merchants' && (
              <Badge variant="secondary" className="ml-auto">
                8
              </Badge>
            )}
          </Button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            Admin
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}