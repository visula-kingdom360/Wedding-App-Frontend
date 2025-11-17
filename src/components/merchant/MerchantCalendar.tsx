import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react';

interface MerchantCalendarProps {
  onBack: () => void;
}

interface TimeSlot {
  id: string;
  time: string;
  status: 'available' | 'booked' | 'blocked';
  client?: string;
}

interface DaySchedule {
  date: string;
  slots: TimeSlot[];
}

export function MerchantCalendar({ onBack }: MerchantCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const hasBookings = (date: Date) => {
    // Mock data - some dates have bookings
    const day = date.getDate();
    return [5, 12, 15, 20, 25].includes(day) && isCurrentMonth(date);
  };

  const days = getDaysInMonth(currentMonth);

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const mockSchedule: DaySchedule = {
    date: selectedDate || '',
    slots: [
      { id: '1', time: '9:00 AM', status: 'available' },
      { id: '2', time: '10:00 AM', status: 'booked', client: 'Sarah & Mike Wedding' },
      { id: '3', time: '11:00 AM', status: 'available' },
      { id: '4', time: '12:00 PM', status: 'blocked' },
      { id: '5', time: '1:00 PM', status: 'available' },
      { id: '6', time: '2:00 PM', status: 'booked', client: 'Emily & John Engagement' },
      { id: '7', time: '3:00 PM', status: 'available' },
      { id: '8', time: '4:00 PM', status: 'available' },
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 flex items-center gap-3 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">Calendar Management</h1>
      </div>

      <div className="p-4 space-y-6 pb-20">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Schedule</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="ghost" size="sm" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dateStr = formatDate(day);
                const isSelected = selectedDate === dateStr;
                const isCurrentMonthDay = isCurrentMonth(day);
                const hasBookingsToday = hasBookings(day);

                return (
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    className={`h-12 p-0 relative ${!isCurrentMonthDay ? 'text-muted-foreground/50' : ''}`}
                    onClick={() => isCurrentMonthDay && setSelectedDate(dateStr)}
                  >
                    {day.getDate()}
                    {hasBookingsToday && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Add Availability Button */}
        <Button className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Availability
        </Button>

        {/* Day Schedule */}
        {selectedDate && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Schedule for {new Date(selectedDate).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockSchedule.slots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{slot.time}</span>
                    <Badge
                      variant={
                        slot.status === 'available' ? 'secondary' :
                        slot.status === 'booked' ? 'default' : 'destructive'
                      }
                    >
                      {slot.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    {slot.client && (
                      <p className="text-sm font-medium">{slot.client}</p>
                    )}
                    {slot.status === 'available' && (
                      <Button variant="outline" size="sm">
                        Block
                      </Button>
                    )}
                    {slot.status === 'blocked' && (
                      <Button variant="outline" size="sm">
                        Unblock
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {mockSchedule.slots.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4" />
                  <p>No schedule set for this day</p>
                  <Button variant="outline" className="mt-2">
                    Add Time Slots
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}