import { useState, useEffect } from 'react';
import { CustomerHome } from './CustomerHome';
import { BrowseEvents } from './BrowseEvents';
import { EventDetails } from './EventDetails';
import { BookingCalendar } from './BookingCalendar';
import { MyBookings } from './MyBookings';
import { VendorBrowse } from './VendorBrowse';
import { Notifications } from './Notifications';
import { Categories } from './Categories';
import { ProfileScreen } from './ProfileScreen';
import { SearchScreen } from './SearchScreen';
import { VendorDetailScreen } from './VendorDetailScreen';
import { NewEventForm } from './NewEventForm';
import { EventManagement } from './EventManagement';
import { TodoList } from './TodoList';
import { TipDetailScreen, type TipData } from './TipDetailScreen';
import { EventDetailScreen, type EventData } from './EventDetailScreen';
import { TaskCalendarScreen } from './TaskCalendarScreen';
import { VendorSwipeScreen } from './VendorSwipeScreen';
import { FavoritesScreen } from './FavoritesScreen';
import { ResponsiveLayout } from '../shared/ResponsiveLayout';
import { toast } from 'sonner@2.0.3';
import { initialTasks, type Task, generateInitialTasksForEvent } from '../../data/tasks';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface CustomerAppProps {
  user: User | null;
  onLogout: () => void;
  onLoginRequest?: () => void;
}

export type CustomerScreen = 'home' | 'vendor' | 'events' | 'notifications' | 'categories' | 'event-details' | 'booking-calendar' | 'bookings' | 'profile' | 'search' | 'vendor-detail' | 'new-event' | 'event-management' | 'todo-list' | 'tip-detail' | 'spotlight-detail' | 'user-event-detail' | 'task-calendar' | 'vendor-swipe' | 'favorites';

function getScreenTitle(screen: CustomerScreen): string {
  switch (screen) {
    case 'search': return 'Search';
    case 'vendor-detail': return 'Vendor Details';
    case 'event-details': return 'Event Details';
    case 'booking-calendar': return 'Book Service';
    case 'new-event': return 'Create Event';
    case 'event-management': return 'Event Management';
    case 'todo-list': return 'Todo List';
    case 'tip-detail': return 'Event Tips';
    case 'spotlight-detail': return 'Spotlight Event';
    case 'user-event-detail': return 'Event Details';
    case 'task-calendar': return 'Task Calendar';
    case 'vendor-swipe': return 'Vendor Match';
    case 'favorites': return 'Favorites';
    default: return '';
  }
}

interface CreatedEvent {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  progress: number;
  description: string;
  totalTasks: number;
  completedTasks: number;
  budget: number;
  spent: number;
  categories?: any[];
  budgetType?: string;
  categoryBudgets?: Record<string, { amount: number; percentage: number }>;
  vendors?: Array<{ 
    id: string; 
    category: string; 
    addedAt: string;
    comments?: string;
    agreedPrice?: string;
    priceFinalized?: boolean;
  }>;
}

