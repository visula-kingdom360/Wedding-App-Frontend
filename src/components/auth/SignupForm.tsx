import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';
import bgImage1 from 'figma:asset/cba296555e82adfe03f39b9c696b400f7d2597bd.png';
import bgImage2 from 'figma:asset/a91063939db27eb7e6fe57a1cdef7cfe651a5b94.png';
import bgImage3 from 'figma:asset/c8bffbdf9d2f5becb7a5d3decea4af6033ee4fcf.png';
import bgImage4 from 'figma:asset/fe37e44bedbe482c26b2db40b4d4d57cd7066cff.png';
import bgImage5 from 'figma:asset/bb1f82bb7f1a0727c9260f416bd368c3042e714c.png';

interface SignupFormProps {
  onSignupNext: (email: string, password: string, name: string, contactNumber: string) => void;
  onBackToLogin: () => void;
}

export function SignupForm({ onSignupNext, onBackToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^[\d\s-()]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid contact number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSignupNext(formData.email, formData.password, formData.name, formData.contactNumber);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      <div className="relative min-h-screen flex flex-col justify-start p-6 pt-16 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#F5F1E8] mb-3" style={{ fontSize: '30px', fontWeight: 600, lineHeight: '1.2' }}>
            Hello!
          </h1>
          <p className="text-[#E8E4D8]/90 mb-2" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
            Welcome to Eventcore, your celebration companion!
          </p>
          <p className="text-[#E8E4D8]/90" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
            Find venues, decor, and vendors that make your event unforgettable.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Name Input */}
          <div className="space-y-1">
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter Name"
              className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#0C3B2E]/50"
              style={{ fontSize: '16px', fontWeight: 400 }}
            />
            {errors.name && (
              <p className="text-sm text-red-600 px-2">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Email"
              className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#0C3B2E]/50"
              style={{ fontSize: '16px', fontWeight: 400 }}
            />
            {errors.email && (
              <p className="text-sm text-red-600 px-2">{errors.email}</p>
            )}
          </div>

          {/* Contact Number Input */}
          <div className="space-y-1">
            <Input
              id="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e.target.value)}
              placeholder="Contact Number"
              className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#0C3B2E]/50"
              style={{ fontSize: '16px', fontWeight: 400 }}
            />
            {errors.contactNumber && (
              <p className="text-sm text-red-600 px-2">{errors.contactNumber}</p>
            )}
          </div>
          
          {/* Password Input */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Password"
                className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 pr-10 placeholder:text-[#0C3B2E]/50"
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
            {errors.password && (
              <p className="text-sm text-red-600 px-2">{errors.password}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <div className="pt-3 flex justify-center">
            <Button 
              type="submit" 
              className="bg-white/85 hover:bg-white text-[#0C3B2E] hover:text-[#4a4a4a] rounded-xl px-8 py-5 border border-white/60 backdrop-blur-sm shadow-sm"
              variant="outline"
              style={{ fontSize: '16px', fontWeight: 500 }}
            >
              Sign Up Now
            </Button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="mt-auto pt-8 text-center pb-6">
          <p className="text-[#E8E4D8]/90" style={{ fontSize: '15px', fontWeight: 400 }}>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onBackToLogin}
              className="text-[#FFBA00] hover:text-[#FFD54F] underline"
              style={{ fontWeight: 500 }}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}