import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart';

export default function CartPage() {
  const { t, i18n } = useTranslation();
  const { items, removeItem, updateQuantity, subtotal, shipping, total } = useCartStore();
  const isAr = i18n.language === 'ar';

  if (items.length === 0) {
    return (
      <div className="container section-padding text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto space-y-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">{t('cart.empty')}</h1>
          <p className="text-muted-foreground">{t('cart.emptyDesc')}</p>
          <Button asChild className="rounded-full">
            <Link to="/products">{t('cart.continueShopping')}</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <h1 className="text-3xl font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const name = isAr ? item.product.nameAr : item.product.name;
            const primaryImage = item.product.images.find((i) => i.isPrimary) || item.product.images[0];
            return (
              <motion.div
                key={item.variant.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-xl p-4 flex gap-4"
              >
                <div className="h-24 w-24 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img src={primaryImage?.url} alt={name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{name}</h3>
                  <p className="text-xs text-muted-foreground">{t('product.size')}: {item.variant.size}</p>
                  <p className="text-primary font-bold mt-1">{t('common.currency')}{item.variant.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                      aria-label="Decrease"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                      disabled={item.quantity >= item.variant.stock}
                      aria-label="Increase"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive ms-auto"
                      onClick={() => removeItem(item.variant.id)}
                      aria-label={t('cart.remove')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="glass-card rounded-xl p-6 h-fit sticky top-20 space-y-4">
          <h2 className="font-semibold text-lg">{t('checkout.orderSummary')}</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('cart.subtotal')}</span>
              <span className="font-medium">{t('common.currency')}{subtotal()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('cart.shipping')}</span>
              <span className="font-medium">{shipping() === 0 ? t('cart.freeShipping') : `${t('common.currency')}${shipping()}`}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-bold">{t('cart.total')}</span>
              <span className="font-bold text-primary text-lg">{t('common.currency')}{total()}</span>
            </div>
          </div>
          <Button asChild size="lg" className="w-full rounded-full font-semibold">
            <Link to="/checkout">{t('cart.proceedToCheckout')}</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="w-full">
            <Link to="/products">{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
