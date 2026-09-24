import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="flex min-h-screen items-center justify-center bg-ink px-4 text-white">
        <div className="max-w-md rounded-2xl border border-line bg-surface-card p-8 text-center">
          <span className="mb-4 block text-6xl font-[760] text-lime">404</span>
          <h1 className="mb-2 text-2xl font-bold text-white">Page Introuvable</h1>
          <p className="mb-6 text-sm text-muted">
            La page demandée n'existe pas ou a été déplacée.
          </p>
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 rounded-[9px] border border-lime bg-lime px-6 py-3 text-sm font-bold text-[#080808] transition-transform hover:-translate-y-0.5"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
