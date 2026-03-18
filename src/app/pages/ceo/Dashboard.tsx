import Layout from '../../components/Layout';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target,
  AlertCircle,
  Award,
  Building2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const companyPerformance = [
  { month: 'T8', revenue: 2.5, performance: 75 },
  { month: 'T9', revenue: 2.8, performance: 78 },
  { month: 'T10', revenue: 3.1, performance: 82 },
  { month: 'T11', revenue: 3.3, performance: 85 },
  { month: 'T12', revenue: 3.6, performance: 87 },
  { month: 'T1', revenue: 3.9, performance: 90 },
];

const departmentPerformance = [
  { department: 'Phát triển', kpi: 88, budget: 95, headcount: 90 },
  { department: 'Marketing', kpi: 85, budget: 88, headcount: 85 },
  { department: 'Sales', kpi: 92, budget: 90, headcount: 95 },
  { department: 'HR', kpi: 87, budget: 85, headcount: 80 },
];

const departmentKPIs = [
  { name: 'Phát triển', value: 88 },
  { name: 'Marketing', value: 85 },
  { name: 'Sales', value: 92 },
  { name: 'HR', value: 87 },
  { name: 'Finance', value: 90 },
];

const branchPerformance = [
  { branch: 'Hà Nội', employees: 35, revenue: 2.1, kpi: 88 },
  { branch: 'TP HCM', employees: 15, revenue: 1.5, kpi: 85 },
  { branch: 'Đà Nẵng', employees: 6, revenue: 0.3, kpi: 82 },
];

export default function CEODashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">CEO Dashboard</h1>
          <p className="text-gray-600">Tổng quan chiến lược và điều hành</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5" />
              <span className="text-sm text-blue-100">Tổng nhân sự</span>
            </div>
            <div className="text-3xl mb-1">56</div>
            <div className="flex items-center gap-1 text-sm text-blue-100">
              <ArrowUp className="w-4 h-4" />
              <span>+8 so với tháng trước</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">KPI Công ty</span>
            </div>
            <div className="text-3xl mb-1">90%</div>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <ArrowUp className="w-4 h-4" />
              <span>+5% so với quý trước</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-600">Quỹ lương tháng</span>
            </div>
            <div className="text-3xl mb-1">1.2B</div>
            <div className="flex items-center gap-1 text-sm text-purple-600">
              <ArrowUp className="w-4 h-4" />
              <span>+8% so với tháng trước</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Số chi nhánh</span>
            </div>
            <div className="text-3xl mb-1">3</div>
            <div className="text-sm text-gray-500">Đang hoạt động</div>
          </div>
        </div>

        {/* AI Strategic Insights */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Phân tích Chiến lược & Quyết định</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">🎯 Điểm mạnh</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Performance tăng 20% trong 6 tháng - xu hướng rất tốt</li>
                <li>• Sales team vượt KPI 12%, có thể mở rộng quy mô</li>
                <li>• Turnover rate 3.6% - thấp hơn 40% so với ngành</li>
                <li>• Chi nhánh HN đạt hiệu suất cao nhất (88%)</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">⚠️ Rủi ro cần chú ý</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Chi nhánh Đà Nẵng: KPI thấp (82%), cần can thiệp</li>
                <li>• Quỹ lương tăng 8% nhưng revenue chỉ tăng 5%</li>
                <li>• 5 nhân viên key có risk churn cao</li>
                <li>• Marketing team thiếu 2 headcount theo kế hoạch</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">💡 Đề xuất chiến lược</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Tăng 15% headcount cho Sales (ROI cao nhất)</li>
                <li>• Xem xét điều chỉnh chiến lược tại Đà Nẵng</li>
                <li>• Đề xuất tăng lương cho 8 nhân viên top performer</li>
                <li>• Invest thêm vào training cho team Performance thấp</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">📊 Dự báo</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Q2 2026: KPI công ty có thể đạt 93% nếu duy trì</li>
                <li>• Nếu tăng headcount Sales, dự báo revenue +18%</li>
                <li>• Risk: 3 key positions có thể thiếu người trong 3 tháng</li>
                <li>• Opportunity: Mở chi nhánh mới tại Cần Thơ</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Performance Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-6">Xu hướng hiệu suất công ty</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={companyPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="performance" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                  name="KPI (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Department KPI Radar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-6">KPI các phòng ban</h2>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={departmentKPIs}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                <Radar 
                  name="KPI" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Hiệu suất theo chi nhánh</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Chi nhánh</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Nhân sự</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Doanh thu (tỷ)</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">KPI</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Hiệu suất/nhân sự</th>
                  <th className="px-6 py-3 text-left text-sm text-gray-600">Đánh giá</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {branchPerformance.map((branch, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span>{branch.branch}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{branch.employees} người</td>
                    <td className="px-6 py-4">{branch.revenue} tỷ</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 w-20">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${branch.kpi}%` }}
                          />
                        </div>
                        <span>{branch.kpi}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {(branch.revenue / branch.employees * 1000).toFixed(0)}M/người
                    </td>
                    <td className="px-6 py-4">
                      {branch.kpi >= 85 ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          Xuất sắc
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          Cần cải thiện
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Performance Matrix */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Ma trận hiệu suất phòng ban</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {departmentPerformance.map((dept, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="mb-3">{dept.department}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">KPI</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${dept.kpi}%` }}
                          />
                        </div>
                        <span className="text-sm">{dept.kpi}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Budget Usage</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-green-600 rounded-full"
                            style={{ width: `${dept.budget}%` }}
                          />
                        </div>
                        <span className="text-sm">{dept.budget}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Headcount</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-purple-600 rounded-full"
                            style={{ width: `${dept.headcount}%` }}
                          />
                        </div>
                        <span className="text-sm">{dept.headcount}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Decisions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Quyết định cần phê duyệt</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3>Đề xuất tăng lương cho 8 nhân viên top performer</h3>
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      Ưu tiên cao
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Tổng ngân sách: 150M/tháng. AI đánh giá: ROI cao, giảm risk churn 80%
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Phê duyệt
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3>Mở rộng team Sales - tuyển thêm 5 người</h3>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      Trung bình
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Dự báo tăng revenue 18% trong Q2. Headcount budget còn 12M
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Phê duyệt
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
