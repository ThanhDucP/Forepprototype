import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Target, TrendingUp, Users, Award, MessageSquare, Calendar, Plus, Info } from 'lucide-react';
import { toast } from 'sonner';

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

const meetingSchedule = [
  {
    id: 1,
    employee: 'Lê Văn Cường',
    date: 'Thứ 5, 27/02/2026 - 14:00',
    priority: 'high',
    reason: 'Hiệu suất giảm 15% trong 2 tuần',
    details: 'Nhân viên đang gặp khó khăn với task React Advanced. Cần trao đổi về workload và support kỹ thuật.',
    status: 'upcoming'
  },
  {
    id: 2,
    employee: 'Nguyễn Văn An',
    date: 'Thứ 6, 28/02/2026 - 15:00',
    priority: 'medium',
    reason: 'Review thăng tiến lên Senior Developer',
    details: 'Nhân viên đã đạt 92% KPI và hoàn thành 3/5 kỹ năng yêu cầu Senior. Thảo luận roadmap 2-3 tháng tới.',
    status: 'upcoming'
  },
];

export default function TeamPerformanceEnhanced() {
  const [selectedKPI, setSelectedKPI] = useState(teamKPIs[0]);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [showMeetingDetailDialog, setShowMeetingDetailDialog] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<any>(null);
  
  const [meetingForm, setMeetingForm] = useState({
    employee: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  const [reviewForm, setReviewForm] = useState({
    employeeName: 'Nguyễn Văn An',
    kpiScore: '92',
    feedback: '',
    strengths: '',
    improvements: ''
  });

  const handleCreateMeeting = () => {
    setMeetingForm({ employee: '', date: '', time: '', reason: '', notes: '' });
    setShowMeetingDialog(true);
  };

  const handleSaveMeeting = () => {
    toast.info('Chức năng này chưa sẵn sàng lưu. Đang trong giai đoạn phát triển.');
  };

  const handleViewMeetingDetail = (meeting: any) => {
    setSelectedMeeting(meeting);
    setShowMeetingDetailDialog(true);
  };

  const handleReview = () => {
    setShowReviewDialog(true);
  };

  const handleSaveReview = () => {
    toast.info('Chức năng này chưa sẵn sàng lưu. Đang trong giai đoạn phát triển.');
  };

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
              <button 
                onClick={handleCreateMeeting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Tạo lịch mới
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {meetingSchedule.map((meeting) => (
              <div key={meeting.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="mb-1">{meeting.employee}</h3>
                      <p className="text-sm text-gray-600">{meeting.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      meeting.priority === 'high' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {meeting.priority === 'high' ? 'Ưu tiên cao' : meeting.reason}
                    </span>
                    <button 
                      onClick={() => handleViewMeetingDetail(meeting)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
                  <button 
                    onClick={handleReview}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Đánh giá ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Meeting Dialog */}
      <Dialog
        open={showMeetingDialog}
        onClose={() => setShowMeetingDialog(false)}
        title="Tạo lịch 1:1 Meeting"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Nhân viên *</label>
            <select
              value={meetingForm.employee}
              onChange={(e) => setMeetingForm({ ...meetingForm, employee: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn nhân viên</option>
              <option value="Nguyễn Văn An">Nguyễn Văn An</option>
              <option value="Trần Thị Bảo">Trần Thị Bảo</option>
              <option value="Lê Văn Cường">Lê Văn Cường</option>
              <option value="Phạm Thị Dung">Phạm Thị Dung</option>
              <option value="Hoàng Văn Em">Hoàng Văn Em</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-2">Ngày *</label>
              <input
                type="date"
                value={meetingForm.date}
                onChange={(e) => setMeetingForm({ ...meetingForm, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Giờ *</label>
              <input
                type="time"
                value={meetingForm.time}
                onChange={(e) => setMeetingForm({ ...meetingForm, time: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Lý do meeting *</label>
            <input
              type="text"
              value={meetingForm.reason}
              onChange={(e) => setMeetingForm({ ...meetingForm, reason: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Review hiệu suất, Thảo luận thăng tiến..."
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Ghi chú</label>
            <textarea
              value={meetingForm.notes}
              onChange={(e) => setMeetingForm({ ...meetingForm, notes: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Các điểm cần thảo luận..."
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              ⚠️ Chức năng này đang trong giai đoạn phát triển và chưa sẵn sàng lưu dữ liệu.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveMeeting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tạo lịch
            </button>
            <button
              onClick={() => setShowMeetingDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>

      {/* Meeting Detail Dialog */}
      <Dialog
        open={showMeetingDetailDialog}
        onClose={() => setShowMeetingDetailDialog(false)}
        title="Chi tiết 1:1 Meeting"
      >
        {selectedMeeting && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Nhân viên</div>
                  <div>{selectedMeeting.employee}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Thời gian</div>
                  <div>{selectedMeeting.date}</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="mb-2 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                Lý do cần meet 1:1
              </h4>
              <p className="text-sm text-gray-700">{selectedMeeting.reason}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="mb-2">Chi tiết</h4>
              <p className="text-sm text-gray-700">{selectedMeeting.details}</p>
            </div>

            <button
              onClick={() => setShowMeetingDetailDialog(false)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </Dialog>

      {/* Review Dialog */}
      <Dialog
        open={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        title="Đánh giá KPI"
        size="lg"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-sm text-gray-600 mb-1">Nhân viên</div>
                <div>{reviewForm.employeeName}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">KPI tự đánh giá</div>
                <div className="text-2xl text-blue-600">{reviewForm.kpiScore}%</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Feedback tổng quan *</label>
            <textarea
              value={reviewForm.feedback}
              onChange={(e) => setReviewForm({ ...reviewForm, feedback: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Đánh giá tổng quan về hiệu suất làm việc trong tháng..."
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Điểm mạnh *</label>
            <textarea
              value={reviewForm.strengths}
              onChange={(e) => setReviewForm({ ...reviewForm, strengths: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Những điểm làm tốt cần duy trì..."
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Cần cải thiện *</label>
            <textarea
              value={reviewForm.improvements}
              onChange={(e) => setReviewForm({ ...reviewForm, improvements: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              placeholder="Các điểm cần cải thiện trong tháng tới..."
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              ⚠️ Chức năng này đang trong giai đoạn phát triển và chưa sẵn sàng lưu dữ liệu.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveReview}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Lưu đánh giá
            </button>
            <button
              onClick={() => setShowReviewDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>
    </Layout>
  );
}
