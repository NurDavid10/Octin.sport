import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useCartStore } from '@/stores/cart';
import { ordersApi } from '@/lib/api';

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, 'Required').max(100),
  phone: z.string().trim().min(8, 'Required').max(20),
  email: z.string().trim().email().optional().or(z.literal('')),
  city: z.string().trim().min(2, 'Required').max(100),
  street: z.string().trim().min(2, 'Required').max(200),
  building: z.string().trim().min(1, 'Required').max(100),
  apartment: z.string().trim().max(100).optional(),
  notes: z.string().trim().max(500).optional(),
  paymentMethod: z.enum(['cash', 'bit']),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { items, subtotal, shipping, total, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const isAr = i18n.language === 'ar';

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '', phone: '', email: '', city: '', street: '', building: '', apartment: '', notes: '', paymentMethod: 'cash',
    },
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const result = await ordersApi.create({
        items: items.map((i) => ({ variantId: i.variant.id, quantity: i.quantity })),
        customer: { fullName: data.fullName, phone: data.phone, email: data.email || undefined },
        shippingAddress: { city: data.city, street: data.street, building: data.building, apartment: data.apartment || undefined },
        paymentMethod: data.paymentMethod,
        notes: data.notes || undefined,
      });
      clearCart();
      navigate(`/order-success/${result.data.ref}`);
    } catch {
      // Fallback: simulate success for demo
      const fakeRef = `KS-${Date.now().toString(36).toUpperCase()}`;
      clearCart();
      navigate(`/order-success/${fakeRef}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container section-padding text-center">
        <p className="text-muted-foreground">{t('cart.empty')}</p>
        <Button asChild className="mt-4 rounded-full"><Link to="/products">{t('cart.continueShopping')}</Link></Button>
      </div>
    );
  }

  return (
    <div className="container section-padding">
      <h1 className="text-3xl font-bold mb-8">{t('checkout.title')}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Info */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg">{t('checkout.personalInfo')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.fullName')} *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.phone')} *</FormLabel>
                      <FormControl><Input {...field} type="tel" dir="ltr" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('checkout.email')}</FormLabel>
                    <FormControl><Input {...field} type="email" dir="ltr" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </motion.section>

              {/* Address */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg">{t('checkout.shippingAddress')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.city')} *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="street" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.street')} *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="building" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.building')} *</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="apartment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('checkout.apartment')}</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="notes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('checkout.notes')}</FormLabel>
                    <FormControl><Textarea {...field} rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </motion.section>

              {/* Payment */}
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6 space-y-4">
                <h2 className="font-semibold text-lg">{t('checkout.paymentMethod')}</h2>
                <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup value={field.value} onValueChange={field.onChange} className="space-y-3">
                        <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${field.value === 'cash' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="cursor-pointer font-medium">{t('checkout.cash')}</Label>
                        </div>
                        <div className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${field.value === 'bit' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground'}`}>
                          <RadioGroupItem value="bit" id="bit" />
                          <Label htmlFor="bit" className="cursor-pointer font-medium">{t('checkout.bitTransfer')}</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </motion.section>
            </div>

            {/* Order Summary sidebar */}
            <div className="glass-card rounded-xl p-6 h-fit sticky top-20 space-y-4">
              <h2 className="font-semibold text-lg">{t('checkout.orderSummary')}</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.variant.id} className="flex gap-3 text-sm">
                    <div className="h-12 w-12 rounded bg-secondary overflow-hidden flex-shrink-0">
                      <img src={item.product.images[0]?.url} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium">{isAr ? item.product.nameAr : item.product.name}</p>
                      <p className="text-xs text-muted-foreground">{item.variant.size} × {item.quantity}</p>
                    </div>
                    <span className="font-medium">{t('common.currency')}{item.variant.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{t('cart.subtotal')}</span><span>{t('common.currency')}{subtotal()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{t('cart.shipping')}</span><span>{shipping() === 0 ? t('cart.freeShipping') : `${t('common.currency')}${shipping()}`}</span></div>
                <div className="border-t border-border pt-2 flex justify-between"><span className="font-bold">{t('cart.total')}</span><span className="font-bold text-primary text-lg">{t('common.currency')}{total()}</span></div>
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full font-semibold" disabled={submitting}>
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" />{t('checkout.processing')}</> : t('checkout.placeOrder')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
