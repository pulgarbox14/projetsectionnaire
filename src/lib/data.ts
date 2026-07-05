// Données de démonstration partagées entre le dashboard client et l'admin.

export const utilisateurDemo = {
  nom: "Aïcha Koudjo",
  email: "aicha@entreprise.com",
  entreprise: "Entreprise SARL",
  plan: "Business",
  avatarInitiales: "AK",
};

export const statsDashboard = [
  { label: "Domaines actifs", valeur: "4", variation: "+1 ce mois", cle: "domaines" },
  { label: "Sites hébergés", valeur: "3", variation: "Tous en ligne", cle: "sites" },
  { label: "Emails professionnels", valeur: "12", variation: "8,4 Go utilisés", cle: "emails" },
  { label: "Campagnes actives", valeur: "5", variation: "2 Facebook · 3 TikTok", cle: "campagnes" },
];

export const depensesMensuelles = [
  { mois: "Jan", montant: 420 },
  { mois: "Fév", montant: 380 },
  { mois: "Mar", montant: 540 },
  { mois: "Avr", montant: 460 },
  { mois: "Mai", montant: 690 },
  { mois: "Juin", montant: 610 },
  { mois: "Juil", montant: 725 },
];

export const trafic30Jours = [
  32, 41, 38, 45, 52, 48, 61, 58, 64, 59, 72, 68, 75, 71, 84, 79, 88, 92, 85,
  97, 91, 104, 99, 112, 108, 118, 114, 126, 121, 134,
];

export const repartitionDepenses = [
  { categorie: "Publicité", montant: 1850, couleur: "#2563eb" },
  { categorie: "Hébergement", montant: 720, couleur: "#6366f1" },
  { categorie: "Domaines", montant: 240, couleur: "#8b5cf6" },
  { categorie: "SEO", montant: 980, couleur: "#0ea5e9" },
  { categorie: "Autres", montant: 310, couleur: "#94a3b8" },
];

export interface Depense {
  id: number;
  date: string;
  categorie: string;
  description: string;
  montant: number;
  facture: string;
}

export const depensesInitiales: Depense[] = [
  { id: 1, date: "2026-07-02", categorie: "Publicité", description: "Campagne Facebook — Collection été", montant: 350, facture: "FAC-2026-0142" },
  { id: 2, date: "2026-06-28", categorie: "Hébergement", description: "Renouvellement plan Business", montant: 24.99, facture: "FAC-2026-0139" },
  { id: 3, date: "2026-06-21", categorie: "SEO", description: "Audit SEO national — juin", montant: 490, facture: "FAC-2026-0131" },
  { id: 4, date: "2026-06-15", categorie: "Domaines", description: "entreprise.africa (1 an)", montant: 15.99, facture: "FAC-2026-0127" },
  { id: 5, date: "2026-06-08", categorie: "Publicité", description: "Campagne TikTok — Notoriété", montant: 275, facture: "FAC-2026-0119" },
];

export interface Facture {
  id: string;
  date: string;
  description: string;
  montant: number;
  statut: "Payée" | "En attente" | "Échue";
}

export const factures: Facture[] = [
  { id: "FAC-2026-0142", date: "2026-07-02", description: "Campagne Facebook Ads — Collection été", montant: 350, statut: "Payée" },
  { id: "FAC-2026-0139", date: "2026-06-28", description: "Hébergement Business — mensuel", montant: 24.99, statut: "Payée" },
  { id: "FAC-2026-0135", date: "2026-06-25", description: "Devis — Refonte SEO international", montant: 1200, statut: "En attente" },
  { id: "FAC-2026-0131", date: "2026-06-21", description: "Audit SEO national — juin", montant: 490, statut: "Payée" },
  { id: "FAC-2026-0127", date: "2026-06-15", description: "Domaine entreprise.africa (1 an)", montant: 15.99, statut: "Payée" },
  { id: "FAC-2026-0112", date: "2026-05-30", description: "Campagne TikTok — Génération de leads", montant: 420, statut: "Échue" },
];

