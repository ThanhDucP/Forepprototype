import { useState } from 'react';
import { Calendar, Clock, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';
import { Dialog } from '../../components/Dialog';

export default function OneOnOne() {
  const [expandedMeeting, setExpandedMeeting] = useState<number | null>(null);
  const [showNewMeetingDialog, setShowNewMeetingDialog] = useState(false);
  const [formData, setFormData] = useState({
    employee: '',
    date: '',
    time: '',
    reason: '',
    notes: ''
  });

  const upcomingMeetings = [
    {
      id: 1,
      employee: 'Lê Văn Cường',
      date: 'Thu 27/02/2025',
      time: '14:00',
      priority: 'HIGH',
      priorityColor: 'bg-red-100 text-red-700',
      reason: 'Performance drop',
      aiPrep: {
        dataPoints: [
          'Performance: 64pts (↓ từ 79pts, -19%)',
          'Task pattern: nhiều Bug Fix, ít Feature — có thể bị kéo vào firefighting',
          'System Design task cuối cùng: 2 tuần trước',
          'Chưa học khóa bắt buộc Q1'
        ],
        discussionPoints: [
          'Workload thực tế — có bị overload không?',
          'Task type: có muốn làm Feature nhiều hơn không?',
          'Khóa học chưa hoàn thành — blockers là gì?'
        ],
        note: '⚠️ Lead quyết định — AI chỉ cung cấp dữ liệu'
      }
    },
    {
      id: 2,
      employee: 'Nguyễn Văn An',
      date: 'Fri 28/02/2025',
      time: '10:00',
      priority: 'MEDIUM',
      priorityColor: 'bg-yellow-100 text-yellow-700',
      reason: 'Promotion review',
      aiPrep: {
        dataPoints: [
          'Performance: 87pts — top 20% team',
          'React skill: L3→L4 đang tiến triển tốt',
          'Đã hoàn thành 2/3 requirements cho Senior',
          'Còn thiếu: System Design L4, Testing L3'
        ],
        discussionPoints: [
          'Tiến độ lộ trình Senior — dự kiến 3-4 tháng',
          'Gap skills: System Design và Testing',
          'Có muốn nhận task System Design nhiều hơn?'
        ],
        note: 'Đang trên đà tốt. Có thể discuss promotion timeline.'
      }
    }
  ];

  const pastMeetings = [
    {
      id: 101,
      employee: 'Trần Thị Bảo',
      date: 'Mon 17/02/2025',
      outcomes: 'Discussed course completion. Agreed to finish "Advanced Node.js" by end of month.',
      feedback: 'Performance ổn định. Cần focus vào learning goal.'
    },
    {
      id: 102,
      employee: 'Hoàng Văn Em',
      date: 'Fri 14/02/2025',
      outcomes: 'Great performance. Discussed taking on mentoring role for junior DevOps.',
      feedback: 'Ready for more responsibility. Will assign mentoring task.'
    }
  ];

  const teamMembers = ['Nguyễn Văn An', 'Trần Thị Bảo', 'Lê Văn Cường', 'Phạm Thị Dung', 'Hoàng Văn Em'];

  const toggleExpand = (meetingId: number) => {
    setExpandedMeeting(expandedMeeting === meetingId ? null : meetingId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('New 1:1 meeting:', formData);
    setShowNewMeetingDialog(false);
    setFormData({ employee: '', date: '', time: '', reason: '', notes: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">1:1 Meetings</h1>
            <p className="text-gray-600">AI chuẩn bị data — bạn quyết định hướng thảo luận</p>
          </div>
          <button
            onClick={() => setShowNewMeetingDialog(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New 1:1
          </button>
        </div>

        {/* Upcoming Meetings */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Upcoming 1:1s</h2>
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Meeting Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl">{meeting.employee}</h3>
                        <span className={`text-xs px-3 py-1 rounded ${meeting.priorityColor}`}>
                          {meeting.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{meeting.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{meeting.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="text-gray-500">Reason:</span> {meeting.reason}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleExpand(meeting.id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      {expandedMeeting === meeting.id ? (
                        <>
                          <ChevronUp className="w-5 h-5" />
                          <span className="text-sm">Hide AI Prep</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5" />
                          <span className="text-sm">AI Prep Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* AI Prep Brief (Expandable) */}
                {expandedMeeting === meeting.id && (
                  <div className="border-t border-gray-200 bg-gray-50 p-6">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <div className="mb-6">
                        <h4 className="mb-3 flex items-center gap-2">
                          📊 <span>Data tuần qua:</span>
                        </h4>
                        <ul className="space-y-2 ml-6">
                          {meeting.aiPrep.dataPoints.map((point, idx) => (
                            <li key={idx} className="text-sm text-gray-700 list-disc">{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="mb-3 flex items-center gap-2">
                          💡 <span>Điểm gợi ý thảo luận:</span>
                        </h4>
                        <ul className="space-y-2 ml-6">
                          {meeting.aiPrep.discussionPoints.map((point, idx) => (
                            <li key={idx} className="text-sm text-gray-700 list-disc">{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700">{meeting.aiPrep.note}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Past Meetings */}
        <div>
          <h2 className="text-xl mb-4">Past 1:1s</h2>
          <div className="space-y-3">
            {pastMeetings.map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="mb-1">{meeting.employee}</h3>
                    <p className="text-sm text-gray-500">{meeting.date}</p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Outcomes:</span>
                    <p className="text-gray-700 mt-1">{meeting.outcomes}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Feedback:</span>
                    <p className="text-gray-700 mt-1">{meeting.feedback}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Meeting Dialog */}
        <Dialog open={showNewMeetingDialog} onClose={() => setShowNewMeetingDialog(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Schedule New 1:1</h2>
              <button
                onClick={() => setShowNewMeetingDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Employee</label>
                <select
                  value={formData.employee}
                  onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select employee...</option>
                  {teamMembers.map((member, idx) => (
                    <option key={idx} value={member}>{member}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Reason</label>
                <input
                  type="text"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Performance review, Career discussion..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Notes (optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Any additional notes..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Schedule
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewMeetingDialog(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
