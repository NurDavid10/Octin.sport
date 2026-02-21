import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage() {
  const { ref } = useParams<{ ref: string }>();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="container section-padding">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center space-y-6"
      >
        <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle2 className="h-12 w-12 text-success" />
        </div>
        <h1 className="text-3xl font-bold">{t('orderSuccess.title')}</h1>
        <p className="text-muted-foreground">{t('orderSuccess.subtitle')}</p>

        <div className="glass-card rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-1">{t('orderSuccess.orderRef')}</p>
          <p className="text-2xl font-bold font-mono text-primary">{ref}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full gap-2">
            <Link to="/">{t('orderSuccess.backHome')}</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full gap-2">
            <Link to="/products">
              {t('orderSuccess.continueShopping')}
              <Arrow className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