export interface Paiement {
  id: string;
  date: string;
  methode: string;
  montant: number;
  statut: "Réussi" | "En cours" | "Échoué";
}

export const paiements: Paiement[] = [
  { id: "PAY-88412", date: "2026-07-02", methode: "Carte bancaire", montant: 350, statut: "Réussi" },
  { id: "PAY-88377", date: "2026-06-28", methode: "Stripe", montant: 24.99, statut: "Réussi" },
  { id: "PAY-88301", date: "2026-06-21", methode: "MTN Mobile Money", montant: 490, statut: "Réussi" },
  { id: "PAY-88264", date: "2026-06-15", methode: "PayPal", montant: 15.99, statut: "Réussi" },
  { id: "PAY-88191", date: "2026-06-08", methode: "Orange Money", montant: 275, statut: "Réussi" },
  { id: "PAY-88102", date: "2026-05-30", methode: "Wave", montant: 420, statut: "Échoué" },
];

export const methodesPaiement = [
  "Carte bancaire",
  "Stripe",
  "PayPal",
  "Flutterwave",
  "Paystack",
  "Orange Money",
  "MTN Mobile Money",
  "Wave",
  "Apple Pay",
  "Google Pay",
];

export interface DomainePossede {
  nom: string;
  statut: "Actif" | "Expire bientôt" | "Transfert en cours";
  expiration: string;
  autoRenouvellement: boolean;
}

export const domainesPossedes: DomainePossede[] = [
  { nom: "entreprise.com", statut: "Actif", expiration: "2027-03-14", autoRenouvellement: true },
  { nom: "entreprise.fr", statut: "Actif", expiration: "2027-01-08", autoRenouvellement: true },
  { nom: "entreprise.africa", statut: "Actif", expiration: "2027-06-15", autoRenouvellement: false },
  { nom: "ma-boutique.shop", statut: "Expire bientôt", expiration: "2026-08-02", autoRenouvellement: false },
];

export interface EmailPro {
  adresse: string;
  nom: string;
  stockageUtilise: number; // Go
  stockageTotal: number; // Go
  statut: "Actif" | "Suspendu";
}

export const emailsPro: EmailPro[] = [
  { adresse: "contact@entreprise.com", nom: "Contact général", stockageUtilise: 2.4, stockageTotal: 10, statut: "Actif" },
  { adresse: "info@entreprise.com", nom: "Informations", stockageUtilise: 1.1, stockageTotal: 10, statut: "Actif" },
  { adresse: "support@entreprise.com", nom: "Support client", stockageUtilise: 3.8, stockageTotal: 10, statut: "Actif" },
  { adresse: "sales@entreprise.com", nom: "Équipe commerciale", stockageUtilise: 1.1, stockageTotal: 10, statut: "Actif" },
];

export interface Campagne {
  id: string;
  nom: string;
  plateforme: "Facebook" | "TikTok";
  objectif: string;
  budget: number;
  depense: number;
  impressions: string;
  clics: string;
  statut: "Active" | "En pause" | "Terminée" | "En validation";
}

export const campagnes: Campagne[] = [
  { id: "CAM-201", nom: "Collection été 2026", plateforme: "Facebook", objectif: "Ventes", budget: 500, depense: 350, impressions: "184 200", clics: "6 420", statut: "Active" },
  { id: "CAM-198", nom: "Retargeting visiteurs", plateforme: "Facebook", objectif: "Trafic", budget: 200, depense: 200, impressions: "96 800", clics: "3 150", statut: "Terminée" },
  { id: "CAM-205", nom: "Lancement produit X", plateforme: "TikTok", objectif: "Notoriété", budget: 400, depense: 180, impressions: "512 000", clics: "12 300", statut: "Active" },
  { id: "CAM-207", nom: "Leads B2B juillet", plateforme: "TikTok", objectif: "Génération de leads", budget: 350, depense: 95, impressions: "88 400", clics: "2 010", statut: "Active" },
  { id: "CAM-209", nom: "Promo rentrée", plateforme: "TikTok", objectif: "Ventes", budget: 600, depense: 0, impressions: "—", clics: "—", statut: "En validation" },
];

