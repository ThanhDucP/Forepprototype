import { useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { Dialog } from '../../components/Dialog';
import { 
  Route, 
  Target, 
  TrendingUp,
  CheckCircle2,
  Circle,
  Lock,
  Lightbulb,
  ArrowRight,
  Info,
  Zap,
  Globe,
  TrendingDown
} from 'lucide-react';

// Career suggestions vary based on position level
const getAISuggestionsByLevel = (position: string) => {
  const isJuniorOrMid = position.includes('Developer') && !position.includes('Senior');
  const isManager = position.includes('Manager') || position.includes('Lead');
  const isExecutive = position.includes('CEO') || position.includes('Director') || position.includes('VP');

  if (isJuniorOrMid) {
    return [
      {
        id: 1,
        type: 'skill',
        priority: 'high',
        title: 'Học System Design',
        description: 'Còn thiếu 10 điểm để đạt yêu cầu Senior Developer',
        reason: 'Kỹ năng System Design là yêu cầu bắt buộc cho vị trí Senior. Hiện tại bạn đạt 70/80 điểm, cần cải thiện khả năng thiết kế kiến trúc quy mô lớn.',
        action: 'Khóa học "System Design Interview"',
        timeEstimate: '12 giờ'
      },
      {
        id: 2,
        type: 'skill',
        priority: 'high',
        title: 'Hoàn thiện React Advanced Patterns',
        description: 'Kỹ năng này sẽ giúp bạn vượt trội so với yêu cầu',
        reason: 'Nắm vững React Advanced Patterns sẽ giúp bạn xử lý các tình huống phức tạp và tối ưu performance. Đây là điểm mạnh để differentiate với candidates khác.',
        action: 'Khóa học "React Advanced Patterns"',
        timeEstimate: '8 giờ'
      },
      {
        id: 3,
        type: 'opportunity',
        priority: 'medium',
        title: 'Cơ hội thăng tiến',
        description: 'Sau khi hoàn thành 2 kỹ năng trên, bạn có thể đề xuất thăng Senior',
        reason: 'Performance hiện tại của bạn (92%) vượt mức yêu cầu. Kết hợp với việc bổ sung 2 kỹ năng còn thiếu, bạn sẽ đủ điều kiện đề xuất review lên Senior trong 2-3 tháng tới.',
        action: 'Thảo luận với Manager',
        timeEstimate: 'Dự kiến 2-3 tháng'
      },
    ];
  }

  if (isManager) {
    return [
      {
        id: 1,
        type: 'career',
        priority: 'high',
        title: 'Lộ trình thăng tiến lên Engineering Manager',
        description: 'Phát triển kỹ năng quản lý quy mô lớn hơn',
        reason: 'Bạn đang quản lý team 5 người rất tốt (team performance 88%). Để lên Engineering Manager, cần kinh nghiệm quản lý 15-20 người và cross-team coordination.',
        action: 'Tham gia khóa "Engineering Leadership"',
        timeEstimate: '6-12 tháng'
      },
      {
        id: 2,
        type: 'career',
        priority: 'medium',
        title: 'Hoặc chuyển sang Director of Product',
        description: 'Tận dụng technical background để làm Product',
        reason: 'Background kỹ thuật mạnh kết hợp với khả năng communication tốt là nền tảng tuyệt vời cho vai trò Product Director. Đây là hướng đi khác để phát triển sự nghiệp.',
        action: 'Tìm hiểu Product Management',
        timeEstimate: '12-18 tháng'
      },
      {
        id: 3,
        type: 'skill',
        priority: 'medium',
        title: 'Nâng cao Strategic Thinking',
        description: 'Cần thiết cho vai trò leadership cao hơn',
        reason: 'Các vị trí Director, VP yêu cầu khả năng think strategically, nhìn xa 2-3 năm và align technology với business goals.',
        action: 'MBA hoặc Executive Education',
        timeEstimate: 'Ongoing'
      },
    ];
  }

  if (isExecutive) {
    return [
      {
        id: 1,
        type: 'technology',
        priority: 'high',
        title: 'Áp dụng AI/ML vào quy trình công ty',
        description: 'Tăng năng suất 30-40% thông qua automation',
        reason: 'Theo nghiên cứu McKinsey 2025, các công ty áp dụng AI vào HR và Operations tăng productivity 35%. Với quy mô 56 người, việc đầu tư vào AI-powered HR systems có thể tiết kiệm 20-30% thời gian administrative.',
        action: 'Pilot AI chatbot cho HR queries',
        timeEstimate: 'Q2 2026'
      },
      {
        id: 2,
        type: 'economic',
        priority: 'high',
        title: 'Tối ưu cơ cấu chi phí nhân sự',
        description: 'Quỹ lương tăng 8% nhưng revenue chỉ tăng 5%',
        reason: 'Margin đang bị nén. Đề xuất: (1) Review salary band, (2) Tăng performance-based compensation, (3) Xem xét outsource một số vị trí non-core để giảm fixed cost.',
        action: 'Workshop về Compensation Strategy',
        timeEstimate: 'Ngay lập tức'
      },
      {
        id: 3,
        type: 'technology',
        priority: 'medium',
        title: 'Đầu tư vào Remote Work Infrastructure',
        description: 'Mở rộng talent pool toàn quốc',
        reason: 'Chi nhánh Đà Nẵng hiệu suất thấp (82%) có thể do khó tuyển người. Remote-first policy giúp tuyển talent từ khắp VN, giảm 30% văn phòng cost, tăng 50% candidate pool.',
        action: 'Implement remote work tools & policy',
        timeEstimate: 'Q2-Q3 2026'
      },
      {
        id: 4,
        type: 'economic',
        priority: 'medium',
        title: 'Mở rộng sang Cần Thơ',
        description: 'Khai thác thị trường miền Tây',
        reason: 'Cost văn phòng tại Cần Thơ thấp hơn HN 40%, lương trung bình thấp hơn 25% nhưng chất lượng talent tốt. ROI dự kiến: break-even sau 8 tháng với team 10 người.',
        action: 'Feasibility study Cần Thơ branch',
        timeEstimate: 'Q3 2026'
      },
    ];
  }

  // Default for other roles
  return [
    {
      id: 1,
      type: 'skill',
      priority: 'medium',
      title: 'Phát triển kỹ năng chuyên môn',
      description: 'Nâng cao năng lực trong vai trò hiện tại',
      reason: 'Tiếp tục học hỏi và phát triển trong lĩnh vực của bạn.',
      action: 'Tham khảo các khóa học liên quan',
      timeEstimate: 'Ongoing'
    },
  ];
};

const careerPath = [
  {
    level: 1,
    position: 'Junior Developer',
    current: false,
    completed: true,
    skills: [
      { name: 'HTML/CSS', acquired: true, score: 90, description: 'Nắm vững layout, responsive design' },
      { name: 'JavaScript Basics', acquired: true, score: 85, description: 'ES6+, async/await, promises' },
      { name: 'Git Basics', acquired: true, score: 88, description: 'Commit, branch, merge, pull request' },
      { name: 'React Basics', acquired: true, score: 87, description: 'Components, hooks, state management cơ bản' },
    ]
  },
  {
    level: 2,
    position: 'Mid-level Developer',
    current: true,
    completed: false,
    skills: [
      { name: 'React Advanced', acquired: true, score: 85, description: 'Performance optimization, custom hooks, context' },
      { name: 'TypeScript', acquired: true, score: 80, description: 'Type safety, generics, utility types' },
      { name: 'State Management', acquired: true, score: 82, description: 'Redux, Zustand, React Query' },
      { name: 'Testing', acquired: false, score: 60, description: 'Unit test, integration test, E2E', gap: 15 },
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
      { name: 'System Design', acquired: false, score: 70, description: 'Thiết kế kiến trúc, scalability, trade-offs', gap: 10 },
      { name: 'React Advanced Patterns', acquired: false, score: 65, description: 'Compound components, render props, HOC', gap: 15 },
      { name: 'Performance Optimization', acquired: true, score: 88, description: 'Code splitting, lazy loading, memoization' },
      { name: 'Mentoring', acquired: true, score: 85, description: 'Hướng dẫn junior, code review hiệu quả' },
      { name: 'Architecture Design', acquired: true, score: 82, description: 'Thiết kế module, separation of concerns' },
    ]
  },
];

export default function CareerPathEnhanced() {
  const { user } = useAuth();
  const [showSkillDialog, setShowSkillDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const aiSuggestions = getAISuggestionsByLevel(user?.position || '');

  const handleViewSkillDetail = (skill: any) => {
    setSelectedSkill(skill);
    setShowSkillDialog(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill':
        return <Target className="w-5 h-5" />;
      case 'career':
      case 'opportunity':
        return <TrendingUp className="w-5 h-5" />;
      case 'technology':
        return <Zap className="w-5 h-5" />;
      case 'economic':
        return <Globe className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

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
              <h2 className="text-2xl mb-2">{user?.position}</h2>
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
            <h2 className="text-xl">Lộ trình đề xuất cho {user?.position}</h2>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-600' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {getTypeIcon(suggestion.type)}
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
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <p className="text-sm text-gray-700">
                        <strong>Lý do:</strong> {suggestion.reason}
                      </p>
                    </div>
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
                    stage.current ? 'bg-blue-100' : 'bg-gray-50'
                  }`}>
                    {stage.completed && <CheckCircle2 className="w-6 h-6 text-green-600" />}
                    {stage.current && <Circle className="w-6 h-6 text-blue-600 fill-blue-600" />}
                    {!stage.completed && !stage.current && <Circle className="w-6 h-6 text-gray-400" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className={`border rounded-lg p-4 ${
                      stage.current ? 'border-blue-300 bg-blue-50' :
                      stage.completed ? 'border-green-300 bg-green-50' :
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="text-lg mb-1">{stage.position}</h3>
                          {stage.current && (
                            <span className="text-xs px-2 py-1 bg-blue-600 text-white rounded-full">
                              Vị trí hiện tại
                            </span>
                          )}
                        </div>
                        {!stage.completed && stage.requiredSkills && (
                          <div className="text-right">
                            <div className="text-2xl">{stage.currentSkills}/{stage.requiredSkills}</div>
                            <div className="text-xs text-gray-600">Kỹ năng đạt được</div>
                          </div>
                        )}
                      </div>

                      {/* Skills Grid */}
                      <div className="space-y-2">
                        {stage.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className={`p-3 rounded-lg ${
                              skill.acquired ? 'bg-white border border-green-200' : 'bg-white border border-gray-200'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2 flex-1">
                                {skill.acquired ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                ) : (
                                  <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className={skill.acquired ? 'text-gray-900' : 'text-gray-500'}>
                                      {skill.name}
                                    </span>
                                    {skill.score !== undefined && (
                                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                        {skill.score}/100
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">{skill.description}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => handleViewSkillDetail(skill)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Info className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                            {skill.gap !== undefined && !skill.acquired && (
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="h-2 bg-yellow-500 rounded-full"
                                    style={{ width: `${(skill.score / 80) * 100}%` }}
                                  />
                                </div>
                                <span className="text-xs text-red-600 whitespace-nowrap">Còn thiếu {skill.gap} điểm</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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
        title={selectedSkill?.name || 'Chi tiết kỹ năng'}
      >
        {selectedSkill && (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg">Điểm hiện tại</h3>
                <span className="text-2xl">{selectedSkill.score}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="h-3 bg-blue-600 rounded-full"
                  style={{ width: `${selectedSkill.score}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="mb-2">Mô tả</h4>
              <p className="text-sm text-gray-700">{selectedSkill.description}</p>
            </div>

            {selectedSkill.gap && (
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h4 className="mb-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-yellow-600" />
                  Cần cải thiện
                </h4>
                <p className="text-sm text-gray-700">
                  Bạn cần tăng thêm <strong>{selectedSkill.gap} điểm</strong> để đạt yêu cầu tối thiểu. 
                  Đề xuất: tham gia khóa học hoặc làm dự án thực tế để rèn luyện.
                </p>
              </div>
            )}

            {selectedSkill.acquired && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Đã đạt yêu cầu
                </h4>
                <p className="text-sm text-gray-700">
                  Bạn đã nắm vững kỹ năng này. Tiếp tục duy trì và áp dụng vào công việc thực tế.
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
