import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsViewProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onMarkAsRead: (id: string) => void;
}

export function NotificationsView({ notifications, onDismiss, onMarkAsRead }: NotificationsViewProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-[var(--color-warning)]" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50';
      case 'success':
        return 'bg-green-50';
      default:
        return 'bg-blue-50';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2>Notifications</h2>
        <p className="text-gray-600 mt-1">Stay informed about your brooder status</p>
      </div>

      {notifications.length === 0 ? (
        <div className="bg-[var(--color-pastel-yellow)] rounded-2xl p-12 text-center">
          <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No notifications</p>
          <p className="text-xs text-gray-500 mt-1">All systems operating normally</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`relative bg-white border-2 border-gray-100 rounded-2xl p-4 shadow-sm ${
                !notification.read ? 'border-l-4 border-l-[var(--color-pastel-yellow-dark)]' : ''
              }`}
              onClick={() => !notification.read && onMarkAsRead(notification.id)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDismiss(notification.id);
                }}
                className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>

              <div className="flex gap-3 pr-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm">{notification.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">{notification.timestamp}</p>
                </div>
              </div>

              {!notification.read && (
                <div className="absolute top-3 right-10 w-2 h-2 bg-[var(--color-pastel-yellow-dark)] rounded-full" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
