"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  FileQuestion,
  Globe,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageCircle,
  Plus,
  Receipt,
  Rocket,
  Send,
  Shield,
  TicketPlus,
} from "lucide-react";
import { CarteSection, PageHeader, Tableau, badgeStatut } from "@/components/ui";
import { tickets as ticketsInitiaux, type Ticket } from "@/lib/data";

interface MessageChat {
  id: number;
  auteur: "vous" | "bot";
  texte: string;
}

const ACCES_RAPIDE = [
  { titre: "Chat en direct", description: "Réponse en quelques minutes", ancre: "#chat", icone: MessageCircle },
  { titre: "Ouvrir un ticket", description: "Suivi détaillé de votre demande", ancre: "#tickets", icone: TicketPlus },
  { titre: "FAQ", description: "Les questions les plus fréquentes", ancre: "#faq", icone: FileQuestion },
  { titre: "Base de connaissances", description: "Guides et tutoriels pas à pas", ancre: "#base", icone: BookOpen },
];

const FAQ = [
  {
    question: "Comment configurer mes DNS après l'achat d'un domaine ?",
    reponse:
      "Rendez-vous dans Domaines → votre domaine → Gérer les DNS. Ajoutez un enregistrement A pointant vers l'IP de votre hébergement (fournie dans votre espace) et un CNAME « www ». La propagation prend généralement de 1 à 24 heures.",
  },
  {
    question: "Quand suis-je facturé et comment récupérer mes factures ?",
    reponse:
      "Les abonnements sont facturés le même jour chaque mois, et les prestations ponctuelles à la commande. Toutes vos factures sont téléchargeables depuis la page Facturation, au format PDF, dès leur émission.",
  },
  {
    question: "Puis-je obtenir un remboursement ?",
    reponse:
      "Oui : les plans d'hébergement bénéficient d'une garantie « satisfait ou remboursé » de 30 jours. Les campagnes publicitaires déjà diffusées et les noms de domaine enregistrés ne sont en revanche pas remboursables.",
  },
  {
    question: "Comment migrer mon site existant vers Nexora ?",
    reponse:
      "La migration est offerte : ouvrez un ticket avec les accès de votre ancien hébergeur (FTP ou cPanel) et notre équipe transfère vos fichiers, bases de données et emails sous 48 h, sans interruption de service.",
  },
  {
    question: "Que faire si mon site est lent ou inaccessible ?",
    reponse:
      "Lancez d'abord une analyse depuis la page Analyse pour identifier la cause. Si le problème persiste, contactez-nous via le chat en direct : notre équipe technique est disponible 7 j/7 de 8 h à 22 h (GMT+1).",
  },
];

const BASE_CONNAISSANCES = [
  { titre: "Démarrer avec Nexora", description: "Créer votre compte et vos premiers services", icone: Rocket },
  { titre: "Configurer vos DNS", description: "Enregistrements A, CNAME, MX expliqués", icone: Globe },
  { titre: "Créer un email pro", description: "Boîtes mail sur votre propre domaine", icone: Mail },
  { titre: "Lancer une campagne", description: "Facebook et TikTok Ads pas à pas", icone: Megaphone },
  { titre: "Comprendre votre facture", description: "Lignes, TVA et moyens de paiement", icone: Receipt },
  { titre: "Sécuriser votre site", description: "SSL, sauvegardes et bonnes pratiques", icone: Shield },
];

function badgePriorite(priorite: Ticket["priorite"]): string {
  if (priorite === "Haute") return "badge-red";
  if (priorite === "Basse") return "badge-gray";
  return "badge-blue";
}

