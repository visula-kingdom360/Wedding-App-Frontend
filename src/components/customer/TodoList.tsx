import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Filter,
  Search
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface TodoListProps {
  user: User | null;
  eventId: string;
  onBack: () => void;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  completed: boolean;
  createdAt: string;
}

export function TodoList({ user, eventId, onBack }: TodoListProps) {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium' as const,
    category: 'General'
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Confirm the Guest List',
      description: 'Finalize the guest list and send out save-the-dates',
      dueDate: '2024-10-10',
      priority: 'High',
      category: 'Planning',
      completed: false,
      createdAt: '2024-10-01'
    },
    {
      id: '2',
      title: 'Book Photography Services',
      description: 'Contact Great Photography and confirm booking',
      dueDate: '2024-10-12',
      priority: 'High',
      category: 'Vendors',
      completed: true,
      createdAt: '2024-09-28'
    },
    {
      id: '3',
      title: 'Finalize Menu Selection',
      description: 'Choose final menu items with catering team',
      dueDate: '2024-10-15',
      priority: 'Medium',
      category: 'Catering',
      completed: false,
      createdAt: '2024-10-02'
    },
    {
      id: '4',
      title: 'Order Wedding Cake',
      description: 'Place order for custom wedding cake design',
      dueDate: '2024-10-20',
      priority: 'Medium',
      category: 'Catering',
      completed: true,
      createdAt: '2024-09-25'
    },
    {
      id: '5',
      title: 'Book Transportation',
      description: 'Arrange transportation for wedding party',
      dueDate: '2024-10-25',
      priority: 'Low',
      category: 'Logistics',
      completed: false,
      createdAt: '2024-10-03'
    }
  ]);

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      category: newTask.category,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTasks(prev => [task, ...prev]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'Medium',
      category: 'General'
    });
    setIsAddingTask(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesTab = activeTab === 'pending' ? !task.completed : task.completed;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (!user) {
    return (
      <div className="p-4 text-center">
        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-xl mb-2">Login Required</h2>
        <p className="text-muted-foreground">Please log in to manage your tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-4 py-4 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-white hover:bg-white/20 p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">To Do List</h1>
            <p className="text-sm text-rose-100">Event Management</p>
          </div>
          <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogDescription>
                  Create a new task for your event planning. Fill in the details below to add it to your to-do list.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="taskTitle">Task Title</Label>
                  <Input
                    id="taskTitle"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taskDescription">Description (Optional)</Label>
                  <Textarea
                    id="taskDescription"
                    placeholder="Add task details"
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newTask.priority} onValueChange={(value: any) => setNewTask(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTask.category} onValueChange={(value) => setNewTask(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="Vendors">Vendors</SelectItem>
                      <SelectItem value="Catering">Catering</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddTask} className="w-full">
                  Add Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-rose-50 border-rose-200 focus:border-rose-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Pending List ({pendingTasks.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed List ({completedTasks.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-3 mt-4">
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg mb-2">No pending tasks</h3>
                  <p className="text-muted-foreground mb-4">
                    Great! You're all caught up with your event planning.
                  </p>
                  <Button onClick={() => setIsAddingTask(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Task
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge 
                            className={`text-xs border ${getPriorityColor(task.priority)}`}
                            variant="outline"
                          >
                            Priority {task.priority}
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {task.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3 mt-4">
            {filteredTasks.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg mb-2">No completed tasks yet</h3>
                  <p className="text-muted-foreground">
                    Completed tasks will appear here as you finish them.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredTasks.map((task) => (
                <Card key={task.id} className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-green-800">{task.title}</h4>
                          <Badge className="text-xs bg-green-100 text-green-800 border-green-300">
                            Completed
                          </Badge>
                        </div>
                        {task.description && (
                          <p className="text-sm text-green-700 mb-2">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-green-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Completed
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {task.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}