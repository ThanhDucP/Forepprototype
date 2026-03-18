import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Users, Plus, Edit, Trash2, Search, Shield } from 'lucide-react';
import { toast } from 'sonner';

const systemUsers = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@company.com', role: 'employee', status: 'active', lastLogin: '2026-02-27 14:30', department: 'Phát triển' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@company.com', role: 'manager', status: 'active', lastLogin: '2026-02-27 15:20', department: 'Phát triển' },
  { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@company.com', role: 'hr', status: 'active', lastLogin: '2026-02-27 10:15', department: 'Nhân sự' },
  { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@company.com', role: 'ceo', status: 'active', lastLogin: '2026-02-28 09:00', department: 'Ban lãnh đạo' },
  { id: 5, name: 'Admin System', email: 'admin@company.com', role: 'admin', status: 'active', lastLogin: '2026-03-02 08:00', department: 'IT' },
];

export default function UserManagement() {
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleCreateUser = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'employee', department: '', password: '' });
    setErrors({});
    setShowUserDialog(true);
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
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
    if (validateUserForm()) {
      toast.success(editingUser ? 'Cập nhật người dùng thành công!' : 'Tạo người dùng thành công!');
      setShowUserDialog(false);
    }
  };

  const handleDeleteUser = (user: any) => {
    if (confirm(`Bạn có chắc muốn xóa người dùng ${user.name}?`)) {
      toast.success('Xóa người dùng thành công!');
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Admin</span>;
      case 'ceo':
        return <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">CEO</span>;
      case 'hr':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">HR</span>;
      case 'manager':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Manager</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">Employee</span>;
    }
  };

  const filteredUsers = systemUsers.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = filterRole === 'all' || user.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Quản lý người dùng</h1>
            <p className="text-gray-600">Quản lý tài khoản và phân quyền hệ thống</p>
          </div>
          <button
            onClick={handleCreateUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Tạo người dùng
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">{systemUsers.length}</div>
            <div className="text-sm text-gray-600">Tổng người dùng</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">{systemUsers.filter(u => u.role === 'admin').length}</div>
            <div className="text-sm text-gray-600">Admin</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">{systemUsers.filter(u => u.role === 'manager').length}</div>
            <div className="text-sm text-gray-600">Manager</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">{systemUsers.filter(u => u.role === 'hr').length}</div>
            <div className="text-sm text-gray-600">HR</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-2xl mb-1">{systemUsers.filter(u => u.role === 'employee').length}</div>
            <div className="text-sm text-gray-600">Employee</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo tên, email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="admin">Admin</option>
              <option value="ceo">CEO</option>
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Người dùng</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Email</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Phòng ban</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Vai trò</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Đăng nhập cuối</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                          {user.name.charAt(0)}
                        </div>
                        <div>{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.department}</td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status === 'active' ? 'Hoạt động' : 'Vô hiệu hóa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
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
      </div>

      {/* User Dialog */}
      <Dialog
        open={showUserDialog}
        onClose={() => setShowUserDialog(false)}
        title={editingUser ? 'Chỉnh sửa người dùng' : 'Tạo người dùng mới'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Tên *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="VD: Nguyễn Văn A"
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
              placeholder="email@company.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Phòng ban *</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Phát triển"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Vai trò *</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="hr">HR</option>
              <option value="ceo">CEO</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              {editingUser ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu *'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Tối thiểu 6 ký tự"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="flex gap-3">
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
    </Layout>
  );
}
