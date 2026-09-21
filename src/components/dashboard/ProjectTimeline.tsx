import { CheckCircle2, Circle, Clock } from "lucide-react";
import { ProjectStatus } from "@/lib/projects";

interface Props {
  status: ProjectStatus;
}

const steps: { key: ProjectStatus; label: string; desc: string }[] = [
  {
    key: "discovery",
    label: "1. Cadrage",
    desc: "Spécifications & Architecture",
  },
  {
    key: "design",
    label: "2. Design & UI",
    desc: "Maquettes Figma & UX",
  },
  {
    key: "build",
    label: "3. Développement",
    desc: "Code, Intégration & DB",
  },
  {
    key: "review",
    label: "4. Recette",
    desc: "Tests & Ajustements",
  },
  {
    key: "delivered",
    label: "5. Déployé",
    desc: "Mise en production & Care",
  },
];

const statusOrder: Record<ProjectStatus, number> = {
  discovery: 1,
  design: 2,
  build: 3,
  review: 4,
  delivered: 5,
};

export default function ProjectTimeline({ status }: Props) {
  const currentStepNumber = statusOrder[status] || 1;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-obsidian-card border border-obsidian-border">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
            Pipeline de Développement
          </span>
          <h3 className="font-heading font-bold text-lg text-white">
            État d'avancement du projet
          </h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-electric/20 border border-violet-glow/30 text-violet-glow uppercase">
          Étape {currentStepNumber} / 5 : {status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isDone = stepNumber < currentStepNumber;
          const isCurrent = stepNumber === currentStepNumber;
          const isUpcoming = stepNumber > currentStepNumber;

          return (
            <div
              key={step.key}
              className={`p-4 rounded-2xl border transition-all ${
                isCurrent
                  ? "bg-violet-electric/15 border-violet-glow shadow-violet"
                  : isDone
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-obsidian-surface border-obsidian-border opacity-50"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white">
                  {step.label}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Clock className="w-4 h-4 text-violet-glow animate-pulse" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600" />
                )}
              </div>
              <p className="text-[11px] text-slate-400">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
