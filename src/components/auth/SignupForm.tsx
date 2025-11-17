import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background with Organic Shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5E9] via-[#C8E6C9] to-[#A5D6A7]">
        {/* Organic blur shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sage-green-300/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sage-green-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-sage-green-200/30 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-start p-6 pt-16 max-w-md mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#0C3B2E] mb-3" style={{ fontSize: '30px', fontWeight: 600, lineHeight: '1.2' }}>
            Hello event lover!
          </h1>
          <p className="text-[#0C3B2E] mb-2" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
            Welcome to Eventcore, your celebration companion!
          </p>
          <p className="text-[#0C3B2E]" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
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
              className="bg-white/85 hover:bg-white text-[#0C3B2E] rounded-xl px-8 py-5 border border-white/60 backdrop-blur-sm shadow-sm"
              variant="outline"
              style={{ fontSize: '16px', fontWeight: 500 }}
            >
              Sign Up Now
            </Button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="mt-auto pt-8 text-center pb-6">
          <p className="text-[#0C3B2E]" style={{ fontSize: '15px', fontWeight: 400 }}>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onBackToLogin}
              className="text-[#0C3B2E] underline hover:text-[#0C3B2E]/80"
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
