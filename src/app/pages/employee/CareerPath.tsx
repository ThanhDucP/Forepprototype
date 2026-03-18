import { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  Route, 
  Target, 
  TrendingUp,
  CheckCircle2,
  Circle,
  Lock,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const careerPath = [
  {
    level: 1,
    position: 'Junior Developer',
    current: false,
    completed: true,
    skills: [
      { name: 'HTML/CSS', acquired: true },
      { name: 'JavaScript Basics', acquired: true },
      { name: 'Git Basics', acquired: true },
      { name: 'React Basics', acquired: true },
    ]
  },
  {
    level: 2,
    position: 'Mid-level Developer',
    current: true,
    completed: false,
    skills: [
      { name: 'React Advanced', acquired: true },
      { name: 'TypeScript', acquired: true },
      { name: 'State Management', acquired: true },
      { name: 'Testing', acquired: false },
    ]
  },
  {
    level: 3,
    position: 'Senior Developer',
    current: false,
    completed: false,
    requiredSkills: 5,
    currentSkills: 3,
    skills: [
      { name: 'System Design', acquired: false, gap: 10 },
      { name: 'React Advanced Patterns', acquired: false, gap: 15 },
      { name: 'Performance Optimization', acquired: true },
      { name: 'Mentoring', acquired: true },
      { name: 'Architecture Design', acquired: true },
    ]
  },
  {
    level: 4,
    position: 'Team Lead',
    current: false,
    completed: false,
    locked: true,
    skills: [
      { name: 'People Management', acquired: false },
      { name: 'Project Planning', acquired: false },
      { name: 'Stakeholder Communication', acquired: false },
      { name: 'Technical Leadership', acquired: false },
    ]
  },
  {
    level: 5,
    position: 'Engineering Manager',
    current: false,
    completed: false,
    locked: true,
    skills: [
      { name: 'Strategic Planning', acquired: false },
      { name: 'Budget Management', acquired: false },
      { name: 'Hiring & Recruitment', acquired: false },
      { name: 'Cross-team Collaboration', acquired: false },
    ]
  }
];

const aiSuggestions = [
  {
    id: 1,
    type: 'skill',
    priority: 'high',
    title: 'Học System Design',
    description: 'Còn thiếu 10 điểm để đạt yêu cầu Senior Developer',
    action: 'Khóa học "System Design Interview"',
    timeEstimate: '12 giờ'
  },
  {
    id: 2,
    type: 'skill',
    priority: 'high',
    title: 'Hoàn thiện React Advanced Patterns',
    description: 'Kỹ năng này sẽ giúp bạn vượt trội so với yêu cầu',
    action: 'Khóa học "React Advanced Patterns"',
    timeEstimate: '8 giờ'
  },
  {
    id: 3,
    type: 'opportunity',
    priority: 'medium',
    title: 'Cơ hội thăng tiến',
    description: 'Sau khi hoàn thành 2 kỹ năng trên, bạn có thể đề xuất thăng Senior',
    action: 'Thảo luận với Manager',
    timeEstimate: 'Dự kiến 2-3 tháng'
  },
  {
    id: 4,
    type: 'network',
    priority: 'low',
    title: 'Mở rộng mạng lưới',
    description: 'Tham gia Tech Talk và Workshop để học hỏi từ Senior/Lead',
    action: 'Đăng ký các sự kiện nội bộ',
    timeEstimate: 'Ongoing'
  }
];

export default function CareerPath() {
  const [showSkillDetails, setShowSkillDetails] = useState<number | null>(null);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Lộ trình nghề nghiệp</h1>
          <p className="text-gray-600">Con đường phát triển sự nghiệp của bạn</p>
        </div>

        {/* Current Status */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl mb-2">Mid-level Developer</h2>
              <p className="text-blue-100">Vị trí hiện tại của bạn</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-100 mb-1">Tiến độ đến Senior</div>
              <div className="text-3xl">60%</div>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3 mb-4">
            <div className="bg-white rounded-full h-3" style={{ width: '60%' }} />
          </div>
          <p className="text-sm text-blue-100">
            Bạn đã hoàn thành 3/5 kỹ năng cần thiết. Còn 2 kỹ năng nữa để đạt yêu cầu Senior Developer.
          </p>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <h2 className="text-xl">Lộ trình đề xuất cho bạn</h2>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    suggestion.priority === 'high' ? 'bg-red-100' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {suggestion.type === 'skill' && <Target className={`w-5 h-5 ${
                      suggestion.priority === 'high' ? 'text-red-600' :
                      suggestion.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />}
                    {suggestion.type === 'opportunity' && <TrendingUp className="w-5 h-5 text-yellow-600" />}
                    {suggestion.type === 'network' && <Lightbulb className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3>{suggestion.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' :
                        suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {suggestion.priority === 'high' ? 'Ưu tiên cao' :
                         suggestion.priority === 'medium' ? 'Ưu tiên trung bình' : 'Tham khảo'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600">{suggestion.action}</span>
                      <span className="text-xs text-gray-500">{suggestion.timeEstimate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Path Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-6">Cây kỹ năng & Lộ trình phát triển</h2>
          <div className="space-y-8">
            {careerPath.map((stage, index) => (
              <div key={stage.level} className="relative">
                {/* Connector Line */}
                {index < careerPath.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" />
                )}

                <div className="flex gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    stage.completed ? 'bg-green-100' :
                    stage.current ? 'bg-blue-100' :
                    stage.locked ? 'bg-gray-100' : 'bg-gray-50'
                  }`}>
                    {stage.completed && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {stage.current && <Circle className="w-6 h-6 text-blue-600 fill-blue-600" />}
                    {!stage.completed && !stage.current && !stage.locked && <Circle className="w-6 h-6 text-gray-400" />}
                    {stage.locked && <Lock className="w-6 h-6 text-gray-400" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className={`border rounded-lg p-4 ${
                      stage.current ? 'border-blue-300 bg-blue-50' :
                      stage.completed ? 'border-green-300 bg-green-50' :
                      'border-gray-200 bg-gray-50'
                    } ${stage.locked ? 'opacity-60' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg mb-1">{stage.position}</h3>
                          {stage.current && (
                            <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">
                              Vị trí hiện tại
                            </span>
                          )}
                          {stage.completed && (
                            <span className="text-xs px-2 py-1 bg-green-600 text-white rounded-full">
                              Đã hoàn thành
                            </span>
                          )}
                          {stage.locked && (
                            <span className="text-xs px-2 py-1 bg-gray-400 text-white rounded-full">
                              Chưa mở khóa
                            </span>
                          )}
                        </div>
                        {!stage.completed && !stage.locked && stage.requiredSkills && (
                          <div className="text-right">
                            <div className="text-2xl">{stage.currentSkills}/{stage.requiredSkills}</div>
                            <div className="text-xs text-gray-600">Kỹ năng đạt được</div>
                          </div>
                        )}
                      </div>

                      {/* Skills Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {stage.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className={`flex items-center gap-2 p-2 rounded ${
                              skill.acquired ? 'bg-white' : 'bg-white/50'
                            }`}
                          >
                            {skill.acquired ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            )}
                            <span className={`text-sm flex-1 ${
                              skill.acquired ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {skill.name}
                            </span>
                            {skill.gap !== undefined && !skill.acquired && (
                              <span className="text-xs text-red-600">-{skill.gap} điểm</span>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Next Step Button */}
                      {stage.current && (
                        <button
                          onClick={() => setShowSkillDetails(stage.level)}
                          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <span>Xem kế hoạch phát triển</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Career Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl mb-4">Nguyện vọng nghề nghiệp của bạn</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Vị trí mục tiêu (có thể chọn nhiều)</label>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg border-2 border-blue-300">
                  Senior Developer
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-transparent hover:border-gray-300 transition-colors">
                  Team Lead
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-transparent hover:border-gray-300 transition-colors">
                  Technical Architect
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border-2 border-transparent hover:border-gray-300 transition-colors">
                  Product Manager
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Thời gian mong muốn</label>
              <select className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>3-6 tháng</option>
                <option>6-12 tháng</option>
                <option>1-2 năm</option>
                <option>Trên 2 năm</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Kỹ năng muốn phát triển thêm</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Ví dụ: Cloud Architecture, Machine Learning, Leadership Skills..."
              />
            </div>

            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Cập nhật nguyện vọng
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
