import Layout from '../../components/Layout';
import { Users, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface OrgNode {
  id: string;
  name: string;
  position: string;
  department: string;
  children?: OrgNode[];
}

const orgData: OrgNode = {
  id: '1',
  name: 'Phạm Thị Dung',
  position: 'CEO',
  department: 'Ban lãnh đạo',
  children: [
    {
      id: '2',
      name: 'Lê Văn Cường',
      position: 'HR Manager',
      department: 'Nhân sự',
      children: [
        { id: '21', name: 'Nguyễn Thị Hà', position: 'HR Specialist', department: 'Nhân sự' },
        { id: '22', name: 'Trần Văn Hùng', position: 'Recruiter', department: 'Nhân sự' },
      ]
    },
    {
      id: '3',
      name: 'Hoàng Văn Em',
      position: 'Marketing Manager',
      department: 'Marketing',
      children: [
        { id: '31', name: 'Phạm Thị Linh', position: 'Content Lead', department: 'Marketing' },
        { id: '32', name: 'Đỗ Văn Nam', position: 'Social Media Specialist', department: 'Marketing' },
        { id: '33', name: 'Bùi Thị Oanh', position: 'Marketing Executive', department: 'Marketing' },
      ]
    },
    {
      id: '4',
      name: 'Nguyễn Văn Phúc',
      position: 'CTO',
      department: 'Công nghệ',
      children: [
        {
          id: '41',
          name: 'Trần Thị Bình',
          position: 'Team Lead',
          department: 'Phát triển',
          children: [
            { id: '411', name: 'Nguyễn Văn An', position: 'Frontend Developer', department: 'Phát triển' },
            { id: '412', name: 'Lê Văn Cường', position: 'Frontend Developer', department: 'Phát triển' },
            { id: '413', name: 'Trần Thị Bảo', position: 'Backend Developer', department: 'Phát triển' },
          ]
        },
        {
          id: '42',
          name: 'Phạm Văn Quang',
          position: 'QA Lead',
          department: 'QA',
          children: [
            { id: '421', name: 'Hoàng Thị Thu', position: 'QA Engineer', department: 'QA' },
            { id: '422', name: 'Đặng Văn Sơn', position: 'QA Engineer', department: 'QA' },
          ]
        },
      ]
    },
  ]
};

function OrgNodeComponent({ node, level = 0 }: { node: OrgNode; level?: number }) {
  const [expanded, setExpanded] = useState(level < 2);

  return (
    <div className="ml-6">
      <div className="flex items-start gap-2 mb-2">
        {node.children && node.children.length > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            {expanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>
        )}
        {(!node.children || node.children.length === 0) && (
          <div className="w-6" />
        )}
        
        <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white hover:border-blue-300 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
              {node.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="mb-1">{node.name}</h3>
              <p className="text-sm text-gray-600">{node.position}</p>
              <p className="text-xs text-gray-500">{node.department}</p>
            </div>
            {node.children && node.children.length > 0 && (
              <div className="text-sm text-gray-500">
                <Users className="w-4 h-4 inline mr-1" />
                {node.children.length}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {expanded && node.children && (
        <div className="border-l-2 border-gray-200 ml-3">
          {node.children.map((child) => (
            <OrgNodeComponent key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChart() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl mb-2">Sơ đồ tổ chức</h1>
          <p className="text-gray-600">Cơ cấu tổ chức công ty</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Tổng số phòng ban</div>
            <div className="text-2xl">6</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Tổng số nhân sự</div>
            <div className="text-2xl">56</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Số lượng Manager</div>
            <div className="text-2xl">8</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-sm text-gray-600 mb-1">Chi nhánh</div>
            <div className="text-2xl">3</div>
          </div>
        </div>

        {/* Org Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl">Cơ cấu tổ chức</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                Xuất PDF
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Chỉnh sửa
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <OrgNodeComponent node={orgData} />
          </div>
        </div>

        {/* Department Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Tổng hợp theo phòng ban</h2>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Phát triển</h3>
                  <p className="text-sm text-gray-600">25 nhân viên • 3 Team Leads</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Marketing</h3>
                  <p className="text-sm text-gray-600">10 nhân viên • 1 Manager</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="mb-1">Nhân sự</h3>
                  <p className="text-sm text-gray-600">5 nhân viên • 1 Manager</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
