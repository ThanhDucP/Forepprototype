import { useNavigate } from 'react-router';
import Layout from '../../components/Layout';
import { Users, Settings, Database, Activity, Shield, Server, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const systemActivity = [
  { time: '00:00', requests: 120, users: 5 },
  { time: '04:00', requests: 80, users: 3 },
  { time: '08:00', requests: 450, users: 25 },
  { time: '12:00', requests: 680, users: 42 },
  { time: '16:00', requests: 550, users: 35 },
  { time: '20:00', requests: 320, users: 18 },
];

const systemLogs = [
  { id: 1, type: 'info', message: 'User login: an.nguyen@company.com', time: '14:30:25' },
  { id: 2, type: 'warning', message: 'High memory usage: 85%', time: '14:25:10' },
  { id: 3, type: 'success', message: 'Database backup completed', time: '14:00:00' },
  { id: 4, type: 'error', message: 'Failed login attempt: admin@company.com', time: '13:45:32' },
  { id: 5, type: 'info', message: 'Configuration updated: work_hours_per_day', time: '13:30:15' },
];

export default function AdminDashboardEnhanced() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Quản trị và giám sát hệ thống</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl mb-1">56</div>
            <div className="text-sm text-blue-100">Tổng người dùng</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl mb-1">42</div>
            <div className="text-sm text-gray-600">Đang online</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl mb-1">2.4GB</div>
            <div className="text-sm text-gray-600">Database size</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Server className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl mb-1">99.8%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/admin/users')}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 transition-colors text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">5 users</span>
            </div>
            <h3 className="mb-1">Quản lý người dùng</h3>
            <p className="text-sm text-gray-600">Tạo, chỉnh sửa và phân quyền người dùng</p>
          </button>

          <button
            onClick={() => navigate('/admin/config')}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 transition-colors text-left"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">9 configs</span>
            </div>
            <h3 className="mb-1">Cấu hình hệ thống</h3>
            <p className="text-sm text-gray-600">Quản lý thông số cấu hình toàn hệ thống</p>
          </button>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600">Active</span>
            </div>
            <h3 className="mb-1">Bảo mật</h3>
            <p className="text-sm text-gray-600">Không có cảnh báo bảo mật</p>
          </div>
        </div>

        {/* System Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-6">Hoạt động hệ thống</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="requests" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Requests"
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System Health */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-4">Tình trạng hệ thống</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">CPU Usage</span>
                  <span className="text-sm">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Memory</span>
                  <span className="text-sm">68%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-green-600 rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Disk Space</span>
                  <span className="text-sm">32%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-purple-600 rounded-full" style={{ width: '32%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Network</span>
                  <span className="text-sm">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-orange-600 rounded-full" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* System Logs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-4">System Logs</h2>
            <div className="space-y-3">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    log.type === 'error' ? 'bg-red-600' :
                    log.type === 'warning' ? 'bg-yellow-600' :
                    log.type === 'success' ? 'bg-green-600' :
                    'bg-blue-600'
                  }`} />
                  <div className="flex-1">
                    <p className="text-gray-700">{log.message}</p>
                    <p className="text-xs text-gray-500">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Alerts */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="mb-2">Khuyến nghị bảo mật</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Có 3 người dùng chưa kích hoạt xác thực 2 yếu tố (2FA)</li>
                <li>• 2 mật khẩu yếu cần thay đổi</li>
                <li>• Cần cập nhật backup định kỳ hàng tuần</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
