import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <h3 className="gold-gradient-text text-xl font-black uppercase tracking-widest mb-4">
              KickStore
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.aboutDesc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.home')}</Link></li>
              <li><Link to="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.shop')}</Link></li>
              <li><Link to="/products?category=full_kit" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.kits')}</Link></li>
              <li><Link to="/products?category=shirt" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t('nav.shirts')}</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.followUs')}</h4>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {year} KickStore. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
