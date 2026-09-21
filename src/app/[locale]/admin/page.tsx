"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  BellRing,
  Bot,
  CheckCircle,
  Clock,
  Layers,
  Phone,
  RefreshCw,
  Send,
  Shield,
  Smartphone,
  Sparkles,
  TrendingUp,
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

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [pushStatusText, setPushStatusText] = useState("");
  const [testPushLoading, setTestPushLoading] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();
      if (data.leads) {
        setLeads(data.leads);
        if (!selectedLead && data.leads.length > 0) {
          setSelectedLead(data.leads[0]);
        }
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();

    // Vérifier l'état du Service Worker et Push
    if (typeof window !== "undefined" && "serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.register("/sw.js").then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub) {
            setPushEnabled(true);
            setPushStatusText("Notifications actives sur cet appareil");
          }
        });
      });
    }
  }, []);

  const enableWebPush = async () => {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) {
      alert("Votre navigateur ne supporte pas le Web Push.");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Permission de notification refusée.");
        return;
      }

      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();

      if (!sub) {
        // Enregistrer l'abonnement
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || undefined,
        });
      }

      // Enregistrer auprès du serveur
      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub),
      });

      setPushEnabled(true);
      setPushStatusText("Notifications Web Push activées avec succès !");
    } catch (err: any) {
      console.error("Enable push error:", err);
      // Fallback pour test local sans VAPID public key
      setPushEnabled(true);
      setPushStatusText("Notifications locales activées (mode démo)");
    }
  };

  const triggerTestPush = async () => {
    setTestPushLoading(true);
    try {
      await fetch("/api/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "🔥 Test Push ORION Admin",
          body: "Nouveau lead qualifié : Studio E-commerce (Budget: 3.5M FCFA)",
          url: "/fr/admin",
        }),
      });

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("🔥 Test Push ORION Admin", {
          body: "Nouveau lead qualifié : Studio E-commerce (Budget: 3.5M FCFA)",
          icon: "/icon-192.png",
        });
      }
      alert("Notification de test envoyée !");
    } catch (err) {
      console.error(err);
    } finally {
      setTestPushLoading(false);
    }
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-obsidian-border mb-8">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading font-extrabold text-3xl text-white">
                ORION Admin PWA
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-violet-electric/20 text-violet-glow text-xs font-bold border border-violet-electric/40">
                Live Center
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Supervision des leads générés par l'IA Groq et alertes Web Push instantanées.
            </p>
          </div>

          {/* Action Buttons: Push & Refresh */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={fetchLeads}
              disabled={loading}
              className="p-2.5 rounded-xl bg-obsidian-card border border-obsidian-border text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-2 text-xs font-semibold"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Actualiser</span>
            </button>

            {!pushEnabled ? (
              <button
                type="button"
                onClick={enableWebPush}
                className="px-4 py-2.5 rounded-xl bg-violet-electric hover:bg-violet-hover text-white text-xs font-semibold shadow-violet flex items-center gap-2 transition-all hover:scale-105"
              >
                <Bell className="w-4 h-4" />
                <span>Activer les Notifications Push</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={triggerTestPush}
                disabled={testPushLoading}
                className="px-4 py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold flex items-center gap-2 transition-all"
              >
                <BellRing className="w-4 h-4" />
                <span>Tester le Push</span>
              </button>
            )}
          </div>
        </div>

        {pushStatusText && (
          <div className="mb-6 p-3 rounded-xl bg-violet-electric/10 border border-violet-glow/30 text-violet-300 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-glow shrink-0" />
            <span>{pushStatusText}</span>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Total Leads Capturés</span>
              <User className="w-4 h-4 text-violet-glow" />
            </div>
            <div className="font-heading font-extrabold text-3xl text-white">
              {leads.length}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Leads Qualifiés par IA</span>
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-heading font-extrabold text-3xl text-emerald-400">
              {leads.filter((l) => l.status === "qualified").length}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Modèle IA Moteur</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div className="font-heading font-bold text-lg text-white">
              Llama 3.3 70B
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Groq LPUs • Ultra Low Latency</div>
          </div>

          <div className="p-6 rounded-2xl bg-obsidian-card border border-obsidian-border">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Canal d'Alerte</span>
              <Smartphone className="w-4 h-4 text-violet-glow" />
            </div>
            <div className="font-heading font-bold text-lg text-white">
              Web Push (VAPID)
            </div>
            <div className="text-[10px] text-emerald-400 mt-1">Zéro dépendance WhatsApp API</div>
          </div>
        </div>

        {/* Main Content: Leads List + Lead Detail View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Leads List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-heading font-bold text-lg text-white flex items-center justify-between">
              <span>Derniers Prospects & Leads</span>
              <span className="text-xs text-slate-400 font-normal">
                {leads.length} lead(s)
              </span>
            </h2>

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

          {/* Lead Detail & Actions (5 cols) */}
          <div className="lg:col-span-5 sticky top-28">
            {selectedLead ? (
              <div className="p-6 rounded-3xl bg-obsidian-card border border-obsidian-border shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-obsidian-border">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Fiche Prospect
                    </span>
                    <h3 className="font-heading font-bold text-xl text-white">
                      {selectedLead.name}
                    </h3>
                  </div>
                  {getDivisionBadge(selectedLead.division)}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] uppercase font-semibold text-slate-400 block mb-1">
                      Coordonnées de Contact
                    </label>
                    <div className="p-3 rounded-xl bg-obsidian-surface border border-obsidian-border text-white text-sm font-mono flex items-center justify-between">
                      <span>{selectedLead.email_or_whatsapp}</span>
                      <a
                        href={
                          selectedLead.email_or_whatsapp.includes("@")
                            ? `mailto:${selectedLead.email_or_whatsapp}`
                            : `https://wa.me/${selectedLead.email_or_whatsapp.replace(/[^0-9]/g, "")}`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded bg-violet-electric text-white text-xs font-semibold hover:bg-violet-hover"
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
                </div>

                <div className="pt-4 border-t border-obsidian-border space-y-3">
                  <span className="text-[11px] uppercase font-semibold text-slate-400 block">
                    Statut du Prospect
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {["qualified", "contacted", "converted"].map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          setSelectedLead({ ...selectedLead, status: st });
                          setLeads((prev) =>
                            prev.map((l) =>
                              l.id === selectedLead.id ? { ...l, status: st } : l
                            )
                          );
                        }}
                        className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                          selectedLead.status === st
                            ? "bg-violet-electric text-white shadow-violet"
                            : "bg-obsidian-surface border border-obsidian-border text-slate-400 hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border text-center text-slate-400 text-sm">
                Sélectionnez un lead dans la liste pour afficher ses détails.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
