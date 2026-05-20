import { EnvelopeSimple, FacebookLogo, InstagramLogo, MapPin, Phone, TiktokLogo } from "@phosphor-icons/react/dist/ssr";
import Logo from "./Logo";

const NAV = [
  { href: "#about", label: "Про компанію" },
  { href: "#benefits", label: "Переваги" },
  { href: "#certificates", label: "Сертифікати" },
  { href: "#partner", label: "Стати партнером" },
];

const DOCS = [
  { href: "#privacy", label: "Політика конфіденційності" },
  { href: "#terms", label: "Умови використання" },
  { href: "#certificates", label: "Сертифікати та документи" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white" id="footer">
      <div className="container-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo invert />
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-white/65">
              Побутова хімія для дистриб&apos;юторів, магазинів та мережевих гіпермаркетів по всій Україні.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="https://www.instagram.com/remico.ua/" label="Instagram">
                <InstagramLogo size={18} weight="bold" />
              </SocialLink>
              <SocialLink href="https://www.facebook.com/profile.php?id=61577934616633" label="Facebook">
                <FacebookLogo size={18} weight="bold" />
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@remico.ua" label="TikTok">
                <TiktokLogo size={18} weight="bold" />
              </SocialLink>
            </div>
          </div>

          <FooterColumn title="Навігація" items={NAV} />
          <FooterColumn title="Документи" items={DOCS} />

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Контакти</p>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <Phone size={18} weight="bold" className="mt-0.5 shrink-0 text-brand-green" />
                <a href="tel:+380987802184" className="hover:text-white">
                  +38 (098) 780 21 84
                </a>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeSimple size={18} weight="bold" className="mt-0.5 shrink-0 text-brand-green" />
                <a href="mailto:remico2025@gmail.com" className="hover:text-white">
                  remico2025@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} weight="bold" className="mt-0.5 shrink-0 text-brand-green" />
                <span>
                  вул. Торгова, 22б, м. Виноградів,
                  <br />Берегівський район, Закарпатська обл., 90300, Україна
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} REMICO. Усі права захищено.</p>
          <p>Український виробник побутової хімії · Made in Ukraine</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">{title}</p>
      <ul className="mt-5 space-y-3 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <a href={it.href} className="text-white/80 transition hover:text-white">
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-brand-green hover:bg-brand-green hover:text-white"
    >
      {children}
    </a>
  );
}
