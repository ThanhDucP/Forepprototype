import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const contracts = [
  {
    id: 1,
    employeeName: 'Hoàng Thị Lan',
    contractType: 'Hợp đồng thử việc',
    startDate: '2026-03-05',
    endDate: '2026-05-05',
    salary: '15,000,000',
    department: 'Engineering',
    position: 'Frontend Developer',
    status: 'pending-signature',
    assignedTo: 'Lê Văn Cường (HR)',
    createdDate: '2026-02-28',
  },
  {
    id: 2,
    employeeName: 'Nguyễn Văn Minh',
    contractType: 'Hợp đồng chính thức',
    startDate: '2026-03-10',
    endDate: '2027-03-10',
    salary: '25,000,000',
    department: 'Engineering',
    position: 'Backend Developer',
    status: 'pending-signature',
    assignedTo: 'Lê Văn Cường (HR)',
    createdDate: '2026-03-01',
  },
  {
    id: 3,
    employeeName: 'Trần Thị Nga',
    contractType: 'Hợp đồng thử việc',
    startDate: '2026-02-28',
    endDate: '2026-04-28',
    salary: '18,000,000',
    department: 'Design',
    position: 'UI/UX Designer',
    status: 'signed',
    assignedTo: 'Lê Văn Cường (HR)',
    createdDate: '2026-02-20',
    signedDate: '2026-02-27',
  },
];

export default function Contracts() {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  const handleViewDetail = (contract: any) => {
    setSelectedContract(contract);
    setShowDetailDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending-signature':
        return 'bg-yellow-100 text-yellow-700';
      case 'signed':
        return 'bg-green-100 text-green-700';
      case 'expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending-signature':
        return 'Chờ ký';
      case 'signed':
        return 'Đã ký';
      case 'expired':
        return 'Hết hạn';
      default:
        return status;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Quản lý hợp đồng lao động</h1>
          <p className="text-gray-600">Theo dõi và xử lý hợp đồng cần ký</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">{contracts.length}</div>
            <div className="text-sm text-gray-600">Tổng số hợp đồng</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">
              {contracts.filter(c => c.status === 'pending-signature').length}
            </div>
            <div className="text-sm text-gray-600">Chờ ký</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">
              {contracts.filter(c => c.status === 'signed').length}
            </div>
            <div className="text-sm text-gray-600">Đã ký</div>
          </div>
        </div>

        {/* Contracts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Danh sách hợp đồng</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Nhân viên</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Loại hợp đồng</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Vị trí</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thời hạn</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Người phụ trách</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{contract.employeeName}</td>
                    <td className="px-6 py-4">{contract.contractType}</td>
                    <td className="px-6 py-4">{contract.position}</td>
                    <td className="px-6 py-4">
                      {new Date(contract.startDate).toLocaleDateString('vi-VN')} - 
                      {' '}{new Date(contract.endDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">{contract.assignedTo}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contract.status)}`}>
                        {getStatusText(contract.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetail(contract)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Xem chi tiết →
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
        title="Thông tin hợp đồng lao động"
        size="lg"
      >
        {selectedContract && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h3 className="mb-3">THÔNG TIN NGƯỜI LAO ĐỘNG</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Họ và tên</div>
                  <div>{selectedContract.employeeName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Vị trí</div>
                  <div>{selectedContract.position}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phòng ban</div>
                  <div>{selectedContract.department}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Mức lương</div>
                  <div className="text-lg">{selectedContract.salary} VNĐ</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="mb-3">THÔNG TIN HỢP ĐỒNG</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại hợp đồng</div>
                  <div>{selectedContract.contractType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Trạng thái</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedContract.status)}`}>
                      {getStatusText(selectedContract.status)}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ngày bắt đầu</div>
                  <div>{new Date(selectedContract.startDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ngày kết thúc</div>
                  <div>{new Date(selectedContract.endDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ngày tạo</div>
                  <div>{new Date(selectedContract.createdDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Người phụ trách</div>
                  <div>{selectedContract.assignedTo}</div>
                </div>
                {selectedContract.signedDate && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Ngày ký</div>
                    <div>{new Date(selectedContract.signedDate).toLocaleDateString('vi-VN')}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="mb-2">ĐIỀU KHOẢN CHÍNH</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Thời gian làm việc: 8h/ngày, 5 ngày/tuần (T2-T6)</li>
                <li>• Chế độ BHXH, BHYT, BHTN theo quy định pháp luật</li>
                <li>• Nghỉ phép năm: 12 ngày/năm</li>
                <li>• Thời gian thử việc: {selectedContract.contractType.includes('thử việc') ? '2 tháng' : 'Không'}</li>
                <li>• Địa điểm làm việc: Tòa nhà ABC, Hà Nội</li>
              </ul>
            </div>

            {selectedContract.status === 'pending-signature' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Hợp đồng đang chờ ký. Vui lòng liên hệ với nhân viên để hoàn tất thủ tục ký kết.
                </p>
              </div>
            )}

            {selectedContract.status === 'signed' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  Hợp đồng đã được ký kết vào ngày {new Date(selectedContract.signedDate).toLocaleDateString('vi-VN')}.
                </p>
              </div>
            )}

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
