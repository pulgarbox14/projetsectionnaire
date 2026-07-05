"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  FileDown,
  FileSpreadsheet,
  FileText,
  Plus,
  Receipt,
  Trash2,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { BarChart, DonutChart } from "@/components/charts";
import { CarteSection, PageHeader, StatCard, Tableau } from "@/components/ui";
import {
  depensesInitiales,
  depensesMensuelles,
  repartitionDepenses,
  type Depense,
} from "@/lib/data";

const CATEGORIES = ["Publicité", "Hébergement", "Domaines", "SEO", "Autres"] as const;

// Téléchargement générique côté client via Blob + URL.createObjectURL.
function telechargerFichier(contenu: string, nomFichier: string, type: string) {
  const blob = new Blob([contenu], { type });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = nomFichier;
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
  URL.revokeObjectURL(url);
}

function champCsv(valeur: string): string {
  return `"${valeur.replace(/"/g, '""')}"`;
}

export default function DepensesPage() {
  const [depenses, setDepenses] = useState<Depense[]>(depensesInitiales);
  const [categorie, setCategorie] = useState<string>(CATEGORIES[0]);
  const [montant, setMontant] = useState("");
  const [date, setDate] = useState("");
  const [facture, setFacture] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [messagePdf, setMessagePdf] = useState("");

  const moisCourant = "2026-07";
  const totalMois = useMemo(
    () =>
      depenses
        .filter((d) => d.date.startsWith(moisCourant))
        .reduce((somme, d) => somme + d.montant, 0),
    [depenses]
  );
  const totalAnnuel = depensesMensuelles.reduce((somme, m) => somme + m.montant, 0);
  const moyenneMensuelle = totalAnnuel / depensesMensuelles.length;

  function ajouterDepense(e: React.FormEvent) {
    e.preventDefault();
    const valeur = parseFloat(montant.replace(",", "."));
    if (!date || Number.isNaN(valeur) || valeur <= 0) return;
    const nouvelle: Depense = {
      id: Date.now(),
      date,
      categorie,
      description: commentaire.trim() || "Dépense sans commentaire",
      montant: valeur,
      facture: facture.trim() || "—",
    };
    setDepenses((prec) => [nouvelle, ...prec]);
    setMontant("");
    setDate("");
    setFacture("");
    setCommentaire("");
  }

  function supprimerDepense(id: number) {
    setDepenses((prec) => prec.filter((d) => d.id !== id));
  }

  function contenuExport(separateur: string): string {
    const entetes = ["Date", "Catégorie", "Description", "N° de facture", "Montant (€)"];
    const lignes = depenses.map((d) =>
      [d.date, d.categorie, d.description, d.facture, d.montant.toString().replace(".", ",")]
        .map(champCsv)
        .join(separateur)
    );
    // BOM UTF-8 pour que les accents s'affichent correctement dans Excel.
    return "﻿" + [entetes.map(champCsv).join(separateur), ...lignes].join("\r\n");
  }

  function exporterCsv() {
    telechargerFichier(contenuExport(";"), "depenses-nexora.csv", "text/csv;charset=utf-8");
  }

  function exporterExcel() {
    telechargerFichier(
      contenuExport("\t"),
      "depenses-nexora.xls",
      "application/vnd.ms-excel;charset=utf-8"
    );
  }

  function exporterPdf() {
    setMessagePdf("Génération du PDF…");
    // Simulation simple et robuste : on laisse le navigateur produire le PDF via l'impression.
    setTimeout(() => {
      setMessagePdf("");
      window.print();
    }, 600);
  }

  return (
    <div>
      <PageHeader
        titre="Gestion des dépenses"
        description="Suivez, ajoutez et exportez toutes vos dépenses marketing et techniques."
        action={
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={exporterCsv} className="btn-secondary">
              <FileDown size={16} /> Exporter CSV
            </button>
            <button type="button" onClick={exporterExcel} className="btn-secondary">
              <FileSpreadsheet size={16} /> Exporter Excel
            </button>
            <button type="button" onClick={exporterPdf} className="btn-secondary">
              <FileText size={16} /> Exporter PDF
            </button>
          </div>
        }
      />

      {messagePdf && (
        <p className="mb-4 rounded-xl bg-brand-50 px-4 py-2.5 text-sm font-medium text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
          {messagePdf}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total du mois en cours"
          valeur={`${totalMois.toLocaleString("fr-FR")} €`}
          variation="Juillet 2026"
          icone={<Wallet size={18} />}
        />
        <StatCard
          label="Total annuel"
          valeur={`${totalAnnuel.toLocaleString("fr-FR")} €`}
          variation="Janvier — Juillet"
          icone={<TrendingUp size={18} />}
        />
        <StatCard
          label="Moyenne mensuelle"
          valeur={`${moyenneMensuelle.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`}
          variation={`Sur ${depensesMensuelles.length} mois`}
          icone={<CalendarDays size={18} />}
        />
        <StatCard
          label="Nombre de dépenses"
          valeur={`${depenses.length}`}
          variation="Toutes catégories"
          icone={<Receipt size={18} />}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <CarteSection titre="Dépenses mensuelles">
          <BarChart
            data={depensesMensuelles.map((d) => ({ label: d.mois, valeur: d.montant }))}
            unite="€"
          />
        </CarteSection>
        <CarteSection titre="Répartition par catégorie">
          <DonutChart data={repartitionDepenses} taille={160} />
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection titre="Ajouter une dépense">
          <form onSubmit={ajouterDepense} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div>
              <label htmlFor="dep-categorie" className="label">
                Catégorie
              </label>
              <select
                id="dep-categorie"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="input"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dep-montant" className="label">
                Montant (€)
              </label>
              <input
                id="dep-montant"
                type="number"
                min="0"
                step="0.01"
                required
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                placeholder="120,00"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="dep-date" className="label">
                Date
              </label>
              <input
                id="dep-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="dep-facture" className="label">
                N° de facture
              </label>
              <input
                id="dep-facture"
                type="text"
                value={facture}
                onChange={(e) => setFacture(e.target.value)}
                placeholder="FAC-2026-0000"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="dep-commentaire" className="label">
                Commentaire
              </label>
              <input
                id="dep-commentaire"
                type="text"
                value={commentaire}
                onChange={(e) => setCommentaire(e.target.value)}
                placeholder="Ex. Campagne Facebook — juillet"
                className="input"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-5">
              <button type="submit" className="btn-primary">
                <Plus size={16} /> Ajouter la dépense
              </button>
            </div>
          </form>
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection titre={`Historique des dépenses (${depenses.length})`}>
          <Tableau entetes={["Date", "Catégorie", "Description", "Facture", "Montant", "Action"]}>
            {depenses.map((d) => (
              <tr key={d.id}>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{d.date}</td>
                <td className="py-3 pr-4">
                  <span className="badge-blue">{d.categorie}</span>
                </td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{d.description}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{d.facture}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {d.montant.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3">
                  <button
                    type="button"
                    onClick={() => supprimerDepense(d.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    aria-label={`Supprimer la dépense ${d.description}`}
                  >
                    <Trash2 size={14} /> Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {depenses.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  Aucune dépense enregistrée pour le moment.
                </td>
              </tr>
            )}
          </Tableau>
        </CarteSection>
      </div>
    </div>
  );
}
