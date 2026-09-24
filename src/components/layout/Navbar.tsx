"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import OpenChatButton from "@/components/chat/OpenChatButton";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#services", label: t("services") },
    { href: "#process", label: t("process") },
    { href: "#pricing", label: t("pricing") },
    { href: "#faq", label: t("faq") },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-[78px] items-center border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex w-[calc(100%-40px)] max-w-content items-center justify-between">
        <Link href="/" className="text-[19px] font-[850] tracking-[0.17em]">
          ORION
        </Link>

        <nav className="hidden gap-7 text-[13px] text-[#aaa] md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 text-xs text-[#aaa] md:flex">
          <LanguageSwitcher />
          <OpenChatButton className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#f5f5f0] bg-[#f5f5f0] px-[18px] py-[13px] text-[13px] font-bold text-[#050505] transition-transform hover:-translate-y-0.5">
            {t("startProject")} →
          </OpenChatButton>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-3 text-[#aaa] md:hidden"
          aria-label="Toggle Menu"
        >
          <LanguageSwitcher />
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full border-b border-line bg-ink p-5 md:hidden">
          <div className="mx-auto flex w-[calc(100%-40px)] max-w-content flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-[#aaa] hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <OpenChatButton className="mt-1 inline-flex items-center justify-center gap-2 rounded-[9px] border border-[#f5f5f0] bg-[#f5f5f0] px-[18px] py-[13px] text-[13px] font-bold text-[#050505]">
              {t("startProject")} →
            </OpenChatButton>
          </div>
        </div>
      )}
    </header>
  );
}
