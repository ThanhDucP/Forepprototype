import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Calendar, CheckCircle2, XCircle, Clock, Info } from 'lucide-react';
import { toast } from 'sonner';

const leaveRequests = [
  {
    id: 1,
    employeeName: 'Nguyễn Văn An',
    department: 'Engineering',
    leaveType: 'Nghỉ phép năm',
    startDate: '2026-03-10',
    endDate: '2026-03-12',
    days: 3,
    reason: 'Du lịch gia đình',
    status: 'pending',
    submittedDate: '2026-02-25',
    approver: 'Trần Thị Bình (Manager)',
  },
  {
    id: 2,
    employeeName: 'Lê Văn Cường',
    department: 'Engineering',
    leaveType: 'Nghỉ ốm',
    startDate: '2026-03-02',
    endDate: '2026-03-02',
    days: 1,
    reason: 'Không khỏe',
    status: 'pending',
    submittedDate: '2026-03-01',
    approver: 'Trần Thị Bình (Manager)',
    urgent: true,
  },
  {
    id: 3,
    employeeName: 'Phạm Thị Dung',
    department: 'QA',
    leaveType: 'Nghỉ phép năm',
    startDate: '2026-02-20',
    endDate: '2026-02-21',
    days: 2,
    reason: 'Công việc gia đình',
    status: 'approved',
    submittedDate: '2026-02-15',
    approver: 'Trần Thị Bình (Manager)',
    approvedDate: '2026-02-16',
  },
  {
    id: 4,
    employeeName: 'Hoàng Văn Em',
    department: 'DevOps',
    leaveType: 'Nghỉ không lương',
    startDate: '2026-03-15',
    endDate: '2026-03-20',
    days: 6,
    reason: 'Việc cá nhân',
    status: 'rejected',
    submittedDate: '2026-02-26',
    approver: 'Trần Thị Bình (Manager)',
    rejectedDate: '2026-02-27',
    rejectReason: 'Trùng sprint deadline, cần hoãn lại',
  },
];

export default function LeaveRequests() {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const handleViewDetail = (request: any) => {
    setSelectedRequest(request);
    setShowDetailDialog(true);
  };

  const handleApprove = (request: any) => {
    toast.success(`Đã phê duyệt đơn nghỉ phép của ${request.employeeName}`);
    setShowDetailDialog(false);
  };

  const handleReject = (request: any) => {
    toast.success(`Đã từ chối đơn nghỉ phép của ${request.employeeName}`);
    setShowDetailDialog(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'approved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Đã từ chối';
      default:
        return status;
    }
  };

  const filteredRequests = leaveRequests.filter(req => {
    if (filter === 'all') return true;
    return req.status === filter;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Quản lý đơn nghỉ phép</h1>
          <p className="text-gray-600">Xử lý và phê duyệt đơn nghỉ phép của nhân viên</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">{leaveRequests.length}</div>
            <div className="text-sm text-gray-600">Tổng số đơn</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">
              {leaveRequests.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Chờ duyệt</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">
              {leaveRequests.filter(r => r.status === 'approved').length}
            </div>
            <div className="text-sm text-gray-600">Đã duyệt</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">
              {leaveRequests.filter(r => r.status === 'rejected').length}
            </div>
            <div className="text-sm text-gray-600">Đã từ chối</div>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chờ duyệt
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'approved'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === 'rejected'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Đã từ chối
          </button>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Danh sách đơn nghỉ phép</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Nhân viên</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Phòng ban</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Loại nghỉ</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Từ ngày</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Đến ngày</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Số ngày</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {request.employeeName}
                        {request.urgent && (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                            Urgent
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{request.department}</td>
                    <td className="px-6 py-4">{request.leaveType}</td>
                    <td className="px-6 py-4">
                      {new Date(request.startDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(request.endDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">{request.days} ngày</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleViewDetail(request)}
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
        title="Chi tiết đơn nghỉ phép"
        size="lg"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Nhân viên</div>
                  <div>{selectedRequest.employeeName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phòng ban</div>
                  <div>{selectedRequest.department}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại nghỉ phép</div>
                  <div>{selectedRequest.leaveType}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Số ngày nghỉ</div>
                  <div>{selectedRequest.days} ngày</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Từ ngày</div>
                  <div>{new Date(selectedRequest.startDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Đến ngày</div>
                  <div>{new Date(selectedRequest.endDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ngày nộp đơn</div>
                  <div>{new Date(selectedRequest.submittedDate).toLocaleDateString('vi-VN')}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Người phê duyệt</div>
                  <div>{selectedRequest.approver}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Lý do nghỉ
              </h4>
              <p className="text-sm text-gray-700">{selectedRequest.reason}</p>
            </div>

            {selectedRequest.status === 'approved' && selectedRequest.approvedDate && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Đã phê duyệt</span>
                </div>
                <p className="text-sm text-gray-700">
                  Ngày duyệt: {new Date(selectedRequest.approvedDate).toLocaleDateString('vi-VN')}
                </p>
              </div>
            )}

            {selectedRequest.status === 'rejected' && selectedRequest.rejectReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-red-700 mb-2">
                  <XCircle className="w-5 h-5" />
                  <span>Đã từ chối</span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  Ngày từ chối: {new Date(selectedRequest.rejectedDate).toLocaleDateString('vi-VN')}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Lý do:</strong> {selectedRequest.rejectReason}
                </p>
              </div>
            )}

            {selectedRequest.status === 'pending' && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(selectedRequest)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Phê duyệt
                </button>
                <button
                  onClick={() => handleReject(selectedRequest)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Từ chối
                </button>
              </div>
            )}

            {selectedRequest.status !== 'pending' && (
              <button
                onClick={() => setShowDetailDialog(false)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đóng
              </button>
            )}
          </div>
        )}
      </Dialog>
    </Layout>
  );
}
