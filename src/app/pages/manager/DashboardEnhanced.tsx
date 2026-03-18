import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Target,
  Award,
  TrendingDown,
  ListChecks,
  Trophy
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const teamPerformance = [
  { name: 'W1', avg: 75 },
  { name: 'W2', avg: 78 },
  { name: 'W3', avg: 82 },
  { name: 'W4', avg: 85 },
];

const teamMembers = [
  { 
    id: 1, 
    name: 'Nguyễn Văn An', 
    position: 'Frontend Dev', 
    kpi: 92, 
    trend: 'up', 
    status: 'excellent',
    tasks: { total: 15, completed: 14, inProgress: 1, delayed: 0 },
    ranking: 2,
    warnings: []
  },
  { 
    id: 2, 
    name: 'Trần Thị Bảo', 
    position: 'Backend Dev', 
    kpi: 88, 
    trend: 'up', 
    status: 'good',
    tasks: { total: 12, completed: 10, inProgress: 2, delayed: 0 },
    ranking: 5,
    warnings: ['Chưa hoàn thành khóa học bắt buộc']
  },
  { 
    id: 3, 
    name: 'Lê Văn Cường', 
    position: 'Frontend Dev', 
    kpi: 75, 
    trend: 'down', 
    status: 'needs-attention',
    tasks: { total: 10, completed: 6, inProgress: 2, delayed: 2 },
    ranking: 18,
    warnings: ['Hiệu suất giảm 15% trong 2 tuần', 'Có 2 task delayed']
  },
  { 
    id: 4, 
    name: 'Phạm Thị Dung', 
    position: 'QA Engineer', 
    kpi: 85, 
    trend: 'stable', 
    status: 'good',
    tasks: { total: 14, completed: 12, inProgress: 2, delayed: 0 },
    ranking: 8,
    warnings: []
  },
  { 
    id: 5, 
    name: 'Hoàng Văn Em', 
    position: 'DevOps', 
    kpi: 90, 
    trend: 'up', 
    status: 'excellent',
    tasks: { total: 11, completed: 11, inProgress: 0, delayed: 0 },
    ranking: 3,
    warnings: []
  },
];

const alerts = [
  { id: 1, type: 'warning', member: 'Lê Văn Cường', message: 'Hiệu suất giảm 15% trong 2 tuần', priority: 'high', memberId: 3 },
  { id: 2, type: 'info', member: 'Nguyễn Văn An', message: 'Đủ điều kiện đề xuất thăng Senior', priority: 'medium', memberId: 1 },
  { id: 3, type: 'warning', member: 'Trần Thị Bảo', message: 'Chưa hoàn thành khóa học bắt buộc', priority: 'medium', memberId: 2 },
];

