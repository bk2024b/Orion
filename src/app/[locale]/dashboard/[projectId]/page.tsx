import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getClientProjectById, getClientProjects } from "@/lib/projects";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import ProjectTimeline from "@/components/dashboard/ProjectTimeline";
import ProjectChatThread from "@/components/dashboard/ProjectChatThread";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export async function generateStaticParams() {
  const params: { locale: string; projectId: string }[] = [];
  for (const locale of routing.locales) {
    const projects = await getClientProjects();
    for (const proj of projects) {
      params.push({ locale, projectId: proj.id });
    }
  }
  return params;
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; projectId: string }>;
}) {
  const { locale, projectId } = await params;
  setRequestLocale(locale);

  const project = await getClientProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la liste des projets</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-soft text-violet-glow border border-violet-electric/20 uppercase">
                  Division {project.division}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                  Statut : {project.status}
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mb-2">
                {project.name}
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl">
                {project.summary}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-obsidian-surface p-4 rounded-2xl border border-obsidian-border text-xs shrink-0">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Client</span>
                <span className="text-white font-bold">{project.clientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Livraison Prévue</span>
                <span className="text-violet-glow font-bold">{project.targetDeliveryDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Budget Validé</span>
                <span className="text-emerald-400 font-bold">{project.budget}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Component */}
        <div className="mb-8">
          <ProjectTimeline status={project.status} />
        </div>

        {/* Main Content Grid: Deliverables (7 cols) + Live Thread (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Deliverables Vault */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-obsidian-card border border-obsidian-border space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-obsidian-border">
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Coffre-fort des Livrables & Documents
                  </h3>
                  <p className="text-xs text-slate-400">
                    Spécifications, maquettes Figma validées et livrables de code.
                  </p>
                </div>
                <FileText className="w-5 h-5 text-violet-glow" />
              </div>

              <div className="space-y-3">
                {project.deliverables.map((deliv) => (
                  <div
                    key={deliv.id}
                    className="p-4 rounded-2xl bg-obsidian-surface border border-obsidian-border flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-violet-electric/20 text-violet-glow flex items-center justify-center shrink-0">
                        {deliv.type === "figma" ? (
                          <Layers className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-white truncate block">
                          {deliv.name}
                        </span>
                        <span className="text-[10px] text-slate-500 block">
                          Ajouté le {deliv.date} {deliv.size ? `• ${deliv.size}` : ""}
                        </span>
                      </div>
                    </div>

                    <a
                      href={deliv.url}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-xl bg-obsidian-card border border-obsidian-border hover:bg-violet-electric hover:text-white text-slate-300 text-xs flex items-center gap-1.5 transition-all shrink-0"
                    >
                      {deliv.type === "figma" || deliv.type === "link" ? (
                        <>
                          <span>Ouvrir</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Télécharger</span>
                          <Download className="w-3.5 h-3.5" />
                        </>
                      )}
                    </a>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-violet-soft border border-violet-electric/20 text-xs text-violet-300 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-violet-glow shrink-0" />
                <span>
                  Tous les livrables sont chiffrés et certifiés conformes par BK Global Technologies.
                </span>
              </div>
            </div>
          </div>

          {/* Project Chat Thread */}
          <div className="lg:col-span-6">
            <ProjectChatThread
              initialMessages={project.messages}
              projectId={project.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
