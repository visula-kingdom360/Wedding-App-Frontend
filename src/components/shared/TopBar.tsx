import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { User, Settings, Heart, LogOut, LogIn, Search } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-forest-green-500 to-sage-green-500 border-b border-sage-green-200 px-4 py-4 flex items-center justify-between text-white">
      {/* Greeting */}
      <div>
        {customTitle ? (
          <h1 className="text-lg font-medium">{customTitle}</h1>
        ) : (
          <div>
            <h1 className="text-lg">
              {user ? `Hi ${getFirstName(user.name)},` : 'Hi there,'}
            </h1>
            <p className="text-sm text-white/80">{getTimeGreeting()}</p>
          </div>
        )}
      </div>

      {/* Actions */}
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
        
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-bronze-brown-500 to-gold-yellow-500 text-white text-sm">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                <span>Favorites</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs border-white/30 text-white bg-white/10">
              Guest
            </Badge>
            <Button 
              size="sm" 
              onClick={onLoginClick}
              className="bg-gold-yellow-500 hover:bg-gold-yellow-600 text-neutral-dark text-xs px-3 rounded-lg font-medium"
            >
              <LogIn className="w-4 h-4 mr-1" />
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}