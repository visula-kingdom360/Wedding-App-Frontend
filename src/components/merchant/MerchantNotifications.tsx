import { NotificationPanel } from './NotificationPanel';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantNotificationsProps {
  user: User;
  onBack?: () => void;
}

export function MerchantNotifications({ user }: MerchantNotificationsProps) {
  return (
    <div className="px-4 pt-6 pb-6">
      <NotificationPanel />
    </div>
  );
}
