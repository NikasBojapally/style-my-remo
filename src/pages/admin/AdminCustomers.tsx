import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Users, Search, Mail, Calendar, ShoppingBag, Ban, CheckCircle } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastOrderDate?: string;
}

const AdminCustomers = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    // Load sample customers
    const sampleCustomers: Customer[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        joinDate: '2024-01-01',
        totalOrders: 5,
        totalSpent: 549.95,
        status: 'active',
        lastOrderDate: '2024-01-15',
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@example.com',
        joinDate: '2023-12-15',
        totalOrders: 3,
        totalSpent: 389.97,
        status: 'active',
        lastOrderDate: '2024-01-14',
      },
      {
        id: '3',
        name: 'Emily Davis',
        email: 'emily@example.com',
        joinDate: '2023-11-20',
        totalOrders: 8,
        totalSpent: 1249.92,
        status: 'active',
        lastOrderDate: '2024-01-10',
      },
      {
        id: '4',
        name: 'Alex Rodriguez',
        email: 'alex@example.com',
        joinDate: '2024-01-05',
        totalOrders: 1,
        totalSpent: 249.99,
        status: 'active',
        lastOrderDate: '2024-01-16',
      },
      {
        id: '5',
        name: 'Jessica Wilson',
        email: 'jessica@example.com',
        joinDate: '2023-10-10',
        totalOrders: 2,
        totalSpent: 179.98,
        status: 'inactive',
        lastOrderDate: '2023-12-01',
      },
    ];
    
    setCustomers(sampleCustomers);
  }, [isAdmin, navigate]);

  const toggleCustomerStatus = (customerId: string) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === customerId 
        ? { ...customer, status: customer.status === 'active' ? 'inactive' : 'active' } as Customer
        : customer
    );
    setCustomers(updatedCustomers);
    
    const customer = customers.find(c => c.id === customerId);
    const newStatus = customer?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: "Customer Status Updated",
      description: `${customer?.name} is now ${newStatus}`,
    });
  };

  const getCustomerLevel = (totalSpent: number) => {
    if (totalSpent >= 1000) return { level: 'VIP', color: 'text-yellow-400' };
    if (totalSpent >= 500) return { level: 'Gold', color: 'text-orange-400' };
    if (totalSpent >= 200) return { level: 'Silver', color: 'text-gray-400' };
    return { level: 'Bronze', color: 'text-amber-600' };
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.totalOrders, 0);

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 bounce-in">
          <h1 className="text-4xl font-bold mb-2">
            Customer <span className="gradient-text">Management</span>
          </h1>
          <p className="text-white/70">Manage your customer base and relationships</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8 fade-in-up">
          <Card className="glass-card border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{totalCustomers}</div>
              <div className="text-white/70 text-sm">Total Customers</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mb-3 mx-auto">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{activeCustomers}</div>
              <div className="text-white/70 text-sm">Active Customers</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-brand-accent rounded-lg flex items-center justify-center mb-3 mx-auto">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">${totalRevenue.toFixed(0)}</div>
              <div className="text-white/70 text-sm">Total Revenue</div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">${averageOrderValue.toFixed(0)}</div>
              <div className="text-white/70 text-sm">Avg Order Value</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8 fade-in-up">
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Search customers..."
                  />
                </div>
                <div className="text-white/70">
                  {filteredCustomers.length} customers
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customers List */}
        <div className="space-y-4 fade-in-up">
          {filteredCustomers.map((customer) => {
            const customerLevel = getCustomerLevel(customer.totalSpent);
            return (
              <Card key={customer.id} className="glass-card border-white/10 hover-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-white">{customer.name}</h3>
                          <span className={`text-sm font-medium ${customerLevel.color}`}>
                            {customerLevel.level}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm">
                          <Mail className="h-4 w-4" />
                          {customer.email}
                        </div>
                        <div className="flex items-center gap-2 text-white/50 text-sm mt-1">
                          <Calendar className="h-4 w-4" />
                          Joined {new Date(customer.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="space-y-2">
                        <div>
                          <div className="text-2xl font-bold text-primary">
                            ${customer.totalSpent.toFixed(2)}
                          </div>
                          <div className="text-white/70 text-sm">
                            {customer.totalOrders} orders
                          </div>
                        </div>
                        
                        {customer.lastOrderDate && (
                          <div className="text-white/50 text-xs">
                            Last order: {new Date(customer.lastOrderDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                        customer.status === 'active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {customer.status === 'active' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Ban className="h-4 w-4" />
                        )}
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        View Orders
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                      <Button 
                        variant={customer.status === 'active' ? 'ghost' : 'glow'}
                        size="sm"
                        onClick={() => toggleCustomerStatus(customer.id)}
                      >
                        {customer.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg">No customers found matching "{searchTerm}"</p>
            <p className="text-white/50">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminCustomers;