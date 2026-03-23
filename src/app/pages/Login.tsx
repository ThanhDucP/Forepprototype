import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Building2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in - using useEffect to avoid render-time navigation
  useEffect(() => {
    if (user) {
      navigate(`/${user.role}/dashboard`);
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Đăng nhập thành công!');
      // Navigation will happen automatically after user state updates
    } catch (error) {
      toast.error('Email hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (role: string) => {
    const credentials: Record<string, { email: string; password: string }> = {
      employee: { email: 'employee@demo.com', password: 'demo' },
      lead: { email: 'lead@demo.com', password: 'demo' },
      hr: { email: 'hr@demo.com', password: 'demo' },
    };
    
    const cred = credentials[role];
    setEmail(cred.email);
    setPassword(cred.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">FOREP</h1>
          <p className="text-gray-600">Personal Workforce & Learning System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>

        {/* Quick login demo */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3 text-center">Demo - Đăng nhập nhanh:</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => quickLogin('employee')}
              className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Employee
            </button>
            <button
              onClick={() => quickLogin('lead')}
              className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Lead
            </button>
            <button
              onClick={() => quickLogin('hr')}
              className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              HR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}