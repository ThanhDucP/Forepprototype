import { BookOpen, Play, CheckCircle, Flame, TrendingUp } from 'lucide-react';
import Layout from '../../components/Layout';

export default function Learning() {
  const recommendedCourses = [
    {
      priority: 'high',
      priorityIcon: '🔥',
      priorityLabel: 'Cao',
      title: 'System Design Fundamentals',
      reason: 'Thiếu 2 level để lên Senior',
      provider: 'Coursera',
      duration: '15h',
      skillGap: 'System Design L2→L4'
    },
    {
      priority: 'high',
      priorityIcon: '🔥',
      priorityLabel: 'Cao',
      title: 'Testing with Jest & React Testing Library',
      reason: 'Gap Testing L2→L3',
      provider: 'Internal',
      duration: '6h',
      skillGap: 'Testing L2→L3'
    },
    {
      priority: 'medium',
      priorityIcon: '📈',
      priorityLabel: 'Trung bình',
      title: 'API Design Best Practices',
      reason: 'Dùng nhiều trong task nhưng chưa formal',
      provider: 'Internal',
      duration: '4h',
      skillGap: 'API Design L2→L3'
    }
  ];

  const inProgressCourses = [
    {
      title: 'TypeScript Deep Dive',
      progress: 65,
      provider: 'Udemy',
      currentStatus: 'Skill đang được áp dụng trong task — đang theo dõi...'
    },
    {
      title: 'React Advanced Patterns',
      progress: 30,
      provider: 'Frontend Masters',
      currentStatus: 'Đang học chương 5/12'
    }
  ];

  const completedCourses = [
    {
      title: 'Team Leadership Basics',
      completedDate: 'Feb 10',
      tasksApplied: 2,
      skillConfirmed: true
    },
    {
      title: 'Git & Version Control',
      completedDate: 'Jan 15',
      tasksApplied: 8,
      skillConfirmed: true
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Học tập</h1>
          <p className="text-gray-600">Learning Loop — học từ công việc thực tế</p>
        </div>

        {/* Learning Loop Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-xl mb-6 text-center">The Learning Loop</h2>
          
          {/* Loop Diagram */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center min-w-[120px]">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Học</p>
            </div>
            <div className="text-2xl">→</div>
            <div className="bg-white/30 backdrop-blur rounded-xl p-4 text-center min-w-[120px] border-2 border-white">
              <Play className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Làm task</p>
            </div>
            <div className="text-2xl">→</div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center min-w-[120px]">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">AI đo</p>
            </div>
            <div className="text-2xl">→</div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center min-w-[120px]">
              <Flame className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Skill tăng</p>
            </div>
            <div className="text-2xl">→</div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4 text-center min-w-[120px]">
              <BookOpen className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Gap mới</p>
            </div>
          </div>

          <div className="mt-6 text-center bg-white/20 backdrop-blur rounded-xl p-4">
            <p className="text-sm">Bạn đang ở bước: <span className="font-semibold">Làm task</span> — React đang được áp dụng</p>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-xl mb-4">AI đề xuất dựa trên skill gap của bạn</h2>
          <div className="space-y-4">
            {recommendedCourses.map((course, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-2xl ${course.priority === 'high' ? 'text-red-500' : 'text-blue-500'}`}>
                        {course.priorityIcon}
                      </span>
                      <div>
                        <h3 className="text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.provider} • {course.duration}</p>
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Lý do AI đề xuất:</span> {course.reason}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded">
                        Closes gap: {course.skillGap}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded ${
                        course.priority === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        Priority: {course.priorityLabel}
                      </span>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Bắt đầu học
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* In-Progress Courses */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-xl mb-4">Đang học</h2>
          <div className="space-y-4">
            {inProgressCourses.map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{course.provider}</p>
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                        <span>Tiến độ</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">{course.currentStatus}</p>
                  </div>
                  <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors ml-4">
                    Tiếp tục
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Loop Tracking */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl mb-4">Learning Loop Tracking</h2>
          <p className="text-sm text-gray-600 mb-4">Các khóa đã hoàn thành — skill có được áp dụng thực tế?</p>
          <div className="space-y-3">
            {completedCourses.map((course, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="mb-1">{course.title}</p>
                    <p className="text-sm text-gray-600">
                      Completed {course.completedDate} → Applied in {course.tasksApplied} tasks
                    </p>
                  </div>
                </div>
                {course.skillConfirmed && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Skill confirmed
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
