import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { UserPlus, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';

const onboardingList = [
  {
    id: 1,
    name: 'Hoàng Thị Lan',
    position: 'Frontend Developer',
    department: 'Engineering',
    startDate: '2026-03-05',
    status: 'pending',
    progress: 30,
    tasks: [
      { name: 'Ký hợp đồng lao động', completed: true },
      { name: 'Cấp tài khoản email & hệ thống', completed: true },
      { name: 'Nhận laptop & thiết bị', completed: false },
      { name: 'Đào tạo onboarding', completed: false },
      { name: 'Gặp team & manager', completed: false },
    ],
    assignedTo: 'Lê Văn Cường (HR)',
  },
  {
    id: 2,
    name: 'Nguyễn Văn Minh',
    position: 'Backend Developer',
    department: 'Engineering',
    startDate: '2026-03-10',
    status: 'scheduled',
    progress: 0,
    tasks: [
      { name: 'Ký hợp đồng lao động', completed: false },
      { name: 'Cấp tài khoản email & hệ thống', completed: false },
      { name: 'Nhận laptop & thiết bị', completed: false },
      { name: 'Đào tạo onboarding', completed: false },
      { name: 'Gặp team & manager', completed: false },
    ],
    assignedTo: 'Lê Văn Cường (HR)',
  },
  {
    id: 3,
    name: 'Trần Thị Nga',
    position: 'UI/UX Designer',
    department: 'Design',
    startDate: '2026-02-28',
    status: 'in-progress',
    progress: 80,
    tasks: [
      { name: 'Ký hợp đồng lao động', completed: true },
      { name: 'Cấp tài khoản email & hệ thống', completed: true },
      { name: 'Nhận laptop & thiết bị', completed: true },
      { name: 'Đào tạo onboarding', completed: true },
      { name: 'Gặp team & manager', completed: false },
    ],
    assignedTo: 'Lê Văn Cường (HR)',
  },
];

export default function Onboarding() {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const handleViewDetail = (employee: any) => {
    setSelectedEmployee(employee);
    setShowDetailDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'in-progress':
        return 'bg-purple-100 text-purple-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Đã lên lịch';
      case 'pending':
        return 'Chờ xử lý';
      case 'in-progress':
        return 'Đang thực hiện';
      case 'completed':
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Onboarding nhân viên mới</h1>
          <p className="text-gray-600">Quản lý quy trình onboarding cho nhân viên mới</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">3</div>
            <div className="text-sm text-gray-600">Tổng số người mới</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">1</div>
            <div className="text-sm text-gray-600">Đang onboarding</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">1</div>
            <div className="text-sm text-gray-600">Chờ xử lý</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">1</div>
            <div className="text-sm text-gray-600">Đã lên lịch</div>
          </div>
        </div>

        {/* Onboarding List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Danh sách nhân viên mới</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tên</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Vị trí</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Phòng ban</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Ngày bắt đầu</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tiến độ</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {onboardingList.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{employee.name}</td>
                    <td className="px-6 py-4">{employee.position}</td>
                    <td className="px-6 py-4">{employee.department}</td>
                    <td className="px-6 py-4">
                      {new Date(employee.startDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 min-w-[80px]">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${employee.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{employee.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(employee.status)}`}>
                        {getStatusText(employee.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetail(employee)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Chi tiết →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog
        open={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
        title={`Chi tiết onboarding: ${selectedEmployee?.name || ''}`}
        size="lg"
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Vị trí</div>
                  <div>{selectedEmployee.position}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phòng ban</div>
                  <div>{selectedEmployee.department}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ngày bắt đầu</div>
                  <div>{new Date(selectedEmployee.startDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Người phụ trách</div>
                  <div>{selectedEmployee.assignedTo}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3">Tiến độ onboarding</h4>
              <div className="space-y-2">
                {selectedEmployee.tasks.map((task: any, index: number) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      task.completed
                        ? 'bg-green-50 border-green-200'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={task.completed ? 'text-gray-700' : 'text-gray-600'}>
                      {task.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="mb-2">Tiến độ tổng thể</h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{ width: `${selectedEmployee.progress}%` }}
                  />
                </div>
                <span className="text-xl">{selectedEmployee.progress}%</span>
              </div>
            </div>

            <button
              onClick={() => setShowDetailDialog(false)}
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
