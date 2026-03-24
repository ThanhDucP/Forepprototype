import { useParams, useNavigate } from 'react-router';
import Layout from '../../components/Layout';
import { ArrowLeft, TrendingUp, Activity, Layers, FileText, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function EmployeeWorkProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock employee data - in a real app, this would come from params or API
  const employeeData = {
    id: id || '1',
    name: 'Nguyễn Văn An',
    position: 'Frontend Developer',
    score: 87,
    trend: 'up',
    topSkill: 'React L3→L4',
    status: 'growth',
    joinDate: 'Jan 2023',
    reportsTo: 'Trần Thị Bảo',
    email: 'an.nguyen@company.com',
    
    // Performance data
    performanceTrend: [
      { week: 'W1', score: 72 },
      { week: 'W2', score: 75 },
      { week: 'W3', score: 78 },
      { week: 'W4', score: 82 },
      { week: 'W5', score: 85 },
      { week: 'W6', score: 84 },
      { week: 'W7', score: 87 }
    ],
    
    // Task breakdown
    taskBreakdown: [
      { name: 'Feature Development', value: 45, color: '#3b82f6' },
      { name: 'Code Review', value: 20, color: '#8b5cf6' },
      { name: 'Bug Fixing', value: 15, color: '#ef4444' },
      { name: 'Documentation', value: 10, color: '#f59e0b' },
      { name: 'Meetings', value: 10, color: '#6b7280' }
    ],

    // Recent tasks
    recentTasks: [
      { name: 'Implement infinite scroll', type: 'Feature', difficulty: 'High', score: 4.8, date: '2 tuần trước' },
      { name: 'React Query migration', type: 'Feature', difficulty: 'High', score: 4.5, date: '3 tuần trước' },
      { name: 'Auth flow review', type: 'Code Review', difficulty: 'Medium', score: 4.0, date: '1 tuần trước' },
      { name: 'Refactor API layer', type: 'Feature', difficulty: 'High', score: 4.7, date: '3 tuần trước' },
      { name: 'Tech discussion', type: 'Meeting', difficulty: 'Medium', score: 3.8, date: '2 tuần trước' }
    ],

    // Skills
    skills: [
      { name: 'React', level: 3, progress: 65, required: 4, gap: true },
      { name: 'TypeScript', level: 3, progress: 80, required: 3, gap: false },
      { name: 'System Design', level: 2, progress: 40, required: 4, gap: true },
      { name: 'CSS/Styling', level: 4, progress: 90, required: 3, gap: false },
      { name: 'Communication', level: 3, progress: 70, required: 3, gap: false },
      { name: 'Testing', level: 2, progress: 35, required: 3, gap: true }
    ],

    // Learning progress
    learningCourses: [
      { name: 'TypeScript Deep Dive', progress: 65, status: 'In Progress' },
      { name: 'React Advanced Patterns', progress: 30, status: 'In Progress' },
      { name: 'Team Leadership Basics', progress: 100, status: 'Completed' },
      { name: 'Git & Version Control', progress: 100, status: 'Completed' }
    ],

    // Upcoming milestones
    milestones: [
      { title: 'Senior Promotion', daysLeft: 90, percentage: 68 },
      { title: 'React L4 Achievement', daysLeft: 45, percentage: 75 }
    ],

    // Insights
    aiInsights: [
      '🔥 Đang làm tốt các task khó. React skill tăng mạnh từ công việc thực tế.',
      '📈 Performance score tăng 19% so với tháng trước.',
      '⚠️ System Design vẫn là gap lớn nhất. Nên tập trung vào các task SD.',
      '💡 Gợi ý: Giao task System Design tuần tới để luyện skill.'
    ]
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/lead/team')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại Team
          </button>
          
          {/* Employee info card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl mb-2">{employeeData.name}</h1>
                <p className="text-lg opacity-90 mb-4">{employeeData.position}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm opacity-90">
                  <div>
                    <p className="opacity-75">Joined</p>
                    <p>{employeeData.joinDate}</p>
                  </div>
                  <div>
                    <p className="opacity-75">Reports to</p>
                    <p>{employeeData.reportsTo}</p>
                  </div>
                  <div>
                    <p className="opacity-75">Email</p>
                    <p>{employeeData.email}</p>
                  </div>
                  <div>
                    <p className="opacity-75">Status</p>
                    <p className="capitalize">{employeeData.status}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-6xl font-bold mb-2">{employeeData.score}</p>
                <p className="text-lg opacity-90">Performance Score</p>
                <p className="text-sm opacity-75 mt-2">
                  {employeeData.trend === 'up' ? '↑ Tăng' : '↓ Giảm'} so với tuần trước
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">Performance Trend</p>
            </div>
            <p className="text-3xl text-green-600">+19%</p>
            <p className="text-xs text-gray-500">vs tháng trước</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">Top Skill</p>
            </div>
            <p className="text-2xl">{employeeData.topSkill}</p>
            <p className="text-xs text-gray-500">Đang phát triển</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </div>
            <p className="text-3xl">47</p>
            <p className="text-xs text-gray-500">3 tháng</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-orange-600" />
              <p className="text-sm text-gray-600">Learning Progress</p>
            </div>
            <p className="text-3xl">47%</p>
            <p className="text-xs text-gray-500">2 khóa đang học</p>
          </div>
        </div>

        {/* Performance Chart and Task Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Performance Trend (7 tuần)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={employeeData.performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Task Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employeeData.taskBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {employeeData.taskBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skills and Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Skills */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Skill Tree</h2>
            <div className="space-y-4">
              {employeeData.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{skill.name}</h3>
                    <span className="text-sm text-gray-600">L{skill.level}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full ${
                        skill.gap ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{skill.progress}%</span>
                    {skill.gap && <span className="text-yellow-600">Cần lên L{skill.required}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Milestones</h2>
            <div className="space-y-6">
              {employeeData.milestones.map((milestone, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <span className="text-sm text-gray-600">{milestone.percentage}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 mb-1">
                    <div 
                      className="h-3 rounded-full bg-blue-600"
                      style={{ width: `${milestone.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">~{milestone.daysLeft} ngày còn lại</p>
                </div>
              ))}
            </div>

            {/* Learning Progress */}
            <h3 className="text-lg font-medium mt-8 mb-4">Learning Progress</h3>
            <div className="space-y-3">
              {employeeData.learningCourses.map((course, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{course.name}</p>
                    <p className="text-xs text-gray-600">{course.status}</p>
                  </div>
                  <span className="text-sm text-gray-600">{course.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-xl mb-6">Recent Tasks (2 tháng)</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Task</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Type</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Difficulty</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Score</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Date</th>
                </tr>
              </thead>
              <tbody>
                {employeeData.recentTasks.map((task, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm">{task.name}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.type === 'Feature' ? 'bg-blue-100 text-blue-700' :
                        task.type === 'Code Review' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {task.type}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        task.difficulty === 'High' ? 'bg-red-100 text-red-700' :
                        task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {task.difficulty}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`text-sm font-medium ${
                        task.score >= 4.5 ? 'text-green-600' :
                        task.score >= 3.5 ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {task.score}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4 text-sm text-gray-600">{task.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6" />
            <h2 className="text-xl">AI Insights & Recommendations</h2>
          </div>
          <div className="space-y-3">
            {employeeData.aiInsights.map((insight, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <p className="text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Schedule 1:1 Meeting
          </button>
          <button className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" />
            Send Feedback
          </button>
        </div>
      </div>
    </Layout>
  );
}
