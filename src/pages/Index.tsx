import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Watch, Music, Shield, Truck, Headphones, Star, Gamepad2, Glasses } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import OrderForm from '@/components/order/OrderForm';
import { Product } from '@/data/products';
import { useProducts } from '@/hooks/use-products';

const Index = () => {
const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featuredProducts = products.slice(0, 8);

  const categories = [
    {
      name: 'Mobile Phones',
      icon: Smartphone,
      description: 'Latest smartphones from top brands',
      count: products.filter(p => p.category === 'phones').length,
      link: '/products?category=phones',
      color: 'from-elite-navy to-elite-cyan',
    },
    {
      name: 'Smart Watches',
      icon: Watch,
      description: 'Premium smartwatches for every style',
      count: products.filter(p => p.category === 'watches').length,
      link: '/products?category=watches',
      color: 'from-elite-cyan to-elite-gold',
    },
    {
      name: 'iPods',
      icon: Music,
      description: 'Classic music players for audiophiles',
      count: products.filter(p => p.category === 'ipods').length,
      link: '/products?category=ipods',
      color: 'from-elite-gold to-elite-navy',
    },
    {
      name: 'Gamepads',
      icon: Gamepad2,
      description: 'Premium gaming controllers for all platforms',
      count: products.filter(p => p.category === 'gamepads').length,
      link: '/products?category=gamepads',
      color: 'from-purple-600 to-pink-600',
    },
    {
      name: 'Smart Glasses',
      icon: Glasses,
      description: 'Next-gen AR and smart eyewear',
      count: products.filter(p => p.category === 'smart-glasses').length,
      link: '/products?category=smart-glasses',
      color: 'from-blue-600 to-indigo-600',
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Genuine Products',
      description: '100% authentic products with warranty',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery nationwide',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Always here to help via WhatsApp',
    },
    {
      icon: Star,
      title: 'Best Prices',
      description: 'Competitive prices guaranteed',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <span className="inline-block px-4 py-2 bg-accent/20 rounded-full text-accent text-sm font-medium mb-6 animate-pulse-glow">
              🎉 Welcome to Elite Store
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
              Premium Electronics
              <span className="block text-accent">at Your Fingertips</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl">
              Discover our curated collection of mobile phones, smartwatches, gamepads, smart glasses, and iPods. Quality guaranteed, delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl" className="gap-2">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button variant="heroOutline" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our extensive collection of premium electronics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.link}
                className={`group relative p-8 rounded-2xl bg-gradient-to-br ${category.color} text-primary-foreground overflow-hidden hover-lift animate-fade-in opacity-0 stagger-${index + 1}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />
                <div className="relative z-10">
                  <category.icon className="w-12 h-12 mb-4" />
                  <h3 className="font-display text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-primary-foreground/80 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.count} Products</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Handpicked selection of our best sellers
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={setSelectedProduct}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Elite Store?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`text-center p-8 bg-card rounded-xl shadow-elite-sm hover:shadow-elite-lg transition-shadow animate-fade-in opacity-0 stagger-${index + 1}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Shop?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Browse our complete collection and find the perfect device for you. Fast delivery and secure payments guaranteed.
          </p>
          <Link to="/products">
            <Button variant="accent" size="xl" className="gap-2">
              Browse All Products
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Order Form Modal */}
      {selectedProduct && (
        <OrderForm
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Index;