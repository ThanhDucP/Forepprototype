import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Search, Filter, UserPlus, Edit, FileText, Mail, Phone, MapPin, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const employees = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@company.com', phone: '0912345678', position: 'Frontend Developer', department: 'Phát triển', branch: 'HN', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@company.com', phone: '0912345679', position: 'Team Lead', department: 'Phát triển', branch: 'HN', status: 'active', joinDate: '2021-03-20' },
  { id: 3, name: 'Lê Văn Cường', email: 'cuong.le@company.com', phone: '0912345680', position: 'HR Manager', department: 'Nhân sự', branch: 'HN', status: 'active', joinDate: '2022-06-10' },
  { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@company.com', phone: '0912345681', position: 'CEO', department: 'Ban lãnh đạo', branch: 'HN', status: 'active', joinDate: '2020-01-01' },
  { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@company.com', phone: '0912345682', position: 'Marketing Manager', department: 'Marketing', branch: 'SG', status: 'active', joinDate: '2022-08-15' },
];

export default function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showContractDialog, setShowContractDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    branch: '',
    joinDate: '',
    salary: ''
  });

  const handleAddEmployee = () => {
    setEmployeeForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      branch: '',
      joinDate: '',
      salary: ''
    });
    setShowAddDialog(true);
  };

  const handleSaveEmployee = () => {
    toast.info('Chức năng này chưa sẵn sàng lưu. Đang trong giai đoạn phát triển.');
  };

  const handleImportExcel = () => {
    toast.info('Chức năng import từ Excel đang được phát triển.');
  };

  const handleViewContract = (contractInfo: any) => {
    setSelectedContract(contractInfo);
    setShowContractDialog(true);
  };

  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = filterDept === 'all' || emp.department === filterDept;
    return matchSearch && matchDept;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Quản lý nhân sự</h1>
            <p className="text-gray-600">Quản lý hồ sơ và thông tin nhân viên</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2" onClick={handleAddEmployee}>
            <UserPlus className="w-5 h-5" />
            Thêm nhân viên mới
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row gap-4">
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
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả phòng ban</option>
              <option value="Phát triển">Phát triển</option>
              <option value="Marketing">Marketing</option>
              <option value="Nhân sự">Nhân sự</option>
              <option value="Ban lãnh đạo">Ban lãnh đạo</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Bộ lọc
            </button>
          </div>
        </div>

        {/* Employee List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Nhân viên</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Liên hệ</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Vị trí</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Phòng ban</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Chi nhánh</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Ngày vào</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <div>{emp.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{emp.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{emp.position}</td>
                    <td className="px-6 py-4">{emp.department}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{emp.branch}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{new Date(emp.joinDate).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {emp.status === 'active' ? 'Đang làm việc' : 'Nghỉ việc'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contract Management */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Hợp đồng lao động cần xử lý</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Hoàng Thị Lan - Hợp đồng thử việc</h3>
                  <p className="text-sm text-gray-600">Hết hạn: 15/03/2026</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Cần ký
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => handleViewContract({name: 'Hoàng Thị Lan', contractType: 'Hợp đồng thử việc', endDate: '15/03/2026'})}>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Nguyễn Văn An - Gia hạn hợp đồng</h3>
                  <p className="text-sm text-gray-600">Hợp đồng chính thức 3 năm</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Đã ký
                  </span>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => handleViewContract({name: 'Nguyễn Văn An', contractType: 'Gia hạn hợp đồng', contractDetails: 'Hợp đồng chính thức 3 năm'})}>
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Employee Dialog */}
      <Dialog open={showAddDialog} onClose={() => setShowAddDialog(false)} title="Thêm nhân viên mới" size="lg">
        <div className="space-y-4">
          {/* Import Option */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1">Import từ Excel</h3>
                <p className="text-sm text-gray-600">Tải lên file Excel để thêm nhiều nhân viên cùng lúc</p>
              </div>
              <button
                onClick={handleImportExcel}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Chọn file
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc nhập thủ công</span>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Tên nhân viên *</label>
              <input
                type="text"
                value={employeeForm.name}
                onChange={(e) => setEmployeeForm({...employeeForm, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="VD: Nguyễn Văn A"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email *</label>
              <input
                type="email"
                value={employeeForm.email}
                onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@company.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Số điện thoại *</label>
              <input
                type="text"
                value={employeeForm.phone}
                onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0912345678"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Vị trí *</label>
              <input
                type="text"
                value={employeeForm.position}
                onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="VD: Frontend Developer"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Phòng ban *</label>
              <select
                value={employeeForm.department}
                onChange={(e) => setEmployeeForm({...employeeForm, department: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn phòng ban</option>
                <option value="Phát triển">Phát triển</option>
                <option value="Marketing">Marketing</option>
                <option value="Nhân sự">Nhân sự</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Chi nhánh *</label>
              <select
                value={employeeForm.branch}
                onChange={(e) => setEmployeeForm({...employeeForm, branch: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Chọn chi nhánh</option>
                <option value="HN">Hà Nội</option>
                <option value="SG">Hồ Chí Minh</option>
                <option value="DN">Đà Nẵng</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Ngày vào làm *</label>
              <input
                type="date"
                value={employeeForm.joinDate}
                onChange={(e) => setEmployeeForm({...employeeForm, joinDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Mức lương (VNĐ) *</label>
              <input
                type="text"
                value={employeeForm.salary}
                onChange={(e) => setEmployeeForm({...employeeForm, salary: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="VD: 15,000,000"
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              ⚠️ Chức năng này đang trong giai đoạn phát triển và chưa sẵn sàng lưu dữ liệu.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveEmployee}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu nhân viên
            </button>
            <button
              onClick={() => setShowAddDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>

      {/* Contract Detail Dialog */}
      <Dialog open={showContractDialog} onClose={() => setShowContractDialog(false)} title="Chi tiết hợp đồng lao động">
        {selectedContract && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Nhân viên</div>
                  <div>{selectedContract.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại hợp đồng</div>
                  <div>{selectedContract.contractType}</div>
                </div>
                {selectedContract.endDate && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Ngày hết hạn</div>
                    <div>{selectedContract.endDate}</div>
                  </div>
                )}
                {selectedContract.contractDetails && (
                  <div className="col-span-2">
                    <div className="text-sm text-gray-600 mb-1">Chi tiết</div>
                    <div>{selectedContract.contractDetails}</div>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => setShowContractDialog(false)}
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