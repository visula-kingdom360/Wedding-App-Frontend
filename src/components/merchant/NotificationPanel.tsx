import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  ShoppingCart, 
  CheckCircle2, 
  Shield, 
  TrendingUp, 
  MessageSquare,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Notification {
  id: string;
  type: 'new-order' | 'weekly-update' | 'customer-enquiry' | 'payment' | 'security';
  title: string;
  preview: string;
  fullDetails: string;
  timestamp: string;
  isUnread: boolean;
  isUrgent: boolean;
  userImage?: string;
}

interface NotificationPanelProps {
  onClose?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'new-order',
    title: 'New Order for ID: MSLES8B0',
    preview: '',
    fullDetails: 'Customer John Doe has placed an order for Premium Wedding Photography Package. Order total: LKR 150,000. Please review and confirm the booking.',
    timestamp: 'Wednesday 6:30 pm',
    isUnread: true,
    isUrgent: true,
    userImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment successfully verified',
    preview: 'The payment has been confirmed. Proceed with shipping.',
    fullDetails: 'Payment of LKR 85,000 for order #MSLES8A5 has been successfully verified and deposited to your account. You can now proceed with service delivery.',
    timestamp: 'Tuesday 7:30 am',
    isUnread: false,
    isUrgent: false
  },
  {
    id: '3',
    type: 'customer-enquiry',
    title: 'Customer Enquiry about Package',
    preview: 'A customer is asking about your Deluxe Catering package availability.',
    fullDetails: 'Sarah Williams enquired: "Hi, I would like to know if your Deluxe Catering package is available for a wedding on December 15th? We\'re expecting around 200 guests."',
    timestamp: 'Tuesday 2:15 pm',
    isUnread: true,
    isUrgent: false,
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: '4',
    type: 'security',
    title: 'Your security password has been successfully changed',
    preview: '',
    fullDetails: 'Your account password was changed on Monday at 9:30 am. If this wasn\'t you, please contact support immediately.',
    timestamp: 'Monday 9:30 am',
    isUnread: false,
    isUrgent: false
  },
  {
    id: '5',
    type: 'new-order',
    title: 'New Order for ID: MSLES8B2',
    preview: '',
    fullDetails: 'Customer Amanda Chen has placed an order for Elegant Floral Arrangement. Order total: LKR 45,000. Please confirm availability.',
    timestamp: 'Sunday 4:30 pm',
    isUnread: true,
    isUrgent: false,
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  },
  {
    id: '6',
    type: 'weekly-update',
    title: 'Reached 230k visitors in May',
    preview: 'You had 230k visits last month a 3.8% increase from previous month.',
    fullDetails: 'Great news! Your vendor profile received 230,000 visits in May, representing a 3.8% increase from April. Your most popular package was the Premium Wedding Photography with 1,250 enquiries.',
    timestamp: 'Monday 9:30 am',
    isUnread: false,
    isUrgent: false
  },
  {
    id: '7',
    type: 'customer-enquiry',
    title: 'Urgent: Customer needs response',
    preview: 'Customer waiting for quote confirmation on wedding venue.',
    fullDetails: 'Michael Brown enquired 2 days ago: "I sent a request for a quote on your Grand Ballroom package for 300 guests. Could you please provide pricing and availability for March 20th?"',
    timestamp: 'Friday 11:20 am',
    isUnread: true,
    isUrgent: true
  }
];

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'customer-enquiry' | 'urgent' | 'unread'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredNotifications = mockNotifications.filter(notif => {
    if (activeTab === 'all') return true;
    if (activeTab === 'customer-enquiry') return notif.type === 'customer-enquiry';
    if (activeTab === 'urgent') return notif.isUrgent;
    if (activeTab === 'unread') return notif.isUnread;
    return true;
  });

  const unreadCount = mockNotifications.filter(n => n.isUnread).length;
  const urgentCount = mockNotifications.filter(n => n.isUrgent).length;
  const enquiryCount = mockNotifications.filter(n => n.type === 'customer-enquiry').length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'new-order':
        return <ShoppingCart className="w-5 h-5 text-forest-green-500" />;
      case 'payment':
        return <CheckCircle2 className="w-5 h-5 text-sage-green-500" />;
      case 'security':
        return <Shield className="w-5 h-5 text-bronze-brown-500" />;
      case 'weekly-update':
        return <TrendingUp className="w-5 h-5 text-gold-yellow-600" />;
      case 'customer-enquiry':
        return <MessageSquare className="w-5 h-5 text-forest-green-500" />;
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      <div className="py-4 border-b bg-white overflow-x-hidden">

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-scroll scrollbar-hide px-6 -mx-6 touch-pan-x">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === 'all'
                ? 'bg-forest-green-500 text-white'
                : 'text-muted-foreground hover:bg-gray-100'
            }`}
          >
            View All
          </button>
          <button
            onClick={() => setActiveTab('customer-enquiry')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === 'customer-enquiry'
                ? 'bg-forest-green-500 text-white'
                : 'text-muted-foreground hover:bg-gray-100'
            }`}
          >
            Customer Enquiry
            {enquiryCount > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                activeTab === 'customer-enquiry' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {enquiryCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('urgent')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === 'urgent'
                ? 'bg-forest-green-500 text-white'
                : 'text-muted-foreground hover:bg-gray-100'
            }`}
          >
            Urgent
            {urgentCount > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                activeTab === 'urgent' ? 'bg-white/20' : 'bg-red-100 text-red-600'
              }`}>
                {urgentCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('unread')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeTab === 'unread'
                ? 'bg-forest-green-500 text-white'
                : 'text-muted-foreground hover:bg-gray-100'
            }`}
          >
            Unread
            {unreadCount > 0 && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                activeTab === 'unread' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No notifications</p>
          </div>
        ) : (
          <div className="divide-y bg-white">
            {filteredNotifications.map((notification) => {
              const isExpanded = expandedId === notification.id;
              
              return (
                <div
                  key={notification.id}
                  className={`px-6 py-4 transition-colors ${
                    notification.isUnread ? 'bg-forest-green-50/30' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* User Image or Icon */}
                    <div className="shrink-0 relative">
                      {notification.userImage ? (
                        <div className="relative">
                          <ImageWithFallback
                            src={notification.userImage}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {notification.isUnread && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                      ) : (
                        <div className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getIcon(notification.type)}
                          {notification.isUnread && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 mb-1">
                        <h3 className="font-medium text-neutral-dark text-sm flex-1">
                          {notification.title}
                        </h3>
                        {notification.isUrgent && (
                          <Badge className="bg-red-100 text-red-600 text-xs shrink-0">
                            Urgent
                          </Badge>
                        )}
                      </div>

                      {/* Preview Text */}
                      {notification.preview && !isExpanded && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.preview}
                        </p>
                      )}

                      {/* Full Details (when expanded) */}
                      {isExpanded && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {notification.fullDetails}
                        </p>
                      )}

                      {/* Timestamp */}
                      <p className="text-xs text-muted-foreground mb-2">
                        {notification.timestamp}
                      </p>

                      {/* View More/Less Button */}
                      <button
                        onClick={() => toggleExpand(notification.id)}
                        className="text-xs text-forest-green-600 hover:text-forest-green-700 font-medium flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            View Less
                            <ChevronUp className="w-3 h-3" />
                          </>
                        ) : (
                          <>
                            View More
                            <ChevronDown className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
