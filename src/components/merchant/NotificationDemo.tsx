import { useState } from 'react';
import { Button } from '../ui/button';
import { Bell } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';
import { ArrowLeft } from 'lucide-react';

interface NotificationDemoProps {
  onBack: () => void;
}

export function NotificationDemo({ onBack }: NotificationDemoProps) {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="max-w-md mx-auto mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold text-neutral-dark">Notifications</h1>
        </div>
        

      </div>

      {/* Notification Panel */}
      {showPanel && (
        <div className="max-w-md mx-auto">
          <NotificationPanel onClose={() => setShowPanel(false)} />
        </div>
      )}
    </div>
  );
}
