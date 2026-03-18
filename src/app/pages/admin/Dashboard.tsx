import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Users, Settings, Shield, Database, Activity, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const systemUsers = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@company.com', role: 'employee', status: 'active', lastLogin: '2026-02-27 14:30' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@company.com', role: 'manager', status: 'active', lastLogin: '2026-02-27 15:20' },
  { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@company.com', role: 'hr', status: 'active', lastLogin: '2026-02-27 10:15' },
];

const systemConfig = [
  { id: 1, key: 'work_hours_per_day', value: '8', description: 'Số giờ làm việc chuẩn mỗi ngày' },
  { id: 2, key: 'annual_leave_days', value: '12', description: 'Số ngày phép năm mặc định' },
  { id: 3, key: 'probation_days', value: '60', description: 'Thời gian thử việc (ngày)' },
  { id: 4, key: 'check_in_radius', value: '100', description: 'Bán kính cho phép chấm công (mét)' },
];

export default function AdminDashboard() {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editingConfig, setEditingConfig] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    password: '',
  });

  const [configFormData, setConfigFormData] = useState({
    key: '',
    value: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'employee', password: '' });
    setErrors({});
    setShowUserDialog(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
    });
    setErrors({});
    setShowUserDialog(true);
  };

  const validateUserForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!editingUser && !formData.password.trim()) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveUser = () => {
    if (!validateUserForm()) {
      return;
    }

    if (editingUser) {
      toast.success('Cập nhật người dùng thành công!');
    } else {
      toast.success('Tạo người dùng mới thành công!');
    }
    setShowUserDialog(false);
  };

  const handleDeleteUser = (user: any) => {
    if (confirm(`Bạn có chắc muốn xóa người dùng ${user.name}?`)) {
      toast.success('Xóa người dùng thành công!');
    }
  };

  const handleEditConfig = (config: any) => {
    setEditingConfig(config);
    setConfigFormData({
      key: config.key,
      value: config.value,
      description: config.description,
    });
    setShowConfigDialog(true);
  };

  const handleSaveConfig = () => {
    if (!configFormData.value.trim()) {
      toast.error('Giá trị không được để trống');
      return;
    }

    toast.success('Cập nhật cấu hình thành công!');
    setShowConfigDialog(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Quản lý hệ thống và cấu hình</p>
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
            <div className="text-sm text-gray-600">Tổng người dùng</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">48</div>
            <div className="text-sm text-gray-600">Đang hoạt động</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">5</div>
            <div className="text-sm text-gray-600">Vai trò</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">99.9%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl">Quản lý người dùng</h2>
            <button
              onClick={handleCreateUser}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Tạo người dùng mới
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tên</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Vai trò</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Đăng nhập cuối</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {systemUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {user.status === 'active' ? 'Hoạt động' : 'Vô hiệu'}
                      </span>
                    </td>
                    <td className="px-6 py-4">{user.lastLogin}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Cấu hình hệ thống</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {systemConfig.map((config) => (
              <div key={config.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1">{config.key}</h3>
                    <p className="text-sm text-gray-600 mb-2">{config.description}</p>
                    <div className="text-sm">
                      <span className="text-gray-600">Giá trị hiện tại: </span>
                      <span className="px-2 py-1 bg-gray-100 rounded">{config.value}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditConfig(config)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Dialog */}
      <Dialog
        open={showUserDialog}
        onClose={() => setShowUserDialog(false)}
        title={editingUser ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Họ và tên *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Nguyễn Văn A"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Vai trò *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="employee">Nhân viên</option>
              <option value="manager">Quản lý</option>
              <option value="hr">HR</option>
              <option value="ceo">CEO</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Mật khẩu {!editingUser && '*'}
              {editingUser && <span className="text-gray-500 text-xs">(để trống nếu không đổi)</span>}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveUser}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingUser ? 'Cập nhật' : 'Tạo mới'}
            </button>
            <button
              onClick={() => setShowUserDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>

      {/* Config Dialog */}
      <Dialog
        open={showConfigDialog}
        onClose={() => setShowConfigDialog(false)}
        title="Chỉnh sửa cấu hình"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Khóa cấu hình</label>
            <input
              type="text"
              value={configFormData.key}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Mô tả</label>
            <input
              type="text"
              value={configFormData.description}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Giá trị *</label>
            <input
              type="text"
              value={configFormData.value}
              onChange={(e) => setConfigFormData({ ...configFormData, value: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSaveConfig}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={() => setShowConfigDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>
    </Layout>
  );
}
