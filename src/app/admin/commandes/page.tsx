"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { CarteSection, PageHeader, Tableau, badgeStatut } from "@/components/ui";
import { commandesAdmin, type CommandeAdmin } from "@/lib/data";
import { fcfa } from "@/lib/devise";

const ONGLETS = ["Toutes", "En cours", "Livrée", "En attente", "Annulée"] as const;
type Onglet = (typeof ONGLETS)[number];

export default function CommandesPage() {
  const [onglet, setOnglet] = useState<Onglet>("Toutes");
  const [commandes, setCommandes] = useState<CommandeAdmin[]>(commandesAdmin);

  const marquerLivree = (id: string) => {
    setCommandes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, statut: "Livrée" } : c))
    );
  };

  const compteur = (o: Onglet) =>
    o === "Toutes" ? commandes.length : commandes.filter((c) => c.statut === o).length;

  const filtrees = useMemo(
    () => (onglet === "Toutes" ? commandes : commandes.filter((c) => c.statut === onglet)),
    [commandes, onglet]
  );

  return (
    <div>
      <PageHeader
        titre="Commandes"
        description="Suivez et gérez l'ensemble des commandes de la plateforme."
      />

      <CarteSection>
        <div className="mb-5 flex flex-wrap gap-2 border-b border-gray-200 pb-4 dark:border-gray-800">
          {ONGLETS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOnglet(o)}
              className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors ${
                onglet === o
                  ? "bg-brand-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              {o}
              <span
                className={`rounded-full px-1.5 text-xs font-semibold ${
                  onglet === o
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {compteur(o)}
              </span>
            </button>
          ))}
        </div>

        <Tableau entetes={["Référence", "Client", "Service", "Date", "Montant", "Statut", "Action"]}>
          {filtrees.map((c) => (
            <tr key={c.id}>
              <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{c.id}</td>
              <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{c.client}</td>
              <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{c.service}</td>
              <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{c.date}</td>
              <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                {fcfa(c.montant)}
              </td>
              <td className="py-3 pr-4">
                <span className={badgeStatut(c.statut)}>{c.statut}</span>
              </td>
              <td className="py-3">
                {(c.statut === "En cours" || c.statut === "En attente") && (
                  <button
                    type="button"
                    onClick={() => marquerLivree(c.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                  >
                    <CheckCircle2 size={13} />
                    Marquer livrée
                  </button>
                )}
              </td>
            </tr>
          ))}
        </Tableau>

        {filtrees.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Aucune commande dans cette catégorie.
          </p>
        )}
      </CarteSection>
    </div>
  );
}
