"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-obsidian-card/80 border border-obsidian-border text-xs text-slate-300 backdrop-blur-md">
      <Globe className="w-3.5 h-3.5 text-violet-glow" />
      <button
        type="button"
        disabled={isPending || locale === "fr"}
        onClick={() => toggleLocale("fr")}
        className={`px-1.5 py-0.5 rounded transition font-medium ${
          locale === "fr"
            ? "bg-violet-electric text-white font-bold shadow-sm"
            : "hover:text-white text-slate-400"
        }`}
      >
        FR
      </button>
      <span className="text-slate-600">/</span>
      <button
        type="button"
        disabled={isPending || locale === "en"}
        onClick={() => toggleLocale("en")}
        className={`px-1.5 py-0.5 rounded transition font-medium ${
          locale === "en"
            ? "bg-violet-electric text-white font-bold shadow-sm"
            : "hover:text-white text-slate-400"
        }`}
      >
        EN
      </button>
    </div>
  );
}
