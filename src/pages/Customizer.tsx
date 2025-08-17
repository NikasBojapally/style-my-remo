import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/enhanced-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Shirt, ShoppingCart, Save, RotateCcw, Palette, Sparkles } from 'lucide-react';
import * as THREE from 'three';

// 3D Avatar Component
const Avatar = ({ clothing }: { clothing: any }) => {
  return (
    <mesh>
      <boxGeometry args={[2, 3, 0.5]} />
      <meshStandardMaterial color={clothing.color || '#3b82f6'} />
    </mesh>
  );
};

const Customizer = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('shirts');
  const [clothing, setClothing] = useState({
    category: 'shirts',
    color: '#8B5CF6',
    material: 'cotton',
    pattern: 'solid',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const clothingOptions = {
    shirts: {
      colors: ['#8B5CF6', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6B7280'],
      materials: ['cotton', 'silk', 'linen', 'polyester'],
      patterns: ['solid', 'stripes', 'dots', 'floral'],
    },
    pants: {
      colors: ['#1F2937', '#3B82F6', '#6B7280', '#92400E', '#374151', '#111827'],
      materials: ['denim', 'cotton', 'wool', 'polyester'],
      patterns: ['solid', 'checkered', 'stripes'],
    },
    shoes: {
      colors: ['#000000', '#FFFFFF', '#8B4513', '#DC2626', '#1F2937', '#3B82F6'],
      materials: ['leather', 'canvas', 'synthetic', 'suede'],
      patterns: ['solid', 'textured', 'mixed'],
    },
  };

  const handleClothingChange = (property: string, value: string) => {
    setClothing(prev => ({
      ...prev,
      [property]: value,
    }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setClothing(prev => ({
      ...prev,
      category,
    }));
  };

  const saveDesign = () => {
    const designs = JSON.parse(localStorage.getItem('remo_designs') || '[]');
    const newDesign = {
      id: Date.now().toString(),
      ...clothing,
      createdAt: new Date().toISOString(),
    };
    designs.push(newDesign);
    localStorage.setItem('remo_designs', JSON.stringify(designs));
    
    // Add to cart logic here
    const cartItems = JSON.parse(localStorage.getItem('remo_cart') || '[]');
    cartItems.push({
      ...newDesign,
      price: 99.99,
      quantity: 1,
    });
    localStorage.setItem('remo_cart', JSON.stringify(cartItems));
  };

  const resetDesign = () => {
    setClothing({
      category: selectedCategory,
      color: clothingOptions[selectedCategory as keyof typeof clothingOptions].colors[0],
      material: clothingOptions[selectedCategory as keyof typeof clothingOptions].materials[0],
      pattern: 'solid',
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  const currentOptions = clothingOptions[selectedCategory as keyof typeof clothingOptions];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">3D Customizer</span>
          </h1>
          <p className="text-xl text-white/70">
            Design your perfect clothing with our advanced 3D tools
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Preview */}
          <div className="fade-in-up">
            <Card className="glass-card border-white/10 shadow-card h-[600px]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full p-0">
                <div className="h-[500px] rounded-lg overflow-hidden bg-gradient-to-br from-background/50 to-secondary/30">
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    
                    <Avatar clothing={clothing} />
                    
                    <OrbitControls 
                      enablePan={false}
                      enableZoom={true}
                      enableRotate={true}
                      minDistance={3}
                      maxDistance={8}
                    />
                    <Environment preset="studio" />
                  </Canvas>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="fade-in-up delay-300">
            <Card className="glass-card border-white/10 shadow-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Customization Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/10">
                    <TabsTrigger value="shirts" className="data-[state=active]:bg-primary">
                      <Shirt className="h-4 w-4 mr-2" />
                      Shirts
                    </TabsTrigger>
                    <TabsTrigger value="pants" className="data-[state=active]:bg-primary">
                      Pants
                    </TabsTrigger>
                    <TabsTrigger value="shoes" className="data-[state=active]:bg-primary">
                      Shoes
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={selectedCategory} className="space-y-6">
                    {/* Colors */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Colors</h3>
                      <div className="grid grid-cols-6 gap-2">
                        {currentOptions.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleClothingChange('color', color)}
                            className={`w-12 h-12 rounded-xl border-2 transition-all hover:scale-110 ${
                              clothing.color === color 
                                ? 'border-primary shadow-glow' 
                                : 'border-white/20'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Materials</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {currentOptions.materials.map((material) => (
                          <Button
                            key={material}
                            variant={clothing.material === material ? "default" : "ghost"}
                            onClick={() => handleClothingChange('material', material)}
                            className="capitalize"
                          >
                            {material}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Patterns */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Patterns</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {currentOptions.patterns.map((pattern) => (
                          <Button
                            key={pattern}
                            variant={clothing.pattern === pattern ? "default" : "ghost"}
                            onClick={() => handleClothingChange('pattern', pattern)}
                            className="capitalize"
                          >
                            {pattern}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-6 border-t border-white/10">
                      <Button variant="hero" onClick={saveDesign} className="flex-1">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button variant="glass" onClick={saveDesign}>
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={resetDesign}>
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customizer;