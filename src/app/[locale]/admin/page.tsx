"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  Phone,
  RefreshCw,
  User,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email_or_whatsapp: string;
  division: string;
  need_summary: string;
  budget_range: string;
  timeline: string;
  status: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        setSelectedLead((prev) =>
          prev
            ? data.leads.find((l: Lead) => l.id === prev.id) || data.leads[0] || null
            : data.leads[0] || null
        );
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getDivisionBadge = (division: string) => {
    switch (division) {
      case "web":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20">WEB</span>;
      case "business":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">BUSINESS</span>;
      case "systems":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">SYSTEMS</span>;
      case "ai_automation":
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20">AI & AUTO</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-500/10 text-slate-400 border border-slate-500/20">{division}</span>;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-obsidian">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-obsidian-border mb-8">
          <div>
            <h1 className="font-heading font-extrabold text-3xl text-white">
              Contacts Visiteurs
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Coordonnées et détails des visiteurs qualifiés par le chatbot du site.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="p-2.5 rounded-xl bg-obsidian-card border border-obsidian-border text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-2 text-xs font-semibold self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Main Content: Contacts List + Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contacts List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-heading font-bold text-lg text-white flex items-center justify-between">
              <span>Derniers Contacts</span>
              <span className="text-xs text-slate-400 font-normal">
                {leads.length} contact{leads.length > 1 ? "s" : ""}
              </span>
            </h2>

            {leads.length === 0 && !loading && (
              <div className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border text-center text-slate-400 text-sm">
                Aucun contact pour le moment. Dès qu'un visiteur laisse ses coordonnées via le chatbot, il apparaîtra ici.
              </div>
            )}

            {leads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-obsidian-surface border-violet-electric shadow-violet"
                      : "bg-obsidian-card border-obsidian-border hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-white text-base">
                        {lead.name}
                      </span>
                      {getDivisionBadge(lead.division)}
                    </div>
                    <span className="text-[11px] text-slate-500">
                      {new Date(lead.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs line-clamp-2 mb-3">
                    {lead.need_summary}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-3 border-t border-obsidian-border/60">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Phone className="w-3.5 h-3.5 text-violet-glow" />
                      <span>{lead.email_or_whatsapp}</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span className="capitalize">{lead.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Detail (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            {selectedLead ? (
              <div className="p-6 rounded-3xl bg-obsidian-card border border-obsidian-border shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-obsidian-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-electric/20 border border-violet-glow/40 flex items-center justify-center text-violet-glow">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Fiche Contact
                      </span>
                      <h3 className="font-heading font-bold text-xl text-white">
                        {selectedLead.name}
                      </h3>
                    </div>
                  </div>
                  {getDivisionBadge(selectedLead.division)}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                      Coordonnées de Contact
                    </label>
                    <div className="p-3 rounded-xl bg-obsidian-surface border border-obsidian-border text-white text-sm font-mono flex items-center justify-between gap-2">
                      <span className="truncate">{selectedLead.email_or_whatsapp}</span>
                      <a
                        href={
                          selectedLead.email_or_whatsapp.includes("@")
                            ? `mailto:${selectedLead.email_or_whatsapp}`
                            : `https://wa.me/${selectedLead.email_or_whatsapp.replace(/[^0-9]/g, "")}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-violet-electric text-white text-xs font-semibold hover:bg-violet-hover shrink-0"
                      >
                        Contacter
                      </a>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                      Résumé du Besoin (IA)
                    </label>
                    <div className="p-3.5 rounded-xl bg-obsidian-surface border border-obsidian-border text-slate-200 text-xs leading-relaxed">
                      {selectedLead.need_summary}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-obsidian-surface border border-obsidian-border">
                      <span className="text-[10px] uppercase text-slate-400 block mb-1">
                        Budget Estimé
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {selectedLead.budget_range || "Non précisé"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-obsidian-surface border border-obsidian-border">
                      <span className="text-[10px] uppercase text-slate-400 block mb-1">
                        Délai Souhaité
                      </span>
                      <span className="text-xs font-bold text-violet-glow">
                        {selectedLead.timeline || "Non précisé"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block mb-1">
                      Reçu le
                    </span>
                    <span className="text-xs text-slate-300">
                      {new Date(selectedLead.created_at).toLocaleString("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border text-center text-slate-400 text-sm">
                Sélectionnez un contact dans la liste pour afficher ses détails.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
