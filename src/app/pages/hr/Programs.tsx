import { useState } from 'react';
import { Plus, Eye, Edit, X, CheckCircle, TrendingUp } from 'lucide-react';
import Dialog from '../../components/Dialog';

export default function Programs() {
  const [showNewProgramDialog, setShowNewProgramDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    targetRole: '',
    targetSkill: '',
    duration: '',
    provider: ''
  });

  const activePrograms = [
    {
      id: 1,
      name: 'React Advanced Q1 2025',
      description: 'Advanced React patterns, performance optimization, and architecture',
      targetRole: 'Frontend Developer',
      targetSkill: 'React L3→L4',
      duration: '8 weeks',
      participants: 12,
      completion: 65
    },
    {
      id: 2,
      name: 'System Design Fundamentals',
      description: 'Learn to design scalable distributed systems',
      targetRole: 'All Engineering',
      targetSkill: 'System Design L2→L4',
      duration: '10 weeks',
      participants: 8,
      completion: 40
    },
    {
      id: 3,
      name: 'Leadership Basics',
      description: 'Communication, team management, and mentoring skills',
      targetRole: 'Team Lead',
      targetSkill: 'Communication L3→L4',
      duration: '6 weeks',
      participants: 5,
      completion: 90
    }
  ];

  const courseLibrary = [
    {
      id: 1,
      name: 'React Advanced Patterns',
      type: 'External',
      typeColor: 'bg-purple-100 text-purple-700',
      provider: 'Frontend Masters',
      duration: '12h',
      skillDeveloped: 'React',
      levelGain: '+1 level',
      timesCompleted: 15,
      effectiveness: 4.5
    },
    {
      id: 2,
      name: 'TypeScript Deep Dive',
      type: 'External',
      typeColor: 'bg-purple-100 text-purple-700',
      provider: 'Udemy',
      duration: '10h',
      skillDeveloped: 'TypeScript',
      levelGain: '+1 level',
      timesCompleted: 20,
      effectiveness: 4.3
    },
    {
      id: 3,
      name: 'Testing with Jest',
      type: 'Internal',
      typeColor: 'bg-blue-100 text-blue-700',
      provider: 'Internal Training',
      duration: '6h',
      skillDeveloped: 'Testing',
      levelGain: '+1 level',
      timesCompleted: 12,
      effectiveness: 4.7
    },
    {
      id: 4,
      name: 'Git & Version Control',
      type: 'Internal',
      typeColor: 'bg-blue-100 text-blue-700',
      provider: 'Internal Training',
      duration: '4h',
      skillDeveloped: 'Git/DevOps',
      levelGain: '+0.5 level',
      timesCompleted: 25,
      effectiveness: 4.2
    },
    {
      id: 5,
      name: 'API Design Best Practices',
      type: 'Internal',
      typeColor: 'bg-blue-100 text-blue-700',
      provider: 'Internal Training',
      duration: '4h',
      skillDeveloped: 'API Design',
      levelGain: '+1 level',
      timesCompleted: 10,
      effectiveness: 4.4
    },
    {
      id: 6,
      name: 'Communication Skills',
      type: 'External',
      typeColor: 'bg-purple-100 text-purple-700',
      provider: 'LinkedIn Learning',
      duration: '8h',
      skillDeveloped: 'Communication',
      levelGain: '+1 level',
      timesCompleted: 18,
      effectiveness: 4.1
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New program:', formData);
    setShowNewProgramDialog(false);
    setFormData({ name: '', description: '', targetRole: '', targetSkill: '', duration: '', provider: '' });
  };

  const getEffectivenessColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 4.0) return 'text-blue-600';
    return 'text-yellow-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Chương trình đào tạo</h1>
            <p className="text-gray-600">Quản lý programs và course library</p>
          </div>
          <button
            onClick={() => setShowNewProgramDialog(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Program
          </button>
        </div>

        {/* Active Programs */}
        <div className="mb-8">
          <h2 className="text-xl mb-4">Active Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:border-blue-300 transition-colors">
                <h3 className="text-lg mb-2">{program.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Target:</span>
                    <span className="text-gray-900">{program.targetRole}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Skill:</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {program.targetSkill}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="text-gray-900">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Participants:</span>
                    <span className="text-gray-900">{program.participants}</span>
                  </div>
                </div>

                {/* Completion Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Completion</span>
                    <span className="text-gray-900">{program.completion}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        program.completion >= 80 ? 'bg-green-600' :
                        program.completion >= 50 ? 'bg-blue-600' :
                        'bg-yellow-600'
                      }`}
                      style={{ width: `${program.completion}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Eye className="w-4 h-4" />
                    Chi tiết
                  </button>
                  <button className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 text-sm">
                    <Edit className="w-4 h-4" />
                    Sửa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Library */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl mb-6">Course Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseLibrary.map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm flex-1">{course.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${course.typeColor}`}>
                    {course.type}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3">{course.provider} • {course.duration}</p>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Develops:</span>
                    <span className="text-gray-900">{course.skillDeveloped}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Level gain:</span>
                    <span className="text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {course.levelGain}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Completed:</span>
                    <span className="text-gray-900">{course.timesCompleted} times</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">Effectiveness:</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className={`w-4 h-4 ${getEffectivenessColor(course.effectiveness)}`} />
                      <span className={`${getEffectivenessColor(course.effectiveness)}`}>
                        {course.effectiveness}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Skill thực sự tăng sau khóa học
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Program Dialog */}
        <Dialog open={showNewProgramDialog} onClose={() => setShowNewProgramDialog(false)}>
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Create New Program</h2>
              <button
                onClick={() => setShowNewProgramDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Program Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React Advanced Q2 2025"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                  placeholder="Program description..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Target Role</label>
                <input
                  type="text"
                  value={formData.targetRole}
                  onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Frontend Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Target Skill</label>
                <input
                  type="text"
                  value={formData.targetSkill}
                  onChange={(e) => setFormData({ ...formData, targetSkill: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., React L3→L4"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Duration</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 8 weeks"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewProgramDialog(false)}
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
