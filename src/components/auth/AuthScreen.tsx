import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { RoleSelect } from './RoleSelect';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface AuthScreenProps {
  currentScreen: 'login' | 'signup' | 'role-select';
  onScreenChange: (screen: 'login' | 'signup' | 'role-select') => void;
  onAuth: (user: User) => void;
  onGuestLogin?: () => void;
}

export function AuthScreen({ currentScreen, onScreenChange, onAuth, onGuestLogin }: AuthScreenProps) {
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    name: '',
    contactNumber: ''
  });

  const handleRoleSelect = (role: 'customer' | 'merchant' | 'admin') => {
    // Create user with signup data
    const newUser: User = {
      id: `user_${Date.now()}`,
      email: signupData.email,
      name: signupData.name,
      role
    };
    onAuth(newUser);
  };

  const handleSignupNext = (email: string, password: string, name: string, contactNumber: string) => {
    setSignupData({ email, password, name, contactNumber });
    onScreenChange('role-select');
  };

  // Role selection screen
  if (currentScreen === 'role-select') {
    return (
      <RoleSelect 
        onRoleSelect={handleRoleSelect} 
        userEmail={signupData.email}
        userName={signupData.name}
      />
    );
  }

  // Signup screen
  if (currentScreen === 'signup') {
    return (
      <SignupForm
        onSignupNext={handleSignupNext}
        onBackToLogin={() => onScreenChange('login')}
      />
    );
  }

  // Login screen (default)
  return (
    <LoginForm 
      onToggleToSignup={() => onScreenChange('signup')}
      onLogin={onAuth}
      onGuestLogin={onGuestLogin}
    />
  );
}