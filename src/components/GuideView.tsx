import { BookOpen, Thermometer, Droplets, Lightbulb, AlertCircle } from 'lucide-react';

interface WeekGuide {
  week: number;
  temperature: string;
  humidity: string;
  lightHours: string;
  tips: string[];
}

const brooderGuide: WeekGuide[] = [
  {
    week: 1,
    temperature: '32-35°C',
    humidity: '60-70%',
    lightHours: '24 hours',
    tips: [
      'Keep temperature consistent, chicks are most vulnerable',
      'Ensure heat source is properly positioned',
      'Check water availability frequently',
      'Monitor for signs of chilling (huddling) or overheating (panting)',
    ],
  },
  {
    week: 2,
    temperature: '29-32°C',
    humidity: '55-65%',
    lightHours: '18-20 hours',
    tips: [
      'Gradually reduce temperature by 3°C from week 1',
      'Increase ventilation slightly',
      'Start providing more space as chicks grow',
      'Maintain consistent feeding schedule',
    ],
  },
  {
    week: 3,
    temperature: '26-29°C',
    humidity: '50-60%',
    lightHours: '16-18 hours',
    tips: [
      'Continue gradual temperature reduction',
      'Monitor for respiratory issues',
      'Ensure adequate space per bird',
      'Begin transitioning to grower feed if applicable',
    ],
  },
  {
    week: 4,
    temperature: '23-26°C',
    humidity: '50-60%',
    lightHours: '14-16 hours',
    tips: [
      'Birds are more resilient, less heat needed',
      'Increase ventilation for better air quality',
      'Monitor humidity to prevent respiratory issues',
      'Check for signs of overcrowding',
    ],
  },
  {
    week: 5,
    temperature: '20-23°C',
    humidity: '45-55%',
    lightHours: '12-14 hours',
    tips: [
      'Prepare for transition to ambient temperature',
      'Ensure proper ventilation',
      'Monitor growth and adjust feeding accordingly',
      'Consider outdoor access if weather permits',
    ],
  },
  {
    week: 6,
    temperature: '18-21°C',
    humidity: '45-55%',
    lightHours: '12 hours',
    tips: [
      'Birds should be fully feathered',
      'Can transition to room temperature in warm climates',
      'Focus on maintaining good air quality',
      'Prepare for final housing arrangements',
    ],
  },
];

export function GuideView() {
  return (
    <div className="space-y-6">
      <div className="bg-[var(--color-pastel-yellow)] rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h2>Brooding Guide</h2>
            <p className="text-gray-600">Week-by-week recommendations</p>
          </div>
        </div>
        <div className="bg-white/50 rounded-xl p-4 mt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-700">
              These are general guidelines. Always observe your birds' behavior and adjust conditions accordingly.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {brooderGuide.map((guide) => (
          <div key={guide.week} className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3>Week {guide.week}</h3>
              <div className="px-3 py-1 bg-[var(--color-pastel-yellow)] rounded-full text-xs">
                Days {(guide.week - 1) * 7 + 1}-{guide.week * 7}
              </div>
            </div>

            {/* Conditions Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-red-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="w-4 h-4 text-red-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Temperature</p>
                <p className="text-sm">{guide.temperature}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Humidity</p>
                <p className="text-sm">{guide.humidity}</p>
              </div>

              <div className="bg-yellow-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-yellow-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Light</p>
                <p className="text-sm">{guide.lightHours}</p>
              </div>
            </div>

            {/* Tips */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-600 mb-3">Management Tips:</p>
              <ul className="space-y-2">
                {guide.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[var(--color-pastel-yellow-dark)] rounded-full mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="mb-3">General Best Practices</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-xs text-gray-700">Always provide clean, fresh water</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-xs text-gray-700">Reduce temperature gradually, not abruptly</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-xs text-gray-700">Monitor bird behavior more than just numbers</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-xs text-gray-700">Maintain proper ventilation to prevent disease</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-xs text-gray-700">Keep brooder clean and dry at all times</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
