import { useNavigate } from 'react-router';
import { CheckCircle, Lock, Circle, BookOpen, TrendingUp } from 'lucide-react';
import Layout from '../../components/Layout';

export default function Career() {
  const navigate = useNavigate();

  const progressionSteps = [
    {
      level: 'Junior Frontend',
      status: 'completed',
      progress: 100
    },
    {
      level: 'Mid Frontend',
      status: 'current',
      progress: 100
    },
    {
      level: 'Senior Frontend',
      status: 'in-progress',
      progress: 68
    },
    {
      level: 'Lead/Architect',
      status: 'locked',
      progress: 0
    }
  ];

  const seniorRequirements = [
    {
      skill: 'React L4',
      current: 'L3',
      required: 'L4',
      met: false,
      gap: '+1 level',
      course: 'React Advanced',
      courseLink: '/employee/learning'
    },
    {
      skill: 'System Design L4',
      current: 'L2',
      required: 'L4',
      met: false,
      gap: '+2 levels',
      course: 'System Design Fundamentals',
      courseLink: '/employee/learning'
    },
    {
      skill: 'TypeScript L3',
      current: 'L3',
      required: 'L3',
      met: true,
      gap: null,
      course: null,
      courseLink: null
    },
    {
      skill: 'Communication L3',
      current: 'L3',
      required: 'L3',
      met: true,
      gap: null,
      course: null,
      courseLink: null
    },
    {
      skill: 'Testing L3',
      current: 'L2',
      required: 'L3',
      met: false,
      gap: '+1 level',
      course: 'Jest Testing',
      courseLink: '/employee/learning'
    },
    {
      skill: 'Performance KPI > 80 avg',
      current: '84',
      required: '80',
      met: true,
      gap: null,
      course: null,
      courseLink: null
    }
  ];

  const aiSuggestions = [
    {
      icon: '🎯',
      title: 'Học System Design ngay',
      description: 'Gap lớn nhất, ảnh hưởng nhiều nhất đến progression của bạn'
    },
    {
      icon: '💼',
      title: 'Nhận task type System Design tuần tới',
      description: 'Luyện qua thực tế — hiệu quả hơn học lý thuyết'
    },
    {
      icon: '🚀',
      title: 'Sau khi đóng 3 gap, đề xuất review với Lead',
      description: 'Dự kiến 3-4 tháng nữa nếu giữ pace hiện tại'
    }
  ];

  const alternativePaths = [
    { title: 'Senior Specialist', description: 'Chuyên sâu hơn (không lên Lead)' },
    { title: 'Frontend → Fullstack', description: 'Lateral move sang Backend' }
  ];

  const getStepIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-6 h-6 text-green-600" />;
    if (status === 'current') return <Circle className="w-6 h-6 text-blue-600 fill-blue-600" />;
    if (status === 'in-progress') return <TrendingUp className="w-6 h-6 text-yellow-600" />;
    return <Lock className="w-6 h-6 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Lộ trình nghề nghiệp</h1>
          <p className="text-gray-600">Dựa trên dữ liệu thực tế — không phải mơ hồ</p>
        </div>

        {/* Current Position Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm opacity-90 mb-1">Bạn đang ở</p>
              <p className="text-2xl">Frontend Developer (Mid)</p>
            </div>
            <div className="text-4xl opacity-75">→</div>
            <div>
              <p className="text-sm opacity-90 mb-1">Mục tiêu</p>
              <p className="text-2xl">Senior Frontend Developer</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Dự kiến đạt được</p>
            <p className="text-xl">3-4 tháng nữa</p>
            <p className="text-sm opacity-75">(dựa trên pace hiện tại)</p>
          </div>
        </div>

        {/* Progression Roadmap */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-xl mb-6">Progression Roadmap</h2>
          <div className="space-y-6">
            {progressionSteps.map((step, index) => (
              <div key={index}>
                <div className="flex items-center gap-4">
                  {getStepIcon(step.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg">{step.level}</h3>
                      <span className={`text-sm px-3 py-1 rounded ${
                        step.status === 'completed' ? 'bg-green-100 text-green-700' :
                        step.status === 'current' ? 'bg-blue-100 text-blue-700' :
                        step.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {step.status === 'completed' && 'Completed'}
                        {step.status === 'current' && 'Current position'}
                        {step.status === 'in-progress' && `${step.progress}% complete`}
                        {step.status === 'locked' && 'Locked'}
                      </span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'current' ? 'bg-blue-600' :
                          step.status === 'in-progress' ? 'bg-yellow-600' :
                          'bg-gray-300'
                        }`}
                        style={{ width: `${step.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Expand requirements for in-progress step */}
                {step.status === 'in-progress' && (
                  <div className="ml-10 mt-4 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm mb-3 text-gray-600">Requirements:</p>
                    <div className="space-y-2">
                      {seniorRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            {req.met ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300" />
                            )}
                            <div>
                              <p className="text-sm">
                                {req.skill}
                                <span className="text-gray-500 ml-2">
                                  {req.current} → {req.required}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {req.met ? (
                              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded">
                                ✅ met
                              </span>
                            ) : (
                              <>
                                <span className="text-xs text-red-600">needs {req.gap}</span>
                                {req.course && (
                                  <button
                                    onClick={() => navigate(req.courseLink!)}
                                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors flex items-center gap-1"
                                  >
                                    <BookOpen className="w-3 h-3" />
                                    {req.course}
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-xl p-6 text-white mb-8">
          <h2 className="text-xl mb-4">AI gợi ý — cá nhân hóa cho bạn</h2>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div>
                    <p className="mb-1">{suggestion.title}</p>
                    <p className="text-sm text-gray-300">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alternative Paths */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-lg mb-4 text-gray-600">Hướng đi khác bạn có thể cân nhắc</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alternativePaths.map((path, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                <h3 className="mb-1">{path.title}</h3>
                <p className="text-sm text-gray-600">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
