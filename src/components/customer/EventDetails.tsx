import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, MapPin, Calendar, Star, Phone, Mail, Camera, Utensils, Music } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  rating: number;
  category: string;
  image: string;
}

interface EventDetailsProps {
  event: Event | null;
  onBook: () => void;
  onBack: () => void;
}

export function EventDetails({ event, onBook, onBack }: EventDetailsProps) {
  if (!event) return null;

  const vendors = [
    { name: 'Premium Photography', icon: Camera, price: '$1,800', rating: 4.9 },
    { name: 'Gourmet Catering', icon: Utensils, price: '$85/person', rating: 4.7 },
    { name: 'Live Wedding Band', icon: Music, price: '$2,200', rating: 4.8 }
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 flex items-center gap-3 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">Event Details</h1>
      </div>

      {/* Hero Image */}
      <div className="aspect-video relative">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-4 left-4" variant="secondary">
          {event.category}
        </Badge>
      </div>

      <div className="p-4 space-y-6">
        {/* Title and Details */}
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold">{event.title}</h2>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{event.rating}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-bold">{event.price}</span>
            <Button onClick={onBook} size="lg" className="px-8">
              Book Now
            </Button>
          </div>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>About This Service</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Experience the perfect wedding celebration at our stunning venue. We offer comprehensive packages 
              including decoration, catering, photography, and entertainment to make your special day unforgettable. 
              Our experienced team will work with you to customize every detail according to your vision.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>info@weddingvenue.com</span>
            </div>
          </CardContent>
        </Card>

        {/* Vendors/Packages */}
        <Card>
          <CardHeader>
            <CardTitle>Available Vendors & Packages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {vendors.map((vendor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <vendor.icon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="font-semibold">{vendor.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {vendor.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{vendor.price}</div>
                  <Button variant="outline" size="sm">Add</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}