import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

export default function LocaleNotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-line bg-surface-card p-8 text-center">
        <span className="mb-4 block text-6xl font-[760] text-lime">404</span>
        <h1 className="mb-2 text-2xl font-bold text-white">Page Introuvable</h1>
        <p className="mb-6 text-sm text-muted">
          La page demandée n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-[9px] border border-lime bg-lime px-6 py-3 text-sm font-bold text-[#080808] transition-transform hover:-translate-y-0.5"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à l'accueil</span>
        </Link>
      </div>
    </div>
  );
}
