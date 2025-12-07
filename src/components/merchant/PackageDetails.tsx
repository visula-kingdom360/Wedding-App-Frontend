import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ArrowLeft, Upload, Image as ImageIcon, X, Star, MapPin, Phone, Mail, MessageCircle, Camera, Share2, Heart, Clock, Flame } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PackageDetailsProps {
  packageId?: string;
  onBack: () => void;
  mode?: 'view' | 'edit';
}

export function PackageDetails({ packageId, onBack, mode = 'edit' }: PackageDetailsProps) {
  const [formData, setFormData] = useState({
    name: packageId ? 'Great Photography' : '',
    category: packageId ? ['Photography'] : [] as string[],
    eventTypes: packageId ? ['Wedding', 'Engagement'] : [] as string[],
    services: packageId ? 'Full day coverage, 500+ edited photos, engagement shoot, premium album, USB drive' : '',
    price: packageId ? '20,000' : '',
    description: packageId ? 'Capture every special moment with professional photographers who bring your events to life.........' : '',
    location: packageId ? 'Boralla, Jambugasmulla Junction, Colombo 08' : '',
    rating: packageId ? '4.6' : '0'
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelectAdd = (field: 'category' | 'eventTypes', value: string) => {
    setFormData(prev => {
      const currentValues = prev[field] as string[];
      if (!currentValues.includes(value)) {
        return { ...prev, [field]: [...currentValues, value] };
      }
      return prev;
    });
  };

  const handleMultiSelectRemove = (field: 'category' | 'eventTypes', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload - in real app, you'd upload to server
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setUploadedImages(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Package data:', { ...formData, images: uploadedImages });
    onBack();
  };

  const categories = [
    'Photography',
    'Videography',
    'Catering',
    'Decoration',
    'Music & Entertainment',
    'Venue',
    'Transportation',
    'Flowers',
    'Makeup & Hair',
    'Wedding Planning'
  ];

  const eventTypes = [
    'Wedding',
    'Engagement',
    'Pre-wedding',
    'Reception',
    'Homecoming',
    'Birthday',
    'Anniversary',
    'Corporate Event',
    'Other'
  ];

  // View mode rendering - Vendor Profile Style
  if (mode === 'view' && packageId) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Hero Image Section */}
        <div className="relative h-[36vh]">
          {/* Full Width Background Image */}
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1706471406001-cb671b29cc7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBjYW1lcmF8ZW58MXx8fHwxNzYxNTI3MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt={formData.name}
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay on Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Back Button - Top Left */}
          <Button
            onClick={onBack}
            size="sm"
            variant="ghost"
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0 border border-white/30"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </Button>

          {/* Share Button - Top Right */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 p-0 border border-white/30"
          >
            <Share2 className="w-5 h-5 text-white" />
          </Button>

          {/* Favorite Button - Bottom Right on Image */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white hover:bg-white p-0 shadow-lg"
          >
            <Heart className="w-6 h-6 text-[#1a1a1a]" />
          </Button>

          {/* Package Info Overlaid on Image Bottom */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 text-white">
            <h1 className="text-2xl font-semibold mb-2">{formData.name}</h1>
            <div className="flex items-center gap-3 text-sm">
              <span>{formData.category || '2 venue'}</span>
              <span>•</span>
              <span>4 days</span>
              <span>•</span>
              <span>LKR {formData.price}</span>
            </div>
          </div>
        </div>

        {/* White Content Card - Overlaps Image */}
        <div className="bg-white rounded-t-[24px] px-6 pt-6 pb-8 -mt-4 relative z-10 min-h-[50vh]">
          {/* About Section */}
          <h2 className="text-[#1a1a1a] text-lg font-semibold mb-3">About {formData.name.split(' ')[0]}</h2>
          <p className="text-[#6B7280] text-sm leading-relaxed mb-6">
            {formData.description}. {formData.services}
          </p>

          {/* Service Provider Section */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h3 className="text-[#1a1a1a] font-semibold mb-3">Service Provider</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=merchant" />
                  <AvatarFallback className="bg-[#0C3B2E] text-white">SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[#1a1a1a] font-medium">Sarah Johnson</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#FFBA00] text-[#FFBA00]" />
                    <span className="text-[#6B7280] text-sm">{formData.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-50"
                >
                  <MessageCircle className="w-5 h-5 text-[#1a1a1a]" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 rounded-full border-gray-300 hover:bg-gray-50"
                >
                  <Phone className="w-5 h-5 text-[#1a1a1a]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <h3 className="text-[#1a1a1a] font-semibold mb-3">Location</h3>
            <div className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
              <p className="text-[#6B7280] text-sm">{formData.location}</p>
            </div>
          </div>

          {/* Add to Event Button */}
          <Button className="w-full bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-full h-12 mt-4">
            Add to Event
          </Button>
        </div>
      </div>
    );
  }

  // Edit mode rendering
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-6 h-6 text-neutral-dark" />
          </Button>
          <h1 className="text-xl font-medium text-neutral-dark">
            {packageId ? 'Edit Package' : 'Create Package'}
          </h1>
        </div>
        {packageId && (
          <Badge className="bg-forest-green-100 text-forest-green-600">
            Editing
          </Badge>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Package Name */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-dark">Package Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-dark">Package Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Premium Wedding Package"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventTypes" className="text-neutral-dark">Event Type *</Label>
              <Select value="" onValueChange={(value) => handleMultiSelectAdd('eventTypes', value)}>
                <SelectTrigger className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl">
                  <SelectValue placeholder="Select event types" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.filter(type => !formData.eventTypes.includes(type)).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.eventTypes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.eventTypes.map((type) => (
                    <Badge
                      key={type}
                      variant="secondary"
                      className="bg-forest-green-100 text-forest-green-700 hover:bg-forest-green-200 pr-1"
                    >
                      {type}
                      <button
                        type="button"
                        onClick={() => handleMultiSelectRemove('eventTypes', type)}
                        className="ml-1 hover:bg-forest-green-300 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-neutral-dark">Product Category *</Label>
              <Select value="" onValueChange={(value) => handleMultiSelectAdd('category', value)}>
                <SelectTrigger className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl">
                  <SelectValue placeholder="Select categories" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => !formData.category.includes(cat)).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.category.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.category.map((cat) => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="bg-forest-green-100 text-forest-green-700 hover:bg-forest-green-200 pr-1"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleMultiSelectRemove('category', cat)}
                        className="ml-1 hover:bg-forest-green-300 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-neutral-dark">Price (LKR) *</Label>
              <Input
                id="price"
                type="text"
                placeholder="e.g., 45000"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-neutral-dark">Location</Label>
              <Input
                id="location"
                placeholder="e.g., Colombo 08"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services & Description */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-dark">Services & Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description" className="text-neutral-dark">Package Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your package and what makes it special..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl min-h-24"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="services" className="text-neutral-dark">Services Included *</Label>
              <Textarea
                id="services"
                placeholder="List all services included in this package..."
                value={formData.services}
                onChange={(e) => handleInputChange('services', e.target.value)}
                className="bg-white border-gray-200 focus:border-forest-green-500 rounded-xl min-h-20"
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Images */}
        <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg text-neutral-dark">Package Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-neutral-dark font-medium mb-1">Upload Package Images</p>
                <p className="text-sm text-muted-foreground">
                  Choose multiple images to showcase your services
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: 1200x800px or larger (16:9 ratio)
                </p>
                <Button 
                  type="button" 
                  variant="outline"
                  className="mt-4 border-forest-green-200 text-forest-green-600 hover:bg-forest-green-50"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Choose Images
                </Button>
              </label>
            </div>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={image} 
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl border border-gray-200"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-6 h-6 p-0 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="space-y-3">
          <Button 
            type="submit" 
            className="w-full bg-forest-green-500 hover:bg-forest-green-600 text-white rounded-2xl py-3 mb-6"
          >
            {packageId ? 'Update Package' : 'Save Package'}
          </Button>
          
          {packageId && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onBack}
              className="w-full border-gray-200 text-neutral-dark hover:bg-gray-50 rounded-2xl py-3"
            >
              Cancel Changes
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
