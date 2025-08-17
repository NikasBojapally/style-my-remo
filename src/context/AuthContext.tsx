import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  adminLogin: (username: string, password: string) => boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('remo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('remo_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('remo_user', JSON.stringify(userWithoutPassword));
      toast({
        title: "Welcome back!",
        description: `Logged in successfully as ${foundUser.name}`,
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  };

  const signup = (name: string, email: string, password: string): boolean => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('remo_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      toast({
        title: "Signup Failed",
        description: "User with this email already exists",
        variant: "destructive",
      });
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
    };
    
    users.push(newUser);
    localStorage.setItem('remo_users', JSON.stringify(users));
    
    toast({
      title: "Account Created!",
      description: "Please log in with your new account",
    });
    return true;
  };

  const adminLogin = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        name: 'Administrator',
        email: 'admin@remo.com',
        isAdmin: true,
      };
      setUser(adminUser);
      localStorage.setItem('remo_user', JSON.stringify(adminUser));
      toast({
        title: "Admin Access Granted",
        description: "Welcome to REMO Admin Panel",
      });
      return true;
    }
    
    toast({
      title: "Admin Login Failed",
      description: "Invalid admin credentials",
      variant: "destructive",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('remo_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const value = {
    user,
    login,
    signup,
    logout,
    adminLogin,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};