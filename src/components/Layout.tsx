import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/enhanced-button';
import { useAuth } from '@/context/AuthContext';
import { Shirt, User, LogOut, ShoppingCart, Home, Info, Phone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({ to, children, icon }: { to: string; children: React.ReactNode; icon: React.ReactNode }) => (
    <Link to={to}>
      <Button
        variant={isActiveRoute(to) ? "default" : "ghost"}
        size="sm"
        className={`flex items-center gap-2 transition-all duration-300 ${
          isActiveRoute(to) 
            ? 'bg-primary text-primary-foreground shadow-glow' 
            : 'hover:bg-white/10 hover:text-white'
        }`}
      >
        {icon}
        {children}
      </Button>
    </Link>
  );

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">REMO</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <NavLink to="/" icon={<Home className="h-4 w-4" />}>
                Home
              </NavLink>
              {user && !isAdmin && (
                <NavLink to="/customizer" icon={<Shirt className="h-4 w-4" />}>
                  Customizer
                </NavLink>
              )}
              <NavLink to="/about" icon={<Info className="h-4 w-4" />}>
                About
              </NavLink>
              <NavLink to="/contact" icon={<Phone className="h-4 w-4" />}>
                Contact
              </NavLink>
              {user && !isAdmin && (
                <NavLink to="/cart" icon={<ShoppingCart className="h-4 w-4" />}>
                  Cart
                </NavLink>
              )}
            </nav>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg glass-card">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{user.name}</span>
                    {isAdmin && (
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <Button
                    onClick={logout}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-destructive/20 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="default" size="sm" className="bg-gradient-primary hover:opacity-90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Shirt className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">REMO</span>
            </div>
            <p className="text-muted-foreground">
              Revolutionizing fashion with AI-powered customization
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
              <span>© 2024 REMO. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;