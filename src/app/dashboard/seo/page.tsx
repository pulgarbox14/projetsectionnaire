"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Rocket,
  Search,
} from "lucide-react";
import { BarreProgression } from "@/components/charts";
import { CarteSection, PageHeader, Tableau, badgeStatut } from "@/components/ui";
import { commandesSEO, motsClesSEO } from "@/lib/data";
import { fcfa } from "@/lib/devise";

interface OffreSEO {
  id: string;
  nom: string;
  prix: number;
  description: string;
  recommande: boolean;
  inclus: string[];
}

const OFFRES: OffreSEO[] = [
  {
    id: "local",
    nom: "SEO Local",
    prix: 190000,
    description: "Dominez les recherches dans votre ville et votre région.",
    recommande: false,
    inclus: [
      "20 mots-clés suivis",
      "10 backlinks locaux",
      "2 contenus optimisés / mois",
      "Audit de vitesse",
      "Optimisation technique de base",
    ],
  },
  {
    id: "national",
    nom: "SEO National",
    prix: 321000,
    description: "Positionnez-vous sur tout le marché national.",
    recommande: true,
    inclus: [
      "50 mots-clés suivis",
      "30 backlinks de qualité",
      "5 contenus optimisés / mois",
      "Audit de vitesse approfondi",
      "Optimisation technique complète",
    ],
  },
  {
    id: "international",
    nom: "SEO International",
    prix: 650000,
    description: "Rayonnez sur plusieurs pays et plusieurs langues.",
    recommande: false,
    inclus: [
      "150 mots-clés suivis (multilingues)",
      "100 backlinks premium",
      "12 contenus optimisés / mois",
      "Audit de vitesse multi-régions",
      "Optimisation technique avancée",
    ],
  },
];

const SITES = ["entreprise.com", "entreprise.fr", "ma-boutique.shop"];

function Evolution({ valeur }: { valeur: number }) {
  if (valeur > 0) {
    return (
      <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
        ↑ +{valeur}
      </span>
    );
  }
  if (valeur < 0) {
    return (
      <span className="inline-flex items-center gap-1 font-semibold text-red-600 dark:text-red-400">
        ↓ {valeur}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-gray-500 dark:text-gray-400">
      → 0
    </span>
  );
}

export default function SEOPage() {
  const [offreId, setOffreId] = useState("national");
  const [site, setSite] = useState(SITES[0]);
  const [commande, setCommande] = useState<{ offre: OffreSEO; site: string } | null>(null);

  const offreSelectionnee = OFFRES.find((o) => o.id === offreId) ?? OFFRES[1];

  return (
    <div>
      <PageHeader
        titre="Référencement SEO"
        description="Commandez un audit SEO et suivez la progression de vos mots-clés."
      />

      <CarteSection titre="Commander un audit SEO">
        <div className="grid gap-4 lg:grid-cols-3">
          {OFFRES.map((o) => {
            const actif = o.id === offreId;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setOffreId(o.id);
                  setCommande(null);
                }}
                aria-pressed={actif}
                className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                  actif
                    ? "border-brand-600 bg-brand-50/50 shadow-card-hover dark:border-brand-500 dark:bg-brand-900/20"
                    : "border-gray-200 bg-white hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-700"
                }`}
              >
                {o.recommande && (
                  <span className="badge-blue absolute -top-2.5 right-4">Recommandé</span>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{o.nom}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{o.description}</p>
                  </div>
                  {actif ? (
                    <CheckCircle2 size={20} className="shrink-0 text-brand-600 dark:text-brand-400" />
                  ) : (
                    <Circle size={20} className="shrink-0 text-gray-300 dark:text-gray-700" />
                  )}
                </div>
                <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
                  {fcfa(o.prix)}
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400"> / audit</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {o.inclus.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="site-seo" className="label">
              Site concerné
            </label>
            <select
              id="site-seo"
              value={site}
              onChange={(e) => {
                setSite(e.target.value);
                setCommande(null);
              }}
              className="input"
            >
              {SITES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={() => setCommande({ offre: offreSelectionnee, site })}
            className="btn-primary shrink-0"
          >
            <Rocket size={17} />
            Commander l&apos;audit
          </button>
        </div>

        {commande && (
          <div className="mt-5 flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-900/20">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <div className="text-sm">
              <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                Commande confirmée !
              </p>
              <p className="mt-1 text-emerald-700 dark:text-emerald-400">
                Audit <span className="font-semibold">{commande.offre.nom}</span> pour{" "}
                <span className="font-semibold">{commande.site}</span> —{" "}
                {fcfa(commande.offre.prix)}. Notre équipe démarre sous 24 h et
                vous recevrez le rapport complet par email.
              </p>
            </div>
          </div>
        )}
      </CarteSection>

      <div className="mt-6">
        <CarteSection titre="Suivi de progression">
          <ul className="space-y-5">
            {commandesSEO.map((c) => (
              <li key={c.id} className="rounded-xl border border-gray-100 p-4 dark:border-gray-800">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                      <Search size={16} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {c.type} — {c.site}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {c.id} · Démarré le {c.demarre}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {c.progression} %
                    </span>
                    <span className={badgeStatut(c.statut)}>{c.statut}</span>
                  </div>
                </div>
                <BarreProgression
                  valeur={c.progression}
                  couleur={c.progression === 100 ? "bg-emerald-500" : "bg-brand-600"}
                />
              </li>
            ))}
          </ul>
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection titre="Positions de vos mots-clés">
          <Tableau entetes={["Mot-clé", "Position", "Évolution", "Volume de recherche mensuel"]}>
            {motsClesSEO.map((m) => (
              <tr key={m.mot}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{m.mot}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  #{m.position}
                </td>
                <td className="py-3 pr-4">
                  <Evolution valeur={m.evolution} />
                </td>
                <td className="py-3 text-gray-500 dark:text-gray-400">{m.volume}</td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>
      </div>
    </div>
  );
}
