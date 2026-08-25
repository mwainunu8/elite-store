import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Phone, Mail, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Product, formatPrice } from '@/data/products';
import { useToast } from '@/hooks/use-toast';

interface OrderFormProps {
  product: Product;
  onClose: () => void;
}

const OrderForm = ({ product, onClose }: OrderFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phoneNumber || !formData.location) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    // Prepare WhatsApp message
    const message = `🛒 *NEW ORDER - Elite Store*\n\n` +
      `📱 *Product:* ${product.name}\n` +
      `💰 *Price:* ${formatPrice(product.price)}\n` +
      `${product.storage ? `💾 *Storage:* ${product.storage}\n` : ''}` +
      `${product.ram ? `🧠 *RAM:* ${product.ram}\n` : ''}` +
      `\n👤 *Customer Details:*\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phoneNumber}\n` +
      `${formData.email ? `• Email: ${formData.email}\n` : ''}` +
      `• Location: ${formData.location}`;

    const whatsappUrl = `https://wa.me/255665974905?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Navigate to payment page
    navigate('/payment', { state: { product, customer: formData } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm animate-fade-in p-4">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-elite-xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="bg-hero-gradient p-6 text-primary-foreground">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Place Your Order</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {/* Product Preview */}
          <div className="mt-4 flex items-center gap-4 p-3 bg-primary-foreground/10 rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm opacity-90">{formatPrice(product.price)}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              placeholder="e.g., 0712345678"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email (Optional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location *
            </Label>
            <Input
              id="location"
              placeholder="City, Area, Street"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>

          <Button type="submit" variant="elite" size="xl" className="w-full mt-6 gap-2">
            <Package className="w-5 h-5" />
            Place Order
          </Button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
