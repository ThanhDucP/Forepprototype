import { TrendingUp, Activity, Layers, Flame } from 'lucide-react';

export default function EmployeeDashboard() {
  // Mock data for work items
  const workItems = [
    {
      source: 'JIRA',
      sourceBadgeColor: 'bg-blue-500',
      task: 'Implement infinite scroll for feed component',
      type: 'Feature',
      typeColor: 'bg-blue-100 text-blue-700',
      skills: ['React', 'TypeScript'],
      difficulty: 'High',
      difficultyColor: 'bg-red-100 text-red-700',
      timeSpent: '4.5h',
      impact: 'shipped'
    },
    {
      source: 'GIT',
      sourceBadgeColor: 'bg-gray-800',
      task: 'PR Review: auth flow refactor',
      type: 'Code Review',
      typeColor: 'bg-purple-100 text-purple-700',
      skills: ['System Design'],
      difficulty: 'Medium',
      difficultyColor: 'bg-yellow-100 text-yellow-700',
      timeSpent: '1h',
      impact: '3 issues found'
    },
    {
      source: 'JIRA',
      sourceBadgeColor: 'bg-blue-500',
      task: 'Fix timezone bug in attendance display',
      type: 'Bug Fix',
      typeColor: 'bg-red-100 text-red-700',
      skills: ['JavaScript'],
      difficulty: 'Low',
      difficultyColor: 'bg-green-100 text-green-700',
      timeSpent: '0.5h',
      impact: 'fixed'
    },
    {
      source: 'GIT',
      sourceBadgeColor: 'bg-gray-800',
      task: 'Refactor API layer to use React Query',
      type: 'Feature',
      typeColor: 'bg-blue-100 text-blue-700',
      skills: ['React', 'API Design'],
      difficulty: 'High',
      difficultyColor: 'bg-red-100 text-red-700',
      timeSpent: '6h',
      impact: '-40% load time'
    },
    {
      source: 'SLACK',
      sourceBadgeColor: 'bg-purple-500',
      task: 'Tech design discussion: microservices migration',
      type: 'Meeting',
      typeColor: 'bg-gray-100 text-gray-700',
      skills: ['System Design'],
      difficulty: 'Medium',
      difficultyColor: 'bg-yellow-100 text-yellow-700',
      timeSpent: '1.5h',
      impact: 'decision made'
    }
  ];

  const aiInsights = [
    {
      icon: '🔥',
      message: 'Bạn làm 2 task khó liên tiếp tốt — đang trong vùng growth'
    },
    {
      icon: '📈',
      message: 'React skill tăng rõ rệt từ công việc thực tế. Đang tiến gần L4.'
    },
    {
      icon: '⚡',
      message: 'System Design còn gap 10pts để lên Senior. Task review vừa rồi đang lấp dần.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Dashboard</h1>
          <p className="text-gray-600">Work intelligence — tự động từ công việc thực tế</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Performance Score</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl">87</p>
                  <span className="text-sm text-gray-500">pts</span>
                </div>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">Output / (Effort × Difficulty)</p>
            <p className="text-xs text-green-600 mt-1">+5 vs tuần trước</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Tasks captured</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl">12</p>
                  <span className="text-sm text-gray-500">tasks</span>
                </div>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">auto từ Jira, Git</p>
            <p className="text-xs text-gray-600 mt-1">8 feature / 3 review / 1 meeting</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Skill đang tăng</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl">React</p>
                </div>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Layers className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">L3 → L4</p>
            <p className="text-xs text-purple-600 mt-1">+1 level tuần này</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm text-gray-600">Learning streak</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl">14</p>
                  <span className="text-sm text-gray-500">ngày</span>
                </div>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-gray-500">liên tiếp</p>
            <p className="text-xs text-orange-600 mt-1">🔥 Keep it up!</p>
          </div>
        </div>

        {/* Main Content - Work Feed + AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Work Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="mb-6">
                <h2 className="text-xl mb-1">Công việc tuần này — tự động capture</h2>
                <p className="text-sm text-gray-500">Không cần báo cáo. Dữ liệu từ Jira + Git.</p>
              </div>

              <div className="space-y-4">
                {workItems.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`${item.sourceBadgeColor} text-white text-xs px-2 py-1 rounded font-medium`}>
                        {item.source}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm mb-2">{item.task}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className={`${item.typeColor} px-2 py-1 rounded`}>{item.type}</span>
                          {item.skills.map((skill, idx) => (
                            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                          <span className={`${item.difficultyColor} px-2 py-1 rounded`}>{item.difficulty}</span>
                          <span className="text-gray-500">{item.timeSpent}</span>
                          <span className="text-gray-700">• {item.impact}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl p-6 text-white shadow-lg">
              <h2 className="text-lg mb-6">AI nhận thấy tuần này</h2>
              
              <div className="space-y-4 mb-6">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur">
                    <p className="text-sm leading-relaxed">
                      <span className="text-lg mr-2">{insight.icon}</span>
                      {insight.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-6">
                <p className="text-sm text-gray-300 mb-3">Gợi ý hành động hôm nay</p>
                <div className="space-y-2">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-3 px-4 rounded-lg transition-colors">
                    Nhận task System Design tuần tới
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white text-sm py-3 px-4 rounded-lg transition-colors">
                    Tiếp tục khóa React Advanced (65% done)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
