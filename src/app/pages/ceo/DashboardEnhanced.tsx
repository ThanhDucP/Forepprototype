import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Target,
  AlertCircle,
  Award,
  Building2,
  ArrowUp,
  Info,
  Lightbulb,
  TrendingDown
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const companyPerformance = [
  { month: 'T8', revenue: 2.5, performance: 75 },
  { month: 'T9', revenue: 2.8, performance: 78 },
  { month: 'T10', revenue: 3.1, performance: 82 },
  { month: 'T11', revenue: 3.3, performance: 85 },
  { month: 'T12', revenue: 3.6, performance: 87 },
  { month: 'T1', revenue: 3.9, performance: 90 },
];

const departmentKPIs = [
  { 
    name: 'Phát triển', 
    value: 88, 
    description: 'Team đang hoàn thành sprint đúng deadline với 95% task. Code quality score đạt 88/100.',
    details: 'Velocity: 48 points/sprint | Bug rate: 3% | Team size: 25'
  },
  { 
    name: 'Marketing', 
    value: 85, 
    description: 'Chiến dịch Q1 đạt 125% target leads. Social engagement tăng 40%.',
    details: 'ROI: 3.2x | Conversion rate: 5.2% | Team size: 10'
  },
  { 
    name: 'Sales', 
    value: 92, 
    description: 'Doanh số vượt target 15%. Tỷ lệ chốt deal 35%, cao nhất công ty.',
    details: 'Revenue: 3.2B | Deal size: 120M avg | Team size: 12'
  },
  { 
    name: 'HR', 
    value: 87, 
    description: 'Time to hire giảm 25%. Employee satisfaction 4.2/5. Turnover rate 3.6%.',
    details: 'Hiring: 8 người/tháng | Retention: 96.4% | Team size: 5'
  },
  { 
    name: 'Finance', 
    value: 90, 
    description: 'Báo cáo tài chính đúng hạn 100%. Cost optimization tiết kiệm 12% budget.',
    details: 'Budget accuracy: 97% | Payment on-time: 100% | Team size: 4'
  },
];

const pendingDecisions = [
  {
    id: 1,
    title: 'Mở rộng team Backend',
    type: 'expansion',
    priority: 'high',
    requestedBy: 'Nguyễn Văn Phúc (CTO)',
    date: '2026-02-28',
    description: 'Đề xuất tuyển thêm 3 Backend Developer để đáp ứng 2 dự án lớn Q2',
    impact: 'Budget: +450M VNĐ/năm | Timeline: 2 tháng tuyển dụng',
    reason: 'Workload team tăng 40%, risk delay project nếu không mở rộng'
  },
  {
    id: 2,
    title: 'Tăng lương cho 5 top performers',
    type: 'compensation',
    priority: 'high',
    requestedBy: 'Lê Văn Cường (HR Manager)',
    date: '2026-02-26',
    description: '5 nhân viên vượt KPI 3 quý liên tiếp, có risk churn nếu không tăng lương',
    impact: 'Budget: +75M VNĐ/năm | Retention benefit: Giữ được top talent',
    reason: 'Market salary tăng 15%, cần điều chỉnh để cạnh tranh'
  },
  {
    id: 3,
    title: 'Đầu tư hệ thống CRM mới',
    type: 'technology',
    priority: 'medium',
    requestedBy: 'Hoàng Văn Em (Marketing Manager)',
    date: '2026-02-25',
    description: 'Nâng cấp CRM để tự động hóa marketing workflows và tăng conversion',
    impact: 'Cost: 200M VNĐ/năm | ROI dự kiến: 2.5x trong 18 tháng',
    reason: 'Hệ thống hiện tại không scale được, mất 30% hiệu suất'
  },
];

