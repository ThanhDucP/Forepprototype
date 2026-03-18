import { useState } from 'react';
import Layout from '../../components/Layout';
import { DollarSign, Download, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const payrollData = [
  { month: 'T8', amount: 980000000 },
  { month: 'T9', amount: 1050000000 },
  { month: 'T10', amount: 1100000000 },
  { month: 'T11', amount: 1150000000 },
  { month: 'T12', amount: 1180000000 },
  { month: 'T1', amount: 1200000000 },
];

const currentPayroll = [
  { id: 1, name: 'Nguyễn Văn An', department: 'Phát triển', gross: 20000000, net: 17300000, status: 'approved' },
  { id: 2, name: 'Trần Thị Bình', department: 'Phát triển', gross: 25000000, net: 21500000, status: 'approved' },
  { id: 3, name: 'Lê Văn Cường', department: 'Nhân sự', gross: 22000000, net: 19000000, status: 'pending' },
  { id: 4, name: 'Phạm Thị Dung', department: 'Ban lãnh đạo', gross: 50000000, net: 42000000, status: 'approved' },
  { id: 5, name: 'Hoàng Văn Em', department: 'Marketing', gross: 23000000, net: 19800000, status: 'approved' },
];

export default function PayrollManagement() {
  const [selectedMonth, setSelectedMonth] = useState('2026-01');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const totalGross = currentPayroll.reduce((sum, emp) => sum + emp.gross, 0);
  const totalNet = currentPayroll.reduce((sum, emp) => sum + emp.net, 0);
  const totalTax = totalGross - totalNet;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Quản lý lương</h1>
            <p className="text-gray-600">Tính lương và quản lý bảng lương</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Xuất báo cáo
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Chốt bảng lương
            </button>
          </div>
        </div>

        {/* Month Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-600">Chọn tháng:</span>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="2026-01">Tháng 1/2026</option>
              <option value="2025-12">Tháng 12/2025</option>
              <option value="2025-11">Tháng 11/2025</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="text-sm text-blue-100 mb-2">Tổng quỹ lương</div>
            <div className="text-2xl mb-1">{formatCurrency(totalGross)}</div>
            <div className="text-xs text-blue-100">Trước thuế & bảo hiểm</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-2">Thực chi</div>
            <div className="text-2xl mb-1">{formatCurrency(totalNet)}</div>
            <div className="text-xs text-gray-500">Sau thuế & bảo hiểm</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-2">Thuế & BHXH</div>
            <div className="text-2xl mb-1">{formatCurrency(totalTax)}</div>
            <div className="text-xs text-gray-500">Tổng khấu trừ</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-2">Số nhân viên</div>
            <div className="text-2xl mb-1">{currentPayroll.length}</div>
            <div className="text-xs text-gray-500">Trong bảng lương</div>
          </div>
        </div>

        {/* Payroll Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-6">Xu hướng quỹ lương</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Bar dataKey="amount" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payroll Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Bảng lương tháng {selectedMonth}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Nhân viên</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Phòng ban</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tổng lương</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Khấu trừ</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thực lãnh</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentPayroll.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                          {emp.name.charAt(0)}
                        </div>
                        <span>{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{emp.department}</td>
                    <td className="px-6 py-4">{formatCurrency(emp.gross)}</td>
                    <td className="px-6 py-4 text-red-600">{formatCurrency(emp.gross - emp.net)}</td>
                    <td className="px-6 py-4">{formatCurrency(emp.net)}</td>
                    <td className="px-6 py-4">
                      {emp.status === 'approved' ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3" />
                          Đã duyệt
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs flex items-center gap-1 w-fit">
                          <AlertCircle className="w-3 h-3" />
                          Chờ duyệt
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tax Report */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Báo cáo thuế & BHXH</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">Thuế TNCN</div>
                <div className="text-2xl mb-1">{formatCurrency(totalTax * 0.45)}</div>
                <div className="text-xs text-gray-500">Cần nộp cho cơ quan thuế</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">BHXH (8%)</div>
                <div className="text-2xl mb-1">{formatCurrency(totalTax * 0.3)}</div>
                <div className="text-xs text-gray-500">Cần nộp cho BHXH</div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-2">BHYT + BHTN</div>
                <div className="text-2xl mb-1">{formatCurrency(totalTax * 0.25)}</div>
                <div className="text-xs text-gray-500">Cần nộp cho BH</div>
              </div>
            </div>

            <div className="mt-6">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Tải báo cáo quyết toán thuế
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
