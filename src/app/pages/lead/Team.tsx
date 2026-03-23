import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageSquare, Eye, Send } from 'lucide-react';

export default function Team() {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn An',
      position: 'Frontend Developer',
      score: 87,
      trend: 'up',
      topSkill: 'React L3→L4',
      recentTasks: [
        { name: 'Implement infinite scroll', type: 'Feature', difficulty: 'High', score: 4.8 },
        { name: 'React Query migration', type: 'Feature', difficulty: 'High', score: 4.5 },
        { name: 'Auth flow review', type: 'Code Review', difficulty: 'Medium', score: 4.0 }
      ],
      aiInsight: 'Đang làm tốt các task khó. React skill tăng mạnh từ công việc thực tế.'
    },
    {
      id: 2,
      name: 'Trần Thị Bảo',
      position: 'Backend Developer',
      score: 82,
      trend: 'neutral',
      topSkill: 'Node.js L3',
      recentTasks: [
        { name: 'API optimization', type: 'Feature', difficulty: 'Medium', score: 4.2 },
        { name: 'Database query refactor', type: 'Feature', difficulty: 'High', score: 4.0 },
        { name: 'Bug fix: async issue', type: 'Bug Fix', difficulty: 'Low', score: 3.5 }
      ],
      aiInsight: 'Performance ổn định. Chưa hoàn thành khóa "Advanced Node.js" — cần nhắc nhở.'
    },
    {
      id: 3,
      name: 'Lê Văn Cường',
      position: 'Frontend Developer',
      score: 64,
      trend: 'down',
      topSkill: '—',
      recentTasks: [
        { name: 'CSS bug fix', type: 'Bug Fix', difficulty: 'Low', score: 2.8 },
        { name: 'Minor UI adjustment', type: 'Bug Fix', difficulty: 'Low', score: 2.5 },
        { name: 'Timezone fix', type: 'Bug Fix', difficulty: 'Low', score: 3.0 }
      ],
      aiInsight: '⚠️ 2 tuần giảm liên tiếp. Nhiều Bug Fix, ít Feature. Có thể bị kéo vào firefighting.'
    },
    {
      id: 4,
      name: 'Phạm Thị Dung',
      position: 'QA Engineer',
      score: 85,
      trend: 'up',
      topSkill: 'Testing L3→L4',
      recentTasks: [
        { name: 'E2E test suite', type: 'Feature', difficulty: 'Medium', score: 4.5 },
        { name: 'Performance testing', type: 'Feature', difficulty: 'High', score: 4.3 },
        { name: 'Test automation', type: 'Feature', difficulty: 'Medium', score: 4.2 }
      ],
      aiInsight: 'Tăng trưởng tốt. Testing skill đang phát triển mạnh.'
    },
    {
      id: 5,
      name: 'Hoàng Văn Em',
      position: 'DevOps Engineer',
      score: 90,
      trend: 'up',
      topSkill: 'Infra L4',
      recentTasks: [
        { name: 'CI/CD pipeline optimization', type: 'Feature', difficulty: 'High', score: 4.9 },
        { name: 'Kubernetes deployment', type: 'Feature', difficulty: 'High', score: 4.8 },
        { name: 'Monitoring setup', type: 'Feature', difficulty: 'Medium', score: 4.6 }
      ],
      aiInsight: 'Top performer. Đang làm nhiều task khó với quality cao. Có thể giao thêm responsibility.'
    }
  ];

  const toggleExpand = (memberId: number) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Team của tôi</h1>
          <p className="text-gray-600">Chi tiết work profile từng thành viên</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm thành viên..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Team Member List */}
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Member Header */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl">{member.name}</h3>
                      <span className="text-sm text-gray-500">{member.position}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{member.score} pts</span>
                        <span className={`text-sm ${
                          member.trend === 'up' ? 'text-green-600' : 
                          member.trend === 'down' ? 'text-red-600' : 
                          'text-gray-600'
                        }`}>
                          {member.trend === 'up' ? '↑' : member.trend === 'down' ? '↓' : '→'}
                        </span>
                      </div>
                    </div>
                    {member.topSkill !== '—' && (
                      <p className="text-sm text-gray-600">
                        Top skill: <span className="text-blue-600">{member.topSkill}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleExpand(member.id)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    {expandedMember === member.id ? (
                      <>
                        <ChevronUp className="w-5 h-5" />
                        <span className="text-sm">Thu gọn</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-5 h-5" />
                        <span className="text-sm">Xem chi tiết</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedMember === member.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Work Feed */}
                    <div className="lg:col-span-2">
                      <h4 className="mb-4">Recent Tasks (2 tuần)</h4>
                      <div className="space-y-3">
                        {member.recentTasks.map((task, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-sm flex-1">{task.name}</h5>
                              <span className={`text-xs px-2 py-1 rounded ml-2 ${
                                task.score >= 4.5 ? 'bg-green-100 text-green-700' :
                                task.score >= 3.5 ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                Score: {task.score}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className={`px-2 py-1 rounded ${
                                task.type === 'Feature' ? 'bg-blue-100 text-blue-700' :
                                task.type === 'Bug Fix' ? 'bg-red-100 text-red-700' :
                                'bg-purple-100 text-purple-700'
                              }`}>
                                {task.type}
                              </span>
                              <span className={`px-2 py-1 rounded ${
                                task.difficulty === 'High' ? 'bg-red-100 text-red-700' :
                                task.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {task.difficulty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Insights & Actions */}
                    <div className="lg:col-span-1 space-y-4">
                      <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-lg p-4 text-white">
                        <h4 className="text-sm mb-3 opacity-75">AI Insight</h4>
                        <p className="text-sm leading-relaxed">{member.aiInsight}</p>
                      </div>

                      <div className="space-y-2">
                        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                          <MessageSquare className="w-4 h-4" />
                          Đặt lịch 1:1
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Eye className="w-4 h-4" />
                          Xem Work Profile đầy đủ
                        </button>
                        <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 text-sm">
                          <Send className="w-4 h-4" />
                          Gửi feedback
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
