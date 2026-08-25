import { Product, formatPrice } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Smartphone,
  Watch,
  Music,
  ImageOff,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onOrder: (product: Product) => void;
  index?: number;
}

const FALLBACK_IMAGES: Record<string, string> = {
  phones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
  watches:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  ipods:
    "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80";

const ProductCard = ({ product, onOrder, index = 0 }: ProductCardProps) => {
  const getCategoryIcon = () => {
    const category = product.category?.toLowerCase() || "";
    
    switch (category) {
      case "phones":
        return <Smartphone className="w-4 h-4" />;
      case "watches":
        return <Watch className="w-4 h-4" />;
      case "ipods":
        return <Music className="w-4 h-4" />;
      default:
        return <ImageOff className="w-4 h-4" />;
    }
  };

  const getImage = (): string => {
    const image = product.image;
    
    if (image && typeof image === "string" && image.trim() !== "") {
      return image;
    }

    const category = product.category?.toLowerCase() || "";
    return FALLBACK_IMAGES[category] || DEFAULT_IMAGE;
  };

  const imageUrl = getImage();

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    const category = product.category?.toLowerCase() || "";
    const fallback = FALLBACK_IMAGES[category] || DEFAULT_IMAGE;

    if (image.src !== fallback) {
      image.src = fallback;
    }
  };

  const getCategoryDisplay = (): string => {
    const category = product.category;
    if (!category) return "Product";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Calculate stagger delay class
  const getStaggerClass = (): string => {
    const position = (index % 6) + 1;
    return `stagger-${position}`;
  };

  return (
    <div
      className={`group bg-card rounded-xl overflow-hidden shadow-elite-sm hover:shadow-elite-lg transition-all duration-500 hover:-translate-y-2 animate-fade-in opacity-0 ${getStaggerClass()}`}
      style={{ animationFillMode: "forwards" }}
    >
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={imageUrl}
          alt={product.name}
          onError={handleImageError}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
          {getCategoryIcon()}
          {getCategoryDisplay()}
        </div>

        {/* Brand Badge */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-xs font-semibold">
          {product.brand}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>

          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {product.description || "Quality product from Elite Store."}
          </p>
        </div>

        {/* SPECS */}
        {(product.storage || product.ram) && (
          <div className="flex items-center gap-2 flex-wrap">
            {product.storage && (
              <span className="px-2.5 py-1 bg-secondary rounded-md text-xs font-medium text-secondary-foreground">
                {product.storage}
              </span>
            )}
            {product.ram && (
              <span className="px-2.5 py-1 bg-secondary rounded-md text-xs font-medium text-secondary-foreground">
                {product.ram} RAM
              </span>
            )}
          </div>
        )}

        {/* PRICE & ACTION */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-muted-foreground text-xs">Price</span>
            <p className="font-display font-bold text-lg text-accent">
              {formatPrice(product.price)}
            </p>
          </div>

          <Button
            variant="accent"
            size="sm"
            onClick={() => onOrder(product)}
            className="gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Order Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;