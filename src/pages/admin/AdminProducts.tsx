import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Package, Plus, Edit, Trash2, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  colors: string[];
  inStock: boolean;
  createdAt: string;
}

const AdminProducts = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'createdAt'>>({
    name: '',
    category: '',
    price: 0,
    material: '',
    colors: [],
    inStock: true,
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
      return;
    }

    // Load initial products
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Cotton Shirt',
        category: 'shirts',
        price: 89.99,
        material: 'Cotton',
        colors: ['#FFFFFF', '#000000', '#8B5CF6'],
        inStock: true,
        createdAt: '2024-01-15',
      },
      {
        id: '2',
        name: 'Designer Denim Jeans',
        category: 'pants',
        price: 129.99,
        material: 'Denim',
        colors: ['#1F2937', '#3B82F6'],
        inStock: true,
        createdAt: '2024-01-10',
      },
      {
        id: '3',
        name: 'Luxury Leather Shoes',
        category: 'shoes',
        price: 199.99,
        material: 'Leather',
        colors: ['#000000', '#8B4513'],
        inStock: false,
        createdAt: '2024-01-05',
      },
    ];
    setProducts(sampleProducts);
  }, [isAdmin, navigate]);

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.material) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }

    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      material: '',
      colors: [],
      inStock: true,
    });
    setShowAddDialog(false);

    toast({
      title: "Product Added",
      description: `${product.name} has been added successfully`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    
    toast({
      title: "Product Deleted",
      description: "Product has been removed successfully",
    });
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bounce-in">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Product <span className="gradient-text">Management</span>
            </h1>
            <p className="text-white/70">Manage your product catalog</p>
          </div>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/10 text-white">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white"
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={newProduct.category} 
                    onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shirts">Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price ($)</Label>
                    <Input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label>Material</Label>
                    <Input
                      value={newProduct.material}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, material: e.target.value }))}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="e.g., Cotton"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setShowAddDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="hero" onClick={handleAddProduct}>
                    Add Product
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
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
                    placeholder="Search products..."
                  />
                </div>
                <div className="text-white/70">
                  {filteredProducts.length} of {products.length} products
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="glass-card border-white/10 hover-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-lg">{product.name}</CardTitle>
                    <p className="text-white/70 text-sm capitalize">{product.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:text-destructive/80"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Price</span>
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Material</span>
                    <span className="text-white">{product.material}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Colors</span>
                    <div className="flex gap-1">
                      {product.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Status</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      product.inStock 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <div className="text-xs text-white/50 pt-2 border-t border-white/10">
                    Added: {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg">No products found matching "{searchTerm}"</p>
            <p className="text-white/50">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminProducts;