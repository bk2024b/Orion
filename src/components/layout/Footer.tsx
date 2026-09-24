import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mx-auto flex w-[calc(100%-40px)] max-w-content flex-col items-center justify-between gap-3 py-9 text-[11px] text-[#5e5e5e] sm:flex-row">
      <span>{t("copyright")}</span>
      <span>{t("tagline")}</span>
    </footer>
  );
}
