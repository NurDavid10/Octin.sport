import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/Logo.png" alt="Octin.Sport Logo" className="h-8 w-8 object-contain" />
              <h3 className="gold-gradient-text text-xl font-black tracking-wide">
                Octin.Sport
              </h3>
            </div>
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

          {/* Contact & Social */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t('footer.contactUs')}</h4>
            <ul className="space-y-3 mb-5">
              <li>
                <a href="tel:0566386279" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>0566386279</span>
                </a>
              </li>
              <li>
                <a href="mailto:octinsport@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span>octinsport@gmail.com</span>
                </a>
              </li>
            </ul>
            <h4 className="font-semibold text-foreground mb-3">{t('footer.followUs')}</h4>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/octin.sport" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="http://wa.me/message/AJF7CJB4FORGF1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/18QQp8kdLi/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © {year} Octin.Sport. {t('footer.rights')}.
        </div>
      </div>
    </footer>
  );
}
