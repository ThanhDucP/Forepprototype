import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { 
  Target, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  Clock,
  Award,
  MessageSquare,
  BarChart3,
  Info
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const kpiData = [
  { id: 1, title: 'Hoàn thành sprint tasks', target: 100, current: 95, unit: '%', status: 'on-track', deadline: '2026-02-28' },
  { id: 2, title: 'Code review quality', target: 90, current: 92, unit: '%', status: 'exceeding', deadline: '2026-02-28' },
  { id: 3, title: 'Bug rate', target: 5, current: 3, unit: 'bugs', status: 'exceeding', deadline: '2026-02-28' },
  { id: 4, title: 'Learning hours', target: 20, current: 15, unit: 'hours', status: 'at-risk', deadline: '2026-02-28' },
];

const progressDataByPeriod: Record<string, any[]> = {
  week: [
    { period: 'T2', score: 85 },
    { period: 'T3', score: 87 },
    { period: 'T4', score: 89 },
    { period: 'T5', score: 90 },
    { period: 'T6', score: 92 },
  ],
  month: [
    { period: 'W1', score: 75 },
    { period: 'W2', score: 78 },
    { period: 'W3', score: 82 },
    { period: 'W4', score: 88 },
  ],
  quarter: [
    { period: 'T12', score: 70 },
    { period: 'T1', score: 78 },
    { period: 'T2', score: 88 },
  ],
  year: [
    { period: 'Q1', score: 72 },
    { period: 'Q2', score: 75 },
    { period: 'Q3', score: 80 },
    { period: 'Q4', score: 88 },
  ],
};

const skillsData = [
  { 
    skill: 'React', 
    current: 85, 
    required: 90,
    description: 'Khả năng xây dựng ứng dụng React với performance tốt, sử dụng hooks hiệu quả',
    reason: 'React là framework chính của team. Cần đạt 90 điểm để handle các dự án phức tạp độc lập.',
    gap: 5
  },
  { 
    skill: 'TypeScript', 
    current: 80, 
    required: 85,
    description: 'Sử dụng TypeScript để đảm bảo type safety, generics, utility types',
    reason: 'TypeScript giúp giảm 40% bugs trong production. Yêu cầu bắt buộc cho Senior level.',
    gap: 5
  },
  { 
    skill: 'System Design', 
    current: 70, 
    required: 80,
    description: 'Thiết kế kiến trúc hệ thống, hiểu về scalability, trade-offs',
    reason: 'Kỹ năng quan trọng nhất để lên Senior. Cần biết thiết kế hệ thống quy mô lớn và đưa ra technical decisions.',
    gap: 10
  },
  { 
    skill: 'Communication', 
    current: 90, 
    required: 85,
    description: 'Giao tiếp hiệu quả với team, present ideas rõ ràng, viết documentation tốt',
    reason: 'Communication tốt giúp team collaboration hiệu quả hơn 35%. Bạn đã vượt yêu cầu.',
    gap: 0
  },
  { 
    skill: 'Problem Solving', 
    current: 88, 
    required: 85,
    description: 'Phân tích vấn đề, đưa ra giải pháp tối ưu, debug hiệu quả',
    reason: 'Khả năng giải quyết vấn đề là core skill của developer. Bạn đang ở mức tốt.',
    gap: 0
  },
];

const feedback = [
  { id: 1, from: 'Trần Thị Bình (Manager)', date: '2026-02-20', type: 'positive', message: 'Code quality rất tốt, tiếp tục phát huy!' },
  { id: 2, from: 'Hệ thống AI', date: '2026-02-18', type: 'suggestion', message: 'Nên tăng thời gian học tập để đạt mục tiêu 20h/tháng' },
  { id: 3, from: 'Lê Văn Dũng (Tech Lead)', date: '2026-02-15', type: 'positive', message: 'Giải quyết bug nhanh và hiệu quả' },
];

export default function PerformanceView() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showSkillDialog, setShowSkillDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'on-track':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'at-risk':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'behind':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeding':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'on-track':
        return <Target className="w-5 h-5 text-blue-600" />;
      case 'at-risk':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'behind':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Quản lý hiệu suất</h1>
            <p className="text-gray-600">Theo dõi KPI và mục tiêu cá nhân</p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm nay</option>
          </select>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-2">Điểm hiệu suất tổng thể</h2>
              <p className="text-blue-100">Tháng 2, 2026</p>
            </div>
            <div className="text-right">
              <div className="text-5xl mb-2">92</div>
              <div className="text-blue-100">/ 100</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <span>Tăng 8% so với tháng trước</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">KPI cá nhân</h2>
          </div>
          <div className="p-6 space-y-4">
            {kpiData.map((kpi) => (
              <div key={kpi.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(kpi.status)}
                    <div>
                      <h3 className="mb-1">{kpi.title}</h3>
                      <p className="text-sm text-gray-600">
                        Mục tiêu: {kpi.target}{kpi.unit} | Hiện tại: {kpi.current}{kpi.unit}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(kpi.status)}`}>
                    {kpi.status === 'exceeding' && 'Vượt mục tiêu'}
                    {kpi.status === 'on-track' && 'Đúng kế hoạch'}
                    {kpi.status === 'at-risk' && 'Có rủi ro'}
                    {kpi.status === 'behind' && 'Chậm tiến độ'}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Tiến độ</span>
                    <span>{Math.round((kpi.current / kpi.target) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        kpi.status === 'exceeding' ? 'bg-green-600' :
                        kpi.status === 'on-track' ? 'bg-blue-600' :
                        kpi.status === 'at-risk' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Hạn chót: {new Date(kpi.deadline).toLocaleDateString('vi-VN')}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-6">Xu hướng hiệu suất</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={progressDataByPeriod[selectedPeriod]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="period" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Skills Radar */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl mb-6">Đánh giá kỹ năng</h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={skillsData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#6b7280', fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                <Radar 
                  name="Hiện tại" 
                  dataKey="current" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.5} 
                />
                <Radar 
                  name="Yêu cầu" 
                  dataKey="required" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.25} 
                />
              </RadarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <span>Hiện tại</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-600 rounded-full" />
                <span>Yêu cầu</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Phân tích & Gợi ý AI</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Xu hướng tích cực</h3>
                  <p className="text-sm text-gray-600">
                    Hiệu suất tăng đều 17% trong 4 tuần. AI dự đoán bạn sẽ đạt 95 điểm vào cuối tháng.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Cảnh báo</h3>
                  <p className="text-sm text-gray-600">
                    Giờ học tập thấp hơn mục tiêu 25%. Cần tăng 5h trong 2 tuần tới để đạt KPI.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Điểm mạnh</h3>
                  <p className="text-sm text-gray-600">
                    Code review quality và Communication skills cao nhất trong team. Tiếp tục duy trì!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="mb-2">Đề xuất cải thiện</h3>
                  <p className="text-sm text-gray-600">
                    Học thêm System Design để đạt yêu cầu Senior level. Gợi ý khóa "System Design Interview".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Feedback & Đánh giá</h2>
          </div>
          <div className="p-6 space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className={`w-5 h-5 flex-shrink-0 mt-1 ${
                    item.type === 'positive' ? 'text-green-600' : 'text-blue-600'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3>{item.from}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(item.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{item.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Detail List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Chi tiết đánh giá kỹ năng</h2>
          </div>
          <div className="p-6 space-y-3">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{skill.skill}</h3>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {skill.current}/100
                      </span>
                      {skill.gap > 0 && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">
                          Thiếu {skill.gap} điểm
                        </span>
                      )}
                      {skill.gap === 0 && skill.current >= skill.required && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Đạt yêu cầu
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{skill.description}</p>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Lý do:</strong> {skill.reason}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          skill.gap === 0 ? 'bg-green-600' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${skill.current}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSkill(skill);
                      setShowSkillDialog(true);
                    }}
                    className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Info className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Detail Dialog */}
      <Dialog
        open={showSkillDialog}
        onClose={() => setShowSkillDialog(false)}
        title={selectedSkill?.skill || 'Chi tiết kỹ năng'}
      >
        {selectedSkill && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg">Điểm hiện tại</h3>
                <span className="text-2xl">{selectedSkill.current}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                <div
                  className="h-3 bg-blue-600 rounded-full"
                  style={{ width: `${selectedSkill.current}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Yêu cầu tối thiểu: {selectedSkill.required}</span>
                {selectedSkill.gap > 0 && (
                  <span className="text-red-600">Còn thiếu {selectedSkill.gap} điểm</span>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="mb-2">Mô tả</h4>
              <p className="text-sm text-gray-700">{selectedSkill.description}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Tầm quan trọng
              </h4>
              <p className="text-sm text-gray-700">{selectedSkill.reason}</p>
            </div>

            {selectedSkill.gap > 0 ? (
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  Cần cải thiện
                </h4>
                <p className="text-sm text-gray-700">
                  Bạn cần tăng thêm <strong>{selectedSkill.gap} điểm</strong> để đạt yêu cầu tối thiểu ({selectedSkill.required} điểm). 
                  Đề xuất: tham gia khóa học hoặc làm dự án thực tế để rèn luyện kỹ năng này.
                </p>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Đã đạt yêu cầu
                </h4>
                <p className="text-sm text-gray-700">
                  Bạn đã nắm vững kỹ năng này. Tiếp tục duy trì và áp dụng vào công việc thực tế để nâng cao hơn nữa.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowSkillDialog(false)}
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