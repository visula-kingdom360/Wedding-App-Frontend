import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface LoginFormProps {
  onToggleToSignup: () => void;
  onLogin: (user: User) => void;
  onGuestLogin?: () => void;
}

export function LoginForm({ onToggleToSignup, onLogin, onGuestLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock login - determine role based on email for demo
      let role: 'customer' | 'merchant' | 'admin' = 'customer';
      let name = email.split('@')[0];
      
      // Demo account logic
      if (email === 'customer@demo.com') {
        role = 'customer';
        name = 'Demo Customer';
      } else if (email === 'merchant@demo.com') {
        role = 'merchant';
        name = 'Demo Merchant';
      } else if (email === 'admin@demo.com') {
        role = 'admin';
        name = 'Demo Admin';
      } else {
        // General role detection for custom emails
        if (email.includes('merchant')) role = 'merchant';
        if (email.includes('admin')) role = 'admin';
      }
      
      const mockUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        role
      };
      onLogin(mockUser);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background with Organic Shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7]">
        {/* Organic blur shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-green-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sage-green-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-sage-green-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-between p-6 pt-16 pb-8 max-w-md mx-auto">
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[#1a1a1a] mb-3" style={{ fontSize: '30px', fontWeight: 600, lineHeight: '1.2' }}>
              Hello event lover!
            </h1>
            <p className="text-[#1a1a1a]" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.4' }}>
              Welcome back, your next celebration is waiting
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <div className="space-y-1">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Email"
                className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#666666]"
                style={{ fontSize: '16px', fontWeight: 400 }}
              />
              {errors.email && (
                <p className="text-sm text-red-600 px-2">{errors.email}</p>
              )}
            </div>
            
            {/* Password Input */}
            <div className="space-y-1">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Password"
                  className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 pr-10 placeholder:text-[#666666]"
                  style={{ fontSize: '16px', fontWeight: 400 }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#0C3B2E]/50" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#0C3B2E]/50" />
                  )}
                </Button>
              </div>
              <div className="flex justify-end pt-1">
                <button 
                  type="button"
                  className="text-[#1a1a1a] hover:text-[#0C3B2E]"
                  style={{ fontSize: '14px', fontWeight: 400 }}
                >
                  Forget Password
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 px-2">{errors.password}</p>
              )}
            </div>

            {/* Login Buttons */}
            <div className="pt-4 flex justify-center">
              <div className="bg-white/60 backdrop-blur-md rounded-full p-1.5 shadow-lg border border-white/40 inline-flex gap-2">
                <Button 
                  type="submit" 
                  className="px-8 py-3 bg-white hover:bg-white/95 text-[#1a1a1a] rounded-full shadow-md border-0 transition-all"
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  User Login
                </Button>
                
                <Button 
                  type="button"
                  onClick={onGuestLogin}
                  className="px-8 py-3 bg-transparent hover:bg-white/50 text-[#1a1a1a] rounded-full border-0 transition-all"
                  variant="ghost"
                  style={{ fontSize: '15px', fontWeight: 500 }}
                >
                  Guest Login
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-[#1a1a1a]" style={{ fontSize: '15px', fontWeight: 400 }}>
            Not a member?{' '}
            <button 
              type="button"
              onClick={onToggleToSignup}
              className="text-[#1a1a1a] underline hover:text-[#0C3B2E]"
              style={{ fontWeight: 500 }}
            >
              Register now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
