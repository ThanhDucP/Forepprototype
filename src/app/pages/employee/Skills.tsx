import { useNavigate } from 'react-router';
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

export default function Skills() {
  const navigate = useNavigate();

  const skills = [
    {
      name: 'React',
      level: 3,
      levelLabel: 'Proficient',
      levelColor: 'bg-green-500',
      progress: 65,
      source: 'Từ task thực',
      sourceColor: 'bg-blue-100 text-blue-700',
      requiredForSenior: 4,
      hasGap: true
    },
    {
      name: 'TypeScript',
      level: 3,
      levelLabel: 'Proficient',
      levelColor: 'bg-green-500',
      progress: 80,
      source: 'Từ task + khóa học',
      sourceColor: 'bg-purple-100 text-purple-700',
      requiredForSenior: 3,
      hasGap: false
    },
    {
      name: 'System Design',
      level: 2,
      levelLabel: 'Basic',
      levelColor: 'bg-blue-500',
      progress: 40,
      source: 'Từ task thực',
      sourceColor: 'bg-blue-100 text-blue-700',
      requiredForSenior: 4,
      hasGap: true,
      gapSize: 2
    },
    {
      name: 'CSS/Styling',
      level: 4,
      levelLabel: 'Advanced',
      levelColor: 'bg-purple-500',
      progress: 90,
      source: 'Từ task thực',
      sourceColor: 'bg-blue-100 text-blue-700',
      requiredForSenior: 3,
      hasGap: false
    },
    {
      name: 'Communication',
      level: 3,
      levelLabel: 'Proficient',
      levelColor: 'bg-green-500',
      progress: 70,
      source: 'Lead xác nhận',
      sourceColor: 'bg-green-100 text-green-700',
      requiredForSenior: 3,
      hasGap: false
    },
    {
      name: 'Testing',
      level: 2,
      levelLabel: 'Basic',
      levelColor: 'bg-blue-500',
      progress: 35,
      source: 'Từ task thực',
      sourceColor: 'bg-blue-100 text-blue-700',
      requiredForSenior: 3,
      hasGap: true,
      gapSize: 1
    },
    {
      name: 'Git/DevOps',
      level: 3,
      levelLabel: 'Proficient',
      levelColor: 'bg-green-500',
      progress: 75,
      source: 'Từ task thực',
      sourceColor: 'bg-blue-100 text-blue-700',
      requiredForSenior: 2,
      hasGap: false
    },
    {
      name: 'API Design',
      level: 2,
      levelLabel: 'Basic',
      levelColor: 'bg-blue-500',
      progress: 45,
      source: 'Từ task thực',
      sourceColor: 'bg-blue-100 text-blue-700',
      requiredForSenior: 3,
      hasGap: true,
      gapSize: 1
    }
  ];

  const gaps = skills.filter(s => s.hasGap && s.gapSize);

  const getLevelBadgeColor = (level: number) => {
    if (level === 1) return 'bg-gray-200 text-gray-700';
    if (level === 2) return 'bg-blue-200 text-blue-700';
    if (level === 3) return 'bg-green-200 text-green-700';
    if (level === 4) return 'bg-purple-200 text-purple-700';
    return 'bg-yellow-200 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Kỹ năng của tôi</h1>
          <p className="text-gray-600">Cập nhật từ công việc thực tế + khóa học + xác nhận Lead</p>
        </div>

        {/* Current Position Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm opacity-90 mb-1">Vị trí hiện tại</p>
              <p className="text-2xl">Frontend Developer</p>
            </div>
            <div className="text-3xl opacity-75">→</div>
            <div>
              <p className="text-sm opacity-90 mb-1">Mục tiêu</p>
              <p className="text-2xl">Senior Frontend Developer</p>
            </div>
          </div>
          <div className="bg-white/20 rounded-full h-3 mb-2">
            <div className="bg-white h-3 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-sm opacity-90">68% — Còn 3 skill cần đạt để đủ điều kiện</p>
        </div>

        {/* Gap Summary */}
        {gaps.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1" />
              <div>
                <h2 className="text-xl mb-2">3 skill cần cải thiện để lên Senior</h2>
                <div className="space-y-3">
                  {gaps.map((gap, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4">
                      <div>
                        <p className="mb-1">
                          <span className="text-gray-900">{gap.name}</span>
                          <span className="text-gray-500 text-sm ml-2">
                            L{gap.level} → L{gap.requiredForSenior}
                          </span>
                          <span className="text-red-600 text-sm ml-2">(gap: {gap.gapSize} level{gap.gapSize > 1 ? 's' : ''})</span>
                        </p>
                      </div>
                      <button
                        onClick={() => navigate('/employee/learning')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Xem gợi ý học
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skill Tree */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl mb-6">Skill Tree</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className={`border rounded-xl p-5 ${skill.hasGap ? 'border-yellow-300 bg-yellow-50/30' : 'border-gray-200 hover:border-blue-300'} transition-colors`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="mb-2">{skill.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-lg text-sm ${getLevelBadgeColor(skill.level)}`}>
                        L{skill.level}
                      </span>
                      <span className="text-sm text-gray-600">{skill.levelLabel}</span>
                    </div>
                  </div>
                  {!skill.hasGap && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress in L{skill.level}</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${skill.levelColor}`}
                      style={{ width: `${skill.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded ${skill.sourceColor}`}>
                    {skill.source}
                  </span>
                  {skill.hasGap && (
                    <span className="text-xs text-red-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      L{skill.requiredForSenior} required
                    </span>
                  )}
                  {!skill.hasGap && (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      L{skill.requiredForSenior} met
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
