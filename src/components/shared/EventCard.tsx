import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Calendar, MapPin, Users, CheckCircle, Clock, AlertCircle, ClipboardList, FileUp, Mail, ChevronRight, Share2, Eye, UserCog, Copy, Check, MessageCircle } from 'lucide-react';

interface EventCardProps {
  event: {
    id: string;
    name: string;
    type?: string;
    date: string;
    location: string;
    status: 'planning' | 'active' | 'completed' | 'cancelled';
    description?: string;
    progress?: number;
    totalTasks?: number;
    completedTasks?: number;
    guestCount?: number;
    budget?: number;
    spent?: number;
  };
  onManage?: (eventId: string) => void;
  onView?: (eventId: string) => void;
  showProgress?: boolean;
  compact?: boolean;
  // Carousel navigation props
  currentIndex?: number;
  totalEvents?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function EventCard({ 
  event, 
  onManage, 
  onView, 
  showProgress = true, 
  compact = false,
  currentIndex,
  totalEvents,
  onPrevious,
  onNext
}: EventCardProps) {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState<'view' | 'manage' | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'planning':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'planning':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleShareLink = (mode: 'view' | 'manage') => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?mode=${mode}&eventId=${event.id}`;
    
    // Create temporary textarea to copy
    const textArea = document.createElement('textarea');
    textArea.value = shareUrl;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopiedLink(mode);
      setTimeout(() => setCopiedLink(null), 2000);
    } catch (err) {
      alert(`Share link: ${shareUrl}`);
    }
    
    document.body.removeChild(textArea);
  };

  const handleWhatsAppShare = (mode: 'view' | 'manage') => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}?mode=${mode}&eventId=${event.id}`;
    const modeText = mode === 'view' ? 'view-only access' : 'full management access';
    const message = `Check out this event: *${event.name}*\n📅 ${formatDate(event.date)}\n📍 ${event.location}\n\nI'm sharing ${modeText} with you:\n${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/30 to-white border-2 border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(12,59,46,0.15)] transition-all duration-500 hover:scale-[1.02]">
      {/* Decorative Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#0C3B2E] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#6D9773] rounded-full blur-[80px]" />
      </div>

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start gap-3">
          <div className="flex-1 min-w-0 overflow-hidden pr-2">
            <div className="mb-2">
              <CardTitle className={`${compact ? "text-base" : "text-xl"} font-black text-gray-900`}>
                {event.name.length > 20 ? `${event.name.substring(0, 20)}...` : event.name}
              </CardTitle>
            </div>
            
            {event.type && (
              <Badge variant="secondary" className="text-xs font-semibold bg-gray-100/80 text-gray-700 border-0">
                {event.type}
              </Badge>
            )}
          </div>

          {/* Share Button and Navigation Arrows */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-auto pl-2">
            {/* Share Button */}
            <button 
              onClick={() => setShareDialogOpen(true)}
              className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 hover:border-[#0C3B2E] hover:bg-[#0C3B2E]/5 flex items-center justify-center transition-all duration-300 hover:shadow-md"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>

            {/* Navigation Arrows */}
            {!compact && totalEvents !== undefined && totalEvents > 1 && (
              <>
                <button 
                  onClick={onPrevious}
                  disabled={currentIndex === 0}
                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 hover:border-[#0C3B2E] hover:bg-gray-50 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={onNext}
                  disabled={currentIndex === totalEvents - 1}
                  className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 hover:border-[#0C3B2E] hover:bg-gray-50 flex items-center justify-center transition-all duration-300 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 relative z-10">
        {/* Semi-Circle Progress Section */}
        {showProgress && event.progress !== undefined && !compact && (
          <div className="flex flex-col items-center -mt-2 pb-4">
            {/* SVG Semi-Circle Progress */}
            <div className="relative w-full max-w-[364px] -mt-8">
              <svg className="w-full h-auto" viewBox="0 15 160 75" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Gradient from Light Green to Dark Green */}
                  <linearGradient id="semiCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#A8D5BA" />
                    <stop offset="50%" stopColor="#6D9773" />
                    <stop offset="100%" stopColor="#0C3B2E" />
                  </linearGradient>
                </defs>
                
                {/* Background Semi-Circle Track */}
                <path
                  d="M 20 85 A 60 60 0 0 1 140 85"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="16"
                  strokeLinecap="round"
                />
                
                {/* Progress Semi-Circle with Gradient */}
                <path
                  d="M 20 85 A 60 60 0 0 1 140 85"
                  fill="none"
                  stroke="url(#semiCircleGradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.PI * 60}`}
                  strokeDashoffset={`${Math.PI * 60 * (1 - event.progress / 100)}`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              
              {/* Center Score Display */}
              <div className="absolute inset-x-0 bottom-1 flex flex-col items-center gap-0.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-[2.73rem] font-black text-[#6D9773] leading-none">
                    {(event.progress / 10).toFixed(1)}
                  </span>
                  <span className="text-2xl font-black text-gray-400 leading-none">/10</span>
                </div>
                <span className="text-sm font-black text-gray-500 relative top-3">
                  {event.progress >= 80 ? 'Excellent!' : event.progress >= 60 ? 'Good!' : event.progress >= 40 ? 'Fair' : 'Start'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Date and Tasks Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4.5 h-4.5 text-gray-600" strokeWidth={2} />
            </div>
            <span className="text-sm text-gray-700">{formatDate(event.date)}</span>
          </div>
          
          {event.completedTasks !== undefined && event.totalTasks !== undefined && (
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Tasks</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-2xl font-black text-gray-900 leading-none">
                  {event.completedTasks}
                </span>
                <span className="text-base text-gray-400 leading-none">/{event.totalTasks}</span>
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        {!compact && (
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#B46617]/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4.5 h-4.5 text-[#B46617]" strokeWidth={2} />
            </div>
            <span className="text-sm text-gray-700 truncate">{event.location}</span>
          </div>
        )}

        {/* Budget Info */}
        {event.spent !== undefined && event.budget !== undefined && showProgress && !compact && (
          <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-[#0C3B2E]/5 to-[#6D9773]/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Confirmed Vendor Prices</span>
              <span className="text-xs text-gray-600">Full Budget</span>
            </div>
            <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0C3B2E] via-[#6D9773] to-[#0C3B2E] rounded-full transition-all duration-500"
                style={{ width: `${(event.spent / event.budget) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm font-black text-[#0C3B2E]">LKR {(event.spent / 1000).toFixed(0)}K</span>
              <span className="text-sm font-black text-gray-600">LKR {(event.budget / 1000).toFixed(0)}K</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-1">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              if (onView) {
                onView(event.id);
              }
            }}
            className="flex-1 h-11 rounded-xl border-2 border-gray-200 hover:border-[#6D9773] hover:bg-[#6D9773]/5 hover:text-[#6D9773] transition-all duration-300"
          >
            {event.status === 'completed' ? 'View Details' : 'View Event'}
          </Button>
          
          {(event.status === 'active' || event.status === 'planning') && onManage ? (
            <Button 
              size="sm" 
              onClick={() => onManage(event.id)}
              className="flex-1 h-11 rounded-xl bg-gradient-to-br from-[#0C3B2E] via-[#115239] to-[#0C3B2E] hover:shadow-lg text-white border-0 transition-all duration-300"
            >
              Manage Event
            </Button>
          ) : event.status === 'completed' ? (
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 h-11 rounded-xl border-2 border-[#6D9773] bg-[#6D9773]/5 hover:bg-[#6D9773]/10 transition-all duration-300"
            >
              View Summary
            </Button>
          ) : null}
        </div>
      </CardContent>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-gray-900">Share Event</DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Choose how you want to share "{event.name}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 mt-4">
            {/* View Only Option */}
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-[#6D9773] transition-all duration-300 bg-gradient-to-br from-white to-gray-50/30">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#6D9773]/10 flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-[#6D9773]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 mb-1">Share Event View</h3>
                    <p className="text-xs text-gray-600">
                      Recipients can view event details, vendors, and tasks but cannot make changes or manage the event.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleShareLink('view')}
                    className="flex-1 h-10 rounded-lg bg-white border-2 border-gray-200 hover:border-[#6D9773] hover:bg-[#6D9773]/5 text-gray-900 hover:text-[#6D9773] transition-all duration-300"
                    variant="outline"
                  >
                    {copiedLink === 'view' ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => handleWhatsAppShare('view')}
                    className="flex-1 h-10 rounded-lg bg-[rgb(17,91,44)] hover:bg-[#20BA5A] text-white transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>

            {/* Full Control Option */}
            <div className="relative overflow-hidden rounded-xl border-2 border-[#0C3B2E]/20 hover:border-[#0C3B2E] transition-all duration-300 bg-gradient-to-br from-[#0C3B2E]/5 to-[#6D9773]/5">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0C3B2E]/10 flex items-center justify-center flex-shrink-0">
                    <UserCog className="w-5 h-5 text-[#0C3B2E]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 mb-1">Full Event Control</h3>
                    <p className="text-xs text-gray-600">
                      Share complete access. Recipients can manage, update vendors, modify tasks, and change all event details.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleShareLink('manage')}
                    className="flex-1 h-10 rounded-lg bg-white border-2 border-[#0C3B2E] hover:bg-[#0C3B2E]/5 text-[#0C3B2E] hover:text-[#0C3B2E] transition-all duration-300"
                    variant="outline"
                  >
                    {copiedLink === 'manage' ? (
                      <>
                        <Check className="w-4 h-4 mr-2 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => handleWhatsAppShare('manage')}
                    className="flex-1 h-10 rounded-lg bg-[rgb(17,91,44)] hover:bg-[#20BA5A] text-white transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Anyone with the link can access the event based on the permission level you choose.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}