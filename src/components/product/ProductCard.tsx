import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/stores/cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const addItem = useCartStore((s) => s.addItem);
  const isAr = i18n.language === 'ar';
  const name = isAr ? product.nameAr : product.name;
  const club = isAr ? product.clubAr : product.club;
  const primaryImage = product.images.find((i) => i.isPrimary) || product.images[0];
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const inStock = product.variants.some((v) => v.stock > 0);
  const firstAvailable = product.variants.find((v) => v.stock > 0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstAvailable) {
      addItem(product, firstAvailable, 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link
        to={`/products/${product.id}`}
        className="block glass-card rounded-xl overflow-hidden hover-lift focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label={name}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={primaryImage?.url}
            alt={primaryImage?.alt || name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1">
            {!inStock && (
              <Badge variant="destructive" className="text-xs">{t('common.outOfStock')}</Badge>
            )}
            {product.kitType !== 'home' && (
              <Badge className="bg-secondary text-secondary-foreground text-xs">
                {t(`product.${product.kitType}`)}
              </Badge>
            )}
          </div>
          {/* Quick add */}
          {inStock && (
            <div className="absolute bottom-3 end-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                onClick={handleQuickAdd}
                aria-label={t('common.addToCart')}
                className="h-10 w-10 rounded-full shadow-lg"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 space-y-1">
          <p className="text-xs text-muted-foreground">{club}</p>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 leading-snug">{name}</h3>
          <p className="text-primary font-bold text-lg">
            {t('common.currency')}{minPrice}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
