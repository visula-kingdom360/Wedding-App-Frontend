import { useState } from 'react';
import { AdminDashboard } from './AdminDashboard';
import { AdminEvents } from './AdminEvents';
import { AdminProducts } from './AdminProducts';
import { AdminMerchants } from './AdminMerchants';
import { AdminPromotions } from './AdminPromotions';
import { AdminSubscriptions } from './AdminSubscriptions';
import { ResponsiveLayout } from '../shared/ResponsiveLayout';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AdminAppProps {
  user: User;
  onLogout: () => void;
}

type AdminView = 'dashboard' | 'events' | 'products' | 'merchants' | 'promotions' | 'subscriptions';

function getScreenTitle(screen: AdminView): string {
  switch (screen) {
    case 'events': return 'Event Management';
    case 'products': return 'Product Management';
    case 'merchants': return 'Merchant Management';
    case 'promotions': return 'Promotions';
    case 'subscriptions': return 'Subscriptions';
    default: return '';
  }
}

export function AdminApp({ user, onLogout }: AdminAppProps) {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard user={user} onLogout={onLogout} onNavigate={setCurrentView} />;
      case 'events':
        return <AdminEvents user={user} />;
      case 'products':
        return <AdminProducts user={user} />;
      case 'merchants':
        return <AdminMerchants user={user} />;
      case 'promotions':
        return <AdminPromotions user={user} />;
      case 'subscriptions':
        return <AdminSubscriptions user={user} />;
      default:
        return <AdminDashboard user={user} onLogout={onLogout} onNavigate={setCurrentView} />;
    }
  };

  return (
    <ResponsiveLayout
      user={user}
      currentScreen={currentView}
      onNavigate={setCurrentView}
      onLogout={onLogout}
      showTopBar={true}
      customTitle={getScreenTitle(currentView)}
      notificationCount={0}
    >
      {renderCurrentView()}
    </ResponsiveLayout>
  );
}