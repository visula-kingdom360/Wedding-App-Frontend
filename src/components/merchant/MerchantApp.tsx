import { useState } from 'react';
import { MerchantDashboard } from './MerchantDashboard';
import { CreateProfile } from './CreateProfile';
import { AddService } from './AddService';
import { MerchantCalendar } from './MerchantCalendar';
import { MerchantNotifications } from './MerchantNotifications';
import { PackageList } from './PackageList';
import { PackageDetails } from './PackageDetails';
import { MerchantReviews } from './MerchantReviews';
import { MerchantProfile } from './MerchantProfile';
import { NotificationDemo } from './NotificationDemo';
import { ResponsiveLayout } from '../shared/ResponsiveLayout';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantAppProps {
  user: User;
  onLogout: () => void;
}

export type MerchantScreen = 'dashboard' | 'profile' | 'add-service' | 'calendar' | 'notifications' | 'packages' | 'package-details' | 'reviews' | 'notification-demo';

function getScreenTitle(screen: MerchantScreen): string {
  switch (screen) {
    case 'profile': return 'Business Profile';
    case 'add-service': return 'Add New Service';
    case 'calendar': return 'Merchant View';
    case 'notifications': return 'Notifications';
    case 'packages': return 'My Packages';
    case 'package-details': return 'Package Details';
    case 'reviews': return 'Customer Reviews';
    default: return '';
  }
}

export function MerchantApp({ user, onLogout }: MerchantAppProps) {
  const [currentScreen, setCurrentScreen] = useState<MerchantScreen>('dashboard');
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>('2');
  const [packageMode, setPackageMode] = useState<'view' | 'edit'>('view');

  const handleProfileClick = () => {
    setCurrentScreen('profile');
  };

  const handleLoginClick = () => {
    // Not applicable for merchant app
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <MerchantDashboard user={user} onNavigate={setCurrentScreen} onLogout={onLogout} />;
      case 'profile':
        return <MerchantProfile user={user} onBack={() => setCurrentScreen('dashboard')} onLogout={onLogout} />;
      case 'add-service':
        return <AddService onBack={() => setCurrentScreen('dashboard')} />;
      case 'calendar':
        return <MerchantCalendar user={user} onBack={() => setCurrentScreen('dashboard')} />;
      case 'notifications':
        return <MerchantNotifications 
          user={user} 
          onBack={() => setCurrentScreen('dashboard')}
        />;
      case 'packages':
        return <PackageList 
          user={user} 
          onBack={() => setCurrentScreen('dashboard')}
          onAddPackage={() => {
            setSelectedPackageId(undefined);
            setPackageMode('edit');
            setCurrentScreen('package-details');
          }}
          onEditPackage={(packageId) => {
            setSelectedPackageId(packageId);
            setPackageMode('edit');
            setCurrentScreen('package-details');
          }}
          onViewPackage={(packageId) => {
            setSelectedPackageId(packageId);
            setPackageMode('view');
            setCurrentScreen('package-details');
          }}
        />;
      case 'package-details':
        return <PackageDetails 
          packageId={selectedPackageId}
          onBack={() => setCurrentScreen('packages')}
          mode={packageMode}
        />;
      case 'reviews':
        return <MerchantReviews 
          user={user} 
          onBack={() => setCurrentScreen('dashboard')}
        />;
      case 'notification-demo':
        return <NotificationDemo onBack={() => setCurrentScreen('dashboard')} />;
      default:
        return <MerchantDashboard user={user} onNavigate={setCurrentScreen} onLogout={onLogout} />;
    }
  };

  const showTopBar = !['profile', 'package-details'].includes(currentScreen); // Show TopBar on all screens except profile and package-details
  const showBottomNav = ['dashboard', 'packages', 'calendar', 'notifications', 'reviews'].includes(currentScreen);

  return (
    <ResponsiveLayout
      user={user}
      currentScreen={currentScreen}
      onNavigate={setCurrentScreen}
      onLogout={onLogout}
      showTopBar={showTopBar}
      customTitle={getScreenTitle(currentScreen)}
      notificationCount={5}
    >
      {renderScreen()}
    </ResponsiveLayout>
  );
}