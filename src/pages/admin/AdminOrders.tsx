import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, Search, Eye, Package, Truck, CheckCircle } from 'lucide-react';

interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  products: Array<{
    name: string;
    category: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: string;
}

const AdminOrders = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    // Load sample orders
    const sampleOrders: Order[] = [
      {
        id: 'REMO-001',
        customerId: '1',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@example.com',
        products: [
          { name: 'Custom Shirt', category: 'shirts', price: 89.99, quantity: 2 }
        ],
        total: 179.98,
        status: 'processing',
        createdAt: '2024-01-15',
        shippingAddress: '123 Main St, New York, NY 10001',
      },
      {
        id: 'REMO-002',
        customerId: '2',
        customerName: 'Mike Chen',
        customerEmail: 'mike@example.com',
        products: [
          { name: 'Designer Pants', category: 'pants', price: 129.99, quantity: 1 },
          { name: 'Custom Shirt', category: 'shirts', price: 89.99, quantity: 1 }
        ],
        total: 219.98,
        status: 'shipped',
        createdAt: '2024-01-14',
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      },
      {
        id: 'REMO-003',
        customerId: '3',
        customerName: 'Emily Davis',
        customerEmail: 'emily@example.com',
        products: [
          { name: 'Luxury Shoes', category: 'shoes', price: 199.99, quantity: 1 }
        ],
        total: 199.99,
        status: 'delivered',
        createdAt: '2024-01-10',
        shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      },
      {
        id: 'REMO-004',
        customerId: '4',
        customerName: 'Alex Rodriguez',
        customerEmail: 'alex@example.com',
        products: [
          { name: 'Custom Jacket', category: 'jackets', price: 249.99, quantity: 1 }
        ],
        total: 249.99,
        status: 'pending',
        createdAt: '2024-01-16',
        shippingAddress: '321 Elm St, Miami, FL 33101',
      },
    ];
    
    setOrders(sampleOrders);
  }, [isAdmin, navigate]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Package className="h-4 w-4" />;
      case 'processing':
        return <ShoppingBag className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500/20 text-orange-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-400';
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 bounce-in">
          <h1 className="text-4xl font-bold mb-2">
            Order <span className="gradient-text">Management</span>
          </h1>
          <p className="text-white/70">Track and manage customer orders</p>
        </div>

        {/* Filters */}
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
                    placeholder="Search orders, customers..."
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="text-white/70">
                  {filteredOrders.length} orders
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <div className="space-y-4 fade-in-up">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="glass-card border-white/10 hover-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                      <p className="text-white/70">{order.customerName}</p>
                      <p className="text-white/50 text-sm">{order.customerEmail}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">${order.total.toFixed(2)}</p>
                    <p className="text-white/50 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Products */}
                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Products:</h4>
                  <div className="space-y-1">
                    {order.products.map((product, index) => (
                      <div key={index} className="flex justify-between text-sm text-white/70">
                        <span>{product.quantity}x {product.name}</span>
                        <span>${(product.price * product.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-4 text-sm text-white/70">
                  <span className="font-medium">Ship to:</span> {order.shippingAddress}
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    
                    {order.status === 'pending' && (
                      <Button 
                        variant="glow" 
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, 'processing')}
                      >
                        Start Processing
                      </Button>
                    )}
                    
                    {order.status === 'processing' && (
                      <Button 
                        variant="glow" 
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, 'shipped')}
                      >
                        Mark Shipped
                      </Button>
                    )}
                    
                    {order.status === 'shipped' && (
                      <Button 
                        variant="glow" 
                        size="sm"
                        onClick={() => updateOrderStatus(order.id, 'delivered')}
                      >
                        Mark Delivered
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg">
              {searchTerm || statusFilter !== 'all' 
                ? `No orders found matching your criteria` 
                : 'No orders yet'
              }
            </p>
            <p className="text-white/50">
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search terms or filters'
                : 'Orders will appear here as customers place them'
              }
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminOrders;