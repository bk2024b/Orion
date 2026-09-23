import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tDiv = useTranslations("divisions");

  return (
    <footer className="bg-obsidian-300 border-t border-obsidian-border pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-obsidian-border">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-electric to-violet-glow flex items-center justify-center text-white font-heading font-extrabold text-lg shadow-violet">
                O
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-wider text-white">
                ORION<span className="text-violet-glow">.</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              {t("tagline")} Studio de transformation digitale concevant des systèmes logiciels, plateformes web haute performance et automatisations IA sur-mesure.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-violet-glow" />
              <span>{t("location")}</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <a href="#divisions" className="hover:text-white transition-colors">
                  {tNav("services")}
                </a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">
                  {tNav("work")}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {tNav("about")}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Divisions */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-heading">
              {t("divisions")}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-white transition-colors">
                <a href="#web">01. {tDiv("web.name")}</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#business">02. {tDiv("business.name")}</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#systems">03. {tDiv("systems.name")}</a>
              </li>
              <li className="hover:text-white transition-colors">
                <a href="#ai">04. {tDiv("ai.name")}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t("copyright")}</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">{t("privacy")}</span>
            <span className="hover:text-slate-400 cursor-pointer">{t("legal")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