export default function CEODashboardEnhanced() {
  const [showKPIDialog, setShowKPIDialog] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [showDecisionDialog, setShowDecisionDialog] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<any>(null);

  const handleViewKPIDetail = (kpi: any) => {
    setSelectedKPI(kpi);
    setShowKPIDialog(true);
  };

  const handleViewDecision = (decision: any) => {
    setSelectedDecision(decision);
    setShowDecisionDialog(true);
  };

  const handleApprove = () => {
    toast.success('Quyết định đã được phê duyệt');
    setShowDecisionDialog(false);
  };

  const handleReject = () => {
    toast.success('Quyết định đã bị từ chối');
    setShowDecisionDialog(false);
  };

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

        {/* Pending Decisions */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl">Quyết định cần phê duyệt</h2>
          </div>
          <div className="space-y-3">
            {pendingDecisions.map((decision) => (
              <div key={decision.id} className="bg-white rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3>{decision.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        decision.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {decision.priority === 'high' ? 'Ưu tiên cao' : 'Trung bình'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Đề xuất bởi: {decision.requestedBy}
                    </p>
                    <p className="text-sm text-gray-700">{decision.description}</p>
                  </div>
                  <button 
                    onClick={() => handleViewDecision(decision)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-4"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Performance Chart */}
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
                name="Hiệu suất"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department KPIs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">KPI các phòng ban</h2>
          </div>
          <div className="p-6 space-y-4">
            {departmentKPIs.map((dept) => (
              <div 
                key={dept.name} 
                className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{dept.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        dept.value >= 90 ? 'bg-green-100 text-green-700' :
                        dept.value >= 85 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {dept.value}%
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                    <p className="text-xs text-gray-500">{dept.details}</p>
                  </div>
                  <button
                    onClick={() => handleViewKPIDetail(dept)}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Info className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      dept.value >= 90 ? 'bg-green-600' :
                      dept.value >= 85 ? 'bg-blue-600' :
                      'bg-yellow-600'
                    }`}
                    style={{ width: `${dept.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CEO Profile */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-4">Thông tin CEO</h2>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl">
              P
            </div>
            <div className="flex-1">
              <h3 className="text-2xl mb-1">Phạm Thị Dung</h3>
              <p className="text-gray-600 mb-4">Chief Executive Officer</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Thời gian nắm giữ vị trí</div>
                  <div className="text-xl">6 năm</div>
                  <p className="text-sm text-gray-500 mt-1">Từ 01/2020</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Thành tích nổi bật</div>
                  <ul className="text-sm space-y-1">
                    <li>• Tăng trưởng doanh thu 250% trong 5 năm</li>
                    <li>• Mở rộng từ 1 lên 3 chi nhánh</li>
                    <li>• Tăng quy mô từ 20 lên 56 nhân sự</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights for CEO */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Gợi ý công nghệ và kinh doanh</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                <h3>Cơ hội công nghệ</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• AI/ML: Áp dụng automation cho marketing, tiết kiệm 40% chi phí</li>
                <li>• Cloud migration: Giảm 30% infrastructure cost</li>
                <li>• Data analytics: Tăng decision-making speed 2x</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
                <h3>Xu hướng thị trường</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Nhu cầu digital transformation tăng 60% trong ngành</li>
                <li>• Remote work: Cơ hội mở rộng talent pool toàn quốc</li>
                <li>• Green tech: Khách hàng ưu tiên vendor bền vững</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <h3>Rủi ro cần quan tâm</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Talent competition: 15% top performers có risk churn</li>
                <li>• Budget pressure: Lương thị trường tăng 12%/năm</li>
                <li>• Tech debt: Cần đầu tư 500M để modernize systems</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-2 mb-2">
                <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                <h3>Đề xuất chiến lược</h3>
              </div>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Đầu tư R&D 15% revenue để dẫn đầu innovation</li>
                <li>• Partnership với 2-3 tech vendors lớn</li>
                <li>• Mở thêm 1 chi nhánh tại Cần Thơ (market gap)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Detail Dialog */}
      <Dialog
        open={showKPIDialog}
        onClose={() => setShowKPIDialog(false)}
        title={`Chi tiết KPI: ${selectedKPI?.name || ''}`}
      >
        {selectedKPI && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Điểm KPI</span>
                <span className="text-3xl">{selectedKPI.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full ${
                    selectedKPI.value >= 90 ? 'bg-green-600' :
                    selectedKPI.value >= 85 ? 'bg-blue-600' :
                    'bg-yellow-600'
                  }`}
                  style={{ width: `${selectedKPI.value}%` }}
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="mb-2">Mô tả</h4>
              <p className="text-sm text-gray-700">{selectedKPI.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="mb-2">Chi tiết metrics</h4>
              <p className="text-sm text-gray-700">{selectedKPI.details}</p>
            </div>

            <button
              onClick={() => setShowKPIDialog(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </Dialog>

      {/* Decision Detail Dialog */}
      <Dialog
        open={showDecisionDialog}
        onClose={() => setShowDecisionDialog(false)}
        title="Chi tiết quyết định"
        size="lg"
      >
        {selectedDecision && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Tiêu đề</div>
                  <div>{selectedDecision.title}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Loại quyết định</div>
                  <div className="capitalize">{selectedDecision.type}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Người tạo</div>
                  <div>{selectedDecision.requestedBy}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Ngày tạo</div>
                  <div>{new Date(selectedDecision.date).toLocaleDateString('vi-VN')}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Mô tả chi tiết
              </h4>
              <p className="text-sm text-gray-700">{selectedDecision.description}</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="mb-2">Tác động</h4>
              <p className="text-sm text-gray-700">{selectedDecision.impact}</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="mb-2">Lý do cần quyết định</h4>
              <p className="text-sm text-gray-700">{selectedDecision.reason}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Phê duyệt
              </button>
              <button
                onClick={handleReject}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Từ chối
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </Layout>
  );
}
