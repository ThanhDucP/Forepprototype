import { Users, BookOpen, Layers, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../../components/Layout';

export default function HRDashboard() {
  const programs = [
    {
      name: 'React Advanced Q1',
      participants: 12,
      completion: 65,
      completionColor: 'bg-blue-600',
      impact: 'React L2→L3',
      status: 'On track',
      statusColor: 'bg-green-100 text-green-700'
    },
    {
      name: 'System Design',
      participants: 8,
      completion: 40,
      completionColor: 'bg-yellow-600',
      impact: 'System Design',
      status: 'At risk',
      statusColor: 'bg-red-100 text-red-700'
    },
    {
      name: 'Leadership Basics',
      participants: 5,
      completion: 90,
      completionColor: 'bg-green-600',
      impact: 'Communication',
      status: 'Completing',
      statusColor: 'bg-green-100 text-green-700'
    }
  ];

  const skillHealthData = [
    { department: 'Engineering', avgSkill: 3.2 },
    { department: 'Design', avgSkill: 2.8 },
    { department: 'Product', avgSkill: 3.0 }
  ];

  const pendingActions = [
    {
      type: 'framework',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      message: '3 skill framework updates pending review',
      count: 3
    },
    {
      type: 'request',
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
      message: '2 new course requests from employees',
      count: 2
    },
    {
      type: 'milestone',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      message: '1 career path milestone reached — confirm?',
      count: 1
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">HR Dashboard</h1>
          <p className="text-gray-600">Learning & skill health — không phải headcount/payroll</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">Tổng nhân sự</p>
            </div>
            <p className="text-3xl">56</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-gray-600">Skill frameworks active</p>
            </div>
            <p className="text-3xl">8</p>
            <p className="text-sm text-gray-500">by role</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">Chương trình đào tạo</p>
            </div>
            <p className="text-3xl">5</p>
            <p className="text-sm text-gray-500">đang chạy</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <p className="text-sm text-gray-600">Avg learning completion</p>
            </div>
            <p className="text-3xl">72%</p>
          </div>
        </div>

        {/* Program Health Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mb-8">
          <h2 className="text-xl mb-6">Program Health</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm text-gray-600">Program</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Participants</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Completion</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Impact on Skill</th>
                  <th className="text-center py-3 px-4 text-sm text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">{program.name}</td>
                    <td className="text-center py-4 px-4">{program.participants}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${program.completionColor}`}
                            style={{ width: `${program.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12">{program.completion}%</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded">
                        {program.impact}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className={`text-xs px-3 py-1 rounded ${program.statusColor}`}>
                        {program.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Skill Health by Department */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Skill Health by Department</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={skillHealthData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 5]} />
                <YAxis dataKey="department" type="category" />
                <Tooltip />
                <Bar dataKey="avgSkill" fill="#3b82f6" name="Avg Skill Level" />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-500 mt-4">Average skill level out of 5 (L1-L5)</p>
          </div>

          {/* Pending Actions */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-xl mb-6">Pending Actions</h2>
            <div className="space-y-4">
              {pendingActions.map((action, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="bg-white p-2 rounded-lg">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{action.message}</p>
                  </div>
                  <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    {action.count}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <h2 className="text-xl mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-4 text-left transition-colors">
              <BookOpen className="w-6 h-6 mb-2" />
              <p className="text-sm mb-1">Create Training Program</p>
              <p className="text-xs opacity-75">Set up new learning initiative</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-4 text-left transition-colors">
              <Layers className="w-6 h-6 mb-2" />
              <p className="text-sm mb-1">Update Skill Framework</p>
              <p className="text-xs opacity-75">Modify skill requirements</p>
            </button>
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur rounded-lg p-4 text-left transition-colors">
              <Users className="w-6 h-6 mb-2" />
              <p className="text-sm mb-1">View All Employees</p>
              <p className="text-xs opacity-75">Access employee database</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