export interface CommandeSEO {
  id: string;
  type: "SEO Local" | "SEO National" | "SEO International";
  site: string;
  progression: number;
  statut: "En cours" | "Terminé" | "En attente";
  demarre: string;
}

export const commandesSEO: CommandeSEO[] = [
  { id: "SEO-054", type: "SEO National", site: "entreprise.com", progression: 68, statut: "En cours", demarre: "2026-06-01" },
  { id: "SEO-048", type: "SEO Local", site: "ma-boutique.shop", progression: 100, statut: "Terminé", demarre: "2026-04-12" },
  { id: "SEO-057", type: "SEO International", site: "entreprise.com", progression: 15, statut: "En cours", demarre: "2026-06-25" },
];

export const motsClesSEO = [
  { mot: "agence digitale cotonou", position: 3, evolution: +2, volume: "1 900" },
  { mot: "hébergement web afrique", position: 7, evolution: +5, volume: "3 600" },
  { mot: "création site e-commerce", position: 12, evolution: -1, volume: "8 100" },
  { mot: "emails professionnels", position: 5, evolution: +3, volume: "2 400" },
  { mot: "campagne facebook ads prix", position: 9, evolution: 0, volume: "1 300" },
];

export interface Ticket {
  id: string;
  sujet: string;
  statut: "Ouvert" | "En cours" | "Résolu";
  priorite: "Haute" | "Normale" | "Basse";
  maj: string;
}

export const tickets: Ticket[] = [
  { id: "TKT-1042", sujet: "Configuration DNS pour entreprise.africa", statut: "En cours", priorite: "Haute", maj: "Il y a 2 h" },
  { id: "TKT-1038", sujet: "Question sur la facturation de juin", statut: "Ouvert", priorite: "Normale", maj: "Il y a 5 h" },
  { id: "TKT-1029", sujet: "Migration d'un site WordPress", statut: "Résolu", priorite: "Normale", maj: "Hier" },
];

export const activitesRecentes = [
  { texte: "Paiement de 350 € reçu — Campagne Facebook « Collection été »", temps: "Il y a 2 h", type: "paiement" },
  { texte: "Analyse du site entreprise.com terminée — score 87/100", temps: "Il y a 4 h", type: "analyse" },
  { texte: "Nouvel email professionnel créé : sales@entreprise.com", temps: "Hier", type: "email" },
  { texte: "Audit SEO national : progression 68 %", temps: "Hier", type: "seo" },
  { texte: "Le domaine ma-boutique.shop expire dans 28 jours", temps: "Il y a 2 jours", type: "alerte" },
];

export const notifications = [
  { titre: "Campagne validée", texte: "Votre campagne TikTok « Promo rentrée » est en cours de validation.", temps: "Il y a 1 h", lu: false },
  { titre: "Facture disponible", texte: "La facture FAC-2026-0142 est disponible au téléchargement.", temps: "Il y a 2 h", lu: false },
  { titre: "Renouvellement", texte: "ma-boutique.shop expire le 2 août 2026. Activez l'auto-renouvellement.", temps: "Il y a 2 jours", lu: true },
];

// ——— Données admin ———

export const statsAdmin = [
  { label: "Utilisateurs", valeur: "10 482", variation: "+312 ce mois" },
  { label: "Revenu mensuel (MRR)", valeur: "148 250 €", variation: "+8,4 %" },
  { label: "Commandes en cours", valeur: "236", variation: "18 en attente" },
  { label: "Tickets ouverts", valeur: "42", variation: "temps de réponse 1,8 h" },
];

