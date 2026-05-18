import Image from "next/image";
import { EnvelopeSimple, FacebookLogo, InstagramLogo, MapPin, Phone, TelegramLogo } from "@phosphor-icons/react/dist/ssr";

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
            <Image
              src="/brand/logo.png"
              alt="REMICO"
              width={196}
              height={33}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-white/65">
              Український бренд побутової хімії для дому та B2B-партнерів. Гелі для прання, пральні порошки та
              миючі засоби для посуду.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialLink href="#" label="Instagram">
                <InstagramLogo size={18} weight="bold" />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <FacebookLogo size={18} weight="bold" />
              </SocialLink>
              <SocialLink href="#" label="Telegram">
                <TelegramLogo size={18} weight="bold" />
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
                <a href="tel:+380670000000" className="hover:text-white">
                  +38 (067) 000 00 00
                </a>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeSimple size={18} weight="bold" className="mt-0.5 shrink-0 text-brand-green" />
                <a href="mailto:b2b@remico.ua" className="hover:text-white">
                  b2b@remico.ua
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} weight="bold" className="mt-0.5 shrink-0 text-brand-green" />
                <span>Україна · логістика по всій країні</span>
              </li>
            </ul>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
              <div
                role="img"
                aria-label="Розташування офісу REMICO"
                className="relative flex h-32 items-end bg-[radial-gradient(circle_at_30%_30%,rgba(31,143,61,0.35),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(107,77,224,0.3),transparent_55%)]"
              >
                <div className="m-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
                  <MapPin size={12} weight="fill" /> Адресу уточнюємо
                </div>
              </div>
            </div>
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
