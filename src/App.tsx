import { useState } from "react";
import { AuthScreen } from "./components/auth/AuthScreen";
import { MerchantLoginForm } from "./components/auth/MerchantLoginForm";
import { MerchantSignupForm } from "./components/auth/MerchantSignupForm";
import { CustomerApp } from "./components/customer/CustomerApp";
import { MerchantApp } from "./components/merchant/MerchantApp";
import { AdminApp } from "./components/admin/AdminApp";
import { EntryScreen } from "./components/customer/EntryScreen";
import { WebsiteHome } from "./components/website/WebsiteHome";
import { Toaster } from "./components/ui/sonner";

type UserRole = "customer" | "merchant" | "admin" | null;
type AppMode = "website" | "entry" | "auth" | "merchant-auth" | "merchant-signup" | "guest" | "authenticated";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [appMode, setAppMode] =
    useState<AppMode>("website");
  const [currentScreen, setCurrentScreen] = useState<
    "login" | "signup" | "role-select"
  >("login");

  const handleAuth = (userData: User) => {
    setUser(userData);
    setAppMode("authenticated");
  };

  const handleGuestContinue = () => {
    setAppMode("guest");
  };

  const handleLoginRequest = () => {
    setAppMode("auth");
    setCurrentScreen("login");
  };

  const handleMerchantLoginRequest = () => {
    setAppMode("merchant-auth");
    setCurrentScreen("login");
  };

  const handleMerchantSignupRequest = () => {
    setAppMode("merchant-signup");
    setCurrentScreen("signup");
  };

  const handleSignupRequest = () => {
    setAppMode("auth");
    setCurrentScreen("signup");
  };

  const handleLogout = () => {
    setUser(null);
    setAppMode("website");
    setCurrentScreen("login");
  };

  const handleNavigateFromWebsite = (view: 'customer' | 'merchant') => {
    if (view === 'customer') {
      setAppMode('entry');
    } else {
      setAppMode('merchant-auth');
    }
  };

  // Website Home - Landing Page
  if (appMode === "website") {
    return (
      <>
        <WebsiteHome onNavigate={handleNavigateFromWebsite} />
        <Toaster />
      </>
    );
  }

  // Entry Screen - Choose between Guest or Login
  if (appMode === "entry") {
    return (
      <>
        <EntryScreen
          onGuestContinue={handleGuestContinue}
          onLoginRequest={handleLoginRequest}
          onMerchantLoginRequest={handleMerchantLoginRequest}
          onSignupRequest={handleSignupRequest}
        />
        <Toaster />
      </>
    );
  }

  // Auth Screen - Login/Signup
  if (appMode === "auth") {
    return (
      <>
        <div className="min-h-screen bg-background">
          <AuthScreen
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
            onAuth={handleAuth}
            onGuestLogin={handleGuestContinue}
            onMerchantLogin={handleMerchantLoginRequest}
          />
        </div>
        <Toaster />
      </>
    );
  }

  // Merchant Auth Screen - Login
  if (appMode === "merchant-auth") {
    return (
      <>
        <div className="min-h-screen bg-background">
          <MerchantLoginForm
            onToggleToSignup={handleMerchantSignupRequest}
            onLogin={handleAuth}
            onBackToCustomerLogin={handleLoginRequest}
          />
        </div>
        <Toaster />
      </>
    );
  }

  // Merchant Signup Screen
  if (appMode === "merchant-signup") {
    return (
      <>
        <div className="min-h-screen bg-background">
          <MerchantSignupForm
            onBackToLogin={handleMerchantLoginRequest}
            onSignup={handleAuth}
          />
        </div>
        <Toaster />
      </>
    );
  }

  // Guest Mode - Customer App without user
  if (appMode === "guest") {
    return (
      <>
        <CustomerApp
          user={null}
          onLogout={handleLogout}
          onLoginRequest={handleLoginRequest}
        />
        <Toaster />
      </>
    );
  }

  // Authenticated Mode - Route based on user role
  if (appMode === "authenticated" && user) {
    switch (user.role) {
      case "customer":
        return (
          <>
            <CustomerApp
              user={user}
              onLogout={handleLogout}
              onLoginRequest={handleLoginRequest}
            />
            <Toaster />
          </>
        );
      case "merchant":
        return (
          <>
            <MerchantApp user={user} onLogout={handleLogout} />
            <Toaster />
          </>
        );
      case "admin":
        return (
          <>
            <AdminApp user={user} onLogout={handleLogout} />
            <Toaster />
          </>
        );
      default:
        return null;
    }
  }

  return null;
}