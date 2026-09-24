"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";

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
    <div className="flex items-center gap-1 text-xs text-[#aaa]">
      <button
        type="button"
        disabled={isPending || locale === "fr"}
        onClick={() => toggleLocale("fr")}
        className={locale === "fr" ? "font-bold text-white" : "hover:text-white"}
      >
        FR
      </button>
      <span className="text-[#555]">/</span>
      <button
        type="button"
        disabled={isPending || locale === "en"}
        onClick={() => toggleLocale("en")}
        className={locale === "en" ? "font-bold text-white" : "hover:text-white"}
      >
        EN
      </button>
    </div>
  );
}
