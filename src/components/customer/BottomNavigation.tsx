import { Home, Calendar, User, Grid3x3, Users } from 'lucide-react';
import type { CustomerScreen } from './CustomerApp';

interface BottomNavigationProps {
  currentScreen: CustomerScreen;
  onNavigate: (screen: CustomerScreen) => void;
  notificationCount?: number;
}

export function BottomNavigation({ currentScreen, onNavigate, notificationCount = 0 }: BottomNavigationProps) {
  const navItems = [
    { id: 'home' as CustomerScreen, label: 'Home', icon: Home },
    { id: 'vendor' as CustomerScreen, label: 'Vendor', icon: Users },
    { id: 'bookings' as CustomerScreen, label: 'My Events', icon: Calendar },
    { id: 'categories' as CustomerScreen, label: 'Categories', icon: Grid3x3 },
    { id: 'profile' as CustomerScreen, label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-6 flex items-center justify-center pointer-events-none bg-transparent">
      <div className="inline-flex items-center gap-1 bg-[#0C3B2E] rounded-full shadow-2xl px-3 py-2.5 pointer-events-auto">
        {/* EC Logo */}
        <div className="flex items-center justify-center mr-2" style={{ width: '48px', height: '48px' }}>
          <div className="relative flex items-center justify-center" style={{ width: '36px', height: '36px' }}>
            {/* House Icon */}
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M6 14L18 6L30 14V28C30 28.5304 29.7893 29.0391 29.4142 29.4142C29.0391 29.7893 28.5304 30 28 30H8C7.46957 30 6.96086 29.7893 6.58579 29.4142C6.21071 29.0391 6 28.5304 6 28V14Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            {/* EC Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white" style={{ fontSize: '10px', fontWeight: 600, marginTop: '4px' }}>EC</span>
            </div>
          </div>
        </div>

        {/* Navigation Icons */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center justify-center transition-all duration-200 relative rounded-full ${
                isActive ? 'bg-[#FFBA00]' : 'bg-transparent hover:bg-white/10'
              }`}
              style={{ width: '40px', height: '40px' }}
            >
              <Icon 
                className={`transition-all duration-200 ${
                  isActive 
                    ? 'text-[#0C3B2E] w-5 h-5' 
                    : 'text-white w-5 h-5'
                }`}
                strokeWidth={2}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
