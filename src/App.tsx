import { useState, useEffect } from 'react';
import { Home, BarChart3, Bell, Plus, BookOpen } from 'lucide-react';
import { MonitoringView } from './components/MonitoringView';
import { DashboardView } from './components/DashboardView';
import { NotificationsView } from './components/NotificationsView';
import { GuideView } from './components/GuideView';

type View = 'monitor' | 'dashboard' | 'notifications' | 'guide';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>('monitor');
  const [dateStarted, setDateStarted] = useState('December 1, 2025');
  const [temperature, setTemperature] = useState(32);
  const [targetTemperature, setTargetTemperature] = useState(30);
  const [humidity, setHumidity] = useState(65);
  const [lightStatus, setLightStatus] = useState<'on' | 'off'>('on');
  const [lightMode, setLightMode] = useState<'manual' | 'automatic'>('manual');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High Temperature Alert',
      message: 'Temperature has exceeded target by 3°C. Current: 33°C, Target: 30°C',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'info',
      title: 'Light Mode Changed',
      message: 'Light control switched to automatic mode',
      timestamp: '5 hours ago',
      read: true,
    },
  ]);

  // Mock data for dashboard
  const weeklyData = [
    { week: 'Week 1', avgTemp: 29, avgHumidity: 62, targetTemp: 30 },
    { week: 'Week 2', avgTemp: 30, avgHumidity: 64, targetTemp: 30 },
    { week: 'Week 3', avgTemp: 31, avgHumidity: 63, targetTemp: 30 },
    { week: 'Week 4', avgTemp: 30, avgHumidity: 65, targetTemp: 30 },
    { week: 'Week 5', avgTemp: 32, avgHumidity: 66, targetTemp: 30 },
  ];

  // Simulate temperature and humidity changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuations
      setTemperature((prev) => {
        const change = (Math.random() - 0.5) * 2;
        const newTemp = Math.max(20, Math.min(40, prev + change));
        return Math.round(newTemp * 10) / 10;
      });

      setHumidity((prev) => {
        const change = (Math.random() - 0.5) * 3;
        const newHumidity = Math.max(0, Math.min(100, prev + change));
        return Math.round(newHumidity);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Check thresholds and create notifications
  useEffect(() => {
    if (Math.abs(temperature - targetTemperature) > 3) {
      const existingAlert = notifications.find(
        (n) => n.title === 'Temperature Threshold Alert' && !n.read
      );

      if (!existingAlert) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Temperature Threshold Alert',
          message: `Temperature is ${temperature > targetTemperature ? 'above' : 'below'} target by ${Math.abs(temperature - targetTemperature).toFixed(1)}°C`,
          timestamp: 'Just now',
          read: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
      }
    }

    if (humidity > 75 || humidity < 45) {
      const existingAlert = notifications.find(
        (n) => n.title === 'Humidity Threshold Alert' && !n.read
      );

      if (!existingAlert) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: 'warning',
          title: 'Humidity Threshold Alert',
          message: `Humidity is ${humidity > 75 ? 'too high' : 'too low'} at ${humidity}%`,
          timestamp: 'Just now',
          read: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
      }
    }
  }, [temperature, targetTemperature, humidity, notifications]);

  // Automatic light control based on time
  useEffect(() => {
    if (lightMode === 'automatic') {
      const hour = new Date().getHours();
      const shouldBeOn = hour >= 6 && hour < 20; // On from 6 AM to 8 PM
      setLightStatus(shouldBeOn ? 'on' : 'off');
    }
  }, [lightMode]);

  const handleLightToggle = () => {
    if (lightMode === 'manual') {
      setLightStatus((prev) => (prev === 'on' ? 'off' : 'on'));
    }
  };

  const handleLightModeToggle = () => {
    const newMode = lightMode === 'manual' ? 'automatic' : 'manual';
    setLightMode(newMode);

    const notification: Notification = {
      id: Date.now().toString(),
      type: 'info',
      title: 'Light Mode Changed',
      message: `Light control switched to ${newMode} mode`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [notification, ...prev]);
  };

  const handleDismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleNewBrooder = () => {
    if (confirm('Are you sure you want to start monitoring a new brooder? This will reset all current data.')) {
      setDateStarted(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
      setTemperature(25);
      setTargetTemperature(30);
      setHumidity(60);
      setLightStatus('off');
      setLightMode('manual');
      setNotifications([
        {
          id: Date.now().toString(),
          type: 'success',
          title: 'New Brooder Started',
          message: 'Monitoring has been reset for a new brooder session',
          timestamp: 'Just now',
          read: false,
        },
      ]);
      setCurrentView('monitor');
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[var(--color-warm-gray)]">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative pb-24">
        {/* Header */}
        <div className="bg-[var(--color-pastel-yellow)] px-6 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1>Brooder Monitor</h1>
              <p className="text-gray-600 mt-1">Smart Poultry Care</p>
            </div>
            <button
              onClick={handleNewBrooder}
              className="p-3 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
              title="New Brooder"
            >
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {currentView === 'monitor' && (
            <MonitoringView
              dateStarted={dateStarted}
              temperature={temperature}
              targetTemperature={targetTemperature}
              humidity={humidity}
              lightStatus={lightStatus}
              lightMode={lightMode}
              onTemperatureChange={setTargetTemperature}
              onLightToggle={handleLightToggle}
              onLightModeToggle={handleLightModeToggle}
            />
          )}

          {currentView === 'dashboard' && <DashboardView data={weeklyData} />}

          {currentView === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onDismiss={handleDismissNotification}
              onMarkAsRead={handleMarkAsRead}
            />
          )}

          {currentView === 'guide' && <GuideView />}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t-2 border-gray-100">
          <div className="grid grid-cols-4 gap-1 px-6 py-4">
            <button
              onClick={() => setCurrentView('monitor')}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
                currentView === 'monitor'
                  ? 'bg-[var(--color-pastel-yellow)] text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="text-xs">Monitor</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-[var(--color-pastel-yellow)] text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-xs">Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentView('notifications')}
              className={`relative flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
                currentView === 'notifications'
                  ? 'bg-[var(--color-pastel-yellow)] text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Bell className="w-6 h-6" />
              <span className="text-xs">Alerts</span>
              {unreadCount > 0 && (
                <div className="absolute top-1 right-1/4 w-5 h-5 bg-[var(--color-danger)] rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">{unreadCount}</span>
                </div>
              )}
            </button>

            <button
              onClick={() => setCurrentView('guide')}
              className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
                currentView === 'guide'
                  ? 'bg-[var(--color-pastel-yellow)] text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <BookOpen className="w-6 h-6" />
              <span className="text-xs">Guide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}