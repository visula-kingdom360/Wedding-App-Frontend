import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { User, Store, Shield, ArrowLeft } from 'lucide-react';

interface RoleSelectProps {
  onRoleSelect: (role: 'customer' | 'merchant' | 'admin') => void;
  userEmail?: string;
  userName?: string;
}

export function RoleSelect({ onRoleSelect, userEmail, userName }: RoleSelectProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Role</CardTitle>
          <CardDescription>
            {userName && `Welcome ${userName}! `}
            How would you like to use our platform?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Button 
              onClick={() => onRoleSelect('customer')} 
              variant="outline" 
              className="w-full h-16 flex items-center justify-start gap-3 hover:bg-accent"
            >
              <User className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div>Customer</div>
                <div className="text-sm text-muted-foreground">Book wedding services and plan your special day</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => onRoleSelect('merchant')} 
              variant="outline" 
              className="w-full h-16 flex items-center justify-start gap-3 hover:bg-accent"
            >
              <Store className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div>Merchant</div>
                <div className="text-sm text-muted-foreground">Offer wedding services and grow your business</div>
              </div>
            </Button>
            
            <Button 
              onClick={() => onRoleSelect('admin')} 
              variant="outline" 
              className="w-full h-16 flex items-center justify-start gap-3 hover:bg-accent"
            >
              <Shield className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div>Admin</div>
                <div className="text-sm text-muted-foreground">Manage platform and oversee operations</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}