export function CustomerApp({ user, onLogout, onLoginRequest }: CustomerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<CustomerScreen>('home');
  const [selectedVendorId, setSelectedVendorId] = useState<string>('');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [selectedViewEvent, setSelectedViewEvent] = useState<CreatedEvent | null>(null); // Store event to view
  const [selectedTip, setSelectedTip] = useState<TipData | null>(null);
  const [selectedSpotlightEvent, setSelectedSpotlightEvent] = useState<EventData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedPackageId, setSelectedPackageId] = useState<string | undefined>(undefined);
  const [selectedPromotionId, setSelectedPromotionId] = useState<string | undefined>(undefined);
  const [unreadNotifications] = useState(3); // Mock notification count
  // Initialize with a demo event that matches the initial tasks
  const demoEvent: CreatedEvent = {
    id: 'demo-event-1',
    name: 'Dream Wedding',
    type: 'Wedding',
    date: '2025-12-15',
    location: 'Grand Ballroom, Hotel Paradise',
    status: 'planning',
    progress: 45,
    description: 'A beautiful celebration of love with family and friends',
    totalTasks: 27,
    completedTasks: 5,
    budget: 500000,
    spent: 125000,
    categories: [
      { id: 'venue', name: 'Venue', selected: true },
      { id: 'photography', name: 'Photography', selected: true },
      { id: 'catering', name: 'Catering', selected: true },
      { id: 'decoration', name: 'Decoration', selected: true },
      { id: 'music', name: 'Entertainment', selected: true },
    ],
    budgetType: 'category',
    categoryBudgets: {
      'Venue': { amount: 100000, percentage: 20 },
      'Photography': { amount: 75000, percentage: 15 },
      'Catering': { amount: 150000, percentage: 30 },
      'Decoration': { amount: 100000, percentage: 20 },
      'Entertainment': { amount: 75000, percentage: 15 }
    },
    vendors: [
      { 
        id: '7', 
        category: 'Venue', 
        addedAt: '2025-01-15T10:30:00Z',
        comments: 'Includes sound system, lighting, and parking for 100 cars',
        agreedPrice: '280,000',
        priceFinalized: true
      },
      { 
        id: '1', 
        category: 'Photography', 
        addedAt: '2025-01-18T14:20:00Z',
        comments: 'Full day coverage with pre-wedding shoot included',
        agreedPrice: '65,000',
        priceFinalized: true
      },
      { 
        id: '4', 
        category: 'Catering', 
        addedAt: '2025-01-20T09:15:00Z',
        comments: 'Menu: Traditional Sri Lankan buffet for 150 guests',
        agreedPrice: '225,000',
        priceFinalized: false
      },
      { 
        id: '6', 
        category: 'Catering', 
        addedAt: '2025-01-21T10:00:00Z',
        comments: '3-tier wedding cake with custom design and floral decorations',
        agreedPrice: '35,000',
        priceFinalized: false
      },
      { 
        id: '3', 
        category: 'Decoration', 
        addedAt: '2025-01-22T16:45:00Z',
        priceFinalized: false
      },
      { 
        id: '5', 
        category: 'Decoration', 
        addedAt: '2025-01-23T13:30:00Z',
        comments: 'Bridal makeup and hair styling with trial session',
        agreedPrice: '22,000',
        priceFinalized: false
      },
      { 
        id: '2', 
        category: 'Entertainment', 
        addedAt: '2025-01-25T11:00:00Z',
        comments: '5-hour performance with DJ after band set',
        priceFinalized: false
      }
    ]
  };

  // Premium wedding event with 1 million budget
  const premiumWeddingEvent: CreatedEvent = {
    id: 'wedding-premium-2025',
    name: 'Dream Wedding Celebration',
    type: 'Wedding',
    date: '2025-12-15',
    location: 'Grand Ballroom, Hotel Paradise',
    status: 'active',
    progress: 45,
    description: 'An elegant and luxurious wedding celebration with premium services and exclusive venues',
    totalTasks: 18,
    completedTasks: 8,
    budget: 1000000,
    spent: 450000,
    categories: [
      { id: 'venue', name: 'Venue', selected: true },
      { id: 'catering', name: 'Catering', selected: true },
      { id: 'photography', name: 'Photography', selected: true },
      { id: 'decoration', name: 'Decoration', selected: true },
      { id: 'entertainment', name: 'Entertainment', selected: true },
      { id: 'planning', name: 'Planning', selected: true },
    ],
    budgetType: 'category',
    categoryBudgets: {
      'Venue': { amount: 166667, percentage: 16.67 },
      'Catering': { amount: 166667, percentage: 16.67 },
      'Photography': { amount: 166667, percentage: 16.67 },
      'Decoration': { amount: 166667, percentage: 16.67 },
      'Entertainment': { amount: 166666, percentage: 16.67 },
      'Planning': { amount: 166666, percentage: 16.67 }
    },
    vendors: [
      { 
        id: '7', 
        category: 'Venue', 
        addedAt: '2024-11-10T08:00:00Z',
        comments: 'VIP package with premium decorations, valet parking, and exclusive bridal suite',
        agreedPrice: '450,000',
        priceFinalized: true
      },
      { 
        id: '4', 
        category: 'Catering', 
        addedAt: '2024-11-12T10:30:00Z',
        comments: 'Premium international buffet for 200 guests with live cooking stations',
        agreedPrice: '300,000',
        priceFinalized: true
      },
      { 
        id: '6', 
        category: 'Catering', 
        addedAt: '2024-11-13T09:00:00Z',
        comments: 'Custom 5-tier wedding cake with gold leaf details and fresh flowers',
        agreedPrice: '55,000',
        priceFinalized: true
      },
      { 
        id: '1', 
        category: 'Photography', 
        addedAt: '2024-11-15T13:00:00Z',
        comments: 'Photography + Videography combo with drone shots and 4K video',
        agreedPrice: '85,000',
        priceFinalized: false
      },
      { 
        id: '3', 
        category: 'Decoration', 
        addedAt: '2024-11-18T15:30:00Z',
        comments: 'Grand stage setup with LED walls, custom floral arrangements, and ambient lighting',
        agreedPrice: '150,000',
        priceFinalized: false
      },
      { 
        id: '5', 
        category: 'Decoration', 
        addedAt: '2024-11-19T11:15:00Z',
        comments: 'Premium bridal makeup package with airbrush and hairstyling for bride and 3 bridesmaids',
        agreedPrice: '38,000',
        priceFinalized: false
      },
      { 
        id: '2', 
        category: 'Entertainment', 
        addedAt: '2024-11-20T09:45:00Z',
        agreedPrice: '75,000',
        priceFinalized: false
      },
      { 
        id: '3', 
        category: 'Planning', 
        addedAt: '2024-11-05T14:00:00Z',
        comments: 'Full wedding planning service with vendor coordination and day-of management',
        priceFinalized: false
      }
    ]
  };

  const [userEvents, setUserEvents] = useState<CreatedEvent[]>([demoEvent, premiumWeddingEvent]); // Store user's created events with demo events
  const [tasks, setTasks] = useState<Task[]>(initialTasks); // Global task state
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined); // For highlighting specific task
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | undefined>(undefined); // For category filtering in task calendar
  const [vendorSearchMaxPrice, setVendorSearchMaxPrice] = useState<number | undefined>(undefined); // For vendor price filtering
  const [favorites, setFavorites] = useState<string[]>([]); // Store favorited vendor IDs from swipe screen

  const handleProfileClick = () => {
    setCurrentScreen('profile');
  };

  const handleLoginClick = () => {
    if (onLoginRequest) {
      onLoginRequest();
    }
  };

  const handleVendorSelect = (vendorId: string, packageId?: string, promotionId?: string) => {
    setSelectedVendorId(vendorId);
    setSelectedPackageId(packageId);
    setSelectedPromotionId(promotionId);
    setCurrentScreen('vendor-detail');
  };

  const handleEventSelect = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentScreen('event-management');
  };

  const handleCreateEvent = (eventData: any) => {
    // Create a new event with proper structure
    const newEvent: CreatedEvent = {
      id: eventData.id || Date.now().toString(),
      name: eventData.eventName || 'Untitled Event',
      type: eventData.eventType || 'Event',
      date: eventData.date || new Date().toISOString().split('T')[0],
      location: eventData.location || 'To be determined',
      status: 'planning',
      progress: 0,
      description: eventData.description || '',
      totalTasks: 0, // Will be calculated from actual tasks
      completedTasks: 0,
      budget: parseFloat(eventData.totalBudget) || 0,
      spent: 0,
      categories: eventData.categories || [],
      budgetType: eventData.budgetType,
      categoryBudgets: eventData.categoryBudgets || {}
    };
    
    // Generate initial tasks for the event
    const newTasks = generateInitialTasksForEvent(
      newEvent.id,
      newEvent.date,
      eventData.categories || []
    );
    
    // Update total tasks
    newEvent.totalTasks = newTasks.length;
    
    // Add tasks to global task list
    setTasks(prev => [...prev, ...newTasks]);
    
    // Add to user events
    setUserEvents(prev => [newEvent, ...prev]);
    
    // Show success notification with modern styling
    toast.success('Event Created Successfully', {
      description: `${newEvent.name} • ${new Date(newEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} • ${newTasks.length} tasks created`,
      duration: 4000,
      className: 'text-base',
      style: {
        background: '#fff',
        border: '1px solid #6D9773',
        boxShadow: '0 4px 12px rgba(12, 59, 46, 0.15)',
      },
    });
    
    // Navigate to bookings to see the created event
    setCurrentScreen('bookings');
  };

  const handleUserEventView = (eventId: string, event: CreatedEvent) => {
    setSelectedEventId(eventId);
    setSelectedViewEvent(event);
    setCurrentScreen('user-event-detail');
  };

  const handleTipSelect = (tip: TipData) => {
    setSelectedTip(tip);
    setCurrentScreen('tip-detail');
  };

  const handleSpotlightEventSelect = (event: EventData) => {
    setSelectedSpotlightEvent(event);
    setCurrentScreen('spotlight-detail');
  };

  const handleCategorySelect = (categoryName: string) => {
    // Map category names to filter values
    const categoryMap: { [key: string]: string } = {
      'Photography': 'Photography',
      'Videography': 'Videography',
      'Venues': 'Venues',
      'Decorations': 'Decoration',
      'Catering': 'Catering',
      'Entertainment': 'Entertainment',
    };
    
    const mappedCategory = categoryMap[categoryName] || 'all';
    setSelectedCategory(mappedCategory);
    setCurrentScreen('vendor');
  };

  const handleVendorSearch = (category: string, maxPrice: number) => {
    // Map category names to filter values
    const categoryMap: { [key: string]: string } = {
      'Photography': 'Photography',
      'Videography': 'Videography',
      'Venue': 'Venue',
      'Venues': 'Venue',
      'Decoration': 'Decoration',
      'Decorations': 'Decoration',
      'Catering': 'Catering',
      'Entertainment': 'Entertainment',
      'Music & DJ': 'Entertainment',
      'Flowers': 'Decoration',
    };
    
    const mappedCategory = categoryMap[category] || category;
    setSelectedCategory(mappedCategory);
    setVendorSearchMaxPrice(maxPrice);
    setCurrentScreen('vendor');
    
    toast('Searching Vendors', {
      description: `Finding ${category} vendors within LKR ${maxPrice.toLocaleString('en-US')} budget`,
      duration: 3000,
      className: 'bg-white border-[#6D9773] [&_[data-description]]:!text-[#3D6258]',
      style: {
        color: '#0C3B2E'
      }
    });
  };

  // Handler to add vendor to event
  const handleAddVendorToEvent = (eventId: string, vendorId: string, category: string) => {
    setUserEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId) {
          // Initialize vendors array if it doesn't exist
          const updatedEvent = {
            ...event,
            vendors: event.vendors || []
          };
          
          // Add vendor to the event with category info
          updatedEvent.vendors.push({
            id: vendorId,
            category: category,
            addedAt: new Date().toISOString()
          });
          
          return updatedEvent;
        }
        return event;
      })
    );
  };

  // Handler to remove vendor from event
  const handleRemoveVendor = (eventId: string, vendorId: string) => {
    setUserEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId && event.vendors) {
          return {
            ...event,
            vendors: event.vendors.filter(v => v.id !== vendorId)
          };
        }
        return event;
      })
    );
  };

  // Handler to update category budget
  const handleUpdateBudget = (eventId: string, category: string, newBudget: number) => {
    setUserEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId && event.categoryBudgets) {
          // Calculate the difference for the total budget
          const oldBudget = event.categoryBudgets[category]?.amount || 0;
          const budgetDifference = newBudget - oldBudget;
          
          return {
            ...event,
            budget: event.budget + budgetDifference,
            categoryBudgets: {
              ...event.categoryBudgets,
              [category]: {
                amount: newBudget,
                percentage: event.budget > 0 ? (newBudget / (event.budget + budgetDifference)) * 100 : 0
              }
            }
          };
        }
        return event;
      })
    );
  };

  // Handler to update vendor details (comments and agreed price)
  const handleUpdateVendorDetails = (eventId: string, vendorId: string, comments: string, agreedPrice: string) => {
    setUserEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId && event.vendors) {
          return {
            ...event,
            vendors: event.vendors.map(v => 
              v.id === vendorId 
                ? { ...v, comments, agreedPrice }
                : v
            )
          };
        }
        return event;
      })
    );
  };

  // Handler to toggle vendor price finalization (only one per category)
  const handleTogglePriceFinalization = (eventId: string, vendorId: string) => {
    setUserEvents(prevEvents =>
      prevEvents.map(event => {
        if (event.id === eventId && event.vendors) {
          // Find the vendor being toggled
          const targetVendor = event.vendors.find(v => v.id === vendorId);
          if (!targetVendor) return event;
          
          const targetCategory = targetVendor.category;
          const isCurrentlyFinalized = targetVendor.priceFinalized;
          
          return {
            ...event,
            vendors: event.vendors.map(v => {
              // If this is the vendor being clicked
              if (v.id === vendorId) {
                return { ...v, priceFinalized: !isCurrentlyFinalized };
              }
              // If this is another vendor in the same category and we're finalizing the clicked vendor
              if (v.category === targetCategory && !isCurrentlyFinalized) {
                return { ...v, priceFinalized: false };
              }
              // Otherwise, keep as is
              return v;
            })
          };
        }
        return event;
      })
    );
  };

  // Update event task counts when tasks change
  useEffect(() => {
    setUserEvents(prevEvents => 
      prevEvents.map(event => {
        const eventTasks = tasks.filter(task => task.eventId === event.id);
        const completedTasks = eventTasks.filter(task => task.completed).length;
        const totalTasks = eventTasks.length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        return {
          ...event,
          totalTasks,
          completedTasks,
          progress
        };
      })
    );
  }, [tasks]);

  // Scroll to top whenever screen changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <CustomerHome user={user} onNavigate={setCurrentScreen} onTipSelect={handleTipSelect} onEventSelect={handleSpotlightEventSelect} onCategorySelect={handleCategorySelect} onPackageSelect={handleVendorSelect} onVendorSelect={handleVendorSelect} />;
      case 'vendor':
        return <VendorBrowse 
          user={user} 
          onVendorSelect={handleVendorSelect}
          onNavigate={setCurrentScreen}
          initialCategory={selectedCategory}
          initialMaxPrice={vendorSearchMaxPrice}
        />;
      case 'search':
        return <SearchScreen 
          user={user} 
          onVendorSelect={handleVendorSelect}
          onNavigate={setCurrentScreen}
        />;
      case 'vendor-detail':
        return <VendorDetailScreen 
          user={user}
          vendorId={selectedVendorId}
          initialPackageId={selectedPackageId}
          initialPromotionId={selectedPromotionId}
          userEvents={userEvents}
          onAddVendorToEvent={handleAddVendorToEvent}
          onBack={() => {
            setSelectedPackageId(undefined);
            setSelectedPromotionId(undefined);
            setCurrentScreen('vendor');
          }}
        />;
      case 'events':
        return <BrowseEvents onEventSelect={(event) => {
          setSelectedEvent(event);
          setCurrentScreen('event-details');
        }} />;
      case 'notifications':
        return <Notifications user={user} onNavigate={setCurrentScreen} />;
      case 'categories':
        return <Categories 
          user={user} 
          onCategorySelect={(category) => {
            // Navigate to filtered vendors/events by category
            setCurrentScreen('vendor');
          }}
          onNavigate={setCurrentScreen}
        />;
      case 'event-details':
        return <EventDetails 
          event={selectedEvent} 
          onBook={() => {
            if (!user) {
              handleLoginClick();
              return;
            }
            setCurrentScreen('booking-calendar');
          }}
          onBack={() => setCurrentScreen('events')}
        />;
      case 'booking-calendar':
        return <BookingCalendar 
          event={selectedEvent}
          onConfirm={() => setCurrentScreen('bookings')}
          onBack={() => setCurrentScreen('event-details')}
        />;
      case 'bookings':
        return <MyBookings 
          user={user}
          onNewEvent={() => setCurrentScreen('new-event')}
          onManageEvent={handleEventSelect}
          onViewEvent={handleUserEventView}
          onNavigate={setCurrentScreen}
          userCreatedEvents={userEvents}
        />;
      case 'new-event':
        return <NewEventForm
          user={user}
          onBack={() => setCurrentScreen('bookings')}
          onCreateEvent={handleCreateEvent}
        />;
      case 'event-management':
        const selectedManageEvent = userEvents.find(e => e.id === selectedEventId);
        if (!selectedManageEvent) {
          // If no event found, go back to bookings
          setCurrentScreen('bookings');
          return null;
        }
        return <EventManagement
          user={user}
          eventId={selectedEventId}
          eventData={selectedManageEvent}
          tasks={tasks}
          setTasks={setTasks}
          onBack={() => setCurrentScreen('bookings')}
          onNavigateToTodos={() => setCurrentScreen('todo-list')}
          onNavigate={setCurrentScreen}
          onRemoveVendor={handleRemoveVendor}
          onUpdateBudget={handleUpdateBudget}
          onUpdateVendorDetails={handleUpdateVendorDetails}
          onTogglePriceFinalization={handleTogglePriceFinalization}
        />;
      case 'todo-list':
        return <TodoList
          user={user}
          eventId={selectedEventId}
          onBack={() => setCurrentScreen('event-management')}
        />;
      case 'tip-detail':
        if (!selectedTip) return <CustomerHome user={user} onNavigate={setCurrentScreen} onTipSelect={handleTipSelect} onEventSelect={handleSpotlightEventSelect} />;
        return <TipDetailScreen
          tip={selectedTip}
          onBack={() => setCurrentScreen('home')}
          onNavigate={setCurrentScreen}
        />;
      case 'spotlight-detail':
        if (!selectedSpotlightEvent) return <CustomerHome user={user} onNavigate={setCurrentScreen} onTipSelect={handleTipSelect} onEventSelect={handleSpotlightEventSelect} />;
        return <EventDetailScreen
          event={selectedSpotlightEvent}
          onBack={() => setCurrentScreen('home')}
          onNavigate={setCurrentScreen}
        />;
      case 'user-event-detail':
        if (!selectedViewEvent) return <CustomerHome user={user} onNavigate={setCurrentScreen} onTipSelect={handleTipSelect} onEventSelect={handleSpotlightEventSelect} />;
        return <EventDetailScreen
          createdEvent={selectedViewEvent}
          categoryBudgets={selectedViewEvent.categoryBudgets || {}}
          eventVendors={selectedViewEvent.vendors || []}
          tasks={tasks}
          setTasks={setTasks}
          onTaskClick={(taskId) => {
            setSelectedTaskId(taskId);
            setCurrentScreen('task-calendar');
          }}
          onCategoryClick={(category) => {
            setSelectedCategoryFilter(category);
            setCurrentScreen('task-calendar');
          }}
          onVendorSearch={handleVendorSearch}
          onBack={() => setCurrentScreen('bookings')}
          onNavigate={setCurrentScreen}
        />;
      case 'task-calendar':
        if (!selectedViewEvent) return <CustomerHome user={user} onNavigate={setCurrentScreen} onTipSelect={handleTipSelect} onEventSelect={handleSpotlightEventSelect} />;
        return <TaskCalendarScreen
          eventId={selectedViewEvent.id}
          eventName={selectedViewEvent.name}
          tasks={tasks}
          setTasks={setTasks}
          selectedTaskId={selectedTaskId}
          initialCategoryFilter={selectedCategoryFilter}
          onBack={() => {
            setSelectedTaskId(undefined);
            setSelectedCategoryFilter(undefined);
            setCurrentScreen('user-event-detail');
          }}
          onNavigate={setCurrentScreen}
        />;
      case 'vendor-swipe':
        return <VendorSwipeScreen
          favorites={favorites}
          setFavorites={setFavorites}
          onNavigate={(screen: string, vendorId?: string) => {
            if (vendorId) {
              setSelectedVendorId(vendorId);
            }
            setCurrentScreen(screen as CustomerScreen);
          }}
        />;
      case 'profile':
        return <ProfileScreen 
          user={user}
          onLogout={onLogout}
          onLoginRequest={handleLoginClick}
          onBack={() => setCurrentScreen('home')}
          onNavigate={setCurrentScreen}
        />;
      case 'favorites':
        return <FavoritesScreen 
          favorites={favorites}
          onRemoveFavorite={(vendorId) => {
            setFavorites(prev => prev.filter(id => id !== vendorId));
            toast.info('Removed from favorites');
          }}
          onNavigate={(screen: string, vendorId?: string) => {
            if (vendorId) {
              setSelectedVendorId(vendorId);
            }
            setCurrentScreen(screen as CustomerScreen);
          }}
        />;
      default:
        return <CustomerHome 
          user={user} 
          onNavigate={setCurrentScreen}
        />;
    }
  };

  // Disable TopBar - using light green profile section on each page instead
  const showTopBar = false;

  return (
    <ResponsiveLayout
      user={user}
      currentScreen={currentScreen}
      onNavigate={setCurrentScreen}
      onLogout={onLogout}
      onLoginRequest={onLoginRequest}
      showTopBar={showTopBar}
      customTitle={getScreenTitle(currentScreen)}
      notificationCount={user ? unreadNotifications : 0}
    >
      {renderScreen()}
    </ResponsiveLayout>
  );
}