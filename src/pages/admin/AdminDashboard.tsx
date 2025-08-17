import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { BarChart3, Users, ShoppingBag, DollarSign, TrendingUp, Package } from 'lucide-react';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  // Mock data for dashboard
  const stats = [
    { title: 'Total Revenue', value: '$45,231', icon: DollarSign, change: '+20.1%', color: 'text-green-500' },
    { title: 'Total Orders', value: '1,429', icon: ShoppingBag, change: '+15.3%', color: 'text-blue-500' },
    { title: 'Active Users', value: '12,543', icon: Users, change: '+8.2%', color: 'text-purple-500' },
    { title: 'Products', value: '324', icon: Package, change: '+2.4%', color: 'text-orange-500' },
  ];

  const recentOrders = [
    { id: 'REMO-001', customer: 'Sarah Johnson', product: 'Custom Shirt', amount: '$89.99', status: 'Processing' },
    { id: 'REMO-002', customer: 'Mike Chen', product: 'Designer Pants', amount: '$129.99', status: 'Shipped' },
    { id: 'REMO-003', customer: 'Emily Davis', product: 'Custom Shoes', amount: '$199.99', status: 'Delivered' },
    { id: 'REMO-004', customer: 'Alex Rodriguez', product: 'Custom Jacket', amount: '$249.99', status: 'Processing' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 bounce-in">
          <h1 className="text-4xl font-bold mb-2">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-white/70">Welcome to the REMO administrative panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 fade-in-up">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card border-white/10 hover-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
                    <p className={`text-sm mt-1 ${stat.color}`}>
                      <TrendingUp className="h-3 w-3 inline mr-1" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="fade-in-up">
            <Card className="glass-card border-white/10 shadow-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Recent Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 glass-card rounded-lg">
                      <div>
                        <p className="font-medium text-white">{order.customer}</p>
                        <p className="text-sm text-white/70">{order.product}</p>
                        <p className="text-xs text-white/50">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{order.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Delivered' 
                            ? 'bg-green-500/20 text-green-400' 
                            : order.status === 'Shipped'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="fade-in-up delay-300">
            <Card className="glass-card border-white/10 shadow-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Monthly Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Sales Target</span>
                      <span className="text-white">$50,000</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full" style={{width: '90%'}}></div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">90% completed</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Customer Satisfaction</span>
                      <span className="text-white">98.5%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-secondary h-2 rounded-full" style={{width: '98.5%'}}></div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">Excellent rating</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/70">Order Completion</span>
                      <span className="text-white">94.2%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-brand-accent h-2 rounded-full" style={{width: '94.2%'}}></div>
                    </div>
                    <p className="text-xs text-white/50 mt-1">On-time delivery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;