import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/lib/mock-data';

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAr = i18n.language === 'ar';

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [sort, setSort] = useState('newest');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(searchParams.get('club') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedKitType, setSelectedKitType] = useState(searchParams.get('kitType') || '');
  const [inStockOnly, setInStockOnly] = useState(false);

  const clubs = [...new Set(mockProducts.map((p) => p.club))];

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];
    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(q) ||
          p.club.toLowerCase().includes(q) ||
          p.clubAr.includes(q) ||
          p.player?.toLowerCase().includes(q) ||
          p.playerAr?.includes(q)
      );
    }
    if (selectedClub) products = products.filter((p) => p.club === selectedClub);
    if (selectedCategory) products = products.filter((p) => p.category === selectedCategory);
    if (selectedKitType) products = products.filter((p) => p.kitType === selectedKitType);
    if (inStockOnly) products = products.filter((p) => p.variants.some((v) => v.stock > 0));

    switch (sort) {
      case 'price_asc': products.sort((a, b) => a.basePrice - b.basePrice); break;
      case 'price_desc': products.sort((a, b) => b.basePrice - a.basePrice); break;
      case 'newest': products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
    }
    return products;
  }, [search, selectedClub, selectedCategory, selectedKitType, inStockOnly, sort]);

  const clearFilters = () => {
    setSearch(''); setSelectedClub(''); setSelectedCategory(''); setSelectedKitType(''); setInStockOnly(false);
  };

  const hasActiveFilters = search || selectedClub || selectedCategory || selectedKitType || inStockOnly;

  return (
    <div className="container section-padding">
      <h1 className="text-3xl font-bold mb-6">{t('common.products')}</h1>

      {/* Search + Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ps-10"
            aria-label={t('common.search')}
          />
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full sm:w-48" aria-label={t('product.sortBy')}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t('product.newest')}</SelectItem>
            <SelectItem value="popularity">{t('product.popularity')}</SelectItem>
            <SelectItem value="price_asc">{t('product.priceLowHigh')}</SelectItem>
            <SelectItem value="price_desc">{t('product.priceHighLow')}</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => setFilterOpen(!filterOpen)}
          className="gap-2"
          aria-expanded={filterOpen}
          aria-label={t('product.filters')}
        >
          <SlidersHorizontal className="h-4 w-4" />
          {t('product.filters')}
        </Button>
      </div>

      {/* Filters panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glass-card rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium mb-2 block">{t('product.club')}</Label>
                <Select value={selectedClub} onValueChange={setSelectedClub}>
                  <SelectTrigger><SelectValue placeholder={t('common.all')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t('common.all')}</SelectItem>
                    {clubs.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">{t('product.kitType')}</Label>
                <Select value={selectedKitType} onValueChange={setSelectedKitType}>
                  <SelectTrigger><SelectValue placeholder={t('common.all')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t('common.all')}</SelectItem>
                    <SelectItem value="home">{t('product.home')}</SelectItem>
                    <SelectItem value="away">{t('product.away')}</SelectItem>
                    <SelectItem value="third">{t('product.third')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">{t('product.kitType')}</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger><SelectValue placeholder={t('common.all')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">{t('common.all')}</SelectItem>
                    <SelectItem value="shirt">{t('product.shirt')}</SelectItem>
                    <SelectItem value="full_kit">{t('product.fullKit')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="in-stock"
                    checked={inStockOnly}
                    onCheckedChange={(v) => setInStockOnly(!!v)}
                  />
                  <Label htmlFor="in-stock" className="text-sm">{t('product.availableOnly')}</Label>
                </div>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive gap-1">
                    <X className="h-3 w-3" />
                    {t('product.clearFilters')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedClub && <Badge variant="secondary" className="gap-1">{selectedClub} <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedClub('')} /></Badge>}
          {selectedCategory && <Badge variant="secondary" className="gap-1">{t(`product.${selectedCategory === 'shirt' ? 'shirt' : 'fullKit'}`)} <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('')} /></Badge>}
          {selectedKitType && <Badge variant="secondary" className="gap-1">{t(`product.${selectedKitType}`)} <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedKitType('')} /></Badge>}
        </div>
      )}

      {/* Results */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">{t('common.noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
