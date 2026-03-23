import { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  TrendingUp, 
  GraduationCap, 
  Route, 
  Layers,
  Building2,
  BookOpen,
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/${user.role}/dashboard` },
    ];

    switch (user.role) {
      case 'employee':
        return [
          ...baseItems,
          { icon: Activity, label: 'Work Profile', path: '/employee/work-profile' },
          { icon: TrendingUp, label: 'Hiệu suất', path: '/employee/performance' },
          { icon: Layers, label: 'Kỹ năng', path: '/employee/skills' },
          { icon: GraduationCap, label: 'Học tập', path: '/employee/learning' },
          { icon: Route, label: 'Lộ trình', path: '/employee/career' },
        ];
      case 'lead':
        return [
          ...baseItems,
          { icon: Users, label: 'Team của tôi', path: '/lead/team' },
          { icon: MessageSquare, label: '1:1 Meetings', path: '/lead/one-on-one' },
        ];
      case 'hr':
        return [
          ...baseItems,
          { icon: Users, label: 'Nhân sự', path: '/hr/employees' },
          { icon: Layers, label: 'Skill Framework', path: '/hr/skill-framework' },
          { icon: BookOpen, label: 'Chương trình đào tạo', path: '/hr/programs' },
          { icon: Building2, label: 'Sơ đồ tổ chức', path: '/hr/org-chart' },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getNavigationItems();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl">FOREP</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div>{user.name}</div>
              <div className="text-sm text-gray-500">{user.position}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-gray-100 text-red-600"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-gray-200 z-20
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 text-left transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}