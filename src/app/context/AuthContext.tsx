import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'employee' | 'lead' | 'hr';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  position?: string;
  level?: string;
  managerId?: string;
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
    department: 'Engineering',
    position: 'Frontend Developer',
    level: 'Mid'
  },
  {
    id: '2',
    email: 'lead@demo.com',
    name: 'Trần Thị Bình',
    role: 'lead',
    department: 'Engineering',
    position: 'Team Lead'
  },
  {
    id: '3',
    email: 'hr@demo.com',
    name: 'Lê Văn Cường',
    role: 'hr',
    department: 'HR',
    position: 'HR Manager'
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