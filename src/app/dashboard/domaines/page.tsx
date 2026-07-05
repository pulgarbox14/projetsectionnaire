"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Globe,
  Search,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { CarteSection, PageHeader, Tableau, badgeStatut } from "@/components/ui";
import { domainesPossedes } from "@/lib/data";
import type { ResultatDomaine } from "@/lib/analyse";

export default function DomainesPage() {
  const [nom, setNom] = useState("");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [resultats, setResultats] = useState<ResultatDomaine[]>([]);
  const [ajoutes, setAjoutes] = useState<string[]>([]);
  const [paiementReussi, setPaiementReussi] = useState(false);

  const rechercher = async () => {
    if (!nom.trim()) return;
    setChargement(true);
    setErreur("");
    setResultats([]);
    setAjoutes([]);
    setPaiementReussi(false);
    try {
      const res = await fetch("/api/domaines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.erreur ?? "Recherche impossible.");
      setResultats(data.resultats);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setChargement(false);
    }
  };

  const ajouter = (domaine: string) => {
    setAjoutes((prev) => (prev.includes(domaine) ? prev : [...prev, domaine]));
    setPaiementReussi(false);
  };

  const total = resultats
    .filter((r) => ajoutes.includes(r.domaine))
    .reduce((somme, r) => somme + r.prix, 0);

  return (
    <div>
      <PageHeader
        titre="Noms de domaine"
        description="Recherchez, achetez et gérez vos noms de domaine en quelques clics."
      />

      <CarteSection titre="Rechercher un domaine">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            rechercher();
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Votre nom de domaine, par exemple : entreprise"
            className="input flex-1"
            aria-label="Nom de domaine à rechercher"
          />
          <button type="submit" disabled={chargement} className="btn-primary shrink-0">
            <Search size={17} />
            {chargement ? "Recherche…" : "Rechercher"}
          </button>
        </form>
        {erreur && (
          <p className="mt-3 flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
            <AlertCircle size={15} /> {erreur}
          </p>
        )}
      </CarteSection>

      {chargement && (
        <div className="card mt-6 flex flex-col items-center gap-4 p-12 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-[3px] border-brand-600 border-t-transparent" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Vérification de la disponibilité de{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{nom}</span> sur
            toutes les extensions…
          </p>
        </div>
      )}

      {ajoutes.length > 0 && (
        <div className="card mt-6 border-brand-200 bg-brand-50/50 p-5 dark:border-brand-800 dark:bg-brand-900/20">
          {paiementReussi ? (
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 size={18} />
              Paiement effectué avec succès ! Vos {ajoutes.length > 1 ? "domaines seront configurés" : "domaine sera configuré"} dans
              quelques minutes.
            </p>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {ajoutes.length} domaine{ajoutes.length > 1 ? "s" : ""} dans votre panier
                </p>
                <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                  Total première année :{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    {total.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPaiementReussi(true)}
                className="btn-primary"
              >
                <ShoppingCart size={17} />
                Procéder au paiement
              </button>
            </div>
          )}
        </div>
      )}

      {resultats.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resultats.map((r) => {
            const dejaAjoute = ajoutes.includes(r.domaine);
            return (
              <div key={r.domaine} className="card card-hover flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                      <Globe size={17} />
                    </span>
                    <p className="font-semibold text-gray-900 dark:text-white">{r.domaine}</p>
                  </div>
                  <span className={r.disponible ? "badge-green" : "badge-red"}>
                    {r.disponible ? "Disponible" : "Déjà pris"}
                  </span>
                </div>
                <div className="mt-4 flex items-baseline gap-2">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {r.prix.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">la première année</p>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  Renouvellement :{" "}
                  {r.prixRenouvellement.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €/an
                </p>
                <div className="mt-4">
                  {r.disponible ? (
                    dejaAjoute ? (
                      <button type="button" disabled className="btn-secondary w-full cursor-default text-emerald-600 dark:text-emerald-400">
                        <Check size={16} />
                        Ajouté ✓
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => ajouter(r.domaine)}
                        className="btn-primary w-full"
                      >
                        <ShoppingCart size={16} />
                        Acheter
                      </button>
                    )
                  ) : (
                    <button type="button" disabled className="btn-secondary w-full opacity-50">
                      Indisponible
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        <CarteSection titre="Mes domaines">
          <Tableau entetes={["Domaine", "Statut", "Expiration", "Auto-renouvellement", "Actions"]}>
            {domainesPossedes.map((d) => (
              <tr key={d.nom}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{d.nom}</td>
                <td className="py-3 pr-4">
                  <span className={badgeStatut(d.statut)}>{d.statut}</span>
                </td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{d.expiration}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                  {d.autoRenouvellement ? "Oui" : "Non"}
                </td>
                <td className="py-3">
                  <button type="button" className="btn-ghost px-3 py-1.5 text-xs">
                    <Settings size={14} />
                    Gérer
                  </button>
                </td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>
      </div>
    </div>
  );
}
