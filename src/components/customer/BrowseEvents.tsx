import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search, Filter, MapPin, Calendar, Star } from 'lucide-react';
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

interface BrowseEventsProps {
  onEventSelect: (event: Event) => void;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Garden Wedding Ceremony',
    date: 'June 15, 2024',
    location: 'Botanical Gardens',
    price: 'LKR 2,500',
    rating: 4.8,
    category: 'Venue',
    image: 'https://images.unsplash.com/photo-1757589227072-0dd17af42433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2VyZW1vbnklMjB2ZW51ZSUyMGRlY29yYXRpb258ZW58MXx8fHwxNzU5NDc1NDUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '2',
    title: 'Professional Wedding Photography',
    date: 'Available All Dates',
    location: 'Various Locations',
    price: 'LKR 1,800',
    rating: 4.9,
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1612883809638-9314edb33efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBvdXRkb29yJTIwbmF0dXJlfGVufDF8fHx8MTc1OTQ3NTQ1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: '3',
    title: 'Gourmet Wedding Catering',
    date: 'Book in Advance',
    location: 'On-site Service',
    price: '$85/person',
    rating: 4.7,
    category: 'Catering',
    image: 'https://images.unsplash.com/photo-1758810742443-b82f48355828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY2F0ZXJpbmclMjBlbGVnYW50JTIwZGluaW5nfGVufDF8fHx8MTc1OTQ3NTQ1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

export function BrowseEvents({ onEventSelect }: BrowseEventsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search wedding services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-12"
        />
        <Button 
          size="sm" 
          variant="ghost" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter Pills */}
      {showFilters && (
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">All Categories</Badge>
          <Badge variant="secondary">Venues</Badge>
          <Badge variant="outline">Photography</Badge>
          <Badge variant="outline">Catering</Badge>
          <Badge variant="outline">Music</Badge>
        </div>
      )}

      {/* Event Cards */}
      <div className="space-y-4">
        {mockEvents.map((event) => (
          <Card 
            key={event.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onEventSelect(event)}
          >
            <div className="aspect-video relative">
              <ImageWithFallback
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 left-2" variant="secondary">
                {event.category}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold">{event.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{event.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold text-lg">{event.price}</span>
                  <Button size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}