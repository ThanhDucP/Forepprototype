import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Clock,
  TrendingUp,
  Calendar,
  PlayCircle,
  CheckCircle2,
  Target
} from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'React Advanced Patterns',
    type: 'recommended',
    provider: 'Internal',
    duration: '8 hours',
    progress: 0,
    aiReason: 'Cần thiết cho vai trò Senior Developer',
    skillGap: ['React', 'System Design'],
    status: 'not-started'
  },
  {
    id: 2,
    title: 'System Design Interview',
    type: 'recommended',
    provider: 'External',
    duration: '12 hours',
    progress: 0,
    aiReason: 'Thiếu 10 điểm để đạt yêu cầu thăng tiến',
    skillGap: ['System Design'],
    status: 'not-started'
  },
  {
    id: 3,
    title: 'TypeScript Deep Dive',
    type: 'in-progress',
    provider: 'Internal',
    duration: '6 hours',
    progress: 65,
    completedHours: 4,
    status: 'in-progress'
  },
  {
    id: 4,
    title: 'Team Leadership Basics',
    type: 'completed',
    provider: 'Internal',
    duration: '4 hours',
    progress: 100,
    completedDate: '2026-02-10',
    certificate: true,
    status: 'completed'
  },
];

const workshops = [
  { id: 1, title: 'Tech Talk: Microservices Architecture', date: '2026-03-05', time: '14:00', seats: 20, registered: 15 },
  { id: 2, title: 'Code Review Best Practices', date: '2026-03-12', time: '15:00', seats: 30, registered: 22 },
  { id: 3, title: 'Onboarding: Company Culture', date: '2026-03-15', time: '10:00', seats: 50, registered: 35 },
];

const achievements = [
  { id: 1, title: 'Early Adopter', description: 'Hoàn thành 5 khóa học đầu tiên', icon: '🎯', unlocked: true },
  { id: 2, title: 'Speed Learner', description: 'Học 20 giờ trong 1 tháng', icon: '⚡', unlocked: true },
  { id: 3, title: 'Knowledge Sharer', description: 'Chia sẻ kiến thức với team', icon: '🤝', unlocked: false },
  { id: 4, title: 'Master Learner', description: 'Hoàn thành 20 khóa học', icon: '🏆', unlocked: false },
];

export default function LearningDevelopment() {
  const [selectedTab, setSelectedTab] = useState<'courses' | 'workshops' | 'achievements'>('courses');

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Học tập & Phát triển</h1>
          <p className="text-gray-600">Nâng cao kỹ năng và phát triển sự nghiệp</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">12</div>
            <div className="text-sm text-gray-600">Khóa học đã hoàn thành</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">48h</div>
            <div className="text-sm text-gray-600">Tổng thời gian học</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">+12%</div>
            <div className="text-sm text-gray-600">Cải thiện performance</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="text-2xl mb-1">2/4</div>
            <div className="text-sm text-gray-600">Thành tựu đạt được</div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Đề xuất học tập cá nhân hóa</h2>
          </div>
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="mb-2">🎯 Ưu tiên cao</h3>
            <p className="text-sm text-gray-700 mb-3">
              Để đạt mục tiêu <strong>Senior Developer</strong> trong 6 tháng, bạn cần tập trung vào:
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-blue-600" />
                <span>System Design (còn thiếu 10 điểm)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-blue-600" />
                <span>React Advanced Patterns (nên có để vượt trội)</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="mb-2">📊 Hiệu quả học tập</h3>
            <p className="text-sm text-gray-700">
              Các khóa học đã hoàn thành giúp bạn cải thiện performance <strong>+12%</strong> trong 3 tháng qua.
              Tiếp tục học tập với tốc độ này sẽ giúp bạn đạt mục tiêu thăng tiến.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <div className="flex gap-6 px-6">
              <button
                onClick={() => setSelectedTab('courses')}
                className={`py-4 border-b-2 transition-colors ${
                  selectedTab === 'courses'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Khóa học
              </button>
              <button
                onClick={() => setSelectedTab('workshops')}
                className={`py-4 border-b-2 transition-colors ${
                  selectedTab === 'workshops'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Sự kiện & Workshop
              </button>
              <button
                onClick={() => setSelectedTab('achievements')}
                className={`py-4 border-b-2 transition-colors ${
                  selectedTab === 'achievements'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                Thành tựu
              </button>
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'courses' && (
              <div className="space-y-4">
                {courses.filter(c => c.type === 'recommended').length > 0 && (
                  <div>
                    <h3 className="mb-3 flex items-center gap-2">
                      <span className="text-lg">AI đề xuất cho bạn</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                        Dựa trên career path
                      </span>
                    </h3>
                    <div className="space-y-3">
                      {courses.filter(c => c.type === 'recommended').map((course) => (
                        <div key={course.id} className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="mb-1">{course.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <GraduationCap className="w-4 h-4" />
                                  {course.provider}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.duration}
                                </span>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                              Bắt đầu
                            </button>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-sm text-gray-700 mb-2">
                              <strong>Lý do AI đề xuất:</strong> {course.aiReason}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              {course.skillGap?.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {courses.filter(c => c.type === 'in-progress').length > 0 && (
                  <div>
                    <h3 className="text-lg mb-3">Đang học</h3>
                    <div className="space-y-3">
                      {courses.filter(c => c.type === 'in-progress').map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="mb-1">{course.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <GraduationCap className="w-4 h-4" />
                                  {course.provider}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.completedHours}h / {course.duration}
                                </span>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                              <PlayCircle className="w-4 h-4" />
                              Tiếp tục
                            </button>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                              <span>Tiến độ</span>
                              <span>{course.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 bg-blue-600 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {courses.filter(c => c.type === 'completed').length > 0 && (
                  <div>
                    <h3 className="text-lg mb-3">Đã hoàn thành</h3>
                    <div className="space-y-3">
                      {courses.filter(c => c.type === 'completed').map((course) => (
                        <div key={course.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="mb-1">{course.title}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <GraduationCap className="w-4 h-4" />
                                    {course.provider}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    {course.completedDate && new Date(course.completedDate).toLocaleDateString('vi-VN')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {course.certificate && (
                              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                                <Award className="w-4 h-4" />
                                Chứng chỉ
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'workshops' && (
              <div className="space-y-4">
                {workshops.map((workshop) => (
                  <div key={workshop.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="mb-2">{workshop.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(workshop.date).toLocaleDateString('vi-VN')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {workshop.time}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <span>{workshop.registered}/{workshop.seats} người đã đăng ký</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Đăng ký
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`border rounded-lg p-6 ${
                      achievement.unlocked
                        ? 'border-yellow-300 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-3">{achievement.icon}</div>
                      <h4 className="mb-2">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.unlocked && (
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                          <Award className="w-4 h-4" />
                          Đã đạt được
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