export const revenusMensuelsAdmin = [
  { mois: "Jan", montant: 98400 },
  { mois: "Fév", montant: 104200 },
  { mois: "Mar", montant: 112800 },
  { mois: "Avr", montant: 121500 },
  { mois: "Mai", montant: 131900 },
  { mois: "Juin", montant: 139600 },
  { mois: "Juil", montant: 148250 },
];

export interface UtilisateurAdmin {
  id: number;
  nom: string;
  email: string;
  entreprise: string;
  plan: "Starter" | "Business" | "Premium";
  statut: "Actif" | "Suspendu" | "En attente";
  inscrit: string;
}

export const utilisateursAdmin: UtilisateurAdmin[] = [
  { id: 1, nom: "Aïcha Koudjo", email: "aicha@entreprise.com", entreprise: "Entreprise SARL", plan: "Business", statut: "Actif", inscrit: "2025-11-02" },
  { id: 2, nom: "Jean-Marc Dossou", email: "jm@dossou-consulting.bj", entreprise: "Dossou Consulting", plan: "Premium", statut: "Actif", inscrit: "2025-08-17" },
  { id: 3, nom: "Fatou Ndiaye", email: "fatou@ndiaye-mode.sn", entreprise: "Ndiaye Mode", plan: "Starter", statut: "Actif", inscrit: "2026-01-24" },
  { id: 4, nom: "Pierre Lavigne", email: "pierre@lavigne.fr", entreprise: "Lavigne & Fils", plan: "Business", statut: "Suspendu", inscrit: "2025-06-30" },
  { id: 5, nom: "Sarah Cohen", email: "sarah@cohentech.io", entreprise: "CohenTech", plan: "Premium", statut: "Actif", inscrit: "2026-03-11" },
  { id: 6, nom: "Kofi Mensah", email: "kofi@mensah.africa", entreprise: "Mensah Group", plan: "Starter", statut: "En attente", inscrit: "2026-06-28" },
];

export interface CommandeAdmin {
  id: string;
  client: string;
  service: string;
  montant: number;
  statut: "En cours" | "Livrée" | "En attente" | "Annulée";
  date: string;
}

export const commandesAdmin: CommandeAdmin[] = [
  { id: "CMD-3121", client: "Entreprise SARL", service: "Campagne Facebook Ads", montant: 350, statut: "En cours", date: "2026-07-02" },
  { id: "CMD-3118", client: "CohenTech", service: "SEO International", montant: 1450, statut: "En cours", date: "2026-07-01" },
  { id: "CMD-3115", client: "Ndiaye Mode", service: "Hébergement Premium (1 an)", montant: 199, statut: "Livrée", date: "2026-06-29" },
  { id: "CMD-3109", client: "Dossou Consulting", service: "Campagne TikTok Ads", montant: 600, statut: "En attente", date: "2026-06-27" },
  { id: "CMD-3102", client: "Mensah Group", service: "Domaine mensah.africa", montant: 15.99, statut: "Livrée", date: "2026-06-25" },
  { id: "CMD-3097", client: "Lavigne & Fils", service: "Audit SEO Local", montant: 290, statut: "Annulée", date: "2026-06-22" },
];

export const logsAdmin = [
  { temps: "2026-07-05 10:42", niveau: "info", message: "Sauvegarde quotidienne terminée (3 214 sites, 0 erreur)." },
  { temps: "2026-07-05 09:18", niveau: "warn", message: "Pic de charge sur le cluster EU-West-1 : autoscaling déclenché." },
  { temps: "2026-07-05 08:03", niveau: "info", message: "Certificats SSL renouvelés automatiquement : 214 domaines." },
  { temps: "2026-07-04 23:47", niveau: "error", message: "Échec paiement PAY-88102 (Wave) — nouvelle tentative planifiée." },
  { temps: "2026-07-04 18:22", niveau: "info", message: "Déploiement version 4.12.0 du panel terminé." },
];
