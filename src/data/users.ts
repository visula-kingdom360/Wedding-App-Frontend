export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'customer' | 'merchant' | 'admin';
}

export const registeredUsers: RegisteredUser[] = [
  {
    id: '1',
    name: 'John Davis',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    role: 'customer'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'customer'
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'customer'
  },
  {
    id: '4',
    name: 'Mike Wilson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    role: 'customer'
  },
  {
    id: '5',
    name: 'Alex Thompson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'customer'
  }
];

// Helper function to get user by email
export const getUserByEmail = (email: string): RegisteredUser | undefined => {
  return registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Helper function to get Gravatar URL for external emails
export const getGravatarUrl = (email: string): string => {
  // Simple hash function for demonstration
  // In production, you'd use MD5 hash
  const emailLower = email.toLowerCase().trim();
  // Using a placeholder service that generates avatars based on email
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(emailLower)}&backgroundColor=0C3B2E`;
};

// Get avatar URL for any email (registered user or external)
export const getAvatarForEmail = (email: string): { url: string; name: string; isRegistered: boolean } => {
  const user = getUserByEmail(email);
  if (user) {
    return {
      url: user.avatar,
      name: user.name,
      isRegistered: true
    };
  }
  return {
    url: getGravatarUrl(email),
    name: email,
    isRegistered: false
  };
};
