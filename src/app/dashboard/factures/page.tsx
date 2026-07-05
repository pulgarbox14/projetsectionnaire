"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Download } from "lucide-react";
import { CarteSection, PageHeader, StatCard, Tableau, badgeStatut } from "@/components/ui";
import { factures, utilisateurDemo, type Facture } from "@/lib/data";

type Onglet = "Factures" | "Devis" | "Reçus";

const devis: Facture[] = [
  { id: "DEV-2026-0021", date: "2026-07-01", description: "Devis — Refonte complète du site vitrine", montant: 2400, statut: "En attente" },
  { id: "DEV-2026-0019", date: "2026-06-24", description: "Devis — Pack SEO International (6 mois)", montant: 3600, statut: "En attente" },
];

const recus: Facture[] = [
  { id: "REC-2026-0087", date: "2026-07-02", description: "Reçu — Campagne Facebook Ads « Collection été »", montant: 350, statut: "Payée" },
  { id: "REC-2026-0084", date: "2026-06-28", description: "Reçu — Hébergement Business (mensuel)", montant: 24.99, statut: "Payée" },
  { id: "REC-2026-0079", date: "2026-06-21", description: "Reçu — Audit SEO national de juin", montant: 490, statut: "Payée" },
];

const DONNEES: Record<Onglet, Facture[]> = {
  Factures: factures,
  Devis: devis,
  Reçus: recus,
};

// Génère côté client un document HTML de facture stylé et le télécharge.
// NOTE : la génération PDF côté serveur (ex. route API + moteur PDF) est
// branchable ici — il suffirait de remplacer ce Blob par un fetch vers l'API.
function telechargerFacture(f: Facture) {
  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<title>${f.id} — Nexora</title>
<style>
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; color: #111827; margin: 0; padding: 48px; }
  .entete { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #2563eb; padding-bottom: 24px; }
  .logo { font-size: 24px; font-weight: 800; color: #2563eb; }
  h1 { font-size: 18px; margin: 32px 0 8px; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; }
  th { text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; border-bottom: 1px solid #e5e7eb; padding: 8px 12px; }
  td { padding: 12px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
  .total { text-align: right; font-size: 18px; font-weight: 700; margin-top: 24px; }
  .pied { margin-top: 48px; font-size: 12px; color: #6b7280; }
</style>
</head>
<body>
  <div class="entete">
    <div class="logo">Nexora</div>
    <div style="text-align:right; font-size:13px; color:#6b7280;">
      Référence : <strong>${f.id}</strong><br />
      Date : ${f.date}<br />
      Statut : ${f.statut}
    </div>
  </div>
  <h1>Facturé à</h1>
  <p style="font-size:14px;">${utilisateurDemo.nom} — ${utilisateurDemo.entreprise}<br />${utilisateurDemo.email}</p>
  <table>
    <thead><tr><th>Description</th><th style="text-align:right;">Montant</th></tr></thead>
    <tbody>
      <tr><td>${f.description}</td><td style="text-align:right;">${f.montant.toLocaleString("fr-FR")} €</td></tr>
    </tbody>
  </table>
  <p class="total">Total TTC : ${f.montant.toLocaleString("fr-FR")} €</p>
  <p class="pied">Nexora — Merci de votre confiance. Ce document a été généré automatiquement.</p>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const lien = document.createElement("a");
  lien.href = url;
  lien.download = `${f.id.toLowerCase()}-nexora.html`;
  document.body.appendChild(lien);
  lien.click();
  document.body.removeChild(lien);
  URL.revokeObjectURL(url);
}

export default function FacturesPage() {
  const [onglet, setOnglet] = useState<Onglet>("Factures");
  const lignes = DONNEES[onglet];

  const montantPaye = factures
    .filter((f) => f.statut === "Payée")
    .reduce((somme, f) => somme + f.montant, 0);
  const montantAttente = factures
    .filter((f) => f.statut === "En attente")
    .reduce((somme, f) => somme + f.montant, 0);
  const montantEchu = factures
    .filter((f) => f.statut === "Échue")
    .reduce((somme, f) => somme + f.montant, 0);

  return (
    <div>
      <PageHeader
        titre="Facturation"
        description="Retrouvez toutes vos factures, devis et reçus, et téléchargez-les à tout moment."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Montant payé"
          valeur={`${montantPaye.toLocaleString("fr-FR")} €`}
          variation={`${factures.filter((f) => f.statut === "Payée").length} factures réglées`}
          icone={<CheckCircle2 size={18} />}
        />
        <StatCard
          label="En attente"
          valeur={`${montantAttente.toLocaleString("fr-FR")} €`}
          variation={`${factures.filter((f) => f.statut === "En attente").length} facture à régler`}
          icone={<Clock size={18} />}
        />
        <StatCard
          label="Échu"
          valeur={`${montantEchu.toLocaleString("fr-FR")} €`}
          variation={`${factures.filter((f) => f.statut === "Échue").length} facture en retard`}
          icone={<AlertTriangle size={18} />}
        />
      </div>

      <div className="mt-6">
        <CarteSection
          titre="Vos documents"
          action={
            <div
              role="tablist"
              aria-label="Type de document"
              className="flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800"
            >
              {(Object.keys(DONNEES) as Onglet[]).map((o) => (
                <button
                  key={o}
                  type="button"
                  role="tab"
                  aria-selected={onglet === o}
                  onClick={() => setOnglet(o)}
                  className={`rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                    onglet === o
                      ? "bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          }
        >
          <Tableau entetes={["Référence", "Date", "Description", "Montant", "Statut", "Document"]}>
            {lignes.map((f) => (
              <tr key={f.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{f.id}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{f.date}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{f.description}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {f.montant.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3 pr-4">
                  <span className={badgeStatut(f.statut)}>{f.statut}</span>
                </td>
                <td className="py-3">
                  <button
                    type="button"
                    onClick={() => telechargerFacture(f)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900/20"
                  >
                    <Download size={14} /> Télécharger PDF
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
