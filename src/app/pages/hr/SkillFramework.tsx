import { useState } from 'react';
import { Plus, Edit, Link as LinkIcon } from 'lucide-react';
import Layout from '../../components/Layout';

export default function SkillFramework() {
  const [selectedRole, setSelectedRole] = useState('Frontend Dev');

  const roles = ['Frontend Dev', 'Backend Dev', 'QA', 'DevOps', 'Designer', 'Product Manager'];

  const frontendSkills = [
    {
      domain: 'Core Technical',
      skills: [
        {
          name: 'React',
          l1: 'Hiểu cơ bản JSX, components',
          l2: 'Sử dụng hooks, state management',
          l3: 'Hiểu performance, custom hooks',
          l4: 'Architecture patterns, optimization',
          l5: 'Framework contributor level',
          requiredFor: { junior: 'L1', mid: 'L2', senior: 'L4', lead: 'L5' }
        },
        {
          name: 'TypeScript',
          l1: 'Basic types, interfaces',
          l2: 'Generics, utility types',
          l3: 'Advanced types, decorators',
          l4: 'Type system expert',
          l5: 'TS compiler understanding',
          requiredFor: { junior: 'L1', mid: 'L2', senior: 'L3', lead: 'L4' }
        },
        {
          name: 'CSS/Styling',
          l1: 'Basic styling, flexbox',
          l2: 'Grid, responsive design',
          l3: 'CSS-in-JS, animations',
          l4: 'Performance, complex layouts',
          l5: 'Design system architect',
          requiredFor: { junior: 'L2', mid: 'L3', senior: 'L3', lead: 'L4' }
        }
      ]
    },
    {
      domain: 'Architecture',
      skills: [
        {
          name: 'System Design',
          l1: 'Hiểu basic architecture',
          l2: 'Component architecture',
          l3: 'Application architecture',
          l4: 'Distributed systems',
          l5: 'Complex system design',
          requiredFor: { junior: '—', mid: 'L1', senior: 'L4', lead: 'L5' }
        },
        {
          name: 'API Design',
          l1: 'Consume REST APIs',
          l2: 'Design REST endpoints',
          l3: 'GraphQL, API patterns',
          l4: 'API architecture',
          l5: 'Platform API design',
          requiredFor: { junior: 'L1', mid: 'L2', senior: 'L3', lead: 'L4' }
        }
      ]
    },
    {
      domain: 'Soft Skills',
      skills: [
        {
          name: 'Communication',
          l1: 'Basic team communication',
          l2: 'Clear written/verbal comm',
          l3: 'Presentation, documentation',
          l4: 'Cross-team collaboration',
          l5: 'Leadership communication',
          requiredFor: { junior: 'L1', mid: 'L2', senior: 'L3', lead: 'L4' }
        },
        {
          name: 'Code Review',
          l1: 'Understand review process',
          l2: 'Give constructive feedback',
          l3: 'Identify architecture issues',
          l4: 'Mentor through reviews',
          l5: 'Set review standards',
          requiredFor: { junior: 'L1', mid: 'L2', senior: 'L3', lead: 'L4' }
        }
      ]
    }
  ];

  const linkedCourses = [
    { skill: 'React L3→L4', course: 'React Advanced Patterns', provider: 'Frontend Masters' },
    { skill: 'System Design L2→L4', course: 'System Design Fundamentals', provider: 'Coursera' },
    { skill: 'TypeScript L2→L3', course: 'TypeScript Deep Dive', provider: 'Udemy' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Skill Framework</h1>
            <p className="text-gray-600">Định nghĩa kỳ vọng kỹ năng cho từng role và level</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Skill
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-white rounded-xl p-2 border border-gray-100 shadow-sm mb-8 flex gap-2 overflow-x-auto">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-6 py-3 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedRole === role
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Skill Tree */}
        {selectedRole === 'Frontend Dev' && (
          <div className="space-y-8">
            {frontendSkills.map((domain, domainIdx) => (
              <div key={domainIdx} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                <h2 className="text-xl mb-6 text-blue-600">{domain.domain}</h2>
                <div className="space-y-6">
                  {domain.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg">{skill.name}</h3>
                        <button className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Level Criteria Table */}
                      <div className="overflow-x-auto mb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 text-gray-600 min-w-[80px]">L1</th>
                              <th className="text-left py-2 px-3 text-gray-600 min-w-[80px]">L2</th>
                              <th className="text-left py-2 px-3 text-gray-600 min-w-[80px]">L3</th>
                              <th className="text-left py-2 px-3 text-gray-600 min-w-[80px]">L4</th>
                              <th className="text-left py-2 px-3 text-gray-600 min-w-[80px]">L5</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-3 px-3 align-top">
                                <span className="text-xs text-gray-700">{skill.l1}</span>
                              </td>
                              <td className="py-3 px-3 align-top">
                                <span className="text-xs text-gray-700">{skill.l2}</span>
                              </td>
                              <td className="py-3 px-3 align-top">
                                <span className="text-xs text-gray-700">{skill.l3}</span>
                              </td>
                              <td className="py-3 px-3 align-top">
                                <span className="text-xs text-gray-700">{skill.l4}</span>
                              </td>
                              <td className="py-3 px-3 align-top">
                                <span className="text-xs text-gray-700">{skill.l5}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Required Level for Roles */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-2">Required level for:</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                            Junior: {skill.requiredFor.junior}
                          </span>
                          <span className="text-xs bg-blue-200 px-2 py-1 rounded">
                            Mid: {skill.requiredFor.mid}
                          </span>
                          <span className="text-xs bg-green-200 px-2 py-1 rounded">
                            Senior: {skill.requiredFor.senior}
                          </span>
                          <span className="text-xs bg-purple-200 px-2 py-1 rounded">
                            Lead: {skill.requiredFor.lead}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Linked Courses Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">Liên kết với khóa học</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Link Course
            </button>
          </div>
          <div className="space-y-3">
            {linkedCourses.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="mb-1">
                    <span className="text-blue-600">{item.skill}</span>
                  </p>
                  <p className="text-sm text-gray-600">→ {item.course} <span className="text-gray-400">({item.provider})</span></p>
                </div>
                <button className="text-sm text-gray-500 hover:text-gray-700">Edit</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
