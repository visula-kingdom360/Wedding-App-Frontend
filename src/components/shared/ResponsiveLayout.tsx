import { ResponsiveNavigation } from './ResponsiveNavigation';
import { TopBar } from './TopBar';
import { useIsMobile } from './useMediaQuery';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface ResponsiveLayoutProps {
  user: User | null;
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  onLoginRequest?: () => void;
  children: React.ReactNode;
  showTopBar?: boolean;
  customTitle?: string;
  notificationCount?: number;
}

export function ResponsiveLayout({ 
  user,
  currentScreen,
  onNavigate,
  onLogout,
  onLoginRequest,
  children,
  showTopBar = false,
  customTitle,
  notificationCount = 0
}: ResponsiveLayoutProps) {
  const isMobile = useIsMobile();

  const handleProfileClick = () => {
    onNavigate('profile');
  };

  const handleLoginClick = () => {
    if (onLoginRequest) {
      onLoginRequest();
    }
  };

  return (
    <div className="min-h-screen bg-forest-green-50">
      {/* Top Bar - Show on desktop when enabled */}
      {showTopBar && (
        <div className={`${!isMobile && user ? 'md:ml-64' : ''}`}>
          <TopBar 
            user={user}
            onProfileClick={handleProfileClick}
            onLoginClick={handleLoginClick}
            onLogout={onLogout}
            showSearch={false}
            customTitle={customTitle}
          />
        </div>
      )}

      {/* Navigation */}
      {user && (
        <ResponsiveNavigation
          currentScreen={currentScreen}
          onNavigate={onNavigate}
          userRole={user.role}
          notificationCount={notificationCount}
        />
      )}

      {/* Main Content */}
      <main className={`
        ${!isMobile && user ? 'md:ml-64' : ''}
        ${currentScreen === 'vendor-swipe' ? 'pt-0 pb-0' : `pt-0 ${isMobile && user ? 'pb-20' : 'pb-4'}`}
        min-h-screen
        w-full
        overflow-x-hidden
        bg-forest-green-50
      `}>
        <div className="w-full bg-forest-green-50">
          {children}
        </div>
      </main>
    </div>
  );
}