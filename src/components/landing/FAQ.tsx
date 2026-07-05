"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    q: "L'analyse de site web est-elle vraiment gratuite ?",
    r: "Oui. Vous pouvez analyser n'importe quel site gratuitement et sans carte bancaire. Le rapport couvre la performance, la vitesse, le SEO, la sécurité, le responsive mobile et l'accessibilité, avec un score global sur 100 et des recommandations concrètes.",
  },
  {
    q: "Puis-je transférer un domaine que je possède déjà ?",
    r: "Absolument. Le transfert est gratuit et guidé pas à pas : nous nous occupons des DNS, des emails et de la reconfiguration de votre site, sans interruption de service.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    r: "Carte bancaire, Stripe, PayPal, Apple Pay, Google Pay, ainsi que les solutions africaines : Flutterwave, Paystack, Orange Money, MTN Mobile Money et Wave.",
  },
  {
    q: "Comment fonctionnent les commandes de publicités Facebook et TikTok ?",
    r: "Vous remplissez un brief (objectif, budget, pays, audience, visuels, durée), vous payez en ligne, puis nos experts créent, lancent et optimisent votre campagne. Vous suivez les résultats en temps réel depuis votre tableau de bord.",
  },
  {
    q: "Proposez-vous un accompagnement SEO sur la durée ?",
    r: "Oui. Après l'audit initial (local, national ou international), nous optimisons vos mots-clés, votre contenu, vos backlinks et la technique de votre site, avec un suivi de progression mensuel visible dans votre espace.",
  },
  {
    q: "Puis-je changer d'offre d'hébergement à tout moment ?",
    r: "Oui, la mise à niveau est instantanée et sans coupure. La différence est calculée au prorata de votre période de facturation.",
  },
  {
    q: "Le support est-il vraiment disponible 24/7 ?",
    r: "Oui, par chat en direct et tickets, 24 h/24 et 7 j/7. Les clients Premium bénéficient d'une assistance prioritaire avec un temps de réponse moyen inférieur à 15 minutes.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    r: "Vos données sont chiffrées en transit et au repos, sauvegardées quotidiennement et hébergées dans des centres de données certifiés ISO 27001. Nous sommes conformes au RGPD.",
  },
];

export default function FAQ() {
  const [ouvert, setOuvert] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-gray-200 dark:divide-gray-800">
      {QUESTIONS.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOuvert(ouvert === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            aria-expanded={ouvert === i}
          >
            <span className="font-semibold text-gray-900 dark:text-white">{item.q}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-gray-400 transition-transform ${ouvert === i ? "rotate-180" : ""}`}
            />
          </button>
          {ouvert === i && (
            <p className="animate-fade-in pb-5 text-gray-600 dark:text-gray-400">{item.r}</p>
          )}
        </div>
      ))}
    </div>
  );
}
