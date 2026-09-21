import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  content: string;
}

const defaultPostsFr: BlogPost[] = [
  {
    slug: "digitalisation-cliniques-medicales",
    title: "Pourquoi les cliniques privées en Afrique doivent abandonner la prise de rendez-vous par téléphone",
    excerpt: "Comment un portail de réservation en ligne et un dossier patient automatisé réduisent de 65% les rendez-vous manqués et augmentent la rentabilité des établissements de santé.",
    category: "SYSTEMS",
    date: "18 Septembre 2026",
    readTime: "5 min de lecture",
    author: "Josias K.",
    authorRole: "Lead Architect @ ORION",
    content: `## Le diagnostic du secteur médical privé

Dans la majorité des cliniques privées à Abidjan, Cotonou ou Dakar, l'accueil téléphonique reste le principal goulot d'étranglement :
- Des lignes téléphoniques saturées aux heures de pointe.
- Des secrétaires médicales débordées par la saisie manuelle.
- Un taux de "no-show" (patients absents sans prévenir) dépassant souvent 30%.

## La réponse technologique : le portail de santé intégré

Chez **ORION**, notre division **SYSTEMS** déploie des plateformes sur-mesure combinant :
1. **Prise de rendez-vous en ligne 24h/24** avec sélection du praticien et du créneau horaire.
2. **Rappels automatiques par SMS & WhatsApp** 24h et 2h avant la consultation.
3. **Tableau de bord pour le personnel soignant** pour anticiper les flux et gérer les dossiers patients de manière sécurisée.

## Les résultats constatés

Après 90 jours de déploiement au sein d'un établissement partenaire :
- **+140% d'augmentation** des réservations en ligne.
- **Chute de 65%** des appels entrants non traités.
- Une expérience patient moderne qui renforce immédiatement la notoriété de l'établissement.`,
  },
  {
    slug: "automatisation-whatsapp-ia-afrique",
    title: "Comment l'IA et WhatsApp transforment la qualification de prospects en Afrique francophone",
    excerpt: "WhatsApp est le canal roi en Afrique. Découvrez comment un assistant IA intelligent qualifie vos prospects 24/7 et alerte instantanément vos commerciaux.",
    category: "AI & AUTOMATION",
    date: "14 Septembre 2026",
    readTime: "4 min de lecture",
    author: "Équipe AI ORION",
    authorRole: "Engineering Team",
    content: `## L'hégémonie de WhatsApp sur le marché africain

Pour 9 entreprises sur 10 en Afrique subsaharienne, le premier contact client se produit sur WhatsApp. Pourtant, la gestion manuelle présente des limites critiques :
- Temps de réponse moyen supérieur à 4 heures en journée (et nul la nuit).
- Perte de prospects chauds partis vers un concurrent plus rapide.
- Aucune synchronisation avec un CRM centralisé.

## Le rôle de l'assistant de qualification autonome

Avec l'avènement des modèles de langage ultra-rapides comme LLaMA 3.3 propulsés par Groq, nous concevons des agents capables de :
- Poser des questions de cadrage pertinentes sans paraître robotiques.
- Estimer le budget et le délai souhaité par le client.
- Déclencher des notifications Web Push natives en temps réel vers les smartphones des décideurs.

## Conclusion

L'automatisation ne remplace pas vos équipes commerciales : elle leur transmet des leads chauds déjà triés et documentés.`,
  },
  {
    slug: "pourquoi-votre-site-vitrine-ne-convertit-pas",
    title: "Pourquoi votre site web actuel ne génère aucun client (et comment y remédier)",
    excerpt: "Vitesse de chargement, design générique, absence de proposition de valeur claire : les 3 erreurs fatales des sites d'entreprises traditionnels.",
    category: "WEB & STRATÉGIE",
    date: "08 Septembre 2026",
    readTime: "6 min de lecture",
    author: "Josias K.",
    authorRole: "Lead Architect @ ORION",
    content: `## 1. La lenteur tue la conversion

Plus de 50% des visiteurs sur mobile quittent un site si celui-ci met plus de 3 secondes à se charger. La majorité des sites conçus avec d'anciens CMS sont alourdis par des dizaines de plugins inutiles.

## 2. Le syndrome du 'Site Brochure'

Un site web ne doit pas être une simple plaquette commerciale passive. Il doit agir comme un commercial d'élite :
- Guider le regard du visiteur avec une hiérarchie visuelle irréprochable (Design Obsidian & typographies modernes).
- Offrir des points d'interaction immédiats (chat intelligent, calculateurs de devis).

## 3. L'importance des Core Web Vitals

Chez **ORION**, chaque plateforme est bâtie sur Next.js 15 pour garantir un score de performance proche de 100/100 sur Google Lighthouse et un chargement sous la seconde.`,
  },
];

