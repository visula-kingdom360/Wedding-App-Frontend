export interface Task {
  id: string;
  eventId: string; // Associated event ID
  title: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  completed: boolean;
  assignedTo?: string[]; // Email addresses
  description?: string;
}

// Initial mock tasks (empty by default - tasks created when events are created)
export const initialTasks: Task[] = [
  {
    id: '1',
    eventId: 'demo-event-1',
    title: 'Book wedding venue',
    date: '2025-11-08',
    time: '10:00',
    priority: 'high',
    category: 'Venue',
    completed: true,
    assignedTo: ['sarah.chen@example.com'],
    description: 'Visit and finalize the venue booking. Need to confirm capacity for 150 guests and review the catering options.'
  },
  {
    id: '2',
    eventId: 'demo-event-1',
    title: 'Meet with photographer',
    date: '2025-11-10',
    time: '14:00',
    priority: 'high',
    category: 'Photography',
    completed: false,
    assignedTo: ['sarah.chen@example.com', 'michael.rodriguez@example.com'],
    description: 'Review portfolio and discuss coverage timeline. Need to finalize the shot list and confirm availability.'
  },
  {
    id: '3',
    eventId: 'demo-event-1',
    title: 'Catering menu tasting',
    date: '2025-11-10',
    time: '17:30',
    priority: 'medium',
    category: 'Catering',
    completed: false,
    assignedTo: ['sarah.chen@example.com'],
    description: 'Sample menu options and select final dishes. Discuss dietary restrictions and service style.'
  },
  {
    id: '4',
    eventId: 'demo-event-1',
    title: 'Order wedding invitations',
    date: '2025-11-12',
    time: '11:00',
    priority: 'high',
    category: 'Planning',
    completed: false,
    description: 'Finalize design and place order for 200 invitations. Remember to proofread all details before printing.'
  },
  {
    id: '5',
    eventId: 'demo-event-1',
    title: 'Finalize flower arrangements',
    date: '2025-11-15',
    time: '15:00',
    priority: 'medium',
    category: 'Decoration',
    completed: false,
    assignedTo: ['emily.watson@example.com'],
    description: 'Select bouquets, centerpieces, and ceremony flowers. Confirm delivery time and setup requirements.'
  },
  {
    id: '6',
    eventId: 'demo-event-1',
    title: 'Book DJ for reception',
    date: '2025-11-15',
    time: '18:00',
    priority: 'medium',
    category: 'Entertainment',
    completed: true,
    assignedTo: ['michael.rodriguez@example.com'],
    description: 'Finalize music selection and confirm equipment needs. Review timeline for key moments.'
  },
  {
    id: '7',
    eventId: 'demo-event-1',
    title: 'Schedule hair and makeup trial',
    date: '2025-11-18',
    time: '13:00',
    priority: 'low',
    category: 'Planning',
    completed: false,
    assignedTo: ['sarah.chen@example.com'],
    description: 'Try different styles and finalize the look for the wedding day. Bring inspiration photos.'
  },
  {
    id: '8',
    eventId: 'demo-event-1',
    title: 'Review decoration mockups',
    date: '2025-11-20',
    time: '16:00',
    priority: 'medium',
    category: 'Decoration',
    completed: false,
    description: 'Approve final decoration plans including color scheme, table settings, and ceremony backdrop.'
  },
  {
    id: '9',
    eventId: 'demo-event-1',
    title: 'Confirm final guest count',
    date: '2025-11-22',
    time: '10:00',
    priority: 'high',
    category: 'Catering',
    completed: false,
    assignedTo: ['sarah.chen@example.com', 'emily.watson@example.com'],
    description: 'Collect all RSVPs and provide final headcount to caterer and venue. Account for any last-minute changes.'
  },
  {
    id: '10',
    eventId: 'demo-event-1',
    title: 'Final venue walkthrough',
    date: '2025-11-25',
    time: '14:00',
    priority: 'high',
    category: 'Venue',
    completed: false,
    assignedTo: ['John Williams'],
    description: 'Walk through the venue with coordinator to finalize layout, timing, and any special requirements.'
  },
  {
    id: '11',
    eventId: 'demo-event-1',
    title: 'Confirm photography package',
    date: '2025-11-12',
    time: '09:00',
    priority: 'high',
    category: 'Photography',
    completed: true,
    assignedTo: ['sarah.chen@example.com'],
    description: 'Review and sign photography contract. Confirm coverage hours and additional services needed.'
  },
  {
    id: '12',
    eventId: 'demo-event-1',
    title: 'Order cake and desserts',
    date: '2025-11-14',
    time: '11:30',
    priority: 'medium',
    category: 'Catering',
    completed: false,
    assignedTo: ['emily.watson@example.com'],
    description: 'Select cake design and order desserts for 150 guests. Discuss flavor preferences and dietary restrictions.'
  },
  {
    id: '13',
    eventId: 'demo-event-1',
    title: 'Book transportation',
    date: '2025-11-16',
    time: '10:30',
    priority: 'low',
    category: 'Planning',
    completed: false,
    assignedTo: ['michael.rodriguez@example.com'],
    description: 'Arrange transportation for wedding party and guests. Book luxury car for couple and shuttle for guests.'
  },
  {
    id: '14',
    eventId: 'demo-event-1',
    title: 'Lighting setup consultation',
    date: '2025-11-17',
    time: '16:30',
    priority: 'medium',
    category: 'Decoration',
    completed: false,
    assignedTo: ['emily.watson@example.com'],
    description: 'Meet with lighting designer to plan ambient lighting, uplighting, and special effects for the venue.'
  },
  {
    id: '15',
    eventId: 'demo-event-1',
    title: 'Finalize seating chart',
    date: '2025-11-23',
    time: '12:00',
    priority: 'high',
    category: 'Planning',
    completed: false,
    assignedTo: ['sarah.chen@example.com', 'emily.watson@example.com'],
    description: 'Create final seating arrangements based on guest RSVPs. Consider relationships and special requirements.'
  },
  {
    id: '16',
    eventId: 'demo-event-1',
    title: 'Sound system check',
    date: '2025-11-24',
    time: '15:30',
    priority: 'medium',
    category: 'Entertainment',
    completed: false,
    assignedTo: ['michael.rodriguez@example.com'],
    description: 'Test sound system and microphones for ceremony and reception. Ensure backup equipment is available.'
  },
  {
    id: '17',
    eventId: 'demo-event-1',
    title: 'Prepare welcome bags',
    date: '2025-11-26',
    time: '10:00',
    priority: 'low',
    category: 'Planning',
    completed: false,
    assignedTo: ['emily.watson@example.com'],
    description: 'Assemble welcome bags for out-of-town guests with local maps, snacks, and itinerary.'
  },
  {
    id: '18',
    eventId: 'demo-event-1',
    title: 'Book ceremony musicians',
    date: '2025-11-13',
    time: '11:00',
    priority: 'medium',
    category: 'Entertainment',
    completed: true,
    assignedTo: ['michael.rodriguez@example.com'],
    description: 'Hire string quartet for ceremony music. Confirm song selections for processional and recessional.'
  },
  {
    id: '19',
    eventId: 'demo-event-1',
    title: 'Order table centerpieces',
    date: '2025-11-14',
    time: '14:30',
    priority: 'medium',
    category: 'Decoration',
    completed: true,
    assignedTo: ['emily.watson@example.com'],
    description: 'Place order for 20 centerpieces matching the wedding color scheme. Confirm delivery date.'
  },
  {
    id: '20',
    eventId: 'demo-event-1',
    title: 'Finalize bar menu',
    date: '2025-11-16',
    time: '13:30',
    priority: 'medium',
    category: 'Catering',
    completed: false,
    assignedTo: ['sarah.chen@example.com'],
    description: 'Select signature cocktails and finalize bar service details with caterer.'
  },
  {
    id: '21',
    eventId: 'demo-event-1',
    title: 'Venue setup rehearsal',
    date: '2025-11-19',
    time: '15:00',
    priority: 'high',
    category: 'Venue',
    completed: false,
    assignedTo: ['sarah.chen@example.com', 'emily.watson@example.com'],
    description: 'Walk through ceremony and reception setup with venue coordinator. Confirm all layout details.'
  },
  {
    id: '22',
    eventId: 'demo-event-1',
    title: 'Order ceremony arch',
    date: '2025-11-11',
    time: '10:30',
    priority: 'low',
    category: 'Decoration',
    completed: true,
    assignedTo: ['emily.watson@example.com'],
    description: 'Order and customize wooden arch for ceremony backdrop. Arrange for setup and decoration.'
  },
  {
    id: '23',
    eventId: 'demo-event-1',
    title: 'Schedule videographer meeting',
    date: '2025-11-21',
    time: '11:30',
    priority: 'medium',
    category: 'Photography',
    completed: false,
    assignedTo: ['michael.rodriguez@example.com'],
    description: 'Meet with videographer to discuss coverage plans and key moments to capture.'
  },
  {
    id: '24',
    eventId: 'demo-event-1',
    title: 'Arrange rehearsal dinner',
    date: '2025-11-17',
    time: '18:00',
    priority: 'high',
    category: 'Planning',
    completed: false,
    assignedTo: ['sarah.chen@example.com'],
    description: 'Book restaurant for rehearsal dinner. Confirm guest count and menu selections.'
  },
  {
    id: '25',
    eventId: 'demo-event-1',
    title: 'Order uplighting',
    date: '2025-11-19',
    time: '12:00',
    priority: 'low',
    category: 'Decoration',
    completed: false,
    assignedTo: ['emily.watson@example.com'],
    description: 'Rent uplighting equipment for reception venue. Coordinate color scheme with decorator.'
  },
  {
    id: '26',
    eventId: 'demo-event-1',
    title: 'Test ceremony audio',
    date: '2025-11-24',
    time: '11:00',
    priority: 'high',
    category: 'Entertainment',
    completed: false,
    assignedTo: ['michael.rodriguez@example.com'],
    description: 'Test microphones and speakers for ceremony. Ensure backup equipment is available.'
  },
  {
    id: '27',
    eventId: 'demo-event-1',
    title: 'Confirm vendor arrival times',
    date: '2025-11-26',
    time: '14:30',
    priority: 'high',
    category: 'Planning',
    completed: false,
    assignedTo: ['sarah.chen@example.com', 'emily.watson@example.com'],
    description: 'Contact all vendors to confirm arrival times and parking instructions for wedding day.'
  }
];

