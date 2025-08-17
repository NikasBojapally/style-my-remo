import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/enhanced-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Truck } from 'lucide-react';

interface CartItem {
  id: string;
  category: string;
  color: string;
  material: string;
  pattern: string;
  price: number;
  quantity: number;
}

interface CheckoutForm {
  name: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Load cart items from localStorage
    const items = JSON.parse(localStorage.getItem('remo_cart') || '[]');
    setCartItems(items);
  }, [isAuthenticated, navigate]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('remo_cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('remo_cart', JSON.stringify(updatedItems));
    
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['name', 'email', 'address', 'city', 'zipCode', 'cardNumber', 'expiryDate', 'cvv'];
    const missingFields = requiredFields.filter(field => !checkoutForm[field as keyof CheckoutForm]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill out all checkout fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate order processing
    const orderId = `REMO-${Date.now()}`;
    
    // Clear cart
    setCartItems([]);
    localStorage.removeItem('remo_cart');
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order ${orderId} is being processed`,
    });
    
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 bounce-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shopping <span className="gradient-text">Cart</span>
          </h1>
          <p className="text-xl text-white/70">
            Review your custom designs and complete your order
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart
          <div className="text-center py-12 fade-in-up">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mb-6 mx-auto">
              <ShoppingCart className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-white/70 mb-8">
              Start creating your custom clothing designs!
            </p>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/customizer')}
            >
              Start Customizing
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 fade-in-up">
              {cartItems.map((item) => (
                <Card key={item.id} className="glass-card border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Item Preview */}
                      <div 
                        className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.category.charAt(0).toUpperCase()}
                      </div>
                      
                      {/* Item Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white capitalize mb-1">
                          Custom {item.category}
                        </h3>
                        <div className="text-sm text-white/70 space-y-1">
                          <p>Material: <span className="capitalize">{item.material}</span></p>
                          <p>Pattern: <span className="capitalize">{item.pattern}</span></p>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Price and Remove */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-white mb-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="fade-in-up delay-300">
              <Card className="glass-card border-white/10 shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/70">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/70">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2">
                      <div className="flex justify-between text-lg font-bold text-white">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {!showCheckout ? (
                    <div className="space-y-3">
                      <Button 
                        variant="hero" 
                        className="w-full"
                        onClick={() => setShowCheckout(true)}
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Proceed to Checkout
                      </Button>
                      
                      <div className="flex items-center gap-2 text-white/70 text-sm">
                        <Truck className="h-4 w-4" />
                        <span>Free shipping on orders over $100</span>
                      </div>
                    </div>
                  ) : (
                    // Checkout Form
                    <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/90 text-sm">Name</Label>
                          <Input
                            value={checkoutForm.name}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, name: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white text-sm"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-white/90 text-sm">Email</Label>
                          <Input
                            type="email"
                            value={checkoutForm.email}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, email: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white text-sm"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white/90 text-sm">Address</Label>
                        <Input
                          value={checkoutForm.address}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, address: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white text-sm"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/90 text-sm">City</Label>
                          <Input
                            value={checkoutForm.city}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, city: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white text-sm"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-white/90 text-sm">ZIP Code</Label>
                          <Input
                            value={checkoutForm.zipCode}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, zipCode: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white text-sm"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white/90 text-sm">Card Number</Label>
                        <Input
                          value={checkoutForm.cardNumber}
                          onChange={(e) => setCheckoutForm(prev => ({ ...prev, cardNumber: e.target.value }))}
                          className="bg-white/10 border-white/20 text-white text-sm"
                          placeholder="**** **** **** ****"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-white/90 text-sm">Expiry</Label>
                          <Input
                            value={checkoutForm.expiryDate}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, expiryDate: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white text-sm"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-white/90 text-sm">CVV</Label>
                          <Input
                            value={checkoutForm.cvv}
                            onChange={(e) => setCheckoutForm(prev => ({ ...prev, cvv: e.target.value }))}
                            className="bg-white/10 border-white/20 text-white text-sm"
                            placeholder="***"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3 pt-4">
                        <Button type="submit" variant="hero" className="w-full">
                          Complete Order
                        </Button>
                        <Button 
                          type="button"
                          variant="ghost" 
                          className="w-full"
                          onClick={() => setShowCheckout(false)}
                        >
                          Back to Summary
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;