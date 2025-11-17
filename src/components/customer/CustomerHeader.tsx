import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { User, Bell, Settings, LogOut, Search } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface CustomerHeaderProps {
  user: User | null;
  onProfileClick: () => void;
  onLogout: () => void;
  onLoginRequest?: () => void;
  showSearch?: boolean;
  onSearchClick?: () => void;
  notificationCount?: number;
}

export function CustomerHeader({ 
  user, 
  onProfileClick, 
  onLogout, 
  onLoginRequest,
  showSearch = false,
  onSearchClick,
  notificationCount = 0 
}: CustomerHeaderProps) {
  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };

  return (
    <div className="md:block hidden bg-white/60 backdrop-blur-xl px-4 py-4 border-b border-white/30 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        {/* Greeting or Logo */}
        <div>
          {user ? (
            <>
              <h1 className="text-xl font-medium text-neutral-dark">
                Hi {getFirstName(user.name)},
              </h1>
              <p className="text-lg text-neutral-dark">Good morning</p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-medium text-neutral-dark">EventCore</h1>
              <p className="text-sm text-muted-foreground">Wedding Planning Made Easy</p>
            </>
          )}
        </div>

        {/* Search Bar - Center */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors, venues, services..."
                className="pl-9 bg-sage-green-50 border-sage-green-200 focus:border-forest-green-500 rounded-full"
                onClick={onSearchClick}
                readOnly
              />
            </div>
          </div>
        )}

        {/* Right side - Notifications & Profile */}
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          {user && notificationCount > 0 && (
            <div className="relative">
              <Bell className="w-6 h-6 text-muted-foreground" />
              <Badge 
                className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center p-0"
              >
                {notificationCount}
              </Badge>
            </div>
          )}

          {/* Profile Dropdown or Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                  <div className="w-12 h-12 bg-neutral-dark rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <Badge className="bg-forest-green-100 text-forest-green-700 w-fit mt-1">
                    Customer Account
                  </Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onProfileClick}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="outline" 
              onClick={onLoginRequest}
              className="border-forest-green-500 text-forest-green-500 hover:bg-forest-green-50"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}