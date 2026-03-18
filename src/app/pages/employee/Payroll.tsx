import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  DollarSign, 
  TrendingUp, 
  Download,
  FileText,
  Calendar,
  Info
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salaryHistory = [
  { month: 'T8', salary: 18000000 },
  { month: 'T9', salary: 18000000 },
  { month: 'T10', salary: 19500000 },
  { month: 'T11', salary: 19500000 },
  { month: 'T12', salary: 19500000 },
  { month: 'T1', salary: 20000000 },
];

const currentSalary = {
  basicSalary: 15000000,
  allowances: {
    lunch: 1000000,
    transport: 500000,
    phone: 200000,
    position: 2000000,
  },
  bonuses: {
    performance: 1500000,
    kpi: 800000,
  },
  deductions: {
    pit: 1200000,
    socialInsurance: 1080000,
    healthInsurance: 270000,
    unemploymentInsurance: 150000,
  },
  total: 20000000,
  netSalary: 17300000,
};

const payrollHistory = [
  { id: 1, month: '2026-01', total: 20000000, net: 17300000, status: 'paid', date: '2026-02-05' },
  { id: 2, month: '2025-12', total: 19500000, net: 16900000, status: 'paid', date: '2026-01-05' },
  { id: 3, month: '2025-11', total: 19500000, net: 16900000, status: 'paid', date: '2025-12-05' },
  { id: 4, month: '2025-10', total: 19500000, net: 16900000, status: 'paid', date: '2025-11-05' },
];

export default function PayrollView() {
  const [selectedMonth, setSelectedMonth] = useState('2026-01');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const totalAllowances = Object.values(currentSalary.allowances).reduce((a, b) => a + b, 0);
  const totalBonuses = Object.values(currentSalary.bonuses).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(currentSalary.deductions).reduce((a, b) => a + b, 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Lương & Thưởng</h1>
          <p className="text-gray-600">Quản lý thông tin lương và phúc lợi</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm text-blue-100">Lương tháng này</span>
            </div>
            <div className="text-3xl mb-1">{formatCurrency(currentSalary.netSalary)}</div>
            <div className="text-sm text-blue-100">Sau thuế & bảo hiểm</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Tổng lương cơ bản</span>
            </div>
            <div className="text-3xl mb-1">{formatCurrency(currentSalary.basicSalary)}</div>
            <div className="text-sm text-gray-600">+ Phụ cấp & thưởng</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Ngày trả lương</span>
            </div>
            <div className="text-3xl mb-1">05</div>
            <div className="text-sm text-gray-600">Hàng tháng</div>
          </div>
        </div>

        {/* Salary Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl">Chi tiết lương tháng {selectedMonth}</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Tải phiếu lương
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Income */}
            <div>
              <h3 className="mb-4 flex items-center gap-2">
                <span className="text-lg">Thu nhập</span>
                <span className="text-sm text-gray-500">(+)</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Lương cơ bản</span>
                  <span>{formatCurrency(currentSalary.basicSalary)}</span>
                </div>
                
                <div className="pl-4 space-y-2">
                  <div className="text-sm text-gray-600 mb-2">Phụ cấp:</div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">• Ăn trưa</span>
                    <span className="text-sm">{formatCurrency(currentSalary.allowances.lunch)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">• Đi lại</span>
                    <span className="text-sm">{formatCurrency(currentSalary.allowances.transport)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">• Điện thoại</span>
                    <span className="text-sm">{formatCurrency(currentSalary.allowances.phone)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm text-gray-700">• Chức vụ</span>
                    <span className="text-sm">{formatCurrency(currentSalary.allowances.position)}</span>
                  </div>
                </div>

                <div className="pl-4 space-y-2">
                  <div className="text-sm text-gray-600 mb-2">Thưởng:</div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm text-gray-700">• Thưởng hiệu suất</span>
                    <span className="text-sm text-green-700">{formatCurrency(currentSalary.bonuses.performance)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                    <span className="text-sm text-gray-700">• Thưởng KPI</span>
                    <span className="text-sm text-green-700">{formatCurrency(currentSalary.bonuses.kpi)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span>Tổng thu nhập</span>
                  <span className="text-blue-700">{formatCurrency(currentSalary.total)}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div>
              <h3 className="mb-4 flex items-center gap-2">
                <span className="text-lg">Khấu trừ</span>
                <span className="text-sm text-gray-500">(-)</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Thuế TNCN (PIT)</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-red-700">{formatCurrency(currentSalary.deductions.pit)}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">BHXH (8%)</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-red-700">{formatCurrency(currentSalary.deductions.socialInsurance)}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">BHYT (1.5%)</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-red-700">{formatCurrency(currentSalary.deductions.healthInsurance)}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">BHTN (1%)</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-red-700">{formatCurrency(currentSalary.deductions.unemploymentInsurance)}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <span>Tổng khấu trừ</span>
                  <span className="text-red-700">{formatCurrency(totalDeductions)}</span>
                </div>
              </div>
            </div>

            {/* Net Salary */}
            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Thực lãnh</div>
                  <div className="text-3xl text-green-700">{formatCurrency(currentSalary.netSalary)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Đã chuyển khoản</div>
                  <div className="text-sm text-green-700">05/02/2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Salary History Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-6">Lịch sử lương 6 tháng</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ borderRadius: '8px' }}
              />
              <Bar dataKey="salary" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payroll History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Lịch sử bảng lương</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tháng</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tổng lương</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Thực lãnh</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Ngày trả</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Trạng thái</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Tải về</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payrollHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{record.month}</td>
                    <td className="px-6 py-4">{formatCurrency(record.total)}</td>
                    <td className="px-6 py-4">{formatCurrency(record.net)}</td>
                    <td className="px-6 py-4">{new Date(record.date).toLocaleDateString('vi-VN')}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        Đã thanh toán
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tax Info */}
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-2">Thông tin thuế và bảo hiểm</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Thuế TNCN: Tính theo biểu lũy tiến từng phần theo quy định Việt Nam</li>
                <li>• BHXH: 8% lương đóng BHXH (công ty đóng 17.5%)</li>
                <li>• BHYT: 1.5% lương đóng BHXH (công ty đóng 3%)</li>
                <li>• BHTN: 1% lương đóng BHXH (công ty đóng 1%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