const defaultPostsEn: BlogPost[] = [
  {
    slug: "medical-clinic-digitalization",
    title: "Why Private Medical Clinics in Africa Must Eliminate Phone-Only Booking",
    excerpt: "How an integrated patient portal and automated WhatsApp reminders reduce appointment no-shows by 65% and unlock clinic revenue.",
    category: "SYSTEMS",
    date: "September 18, 2026",
    readTime: "5 min read",
    author: "Josias K.",
    authorRole: "Lead Architect @ ORION",
    content: `## The Diagnosis of Healthcare Scheduling

In private clinics across major African business hubs, front-desk phone lines cause continuous friction:
- Congested phone queues during peak morning hours.
- Overwhelmed medical receptionists.
- Patient no-show rates exceeding 30%.

## The Solution: Custom Integrated Portals

ORION SYSTEMS engineers end-to-end digital solutions:
1. **24/7 Online Doctor Booking** with automated slot availability.
2. **Automated WhatsApp / SMS Reminders** sent 24h and 2h prior to consultations.
3. **HIPAA-grade Practitioner Dashboards** for real-time schedule tracking.

## Measurable Results

- **+140% surge** in verified online bookings.
- **65% decrease** in dropped front-desk phone calls.`,
  },
  {
    slug: "whatsapp-ai-automation-africa",
    title: "How AI & WhatsApp are Revolutionizing Lead Qualification in Africa",
    excerpt: "WhatsApp is the primary business conduit across Africa. Learn how autonomous AI agents qualify prospects 24/7 and alert sales leaders in real-time.",
    category: "AI & AUTOMATION",
    date: "September 14, 2026",
    readTime: "4 min read",
    author: "ORION AI Team",
    authorRole: "Engineering Team",
    content: `## WhatsApp: The Heartbeat of African Commerce

For 90% of enterprises in francophone & sub-saharan Africa, customer journeys initiate on WhatsApp. Yet manual replies create friction:
- Latencies exceeding 4 hours during business hours.
- Lost high-intent buyers seeking instant answers.

## Autonomous AI Lead Qualification

Leveraging Groq LPUs and LLaMA 3.3 models, ORION deploys conversational agents that:
- Ask intelligent clarifying questions one by one.
- Capture budget range, timeline, and company needs.
- Dispatch instant Web Push notifications to management.`,
  },
  {
    slug: "why-showcase-sites-fail-to-convert",
    title: "Why Your Current Website Fails to Generate Qualified Leads",
    excerpt: "Slow page speeds, generic templates, and lack of interactive capture: the 3 deadly traps of corporate websites.",
    category: "WEB & STRATEGY",
    date: "September 08, 2026",
    readTime: "6 min read",
    author: "Josias K.",
    authorRole: "Lead Architect @ ORION",
    content: `## 1. Page Latency Destroys Conversion

Over 53% of mobile users abandon a website if page loading takes more than 3 seconds.

## 2. The Passive Brochure Trap

A website is not a static PDF. It must act as your most effective 24/7 sales representative:
- Crisp visual hierarchy with obsidian aesthetics.
- Seamless conversational entry points.

## 3. Sub-Second Architecture

ORION builds exclusively on Next.js 15 App Router to deliver perfect Core Web Vitals and sub-second render times worldwide.`,
  },
];

export async function getBlogPosts(locale: string = "fr"): Promise<BlogPost[]> {
  return locale === "en" ? defaultPostsEn : defaultPostsFr;
}

export async function getBlogPostBySlug(slug: string, locale: string = "fr"): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts(locale);
  return posts.find((p) => p.slug === slug);
}
