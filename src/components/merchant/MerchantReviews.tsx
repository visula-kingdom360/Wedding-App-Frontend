import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Star, 
  User, 
  Calendar, 
  MessageCircle, 
  Flag,
  ArrowLeft,
  Filter
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantReviewsProps {
  user: User;
  onBack?: () => void;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  packageName: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export function MerchantReviews({ user, onBack }: MerchantReviewsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      rating: 4.6,
      title: 'Great Service',
      comment: 'Capture every special moment with professional photographers who bring your events to life From candid wedding shots................',
      packageName: 'Premium Wedding Package',
      date: '2024-10-15',
      verified: true,
      helpful: 12
    },
    {
      id: '2',
      customerName: 'Michael Chen',
      rating: 4.6,
      title: 'Excellent Photography',
      comment: 'Capture every special moment with professional photographers who bring your events to life From candid wedding shots................',
      packageName: 'Basic Wedding Package',
      date: '2024-10-12',
      verified: true,
      helpful: 8
    },
    {
      id: '3',
      customerName: 'Emma Williams',
      rating: 4.6,
      title: 'Amazing Experience',
      comment: 'Capture every special moment with professional photographers who bring your events to life From candid wedding shots................',
      packageName: 'Destination Wedding Package',
      date: '2024-10-08',
      verified: true,
      helpful: 15
    },
    {
      id: '4',
      customerName: 'David Rodriguez',
      rating: 5.0,
      title: 'Outstanding Service',
      comment: 'Exceptional photography service that exceeded all our expectations. Professional, creative, and reliable.',
      packageName: 'Premium Wedding Package',
      date: '2024-10-05',
      verified: true,
      helpful: 23
    }
  ];

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="space-y-6 pb-6">
      {/* Reviews Section Header */}
      <div className="bg-gray-200 px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-medium text-neutral-dark">Reviews</h2>
          <Button variant="outline" size="sm" className="border-forest-green-500 text-forest-green-500">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        
        {/* Review Summary */}
        <div className="bg-white rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-forest-green-500">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center">
                  <Star className="w-4 h-4 fill-gold-yellow-500 text-gold-yellow-500" />
                  <span className="text-sm text-muted-foreground ml-1">Average</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neutral-dark">{totalReviews}</div>
                <div className="text-sm text-muted-foreground">Reviews</div>
              </div>
            </div>
            <div className="text-right">
              <Badge className="bg-forest-green-500 text-white">Excellent</Badge>
            </div>
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-neutral-dark">{review.title}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-gold-yellow-500 text-gold-yellow-500" />
                          <span className="font-medium text-neutral-dark">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>

                  {/* Review Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{review.customerName}</span>
                      <span>•</span>
                      <span>{review.packageName}</span>
                      {review.verified && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs border-forest-green-200 text-forest-green-600">
                            Verified
                          </Badge>
                        </>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Reply
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">
                        {review.helpful} Helpful
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-6">
          <Button variant="outline" className="border-forest-green-500 text-forest-green-500">
            Load More Reviews
          </Button>
        </div>
      </div>
    </div>
  );
}