"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Send,
  Mail,
  Phone,
  Building2,
  CheckCircle,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    division: "web",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulation de sauvegarde du lead (branché sur Supabase API en Phase 2)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-soft border border-violet-electric/30 text-xs font-semibold text-violet-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-glow" />
            <span>{t("badge")}</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            {t("title")}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Formulaire Principal */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-obsidian-card border border-obsidian-border shadow-xl">
            {submitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white">
                  Message bien reçu !
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  {t("formSuccess")}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      whatsapp: "",
                      company: "",
                      division: "web",
                      message: "",
                    });
                  }}
                  className="mt-4 px-6 py-2 rounded-full bg-obsidian-surface border border-obsidian-border text-xs text-slate-300 hover:text-white"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      {t("formName")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder={t("formNamePlaceholder")}
                      className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      {t("formEmail")} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder={t("formEmailPlaceholder")}
                      className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      {t("formWhatsapp")}
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsapp: e.target.value })
                      }
                      placeholder={t("formWhatsappPlaceholder")}
                      className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      {t("formCompany")}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      placeholder={t("formCompanyPlaceholder")}
                      className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {t("formDivision")}
                  </label>
                  <select
                    value={formData.division}
                    onChange={(e) =>
                      setFormData({ ...formData, division: e.target.value })
                    }
                    className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-glow transition-colors"
                  >
                    <option value="web">01. WEB — Présence digitale pro & Vitrine</option>
                    <option value="business">02. BUSINESS — Plateformes dynamiques & CMS</option>
                    <option value="systems">03. SYSTEMS — Logiciels & Applications métier</option>
                    <option value="ai_automation">04. AI & AUTOMATION — Agents IA & WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    {t("formMessage")} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t("formMessagePlaceholder")}
                    className="w-full bg-obsidian-surface border border-obsidian-border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-glow transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-violet-electric hover:bg-violet-hover text-white font-semibold text-sm transition-all shadow-violet hover:shadow-violet-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Transmission en cours..." : t("formSubmit")}</span>
                </button>
              </form>
            )}
          </div>

          {/* AI Chat Fast-Track Box & Coordonnées */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-violet-950/40 via-obsidian-card to-obsidian-surface border border-violet-electric/40 shadow-violet">
              <div className="w-12 h-12 rounded-2xl bg-violet-electric/20 border border-violet-glow/40 flex items-center justify-center text-violet-glow mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white mb-2">
                {t("chatAlternativeTitle")}
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {t("chatAlternativeDesc")}
              </p>
              <p className="text-xs text-slate-400 mb-4">
                👉 Cliquez sur la bulle de discussion en bas à droite de votre écran pour démarrer l'échange avec notre bot de qualification.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-obsidian-card border border-obsidian-border space-y-4">
              <h4 className="font-heading font-bold text-base text-white uppercase tracking-wider">
                Coordonnées Directes
              </h4>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Mail className="w-4 h-4 text-violet-glow" />
                <span>contact@orion-digital.io</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Phone className="w-4 h-4 text-violet-glow" />
                <span>+229 01 50 00 00 / WhatsApp Pro</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <Building2 className="w-4 h-4 text-violet-glow" />
                <span>BK Global Technologies — Cotonou, Bénin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
