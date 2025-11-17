import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  CheckCircle, 
  Clock, 
  Plus,
  Upload,
  Send,
  Camera,
  AlertTriangle,
  Search,
  Bell,
  ClipboardList,
  FileUp,
  Mail,
  ChevronRight,
  Sparkles,
  ChevronLeft,
  Circle,
  ChevronDown,
  ChevronUp,
  Filter,
  TrendingUp,
  Edit,
  Trash2,
  X,
  MoreVertical,
  Building2,
  UtensilsCrossed,
  Palette,
  Music,
  Phone,
  Save,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import backgroundImage from 'figma:asset/f8697e54cc9e8aeec3b48f88aa55066e2a9e0995.png';
import type { Task } from '../../data/tasks';
import { getAvatarForEmail } from '../../data/users';
import { toast } from 'sonner@2.0.3';
import { getVendor } from '../../data/vendors';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface EventData {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  status: string;
  progress: number;
  description?: string;
  totalTasks: number;
  completedTasks: number;
  budget: number;
  spent: number;
  categories?: any[];
}

interface EventManagementProps {
  user: User | null;
  eventId: string;
  eventData?: EventData;
  tasks?: Task[];
  setTasks?: (tasks: Task[]) => void;
  onBack: () => void;
  onNavigateToTodos: () => void;
  onNavigate?: (screen: string) => void;
  onRemoveVendor?: (eventId: string, vendorId: string) => void;
  onUpdateBudget?: (eventId: string, category: string, newBudget: number) => void;
  onUpdateVendorDetails?: (eventId: string, vendorId: string, comments: string, agreedPrice: string) => void;
  onTogglePriceFinalization?: (eventId: string, vendorId: string) => void;
}