export default function ManagerDashboardEnhanced() {
  const [showMemberDialog, setShowMemberDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleViewMemberDetail = (member: any) => {
    setSelectedMember(member);
    setShowMemberDialog(true);
  };

  const handleViewAlertDetail = (alert: any) => {
    const member = teamMembers.find(m => m.id === alert.memberId);
    if (member) {
      handleViewMemberDetail(member);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Manager Dashboard</h1>
          <p className="text-gray-600">Quản lý hiệu suất và phát triển team</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">5</div>
            <div className="text-sm text-gray-600">Thành viên team</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">85%</div>
            <div className="text-sm text-gray-600">KPI trung bình team</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">1</div>
            <div className="text-sm text-gray-600">Cần can thiệp</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">2</div>
            <div className="text-sm text-gray-600">Top performer</div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Phân tích & Đề xuất cho Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">✅ Điểm mạnh của team</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Team performance tăng đều 13% trong tháng qua</li>
                <li>• 2 thành viên đạt top 10% công ty</li>
                <li>• Tỷ lệ hoàn thành sprint đạt 95%</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">⚠️ Cần chú ý</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Lê Văn Cường: Hiệu suất giảm 15%, cần 1:1 meeting</li>
                <li>• Workload không đồng đều giữa các thành viên</li>
                <li>• Tỷ lệ hoàn thành khóa học chỉ 60%</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">🎯 Đề xuất hành động</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Đề xuất tăng lương cho 2 top performers</li>
                <li>• Tổ chức 1:1 với Lê Văn Cường trong tuần này</li>
                <li>• Xem xét điều chỉnh task distribution</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">📊 Dự đoán</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Team có thể đạt 88% KPI vào cuối tháng</li>
                <li>• Risk: 1 thành viên có nguy cơ burnout</li>
                <li>• Opportunity: 2 người sẵn sàng thăng tiến</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-6">Xu hướng hiệu suất team</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={teamPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="avg" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Thành viên team</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {teamMembers.map((member) => (
              <div key={member.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">KPI Score</div>
                      <div className="text-2xl">{member.kpi}%</div>
                    </div>
                    <div>
                      {member.trend === 'up' && (
                        <div className="flex items-center gap-1 text-green-600">
                          <TrendingUp className="w-5 h-5" />
                          <span className="text-sm">Tăng</span>
                        </div>
                      )}
                      {member.trend === 'down' && (
                        <div className="flex items-center gap-1 text-red-600">
                          <TrendingDown className="w-5 h-5" />
                          <span className="text-sm">Giảm</span>
                        </div>
                      )}
                      {member.trend === 'stable' && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="text-sm">Ổn định</span>
                        </div>
                      )}
                    </div>
                    <div>
                      {member.status === 'excellent' && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          Xuất sắc
                        </span>
                      )}
                      {member.status === 'good' && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          Tốt
                        </span>
                      )}
                      {member.status === 'needs-attention' && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          Cần chú ý
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => handleViewMemberDetail(member)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Cảnh báo & Hành động cần thiết</h2>
          </div>
          <div className="p-6 space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`border rounded-lg p-4 ${
                alert.priority === 'high' ? 'border-red-200 bg-red-50' :
                'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                    alert.priority === 'high' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3>{alert.member}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        alert.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {alert.priority === 'high' ? 'Ưu tiên cao' : 'Trung bình'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                    <button 
                      onClick={() => handleViewAlertDetail(alert)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Member Detail Dialog */}
      <Dialog
        open={showMemberDialog}
        onClose={() => setShowMemberDialog(false)}
        title={`Chi tiết: ${selectedMember?.name || ''}`}
        size="lg"
      >
        {selectedMember && (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
                {selectedMember.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl mb-1">{selectedMember.name}</h3>
                <p className="text-gray-600">{selectedMember.position}</p>
              </div>
            </div>

            {/* Performance Score */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Điểm hiệu suất</span>
                <span className="text-3xl">{selectedMember.kpi}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    selectedMember.kpi >= 90 ? 'bg-green-600' :
                    selectedMember.kpi >= 80 ? 'bg-blue-600' :
                    selectedMember.kpi >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}
                  style={{ width: `${selectedMember.kpi}%` }}
                />
              </div>
            </div>

            {/* Tasks */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ListChecks className="w-5 h-5 text-gray-600" />
                <h4>Tình trạng công việc</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-2xl mb-1">{selectedMember.tasks.completed}</div>
                  <div className="text-sm text-gray-600">Hoàn thành</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl mb-1">{selectedMember.tasks.inProgress}</div>
                  <div className="text-sm text-gray-600">Đang làm</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-2xl mb-1">{selectedMember.tasks.total}</div>
                  <div className="text-sm text-gray-600">Tổng task</div>
                </div>
                <div className={`rounded-lg p-3 ${
                  selectedMember.tasks.delayed > 0 ? 'bg-red-50' : 'bg-green-50'
                }`}>
                  <div className="text-2xl mb-1">{selectedMember.tasks.delayed}</div>
                  <div className="text-sm text-gray-600">Trễ deadline</div>
                </div>
              </div>
            </div>

            {/* Ranking */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                <h4>Xếp hạng trong công ty</h4>
              </div>
              <div className="text-3xl text-purple-600">#{selectedMember.ranking}</div>
              <p className="text-sm text-gray-600 mt-1">
                {selectedMember.ranking <= 10 ? 'Top 10% - Xuất sắc!' :
                 selectedMember.ranking <= 20 ? 'Top 20% - Rất tốt' :
                 'Cần cải thiện'}
              </p>
            </div>

            {/* Warnings */}
            {selectedMember.warnings.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <h4>Cảnh báo</h4>
                </div>
                <div className="space-y-2">
                  {selectedMember.warnings.map((warning: string, index: number) => (
                    <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-gray-700">{warning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedMember.warnings.length === 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-700">Không có cảnh báo. Hiệu suất tốt!</p>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowMemberDialog(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </Dialog>
    </Layout>
  );
}
