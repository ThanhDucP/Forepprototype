import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';
import { 
  Clock, 
  TrendingUp, 
  Calendar, 
  Award,
  Target,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { month: 'T1', score: 75 },
  { month: 'T2', score: 78 },
  { month: 'T3', score: 82 },
  { month: 'T4', score: 85 },
  { month: 'T5', score: 88 },
  { month: 'T6', score: 92 },
];

const recentActivities = [
  { id: 1, type: 'success', message: 'Hoàn thành KPI tháng 6 đạt 92%', time: '2 giờ trước' },
  { id: 2, type: 'info', message: 'Có 1 khóa học mới được đề xuất', time: '5 giờ trước' },
  { id: 3, type: 'warning', message: 'Còn 3 ngày phép chưa sử dụng', time: '1 ngày trước' },
  { id: 4, type: 'success', message: 'Nhận được phản hồi tích cực từ manager', time: '2 ngày trước' },
];

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl mb-2">Xin chào, {user?.name}! 👋</h1>
          <p className="text-blue-100">Chúc bạn có một ngày làm việc hiệu quả</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                5%
              </span>
            </div>
            <div className="text-2xl mb-1">168h</div>
            <div className="text-sm text-gray-600">Giờ làm tháng này</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="flex items-center gap-1 text-green-600 text-sm">
                <ArrowUp className="w-4 h-4" />
                8%
              </span>
            </div>
            <div className="text-2xl mb-1">92%</div>
            <div className="text-sm text-gray-600">Hiệu suất KPI</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">3 ngày</div>
            <div className="text-sm text-gray-600">Phép năm còn lại</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">Top 15%</div>
            <div className="text-sm text-gray-600">Xếp hạng phòng ban</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl mb-6">Xu hướng hiệu suất</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl mb-4">Hành động nhanh</h2>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/employee/attendance')}
                className="w-full p-4 bg-blue-50 rounded-lg text-left hover:bg-blue-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span>Chấm công</span>
                </div>
              </button>
              <button 
                onClick={() => navigate('/employee/performance')}
                className="w-full p-4 bg-green-50 rounded-lg text-left hover:bg-green-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Cập nhật KPI</span>
                </div>
              </button>
              <button 
                onClick={() => navigate('/employee/attendance')}
                className="w-full p-4 bg-purple-50 rounded-lg text-left hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>Đăng ký nghỉ phép</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* AI Suggestions & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Suggestions */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">AI</span>
              </div>
              <h2 className="text-xl">Gợi ý AI cho bạn</h2>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4">
                <h3 className="mb-2">📈 Hiệu suất tăng trưởng tốt</h3>
                <p className="text-sm text-gray-600">
                  Bạn đã cải thiện 17% trong 6 tháng qua. Tiếp tục duy trì!
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="mb-2">🎯 Kỹ năng nên phát triển</h3>
                <p className="text-sm text-gray-600">
                  Học React Advanced để đạt mục tiêu Senior Developer
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="mb-2">⚡ Cơ hội thăng tiến</h3>
                <p className="text-sm text-gray-600">
                  Bạn đang ở top 15%. Thêm 2 kỹ năng nữa để đủ điều kiện Team Lead
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl mb-4">Hoạt động gần đây</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="mt-1">
                    {activity.type === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                    {activity.type === 'info' && (
                      <AlertCircle className="w-5 h-5 text-blue-600" />
                    )}
                    {activity.type === 'warning' && (
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}