import {
  Activity,
  Check,
  CheckCircle2,
  Globe,
  Lock,
  Server,
} from "lucide-react";
import { CarteSection, PageHeader, Tableau } from "@/components/ui";
import { fcfa } from "@/lib/devise";

const OFFRES = [
  {
    nom: "Starter",
    prix: 3000,
    description: "Pour lancer votre premier site en toute simplicité.",
    avantages: ["1 site web", "SSL gratuit", "Sauvegarde hebdomadaire", "1 adresse email"],
    populaire: false,
  },
  {
    nom: "Business",
    prix: 6500,
    description: "Le meilleur équilibre entre performance et budget.",
    avantages: ["Sites illimités", "Performance élevée", "Sauvegarde quotidienne", "CDN mondial"],
    populaire: true,
  },
  {
    nom: "Premium",
    prix: 13000,
    description: "Puissance maximale pour les projets exigeants.",
    avantages: [
      "Hébergement ultra rapide NVMe",
      "Infrastructure cloud",
      "Haute disponibilité 99,99 %",
      "Assistance prioritaire 24/7",
    ],
    populaire: false,
  },
];

const ETAT_SERVEURS = [
  { label: "Uptime (30 derniers jours)", valeur: "99,98 %", icone: Activity },
  { label: "Régions", valeur: "Europe de l'Ouest + Afrique de l'Ouest", icone: Globe },
  { label: "Certificat SSL", valeur: "Valide", icone: Lock },
];

const SITES_HEBERGES = [
  { site: "entreprise.com", plan: "Business", region: "Europe de l'Ouest", statut: "En ligne" },
  { site: "entreprise.fr", plan: "Business", region: "Europe de l'Ouest", statut: "En ligne" },
  { site: "ma-boutique.shop", plan: "Business", region: "Afrique de l'Ouest", statut: "En ligne" },
];

export default function HebergementPage() {
  return (
    <div>
      <PageHeader
        titre="Hébergement web"
        description="Des serveurs rapides, sécurisés et proches de vos visiteurs."
      />

      <div className="card flex flex-wrap items-center justify-between gap-4 border-brand-200 bg-brand-50/50 p-5 dark:border-brand-800 dark:bg-brand-900/20">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
            <Server size={18} />
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Votre plan actuel : Business
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Actif jusqu&apos;au 28 juillet 2026
            </p>
          </div>
        </div>
        <span className="badge-green">
          <CheckCircle2 size={13} /> Actif
        </span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {OFFRES.map((offre) => (
          <div
            key={offre.nom}
            className={`card relative flex flex-col p-6 ${
              offre.populaire
                ? "border-2 border-brand-600 shadow-card-hover dark:border-brand-500"
                : "card-hover"
            }`}
          >
            {offre.populaire && (
              <span className="badge-blue absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white dark:bg-brand-600 dark:text-white">
                Populaire
              </span>
            )}
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{offre.nom}</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{offre.description}</p>
            <p className="mt-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {fcfa(offre.prix)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400"> /mois</span>
            </p>
            <ul className="mt-5 flex-1 space-y-3">
              {offre.avantages.map((a) => (
                <li key={a} className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                  {a}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`${offre.populaire ? "btn-primary" : "btn-secondary"} mt-6 w-full`}
            >
              Commencer
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="mb-5 text-base font-semibold text-gray-900 dark:text-white">
          État de vos serveurs
        </h2>
        <div className="grid gap-5 sm:grid-cols-3">
          {ETAT_SERVEURS.map((e) => {
            const Icone = e.icone;
            return (
              <div key={e.label} className="card card-hover p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{e.label}</p>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <Icone size={17} />
                  </span>
                </div>
                <p className="mt-2 text-lg font-bold text-gray-900 dark:text-white">{e.valeur}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <CarteSection titre="Sites hébergés">
            <Tableau entetes={["Site", "Plan", "Région", "Statut"]}>
              {SITES_HEBERGES.map((s) => (
                <tr key={s.site}>
                  <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{s.site}</td>
                  <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{s.plan}</td>
                  <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{s.region}</td>
                  <td className="py-3">
                    <span className="badge-green">{s.statut}</span>
                  </td>
                </tr>
              ))}
            </Tableau>
          </CarteSection>
        </div>
      </div>
    </div>
  );
}
