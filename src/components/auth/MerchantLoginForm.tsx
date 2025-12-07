import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import bgImage1 from 'figma:asset/cba296555e82adfe03f39b9c696b400f7d2597bd.png';
import bgImage2 from 'figma:asset/a91063939db27eb7e6fe57a1cdef7cfe651a5b94.png';
import bgImage3 from 'figma:asset/c8bffbdf9d2f5becb7a5d3decea4af6033ee4fcf.png';
import bgImage4 from 'figma:asset/fe37e44bedbe482c26b2db40b4d4d57cd7066cff.png';
import bgImage5 from 'figma:asset/bb1f82bb7f1a0727c9260f416bd368c3042e714c.png';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantLoginFormProps {
  onToggleToSignup: () => void;
  onLogin: (user: User) => void;
  onBackToCustomerLogin: () => void;
}

export function MerchantLoginForm({ onToggleToSignup, onLogin, onBackToCustomerLogin }: MerchantLoginFormProps) {
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
      // Mock merchant login
      let name = email.split('@')[0];
      
      // Demo account logic - always set role to merchant for this form
      if (email === 'merchant@demo.com') {
        name = 'Demo Merchant';
      }
      
      const mockUser: User = {
        id: `merchant_${Date.now()}`,
        email,
        name,
        role: 'merchant'
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
    <div className="min-h-screen relative overflow-hidden bg-[#0C3B2E]">
      {/* Background Images Container */}
      <div className="absolute inset-0">
        {/* Animated Background Images */}
        <div className="absolute inset-0">
          <style>{`
            @keyframes fadeInOut1 {
              0%, 18% { opacity: 1; }
              20%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut2 {
              0%, 18% { opacity: 0; }
              20%, 38% { opacity: 1; }
              40%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut3 {
              0%, 38% { opacity: 0; }
              40%, 58% { opacity: 1; }
              60%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut4 {
              0%, 58% { opacity: 0; }
              60%, 78% { opacity: 1; }
              80%, 100% { opacity: 0; }
            }
            @keyframes fadeInOut5 {
              0%, 78% { opacity: 0; }
              80%, 98% { opacity: 1; }
              100% { opacity: 0; }
            }
            .bg-slide-1 {
              animation: fadeInOut1 10s ease-in-out infinite;
            }
            .bg-slide-2 {
              animation: fadeInOut2 10s ease-in-out infinite;
            }
            .bg-slide-3 {
              animation: fadeInOut3 10s ease-in-out infinite;
            }
            .bg-slide-4 {
              animation: fadeInOut4 10s ease-in-out infinite;
            }
            .bg-slide-5 {
              animation: fadeInOut5 10s ease-in-out infinite;
            }
          `}</style>
          
          <img
            src={bgImage1} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-1"
          />
          <img
            src={bgImage2} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-2"
          />
          <img
            src={bgImage3} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-3"
          />
          <img
            src={bgImage4} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-4"
          />
          <img
            src={bgImage5} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover bg-slide-5"
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-between p-6 pt-16 pb-8 max-w-md mx-auto">
        <div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[#F5F1E8] mb-3" style={{ fontSize: '30px', fontWeight: 600, lineHeight: '1.2' }}>
              Welcome Merchant!
            </h1>
            <p className="text-[#E8E4D8]/90" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.4' }}>
              Manage your services and grow your business
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
                  className="text-[#E8E4D8]/80 hover:text-[#FFBA00]"
                  style={{ fontSize: '14px', fontWeight: 400 }}
                >
                  Forget Password
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 px-2">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <div className="pt-4 flex justify-center">
              <Button 
                type="submit" 
                className="px-12 py-3 bg-white hover:bg-white/95 text-[#1a1a1a] rounded-full shadow-md border-0 transition-all"
                style={{ fontSize: '15px', fontWeight: 500 }}
              >
                Merchant Login
              </Button>
            </div>
          </form>
        </div>

        {/* Bottom Links */}
        <div className="text-center space-y-4">
          <p className="text-[#E8E4D8]/90" style={{ fontSize: '15px', fontWeight: 400 }}>
            Not a merchant yet?{' '}
            <button 
              type="button"
              onClick={onToggleToSignup}
              className="text-[#FFBA00] hover:text-[#FFD54F] underline"
              style={{ fontWeight: 500 }}
            >
              Register now
            </button>
          </p>
          
          {/* Back to Customer Login Link */}
          <div className="pt-2">
            <button 
              type="button"
              onClick={onBackToCustomerLogin}
              className="text-[#E8E4D8]/80 hover:text-[#FFBA00] transition-colors"
              style={{ fontSize: '14px', fontWeight: 400 }}
            >
              ← Back to Customer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
