import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shirt, Target, Users, Award, Zap, Heart } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 bounce-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">REMO</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the fashion industry with AI-powered 3D customization, 
            making personalized clothing accessible to everyone.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20 fade-in-up">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Our Mission
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-6">
                At REMO, we believe that fashion should be as unique as you are. Our cutting-edge 
                platform combines artificial intelligence with advanced 3D modeling to create 
                a completely personalized clothing experience.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                We're not just creating clothes – we're crafting identities, expressions, 
                and connections through innovative design technology.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Target className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-center text-white mb-4">
                Personalized Fashion for Everyone
              </h3>
              <p className="text-white/70 text-center">
                Making custom clothing accessible, affordable, and sustainable 
                through innovative technology.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card border-white/10 hover-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-center">
                  Pushing the boundaries of fashion technology with AI and 3D design tools.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 hover-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-center">
                  Reducing waste through made-to-order production and sustainable materials.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/10 hover-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-center">
                  Building a global community of creators and fashion enthusiasts.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20 fade-in-up">
          <div className="glass-card rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">
              REMO by the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">50K+</div>
                <p className="text-white/70">Happy Customers</p>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">1M+</div>
                <p className="text-white/70">Custom Designs</p>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">99%</div>
                <p className="text-white/70">Satisfaction Rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                <p className="text-white/70">Support Available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Leadership Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Chen', role: 'CEO & Co-Founder', specialty: '10+ years in fashion tech' },
              { name: 'Alex Rodriguez', role: 'CTO & Co-Founder', specialty: 'AI & 3D Graphics Expert' },
              { name: 'Maya Patel', role: 'Head of Design', specialty: 'Fashion Industry Veteran' },
            ].map((member, index) => (
              <Card key={index} className="glass-card border-white/10 hover-shadow">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-white">{member.name}</CardTitle>
                  <p className="text-primary">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center text-sm">
                    {member.specialty}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;