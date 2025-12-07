import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { useIsMobile } from './useMediaQuery';
import { 
  Home, 
  Package, 
  Calendar, 
  Bell, 
  Star, 
  User,
  Search,
  Settings,
  Menu,
  X,
  Store
} from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
  section?: 'main' | 'secondary';
}

interface ResponsiveNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  userRole: 'customer' | 'merchant' | 'admin';
  notificationCount?: number;
}

export function ResponsiveNavigation({ 
  currentScreen, 
  onNavigate, 
  userRole,
  notificationCount = 0 
}: ResponsiveNavigationProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [notchPosition, setNotchPosition] = useState(200);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const getNavigationItems = (): NavigationItem[] => {
    switch (userRole) {
      case 'customer':
        return [
          { id: 'home', label: 'Home', icon: Home, section: 'main' },
          { id: 'vendor', label: 'Vendors', icon: Search, section: 'main' },
          { id: 'bookings', label: 'My Events', icon: Calendar, section: 'main' },
          { 
            id: 'notifications', 
            label: 'Notifications', 
            icon: Bell, 
            badge: notificationCount > 0 ? notificationCount : undefined,
            section: 'main'
          },
          { id: 'profile', label: 'Profile', icon: User, section: 'main' },
          { id: 'categories', label: 'Categories', icon: Package, section: 'secondary' },
          { id: 'settings', label: 'Settings', icon: Settings, section: 'secondary' }
        ];
      
      case 'merchant':
        return [
          { id: 'dashboard', label: 'Home', icon: Home, section: 'main' },
          { id: 'packages', label: 'Packages', icon: Package, section: 'main' },
          { id: 'calendar', label: 'Merchant View', icon: Store, section: 'main' },
          { 
            id: 'notifications', 
            label: 'Notifications', 
            icon: Bell, 
            badge: notificationCount > 0 ? notificationCount : undefined,
            section: 'main'
          },
          { id: 'profile', label: 'Profile', icon: User, section: 'main' },
          { id: 'reviews', label: 'Reviews', icon: Star, section: 'secondary' },
          { id: 'settings', label: 'Settings', icon: Settings, section: 'secondary' }
        ];

      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home, section: 'main' },
          { id: 'merchants', label: 'Merchants', icon: User, section: 'main' },
          { id: 'products', label: 'Products', icon: Package, section: 'main' },
          { id: 'events', label: 'Events', icon: Calendar, section: 'main' },
          { id: 'promotions', label: 'Promotions', icon: Star, section: 'main' },
          { id: 'subscriptions', label: 'Subscriptions', icon: Bell, section: 'main' },
          { id: 'settings', label: 'Settings', icon: Settings, section: 'secondary' }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavigationItems();
  const mainItems = navItems.filter(item => item.section === 'main');
  const secondaryItems = navItems.filter(item => item.section === 'secondary');
  
  // Find active item index for notch positioning
  const activeIndex = mainItems.slice(0, 5).findIndex(item => item.id === currentScreen);
  
  // Helper function to calculate position for any index
  const calculatePosition = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const items = container.querySelectorAll('[data-nav-item]');
      if (items[index]) {
        const item = items[index] as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const relativeCenter = (itemRect.left + itemRect.width / 2) - containerRect.left;
        const svgPosition = (relativeCenter / containerRect.width) * 400;
        return svgPosition;
      }
    }
    return 200;
  };
  
  // Calculate notch position based on hover or active state
  useEffect(() => {
    if (isMobile && containerRef.current) {
      // Use hovered index if hovering, otherwise use active index
      const targetIndex = hoveredIndex !== -1 ? hoveredIndex : activeIndex;
      if (targetIndex !== -1) {
        const position = calculatePosition(targetIndex);
        setNotchPosition(position);
      }
    }
  }, [isMobile, activeIndex, hoveredIndex]);

  // Mobile Bottom Navigation
  if (isMobile) {
    
    return (
      <>
        {/* Background extension for bottom area - prevents white box when scrolling */}
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C3B2E]/5 via-[#6D9773]/3 to-transparent pointer-events-none z-40" />
        
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-transparent pointer-events-none">
          {/* Rounded Gradient Bar with Notch */}
          <div className="relative h-[80px] rounded-2xl overflow-hidden mx-4 mb-4 pointer-events-auto">
          {/* Wave Animation Styles */}
          <style>{`
            @keyframes wave {
              0%, 100% { 
                transform: translateX(0) translateY(0); 
              }
              50% { 
                transform: translateX(-10px) translateY(-2px); 
              }
            }
            
            @keyframes wave-reverse {
              0%, 100% { 
                transform: translateX(0) translateY(0); 
              }
              50% { 
                transform: translateX(10px) translateY(2px); 
              }
            }
            
            @keyframes gradient-flow {
              0% {
                stop-color: #6D9773;
              }
              25% {
                stop-color: #7FAF84;
              }
              50% {
                stop-color: #8BBE93;
              }
              75% {
                stop-color: #7FAF84;
              }
              100% {
                stop-color: #6D9773;
              }
            }
            
            @keyframes gradient-flow-dark {
              0% {
                stop-color: #0C3B2E;
              }
              25% {
                stop-color: #0F4838;
              }
              50% {
                stop-color: #1A5A45;
              }
              75% {
                stop-color: #0F4838;
              }
              100% {
                stop-color: #0C3B2E;
              }
            }
            
            @keyframes gradient-shift {
              0% {
                offset: 0%;
              }
              50% {
                offset: 100%;
              }
              100% {
                offset: 0%;
              }
            }
            
            .wave-animate-1 {
              animation: wave 8s ease-in-out infinite;
            }
            
            .wave-animate-2 {
              animation: wave-reverse 6s ease-in-out infinite;
            }
            
            .gradient-color-1 {
              animation: gradient-flow 4s ease-in-out infinite;
            }
            
            .gradient-color-2 {
              animation: gradient-flow-dark 5s ease-in-out infinite;
            }
            
            @keyframes ripple {
              0% {
                transform: scale(0);
                opacity: 0.8;
              }
              100% {
                transform: scale(4);
                opacity: 0;
              }
            }
            
            .ripple-1 {
              animation: ripple 4s ease-out infinite;
            }
            
            .ripple-2 {
              animation: ripple 5s ease-out 1s infinite;
            }
            
            .ripple-3 {
              animation: ripple 6s ease-out 2s infinite;
            }
            
            .ripple-4 {
              animation: ripple 4.5s ease-out 0.5s infinite;
            }
            
            .ripple-5 {
              animation: ripple 5.5s ease-out 1.5s infinite;
            }
          `}</style>
          
          {/* SVG Background with smooth curved notch and wave animation */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* EventCore Green Gradient with animated colors */}
              <linearGradient id="navGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0C3B2E" />
                <stop offset="50%" stopColor="#1A5A45" />
                <stop offset="100%" stopColor="#6D9773" />
              </linearGradient>
              
              {/* Animated Wave Gradient 1 - with color shifting */}
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="gradient-color-1" stopOpacity="0.4" />
                <stop offset="50%" className="gradient-color-2" stopOpacity="0.2" />
                <stop offset="100%" className="gradient-color-1" stopOpacity="0.1" />
              </linearGradient>
              
              {/* Animated Wave Gradient 2 - reverse flow */}
              <linearGradient id="waveGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" className="gradient-color-2" stopOpacity="0.3" />
                <stop offset="50%" className="gradient-color-1" stopOpacity="0.15" />
                <stop offset="100%" className="gradient-color-2" stopOpacity="0.05" />
              </linearGradient>
              
              {/* Shimmer effect gradient */}
              <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6D9773" stopOpacity="0.0" />
                <stop offset="50%" stopColor="#8BBE93" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#6D9773" stopOpacity="0.0" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1 0"
                  to="1 0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </linearGradient>
            </defs>
            
            {/* Shimmer overlay for subtle sparkle effect */}
            <rect
              x="0"
              y="0"
              width="400"
              height="80"
              fill="url(#shimmerGradient)"
              opacity="0.6"
            />
            
            {/* Circular Wave Ripples - Creative Background Animation */}
            <g opacity="0.3">
              {/* Ripple 1 - Left side */}
              <circle 
                className="ripple-1"
                cx="80" 
                cy="40" 
                r="8" 
                fill="none" 
                stroke="#6D9773" 
                strokeWidth="2"
                style={{ transformOrigin: '80px 40px' }}
              />
              
              {/* Ripple 2 - Center */}
              <circle 
                className="ripple-2"
                cx="200" 
                cy="50" 
                r="10" 
                fill="none" 
                stroke="#8BBE93" 
                strokeWidth="1.5"
                style={{ transformOrigin: '200px 50px' }}
              />
              
              {/* Ripple 3 - Right side */}
              <circle 
                className="ripple-3"
                cx="320" 
                cy="35" 
                r="12" 
                fill="none" 
                stroke="#6D9773" 
                strokeWidth="2"
                style={{ transformOrigin: '320px 35px' }}
              />
              
              {/* Ripple 4 - Left-center */}
              <circle 
                className="ripple-4"
                cx="120" 
                cy="55" 
                r="6" 
                fill="none" 
                stroke="#FFBA00" 
                strokeWidth="1"
                opacity="0.5"
                style={{ transformOrigin: '120px 55px' }}
              />
              
              {/* Ripple 5 - Right-center */}
              <circle 
                className="ripple-5"
                cx="280" 
                cy="60" 
                r="9" 
                fill="none" 
                stroke="#B46617" 
                strokeWidth="1.5"
                opacity="0.4"
                style={{ transformOrigin: '280px 60px' }}
              />
            </g>
            
            {/* Animated Wave Layer 1 */}
            <g className="wave-animate-1">
              <path
                d="M 0 25 Q 100 20 200 25 T 400 25 L 400 80 L 0 80 Z"
                fill="url(#waveGradient1)"
              />
            </g>
            
            {/* Animated Wave Layer 2 */}
            <g className="wave-animate-2">
              <path
                d="M 0 35 Q 100 32 200 35 T 400 35 L 400 80 L 0 80 Z"
                fill="url(#waveGradient2)"
              />
            </g>
            
            {/* Path with smooth water drop style notch at top */}
            <path
              d={(() => {
                const notchWidth = 50;
                const notchDepth = 12;
                const radius = 32;
                // Show notch if hovering or active
                const showNotch = hoveredIndex !== -1 || activeIndex !== -1;
                const notchCenter = showNotch ? notchPosition : -100;
                const notchLeft = notchCenter - notchWidth / 2;
                const notchRight = notchCenter + notchWidth / 2;
                
                if (!showNotch) {
                  // No notch, rounded corners on all sides
                  return `
                    M ${radius} 0
                    L ${400 - radius} 0
                    Q 400 0 400 ${radius}
                    L 400 ${80 - radius}
                    Q 400 80 ${400 - radius} 80
                    L ${radius} 80
                    Q 0 80 0 ${80 - radius}
                    L 0 ${radius}
                    Q 0 0 ${radius} 0
                    Z
                  `;
                }
                
                // Create smooth organic notch with gentle curve
                // Using cubic bezier for smooth, natural bulge
                const cp1x = notchLeft + notchWidth * 0.2;
                const cp1y = notchDepth * 0.2;
                const cp2x = notchCenter - notchWidth * 0.2;
                const cp2y = notchDepth * 0.95;
                const cp3x = notchCenter + notchWidth * 0.2;
                const cp3y = notchDepth * 0.95;
                const cp4x = notchRight - notchWidth * 0.2;
                const cp4y = notchDepth * 0.2;
                
                return `
                  M ${radius} 0
                  L ${notchLeft} 0
                  C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${notchCenter} ${notchDepth}
                  C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${notchRight} 0
                  L ${400 - radius} 0
                  Q 400 0 400 ${radius}
                  L 400 ${80 - radius}
                  Q 400 80 ${400 - radius} 80
                  L ${radius} 80
                  Q 0 80 0 ${80 - radius}
                  L 0 ${radius}
                  Q 0 0 ${radius} 0
                  Z
                `;
              })()}
              fill="url(#navGradient)"
            />
          </svg>
          
          {/* Navigation Items - Compact and centered */}
          <div ref={containerRef} className="relative z-10 flex items-center justify-center gap-4 px-12 py-3 pb-4 h-full">
            {mainItems.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                data-nav-item
                onClick={() => onNavigate(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                className="relative cursor-pointer flex justify-center items-center group"
              >
                {currentScreen === item.id ? (
                  /* Active Item - Modern Design */
                  <div className="relative flex flex-col items-center gap-1 scale-110 transition-all duration-300 py-1 mt-3">
                    {/* Bubble Arrow Indicator - Points Down */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[10px] border-t-[#8BBE93]/30" />
                    
                    <item.icon 
                      className="w-6 h-6 text-white drop-shadow-lg" 
                      strokeWidth={2}
                    />
                    
                    <span className="text-[10px] text-white whitespace-nowrap font-medium drop-shadow-sm">
                      {item.label}
                    </span>
                    
                    {item.badge && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center p-0 border-2 border-[#0C3B2E] shadow-md z-20"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                ) : (
                  /* Inactive Items - Minimal Modern Design with Hover Preview */
                  <div className="relative flex flex-col items-center gap-1 py-1 mt-3 transition-all duration-300 group-hover:scale-105">
                    {/* Hover Preview Bubble Indicator - fades in on hover */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[10px] border-t-transparent group-hover:border-t-[#6D9773]/20 transition-all duration-300" />
                    
                    <item.icon 
                      className="w-5 h-5 text-white/40 group-hover:text-white/90 group-hover:w-6 group-hover:h-6 group-hover:drop-shadow-md transition-all duration-300" 
                      strokeWidth={1.8}
                    />
                    <span className="text-[9px] text-white/40 group-hover:text-white/90 group-hover:text-[10px] group-hover:font-medium transition-all duration-300 whitespace-nowrap">
                      {item.label}
                    </span>
                    
                    {item.badge && (
                      <Badge 
                        className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center p-0 border-2 border-[#0C3B2E] shadow-md z-20"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
    );
  }

  // Desktop Sidebar Navigation
  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-md"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-[#0C3B2E] to-[#1A5A45] border-r border-[#6D9773]/20 z-40 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen || !isMobile ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:z-30 overflow-y-auto
      `}>
        <div className="p-6">
          {/* Brand */}
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">
              EventCore {userRole === 'customer' ? '' : userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </h1>
            <p className="text-sm text-white/70">Wedding Planning Platform</p>
          </div>

          {/* Main Navigation */}
          <div className="space-y-2 mb-8">
            <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">
              Main Navigation
            </p>
            {mainItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => {
                  onNavigate(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full justify-start h-12 relative ${
                  currentScreen === item.id 
                    ? 'bg-white/20 text-white border-r-2 border-[#FFBA00]' 
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
                
                {item.badge && (
                  <Badge 
                    className="ml-auto bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center p-0"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>

          {/* Secondary Navigation */}
          {secondaryItems.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">
                Account
              </p>
              {secondaryItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => {
                    onNavigate(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full justify-start h-12 ${
                    currentScreen === item.id 
                      ? 'bg-white/20 text-white border-r-2 border-[#FFBA00]' 
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          )}

          {/* User Role Badge */}
          <div className="mt-8 pt-6 border-t border-white/20">
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#FFBA00] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[#0C3B2E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account
                    </p>
                    <p className="text-xs text-white/60">Active Session</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </aside>
    </>
  );
}