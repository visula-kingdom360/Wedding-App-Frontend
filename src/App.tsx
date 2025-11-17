import { useState } from "react";
import { AuthScreen } from "./components/auth/AuthScreen";
import { CustomerApp } from "./components/customer/CustomerApp";
import { MerchantApp } from "./components/merchant/MerchantApp";
import { AdminApp } from "./components/admin/AdminApp";
import { EntryScreen } from "./components/customer/EntryScreen";
import { Toaster } from "./components/ui/sonner";

type UserRole = "customer" | "merchant" | "admin" | null;
type AppMode = "entry" | "auth" | "guest" | "authenticated";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export default function App() {
  const [user, setUser] = useState<User | null>({
    id: "customer-demo",
    email: "customer@eventcore.com",
    name: "John Smith",
    role: "customer",
  });
  const [appMode, setAppMode] =
    useState<AppMode>("authenticated");
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

  const handleSignupRequest = () => {
    setAppMode("auth");
    setCurrentScreen("signup");
  };

  const handleLogout = () => {
    setUser(null);
    setAppMode("entry");
    setCurrentScreen("login");
  };

  // Entry Screen - Choose between Guest or Login
  if (appMode === "entry") {
    return (
      <>
        <EntryScreen
          onGuestContinue={handleGuestContinue}
          onLoginRequest={handleLoginRequest}
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