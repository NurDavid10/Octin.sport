import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Truck, Tag, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/ProductCard';
import { mockProducts } from '@/lib/mock-data';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;
  const featured = mockProducts.filter((p) => p.featured);

  const features = [
    { icon: Shield, title: t('home.authentic'), desc: t('home.authenticDesc') },
    { icon: Truck, title: t('home.fastDelivery'), desc: t('home.fastDeliveryDesc') },
    { icon: Tag, title: t('home.bestPrices'), desc: t('home.bestPricesDesc') },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50" aria-label="Hero">
        {/* Logo watermark background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="/images/Logo.png"
            alt=""
            aria-hidden="true"
            className="w-[520px] sm:w-[680px] lg:w-[820px] max-w-none opacity-[0.07] object-contain"
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(38_95%_48%_/_0.10),_transparent_60%)]" />
        <div className="container relative flex flex-col items-center text-center section-padding pt-20 pb-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight max-w-4xl"
          >
            <span className="gold-gradient-text">{t('home.heroTitle')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {t('home.heroSubtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8"
          >
            <Button asChild size="lg" className="text-base font-semibold gap-2 px-8 h-12 rounded-full">
              <Link to="/products">
                {t('home.shopNow')}
                <Arrow className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-secondary/40" aria-label={t('home.whyUs')}>
        <div className="container py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding" aria-label={t('home.featuredTitle')}>
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">{t('home.featuredTitle')}</h2>
            <Button variant="ghost" asChild className="text-primary gap-1">
              <Link to="/products">
                {t('nav.shop')}
                <Arrow className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="section-padding bg-secondary/40" aria-label={t('home.newArrivalsTitle')}>
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">{t('home.newArrivalsTitle')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {mockProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
