import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Minus, Plus, ShoppingCart, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockProducts } from '@/lib/mock-data';
import { useCartStore } from '@/stores/cart';
import { ProductCard } from '@/components/product/ProductCard';
import type { ProductVariant } from '@/types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const isAr = i18n.language === 'ar';
  const BackArrow = isAr ? ArrowRight : ArrowLeft;

  const product = mockProducts.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants.find((v) => v.stock > 0) || null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <p className="text-muted-foreground text-lg">{t('common.noResults')}</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to="/products"><BackArrow className="h-4 w-4 me-2" />{t('common.back')}</Link>
        </Button>
      </div>
    );
  }

  const name = isAr ? product.nameAr : product.name;
  const description = isAr ? product.descriptionAr : product.description;
  const club = isAr ? product.clubAr : product.club;
  const player = isAr ? product.playerAr : product.player;

  const handleAdd = () => {
    if (!selectedVariant) return;
    addItem(product, selectedVariant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = mockProducts.filter((p) => p.id !== product.id && p.club === product.club).slice(0, 4);

  return (
    <div className="container section-padding">
      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><Link to="/" className="hover:text-foreground transition-colors">{t('nav.home')}</Link></li>
          <li>/</li>
          <li><Link to="/products" className="hover:text-foreground transition-colors">{t('nav.shop')}</Link></li>
          <li>/</li>
          <li className="text-foreground truncate max-w-[200px]">{name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-3">
            <img
              src={product.images[activeImage]?.url}
              alt={product.images[activeImage]?.alt || name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === activeImage ? 'border-primary' : 'border-border'
                  }`}
                  aria-label={`Image ${i + 1}`}
                >
                  <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{club}</p>
            <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
            {player && <p className="text-muted-foreground mt-1">{player}</p>}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-primary">
              {t('common.currency')}{selectedVariant?.price || product.basePrice}
            </span>
            <Badge variant={selectedVariant && selectedVariant.stock > 0 ? 'default' : 'destructive'} className={selectedVariant && selectedVariant.stock > 0 ? 'bg-success text-success-foreground' : ''}>
              {selectedVariant && selectedVariant.stock > 0 ? t('common.inStock') : t('common.outOfStock')}
            </Badge>
          </div>

          {/* Kit info */}
          <div className="flex gap-2">
            <Badge variant="secondary">{t(`product.${product.kitType}`)}</Badge>
            <Badge variant="secondary">{t(`product.${product.category === 'shirt' ? 'shirt' : 'fullKit'}`)}</Badge>
            <Badge variant="secondary">{product.season}</Badge>
          </div>

          {/* Size selector */}
          <div>
            <Label className="text-sm font-semibold mb-3 block">{t('product.size')}</Label>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                  disabled={v.stock <= 0}
                  className={`h-11 min-w-[3rem] px-3 rounded-lg border text-sm font-medium transition-all
                    ${selectedVariant?.id === v.id
                      ? 'border-primary bg-primary/10 text-primary'
                      : v.stock > 0
                        ? 'border-border hover:border-primary/50 text-foreground'
                        : 'border-border/50 text-muted-foreground/40 line-through cursor-not-allowed'
                    }`}
                  aria-label={`${t('product.size')} ${v.size}${v.stock <= 0 ? ` - ${t('common.outOfStock')}` : ''}`}
                  aria-pressed={selectedVariant?.id === v.id}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          {selectedVariant && selectedVariant.stock > 0 && (
            <div>
              <Label className="text-sm font-semibold mb-3 block">{t('product.quantity')}</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(selectedVariant.stock, quantity + 1))}
                  disabled={quantity >= selectedVariant.stock}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground">
                  ({selectedVariant.stock} {t('common.inStock')})
                </span>
              </div>
            </div>
          )}

          {/* Add to cart */}
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold gap-2 rounded-full"
            onClick={handleAdd}
            disabled={!selectedVariant || selectedVariant.stock <= 0}
          >
            {added ? (
              <>
                <Check className="h-5 w-5" />
                {isAr ? 'تمت الإضافة!' : 'Added!'}
              </>
            ) : (
              <>
                <ShoppingCart className="h-5 w-5" />
                {t('common.addToCart')}
              </>
            )}
          </Button>

          {/* Description */}
          <div className="border-t border-border pt-6">
            <h3 className="font-semibold mb-2">{t('product.description')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16" aria-label={t('product.relatedProducts')}>
          <h2 className="text-2xl font-bold mb-6">{t('product.relatedProducts')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={className} {...props} />;
}
