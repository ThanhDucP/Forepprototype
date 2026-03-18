import Layout from '../../components/Layout';
import { useNavigate } from 'react-router';
import { 
  Users, 
  UserPlus, 
  UserMinus,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const headcountTrend = [
  { month: 'T8', count: 45 },
  { month: 'T9', count: 48 },
  { month: 'T10', count: 50 },
  { month: 'T11', count: 52 },
  { month: 'T12', count: 54 },
  { month: 'T1', count: 56 },
];

const departmentDistribution = [
  { name: 'Phát triển', value: 25, color: '#3b82f6' },
  { name: 'Marketing', value: 10, color: '#10b981' },
  { name: 'Sales', value: 12, color: '#f59e0b' },
  { name: 'HR', value: 5, color: '#8b5cf6' },
  { name: 'Finance', value: 4, color: '#ef4444' },
];

const pendingTasks = [
  { id: 1, type: 'contract', title: '3 hợp đồng cần ký', priority: 'high', route: '/hr/contracts' },
  { id: 2, type: 'approval', title: '5 đơn nghỉ phép chờ duyệt', priority: 'medium', route: '/hr/leave-requests' },
  { id: 3, type: 'onboarding', title: '2 nhân viên mới onboarding tuần sau', priority: 'high', route: '/hr/onboarding' },
  { id: 4, type: 'review', title: '8 đánh giá hiệu suất cần xử lý', priority: 'medium', route: '/hr/employees' },
];

export default function HRDashboard() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">HR Dashboard</h1>
          <p className="text-gray-600">Tổng quan quản lý nhân sự</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">56</div>
            <div className="text-sm text-gray-600">Tổng nhân sự</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">8</div>
            <div className="text-sm text-gray-600">Tuyển mới tháng này</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <UserMinus className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">2</div>
            <div className="text-sm text-gray-600">Nghỉ việc tháng này</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">1.2B</div>
            <div className="text-sm text-gray-600">Quỹ lương tháng</div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl">Công việc cần xử lý</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <h3 className="mb-1">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {task.priority === 'high' ? 'Ưu tiên cao' : 'Trung bình'}
                  </span>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigate(task.route)}>
                  Xử lý
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Headcount Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-6">Xu hướng biến động nhân sự</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={headcountTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-6">Phân bố theo phòng ban</h2>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={departmentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {departmentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Hoạt động gần đây</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1">Nhân viên mới được tạo</h3>
                  <p className="text-sm text-gray-600">Hoàng Thị Lan - Frontend Developer - Chi nhánh HN</p>
                  <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="mb-1">Đơn nghỉ phép được duyệt</h3>
                  <p className="text-sm text-gray-600">3 đơn nghỉ phép đã được phê duyệt</p>
                  <p className="text-xs text-gray-500 mt-1">4 giờ trước</p>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-1">Bảng lương đã được chốt</h3>
                  <p className="text-sm text-gray-600">Bảng lương tháng 1/2026 - Tổng: 1.2B VNĐ</p>
                  <p className="text-xs text-gray-500 mt-1">1 ngày trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Phân tích & Đề xuất HR</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">📊 Tình hình tổng thể</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tỷ lệ tăng trưởng nhân sự: +24% so với 6 tháng trước</li>
                <li>• Turnover rate: 3.6% (thấp hơn trung bình ngành)</li>
                <li>• Mức độ hài lòng nhân viên: 4.2/5</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">⚠️ Cảnh báo</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 5 nhân viên có risk churn cao (đã ở lâu, hiệu suất giảm)</li>
                <li>• Team Marketing thiếu 2 headcount theo kế hoạch</li>
                <li>• Quỹ lương tăng 8% - cần review budget</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">🎯 Đề xuất hành động</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tổ chức 1:1 với 5 nhân viên risk churn</li>
                <li>• Đẩy nhanh tuyển dụng cho Marketing team</li>
                <li>• Xem xét điều chỉnh salary band cho vị trí Senior</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">🌟 Cơ hội</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 8 nhân viên đủ điều kiện thăng tiến</li>
                <li>• Có thể mở thêm 2 team mới với nguồn lực hiện tại</li>
                <li>• Skill level tổng thể tăng 15% trong quý</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}