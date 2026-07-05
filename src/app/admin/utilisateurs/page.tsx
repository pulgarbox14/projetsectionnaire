"use client";

import { useMemo, useState } from "react";
import { Search, UserCheck, UserPlus, Users, UserX } from "lucide-react";
import { CarteSection, PageHeader, StatCard, Tableau, badgeStatut } from "@/components/ui";
import { utilisateursAdmin, type UtilisateurAdmin } from "@/lib/data";

const FILTRES = ["Tous", "Actif", "Suspendu", "En attente"] as const;
type Filtre = (typeof FILTRES)[number];

function initiales(nom: string): string {
  return nom
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UtilisateursPage() {
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState<Filtre>("Tous");
  const [utilisateurs, setUtilisateurs] = useState<UtilisateurAdmin[]>(utilisateursAdmin);

  const basculerStatut = (id: number) => {
    setUtilisateurs((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, statut: u.statut === "Suspendu" ? "Actif" : "Suspendu" }
          : u
      )
    );
  };

  const filtres = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return utilisateurs.filter((u) => {
      const okStatut = filtre === "Tous" || u.statut === filtre;
      const okRecherche =
        !q ||
        u.nom.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.entreprise.toLowerCase().includes(q);
      return okStatut && okRecherche;
    });
  }, [utilisateurs, filtre, recherche]);

  const actifs = utilisateurs.filter((u) => u.statut === "Actif").length;
  const suspendus = utilisateurs.filter((u) => u.statut === "Suspendu").length;
  const nouveauxCeMois = utilisateurs.filter((u) => u.inscrit.startsWith("2026-07")).length + 3;

  return (
    <div>
      <PageHeader
        titre="Utilisateurs & clients"
        description="Gérez les comptes clients de la plateforme."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" valeur={`${utilisateurs.length}`} icone={<Users size={18} />} />
        <StatCard label="Actifs" valeur={`${actifs}`} icone={<UserCheck size={18} />} />
        <StatCard label="Suspendus" valeur={`${suspendus}`} icone={<UserX size={18} />} />
        <StatCard label="Nouveaux ce mois" valeur={`${nouveauxCeMois}`} icone={<UserPlus size={18} />} />
      </div>

      <div className="mt-6">
        <CarteSection>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Rechercher par nom, email, entreprise…"
                className="input pl-10"
                aria-label="Rechercher un utilisateur"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTRES.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltre(f)}
                  className={`rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    filtre === f
                      ? "bg-brand-600 text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <Tableau entetes={["Utilisateur", "Entreprise", "Plan", "Statut", "Inscription", "Action"]}>
            {filtres.map((u) => (
              <tr key={u.id}>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 text-xs font-bold text-white">
                      {initiales(u.nom)}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{u.nom}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{u.entreprise}</td>
                <td className="py-3 pr-4">
                  <span className="badge-blue">{u.plan}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className={badgeStatut(u.statut)}>{u.statut}</span>
                </td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{u.inscrit}</td>
                <td className="py-3">
                  <button
                    type="button"
                    onClick={() => basculerStatut(u.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      u.statut === "Suspendu"
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                        : "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                    }`}
                  >
                    {u.statut === "Suspendu" ? "Réactiver" : "Suspendre"}
                  </button>
                </td>
              </tr>
            ))}
          </Tableau>

          {filtres.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
              Aucun utilisateur ne correspond à votre recherche.
            </p>
          )}
        </CarteSection>
      </div>
    </div>
  );
}
