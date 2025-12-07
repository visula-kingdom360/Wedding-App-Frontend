import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { VendorDetailScreen } from '../customer/VendorDetailScreen';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'merchant' | 'admin';
}

interface MerchantCalendarProps {
  user: User;
  onBack: () => void;
}

export function MerchantCalendar({ user, onBack }: MerchantCalendarProps) {
  // Using the first vendor as the merchant's profile (vendor ID "1")
  // In a real app, this would be mapped from the user ID to their vendor profile
  const merchantVendorId = "1";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 flex items-center gap-3 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="font-semibold">Customer Preview</h1>
      </div>

      {/* Customer Vendor View */}
      <VendorDetailScreen
        user={user}
        onBack={() => {}} // No back action needed since we have our own header
        vendorId={merchantVendorId}
        userEvents={[]}
        onAddVendorToEvent={() => {}}
      />
    </div>
  );
}