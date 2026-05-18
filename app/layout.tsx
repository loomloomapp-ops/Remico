import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REMICO — побутова хімія для дистриб'юторів, магазинів та мереж по Україні",
  description:
    "REMICO — український бренд побутової хімії для B2B-партнерів. Гелі для прання, пральні порошки та миючі засоби для посуду для дистриб'юторів, магазинів, оптовиків і мереж по всій Україні.",
  metadataBase: new URL("https://remico.ua"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    siteName: "REMICO",
    title: "REMICO — побутова хімія для B2B-партнерів",
    description:
      "Український бренд побутової хімії: гелі для прання, порошки, миючі для посуду. Умови співпраці для магазинів, мереж, оптовиків і дистриб'юторів.",
    images: ["/brand/family.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={manrope.variable}>
      <body className="font-sans">
        <Preloader />
        {children}
      </body>
    </html>
  );
}
