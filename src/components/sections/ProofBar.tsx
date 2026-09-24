import { useTranslations } from "next-intl";

export default function ProofBar() {
  const t = useTranslations("proof");
  const items = ["web", "apps", "automation", "ai"] as const;

  return (
    <div className="mx-auto grid w-[calc(100%-40px)] max-w-content grid-cols-1 border-b border-line sm:grid-cols-4">
      {items.map((key, idx) => (
        <div
          key={key}
          className={`border-line px-5 py-6 text-xs text-[#777] border-b sm:border-b-0 last:border-b-0 sm:border-r sm:last:border-r-0`}
        >
          <strong className="mb-1 block text-[13px] text-[#eee]">
            {t(`${key}.label`)}
          </strong>
          {t(`${key}.sub`)}
        </div>
      ))}
    </div>
  );
}
