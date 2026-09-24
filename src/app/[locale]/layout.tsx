import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingChatWidget from "@/components/chat/FloatingChatWidget";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "ORION — Build beyond.",
  description: "Studio digital basé au Bénin. Sites web, applications métier, automatisation et systèmes d'IA pour entreprises ambitieuses.",
  icons: {
    icon: "/favicon.ico",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="min-h-screen bg-ink text-[#f5f5f0] antialiased flex flex-col justify-between">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
