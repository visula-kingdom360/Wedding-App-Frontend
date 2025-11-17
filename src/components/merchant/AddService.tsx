import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';

interface AddServiceProps {
  onBack: () => void;
}

export function AddService({ onBack }: AddServiceProps) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    photo: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle service creation
    console.log('Service data:', formData);
    onBack();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 flex items-center gap-3 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">Add New Service</h1>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Service Photo</Label>
                <div className="space-y-3">
                  <div className="w-full h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg flex items-center justify-center">
                    {formData.photo ? (
                      <img 
                        src={URL.createObjectURL(formData.photo)} 
                        alt="Service preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Upload a photo of your service</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload">
                      <Button type="button" variant="outline" size="sm" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          {formData.photo ? 'Change Photo' : 'Upload Photo'}
                        </span>
                      </Button>
                    </Label>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Service Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Professional Wedding Photography"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="1500"
                    className="pl-8"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">Enter your base price for this service</p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service, what's included, your experience, etc."
                  rows={6}
                  required
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <h3 className="font-semibold">Additional Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Instant Booking</p>
                      <p className="text-sm text-muted-foreground">Allow customers to book without approval</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Multiple Packages</p>
                      <p className="text-sm text-muted-foreground">Offer different pricing tiers</p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Publish Service
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}