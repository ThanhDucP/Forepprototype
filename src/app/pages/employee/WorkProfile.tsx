import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ArrowUp, ArrowRight } from 'lucide-react';

export default function WorkProfile() {
  // Task breakdown data
  const taskBreakdown = [
    { name: 'Feature Development', value: 45, color: '#3b82f6' },
    { name: 'Code Review', value: 20, color: '#8b5cf6' },
    { name: 'Bug Fixing', value: 15, color: '#ef4444' },
    { name: 'Documentation', value: 10, color: '#f59e0b' },
    { name: 'Meetings/Discussion', value: 10, color: '#6b7280' }
  ];

  // Work timeline data (weekly tasks over 12 weeks)
  const timelineData = [
    { week: 'W1', easy: 2, medium: 3, hard: 1 },
    { week: 'W2', easy: 3, medium: 2, hard: 2 },
    { week: 'W3', easy: 1, medium: 4, hard: 2 },
    { week: 'W4', easy: 2, medium: 3, hard: 3 },
    { week: 'W5', easy: 3, medium: 4, hard: 1 },
    { week: 'W6', easy: 2, medium: 2, hard: 4 },
    { week: 'W7', easy: 1, medium: 5, hard: 2 },
    { week: 'W8', easy: 2, medium: 3, hard: 3 },
    { week: 'W9', easy: 3, medium: 4, hard: 2 },
    { week: 'W10', easy: 2, medium: 3, hard: 4 },
    { week: 'W11', easy: 1, medium: 4, hard: 3 },
    { week: 'W12', easy: 2, medium: 5, hard: 2 }
  ];

  // Skill evolution data
  const skillEvolution = [
    { skill: 'React', month1: 'L2', month2: 'L3', month3: 'L3→L4', trend: 'up-up' },
    { skill: 'TypeScript', month1: 'L2', month2: 'L2', month3: 'L3', trend: 'up' },
    { skill: 'System Design', month1: 'L1', month2: 'L1', month3: 'L2', trend: 'up' },
    { skill: 'Communication', month1: 'L3', month2: 'L3', month3: 'L3', trend: 'flat' }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up-up') return <span className="text-green-600">↑↑</span>;
    if (trend === 'up') return <span className="text-green-600">↑</span>;
    return <span className="text-gray-400">→</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Work Profile của tôi</h1>
          <p className="text-gray-600">Chân dung làm việc thực — tự động từ công việc hàng ngày</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Tổng tasks</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl">156</p>
              <span className="text-sm text-gray-500">3 tháng</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Avg difficulty</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl">3.2</p>
              <span className="text-sm text-gray-500">/ 5</span>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Skill dùng nhiều nhất</p>
            <div className="flex items-baseline gap-2">
              <p className="text-xl">React</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">47 lần</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <p className="text-sm text-gray-600">Performance trend</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl text-green-600">+23%</p>
            </div>
            <p className="text-sm text-gray-500 mt-1">vs Q3</p>
          </div>
        </div>

        {/* Task Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Task Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {taskBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                    <span>{item.name}</span>
                  </div>
                  <span className="text-gray-600">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Work Timeline */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Work Timeline (12 tuần)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="easy" stackId="a" fill="#10b981" name="Easy" />
                <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium" />
                <Bar dataKey="hard" stackId="a" fill="#ef4444" name="Hard" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Evolution Table */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl mb-6">Skill Evolution</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Skill</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Tháng 1</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Tháng 2</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Tháng 3</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Trend</th>
                </tr>
              </thead>
              <tbody>
                {skillEvolution.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{row.skill}</td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                        {row.month1}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                        {row.month2}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                        {row.month3}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 text-xl">
                      {getTrendIcon(row.trend)}
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
