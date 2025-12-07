import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { User, Settings, Heart, LogOut, LogIn, Search, Bell } from 'lucide-react';
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface TopBarProps {
  user: User | null;
  onProfileClick: () => void;
  onLoginClick: () => void;
  onLogout: () => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
  customTitle?: string;
}

export function TopBar({ 
  user, 
  onProfileClick, 
  onLoginClick, 
  onLogout, 
  onSearchClick, 
  showSearch = true,
  customTitle 
}: TopBarProps) {
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(' ')[0];
  };

  return (
    <div className="bg-cover bg-center bg-no-repeat border-b border-sage-green-200 px-4 py-4 flex items-center justify-between text-white" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Left Side - Profile and Greeting */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20 p-0" onClick={onProfileClick}>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-r from-bronze-brown-500 to-gold-yellow-500 text-white text-sm">
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
            
            <div>
              {customTitle ? (
                <h1 className="text-lg font-medium">{customTitle}</h1>
              ) : (
                <div>
                  <h1 className="text-lg">
                    Hi {getFirstName(user.name)},
                  </h1>
                  <p className="text-sm text-white/80 -mt-0.5">{getTimeGreeting()}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            {customTitle ? (
              <h1 className="text-lg font-medium">{customTitle}</h1>
            ) : (
              <div>
                <h1 className="text-lg">Hi there,</h1>
                <p className="text-sm text-white/80">{getTimeGreeting()}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center space-x-2">
        {showSearch && onSearchClick && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSearchClick}
            className="text-white hover:text-white hover:bg-white/20 p-2"
          >
            <Search className="w-5 h-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="sm"
          className="text-white hover:text-white hover:bg-white/20 p-2 relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-yellow-500 rounded-full"></span>
        </Button>
        
        {!user && (
          <Button 
            size="sm" 
            onClick={onLoginClick}
            className="bg-gold-yellow-500 hover:bg-gold-yellow-600 text-neutral-dark text-xs px-3 rounded-lg font-medium"
          >
            <LogIn className="w-4 h-4 mr-1" />
            Login
          </Button>
        )}
      </div>
    </div>
  );
}