import { useState } from 'react';
import { 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Instagram,
  Facebook,
  Award,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Save,
  X,
  Upload,
  Trash2,
  Plus,
  Twitter,
  Linkedin,
  Youtube,
  Share2
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Button } from '../ui/button';

interface MerchantProfileEditProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

export function MerchantProfileEdit({ onClose, onSave }: MerchantProfileEditProps) {
  const [formData, setFormData] = useState({
    businessName: 'Elegant Events Studio',
    category: ['Wedding Photography'],
    eventTypes: ['Traditional Weddings', 'Modern Weddings'],
    coverageAreas: ['Colombo', 'Gampaha', 'Kalutara'],
    description: 'Capturing your special moments with artistic excellence and professional dedication. Specializing in luxury wedding photography with a blend of traditional and contemporary styles.',
    email: 'contact@elegantevents.com',
    phone: '+94 77 123 4567',
    address: 'No. 45, Park Street, Colombo 03, Sri Lanka',
    website: 'www.elegantevents.com',
    totalFollowers: '',
    totalBookings: '',
    instagram: '@elegantevents',
    facebook: 'ElegantEventsStudio',
    twitter: '',
    tiktok: '',
    linkedin: '',
    youtube: '',
    pinterest: '',
    snapchat: '',
    whatsapp: '',
    yearsExperience: '8',
    teamSize: '12',
    completedEvents: '250+',
    startingPrice: '75,000',
    coverImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=400&fit=crop',
    profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop'
    ],
    services: [
      'Full Day Wedding Coverage',
      'Pre-wedding Photoshoot',
      'Drone Photography',
      'Cinematic Video',
      'Photo Album Design',
      'Same Day Edit Video'
    ],
    workingHours: {
      weekdays: '9:00 AM - 6:00 PM',
      weekends: '8:00 AM - 8:00 PM'
    }
  });

  const [newService, setNewService] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [eventTypesDropdownOpen, setEventTypesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddService = () => {
    if (newService.trim()) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, newService.trim()]
      }));
      setNewService('');
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleAddLocation = () => {
    if (newLocation.trim()) {
      setFormData(prev => ({
        ...prev,
        coverageAreas: [...prev.coverageAreas, newLocation.trim()]
      }));
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      coverageAreas: prev.coverageAreas.filter((_, i) => i !== index)
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => {
      const categories = prev.category as string[];
      if (categories.includes(category)) {
        return { ...prev, category: categories.filter(c => c !== category) };
      } else {
        return { ...prev, category: [...categories, category] };
      }
    });
  };

  const handleEventTypeToggle = (eventType: string) => {
    setFormData(prev => {
      const eventTypes = prev.eventTypes as string[];
      if (eventTypes.includes(eventType)) {
        return { ...prev, eventTypes: eventTypes.filter(e => e !== eventType) };
      } else {
        return { ...prev, eventTypes: [...eventTypes, eventType] };
      }
    });
  };

  const handleLocationToggle = (location: string) => {
    if (!formData.coverageAreas.includes(location)) {
      setFormData(prev => ({
        ...prev,
        coverageAreas: [...prev.coverageAreas, location]
      }));
    }
    setLocationsDropdownOpen(false);
  };

  const handleSave = () => {
    onSave(formData);
  };

  // Available Sri Lankan districts and major cities
  const availableLocations = [
    'Colombo',
    'Gampaha',
    'Kalutara',
    'Kandy',
    'Matale',
    'Nuwara Eliya',
    'Galle',
    'Matara',
    'Hambantota',
    'Jaffna',
    'Kilinochchi',
    'Mannar',
    'Vavuniya',
    'Mullaitivu',
    'Batticaloa',
    'Ampara',
    'Trincomalee',
    'Kurunegala',
    'Puttalam',
    'Anuradhapura',
    'Polonnaruwa',
    'Badulla',
    'Moneragala',
    'Ratnapura',
    'Kegalle'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Edit Profile</h1>
          </div>
          <Button
            onClick={handleSave}
            className="bg-forest-green-500 text-white hover:bg-forest-green-600 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Cover Image Section */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-forest-green-500 to-sage-green-500">
            <ImageWithFallback
              src={formData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-4 right-4 bg-white text-forest-green-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4" />
              Change Cover
            </button>
          </div>

          {/* Profile Image */}
          <div className="px-6 pb-6">
            <div className="relative -mt-16 mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                <ImageWithFallback
                  src={formData.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 bg-forest-green-500 text-white p-2 rounded-full hover:bg-forest-green-600 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Business Name & Category */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories (Select all that apply)
                </label>
                <div className="relative">
                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none bg-white text-left flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {(formData.category as string[]).length > 0 
                        ? `${(formData.category as string[]).length} selected`
                        : 'Select categories'}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {categoryDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                      {[
                        'Wedding Photography',
                        'Wedding Videography',
                        'Catering Services',
                        'Venue & Decoration',
                        'Wedding Planning',
                        'Bridal Wear',
                        'Makeup & Hair',
                        'Music & Entertainment',
                        'Floral Design',
                        'Wedding Cake',
                        'Transportation',
                        'Invitations & Printing',
                        'Jewelry & Accessories'
                      ].map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={(formData.category as string[]).includes(cat)}
                            onChange={() => handleCategoryToggle(cat)}
                            className="w-4 h-4 text-forest-green-600 border-gray-300 rounded focus:ring-forest-green-500 focus:ring-2"
                          />
                          <span className="ml-3 text-gray-700">{cat}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Selected Categories Display */}
                  {(formData.category as string[]).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(formData.category as string[]).map((cat) => (
                        <span
                          key={cat}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-forest-green-50 text-forest-green-700 rounded-lg text-sm border border-forest-green-200"
                        >
                          {cat}
                          <button
                            type="button"
                            onClick={() => handleCategoryToggle(cat)}
                            className="hover:bg-forest-green-100 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Event Types Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Types (Select all that apply)
                </label>
                <div className="relative">
                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() => setEventTypesDropdownOpen(!eventTypesDropdownOpen)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none bg-white text-left flex items-center justify-between"
                  >
                    <span className="text-gray-700">
                      {(formData.eventTypes as string[]).length > 0 
                        ? `${(formData.eventTypes as string[]).length} selected`
                        : 'Select event types'}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-400 transition-transform ${eventTypesDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {eventTypesDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                      {[
                        'Traditional Weddings',
                        'Modern Weddings',
                        'Destination Weddings',
                        'Beach Weddings',
                        'Garden Weddings',
                        'Church Weddings',
                        'Temple Weddings',
                        'Hotel Weddings',
                        'Outdoor Weddings',
                        'Indoor Weddings',
                        'Intimate Weddings',
                        'Grand Celebrations',
                        'Elopements',
                        'Vow Renewals',
                        'Engagement Ceremonies',
                        'Pre-Wedding Events',
                        'Reception Parties',
                        'Cultural Weddings',
                        'Interfaith Weddings',
                        'Same-Day Weddings'
                      ].map((eventType) => (
                        <label
                          key={eventType}
                          className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={(formData.eventTypes as string[]).includes(eventType)}
                            onChange={() => handleEventTypeToggle(eventType)}
                            className="w-4 h-4 text-forest-green-600 border-gray-300 rounded focus:ring-forest-green-500 focus:ring-2"
                          />
                          <span className="ml-3 text-gray-700">{eventType}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {/* Selected Event Types Display */}
                  {(formData.eventTypes as string[]).length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(formData.eventTypes as string[]).map((eventType) => (
                        <span
                          key={eventType}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-forest-green-50 text-forest-green-700 rounded-lg text-sm border border-forest-green-200"
                        >
                          {eventType}
                          <button
                            type="button"
                            onClick={() => handleEventTypeToggle(eventType)}
                            className="hover:bg-forest-green-100 rounded-full p-0.5 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Coverage Areas / Locations */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Coverage Areas
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setLocationsDropdownOpen(!locationsDropdownOpen)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="text-gray-600">Select coverage areas</span>
                      <Plus className="w-4 h-4 text-forest-green-600" />
                    </button>
                    {locationsDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {availableLocations
                          .filter(loc => !formData.coverageAreas.includes(loc))
                          .map((location) => (
                            <button
                              key={location}
                              type="button"
                              onClick={() => handleLocationToggle(location)}
                              className="w-full px-4 py-2.5 text-left hover:bg-sage-green-50 transition-colors border-b border-gray-100 last:border-b-0"
                            >
                              {location}
                            </button>
                          ))}
                        {availableLocations.filter(loc => !formData.coverageAreas.includes(loc)).length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            All locations added
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.coverageAreas.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-sage-green-50 border border-sage-green-200 text-sage-green-700 px-3 py-1.5 rounded-lg"
                      >
                        <span>{location}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveLocation(index)}
                          className="hover:text-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                  {formData.coverageAreas.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No coverage areas added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-forest-green-500 to-sage-green-500 rounded-2xl p-4 text-white shadow-sm">
            <Award className="w-6 h-6 mb-2 opacity-80" />
            <input
              type="text"
              value={formData.yearsExperience}
              onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
              className="w-full bg-white/20 border-white/30 text-white placeholder-white/60 rounded-lg px-2 py-1 mb-1 text-lg font-semibold"
            />
            <p className="text-xs opacity-80">Years Experience</p>
          </div>

          <div className="bg-gradient-to-br from-bronze-brown-500 to-gold-yellow-600 rounded-2xl p-4 text-white shadow-sm">
            <Users className="w-6 h-6 mb-2 opacity-80" />
            <input
              type="text"
              value={formData.teamSize}
              onChange={(e) => handleInputChange('teamSize', e.target.value)}
              className="w-full bg-white/20 border-white/30 text-white placeholder-white/60 rounded-lg px-2 py-1 mb-1 text-lg font-semibold"
            />
            <p className="text-xs opacity-80">Team Members</p>
          </div>

          <div className="bg-gradient-to-br from-sage-green-500 to-forest-green-400 rounded-2xl p-4 text-white shadow-sm">
            <Calendar className="w-6 h-6 mb-2 opacity-80" />
            <input
              type="text"
              value={formData.completedEvents}
              onChange={(e) => handleInputChange('completedEvents', e.target.value)}
              className="w-full bg-white/20 border-white/30 text-white placeholder-white/60 rounded-lg px-2 py-1 mb-1 text-lg font-semibold"
            />
            <p className="text-xs opacity-80">Events Done</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2 text-forest-green-600">
            <Mail className="w-5 h-5" />
            Contact Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Business Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Website
              </label>
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Number of Social Media Followers
              </label>
              <input
                type="text"
                value={formData.totalFollowers}
                onChange={(e) => handleInputChange('totalFollowers', e.target.value)}
                placeholder="e.g., 10,000"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Total Number of Bookings
              </label>
              <input
                type="text"
                value={formData.totalBookings}
                onChange={(e) => handleInputChange('totalBookings', e.target.value)}
                placeholder="e.g., 500"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Social Media Accounts
              </label>
              
              <div className="space-y-3">
                {/* WhatsApp */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Instagram */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    placeholder="@yourusername"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Facebook */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    placeholder="Your Page Name"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Twitter */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange('twitter', e.target.value)}
                    placeholder="@yourhandle"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* TikTok */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.tiktok}
                    onChange={(e) => handleInputChange('tiktok', e.target.value)}
                    placeholder="@yourhandle"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="Your Profile URL"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* YouTube */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    placeholder="Your Channel Name"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Pinterest */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={formData.pinterest}
                    onChange={(e) => handleInputChange('pinterest', e.target.value)}
                    placeholder="Your Profile Name"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Snapchat */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-5 h-5 text-black" />
                  </div>
                  <input
                    type="text"
                    value={formData.snapchat}
                    onChange={(e) => handleInputChange('snapchat', e.target.value)}
                    placeholder="Your Username"
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2 text-forest-green-600">
            <DollarSign className="w-5 h-5" />
            Pricing Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting Price (LKR)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                LKR
              </span>
              <input
                type="text"
                value={formData.startingPrice}
                onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                className="w-full pl-16 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-green-500 focus:border-transparent outline-none"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This is the starting price shown to customers
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