export function EventManagement({ user, eventId, eventData, tasks = [], setTasks, onBack, onNavigateToTodos, onNavigate, onRemoveVendor, onUpdateBudget, onUpdateVendorDetails, onTogglePriceFinalization }: EventManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Task-related state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [completionFilter, setCompletionFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  
  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editTaskData, setEditTaskData] = useState<Partial<Task>>({});
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<Task | null>(null);
  
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareEmails, setShareEmails] = useState<string[]>(['']);
  const [selectedTaskForShare, setSelectedTaskForShare] = useState<Task | null>(null);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTaskForDelete, setSelectedTaskForDelete] = useState<Task | null>(null);
  
  // Add Task Dialog states
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [newTaskData, setNewTaskData] = useState<{
    title: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    date: string;
    time: string;
    description: string;
  }>({
    title: '',
    category: 'Venue',
    priority: 'medium',
    date: '',
    time: '',
    description: ''
  });

  // Budget increase dialog states
  const [budgetIncreaseDialogOpen, setBudgetIncreaseDialogOpen] = useState(false);
  const [selectedCategoryForBudget, setSelectedCategoryForBudget] = useState<string>('');
  const [newBudgetAmount, setNewBudgetAmount] = useState<string>('');

  // Vendor details editing states
  const [expandedVendorId, setExpandedVendorId] = useState<string | null>(null);
  const [vendorComments, setVendorComments] = useState<Record<string, string>>({});
  const [vendorAgreedPrices, setVendorAgreedPrices] = useState<Record<string, string>>({});

  // Guest list upload states
  const [guestListDialogOpen, setGuestListDialogOpen] = useState(false);
  const [uploadedGuests, setUploadedGuests] = useState<Array<{ name: string; whatsapp: string }>>([]);

  // Send invitations states
  const [invitationsDialogOpen, setInvitationsDialogOpen] = useState(false);
  const [invitationMessage, setInvitationMessage] = useState('');
  const [invitationImage, setInvitationImage] = useState<File | null>(null);
  const [invitationImagePreview, setInvitationImagePreview] = useState<string | null>(null);

  // Handle guest list file upload
  const handleGuestListUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      const guests: Array<{ name: string; whatsapp: string }> = [];

      // Skip header row and process data
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Handle both CSV and TSV (tab-separated)
        const parts = line.includes('\t') ? line.split('\t') : line.split(',');
        if (parts.length >= 2) {
          const name = parts[0].trim().replace(/^["']|["']$/g, '');
          const whatsapp = parts[1].trim().replace(/^["']|["']$/g, '');
          if (name && whatsapp) {
            guests.push({ name, whatsapp });
          }
        }
      }

      setUploadedGuests(guests);
      toast('Guest List Uploaded', {
        description: `Successfully uploaded ${guests.length} guests`,
        className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
        style: { color: '#0C3B2E' }
      });
    };

    reader.readAsText(file);
  };

  // Handle invitation image upload
  const handleInvitationImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast('Invalid File Type', {
        description: 'Please upload an image file (JPG, PNG, GIF)',
        className: 'bg-white border-orange-500 [&_[data-description]]:!text-[#B46617]',
        style: { color: '#B46617' }
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast('File Too Large', {
        description: 'Please upload an image smaller than 5MB',
        className: 'bg-white border-orange-500 [&_[data-description]]:!text-[#B46617]',
        style: { color: '#B46617' }
      });
      return;
    }

    setInvitationImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setInvitationImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast('Image Attached', {
      description: 'Image will be sent with your invitation',
      className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
      style: { color: '#0C3B2E' }
    });
  };

  // Remove invitation image
  const removeInvitationImage = () => {
    setInvitationImage(null);
    setInvitationImagePreview(null);
  };

  // Download example template
  const downloadExampleTemplate = () => {
    const csvContent = 'Name,WhatsApp Number\nJohn Doe,+94771234567\nJane Smith,+94779876543\nMichael Johnson,+94765432109';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'guest_list_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getFirstName = (user: User | null | undefined) => {
    if (!user) return 'Guest';
    return user.name.split(' ')[0];
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Use passed event data or fall back to mock data
  const event = eventData || {
    id: eventId,
    name: 'Dream Wedding Celebration',
    type: 'Wedding',
    date: '2025-12-15',
    location: 'Grand Ballroom, Hotel Paradise',
    status: 'Active',
    progress: 45,
    totalTasks: 18,
    completedTasks: 8,
    guestCount: 150,
    budget: 1000000,
    spent: 450000
  };

  const vendors = [
    {
      id: '1',
      name: 'Great Photography',
      category: 'Photography',
      description: 'Capture every special moment with professional photographers who bring your events to life',
      status: 'confirmed',
      price: 'LKR 25,000',
      contact: '+94 77 123 4567'
    },
    {
      id: '2',
      name: 'Elite Decorations',
      category: 'Decoration',
      description: 'Creative decoration services for memorable celebrations',
      status: 'pending',
      price: 'LKR 40,000',
      contact: '+94 71 234 5678'
    },
    {
      id: '3',
      name: 'Royal Catering',
      category: 'Catering',
      description: 'Delicious cuisine and professional service for your special day',
      status: 'confirmed',
      price: 'LKR 75,000',
      contact: '+94 76 345 6789'
    }
  ];

  // Budget categories based on event type - Calculate spent from finalized vendor prices
  const calculateCategorySpent = (categoryName: string): number => {
    if (!eventData?.vendors) return 0;
    
    return eventData.vendors
      .filter(v => v.category === categoryName && v.priceFinalized && v.agreedPrice)
      .reduce((total, v) => {
        const price = parseFloat(v.agreedPrice!.replace(/,/g, ''));
        return total + (isNaN(price) ? 0 : price);
      }, 0);
  };

  const budgetCategories = [
    {
      name: 'Venue',
      budget: eventData?.categoryBudgets?.['Venue']?.amount || 166667,
      spent: calculateCategorySpent('Venue'),
      color: 'from-[#0C3B2E] to-[#115239]',
      icon: <Building2 className="w-5 h-5 text-white" />
    },
    {
      name: 'Catering',
      budget: eventData?.categoryBudgets?.['Catering']?.amount || 166667,
      spent: calculateCategorySpent('Catering'),
      color: 'from-[#B46617] to-[#C67828]',
      icon: <UtensilsCrossed className="w-5 h-5 text-white" />
    },
    {
      name: 'Photography',
      budget: eventData?.categoryBudgets?.['Photography']?.amount || 166667,
      spent: calculateCategorySpent('Photography'),
      color: 'from-[#6D9773] to-[#7FAA85]',
      icon: <Camera className="w-5 h-5 text-white" />
    },
    {
      name: 'Decoration',
      budget: eventData?.categoryBudgets?.['Decoration']?.amount || 166667,
      spent: calculateCategorySpent('Decoration'),
      color: 'from-[#FFBA00] to-[#FFD54F]',
      icon: <Palette className="w-5 h-5 text-white" />
    },
    {
      name: 'Entertainment',
      budget: eventData?.categoryBudgets?.['Entertainment']?.amount || 166666,
      spent: calculateCategorySpent('Entertainment'),
      color: 'from-[#8B5CF6] to-[#A78BFA]',
      icon: <Music className="w-5 h-5 text-white" />
    },
    {
      name: 'Planning',
      budget: eventData?.categoryBudgets?.['Planning']?.amount || 166666,
      spent: calculateCategorySpent('Planning'),
      color: 'from-[#EC4899] to-[#F472B6]',
      icon: <ClipboardList className="w-5 h-5 text-white" />
    }
  ];

  // Handle category-specific vendor search
  const handleCategoryVendorSearch = (categoryName: string, remainingBudget: number) => {
    if (onNavigate) {
      // Store search parameters in localStorage for VendorBrowse to read
      const searchParams = {
        eventType: event.type,
        category: categoryName,
        maxBudget: remainingBudget
      };
      
      console.log('EventManagement: Storing vendor search params:', searchParams);
      localStorage.setItem('vendorSearchParams', JSON.stringify(searchParams));
      console.log('EventManagement: Stored params:', localStorage.getItem('vendorSearchParams'));
      
      // Navigate to vendor browse
      onNavigate('vendor');
      
      toast('Searching vendors...', {
        description: `${categoryName} • Max ${remainingBudget.toLocaleString()} LKR`,
        className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
        style: {
          color: '#0C3B2E'
        }
      });
    }
  };

  const upcomingTasks = [
    {
      id: '1',
      title: 'Confirm the Guest List',
      dueDate: '10th Oct 2025',
      priority: 'High',
      category: 'Planning',
      completed: false
    },
    {
      id: '2',
      title: 'Finalize Menu Selection',
      dueDate: '12th Oct 2025',
      priority: 'Medium',
      category: 'Catering',
      completed: false
    },
    {
      id: '3',
      title: 'Book Transportation',
      dueDate: '15th Oct 2025',
      priority: 'Low',
      category: 'Logistics',
      completed: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Task management functions
  const currentUser = {
    name: user?.name || 'Guest',
    email: user?.email || 'guest@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  };

  const eventTasks = eventId ? tasks.filter(task => task.eventId === eventId) : tasks;
  
  // Calculate progress based on completed tasks
  const totalTasksCount = eventTasks.length;
  const completedTasksCount = eventTasks.filter(task => task.completed).length;
  const calculatedProgress = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;
  
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
    if (setTasks) {
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
      
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        toast.success(task.completed ? 'Task marked as incomplete' : 'Task completed! 🎉');
      }
    }
  };

  // Edit Task handler
  const handleEditTask = () => {
    if (!selectedTaskForEdit || !setTasks) {
      toast.error('Unable to update task');
      return;
    }

    setTasks(tasks.map(task => 
      task.id === selectedTaskForEdit.id 
        ? { ...task, ...editTaskData }
        : task
    ));

    toast.success('Task updated successfully');
    setEditDialogOpen(false);
    setEditTaskData({});
    setSelectedTaskForEdit(null);
  };

  // Share/Assign Task handler with Google Calendar integration
  const handleShareToCalendar = () => {
    const validEmails = shareEmails.filter(email => email.trim() !== '');
    
    if (!selectedTaskForShare || validEmails.length === 0) {
      toast.error('Please enter at least one email address');
      return;
    }

    if (!setTasks) {
      toast.error('Unable to assign task');
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

  // Delete Task handler
  const handleDeleteTask = () => {
    if (!selectedTaskForDelete || !setTasks) {
      toast.error('Unable to delete task');
      return;
    }

    setTasks(tasks.filter(t => t.id !== selectedTaskForDelete.id));
    toast.success('Task deleted successfully');
    setDeleteDialogOpen(false);
    setSelectedTaskForDelete(null);
  };

  // Email field management
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

  // Add Task handler
  const handleAddTask = () => {
    if (!newTaskData.title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    if (!newTaskData.date || !newTaskData.time) {
      toast.error('Please select date and time');
      return;
    }

    if (!setTasks) {
      toast.error('Unable to create task');
      return;
    }

    // Generate a unique task ID
    const newTaskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newTask: Task = {
      id: newTaskId,
      title: newTaskData.title,
      description: newTaskData.description,
      date: newTaskData.date,
      time: newTaskData.time,
      category: newTaskData.category,
      priority: newTaskData.priority,
      completed: false,
      eventId: eventId,
      assignedTo: []
    };

    setTasks([...tasks, newTask]);
    toast.success('Task created successfully! 🎉');
    
    // Reset form
    setNewTaskData({
      title: '',
      category: 'Venue',
      priority: 'medium',
      date: '',
      time: '',
      description: ''
    });
    setAddTaskDialogOpen(false);
  };

  // Helper function to render avatars for a task
  const renderTaskAvatars = (task: Task, isActive: boolean) => {
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
  let filteredTasks = eventTasks;
  
  if (activeFilter !== 'all') {
    filteredTasks = filteredTasks.filter(task => task.category === activeFilter);
  }
  
  if (completionFilter === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
  } else if (completionFilter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
  }
  
  const totalTasks = filteredTasks.length;
  const totalCompleted = filteredTasks.filter(t => t.completed).length;

  if (!user) {
    return (
      <div className="p-4 text-center">
        <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl mb-2">Login Required</h2>
        <p className="text-muted-foreground">Please log in to manage your events</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-24">
      {/* Light Green Curved Top Header Section with Profile */}
      <div className="bg-cover bg-center bg-no-repeat rounded-b-[32px] pb-6 mb-6 shadow-sm relative" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="px-4 pt-4">
          {/* Back Button + Greeting and Profile */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 flex-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="text-white hover:bg-white/20 p-2 h-[45px] w-[45px] rounded-full flex items-center justify-center flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Avatar
                className="h-[45px] w-[45px] border-[1.5px] border-white/30 cursor-pointer flex-shrink-0"
                onClick={() => onNavigate && onNavigate('profile')}
              >
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" />
                <AvatarFallback
                  className="bg-[#6D9773] text-white"
                  style={{ fontSize: "17px", fontWeight: 500 }}
                >
                  {getFirstName(user)[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white" style={{ fontSize: "12px", fontWeight: 400 }}>
                  Hey {getFirstName(user)},
                </p>
                <p className="text-white" style={{ fontSize: "16.8px", fontWeight: 600 }}>
                  {getGreeting()}
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate && onNavigate('notifications')}
              className="relative h-[45px] w-[45px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            >
              <Bell className="h-6 w-6 text-[#FFBA00]" />
            </button>
          </div>

          {/* Event Title and Status */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl text-white">{event.name}</h1>
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                {event.status}
              </Badge>
            </div>
            <div className="flex items-center text-sm text-white/90 gap-4">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                {event.date}
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {/* Tasks Card */}
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0C3B2E] via-[#0F4A38] to-[#0C3B2E] p-4 min-h-[120px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#6D9773]/20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-[#6D9773]/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-5 h-5 text-[#FFBA00]" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBA00] animate-pulse" />
            </div>
            <div className="relative z-10 text-left mt-2">
              <p className="text-[9px] font-black text-[#6D9773] uppercase tracking-wider mb-0.5">Tasks Done</p>
              <p className="text-2xl font-black text-white leading-none group-hover:text-[#FFBA00] transition-colors duration-300">
                {event.completedTasks}/{event.totalTasks}
              </p>
            </div>
          </button>

          {/* Guests Card */}
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#6D9773] via-[#7FAA85] to-[#6D9773] p-4 min-h-[120px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
            <div className="relative z-10 text-left mt-2">
              <p className="text-[9px] font-black text-white/80 uppercase tracking-wider mb-0.5">Guests</p>
              <p className="text-2xl font-black text-white leading-none group-hover:scale-110 transition-transform duration-300">
                {event.guestCount}
              </p>
            </div>
          </button>

          {/* Budget Card */}
          <button className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#B46617] via-[#C67828] to-[#B46617] p-4 min-h-[120px] flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-[#FFBA00]/30">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-[#FFBA00]" />
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBA00] animate-pulse" />
            </div>
            <div className="relative z-10 text-left mt-2">
              <p className="text-[9px] font-black text-white/90 uppercase tracking-wider mb-0.5">Spent</p>
              <p className="text-2xl font-black text-white leading-none group-hover:text-[#FFBA00] transition-colors duration-300">
                LKR {(event.spent / 1000).toFixed(0)}K
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-white/60 backdrop-blur-md rounded-2xl border-2 border-white/80 shadow-lg p-1.5 mb-6">
            <TabsTrigger 
              value="overview"
              className="rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#0C3B2E] data-[state=active]:to-[#115239] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="vendors"
              className="rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#6D9773] data-[state=active]:to-[#7FAA85] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Vendors
            </TabsTrigger>
            <TabsTrigger 
              value="tasks"
              className="rounded-xl data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#B46617] data-[state=active]:to-[#C67828] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Tasks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-0">
            {/* Event Progress Card */}
            <Card className="relative overflow-hidden border-2 border-white/60 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C3B2E]/5 via-transparent to-[#6D9773]/5 pointer-events-none" />
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center justify-between">
                  <span>Event Progress</span>
                  <span className="text-sm text-[#0C3B2E]">{calculatedProgress}%</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3">
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0C3B2E] via-[#6D9773] to-[#0C3B2E] rounded-full transition-all duration-500"
                    style={{ width: `${calculatedProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {calculatedProgress >= 80 ? 'Almost there! Your event is nearly ready.' : 
                   calculatedProgress >= 50 ? 'Great progress! Keep going.' : 
                   totalTasksCount === 0 ? 'No tasks yet. Add tasks to track progress!' :
                   'Just getting started. Let\'s plan your event!'}
                </p>
              </CardContent>
            </Card>

            {/* Modern Event Management Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-gray-900">Event Management</h3>
              </div>

              {/* To Do List Action */}
              <button 
                onClick={() => setActiveTab('tasks')}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0C3B2E] via-[#115239] to-[#0C3B2E] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-[#6D9773]/30"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Floating particles */}
                <div className="absolute top-4 right-8 w-2 h-2 rounded-full bg-[#FFBA00] animate-pulse opacity-60" />
                <div className="absolute bottom-8 right-12 w-1.5 h-1.5 rounded-full bg-[#6D9773] animate-pulse delay-300 opacity-40" />
                <div className="absolute top-10 right-16 w-1 h-1 rounded-full bg-white animate-pulse delay-700 opacity-50" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFBA00] to-[#B46617] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <ClipboardList className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#FFBA00] to-[#B46617] flex items-center justify-center text-[10px] font-black text-white border-2 border-[#0C3B2E] animate-pulse">
                      {event.totalTasks - event.completedTasks}
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-black text-white mb-1 group-hover:text-[#FFBA00] transition-colors duration-300">To Do List</h4>
                    <p className="text-sm text-white/80">Manage your event tasks and milestones</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>

              {/* Guest List Upload Action */}
              <button 
                onClick={() => setGuestListDialogOpen(true)}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#6D9773] via-[#7FAA85] to-[#6D9773] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-white/30"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Floating particles */}
                <div className="absolute top-6 right-10 w-2 h-2 rounded-full bg-white animate-pulse opacity-50" />
                <div className="absolute bottom-6 right-14 w-1.5 h-1.5 rounded-full bg-[#FFBA00] animate-pulse delay-500 opacity-60" />
                <div className="absolute top-12 right-6 w-1 h-1 rounded-full bg-white animate-pulse delay-1000 opacity-40" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-white/30 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 border border-white/40">
                      <FileUp className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#115239] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-black text-white mb-1 group-hover:text-[#FFBA00] transition-colors duration-300">Guest List Upload</h4>
                    <p className="text-sm text-white/90">Upload and organize your guest list</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>

              {/* Send Invitations Action */}
              <button 
                onClick={() => {
                  if (uploadedGuests.length === 0) {
                    toast('No Guest List', {
                      description: 'Please upload a guest list first',
                      className: 'bg-white border-orange-500 [&_[data-description]]:!text-[#B46617]',
                      style: { color: '#B46617' }
                    });
                  } else {
                    // Set default invitation message
                    setInvitationMessage(`🎉 You're Invited! 🎉\n\nWe're delighted to invite you to ${event.name}!\n\n📅 Date: ${new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n📍 Location: ${event.location}\n\nWe look forward to celebrating with you!\n\nPlease RSVP at your earliest convenience.`);
                    setInvitationsDialogOpen(true);
                  }
                }}
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#B46617] via-[#C67828] to-[#B46617] p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] active:scale-95 border border-[#FFBA00]/40"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Floating particles */}
                <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-[#FFBA00] animate-pulse opacity-70" />
                <div className="absolute bottom-10 right-8 w-1.5 h-1.5 rounded-full bg-white animate-pulse delay-400 opacity-50" />
                <div className="absolute top-6 right-20 w-1 h-1 rounded-full bg-[#FFBA00] animate-pulse delay-800 opacity-60" />
                
                <div className="relative z-10 flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFBA00] to-white/40 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 border border-white/50">
                      <Mail className="w-7 h-7 text-[#0C3B2E]" strokeWidth={2.5} />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#115239] animate-ping opacity-75" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#115239]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="text-lg font-black text-white mb-1 group-hover:text-[#FFBA00] transition-colors duration-300">Send Invitations</h4>
                    <p className="text-sm text-white/90">Send beautiful invites to your guests</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </button>
            </div>

            {/* Recent Activity */}
            <Card className="border-2 border-white/60 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-[#6D9773]/10 to-[#0C3B2E]/5 rounded-xl border border-[#6D9773]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#6D9773] flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-gray-900">Photography vendor confirmed</p>
                    <p className="text-xs text-gray-600 mt-1">Great Photography accepted your booking</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 bg-gradient-to-br from-[#FFBA00]/10 to-[#B46617]/5 rounded-xl border border-[#FFBA00]/20">
                  <div className="w-10 h-10 rounded-xl bg-[#FFBA00] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-[#0C3B2E]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-gray-900">Pending: Decoration approval</p>
                    <p className="text-xs text-gray-600 mt-1">Waiting for Elite Decorations response</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-4 mt-0">
            {/* Total Budget Overview */}
            <Card className="relative overflow-hidden border-2 border-white/60 shadow-lg bg-gradient-to-br from-[#0C3B2E]/5 via-transparent to-[#6D9773]/5">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                    <h2 className="text-3xl text-[#0C3B2E]">LKR {event.budget.toLocaleString()}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Remaining</p>
                    <h3 className="text-xl text-[#6D9773]">
                      LKR {(event.budget - event.spent).toLocaleString()}
                    </h3>
                  </div>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0C3B2E] via-[#6D9773] to-[#FFBA00] rounded-full transition-all duration-500"
                    style={{ width: `${(event.spent / event.budget) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">Spent: LKR {event.spent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{((event.spent / event.budget) * 100).toFixed(0)}% used</p>
                </div>
              </CardContent>
            </Card>

            {/* Category Budgets */}
            <div>
              <h3 className="text-base font-black text-gray-900 mb-3">Budget by Category</h3>
              <div className="space-y-3">
                {budgetCategories.map((cat) => (
                  <Card key={cat.name} className="border-2 border-white/60 shadow-md hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-11 h-11 rounded-xl bg-[#0C3B2E] flex items-center justify-center shadow-sm">
                            <div className="w-5 h-5 text-white">
                              {cat.icon}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-black text-gray-900">{cat.name}</h4>
                            <p className="text-xs text-gray-500 flex items-center gap-1">
                              <span>{cat.spent.toLocaleString()} / {cat.budget.toLocaleString()} LKR</span>
                              <button 
                                className="hover:bg-gray-200 rounded p-0.5 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCategoryForBudget(cat.name);
                                  setNewBudgetAmount(cat.budget.toString());
                                  setBudgetIncreaseDialogOpen(true);
                                }}
                              >
                                <Edit className="w-3 h-3 text-gray-400 hover:text-gray-600" />
                              </button>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[#6D9773]">
                            {(cat.budget - cat.spent).toLocaleString()} LKR
                          </p>
                          <p className="text-xs text-gray-500">remaining</p>
                        </div>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div 
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${cat.color} rounded-full transition-all duration-500`}
                          style={{ width: `${(cat.spent / cat.budget) * 100}%` }}
                        />
                      </div>

                      {/* Vendors Added to this Category */}
                      {eventData?.vendors && eventData.vendors.filter(v => v.category === cat.name).length > 0 && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-xl space-y-3">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Vendors Added</p>
                          {eventData.vendors.filter(v => v.category === cat.name).map((vendorRef) => {
                            const vendorData = getVendor(vendorRef.id);
                            if (!vendorData) return null;
                            
                            const isExpanded = expandedVendorId === vendorRef.id;
                            const currentComments = vendorComments[vendorRef.id] ?? vendorRef.comments ?? '';
                            const currentAgreedPrice = vendorAgreedPrices[vendorRef.id] ?? vendorRef.agreedPrice ?? '';
                            
                            return (
                              <div key={vendorRef.id} className="bg-white p-3 rounded-lg border border-gray-200">
                                {/* Top Row: Logo, Name & Price, Actions */}
                                <div className="flex items-start gap-3">
                                  {/* Vendor Logo */}
                                  <img 
                                    src={vendorData.logo} 
                                    alt={vendorData.name}
                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                                  />
                                  
                                  {/* Vendor Name & Price */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 mb-0.5">{vendorData.name}</p>
                                        <p className="text-xs text-gray-500">{vendorData.price}</p>
                                      </div>
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            if (isExpanded) {
                                              // Save changes when collapsing
                                              if (onUpdateVendorDetails) {
                                                onUpdateVendorDetails(event.id, vendorRef.id, currentComments, currentAgreedPrice);
                                              }
                                              setExpandedVendorId(null);
                                            } else {
                                              // Initialize state when expanding
                                              setVendorComments(prev => ({ ...prev, [vendorRef.id]: vendorRef.comments || '' }));
                                              setVendorAgreedPrices(prev => ({ ...prev, [vendorRef.id]: vendorRef.agreedPrice || '' }));
                                              setExpandedVendorId(vendorRef.id);
                                            }
                                          }}
                                          className="h-7 w-7 p-0 hover:bg-[#6D9773]/10"
                                        >
                                          {isExpanded ? (
                                            <ChevronUp className="w-3.5 h-3.5 text-[#6D9773]" />
                                          ) : (
                                            <ChevronDown className="w-3.5 h-3.5 text-[#6D9773]" />
                                          )}
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            if (onRemoveVendor) {
                                              onRemoveVendor(event.id, vendorRef.id);
                                              // Clean up state
                                              setVendorComments(prev => {
                                                const { [vendorRef.id]: _, ...rest } = prev;
                                                return rest;
                                              });
                                              setVendorAgreedPrices(prev => {
                                                const { [vendorRef.id]: _, ...rest } = prev;
                                                return rest;
                                              });
                                              if (expandedVendorId === vendorRef.id) {
                                                setExpandedVendorId(null);
                                              }
                                              toast('Vendor Removed', {
                                                description: `${vendorData.name} removed from ${cat.name}`,
                                                className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                                                style: { color: '#0C3B2E' }
                                              });
                                            }
                                          }}
                                          className="h-7 w-7 p-0 hover:bg-red-50"
                                        >
                                          <X className="w-3.5 h-3.5 text-red-500" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Bottom Row: Comments (left) and Agreed Price (right) - Collapsed View */}
                                {!isExpanded && (vendorRef.agreedPrice || vendorRef.comments) && (
                                  <div className="mt-3 space-y-2">
                                    <div className="flex items-start justify-between gap-3">
                                      {/* Comments on the left */}
                                      <div className="flex-1 min-w-0">
                                        {vendorRef.comments && (
                                          <p className="text-xs text-gray-600 leading-relaxed">
                                            {vendorRef.comments}
                                          </p>
                                        )}
                                      </div>
                                      
                                      {/* Agreed Price on the right */}
                                      <div className="flex-shrink-0 text-right">
                                        {vendorRef.agreedPrice && (
                                          <div>
                                            <div className="flex items-center justify-end gap-1.5 mb-0.5">
                                              <p className="text-[10px] text-gray-500">{vendorRef.priceFinalized ? 'Actual:' : 'Agreed:'}</p>
                                              {vendorRef.priceFinalized && (
                                                <CheckCircle2 className="w-3 h-3 text-green-600 fill-green-100" />
                                              )}
                                            </div>
                                            <p className={`text-sm font-semibold ${vendorRef.priceFinalized ? 'text-green-700' : 'text-[#0C3B2E]'}`}>
                                              LKR {vendorRef.agreedPrice}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    {/* Finalize Switch - Collapsed View */}
                                    {vendorRef.agreedPrice && (
                                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                        <Label htmlFor={`finalize-collapsed-${vendorRef.id}`} className="text-xs text-gray-700 cursor-pointer">
                                          Finalized Price
                                        </Label>
                                        <Switch
                                          id={`finalize-collapsed-${vendorRef.id}`}
                                          checked={vendorRef.priceFinalized || false}
                                          onCheckedChange={() => {
                                            if (onTogglePriceFinalization) {
                                              onTogglePriceFinalization(event.id, vendorRef.id);
                                              toast(vendorRef.priceFinalized ? 'Price Unfinalized' : 'Price Finalized', {
                                                description: vendorRef.priceFinalized 
                                                  ? `${vendorData.name} moved back to agreed price` 
                                                  : `${vendorData.name} price locked as actual cost`,
                                                className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                                                style: { color: '#0C3B2E' }
                                              });
                                            }
                                          }}
                                          className="data-[state=checked]:bg-green-600"
                                        />
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Expanded Details */}
                                {isExpanded && (
                                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                                    {/* Contact Information */}
                                    <div className="bg-gray-50 p-3 rounded-lg space-y-3">
                                      <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 mb-1.5">
                                          <MapPin className="w-3 h-3 text-[#6D9773]" />
                                          <p className="text-[10px] font-semibold text-gray-700">Location</p>
                                        </div>
                                        <p className="text-xs text-gray-900">{vendorData.location || 'Location not available'}</p>
                                      </div>

                                      {/* Contact Options */}
                                      <div className="flex gap-2">
                                        {/* Phone/Call Button */}
                                        {vendorData.phone && (
                                          <a
                                            href={`tel:${vendorData.phone}`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#6D9773]/30 rounded-lg hover:bg-[#6D9773]/10 hover:border-[#6D9773] transition-all duration-200 group"
                                          >
                                            <Phone className="w-3.5 h-3.5 text-[#6D9773] group-hover:scale-110 transition-transform" />
                                            <span className="text-xs text-gray-700 font-medium">Call</span>
                                          </a>
                                        )}

                                        {/* WhatsApp Button */}
                                        {vendorData.phone && (
                                          <a
                                            href={`https://wa.me/${vendorData.phone.replace(/[\s+-]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-500/30 rounded-lg hover:bg-green-50 hover:border-green-500 transition-all duration-200 group"
                                          >
                                            <MessageSquare className="w-3.5 h-3.5 text-green-600 group-hover:scale-110 transition-transform" />
                                            <span className="text-xs text-gray-700 font-medium">WhatsApp</span>
                                          </a>
                                        )}

                                        {/* Email Button */}
                                        {vendorData.email && (
                                          <a
                                            href={`mailto:${vendorData.email}`}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#B46617]/30 rounded-lg hover:bg-[#B46617]/10 hover:border-[#B46617] transition-all duration-200 group"
                                          >
                                            <Mail className="w-3.5 h-3.5 text-[#B46617] group-hover:scale-110 transition-transform" />
                                            <span className="text-xs text-gray-700 font-medium">Email</span>
                                          </a>
                                        )}
                                      </div>
                                    </div>

                                    {/* Agreed Price Input */}
                                    <div className="space-y-1">
                                      <Label htmlFor={`agreed-price-${vendorRef.id}`} className="text-[10px] text-gray-700 flex items-center gap-1">
                                        <span>Agreed Price (LKR)</span>
                                      </Label>
                                      <Input
                                        id={`agreed-price-${vendorRef.id}`}
                                        type="text"
                                        placeholder="e.g., 25,000"
                                        value={currentAgreedPrice}
                                        onChange={(e) => setVendorAgreedPrices(prev => ({ ...prev, [vendorRef.id]: e.target.value }))}
                                        className="h-8 text-xs"
                                      />
                                    </div>

                                    {/* Finalize Price Switch */}
                                    {currentAgreedPrice && (
                                      <div className={`p-3 rounded-lg border-2 ${vendorRef.priceFinalized ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                                        <div className="flex items-center justify-between">
                                          <div className="flex-1">
                                            <Label htmlFor={`finalize-${vendorRef.id}`} className="text-xs font-semibold text-gray-900 cursor-pointer flex items-center gap-1.5">
                                              {vendorRef.priceFinalized && (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 fill-green-600" />
                                              )}
                                              Finalize Price
                                            </Label>
                                            <p className="text-[10px] text-gray-600 mt-0.5">
                                              {vendorRef.priceFinalized 
                                                ? 'This price is locked and counts as actual spend'
                                                : 'Mark this as the final agreed price for budget tracking'}
                                            </p>
                                          </div>
                                          <Switch
                                            id={`finalize-${vendorRef.id}`}
                                            checked={vendorRef.priceFinalized || false}
                                            onCheckedChange={() => {
                                              if (onTogglePriceFinalization) {
                                                onTogglePriceFinalization(event.id, vendorRef.id);
                                                toast(vendorRef.priceFinalized ? 'Price Unfinalized' : 'Price Finalized', {
                                                  description: vendorRef.priceFinalized 
                                                    ? `${vendorData.name} moved back to agreed price` 
                                                    : `${vendorData.name} price locked as actual cost`,
                                                  className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                                                  style: { color: '#0C3B2E' }
                                                });
                                              }
                                            }}
                                            className="data-[state=checked]:bg-green-600"
                                          />
                                        </div>
                                        {vendorRef.priceFinalized && (
                                          <div className="mt-2 pt-2 border-t border-green-200">
                                            <p className="text-[10px] text-green-700 flex items-center gap-1">
                                              <AlertTriangle className="w-3 h-3" />
                                              Only one vendor per category can be finalized
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Comments Input */}
                                    <div className="space-y-1">
                                      <Label htmlFor={`comments-${vendorRef.id}`} className="text-[10px] text-gray-700 flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" />
                                        <span>Notes & Comments</span>
                                      </Label>
                                      <Textarea
                                        id={`comments-${vendorRef.id}`}
                                        placeholder="Add notes about this vendor..."
                                        value={currentComments}
                                        onChange={(e) => setVendorComments(prev => ({ ...prev, [vendorRef.id]: e.target.value }))}
                                        className="h-16 text-xs resize-none"
                                      />
                                    </div>

                                    {/* Save Button */}
                                    <Button
                                      onClick={() => {
                                        if (onUpdateVendorDetails) {
                                          onUpdateVendorDetails(event.id, vendorRef.id, currentComments, currentAgreedPrice);
                                          toast('Details Saved', {
                                            description: `Updated details for ${vendorData.name}`,
                                            className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                                            style: { color: '#0C3B2E' }
                                          });
                                        }
                                        setExpandedVendorId(null);
                                      }}
                                      className="w-full h-8 bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white text-xs"
                                    >
                                      <Save className="w-3 h-3 mr-1.5" />
                                      Save Details
                                    </Button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Action Button */}
                      <Button
                        onClick={() => handleCategoryVendorSearch(cat.name, cat.budget - cat.spent)}
                        className="w-full bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 hover:shadow-lg text-white h-9 text-sm"
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Find Vendors
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6 mt-0">
            {/* Calendar Section */}
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
                    <h2 className="text-gray-900 font-black">
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
                      <div key={idx} className="text-center text-xs text-gray-400">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: firstDay }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="aspect-square" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, idx) => {
                      const day = idx + 1;
                      const dayTasks = getTasksForDate(day);
                      const isToday = new Date().getDate() === day && 
                                      new Date().getMonth() === currentDate.getMonth() &&
                                      new Date().getFullYear() === currentDate.getFullYear();
                      const hasHighPriority = dayTasks.some(t => t.priority === 'high' && !t.completed);
                      const allCompleted = dayTasks.length > 0 && dayTasks.every(t => t.completed);
                      
                      return (
                        <button
                          key={day}
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
                          <span className={`text-sm ${isToday ? 'text-white font-semibold' : 'text-gray-700'}`}>
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
                                .map((task, taskIdx) => (
                                  <div 
                                    key={taskIdx}
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

            {/* Task Overview Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-gray-900 font-black">Task Overview</h2>
                  {/* Avatar Group Preview */}
                  <div className="flex -space-x-2">
                    {eventTasks.slice(0, 3).map((task, idx) => {
                      if (!task.assignedTo || task.assignedTo.length === 0) {
                        return (
                          <Avatar key={idx} className="w-7 h-7 border-2 border-white">
                            <AvatarImage src={currentUser.avatar} />
                            <AvatarFallback className="bg-[#0C3B2E] text-white text-xs">
                              {currentUser.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        );
                      }
                      const avatarInfo = getAvatarForEmail(task.assignedTo[0]);
                      return (
                        <Avatar key={idx} className="w-7 h-7 border-2 border-white">
                          <AvatarImage src={avatarInfo.url} />
                          <AvatarFallback className="bg-[#0C3B2E] text-white text-xs">
                            {avatarInfo.isRegistered ? avatarInfo.name.split(' ').map(n => n[0]).join('') : task.assignedTo[0].charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      );
                    })}
                  </div>
                </div>
                
                {/* Quick Progress */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{totalTasks} Tasks • {totalCompleted} Completed</p>
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00C875] to-[#00D98E] rounded-full transition-all duration-500"
                        style={{ width: `${totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0}%` }}
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
                    className="absolute top-0 bottom-0 bg-gradient-to-br from-[#0C3B2E] via-[#0C3B2E] to-[#6D9773] rounded-[16px] transition-all duration-500 ease-out shadow-xl shadow-[#0C3B2E]/25"
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
                  >
                    {category === 'all' ? 'All Events' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-black">Timeline</h3>
                <Button
                  size="sm"
                  className="bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-full h-8 px-4 shadow-md shadow-[#0C3B2E]/20"
                  onClick={() => setAddTaskDialogOpen(true)}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Task
                </Button>
              </div>

              {/* Timeline List */}
              <div className="relative">
                {/* Timeline Line */}
                {filteredTasks.length > 0 && (
                  <div className="absolute left-[52px] top-8 bottom-0 w-0.5 bg-[#6D9773]/30" />
                )}

                <div className="space-y-6">
                  {filteredTasks.length === 0 ? (
                    <div className="flex items-center justify-center min-h-[200px]">
                      <Card className="border-0 rounded-[20px]" style={{ 
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
                      }}>
                        <CardContent className="p-12 text-center">
                          <CalendarIcon className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                          <h3 className="text-gray-900 mb-2 font-black">No tasks scheduled</h3>
                          <p className="text-sm text-gray-500">Your day is clear. Time to plan something amazing!</p>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    (() => {
                      // Group tasks by date
                      const tasksByDate = filteredTasks.reduce((acc, task) => {
                        if (!acc[task.date]) {
                          acc[task.date] = [];
                        }
                        acc[task.date].push(task);
                        return acc;
                      }, {} as Record<string, Task[]>);

                      // Sort dates
                      const sortedDates = Object.keys(tasksByDate).sort();

                      return sortedDates.map((dateStr) => {
                        const [year, month, day] = dateStr.split('-');
                        const taskDate = new Date(dateStr + 'T00:00:00');
                        const dayNum = taskDate.getDate();
                        const dayName = taskDate.toLocaleDateString('en-US', { weekday: 'long' });
                        const monthName = monthNames[taskDate.getMonth()].slice(0, 3);
                        const isToday = new Date().toDateString() === taskDate.toDateString();
                        const dateTasks = tasksByDate[dateStr].sort((a, b) => a.time.localeCompare(b.time));

                        return (
                          <div key={dateStr} className="flex gap-4">
                            {/* Date Column */}
                            <div className="flex flex-col w-[72px] flex-shrink-0 pt-2 relative">
                              <div className="text-left mb-2 pr-4">
                                <div className={`text-3xl leading-none mb-1 ${isToday ? 'text-[#0C3B2E]' : 'text-gray-700'} font-black`}>
                                  {String(dayNum).padStart(2, '0')}
                                </div>
                                <div className="text-[10px] text-gray-500 mb-0.5">
                                  {dayName.slice(0, 3)}
                                </div>
                                <div className="text-[10px] text-gray-400">
                                  {monthName} {taskDate.getFullYear()}
                                </div>
                              </div>
                              <div className="absolute left-[44px] top-4 w-2 h-2 rounded-full bg-[#6D9773] border-2 border-white z-10" />
                            </div>

                            {/* Tasks Column */}
                            <div className="flex-1 space-y-3">
                              {dateTasks.map((task) => (
                                <Card
                                  key={task.id}
                                  className="border-0 rounded-[16px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white"
                                  style={{ 
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                                  }}
                                >
                                  <CardContent className="p-4">
                                    {/* Header Row with Title, Badge, Avatar and Menu */}
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                          <h4 className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                                            {task.title}
                                          </h4>
                                          {task.priority && (
                                            <Badge 
                                              className={`text-xs px-2 py-0.5 ${
                                                task.priority === 'high' 
                                                  ? 'bg-red-50 text-red-600 border-0' 
                                                  : task.priority === 'medium'
                                                  ? 'bg-orange-50 text-orange-600 border-0'
                                                  : 'bg-gray-100 text-gray-600 border-0'
                                              }`}
                                              variant="secondary"
                                            >
                                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        {renderTaskAvatars(task, false)}
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                            >
                                              <div className="flex flex-col gap-0.5">
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                              </div>
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuItem
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleTaskComplete(task.id);
                                              }}
                                              className={`flex items-center gap-2 cursor-pointer ${
                                                task.completed 
                                                  ? 'text-orange-600 hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600'
                                                  : 'text-[#6D9773] hover:bg-[#6D9773]/10 hover:text-[#6D9773] focus:bg-[#6D9773]/10 focus:text-[#6D9773]'
                                              }`}
                                            >
                                              {task.completed ? (
                                                <>
                                                  <Circle className="w-4 h-4" />
                                                  <span>Mark as Incomplete</span>
                                                </>
                                              ) : (
                                                <>
                                                  <CheckCircle2 className="w-4 h-4" />
                                                  <span>Mark as Complete</span>
                                                </>
                                              )}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTaskForEdit(task);
                                                setEditTaskData({
                                                  title: task.title,
                                                  description: task.description,
                                                  priority: task.priority,
                                                  date: task.date,
                                                  time: task.time,
                                                  category: task.category
                                                });
                                                setEditDialogOpen(true);
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
                                                setSelectedTaskForDelete(task);
                                                setDeleteDialogOpen(true);
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

                                    {/* Time */}
                                    <div className="text-[13px] text-gray-500 mb-3 pb-3 border-b border-gray-200">
                                      {(() => {
                                        const [hours, minutes] = task.time.split(':').map(Number);
                                        const startHour = hours % 12 || 12;
                                        const startPeriod = hours < 12 ? 'am' : 'pm';
                                        return `${startHour}:${minutes.toString().padStart(2, '0')}${startPeriod}`;
                                      })()}
                                    </div>

                                    {/* Description Preview */}
                                    {task.description && (
                                      <div className="text-[13px] text-gray-700 mb-2">
                                        <p className={`leading-relaxed ${expandedTaskId === task.id ? '' : 'line-clamp-2'}`}>
                                          {task.description}
                                        </p>
                                      </div>
                                    )}

                                    {/* Show More Link */}
                                    {task.description && task.description.length > 60 && (
                                      <button
                                        onClick={() => setExpandedTaskId(expandedTaskId === task.id ? null : task.id)}
                                        className="text-[13px] text-[#0C3B2E] hover:text-[#6D9773] transition-colors flex items-center gap-1"
                                      >
                                        {expandedTaskId === task.id ? 'Show less' : 'Show more'}
                                        <ChevronDown className={`w-3 h-3 transition-transform ${expandedTaskId === task.id ? 'rotate-180' : ''}`} />
                                      </button>
                                    )}
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        );
                      });
                    })()
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Task Dialog - Modern & Futuristic */}
      <Dialog open={addTaskDialogOpen} onOpenChange={setAddTaskDialogOpen}>
        <DialogContent className="sm:max-w-lg border-0 shadow-2xl overflow-hidden">
          {/* Gradient Header */}

          
          {/* Animated Background Elements */}
          <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-32 h-32 bg-[#FFBA00]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-[#6D9773]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>


          
          <div className="relative z-10 space-y-4 py-4 px-1">
            {/* Task Title */}
            <div className="space-y-2">
              <Label htmlFor="task-title" className="text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0C3B2E] to-[#6D9773]" />
                Task Title
              </Label>
              <Input
                id="task-title"
                value={newTaskData.title}
                onChange={(e) => setNewTaskData({ ...newTaskData, title: e.target.value })}
                placeholder="e.g., Confirm venue booking"
                className="border-[#6D9773]/30 focus:border-[#0C3B2E] focus:ring-[#0C3B2E]/20 bg-white/80 backdrop-blur-sm"
              />
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="task-category" className="text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0C3B2E] to-[#6D9773]" />
                Category
              </Label>
              <select
                id="task-category"
                value={newTaskData.category}
                onChange={(e) => setNewTaskData({ ...newTaskData, category: e.target.value })}
                className="w-full rounded-md border border-[#6D9773]/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]/20 focus:border-[#0C3B2E] bg-white/80 backdrop-blur-sm"
              >
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="Others">Others</option>
              </select>
            </div>

            {/* Priority Level */}
            <div className="space-y-2">
              <Label className="text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0C3B2E] to-[#6D9773]" />
                Priority Level
              </Label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => setNewTaskData({ ...newTaskData, priority })}
                    className={`px-4 py-2.5 rounded-lg text-sm transition-all duration-200 border-2 ${
                      newTaskData.priority === priority
                        ? priority === 'high'
                          ? 'bg-red-50 border-red-500 text-red-700 shadow-lg shadow-red-500/20'
                          : priority === 'medium'
                          ? 'bg-orange-50 border-[#FFBA00] text-[#B46617] shadow-lg shadow-[#FFBA00]/20'
                          : 'bg-green-50 border-[#6D9773] text-[#0C3B2E] shadow-lg shadow-[#6D9773]/20'
                        : 'bg-white/50 border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-date" className="text-sm flex items-center gap-2">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#0C3B2E]" />
                  Date
                </Label>
                <Input
                  id="task-date"
                  type="date"
                  value={newTaskData.date}
                  onChange={(e) => setNewTaskData({ ...newTaskData, date: e.target.value })}
                  className="border-[#6D9773]/30 focus:border-[#0C3B2E] focus:ring-[#0C3B2E]/20 bg-white/80 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-time" className="text-sm flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#0C3B2E]" />
                  Time
                </Label>
                <Input
                  id="task-time"
                  type="time"
                  value={newTaskData.time}
                  onChange={(e) => setNewTaskData({ ...newTaskData, time: e.target.value })}
                  className="border-[#6D9773]/30 focus:border-[#0C3B2E] focus:ring-[#0C3B2E]/20 bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="task-description" className="text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0C3B2E] to-[#6D9773]" />
                Description
              </Label>
              <Textarea
                id="task-description"
                value={newTaskData.description}
                onChange={(e) => setNewTaskData({ ...newTaskData, description: e.target.value })}
                placeholder="Add any additional details about this task..."
                rows={3}
                className="border-[#6D9773]/30 focus:border-[#0C3B2E] focus:ring-[#0C3B2E]/20 bg-white/80 backdrop-blur-sm resize-none"
              />
            </div>
          </div>
          
          <DialogFooter className="relative z-10 gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setAddTaskDialogOpen(false);
                setNewTaskData({
                  title: '',
                  category: 'Venue',
                  priority: 'medium',
                  date: '',
                  time: '',
                  description: ''
                });
              }}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] hover:from-[#0C3B2E]/90 hover:to-[#6D9773]/90 text-white shadow-lg shadow-[#0C3B2E]/30 border-0"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update task details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Task Title</Label>
              <Input
                id="edit-title"
                value={editTaskData.title || ''}
                onChange={(e) => setEditTaskData({ ...editTaskData, title: e.target.value })}
                placeholder="Enter task title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                value={editTaskData.description || ''}
                onChange={(e) => setEditTaskData({ ...editTaskData, description: e.target.value })}
                placeholder="Enter task description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={editTaskData.date || ''}
                  onChange={(e) => setEditTaskData({ ...editTaskData, date: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time</Label>
                <Input
                  id="edit-time"
                  type="time"
                  value={editTaskData.time || ''}
                  onChange={(e) => setEditTaskData({ ...editTaskData, time: e.target.value })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-priority">Priority</Label>
              <select
                id="edit-priority"
                value={editTaskData.priority || 'low'}
                onChange={(e) => setEditTaskData({ ...editTaskData, priority: e.target.value as 'low' | 'medium' | 'high' })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0C3B2E]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditDialogOpen(false);
                setEditTaskData({});
                setSelectedTaskForEdit(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditTask}
              className="bg-[#0C3B2E] hover:bg-[#6D9773] text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Task Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Task</DialogTitle>
            <DialogDescription>
              Enter email addresses to assign this task and send Google Calendar invitations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {selectedTaskForShare && (
              <div className="rounded-lg bg-[#6D9773]/10 p-3 border border-[#6D9773]/20">
                <p className="text-sm text-gray-900">
                  {selectedTaskForShare.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
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
              <Label className="text-sm text-gray-700">
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
            >
              Cancel
            </Button>
            <Button
              onClick={handleShareToCalendar}
              className="bg-[#0C3B2E] hover:bg-[#6D9773] text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Task Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTaskForDelete && (
            <div className="py-4">
              <div className="rounded-lg bg-red-50 p-3 border border-red-200">
                <p className="text-sm text-gray-900">
                  {selectedTaskForDelete.title}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(selectedTaskForDelete.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })} at {selectedTaskForDelete.time}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedTaskForDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteTask}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Budget Increase Dialog */}
      <Dialog open={budgetIncreaseDialogOpen} onOpenChange={setBudgetIncreaseDialogOpen}>
        <DialogContent className="max-w-[380px] rounded-3xl p-0 overflow-hidden border-0 shadow-2xl bg-white">
          <DialogHeader className="px-5 pt-5 pb-3 border-b border-gray-200">
            <DialogTitle>Adjust Budget</DialogTitle>
            <DialogDescription className="text-xs">
              Update the budget for {selectedCategoryForBudget}
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-5 space-y-4">
            {/* Current Budget Info */}
            {(() => {
              const category = budgetCategories.find(c => c.name === selectedCategoryForBudget);
              if (!category) return null;
              
              return (
                <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Current Budget:</span>
                    <span className="font-semibold text-gray-900">LKR {category.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Spent:</span>
                    <span className="font-semibold text-red-600">LKR {category.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Remaining:</span>
                    <span className="font-semibold text-[#6D9773]">LKR {(category.budget - category.spent).toLocaleString()}</span>
                  </div>
                </div>
              );
            })()}

            {/* New Budget Input */}
            <div className="space-y-2">
              <Label htmlFor="new-budget">New Budget Amount (LKR)</Label>
              <Input
                id="new-budget"
                type="number"
                value={newBudgetAmount}
                onChange={(e) => setNewBudgetAmount(e.target.value)}
                placeholder="Enter new budget amount"
                className="text-sm"
              />
              <p className="text-[10px] text-gray-500">
                Tip: Make sure the new budget covers your planned expenses
              </p>
            </div>

            {/* Budget Change Preview */}
            {newBudgetAmount && !isNaN(parseFloat(newBudgetAmount)) && (() => {
              const category = budgetCategories.find(c => c.name === selectedCategoryForBudget);
              if (!category) return null;
              
              const currentBudget = category.budget;
              const newBudget = parseFloat(newBudgetAmount);
              const difference = newBudget - currentBudget;
              
              return (
                <div className={`p-3 rounded-xl border-2 ${difference >= 0 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className={`w-4 h-4 ${difference >= 0 ? 'text-green-600' : 'text-orange-600'}`} />
                    <span className="text-xs font-semibold text-gray-900">
                      {difference >= 0 ? 'Budget Increase' : 'Budget Decrease'}
                    </span>
                  </div>
                  <p className={`text-xs ${difference >= 0 ? 'text-green-700' : 'text-orange-700'}`}>
                    {difference >= 0 ? '+' : ''} LKR {difference.toLocaleString()}
                  </p>
                  {newBudget < category.spent && (
                    <p className="text-[10px] text-red-600 mt-2 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Warning: New budget is less than amount already spent
                    </p>
                  )}
                </div>
              );
            })()}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setBudgetIncreaseDialogOpen(false);
                  setSelectedCategoryForBudget('');
                  setNewBudgetAmount('');
                }}
                className="flex-1 rounded-xl border-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const newBudget = parseFloat(newBudgetAmount);
                  if (!isNaN(newBudget) && newBudget > 0 && onUpdateBudget) {
                    onUpdateBudget(event.id, selectedCategoryForBudget, newBudget);
                    toast('Budget Updated', {
                      description: `${selectedCategoryForBudget} budget updated to LKR ${newBudget.toLocaleString()}`,
                      className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                      style: { color: '#0C3B2E' }
                    });
                    setBudgetIncreaseDialogOpen(false);
                    setSelectedCategoryForBudget('');
                    setNewBudgetAmount('');
                  }
                }}
                disabled={!newBudgetAmount || isNaN(parseFloat(newBudgetAmount)) || parseFloat(newBudgetAmount) <= 0}
                className="flex-1 bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-xl disabled:opacity-50"
              >
                Update Budget
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Invitations Dialog */}
      <Dialog open={invitationsDialogOpen} onOpenChange={setInvitationsDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden border-0 shadow-2xl bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-br from-[#B46617]/10 to-transparent sticky top-0 bg-white z-10">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B46617] to-[#FFBA00] flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              Send Invitations
            </DialogTitle>
            <DialogDescription className="text-sm">
              Send beautiful wedding invitations to {uploadedGuests.length} guest{uploadedGuests.length !== 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 space-y-6">
            {/* Event Summary Card */}
            <div className="bg-gradient-to-br from-[#0C3B2E]/5 to-[#6D9773]/5 border-2 border-[#6D9773]/20 rounded-2xl p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFBA00]" />
                Event Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#0C3B2E]" />
                  <span className="text-gray-700">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0C3B2E]" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#0C3B2E]" />
                  <span className="text-gray-700">{uploadedGuests.length} guests on list</span>
                </div>
              </div>
            </div>

            {/* Invitation Message */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold text-gray-900">Invitation Message</Label>
                <span className="text-xs text-gray-500">{invitationMessage.length} characters</span>
              </div>
              <Textarea
                value={invitationMessage}
                onChange={(e) => setInvitationMessage(e.target.value)}
                placeholder="Write your invitation message..."
                className="min-h-[200px] text-sm border-[#6D9773]/30 focus:border-[#0C3B2E] focus:ring-[#0C3B2E]/20 resize-none"
              />
              
              {/* Image Attachment Section */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#0C3B2E]" />
                  Attach Image (Optional)
                </Label>
                
                {!invitationImagePreview ? (
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleInvitationImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-[#6D9773]/40 rounded-xl p-6 bg-gradient-to-br from-[#0C3B2E]/5 to-[#6D9773]/5 hover:border-[#0C3B2E] hover:bg-[#0C3B2E]/10 transition-all cursor-pointer">
                      <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0C3B2E] to-[#6D9773] flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Click to upload invitation card</p>
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF (max 5MB)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="border-2 border-[#6D9773] rounded-xl p-3 bg-gradient-to-br from-[#0C3B2E]/5 to-[#6D9773]/5">
                      <div className="flex items-center gap-3">
                        <img
                          src={invitationImagePreview}
                          alt="Invitation card preview"
                          className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-md"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{invitationImage?.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {invitationImage && (invitationImage.size / 1024).toFixed(1)} KB
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <CheckCircle2 className="w-3 h-3 text-[#6D9773]" />
                            <span className="text-xs text-[#6D9773]">Image attached</span>
                          </div>
                        </div>
                        <Button
                          onClick={removeInvitationImage}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 rounded-lg hover:bg-red-50 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                This message will be sent via WhatsApp to all guests
              </p>
            </div>

            {/* Preview Card */}
            <div className="space-y-2">
              <Label className="font-semibold text-gray-900 flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0C3B2E]" />
                Preview
              </Label>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#0C3B2E] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">👰</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-900">{event.name}</div>
                      <div className="text-xs text-gray-500">via EventCore</div>
                    </div>
                  </div>
                  
                  {/* Image Preview */}
                  {invitationImagePreview && (
                    <div className="mb-3">
                      <img
                        src={invitationImagePreview}
                        alt="Invitation card"
                        className="w-full rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-3">
                    {invitationMessage || 'Your invitation message will appear here...'}
                  </div>
                </div>
              </div>
            </div>

            {/* Guest List Preview */}
            <div className="space-y-2">
              <Label className="font-semibold text-gray-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0C3B2E]" />
                Recipients ({uploadedGuests.length})
              </Label>
              <div className="bg-gradient-to-br from-[#0C3B2E]/5 to-[#6D9773]/5 rounded-xl border-2 border-[#6D9773]/20 p-4">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#6D9773]/20">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0C3B2E] to-[#6D9773] flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-[#0C3B2E]">{uploadedGuests.length} Guest{uploadedGuests.length !== 1 ? 's' : ''}</div>
                    <div className="text-xs text-gray-600">Click to send individual invitations</div>
                  </div>
                </div>
                
                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                  {uploadedGuests.map((guest, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between gap-3 p-3 bg-white rounded-lg border border-[#6D9773]/20 hover:border-[#6D9773] hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0C3B2E]/10 to-[#6D9773]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-[#0C3B2E]">{guest.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{guest.name}</p>
                          <p className="text-xs text-gray-500 truncate">{guest.whatsapp}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          if (!invitationMessage.trim()) {
                            toast('Empty Message', {
                              description: 'Please write an invitation message first',
                              className: 'bg-white border-orange-500 [&_[data-description]]:!text-[#B46617]',
                              style: { color: '#B46617' }
                            });
                            return;
                          }
                          
                          const message = encodeURIComponent(invitationMessage);
                          const phone = guest.whatsapp.replace(/[\s+-]/g, '');
                          
                          if (invitationImage) {
                            toast('Note: Image Attached', {
                              description: 'Remember to manually attach the image in WhatsApp',
                              className: 'bg-white border-[#FFBA00] [&_[data-description]]:!text-[#B46617]',
                              style: { color: '#B46617' },
                              duration: 4000
                            });
                          }
                          
                          window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                        }}
                        size="sm"
                        className="bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg px-3 h-8 flex-shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                        Send
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="bg-gradient-to-br from-[#FFBA00]/10 to-[#B46617]/5 border border-[#FFBA00]/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFBA00]/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-[#B46617]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1 text-sm">Before Sending:</h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                      <span>Review your message carefully before sending</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                      <span>Each guest will receive a WhatsApp message in a new tab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                      <span>Make sure all WhatsApp numbers are correct</span>
                    </li>
                    {invitationImage && (
                      <li className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                        <span>Manually attach the image in each WhatsApp chat</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 pb-6 pt-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <Button
              variant="outline"
              onClick={() => {
                setInvitationsDialogOpen(false);
              }}
              className="rounded-xl border-2 border-[#0C3B2E] text-[#0C3B2E] hover:bg-[#0C3B2E] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                if (!invitationMessage.trim()) {
                  toast('Empty Message', {
                    description: 'Please write an invitation message',
                    className: 'bg-white border-orange-500 [&_[data-description]]:!text-[#B46617]',
                    style: { color: '#B46617' }
                  });
                  return;
                }
                
                // Show initial sending message
                toast('Sending Invitations', {
                  description: `Sending to ${uploadedGuests.length} guest${uploadedGuests.length !== 1 ? 's' : ''}${invitationImage ? ' with image attachment' : ''}`,
                  className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                  style: { color: '#0C3B2E' },
                  duration: 2000
                });
                
                // Close dialog immediately
                setInvitationsDialogOpen(false);
                
                // Simulate sending to each guest through EventCore
                let sentCount = 0;
                for (let i = 0; i < uploadedGuests.length; i++) {
                  await new Promise(resolve => setTimeout(resolve, 800)); // Delay between sends
                  sentCount++;
                  
                  // Show progress toast every 5 guests or on the last one
                  if (sentCount % 5 === 0 || sentCount === uploadedGuests.length) {
                    toast('Sending Progress', {
                      description: `${sentCount} of ${uploadedGuests.length} invitations sent`,
                      className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                      style: { color: '#0C3B2E' },
                      duration: 1500
                    });
                  }
                }
                
                // Show completion message
                toast('Invitations Sent Successfully! ✓', {
                  description: `All ${uploadedGuests.length} invitation${uploadedGuests.length !== 1 ? 's have' : ' has'} been sent through EventCore${invitationImage ? ' with image attachments' : ''}`,
                  className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                  style: { color: '#0C3B2E' },
                  duration: 5000
                });
                
                // In a production app, this would:
                // 1. Upload the invitation image to cloud storage
                // 2. Send notifications through EventCore's messaging system
                // 3. Log the sent invitations in the database
                // 4. Track delivery status for each guest
              }}
              className="bg-gradient-to-r from-[#0C3B2E] to-[#6D9773] hover:from-[#6D9773] hover:to-[#0C3B2E] text-white rounded-xl shadow-lg"
            >
              <Send className="w-4 h-4 mr-2" />
              Send to All Guests through EventCore
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Guest List Upload Dialog */}
      <Dialog open={guestListDialogOpen} onOpenChange={setGuestListDialogOpen}>
        <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden border-0 shadow-2xl bg-white">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-br from-[#6D9773]/5 to-transparent">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D9773] to-[#7FAA85] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              Guest List Upload
            </DialogTitle>
            <DialogDescription className="text-sm">
              Upload your guest list with names and WhatsApp numbers for easy invitation management
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-6 space-y-5">
            {/* Template Download */}
            <div className="text-center">
              <Button
                onClick={downloadExampleTemplate}
                className="bg-gradient-to-r from-[#FFBA00] to-[#B46617] hover:from-[#B46617] hover:to-[#FFBA00] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Upload className="w-4 h-4 mr-2" />
                Download Template
              </Button>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-br from-[#FFBA00]/10 to-[#B46617]/5 border border-[#FFBA00]/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFBA00]/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-[#B46617]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Important Notes:</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                      <span>Include country code with WhatsApp number (e.g., +94 for Sri Lanka)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                      <span>First row should contain headers: <strong>Name, WhatsApp Number</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#B46617] mt-1.5 flex-shrink-0" />
                      <span>Supports CSV and Excel (.xlsx, .xls) files</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-[#6D9773]/40 rounded-xl p-8 bg-gradient-to-br from-[#6D9773]/5 to-transparent hover:border-[#6D9773] hover:bg-[#6D9773]/10 transition-all duration-300">
              <input
                type="file"
                id="guest-list-upload"
                accept=".csv,.xlsx,.xls"
                onChange={handleGuestListUpload}
                className="hidden"
              />
              <label
                htmlFor="guest-list-upload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6D9773] to-[#7FAA85] flex items-center justify-center mb-3 shadow-lg">
                  <FileUp className="w-7 h-7 text-white" />
                </div>
                <p className="text-gray-900 mb-1">Click to upload your guest list</p>
                <p className="text-xs text-gray-500">CSV or Excel file (max 5MB)</p>
              </label>
            </div>

            {/* Success Message - Only shown after upload */}
            {uploadedGuests.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 mb-0.5">Upload Successful!</h4>
                    <p className="text-sm text-green-700">{uploadedGuests.length} guests uploaded successfully</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="px-6 pb-6 pt-4 border-t border-gray-200 bg-gray-50">
            <Button
              variant="outline"
              onClick={() => {
                setGuestListDialogOpen(false);
              }}
              className="rounded-xl border-2"
            >
              Close
            </Button>
            {uploadedGuests.length > 0 && (
              <Button
                onClick={() => {
                  toast('Guest List Saved', {
                    description: `${uploadedGuests.length} guests saved to ${event.name}`,
                    className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
                    style: { color: '#0C3B2E' }
                  });
                  setGuestListDialogOpen(false);
                }}
                className="bg-[#0C3B2E] hover:bg-[#0C3B2E]/90 text-white rounded-xl"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Guest List
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
