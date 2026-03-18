import Layout from '../../components/Layout';
import { 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Target,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const teamPerformance = [
  { name: 'W1', avg: 75 },
  { name: 'W2', avg: 78 },
  { name: 'W3', avg: 82 },
  { name: 'W4', avg: 85 },
];

const teamMembers = [
  { id: 1, name: 'Nguyễn Văn An', position: 'Frontend Dev', kpi: 92, trend: 'up', status: 'excellent' },
  { id: 2, name: 'Trần Thị Bảo', position: 'Backend Dev', kpi: 88, trend: 'up', status: 'good' },
  { id: 3, name: 'Lê Văn Cường', position: 'Frontend Dev', kpi: 75, trend: 'down', status: 'needs-attention' },
  { id: 4, name: 'Phạm Thị Dung', position: 'QA Engineer', kpi: 85, trend: 'stable', status: 'good' },
  { id: 5, name: 'Hoàng Văn Em', position: 'DevOps', kpi: 90, trend: 'up', status: 'excellent' },
];

const alerts = [
  { id: 1, type: 'warning', member: 'Lê Văn Cường', message: 'Hiệu suất giảm 15% trong 2 tuần', priority: 'high' },
  { id: 2, type: 'info', member: 'Nguyễn Văn An', message: 'Đủ điều kiện đề xuất thăng Senior', priority: 'medium' },
  { id: 3, type: 'warning', member: 'Trần Thị Bảo', message: 'Chưa hoàn thành khóa học bắt buộc', priority: 'medium' },
];

export default function ManagerDashboard() {
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
                          <TrendingUp className="w-5 h-5 rotate-180" />
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
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
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
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      Xem chi tiết →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
