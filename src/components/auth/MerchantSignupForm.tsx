import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Eye, EyeOff, ChevronDown, X, CheckCircle } from 'lucide-react';
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

interface MerchantSignupFormProps {
  onBackToLogin: () => void;
  onSignup: (user: User) => void;
}

const SERVICE_CATEGORIES = [
  'Photography',
  'Videography',
  'Catering',
  'Venue',
  'Decoration',
  'Florist',
  'Music & DJ',
  'Wedding Cake',
  'Invitations',
  'Bridal Makeup',
  'Wedding Planner',
  'Transportation',
  'Lighting & Sound'
];

const EVENT_TYPES = [
  'Wedding',
  'Birthday Party',
  'Corporate Event',
  'Anniversary',
  'Engagement',
  'Baby Shower',
  'Graduation',
  'Reunion',
  'Conference',
  'Product Launch',
  'Charity Event',
  'Festival'
];

export function MerchantSignupForm({ onBackToLogin, onSignup }: MerchantSignupFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    contactNumber: '',
    serviceCategory: [] as string[],
    eventTypes: [] as string[],
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEventTypesDropdownOpen, setIsEventTypesDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
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

    if (formData.serviceCategory.length === 0) {
      newErrors.serviceCategory = 'At least one service category is required';
    }

    if (formData.eventTypes.length === 0) {
      newErrors.eventTypes = 'At least one event type is required';
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
      // Simulate sending request to admin
      // In a real app, this would make an API call to submit the merchant registration request
      setIsSubmitted(true);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => {
      const currentCategories = prev.serviceCategory;
      const newCategories = currentCategories.includes(category)
        ? currentCategories.filter(c => c !== category)
        : [...currentCategories, category];
      return { ...prev, serviceCategory: newCategories };
    });
    // Clear error when user selects a category
    if (errors.serviceCategory) {
      setErrors(prev => ({ ...prev, serviceCategory: '' }));
    }
  };

  const removeCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCategory: prev.serviceCategory.filter(c => c !== category)
    }));
  };

  const toggleEventType = (eventType: string) => {
    setFormData(prev => {
      const currentEventTypes = prev.eventTypes;
      const newEventTypes = currentEventTypes.includes(eventType)
        ? currentEventTypes.filter(e => e !== eventType)
        : [...currentEventTypes, eventType];
      return { ...prev, eventTypes: newEventTypes };
    });
    // Clear error when user selects an event type
    if (errors.eventTypes) {
      setErrors(prev => ({ ...prev, eventTypes: '' }));
    }
  };

  const removeEventType = (eventType: string) => {
    setFormData(prev => ({
      ...prev,
      eventTypes: prev.eventTypes.filter(e => e !== eventType)
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0C3B2E]">
      {/* Success Notification Modal */}
      {isSubmitted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-[#6D9773] rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              {/* Success Title */}
              <h2 className="text-[#0C3B2E]" style={{ fontSize: '24px', fontWeight: 600 }}>
                Request Submitted!
              </h2>

              {/* Success Message */}
              <p className="text-[#4a4a4a]" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.6' }}>
                Your merchant registration request has been submitted to the admin. 
                Admin will review your application and get in touch with you soon.
              </p>

              {/* Business Name */}
              <div className="w-full bg-[#F5F1E8] rounded-xl p-4 mt-2">
                <p className="text-[#666666]" style={{ fontSize: '14px', fontWeight: 400 }}>
                  Business Name
                </p>
                <p className="text-[#0C3B2E]" style={{ fontSize: '16px', fontWeight: 500 }}>
                  {formData.businessName}
                </p>
              </div>

              {/* Email */}
              <div className="w-full bg-[#F5F1E8] rounded-xl p-4">
                <p className="text-[#666666]" style={{ fontSize: '14px', fontWeight: 400 }}>
                  Email
                </p>
                <p className="text-[#0C3B2E]" style={{ fontSize: '16px', fontWeight: 500 }}>
                  {formData.email}
                </p>
              </div>

              {/* Back to Login Button */}
              <Button
                onClick={onBackToLogin}
                className="w-full bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-xl py-5 mt-4"
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      )}

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
            Join as a Merchant!
          </h1>
          <p className="text-[#E8E4D8]/90 mb-2" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
            Welcome to EventCore merchant platform!
          </p>
          <p className="text-[#E8E4D8]/90" style={{ fontSize: '16px', fontWeight: 400, lineHeight: '1.5' }}>
            Register to showcase your services and grow your business
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-3 flex-1">
          {/* Business Name Input */}
          <div className="space-y-1">
            <Input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              placeholder="Business Name"
              className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#666666]"
              style={{ fontSize: '16px', fontWeight: 400 }}
            />
            {errors.businessName && (
              <p className="text-sm text-red-600 px-2">{errors.businessName}</p>
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
              className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#666666]"
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
              className="bg-white/90 border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 placeholder:text-[#666666]"
              style={{ fontSize: '16px', fontWeight: 400 }}
            />
            {errors.contactNumber && (
              <p className="text-sm text-red-600 px-2">{errors.contactNumber}</p>
            )}
          </div>

          {/* Service Category Multi-Select Dropdown */}
          <div className="space-y-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full bg-white/90 border border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 text-left flex items-center justify-between"
                style={{ fontSize: '16px', fontWeight: 400 }}
              >
                <span className={formData.serviceCategory.length === 0 ? 'text-[#666666]' : 'text-[#1a1a1a]'}>
                  {formData.serviceCategory.length === 0 
                    ? 'Select Service Categories' 
                    : `${formData.serviceCategory.length} selected`}
                </span>
                <ChevronDown className={`h-5 w-5 text-[#0C3B2E]/50 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-white/80 max-h-60 overflow-y-auto">
                  {SERVICE_CATEGORIES.map(category => (
                    <label
                      key={category}
                      className="flex items-center px-4 py-3 hover:bg-[#F5F1E8] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.serviceCategory.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-[#0C3B2E] border-gray-300 rounded focus:ring-[#0C3B2E]"
                      />
                      <span className="ml-3 text-[#1a1a1a]" style={{ fontSize: '15px', fontWeight: 400 }}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Categories Pills */}
            {formData.serviceCategory.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.serviceCategory.map(category => (
                  <div
                    key={category}
                    className="flex items-center gap-1 bg-[#0C3B2E] text-white px-3 py-1 rounded-full"
                    style={{ fontSize: '14px', fontWeight: 400 }}
                  >
                    <span>{category}</span>
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.serviceCategory && (
              <p className="text-sm text-red-600 px-2">{errors.serviceCategory}</p>
            )}
          </div>

          {/* Event Types Multi-Select Dropdown */}
          <div className="space-y-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsEventTypesDropdownOpen(!isEventTypesDropdownOpen)}
                className="w-full bg-white/90 border border-white/80 backdrop-blur-sm rounded-xl py-5 px-4 text-left flex items-center justify-between"
                style={{ fontSize: '16px', fontWeight: 400 }}
              >
                <span className={formData.eventTypes.length === 0 ? 'text-[#666666]' : 'text-[#1a1a1a]'}>
                  {formData.eventTypes.length === 0 
                    ? 'Select Event Types' 
                    : `${formData.eventTypes.length} selected`}
                </span>
                <ChevronDown className={`h-5 w-5 text-[#0C3B2E]/50 transition-transform ${isEventTypesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isEventTypesDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-white/80 max-h-60 overflow-y-auto">
                  {EVENT_TYPES.map(eventType => (
                    <label
                      key={eventType}
                      className="flex items-center px-4 py-3 hover:bg-[#F5F1E8] cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.eventTypes.includes(eventType)}
                        onChange={() => toggleEventType(eventType)}
                        className="w-4 h-4 text-[#0C3B2E] border-gray-300 rounded focus:ring-[#0C3B2E]"
                      />
                      <span className="ml-3 text-[#1a1a1a]" style={{ fontSize: '15px', fontWeight: 400 }}>
                        {eventType}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Event Types Pills */}
            {formData.eventTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {formData.eventTypes.map(eventType => (
                  <div
                    key={eventType}
                    className="flex items-center gap-1 bg-[#B46617] text-white px-3 py-1 rounded-full"
                    style={{ fontSize: '14px', fontWeight: 400 }}
                  >
                    <span>{eventType}</span>
                    <button
                      type="button"
                      onClick={() => removeEventType(eventType)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {errors.eventTypes && (
              <p className="text-sm text-red-600 px-2">{errors.eventTypes}</p>
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
              Register Now
            </Button>
          </div>
        </form>

        {/* Bottom Links */}
        <div className="text-center space-y-4 pt-6 pb-8">
          <p className="text-[#E8E4D8]/90" style={{ fontSize: '15px', fontWeight: 400 }}>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={onBackToLogin}
              className="text-[#FFBA00] hover:text-[#FFD54F] underline"
              style={{ fontWeight: 500 }}
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
