import { useState } from 'react';
import Layout from '../../components/Layout';
import { Target, TrendingUp, Users, Award, MessageSquare, Calendar } from 'lucide-react';

const teamKPIs = [
  {
    id: 1,
    title: 'Sprint Velocity',
    owner: 'Team',
    target: 50,
    current: 48,
    unit: 'points',
    status: 'on-track',
    members: [
      { name: 'Nguyễn Văn An', contribution: 15 },
      { name: 'Trần Thị Bảo', contribution: 12 },
      { name: 'Lê Văn Cường', contribution: 8 },
      { name: 'Phạm Thị Dung', contribution: 7 },
      { name: 'Hoàng Văn Em', contribution: 6 },
    ]
  },
  {
    id: 2,
    title: 'Code Quality Score',
    owner: 'Team',
    target: 85,
    current: 88,
    unit: '%',
    status: 'exceeding',
  },
  {
    id: 3,
    title: 'Bug Resolution Time',
    owner: 'Team',
    target: 24,
    current: 20,
    unit: 'hours',
    status: 'exceeding',
  },
];

export default function TeamPerformance() {
  const [selectedKPI, setSelectedKPI] = useState(teamKPIs[0]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Quản lý hiệu suất Team</h1>
          <p className="text-gray-600">Thiết lập và theo dõi KPI team</p>
        </div>

        {/* Team KPIs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">KPI Team</h2>
          </div>
          <div className="p-6 space-y-4">
            {teamKPIs.map((kpi) => (
              <div key={kpi.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <Target className="w-5 h-5 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="mb-1">{kpi.title}</h3>
                      <p className="text-sm text-gray-600">
                        Mục tiêu: {kpi.target}{kpi.unit} | Hiện tại: {kpi.current}{kpi.unit}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    kpi.status === 'exceeding' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {kpi.status === 'exceeding' ? 'Vượt mục tiêu' : 'Đúng kế hoạch'}
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
                        kpi.status === 'exceeding' ? 'bg-green-600' : 'bg-blue-600'
                      }`}
                      style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                {kpi.members && (
                  <button
                    onClick={() => setSelectedKPI(kpi)}
                    className="text-sm text-blue-600 hover:text-blue-700 mt-2"
                  >
                    Xem đóng góp từng thành viên →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Member Contributions */}
        {selectedKPI.members && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl">Đóng góp: {selectedKPI.title}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {selectedKPI.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-32 text-sm text-gray-700">{member.name}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: `${(member.contribution / selectedKPI.current) * 100}%` }}
                          />
                        </div>
                        <div className="w-20 text-right text-sm">{member.contribution} {selectedKPI.unit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 1:1 Meeting Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl">Lịch 1:1 Meeting</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Tạo lịch mới
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="mb-1">Lê Văn Cường</h3>
                    <p className="text-sm text-gray-600">Thứ 5, 27/02/2026 - 14:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                    Ưu tiên cao
                  </span>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="mb-1">Nguyễn Văn An</h3>
                    <p className="text-sm text-gray-600">Thứ 6, 28/02/2026 - 15:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Review thăng tiến
                  </span>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Feedback cần xử lý</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-start gap-4">
                <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3>Nguyễn Văn An - KPI Tháng 2</h3>
                    <span className="text-sm text-gray-500">Chờ phê duyệt</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Nhân viên đã tự đánh giá KPI: 92%. Cần manager xác nhận và đưa feedback.
                  </p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Đánh giá ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
