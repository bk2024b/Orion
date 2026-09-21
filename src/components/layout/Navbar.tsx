"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/work", label: t("work") },
    { href: "/blog", label: t("blog") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-obsidian-border py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo ORION */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-electric to-violet-glow flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-violet transition-transform group-hover:scale-105">
              O
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                ORION<span className="text-violet-glow">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Build Beyond
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Lang Switcher + Client Portal + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-full bg-obsidian-card border border-obsidian-border hover:border-slate-600 transition-colors"
            >
              {t("dashboard")}
            </Link>
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-electric hover:bg-violet-hover text-white text-sm font-semibold transition-all shadow-violet hover:shadow-violet-lg hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t("startProject")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-obsidian-card border border-obsidian-border text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-2xl bg-obsidian-card border border-obsidian-border shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-violet-soft text-white font-semibold"
                        : "text-slate-300 hover:bg-obsidian-surface"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-violet-electric text-white text-sm font-semibold shadow-violet"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t("startProject")}</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
