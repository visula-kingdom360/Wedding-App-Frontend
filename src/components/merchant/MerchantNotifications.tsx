import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bell, 
  User, 
  MessageSquare,
  Calendar,
  Star,
  DollarSign,
  Package,
  Heart,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Filter
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantNotificationsProps {
  user: User;
  onBack?: () => void;
}

interface Notification {
  id: string;
  type: 'booking' | 'payment' | 'review' | 'inquiry' | 'system' | 'promotion';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionRequired?: boolean;
  customerName?: string;
  packageName?: string;
  amount?: string;
}

export function MerchantNotifications({ user }: MerchantNotificationsProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'New Booking Request',
      message: 'Sarah Johnson has requested your Premium Wedding Package for December 15, 2024. Please review and confirm availability.',
      time: '2 minutes ago',
      read: false,
      priority: 'high',
      actionRequired: true,
      customerName: 'Sarah Johnson',
      packageName: 'Premium Wedding Package',
      amount: 'LKR 45,000'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of LKR 25,000 has been successfully received from Michael Chen for Basic Wedding Package.',
      time: '1 hour ago',
      read: false,
      priority: 'medium',
      customerName: 'Michael Chen',
      packageName: 'Basic Wedding Package',
      amount: 'LKR 25,000'
    },
    {
      id: '3',
      type: 'review',
      title: 'New 5-Star Review',
      message: 'Emma Williams left a glowing review: "Absolutely fantastic service! Professional and creative photography that captured every precious moment."',
      time: '3 hours ago',
      read: false,
      priority: 'medium',
      customerName: 'Emma Williams'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking': return Calendar;
      case 'payment': return DollarSign;
      case 'review': return Star;
      case 'inquiry': return MessageSquare;
      case 'system': return Bell;
      case 'promotion': return Package;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'booking': return 'text-forest-green-600';
      case 'payment': return 'text-gold-yellow-600';
      case 'review': return 'text-gold-yellow-600';
      case 'inquiry': return 'text-sage-green-600';
      case 'system': return 'text-bronze-brown-600';
      case 'promotion': return 'text-forest-green-600';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-gold-yellow-100 text-gold-yellow-700 border-gold-yellow-200';
      case 'low': return 'bg-sage-green-100 text-sage-green-700 border-sage-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    if (activeTab === 'action') return notification.actionRequired;
    return notification.type === activeTab;
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Notification Stats */}
      <div className="px-4 pt-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-forest-green-500">{unreadCount}</p>
              <p className="text-sm text-muted-foreground">Unread</p>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-500">{highPriorityCount}</p>
              <p className="text-sm text-muted-foreground">Urgent</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-neutral-dark">Notifications</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-forest-green-500 text-forest-green-500">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                className="border-sage-green-500 text-sage-green-500"
              >
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="action">Action Required</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              return (
                <Card 
                  key={notification.id} 
                  className={`bg-white rounded-2xl shadow-sm border transition-all cursor-pointer ${
                    notification.read 
                      ? 'border-gray-100 hover:shadow-md' 
                      : 'border-forest-green-200 bg-forest-green-50/30 hover:shadow-lg'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Notification Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.read ? 'bg-gray-100' : 'bg-forest-green-100'
                          }`}>
                            <IconComponent className={`w-5 h-5 ${
                              notification.read ? 'text-gray-600' : getNotificationColor(notification.type)
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-medium ${
                                notification.read ? 'text-neutral-dark' : 'text-forest-green-800'
                              }`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-forest-green-500 rounded-full"></div>
                              )}
                            </div>
                            <p className={`text-sm leading-relaxed ${
                              notification.read ? 'text-muted-foreground' : 'text-forest-green-700'
                            }`}>
                              {notification.message}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Notification Details */}
                      {(notification.customerName || notification.packageName || notification.amount) && (
                        <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                          {notification.customerName && (
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-neutral-dark">{notification.customerName}</span>
                            </div>
                          )}
                          {notification.packageName && (
                            <div className="flex items-center space-x-2">
                              <Package className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{notification.packageName}</span>
                            </div>
                          )}
                          {notification.amount && (
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-medium text-bronze-brown-500">{notification.amount}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <div className="flex space-x-2">
                          {notification.type === 'booking' && notification.actionRequired && (
                            <Button size="sm" variant="outline" className="h-7 text-xs border-forest-green-500 text-forest-green-500">
                              View Booking
                            </Button>
                          )}
                          {notification.type === 'inquiry' && (
                            <Button size="sm" variant="outline" className="h-7 text-xs border-sage-green-500 text-sage-green-500">
                              Reply
                            </Button>
                          )}
                          {notification.type === 'review' && (
                            <Button size="sm" variant="outline" className="h-7 text-xs border-gold-yellow-500 text-gold-yellow-500">
                              View Review
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Card className="bg-white rounded-2xl border border-gray-100">
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-neutral-dark mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {activeTab === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications in this category.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}