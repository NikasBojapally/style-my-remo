import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Shield, User, Lock, ArrowLeft } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { username?: string; password?: string } = {};
    
    if (!username) {
      newErrors.username = 'Username is required';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (adminLogin(username, password)) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-accent/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-10 flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 bounce-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center shadow-glow">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <span className="text-3xl font-bold gradient-text">REMO</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-white/70">Sign in to the administrative panel</p>
        </div>

        <Card className="glass-card border-white/10 shadow-card fade-in-up">
          <CardHeader>
            <CardTitle className="text-center text-white flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-brand-accent" />
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white/90">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Enter admin username"
                  />
                </div>
                {errors.username && <p className="text-destructive text-sm">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white/90">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Enter admin password"
                  />
                </div>
                {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
              </div>

              <Button type="submit" variant="admin" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <div className="glass-card rounded-lg p-4">
            <h3 className="text-white font-medium mb-2">Demo Credentials</h3>
            <div className="text-sm text-white/70 space-y-1">
              <p>Username: <span className="text-primary">admin</span></p>
              <p>Password: <span className="text-primary">admin123</span></p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-white/50 text-sm">
            Need customer access?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors">
              User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;