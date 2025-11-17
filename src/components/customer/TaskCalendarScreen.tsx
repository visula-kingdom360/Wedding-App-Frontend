import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle, Circle, ChevronLeft, ChevronRight, Clock, AlertCircle, Plus, Users, TrendingUp, Share2, ChevronDown, ChevronUp, Mail, Edit, Trash2, MoreVertical, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner@2.0.3";
import type { CustomerScreen } from "./CustomerApp";
import { registeredUsers, getAvatarForEmail } from "../../data/users";
import type { Task } from "../../data/tasks";

interface TaskCalendarScreenProps {
  eventId?: string;
  eventName?: string;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  selectedTaskId?: string;
  initialCategoryFilter?: string;
  onBack: () => void;
  onNavigate: (screen: CustomerScreen) => void;
}

export function TaskCalendarScreen({ eventId, eventName, tasks, setTasks, selectedTaskId, initialCategoryFilter, onBack, onNavigate }: TaskCalendarScreenProps) {
  // Current logged-in user (in production, this would come from auth context)
  const currentUser = {
    name: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<string>(initialCategoryFilter || 'all');
  const [completionFilter, setCompletionFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(selectedTaskId || null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmails, setShareEmails] = useState<string[]>(['']);
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<Task | null>(null);

  // Filter tasks by eventId if provided
  const eventTasks = eventId ? tasks.filter(task => task.eventId === eventId) : tasks;

  const categories = ['all', 'Venue', 'Photography', 'Decoration', 'Catering', 'Entertainment', 'Planning'];

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  // Get tasks for a specific date
  const getTasksForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventTasks.filter(task => task.date === dateStr);
  };

  // Get today's tasks
  const getTodayTasks = () => {
    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    let todayTasks = eventTasks.filter(task => task.date === dateStr);
    
    if (activeFilter !== 'all') {
      todayTasks = todayTasks.filter(task => task.category === activeFilter);
    }
    
    // Apply completion filter
    if (completionFilter === 'active') {
      todayTasks = todayTasks.filter(task => !task.completed);
    } else if (completionFilter === 'completed') {
      todayTasks = todayTasks.filter(task => task.completed);
    }
    
    return todayTasks.sort((a, b) => a.time.localeCompare(b.time));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const toggleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleShareToCalendar = () => {
    // Filter out empty emails
    const validEmails = shareEmails.filter(email => email.trim() !== '');
    
    if (!selectedTaskForShare || validEmails.length === 0) {
      toast.error('Please enter at least one email address');
      return;
    }

    // Update the task with assigned emails
    setTasks(tasks.map(task => 
      task.id === selectedTaskForShare.id 
        ? { ...task, assignedTo: validEmails }
        : task
    ));

    // Parse the task date and time
    const [year, month, day] = selectedTaskForShare.date.split('-');
    const [hours, minutes] = selectedTaskForShare.time.split(':');
    
    // Create start date
    const startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
    
    // Create end date (1 hour after start)
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1);
    
    // Format dates for Google Calendar (YYYYMMDDTHHmmss format)
    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };
    
    const startStr = formatDateForGoogle(startDate);
    const endStr = formatDateForGoogle(endDate);
    
    // Create Google Calendar URL with multiple attendees
    const attendees = validEmails.join(',');
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedTaskForShare.title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(selectedTaskForShare.description || '')}&add=${encodeURIComponent(attendees)}`;
    
    // Open in new window
    window.open(calendarUrl, '_blank');
    
    const emailCount = validEmails.length;
    toast.success(`Task assigned to ${emailCount} ${emailCount === 1 ? 'person' : 'people'} and calendar invitation sent`);
    setShareDialogOpen(false);
    setShareEmails(['']);
    setSelectedTaskForShare(null);
  };

  const addEmailField = () => {
    setShareEmails([...shareEmails, '']);
  };

  const removeEmailField = (index: number) => {
    if (shareEmails.length > 1) {
      setShareEmails(shareEmails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...shareEmails];
    newEmails[index] = value;
    setShareEmails(newEmails);
  };

  // Helper function to render avatars for a task
  const renderTaskAvatars = (task: Task, isActive: boolean) => {
    // If no one is assigned, show current user avatar
    if (!task.assignedTo || task.assignedTo.length === 0) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-8 h-8 border-2 border-white cursor-pointer">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className={`text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-[#0C3B2E] text-white'}`}>
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">{currentUser.name} (You)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    // If assigned to people, show their avatars (max 3, then show +X)
    const maxVisible = 3;
    const visibleAssignees = task.assignedTo.slice(0, maxVisible);
    const remaining = task.assignedTo.length - maxVisible;

    return (
      <TooltipProvider>
        <div className="flex items-center -space-x-2">
          {visibleAssignees.map((email, index) => {
            const avatarInfo = getAvatarForEmail(email);
            const initials = avatarInfo.isRegistered 
              ? avatarInfo.name.split(' ').map(n => n[0]).join('')
              : email.charAt(0).toUpperCase();

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Avatar className="w-8 h-8 border-2 border-white cursor-pointer">
                    <AvatarImage src={avatarInfo.url} />
                    <AvatarFallback className={`text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-[#0C3B2E] text-white'}`}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{avatarInfo.name}</p>
                  {avatarInfo.isRegistered && <p className="text-xs text-gray-400">{email}</p>}
                  {!avatarInfo.isRegistered && <p className="text-xs text-gray-400">External user</p>}
                </TooltipContent>
              </Tooltip>
            );
          })}
          {remaining > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs cursor-pointer ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#0C3B2E] text-white'
                }`}>
                  +{remaining}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">{remaining} more assignee{remaining > 1 ? 's' : ''}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    );
  };

  const todayTasks = getTodayTasks();
  const completedToday = todayTasks.filter(t => t.completed).length;
  const totalToday = todayTasks.length;
  const progressPercent = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;
  
  // Calculate total tasks across all dates (respecting filters)
  let filteredTasks = tasks;
  
  // Apply category filter
  if (activeFilter !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.category === activeFilter);
  }
  
  // Apply completion filter
  if (completionFilter === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  } else if (completionFilter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  }
  
  const totalTasks = filteredTasks.length;
  const totalCompleted = filteredTasks.filter(t => t.completed).length;

  return (
    <div className="min-h-screen pb-24" style={{
      background: 'linear-gradient(180deg, #f8fffe 0%, #e8f5f3 50%, #f0faf8 100%)'
    }}>
      {/* Minimal Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-gray-700 hover:bg-gray-100 hover:text-gray-700 p-2 h-10 w-10 rounded-2xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-center">
            <h1 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Event Schedule</h1>
            {eventName && (
              <p className="text-xs text-gray-500 mt-0.5">{eventName}</p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-700 p-2 h-10 w-10 rounded-2xl"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem 
                onClick={() => {
                  toast.success('Collaboration invite sent!', {
                    description: 'Your collaborator will receive a link to download EventCore and access this event.'
                  });
                }}
                className="cursor-pointer hover:bg-[#E8F5F0] focus:bg-[#E8F5F0] text-gray-900 hover:text-gray-900 focus:text-gray-900"
              >
                <Users className="w-4 h-4 mr-2 text-gray-900" />
                <span>Share to Collaboration</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="px-5 mb-6">
        <Card className="border-0 rounded-[24px] overflow-hidden" style={{ 
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)'
        }}>
          <CardContent className="p-0">
            {/* Calendar Header */}
            <div className="px-5 pt-5 pb-4 bg-white">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousMonth}
                  className="text-gray-600 hover:bg-gray-100 h-10 w-10 p-0 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextMonth}
                  className="text-gray-600 hover:bg-gray-100 h-10 w-10 p-0 rounded-full"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="text-center text-xs text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dayTasks = getTasksForDate(day);
                  const isToday = new Date().getDate() === day && 
                                  new Date().getMonth() === currentDate.getMonth() &&
                                  new Date().getFullYear() === currentDate.getFullYear();
                  const hasHighPriority = dayTasks.some(t => t.priority === 'high' && !t.completed);
                  const allCompleted = dayTasks.length > 0 && dayTasks.every(t => t.completed);

                  return (
                    <button
                      key={day}
                      onClick={() => {
                        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                        setSelectedDate(clickedDate);
                      }}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center relative transition-all duration-300 ${
                        isToday 
                          ? 'bg-gradient-to-br from-[#0C3B2E] to-[#6D9773] text-white shadow-lg shadow-[#0C3B2E]/30' 
                          : dayTasks.length > 0
                          ? 'bg-[#E8F5F0] hover:bg-[#D4EDE5]'
                          : 'hover:bg-gray-50'
                      }`}
                      style={isToday ? {
                        boxShadow: '0 4px 16px rgba(12, 59, 46, 0.3), 0 0 24px rgba(12, 59, 46, 0.15)'
                      } : {}}
                    >
                      <span className={`text-sm ${isToday ? 'text-white font-semibold' : 'text-gray-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        {day}
                      </span>
                      
                      {/* Task indicator dots - priority based (max 3) */}
                      {dayTasks.length > 0 && !isToday && (
                        <div className="absolute bottom-1.5 flex gap-0.5">
                          {dayTasks
                            .sort((a, b) => {
                              const priorityOrder = { high: 0, medium: 1, low: 2 };
                              return priorityOrder[a.priority] - priorityOrder[b.priority];
                            })
                            .slice(0, 3)
                            .map((task, idx) => (
                              <div 
                                key={idx}
                                className={`w-1 h-1 rounded-full ${
                                  task.priority === 'high' 
                                    ? 'bg-[#FF4D4F]' 
                                    : task.priority === 'medium'
                                    ? 'bg-[#FFBA00]'
                                    : 'bg-[#6D9773]'
                                }`} 
                              />
                            ))
                          }
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Overview Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Task Overview</h2>
            {/* Avatar Group Preview */}
            <div className="flex -space-x-2">
              {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'].map((src, idx) => (
                <Avatar key={idx} className="w-7 h-7 border-2 border-white">
                  <AvatarImage src={src} />
                  <AvatarFallback className="bg-[#00C875] text-white text-xs">U</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          
          {/* Quick Progress */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>{totalTasks} Tasks • {totalCompleted} Completed</p>
              <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00C875] to-[#00D98E] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Completion Status Filter */}
        <div className="relative p-1.5 rounded-[20px] mb-3 backdrop-blur-xl bg-white/60 border border-white/40 shadow-lg shadow-black/5" style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(232, 245, 240, 0.8) 100%)'
        }}>
          <div className="flex gap-1.5 relative">
            {/* Sliding Background Indicator */}
            <div 
              className={`absolute top-0 bottom-0 bg-gradient-to-br from-[#0C3B2E] via-[#0C3B2E] to-[#6D9773] rounded-[16px] transition-all duration-500 ease-out shadow-xl shadow-[#0C3B2E]/25`}
              style={{
                left: completionFilter === 'all' ? '0%' : completionFilter === 'active' ? 'calc(33.333% + 4px)' : 'calc(66.666% + 8px)',
                width: 'calc(33.333% - 4px)',
                boxShadow: '0 8px 24px rgba(12, 59, 46, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
              }}
            />
            
            <button
              onClick={() => setCompletionFilter('all')}
              className={`relative flex-1 px-4 py-2.5 rounded-[16px] text-xs whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 ${
                completionFilter === 'all'
                  ? 'text-white scale-[1.02]'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-[1.01]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <TrendingUp className={`w-3.5 h-3.5 transition-transform duration-300 ${completionFilter === 'all' ? 'rotate-0' : 'rotate-12'}`} />
              <span className={completionFilter === 'all' ? 'font-semibold' : ''}>All Tasks</span>
            </button>
            
            <button
              onClick={() => setCompletionFilter('active')}
              className={`relative flex-1 px-4 py-2.5 rounded-[16px] text-xs whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 ${
                completionFilter === 'active'
                  ? 'text-white scale-[1.02]'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-[1.01]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Circle className={`w-3.5 h-3.5 transition-transform duration-300 ${completionFilter === 'active' ? 'rotate-0' : 'rotate-12'}`} />
              <span className={completionFilter === 'active' ? 'font-semibold' : ''}>Active</span>
            </button>
            
            <button
              onClick={() => setCompletionFilter('completed')}
              className={`relative flex-1 px-4 py-2.5 rounded-[16px] text-xs whitespace-nowrap transition-all duration-300 flex items-center justify-center gap-1.5 ${
                completionFilter === 'completed'
                  ? 'text-white scale-[1.02]'
                  : 'text-gray-600 hover:text-gray-900 hover:scale-[1.01]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <CheckCircle className={`w-3.5 h-3.5 transition-transform duration-300 ${completionFilter === 'completed' ? 'rotate-0' : 'rotate-12'}`} />
              <span className={completionFilter === 'completed' ? 'font-semibold' : ''}>Completed</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-[#00C875] text-white shadow-md shadow-[#00C875]/20'
                  : 'bg-[#E8FFF3] text-gray-700 hover:bg-[#D4FFE8]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {category === 'all' ? 'All Events' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Event Timeline Feed */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Timeline</h3>

        </div>

        {/* Timeline with Date Groups */}
        <div className="relative">
          {/* Timeline Line */}
          {tasks.length > 0 && (
            <div className="absolute left-[52px] top-8 bottom-0 w-0.5 bg-[#6D9773]/30" />
          )}

          <div className="space-y-6">
            {tasks.length === 0 ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <Card className="border-0 rounded-[20px]" style={{ 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
                }}>
                  <CardContent className="p-12 text-center">
                    <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                    <h3 className="text-gray-900 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>No events scheduled</h3>
                    <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>Your day is clear. Time to plan something amazing!</p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Group tasks by date
              (() => {
                // Apply filters to tasks
                let displayTasks = tasks;
                
                // Apply category filter
                if (activeFilter !== 'all') {
                  displayTasks = displayTasks.filter(task => task.category === activeFilter);
                }
                
                // Apply completion filter
                if (completionFilter === 'active') {
                  displayTasks = displayTasks.filter(task => !task.completed);
                } else if (completionFilter === 'completed') {
                  displayTasks = displayTasks.filter(task => task.completed);
                }
                
                const tasksByDate = displayTasks.reduce((acc, task) => {
                  if (!acc[task.date]) {
                    acc[task.date] = [];
                  }
                  acc[task.date].push(task);
                  return acc;
                }, {} as Record<string, Task[]>);

                return Object.entries(tasksByDate)
                  .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                  .map(([date, dateTasks], dateIndex) => {
                    const taskDate = new Date(date + 'T00:00:00');
                    const dayNum = taskDate.getDate();
                    const dayName = taskDate.toLocaleDateString('en-US', { weekday: 'long' });
                    const isToday = new Date().toDateString() === taskDate.toDateString();

                    return (
                      <div key={date} className="flex gap-4">
                        {/* Date Column */}
                        <div className="flex flex-col w-[72px] flex-shrink-0 pt-2 relative">
                          <div className="text-left mb-2 pr-4">
                            <div className={`text-3xl leading-none mb-0.5 ${isToday ? 'text-[#0C3B2E]' : 'text-gray-700'}`} 
                                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {String(dayNum).padStart(2, '0')}
                            </div>
                            <div className="text-[10px] text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                              <div>{dayName.substring(0, 3)}</div>
                              <div>{taskDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                            </div>
                          </div>
                          
                          {/* Timeline dot */}
                          <div className="absolute right-0 top-3">
                            <div className={`w-3 h-3 rounded-full border-2 border-white ${
                              isToday ? 'bg-[#0C3B2E]' : 'bg-[#6D9773]'
                            }`} style={{ 
                              boxShadow: '0 2px 8px rgba(12, 59, 46, 0.2)' 
                            }} />
                          </div>
                        </div>

                        {/* Events Column */}
                        <div className="flex-1 space-y-3 pb-2">
                          {dateTasks.sort((a, b) => a.time.localeCompare(b.time)).map((task, taskIndex) => {
                            const isActive = !task.completed && taskIndex === 0 && dateIndex === 0;
                            
                            // Calculate end time (add 2 hours for demo)
                            const [hours, minutes] = task.time.split(':');
                            const startTime = new Date();
                            startTime.setHours(parseInt(hours), parseInt(minutes));
                            const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
                            
                            const formatTime = (date: Date) => {
                              const h = date.getHours();
                              const m = date.getMinutes();
                              const period = h >= 12 ? 'pm' : 'am';
                              const hour12 = h % 12 || 12;
                              return `${hour12}:${String(m).padStart(2, '0')}${period}`;
                            };

                            return (
                              <Card 
                                key={task.id}
                                className={`border-0 rounded-2xl transition-all duration-300 hover:shadow-lg overflow-hidden ${
                                  isActive 
                                    ? 'bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] text-white' 
                                    : task.completed
                                    ? 'bg-gray-50'
                                    : 'backdrop-blur-md bg-white/60 border border-white/20'
                                }`}
                                style={{
                                  boxShadow: isActive 
                                    ? '0 4px 16px rgba(12, 59, 46, 0.25)'
                                    : '0 2px 12px rgba(0, 0, 0, 0.04)',
                                  backdropFilter: !isActive && !task.completed ? 'blur(12px)' : undefined
                                }}
                              >
                                <CardContent className="p-4">
                                  <div className="flex items-center justify-between gap-3 mb-2">
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <h4 className={`${task.completed ? 'line-through text-gray-400' : isActive ? 'text-white' : 'text-gray-900'}`} 
                                            style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px' }}>
                                          {task.title}
                                        </h4>
                                        {/* Priority Badge */}
                                        <Badge 
                                          className={`text-[10px] px-2 py-0.5 ${
                                            task.priority === 'high' 
                                              ? 'bg-[#FF4D4F]/10 text-[#FF4D4F] border-[#FF4D4F]/20' 
                                              : task.priority === 'medium'
                                              ? 'bg-[#FFBA00]/10 text-[#B46617] border-[#FFBA00]/20'
                                              : 'bg-[#6D9773]/10 text-[#0C3B2E] border-[#6D9773]/20'
                                          } ${isActive ? 'bg-white/20 text-white border-white/30' : 'border'}`}
                                          style={{ fontFamily: 'Inter, sans-serif' }}
                                        >
                                          {task.priority === 'high' ? 'High' : task.priority === 'medium' ? 'Medium' : 'Low'}
                                        </Badge>
                                      </div>
                                      <div className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`} 
                                           style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {formatTime(startTime)}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {/* Assigned Avatars */}
                                      {renderTaskAvatars(task, isActive)}

                                      {/* Three dots menu */}
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className={`h-8 w-8 p-0 rounded-full ${
                                              isActive 
                                                ? 'text-white hover:bg-white/20' 
                                                : 'text-gray-400 hover:bg-gray-100'
                                            }`}
                                          >
                                            <div className="flex flex-col gap-0.5">
                                              <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-gray-400'}`} />
                                              <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-gray-400'}`} />
                                              <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-white' : 'bg-gray-400'}`} />
                                            </div>
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toast.info('Edit functionality coming soon');
                                            }}
                                            className="flex items-center gap-2 cursor-pointer text-[#0C3B2E] hover:bg-[#6D9773]/10 hover:text-[#0C3B2E] focus:bg-[#6D9773]/10 focus:text-[#0C3B2E]"
                                          >
                                            <Edit className="w-4 h-4" />
                                            <span>Edit Task</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedTaskForShare(task);
                                              setShareDialogOpen(true);
                                            }}
                                            className="flex items-center gap-2 cursor-pointer text-[#0C3B2E] hover:bg-[#6D9773]/10 hover:text-[#0C3B2E] focus:bg-[#6D9773]/10 focus:text-[#0C3B2E]"
                                          >
                                            <Mail className="w-4 h-4" />
                                            <span>Assign Task</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              if (confirm('Are you sure you want to delete this task?')) {
                                                setTasks(tasks.filter(t => t.id !== task.id));
                                                toast.success('Task deleted');
                                              }
                                            }}
                                            className="flex items-center gap-2 cursor-pointer text-red-600 hover:bg-red-50 hover:text-red-600 focus:bg-red-50 focus:text-red-600"
                                          >
                                            <Trash2 className="w-4 h-4" />
                                            <span>Delete Task</span>
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>

                                  {/* Description Section */}
                                  {task.description && (
                                    <div className={`mt-2 pt-2 border-t ${isActive ? 'border-white/10' : 'border-[#0C3B2E]/20'}`}>
                                      <p className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-600'} ${expandedTaskId !== task.id ? 'line-clamp-1' : ''}`}
                                         style={{ fontFamily: 'Inter, sans-serif' }}>
                                        {task.description}
                                      </p>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setExpandedTaskId(expandedTaskId === task.id ? null : task.id);
                                        }}
                                        className={`flex items-center gap-1 mt-1 text-xs ${isActive ? 'text-white/80 hover:text-white' : 'text-[#0C3B2E] hover:text-[#6D9773]'} transition-colors`}
                                        style={{ fontFamily: 'Inter, sans-serif' }}
                                      >
                                        {expandedTaskId === task.id ? (
                                          <>
                                            <span>Show less</span>
                                            <ChevronUp className="w-3 h-3" />
                                          </>
                                        ) : (
                                          <>
                                            <span>Show more</span>
                                            <ChevronDown className="w-3 h-3" />
                                          </>
                                        )}
                                      </button>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    );
                  });
              })()
            )}
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <Button
        className="fixed bottom-24 right-5 h-14 w-14 rounded-full bg-gradient-to-br from-[#00C875] to-[#00D98E] hover:from-[#00B869] hover:to-[#00C87A] text-white shadow-lg shadow-[#00C875]/30"
        style={{
          boxShadow: '0 8px 24px rgba(0, 200, 117, 0.3)'
        }}
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Assign Task Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Poppins, sans-serif' }}>
              Assign Task
            </DialogTitle>
            <DialogDescription style={{ fontFamily: 'Inter, sans-serif' }}>
              Enter email addresses to assign this task and send Google Calendar invitations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedTaskForShare && (
              <div className="rounded-lg bg-[#6D9773]/10 p-3 border border-[#6D9773]/20">
                <p className="text-sm text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {selectedTaskForShare.title}
                </p>
                <p className="text-xs text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {new Date(selectedTaskForShare.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })} at {selectedTaskForShare.time}
                </p>
              </div>
            )}
            
            <div className="space-y-3">
              <Label className="text-sm text-gray-700" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email Address{shareEmails.length > 1 ? 'es' : ''}
              </Label>
              {shareEmails.map((email, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    type="email"
                    placeholder="colleague@example.com"
                    value={email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                    className="flex-1"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  {shareEmails.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEmailField(index)}
                      className="h-10 w-10 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addEmailField}
                className="w-full text-[#0C3B2E] border-[#6D9773]/30 hover:bg-[#6D9773]/10 hover:border-[#6D9773] hover:text-[#0C3B2E]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Email
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShareDialogOpen(false);
                setShareEmails(['']);
                setSelectedTaskForShare(null);
              }}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleShareToCalendar}
              className="bg-[#0C3B2E] hover:bg-[#6D9773] text-white"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
