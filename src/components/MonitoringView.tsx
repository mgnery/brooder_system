import { Thermometer, Droplets, Lightbulb, TrendingUp, TrendingDown } from 'lucide-react';

interface MonitoringViewProps {
  dateStarted: string;
  temperature: number;
  targetTemperature: number;
  humidity: number;
  lightStatus: 'on' | 'off';
  lightMode: 'manual' | 'automatic';
  onTemperatureChange: (temp: number) => void;
  onLightToggle: () => void;
  onLightModeToggle: () => void;
}

export function MonitoringView({
  dateStarted,
  temperature,
  targetTemperature,
  humidity,
  lightStatus,
  lightMode,
  onTemperatureChange,
  onLightToggle,
  onLightModeToggle,
}: MonitoringViewProps) {
  const tempStatus = temperature > targetTemperature + 2 ? 'high' : temperature < targetTemperature - 2 ? 'low' : 'normal';
  const humidityStatus = humidity > 70 ? 'high' : humidity < 50 ? 'low' : 'normal';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'high':
        return 'text-[var(--color-danger)]';
      case 'low':
        return 'text-[var(--color-warning)]';
      default:
        return 'text-[var(--color-success)]';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'high':
        return 'High';
      case 'low':
        return 'Low';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Started */}
      <div className="bg-[var(--color-pastel-yellow)] rounded-2xl p-6">
        <p className="text-gray-600">Started Monitoring</p>
        <h3 className="mt-1">{dateStarted}</h3>
      </div>

      {/* Temperature Card */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--color-pastel-yellow)] rounded-xl flex items-center justify-center">
              <Thermometer className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <p className="text-gray-600">Temperature</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={getStatusColor(tempStatus)}>
                  {getStatusText(tempStatus)}
                </span>
                {tempStatus === 'high' && <TrendingUp className="w-4 h-4 text-[var(--color-danger)]" />}
                {tempStatus === 'low' && <TrendingDown className="w-4 h-4 text-[var(--color-warning)]" />}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl">{temperature}°C</div>
          </div>
        </div>

        {/* Temperature Adjustment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Target Temperature</span>
            <span>{targetTemperature}°C</span>
          </div>
          <input
            type="range"
            min="20"
            max="40"
            value={targetTemperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--color-pastel-yellow-dark)]"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>20°C</span>
            <span>40°C</span>
          </div>
        </div>
      </div>

      {/* Humidity Card */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[var(--color-pastel-yellow)] rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-gray-700" />
            </div>
            <div>
              <p className="text-gray-600">Humidity</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={getStatusColor(humidityStatus)}>
                  {getStatusText(humidityStatus)}
                </span>
                {humidityStatus === 'high' && <TrendingUp className="w-4 h-4 text-[var(--color-danger)]" />}
                {humidityStatus === 'low' && <TrendingDown className="w-4 h-4 text-[var(--color-warning)]" />}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl">{humidity}%</div>
          </div>
        </div>
      </div>

      {/* Light Control Card */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              lightStatus === 'on' ? 'bg-[var(--color-pastel-yellow-dark)]' : 'bg-gray-200'
            }`}>
              <Lightbulb className={`w-6 h-6 ${lightStatus === 'on' ? 'text-gray-700' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className="text-gray-600">Light</p>
              <p className="mt-1 capitalize">{lightStatus}</p>
            </div>
          </div>
          <button
            onClick={onLightToggle}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              lightStatus === 'on' ? 'bg-[var(--color-pastel-yellow-dark)]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                lightStatus === 'on' ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Light Mode Toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-gray-600">Automatic Mode</span>
          <button
            onClick={onLightModeToggle}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              lightMode === 'automatic' ? 'bg-[var(--color-pastel-yellow-dark)]' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                lightMode === 'automatic' ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
