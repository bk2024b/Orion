// Données de secours en mémoire, utilisées uniquement si Supabase
// n'est pas configuré (pas de NEXT_PUBLIC_SUPABASE_URL / clés).
// Dès que Supabase est branché, les vrais contacts viennent de la table "leads".

export interface StoredLead {
  id: string;
  name: string;
  email_or_whatsapp: string;
  division: string;
  need_summary: string;
  budget_range: string;
  timeline: string;
  created_at: string;
  status: string;
}

export const inMemoryLeads: StoredLead[] = [
  {
    id: "lead_01",
    name: "Dr. Amadou S.",
    email_or_whatsapp: "+229 97 00 11 22",
    division: "systems",
    need_summary: "Portail de prise de rendez-vous médical et dossier patient informatisé.",
    budget_range: "2 500 000 - 4 000 000 FCFA",
    timeline: "6 semaines",
    status: "qualified",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "lead_02",
    name: "Claire Dupont",
    email_or_whatsapp: "claire@afriq-logistics.com",
    division: "ai_automation",
    need_summary: "Automatisation du support client WhatsApp avec agent IA pour le suivi de colis.",
    budget_range: "1 500 000 FCFA",
    timeline: "1 mois",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
];
