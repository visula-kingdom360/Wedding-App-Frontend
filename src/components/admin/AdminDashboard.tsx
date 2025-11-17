import { DashboardLayout } from '../shared/DashboardLayout';
import { DashboardGrid } from '../shared/DashboardGrid';
import { KPICard } from '../shared/KPICard';
import { QuickActionCard } from '../shared/QuickActionCard';
import { ActivityFeed } from '../shared/ActivityFeed';
import { StatsGrid } from '../shared/StatsGrid';
import { Button } from '../ui/button';
import { Users, Store, Calendar, DollarSign, Gift, Crown, LogOut } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

type AdminView = 'dashboard' | 'events' | 'products' | 'merchants' | 'promotions' | 'subscriptions';

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
  onNavigate: (view: AdminView) => void;
}

export function AdminDashboard({ user, onLogout, onNavigate }: AdminDashboardProps) {
  const kpis = [
    { 
      title: 'Total Users', 
      value: '2,847', 
      change: '+12%', 
      changeType: 'positive' as const,
      icon: Users, 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Active Merchants', 
      value: '342', 
      change: '+8%', 
      changeType: 'positive' as const,
      icon: Store, 
      iconColor: 'text-green-600' 
    },
    { 
      title: 'Total Bookings', 
      value: '1,205', 
      change: '+15%', 
      changeType: 'positive' as const,
      icon: Calendar, 
      iconColor: 'text-purple-600' 
    },
    { 
      title: 'Revenue', 
      value: 'LKR 87,420', 
      change: '+22%', 
      changeType: 'positive' as const,
      icon: DollarSign, 
      iconColor: 'text-yellow-600' 
    }
  ];

  const quickActions = [
    { title: 'Manage Events', description: 'View and moderate event listings', icon: Calendar, action: () => onNavigate('events') },
    { title: 'Manage Merchants', description: 'View and manage merchant accounts', icon: Users, action: () => onNavigate('merchants') },
    { title: 'Products & Services', description: 'Map and organize service categories', icon: Store, action: () => onNavigate('products') },
    { title: 'Promotions', description: 'Create and manage platform promotions', icon: Gift, action: () => onNavigate('promotions') },
    { title: 'Subscriptions', description: 'Handle merchant subscription plans', icon: Crown, action: () => onNavigate('subscriptions') }
  ];

  const recentActivity = [
    { 
      id: '1',
      action: 'New merchant registered', 
      subject: 'Perfect Moments Photography', 
      time: '2 hours ago', 
      status: 'pending',
      priority: 'medium' as const
    },
    { 
      id: '2',
      action: 'Event created', 
      subject: 'Garden Venues Ltd.', 
      time: '4 hours ago', 
      status: 'approved',
      priority: 'low' as const
    },
    { 
      id: '3',
      action: 'Subscription upgraded', 
      subject: 'Elite Catering Co.', 
      time: '1 day ago', 
      status: 'completed',
      priority: 'low' as const
    },
    { 
      id: '4',
      action: 'Report submitted', 
      subject: 'Wedding Planners Inc.', 
      time: '2 days ago', 
      status: 'investigating',
      priority: 'high' as const
    }
  ];

  const monthlyStats = [
    { label: 'New Users', value: '147' },
    { label: 'New Merchants', value: '23' },
    { label: 'Total Bookings', value: '89' }
  ];

  const platformHealth = [
    { label: 'Active Sessions', value: '1,247', badge: { text: 'Online', variant: 'secondary' as const } },
    { label: 'Pending Reviews', value: '8', badge: { text: 'Urgent', variant: 'destructive' as const } },
    { label: 'System Status', value: 'Healthy', badge: { text: 'All Systems', variant: 'default' as const } }
  ];

  return (
    <div className="p-6 space-y-6 min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* KPI Cards */}
        <DashboardGrid columns={4}>
          {kpis.map((kpi, index) => (
            <KPICard
              key={index}
              title={kpi.title}
              value={kpi.value}
              change={kpi.change}
              changeType={kpi.changeType}
              icon={kpi.icon}
              iconColor={kpi.iconColor}
            />
          ))}
        </DashboardGrid>

        {/* Quick Actions */}
        <QuickActionCard
          title="Quick Actions"
          actions={quickActions}
        />

        {/* Platform Stats */}
        <DashboardGrid columns={2}>
          <StatsGrid
            title="This Month"
            stats={monthlyStats}
          />
          <StatsGrid
            title="Platform Health"
            stats={platformHealth}
          />
        </DashboardGrid>

        {/* Recent Activity */}
        <ActivityFeed
          title="Recent Activity"
          activities={recentActivity}
        />
      </div>
    </div>
  );
}