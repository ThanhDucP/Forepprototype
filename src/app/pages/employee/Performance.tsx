import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Activity, FileText } from 'lucide-react';

export default function Performance() {
  // Performance trend data
  const trendData = [
    { week: 'W1', yourScore: 72, teamMedian: 74, personalBest: 78 },
    { week: 'W2', yourScore: 75, teamMedian: 76, personalBest: 78 },
    { week: 'W3', yourScore: 71, teamMedian: 75, personalBest: 78 },
    { week: 'W4', yourScore: 80, teamMedian: 77, personalBest: 80 },
    { week: 'W5', yourScore: 82, teamMedian: 78, personalBest: 82 },
    { week: 'W6', yourScore: 85, teamMedian: 79, personalBest: 85 },
    { week: 'W7', yourScore: 83, teamMedian: 80, personalBest: 85 },
    { week: 'W8', yourScore: 87, teamMedian: 80, personalBest: 87 }
  ];

  // Task performance data
  const recentTasks = [
    { task: 'Infinite scroll component', difficulty: 4, effort: 4.5, output: 5, score: 4.8, trend: 'up' },
    { task: 'Auth flow refactor review', difficulty: 3, effort: 1, output: 4, score: 4.0, trend: 'up' },
    { task: 'Timezone bug fix', difficulty: 1, effort: 0.5, output: 3, score: 3.5, trend: 'neutral' },
    { task: 'React Query migration', difficulty: 4, effort: 6, output: 5, score: 4.5, trend: 'up' },
    { task: 'Microservices discussion', difficulty: 3, effort: 1.5, output: 3, score: 3.8, trend: 'neutral' },
    { task: 'API optimization', difficulty: 4, effort: 5, output: 5, score: 4.7, trend: 'up' },
    { task: 'Code review session', difficulty: 2, effort: 1, output: 3, score: 3.5, trend: 'neutral' },
    { task: 'Performance testing', difficulty: 3, effort: 2, output: 4, score: 4.2, trend: 'up' },
    { task: 'Documentation update', difficulty: 1, effort: 2, output: 2, score: 2.1, trend: 'down' },
    { task: 'Feature planning', difficulty: 2, effort: 1.5, output: 3, score: 3.6, trend: 'neutral' }
  ];

  const getScoreBadgeColor = (score: number) => {
    if (score >= 4.5) return 'bg-green-100 text-green-700';
    if (score >= 3.5) return 'bg-blue-100 text-blue-700';
    if (score >= 2.5) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <span className="text-green-600">↑</span>;
    if (trend === 'down') return <span className="text-red-600">↓</span>;
    return <span className="text-gray-400">→</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Hiệu suất</h1>
          <p className="text-gray-600">Dựa trên công thức thực tế — không phải scoring chủ quan</p>
        </div>

        {/* Hero Section - Performance Score */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <div className="text-center">
            <p className="text-lg mb-4 opacity-90">Performance Score</p>
            <div className="flex items-baseline justify-center gap-3 mb-4">
              <span className="text-7xl">87</span>
              <span className="text-2xl opacity-75">pts / week</span>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 inline-block mb-3">
              <p className="text-lg">= Output ÷ (Effort × Difficulty)</p>
            </div>
            <p className="text-sm opacity-75 max-w-2xl mx-auto">
              Điểm cao = làm được nhiều giá trị với công sức hợp lý trên task khó
            </p>
          </div>
        </div>

        {/* Performance Trend Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-xl mb-6">Performance Trend (8 tuần)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis domain={[60, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="yourScore" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                name="Your score" 
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="teamMedian" 
                stroke="#9ca3af" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                name="Team median" 
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="personalBest" 
                stroke="#93c5fd" 
                strokeWidth={2} 
                strokeDasharray="3 3" 
                name="Personal best" 
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pattern Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-sm text-gray-600">Loại task bạn làm tốt nhất</h3>
            </div>
            <p className="text-xl mb-1">Feature Development</p>
            <p className="text-2xl text-green-600">avg 4.2/5</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-sm text-gray-600">Loại task cần cải thiện</h3>
            </div>
            <p className="text-xl mb-1">Documentation</p>
            <p className="text-2xl text-yellow-600">avg 2.1/5</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-sm text-gray-600">Thời điểm peak performance</h3>
            </div>
            <p className="text-xl mb-1">Thứ 3 & Thứ 4</p>
            <p className="text-2xl text-blue-600">buổi sáng</p>
          </div>
        </div>

        {/* Task Performance Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl mb-6">Task Performance Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Task</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Difficulty</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Effort (h)</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Output</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Score</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{task.task}</td>
                    <td className="text-center py-3 px-4">
                      <span className="text-sm text-gray-700">{task.difficulty}/5</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-sm text-gray-700">{task.effort}h</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-sm text-gray-700">{task.output}/5</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded text-sm ${getScoreBadgeColor(task.score)}`}>
                        {task.score}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 text-xl">
                      {getTrendIcon(task.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
