import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/enhanced-button';
import { useAuth } from '@/context/AuthContext';
import { Shirt, Sparkles, Users, Palette, ArrowRight, Play } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(267_84%_64%_/_0.3)_0%,transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-brand-secondary/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-brand-accent/20 rounded-full blur-xl animate-pulse delay-500"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="bounce-in">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 glass-card rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">AI-Powered Fashion Customization</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="gradient-text">REMO</span>
              <br />
              <span className="text-white">Revolution</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your style with cutting-edge 3D customization. Design, visualize, and create 
              clothing that's uniquely yours with our revolutionary platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              {isAuthenticated ? (
                isAdmin ? (
                  <Link to="/admin/dashboard">
                    <Button variant="hero" size="xl" className="group">
                      Admin Dashboard
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/customizer">
                    <Button variant="hero" size="xl" className="group">
                      Start Customizing
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )
              ) : (
                <>
                  <Link to="/signup">
                    <Button variant="hero" size="xl" className="group">
                      Get Started Free
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button variant="glass" size="xl" className="group">
                    <Play className="h-5 w-5" />
                    Watch Demo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Why Choose REMO?</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience the future of fashion with our innovative platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card rounded-2xl p-8 hover-shadow group">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">3D Customization</h3>
              <p className="text-white/70 leading-relaxed">
                Design with precision using our advanced 3D modeling tools. See your creations come to life in real-time.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover-shadow group">
              <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shirt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Premium Materials</h3>
              <p className="text-white/70 leading-relaxed">
                Choose from hundreds of high-quality fabrics and materials for your custom designs.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 hover-shadow group">
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Community Driven</h3>
              <p className="text-white/70 leading-relaxed">
                Join thousands of creators sharing and discovering amazing custom clothing designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-primary/10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to revolutionize your wardrobe?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join REMO today and start creating fashion that's uniquely you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="group">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="glass" size="xl">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
