import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'employee' | 'manager' | 'hr' | 'ceo' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  managerId?: string;
  branchId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    email: 'employee@demo.com',
    name: 'Nguyễn Văn An',
    role: 'employee',
    department: 'Phát triển sản phẩm',
    position: 'Frontend Developer',
    branchId: 'HN01'
  },
  {
    id: '2',
    email: 'manager@demo.com',
    name: 'Trần Thị Bình',
    role: 'manager',
    department: 'Phát triển sản phẩm',
    position: 'Team Lead',
    branchId: 'HN01'
  },
  {
    id: '3',
    email: 'hr@demo.com',
    name: 'Lê Văn Cường',
    role: 'hr',
    department: 'Nhân sự',
    position: 'HR Manager',
    branchId: 'HN01'
  },
  {
    id: '4',
    email: 'ceo@demo.com',
    name: 'Phạm Thị Dung',
    role: 'ceo',
    department: 'Ban lãnh đạo',
    position: 'CEO',
  },
  {
    id: '5',
    email: 'admin@demo.com',
    name: 'Hoàng Văn Admin',
    role: 'admin',
    department: 'IT',
    position: 'System Administrator',
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock login - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Email hoặc mật khẩu không đúng');
    }
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Mock registration
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email,
      name,
      role,
      department: 'Chưa phân công',
      position: 'Nhân viên mới'
    };
    mockUsers.push(newUser);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}