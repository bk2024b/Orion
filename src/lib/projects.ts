export type ProjectStatus = "discovery" | "design" | "build" | "review" | "delivered";

export interface ProjectDeliverable {
  id: string;
  name: string;
  type: "figma" | "archive" | "pdf" | "link";
  url: string;
  date: string;
  size?: string;
}

export interface ProjectMessage {
  id: string;
  sender: "client" | "team" | "ai";
  senderName: string;
  content: string;
  timestamp: string;
}

export interface ClientProject {
  id: string;
  name: string;
  clientName: string;
  clientCompany: string;
  division: "web" | "business" | "systems" | "ai_automation";
  status: ProjectStatus;
  summary: string;
  startDate: string;
  targetDeliveryDate: string;
  budget: string;
  deliverables: ProjectDeliverable[];
  messages: ProjectMessage[];
}

export const mockClientProjects: ClientProject[] = [
  {
    id: "proj_clinique_st_joseph",
    name: "Système de Réservation & Dossier Patient",
    clientName: "Dr. Amadou S.",
    clientCompany: "Clinique Privée Saint-Joseph",
    division: "systems",
    status: "build",
    summary: "Plateforme web haute sécurité intégrant prise de rendez-vous en ligne, rappels automatiques WhatsApp et dossier médical dématérialisé pour praticiens.",
    startDate: "05 Septembre 2026",
    targetDeliveryDate: "15 Octobre 2026",
    budget: "3 800 000 FCFA",
    deliverables: [
      {
        id: "deliv_1",
        name: "Cahier des charges & Spécifications techniques.pdf",
        type: "pdf",
        url: "#",
        date: "08 Sept 2026",
        size: "2.4 MB",
      },
      {
        id: "deliv_2",
        name: "Maquettes UI/UX interactives (Figma)",
        type: "figma",
        url: "https://figma.com",
        date: "14 Sept 2026",
      },
      {
        id: "deliv_3",
        name: "Prototype fonctionnel V0.8 (Staging)",
        type: "link",
        url: "#",
        date: "20 Sept 2026",
      },
    ],
    messages: [
      {
        id: "msg_1",
        sender: "ai",
        senderName: "ORION Assistant",
        content: "Projet initialisé suite à la qualification du besoin.",
        timestamp: "05 Sept, 10:14",
      },
      {
        id: "msg_2",
        sender: "team",
        senderName: "Josias (Lead Architect)",
        content: "Bonjour Dr. Amadou, nous avons finalisé la structure de la base PostgreSQL chiffrée. Les maquettes Figma sont disponibles ci-dessus.",
        timestamp: "14 Sept, 16:30",
      },
      {
        id: "msg_3",
        sender: "client",
        senderName: "Dr. Amadou",
        content: "Excellente réactivité ! Nous avons validé les parcours patients avec nos équipes soignantes. Vous pouvez enclencher la phase de build.",
        timestamp: "15 Sept, 09:15",
      },
      {
        id: "msg_4",
        sender: "team",
        senderName: "Josias (Lead Architect)",
        content: "Parfait ! Le build est en cours sur l'environnement de staging. Nous vous livrons la première version de test cette semaine.",
        timestamp: "20 Sept, 11:00",
      },
    ],
  },
  {
    id: "proj_afriq_logistics",
    name: "Agent IA WhatsApp & Dispatch Colis",
    clientName: "Claire Dupont",
    clientCompany: "Afriq Logistics",
    division: "ai_automation",
    status: "review",
    summary: "Assistant conversationnel autonome sur WhatsApp Business et portail de suivi de fret régional en temps réel.",
    startDate: "01 Septembre 2026",
    targetDeliveryDate: "28 Septembre 2026",
    budget: "1 850 000 FCFA",
    deliverables: [
      {
        id: "deliv_1",
        name: "Architecture Prompting & Webhooks.pdf",
        type: "pdf",
        url: "#",
        date: "04 Sept 2026",
        size: "1.1 MB",
      },
      {
        id: "deliv_2",
        name: "Livrable Code Source & API Connectors.zip",
        type: "archive",
        url: "#",
        date: "19 Sept 2026",
        size: "18.5 MB",
      },
    ],
    messages: [
      {
        id: "msg_1",
        sender: "team",
        senderName: "Équipe ORION",
        content: "L'agent IA est déployé sur le numéro de staging WhatsApp. Merci d'effectuer vos tests d'envoi de requêtes de suivi de fret.",
        timestamp: "19 Sept, 14:00",
      },
    ],
  },
];

export async function getClientProjects(): Promise<ClientProject[]> {
  return mockClientProjects;
}

export async function getClientProjectById(id: string): Promise<ClientProject | undefined> {
  return mockClientProjects.find((p) => p.id === id);
}
