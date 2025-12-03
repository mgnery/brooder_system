import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface WeekData {
  week: string;
  avgTemp: number;
  avgHumidity: number;
  targetTemp: number;
}

interface DashboardViewProps {
  data: WeekData[];
}

export function DashboardView({ data }: DashboardViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2>Weekly History</h2>
        <p className="text-gray-600 mt-1">Track your brooder conditions over time</p>
      </div>

      {/* Temperature Chart */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="mb-4">Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              domain={[20, 40]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="avgTemp" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Avg Temperature (°C)"
              dot={{ fill: '#ef4444', r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="targetTemp" 
              stroke="#fde68a" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target Temperature (°C)"
              dot={{ fill: '#fde68a', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity Chart */}
      <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="mb-4">Humidity Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="week" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #f3f4f6',
                borderRadius: '12px',
                fontSize: '12px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
            />
            <Line 
              type="monotone" 
              dataKey="avgHumidity" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Avg Humidity (%)"
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        {data.slice(-4).map((week, index) => (
          <div key={index} className="bg-[var(--color-pastel-yellow)] rounded-xl p-4">
            <p className="text-gray-600">{week.week}</p>
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Temp</span>
                <span>{week.avgTemp}°C</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Humidity</span>
                <span>{week.avgHumidity}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
