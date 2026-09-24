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
    const labels: Record<string, string> = {
      web: "WEB",
      apps: "APPS",
      automation: "AUTOMATION",
      ai: "AI",
    };
    return (
      <span className="rounded-full border border-lime/25 bg-lime/10 px-2.5 py-1 text-[11px] font-bold text-lime">
        {labels[division] || division}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-ink pb-20 pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-[760] tracking-[-0.03em] text-white">
              Contacts Visiteurs
            </h1>
            <p className="mt-1 text-sm text-muted">
              Coordonnées et détails des visiteurs qualifiés par le chatbot du site.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="flex items-center gap-2 self-start rounded-xl border border-line bg-surface-card px-3 py-2.5 text-xs font-semibold text-[#ccc] transition-all hover:border-[#555] hover:text-white md:self-auto"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>Actualiser</span>
          </button>
        </div>

        {/* Main Content: Contacts List + Detail View */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Contacts List (7 cols) */}
          <div className="space-y-4 lg:col-span-7">
            <h2 className="flex items-center justify-between text-lg font-bold text-white">
              <span>Derniers Contacts</span>
              <span className="text-xs font-normal text-muted">
                {leads.length} contact{leads.length > 1 ? "s" : ""}
              </span>
            </h2>

            {leads.length === 0 && !loading && (
              <div className="rounded-2xl border border-line bg-surface-card p-8 text-center text-sm text-muted">
                Aucun contact pour le moment. Dès qu'un visiteur laisse ses coordonnées via le chatbot, il apparaîtra ici.
              </div>
            )}

            {leads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? "border-lime bg-surface-2 shadow-[0_0_25px_-8px_rgba(200,255,69,0.35)]"
                      : "border-line bg-surface-card hover:border-[#444]"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">
                        {lead.name}
                      </span>
                      {getDivisionBadge(lead.division)}
                    </div>
                    <span className="text-[11px] text-muted-2">
                      {new Date(lead.created_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="mb-3 line-clamp-2 text-xs text-[#aaa]">
                    {lead.need_summary}
                  </p>

                  <div className="flex items-center justify-between border-t border-line/60 pt-3 text-xs">
                    <div className="flex items-center gap-1.5 text-muted">
                      <Phone className="h-3.5 w-3.5 text-lime" />
                      <span>{lead.email_or_whatsapp}</span>
                    </div>

                    <div className="flex items-center gap-1 font-semibold text-emerald-400">
                      <CheckCircle className="h-3.5 w-3.5" />
                      <span className="capitalize">{lead.status}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Detail (5 cols) */}
          <div className="sticky top-28 lg:col-span-5">
            {selectedLead ? (
              <div className="space-y-6 rounded-2xl border border-line bg-surface-card p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-lime/40 bg-lime/10 text-lime">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted">
                        Fiche Contact
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {selectedLead.name}
                      </h3>
                    </div>
                  </div>
                  {getDivisionBadge(selectedLead.division)}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold uppercase text-muted">
                      Coordonnées de Contact
                    </label>
                    <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface-2 p-3 font-mono text-sm text-white">
                      <span className="truncate">{selectedLead.email_or_whatsapp}</span>
                      <a
                        href={
                          selectedLead.email_or_whatsapp.includes("@")
                            ? `mailto:${selectedLead.email_or_whatsapp}`
                            : `https://wa.me/${selectedLead.email_or_whatsapp.replace(/[^0-9]/g, "")}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 rounded px-2.5 py-1 text-xs font-semibold text-[#080808] bg-lime hover:bg-lime-dark"
                      >
                        Contacter
                      </a>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-[11px] font-semibold uppercase text-muted">
                      Résumé du Besoin (IA)
                    </label>
                    <div className="rounded-xl border border-line bg-surface-2 p-3.5 text-xs leading-relaxed text-[#ccc]">
                      {selectedLead.need_summary}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-line bg-surface-2 p-3">
                      <span className="mb-1 block text-[10px] uppercase text-muted">
                        Budget Estimé
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {selectedLead.budget_range || "Non précisé"}
                      </span>
                    </div>

                    <div className="rounded-xl border border-line bg-surface-2 p-3">
                      <span className="mb-1 block text-[10px] uppercase text-muted">
                        Délai Souhaité
                      </span>
                      <span className="text-xs font-bold text-lime">
                        {selectedLead.timeline || "Non précisé"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="mb-1 block text-[10px] uppercase text-muted">
                      Reçu le
                    </span>
                    <span className="text-xs text-[#ccc]">
                      {new Date(selectedLead.created_at).toLocaleString("fr-FR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-line bg-surface-card p-8 text-center text-sm text-muted">
                Sélectionnez un contact dans la liste pour afficher ses détails.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