// Helper function to generate initial tasks for a new event
export function generateInitialTasksForEvent(
  eventId: string, 
  eventDate: string,
  categories: Array<{ id: string; name: string; selected: boolean }>
): Task[] {
  const tasks: Task[] = [];
  let taskId = Date.now();

  // Parse event date
  const eventDateObj = new Date(eventDate);
  
  // Helper to format date for tasks (YYYY-MM-DD)
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Generate tasks based on selected categories
  categories.filter(c => c.selected).forEach((category) => {
    const categoryName = category.name;
    
    // Create 2-3 tasks per category
    switch (category.id) {
      case 'venue':
        tasks.push(
          {
            id: String(taskId++),
            eventId,
            title: 'Research and shortlist venues',
            date: formatDate(new Date(eventDateObj.getTime() - 90 * 24 * 60 * 60 * 1000)), // 3 months before
            time: '10:00',
            priority: 'high',
            category: 'Venue',
            completed: false,
            description: 'Research potential venues, check availability, and create a shortlist of top 3 options.'
          },
          {
            id: String(taskId++),
            eventId,
            title: 'Visit and book venue',
            date: formatDate(new Date(eventDateObj.getTime() - 60 * 24 * 60 * 60 * 1000)), // 2 months before
            time: '14:00',
            priority: 'high',
            category: 'Venue',
            completed: false,
            description: 'Visit shortlisted venues, finalize selection, and sign the contract.'
          }
        );
        break;
      case 'photography':
        tasks.push(
          {
            id: String(taskId++),
            eventId,
            title: 'Find and hire photographer',
            date: formatDate(new Date(eventDateObj.getTime() - 75 * 24 * 60 * 60 * 1000)),
            time: '11:00',
            priority: 'high',
            category: 'Photography',
            completed: false,
            description: 'Review photographer portfolios, check availability, and book services.'
          },
          {
            id: String(taskId++),
            eventId,
            title: 'Plan photo session details',
            date: formatDate(new Date(eventDateObj.getTime() - 30 * 24 * 60 * 60 * 1000)),
            time: '15:00',
            priority: 'medium',
            category: 'Photography',
            completed: false,
            description: 'Discuss shot list, timeline, and special requests with photographer.'
          }
        );
        break;
      case 'catering':
        tasks.push(
          {
            id: String(taskId++),
            eventId,
            title: 'Select catering service',
            date: formatDate(new Date(eventDateObj.getTime() - 60 * 24 * 60 * 60 * 1000)),
            time: '13:00',
            priority: 'high',
            category: 'Catering',
            completed: false,
            description: 'Research caterers, schedule tastings, and select menu options.'
          },
          {
            id: String(taskId++),
            eventId,
            title: 'Finalize menu and guest count',
            date: formatDate(new Date(eventDateObj.getTime() - 14 * 24 * 60 * 60 * 1000)),
            time: '10:00',
            priority: 'high',
            category: 'Catering',
            completed: false,
            description: 'Confirm final guest count and finalize menu selections.'
          }
        );
        break;
      case 'decoration':
        tasks.push(
          {
            id: String(taskId++),
            eventId,
            title: 'Meet with decorator',
            date: formatDate(new Date(eventDateObj.getTime() - 45 * 24 * 60 * 60 * 1000)),
            time: '14:00',
            priority: 'medium',
            category: 'Decoration',
            completed: false,
            description: 'Discuss theme, color scheme, and decoration ideas.'
          },
          {
            id: String(taskId++),
            eventId,
            title: 'Approve decoration plan',
            date: formatDate(new Date(eventDateObj.getTime() - 21 * 24 * 60 * 60 * 1000)),
            time: '11:00',
            priority: 'medium',
            category: 'Decoration',
            completed: false,
            description: 'Review and approve final decoration mockups and arrangements.'
          }
        );
        break;
      case 'music':
        tasks.push(
          {
            id: String(taskId++),
            eventId,
            title: 'Book DJ or band',
            date: formatDate(new Date(eventDateObj.getTime() - 60 * 24 * 60 * 60 * 1000)),
            time: '16:00',
            priority: 'medium',
            category: 'Entertainment',
            completed: false,
            description: 'Research and book entertainment for the event.'
          },
          {
            id: String(taskId++),
            eventId,
            title: 'Create music playlist',
            date: formatDate(new Date(eventDateObj.getTime() - 30 * 24 * 60 * 60 * 1000)),
            time: '19:00',
            priority: 'low',
            category: 'Entertainment',
            completed: false,
            description: 'Prepare playlist of must-play and do-not-play songs.'
          }
        );
        break;
      case 'flowers':
        tasks.push(
          {
            id: String(taskId++),
            eventId,
            title: 'Order floral arrangements',
            date: formatDate(new Date(eventDateObj.getTime() - 30 * 24 * 60 * 60 * 1000)),
            time: '10:00',
            priority: 'medium',
            category: 'Decoration',
            completed: false,
            description: 'Select and order bouquets, centerpieces, and other floral arrangements.'
          }
        );
        break;
    }
  });

  // Add common planning tasks
  tasks.push(
    {
      id: String(taskId++),
      eventId,
      title: 'Send invitations',
      date: formatDate(new Date(eventDateObj.getTime() - 45 * 24 * 60 * 60 * 1000)),
      time: '09:00',
      priority: 'high',
      category: 'Planning',
      completed: false,
      description: 'Finalize guest list and send out invitations.'
    },
    {
      id: String(taskId++),
      eventId,
      title: 'Track RSVPs',
      date: formatDate(new Date(eventDateObj.getTime() - 21 * 24 * 60 * 60 * 1000)),
      time: '17:00',
      priority: 'medium',
      category: 'Planning',
      completed: false,
      description: 'Follow up on RSVPs and update guest count.'
    }
  );

  return tasks;
}
