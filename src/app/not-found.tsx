import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <html lang="fr">
      <body className="bg-obsidian text-white flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md p-8 rounded-3xl bg-obsidian-card border border-obsidian-border">
          <span className="font-heading font-extrabold text-6xl text-violet-glow block mb-4">
            404
          </span>
          <h1 className="font-heading font-bold text-2xl text-white mb-2">
            Page Introuvable
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            La page demandée n'existe pas ou a été déplacée.
          </p>
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-violet-electric hover:bg-violet-hover text-white text-sm font-semibold transition-all shadow-violet"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
