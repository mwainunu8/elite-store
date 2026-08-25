import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { phoneBrands, watchBrands, categories } from '@/data/products';

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

const ProductFilters = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
}: ProductFiltersProps) => {
  const allBrands = selectedCategory === 'watches' 
    ? watchBrands 
    : selectedCategory === 'ipods' 
    ? ['Apple'] 
    : phoneBrands;

  return (
    <div className="space-y-6 p-6 bg-card rounded-xl shadow-elite-sm">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium text-sm text-foreground">Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === '' ? 'elite' : 'outline'}
            size="sm"
            onClick={() => {
              setSelectedCategory('');
              setSelectedBrand('');
            }}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'elite' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setSelectedBrand('');
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-3">
        <span className="font-medium text-sm text-foreground">Brands</span>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedBrand === '' ? 'accent' : 'outline'}
            size="sm"
            onClick={() => setSelectedBrand('')}
          >
            All Brands
          </Button>
          {allBrands.map((brand) => (
            <Button
              key={brand}
              variant={selectedBrand === brand ? 'accent' : 'outline'}
              size="sm"
              onClick={() => setSelectedBrand(brand)}
            >
              {brand}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
