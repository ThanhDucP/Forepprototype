import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Users, ChevronDown, ChevronRight, Edit2, UserCog } from 'lucide-react';
import { toast } from 'sonner';

interface OrgNode {
  id: string;
  name: string;
  position: string;
  department: string;
  children?: OrgNode[];
}

const initialOrgData: OrgNode = {
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
            { id: '412', name: 'Lê Văn Cường', position: 'Backend Developer', department: 'Phát triển' },
          ]
        },
      ]
    },
  ]
};

interface OrgNodeProps {
  node: OrgNode;
  onEdit: (node: OrgNode) => void;
}

function OrgNodeComponent({ node, onEdit }: OrgNodeProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="bg-white rounded-xl shadow-md border-2 border-blue-200 p-4 w-64 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white">
                {node.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-sm mb-0.5">{node.name}</h3>
                <p className="text-xs text-gray-600">{node.position}</p>
              </div>
            </div>
            <button
              onClick={() => onEdit(node)}
              className="opacity-0 group-hover:opacity-100 p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-opacity"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2 px-2 py-1 bg-gray-100 rounded">
            {node.department}
          </div>
        </div>
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="mt-12 flex gap-8">
          {node.children!.map((child) => (
            <OrgNodeComponent key={child.id} node={child} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrgChartEnhanced() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedNode, setSelectedNode] = useState<OrgNode | null>(null);
  const [showDepartmentDialog, setShowDepartmentDialog] = useState(false);

  const [editForm, setEditForm] = useState({
    name: '',
    position: '',
    department: ''
  });

  const handleEditNode = (node: OrgNode) => {
    setSelectedNode(node);
    setEditForm({
      name: node.name,
      position: node.position,
      department: node.department
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    toast.info('Chức năng chỉnh sửa đang được phát triển.');
    setShowEditDialog(false);
  };

  const departments = [
    { name: 'Phát triển', count: 2, manager: 'Trần Thị Bình' },
    { name: 'Marketing', count: 3, manager: 'Hoàng Văn Em' },
    { name: 'Nhân sự', count: 2, manager: 'Lê Văn Cường' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Sơ đồ tổ chức</h1>
            <p className="text-gray-600">Cấu trúc tổ chức và phòng ban</p>
          </div>
          <button 
            onClick={() => setShowDepartmentDialog(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Users className="w-5 h-5" />
            Tổng hợp phòng ban
          </button>
        </div>

        {/* Org Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 overflow-x-auto">
          <div className="min-w-max">
            <OrgNodeComponent node={initialOrgData} onEdit={handleEditNode} />
          </div>
        </div>

        {/* Department Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl">Tổng hợp theo phòng ban</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {departments.map((dept) => (
              <div key={dept.name} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3>{dept.name}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                    {dept.count} người
                  </span>
                </div>
                <p className="text-sm text-gray-600">Quản lý: {dept.manager}</p>
                <button 
                  onClick={() => setShowDepartmentDialog(true)}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700"
                >
                  Xem danh sách →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Node Dialog */}
      <Dialog
        open={showEditDialog}
        onClose={() => setShowEditDialog(false)}
        title="Điều chỉnh vị trí nhân viên"
      >
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="mb-3">Thông tin hiện tại</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Tên:</span> <strong>{selectedNode?.name}</strong>
              </div>
              <div>
                <span className="text-gray-600">Vị trí:</span> <strong>{selectedNode?.position}</strong>
              </div>
              <div>
                <span className="text-gray-600">Phòng ban:</span> <strong>{selectedNode?.department}</strong>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Phòng ban mới *</label>
            <select
              value={editForm.department}
              onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Chọn phòng ban</option>
              <option value="Phát triển">Phát triển</option>
              <option value="Marketing">Marketing</option>
              <option value="Nhân sự">Nhân sự</option>
              <option value="Sales">Sales</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">Vị trí mới</label>
            <input
              type="text"
              value={editForm.position}
              onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: Senior Developer"
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              ⚠️ Thao tác này sẽ di chuyển nhân viên sang phòng ban mới. Hãy đảm bảo đã thông báo cho nhân viên.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveEdit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Xác nhận điều chuyển
            </button>
            <button
              onClick={() => setShowEditDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>

      {/* Department Detail Dialog */}
      <Dialog
        open={showDepartmentDialog}
        onClose={() => setShowDepartmentDialog(false)}
        title="Chi tiết phòng ban"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            {departments.map((dept) => (
              <button
                key={dept.name}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                {dept.name}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Tên</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Chức vị</th>
                  <th className="px-4 py-2 text-left text-sm text-gray-600">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        N
                      </div>
                      <span>Nguyễn Văn An</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Frontend Developer</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Đang làm việc
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        L
                      </div>
                      <span>Lê Văn Cường</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">Backend Developer</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Đang làm việc
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setShowDepartmentDialog(false)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Đóng
          </button>
        </div>
      </Dialog>
    </Layout>
  );
}
