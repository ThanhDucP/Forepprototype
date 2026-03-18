import { useState } from 'react';
import Layout from '../../components/Layout';
import { Dialog } from '../../components/Dialog';
import { Settings, Plus, Edit, Save } from 'lucide-react';
import { toast } from 'sonner';

const systemConfig = [
  { id: 1, key: 'work_hours_per_day', value: '8', description: 'Số giờ làm việc chuẩn mỗi ngày', category: 'Chấm công' },
  { id: 2, key: 'annual_leave_days', value: '12', description: 'Số ngày phép năm mặc định', category: 'Chấm công' },
  { id: 3, key: 'probation_days', value: '60', description: 'Thời gian thử việc (ngày)', category: 'Nhân sự' },
  { id: 4, key: 'check_in_radius', value: '100', description: 'Bán kính cho phép chấm công (mét)', category: 'Chấm công' },
  { id: 5, key: 'max_late_minutes', value: '15', description: 'Số phút được phép đi muộn', category: 'Chấm công' },
  { id: 6, key: 'salary_day', value: '10', description: 'Ngày trả lương hàng tháng', category: 'Lương' },
  { id: 7, key: 'insurance_percent', value: '10.5', description: 'Phần trăm đóng BHXH', category: 'Lương' },
  { id: 8, key: 'kpi_passing_score', value: '70', description: 'Điểm KPI đạt chuẩn', category: 'Hiệu suất' },
  { id: 9, key: 'review_frequency_days', value: '90', description: 'Chu kỳ đánh giá (ngày)', category: 'Hiệu suất' },
];

export default function SystemConfig() {
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  const [configFormData, setConfigFormData] = useState({
    key: '',
    value: '',
    description: '',
    category: 'Chấm công',
  });

  const handleEditConfig = (config: any) => {
    setEditingConfig(config);
    setConfigFormData({
      key: config.key,
      value: config.value,
      description: config.description,
      category: config.category,
    });
    setShowConfigDialog(true);
  };

  const handleCreateConfig = () => {
    setEditingConfig(null);
    setConfigFormData({
      key: '',
      value: '',
      description: '',
      category: 'Chấm công',
    });
    setShowConfigDialog(true);
  };

  const handleSaveConfig = () => {
    toast.success(editingConfig ? 'Cập nhật cấu hình thành công!' : 'Tạo cấu hình thành công!');
    setShowConfigDialog(false);
  };

  const categories = ['Chấm công', 'Nhân sự', 'Lương', 'Hiệu suất'];

  const filteredConfig = systemConfig.filter(config => {
    return filterCategory === 'all' || config.category === filterCategory;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl mb-2">Cấu hình hệ thống</h1>
            <p className="text-gray-600">Quản lý các thông số cấu hình toàn hệ thống</p>
          </div>
          <button
            onClick={handleCreateConfig}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Thêm cấu hình
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Config List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredConfig.map((config) => (
            <div key={config.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-mono text-sm">{config.key}</h3>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                      {config.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{config.description}</p>
                  <div className="bg-gray-50 rounded px-3 py-2">
                    <span className="text-sm text-gray-500">Giá trị: </span>
                    <span className="text-lg">{config.value}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleEditConfig(config)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ml-2"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h2 className="text-xl mb-4">Cấu hình nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">Backup & Restore</h3>
              <p className="text-sm text-gray-600 mb-3">Sao lưu hoặc khôi phục cấu hình hệ thống</p>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                  Backup
                </button>
                <button className="px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm">
                  Restore
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="mb-2">Reset về mặc định</h3>
              <p className="text-sm text-gray-600 mb-3">Khôi phục tất cả cấu hình về giá trị mặc định</p>
              <button className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                Reset All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Config Dialog */}
      <Dialog
        open={showConfigDialog}
        onClose={() => setShowConfigDialog(false)}
        title={editingConfig ? 'Chỉnh sửa cấu hình' : 'Thêm cấu hình mới'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Key *</label>
            <input
              type="text"
              value={configFormData.key}
              onChange={(e) => setConfigFormData({ ...configFormData, key: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="VD: max_login_attempts"
              disabled={!!editingConfig}
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Giá trị *</label>
            <input
              type="text"
              value={configFormData.value}
              onChange={(e) => setConfigFormData({ ...configFormData, value: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VD: 5"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Mô tả *</label>
            <textarea
              value={configFormData.description}
              onChange={(e) => setConfigFormData({ ...configFormData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Mô tả ngắn gọn về cấu hình này"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Danh mục *</label>
            <select
              value={configFormData.category}
              onChange={(e) => setConfigFormData({ ...configFormData, category: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSaveConfig}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {editingConfig ? 'Cập nhật' : 'Tạo mới'}
            </button>
            <button
              onClick={() => setShowConfigDialog(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
          </div>
        </div>
      </Dialog>
    </Layout>
  );
}
