import { Users, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function LeadDashboard() {
  const navigate = useNavigate();

  const teamMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      position: 'Frontend Dev',
      score: 87,
      trend: 'up',
      topSkill: 'React L3→L4',
      status: 'growth',
      statusColor: 'bg-green-100 text-green-700',
      hasWarning: false,
      sparklineData: [72, 75, 78, 82, 85, 84, 87]
    },
    {
      id: 2,
      name: 'Trần Thị Bảo',
      position: 'Backend Dev',
      score: 82,
      trend: 'neutral',
      topSkill: 'Node.js L3',
      status: 'stable',
      statusColor: 'bg-blue-100 text-blue-700',
      hasWarning: true,
      warningText: 'Chưa hoàn thành khóa bắt buộc',
      sparklineData: [80, 81, 82, 82, 83, 82, 82]
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      position: 'Frontend Dev',
      score: 64,
      trend: 'down',
      topSkill: '—',
      status: 'needs-support',
      statusColor: 'bg-red-100 text-red-700',
      hasWarning: true,
      warningText: 'Performance giảm 15% (2 tuần)',
      sparklineData: [79, 78, 75, 72, 68, 66, 64]
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      position: 'QA',
      score: 85,
      trend: 'up',
      topSkill: 'Testing L3→L4',
      status: 'growth',
      statusColor: 'bg-green-100 text-green-700',
      hasWarning: false,
      sparklineData: [75, 78, 80, 82, 83, 84, 85]
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      position: 'DevOps',
      score: 90,
      trend: 'up',
      topSkill: 'Infra L4',
      status: 'growth',
      statusColor: 'bg-green-100 text-green-700',
      hasWarning: false,
      sparklineData: [82, 84, 86, 87, 88, 89, 90]
    }
  ];

  const upcomingOneOnOnes = [
    {
      date: 'Thu 27/02',
      employee: 'Lê Văn Cường',
      topic: 'Performance drop',
      priority: 'HIGH',
      priorityColor: 'bg-red-100 text-red-700'
    },
    {
      date: 'Fri 28/02',
      employee: 'Nguyễn Văn An',
      topic: 'Promotion review',
      priority: 'MEDIUM',
      priorityColor: 'bg-yellow-100 text-yellow-700'
    }
  ];

  const aiInsights = [
    {
      icon: '⚠️',
      message: 'Lê Văn Cường: 2 tuần giảm liên tiếp. Gợi ý: 1:1 tuần này.'
    },
    {
      icon: '🌟',
      message: 'Hoàng Văn Em đang top performance. Có thể giao task khó hơn.'
    },
    {
      icon: '📊',
      message: 'Team đang làm nhiều Bug Fix (30%) — ít Feature hơn bình thường'
    }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />;
    return <span className="w-4 h-4 text-gray-400">→</span>;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Team Overview</h1>
          <p className="text-gray-600">Dữ liệu thực từ công việc — không cần họp status</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">Team size</p>
            </div>
            <p className="text-3xl">5</p>
            <p className="text-sm text-gray-500">người</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">Team performance avg</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl">83</p>
              <span className="text-sm text-gray-500">pts/week</span>
            </div>
            <p className="text-sm text-green-600">↑ vs last week</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-gray-600">Người cần chú ý</p>
            </div>
            <p className="text-3xl">1</p>
            <p className="text-sm text-gray-500">performance drop</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">Đang tăng trưởng mạnh</p>
            </div>
            <p className="text-3xl">2</p>
            <p className="text-sm text-gray-500">người</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Team Member Cards */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl mb-4">Team Members</h2>
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg">{member.name}</h3>
                      {member.hasWarning && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{member.position}</p>
                    
                    <div className="flex items-center gap-6 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{member.score}</span>
                        <span className="text-sm text-gray-500">pts</span>
                        {getTrendIcon(member.trend)}
                      </div>
                      <div className="h-12 w-32">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={member.sparklineData.map((value, idx) => ({ value }))}>
                            <Line 
                              type="monotone" 
                              dataKey="value" 
                              stroke={member.trend === 'up' ? '#10b981' : member.trend === 'down' ? '#ef4444' : '#6b7280'} 
                              strokeWidth={2} 
                              dot={false}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {member.topSkill !== '—' && (
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="text-gray-500">Top skill:</span> {member.topSkill}
                      </p>
                    )}

                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded ${member.statusColor}`}>
                        {member.status === 'growth' && 'Đang growth zone'}
                        {member.status === 'stable' && 'Stable'}
                        {member.status === 'needs-support' && 'Cần hỗ trợ'}
                      </span>
                      {member.hasWarning && (
                        <span className="text-xs text-red-600">⚠️ {member.warningText}</span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/lead/team')}
                    className="text-sm text-blue-600 hover:text-blue-700 underline whitespace-nowrap"
                  >
                    Xem Work Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - AI Insights + Upcoming 1:1s */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Insights */}
            <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl p-6 text-white">
              <h2 className="text-lg mb-4">AI Team Insights</h2>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <p className="text-sm leading-relaxed">
                      <span className="text-lg mr-2">{insight.icon}</span>
                      {insight.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming 1:1s */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg mb-4">Upcoming 1:1s</h2>
              <div className="space-y-3">
                {upcomingOneOnOnes.map((meeting, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-gray-600">{meeting.date}</p>
                      <span className={`text-xs px-2 py-1 rounded ${meeting.priorityColor}`}>
                        {meeting.priority}
                      </span>
                    </div>
                    <p className="mb-1">{meeting.employee}</p>
                    <p className="text-sm text-gray-600">{meeting.topic}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/lead/one-on-one')}
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Xem tất cả 1:1s
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