export default function SupportPage() {
  // — Chat en direct (simulation) —
  const [messages, setMessages] = useState<MessageChat[]>([
    {
      id: 1,
      auteur: "bot",
      texte: "Bonjour 👋 Je suis Nexora Assistant. Comment puis-je vous aider aujourd'hui ?",
    },
  ]);
  const [saisie, setSaisie] = useState("");

  // — Tickets —
  const [tickets, setTickets] = useState<Ticket[]>(ticketsInitiaux);
  const [sujet, setSujet] = useState("");
  const [priorite, setPriorite] = useState<Ticket["priorite"]>("Normale");
  const [descriptionTicket, setDescriptionTicket] = useState("");

  // — FAQ —
  const [faqOuverte, setFaqOuverte] = useState<number | null>(0);

  function envoyerMessage(e: React.FormEvent) {
    e.preventDefault();
    const texte = saisie.trim();
    if (!texte) return;
    const idBase = Date.now();
    setMessages((prec) => [...prec, { id: idBase, auteur: "vous", texte }]);
    setSaisie("");
    setTimeout(() => {
      setMessages((prec) => [
        ...prec,
        {
          id: idBase + 1,
          auteur: "bot",
          texte:
            "Merci pour votre message ! Un conseiller vous répond dans quelques minutes. En attendant, consultez notre base de connaissances.",
        },
      ]);
    }, 800);
  }

  function creerTicket(e: React.FormEvent) {
    e.preventDefault();
    if (!sujet.trim()) return;
    const nouveau: Ticket = {
      id: `TKT-${1043 + tickets.length}`,
      sujet: sujet.trim(),
      statut: "Ouvert",
      priorite,
      maj: "À l'instant",
    };
    setTickets((prec) => [nouveau, ...prec]);
    setSujet("");
    setPriorite("Normale");
    setDescriptionTicket("");
  }

  return (
    <div>
      <PageHeader
        titre="Centre de support"
        description="Notre équipe est disponible 7 j/7 pour vous accompagner."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {ACCES_RAPIDE.map((a) => (
          <a key={a.titre} href={a.ancre} className="card card-hover flex items-start gap-4 p-5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
              <a.icone size={20} />
            </span>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{a.titre}</p>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">{a.description}</p>
            </div>
          </a>
        ))}
      </div>

      <div id="chat" className="mt-6 scroll-mt-24">
        <CarteSection
          titre="Chat en direct"
          action={
            <span className="badge-green">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> En ligne
            </span>
          }
        >
          <div className="flex h-72 flex-col gap-3 overflow-y-auto rounded-xl bg-gray-50 p-4 dark:bg-gray-950/60">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.auteur === "vous" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.auteur === "vous"
                      ? "rounded-br-md bg-brand-600 text-white"
                      : "rounded-bl-md border border-gray-200 bg-white text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                  }`}
                >
                  {m.auteur === "bot" && (
                    <p className="mb-0.5 flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                      <LifeBuoy size={12} /> Nexora Assistant
                    </p>
                  )}
                  {m.texte}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={envoyerMessage} className="mt-4 flex gap-3">
            <input
              type="text"
              value={saisie}
              onChange={(e) => setSaisie(e.target.value)}
              placeholder="Écrivez votre message…"
              className="input flex-1"
              aria-label="Votre message"
            />
            <button type="submit" className="btn-primary shrink-0">
              <Send size={16} /> Envoyer
            </button>
          </form>
        </CarteSection>
      </div>

      <div id="tickets" className="mt-6 scroll-mt-24 grid gap-6 xl:grid-cols-3">
        <CarteSection titre="Vos tickets" className="xl:col-span-2">
          <Tableau entetes={["Référence", "Sujet", "Priorité", "Statut", "Dernière mise à jour"]}>
            {tickets.map((t) => (
              <tr key={t.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{t.id}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{t.sujet}</td>
                <td className="py-3 pr-4">
                  <span className={badgePriorite(t.priorite)}>{t.priorite}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className={badgeStatut(t.statut)}>{t.statut}</span>
                </td>
                <td className="py-3 text-gray-500 dark:text-gray-400">{t.maj}</td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>

        <CarteSection titre="Nouveau ticket">
          <form onSubmit={creerTicket} className="space-y-4">
            <div>
              <label htmlFor="tkt-sujet" className="label">
                Sujet
              </label>
              <input
                id="tkt-sujet"
                type="text"
                required
                value={sujet}
                onChange={(e) => setSujet(e.target.value)}
                placeholder="Ex. Problème d'accès à mon email pro"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="tkt-priorite" className="label">
                Priorité
              </label>
              <select
                id="tkt-priorite"
                value={priorite}
                onChange={(e) => setPriorite(e.target.value as Ticket["priorite"])}
                className="input"
              >
                <option value="Basse">Basse</option>
                <option value="Normale">Normale</option>
                <option value="Haute">Haute</option>
              </select>
            </div>
            <div>
              <label htmlFor="tkt-description" className="label">
                Description
              </label>
              <textarea
                id="tkt-description"
                rows={4}
                value={descriptionTicket}
                onChange={(e) => setDescriptionTicket(e.target.value)}
                placeholder="Décrivez votre demande le plus précisément possible…"
                className="input resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              <Plus size={16} /> Ouvrir le ticket
            </button>
          </form>
        </CarteSection>
      </div>

      <div id="faq" className="mt-6 scroll-mt-24">
        <CarteSection titre="FAQ — Questions fréquentes">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800/70">
            {FAQ.map((f, i) => (
              <li key={f.question}>
                <button
                  type="button"
                  onClick={() => setFaqOuverte(faqOuverte === i ? null : i)}
                  aria-expanded={faqOuverte === i}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {f.question}
                  </span>
                  <ChevronDown
                    size={17}
                    className={`shrink-0 text-gray-400 transition-transform ${
                      faqOuverte === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {faqOuverte === i && (
                  <p className="pb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {f.reponse}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CarteSection>
      </div>

      <div id="base" className="mt-6 scroll-mt-24">
        <CarteSection titre="Base de connaissances">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {BASE_CONNAISSANCES.map((b) => (
              <a
                key={b.titre}
                href="#base"
                className="card card-hover flex items-start gap-4 p-5"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                  <b.icone size={18} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{b.titre}</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{b.description}</p>
                </div>
              </a>
            ))}
          </div>
        </CarteSection>
      </div>
    </div>
  );
}
