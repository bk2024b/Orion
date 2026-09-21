import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getClientProjects } from "@/lib/projects";
import {
  FolderKanban,
  Clock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Calendar,
  Layers,
} from "lucide-react";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = await getClientProjects();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-obsidian-border mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-soft border border-violet-electric/30 text-xs font-semibold text-violet-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-violet-glow" />
              <span>Espace Client Sécurisé</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
              Tableau de Bord & Suivi de Projet
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Consultez l'avancement de vos systèmes en développement, échangez avec l'équipe et téléchargez vos livrables.
            </p>
          </div>

          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full bg-violet-electric hover:bg-violet-hover text-white text-xs font-semibold transition-all shadow-violet flex items-center gap-2 self-start md:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lancer un nouveau système</span>
          </Link>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          <h2 className="font-heading font-bold text-xl text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-violet-glow" />
            <span>Vos Projets en Cours ({projects.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border hover:border-violet-electric/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-soft text-violet-glow border border-violet-electric/20 uppercase">
                      Division {proj.division}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                      {proj.status}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-2xl text-white mb-2 group-hover:text-violet-300 transition-colors">
                    {proj.name}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
                    {proj.summary}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-obsidian-surface border border-obsidian-border/50 text-xs mb-6">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Début du Projet
                      </span>
                      <span className="text-slate-200 font-medium">{proj.startDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                        Livraison Estimée
                      </span>
                      <span className="text-violet-glow font-bold">{proj.targetDeliveryDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-obsidian-border/60 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {proj.deliverables.length} livrable(s) disponible(s)
                  </span>

                  <Link
                    href={`/dashboard/${proj.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-electric text-white text-xs font-semibold shadow-violet hover:bg-violet-hover transition-all"
                  >
                    <span>Ouvrir l'espace projet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
