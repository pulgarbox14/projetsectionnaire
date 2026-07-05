"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Globe,
  HardDrive,
  KeyRound,
  Mail,
  Plus,
  Trash2,
} from "lucide-react";
import { BarreProgression } from "@/components/charts";
import { CarteSection, PageHeader, StatCard, badgeStatut } from "@/components/ui";
import { emailsPro, type EmailPro } from "@/lib/data";

const DOMAINE_PRINCIPAL = "@entreprise.com";

function couleurStockage(pourcentage: number) {
  if (pourcentage >= 90) return "bg-red-500";
  if (pourcentage >= 70) return "bg-amber-500";
  return "bg-brand-600";
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailPro[]>(emailsPro);
  const [prefixe, setPrefixe] = useState("");
  const [nomAffichage, setNomAffichage] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const stockageUtilise = emails.reduce((somme, e) => somme + e.stockageUtilise, 0);

  const creerAdresse = () => {
    setConfirmation("");
    const propre = prefixe.trim().toLowerCase().replace(/[^a-z0-9.\-_]/g, "");
    if (!propre) {
      setErreur("Veuillez saisir un préfixe valide (lettres, chiffres, points ou tirets).");
      return;
    }
    if (!nomAffichage.trim()) {
      setErreur("Veuillez saisir un nom d'affichage.");
      return;
    }
    if (motDePasse.length < 8) {
      setErreur("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    const adresse = `${propre}${DOMAINE_PRINCIPAL}`;
    if (emails.some((e) => e.adresse === adresse)) {
      setErreur(`L'adresse ${adresse} existe déjà.`);
      return;
    }
    setEmails((prev) => [
      ...prev,
      { adresse, nom: nomAffichage.trim(), stockageUtilise: 0, stockageTotal: 10, statut: "Actif" },
    ]);
    setErreur("");
    setConfirmation(`L'adresse ${adresse} a été créée avec succès.`);
    setPrefixe("");
    setNomAffichage("");
    setMotDePasse("");
  };

  const reinitialiserMotDePasse = (adresse: string) => {
    setErreur("");
    setConfirmation(
      `Un lien de réinitialisation du mot de passe a été envoyé pour ${adresse}.`
    );
  };

  const supprimer = (adresse: string) => {
    if (window.confirm(`Supprimer définitivement l'adresse ${adresse} ?`)) {
      setEmails((prev) => prev.filter((e) => e.adresse !== adresse));
      setErreur("");
      setConfirmation(`L'adresse ${adresse} a été supprimée.`);
    }
  };

  return (
    <div>
      <PageHeader
        titre="Emails professionnels"
        description="Créez et gérez les adresses email de votre entreprise."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Adresses actives"
          valeur={`${emails.length}`}
          icone={<Mail size={18} />}
        />
        <StatCard
          label="Stockage utilisé"
          valeur={`${stockageUtilise.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Go`}
          variation={`sur ${emails
            .reduce((somme, e) => somme + e.stockageTotal, 0)
            .toLocaleString("fr-FR")} Go au total`}
          icone={<HardDrive size={18} />}
        />
        <StatCard
          label="Domaine principal"
          valeur="entreprise.com"
          icone={<Globe size={18} />}
        />
      </div>

      <div className="mt-6">
        <CarteSection titre="Créer une adresse">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              creerAdresse();
            }}
            className="grid gap-4 lg:grid-cols-3"
          >
            <div>
              <label htmlFor="prefixe" className="label">
                Adresse email
              </label>
              <div className="flex">
                <input
                  id="prefixe"
                  type="text"
                  value={prefixe}
                  onChange={(e) => setPrefixe(e.target.value)}
                  placeholder="prenom.nom"
                  className="input rounded-r-none"
                />
                <span className="inline-flex items-center rounded-r-xl border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  {DOMAINE_PRINCIPAL}
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="nomAffichage" className="label">
                Nom d&apos;affichage
              </label>
              <input
                id="nomAffichage"
                type="text"
                value={nomAffichage}
                onChange={(e) => setNomAffichage(e.target.value)}
                placeholder="Service client"
                className="input"
              />
            </div>
            <div>
              <label htmlFor="motDePasse" className="label">
                Mot de passe
              </label>
              <input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="8 caractères minimum"
                className="input"
              />
            </div>
            <div className="lg:col-span-3">
              <button type="submit" className="btn-primary">
                <Plus size={17} />
                Créer l&apos;adresse
              </button>
            </div>
          </form>
          {erreur && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{erreur}</p>
          )}
          {confirmation && (
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 size={16} /> {confirmation}
            </p>
          )}
        </CarteSection>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {emails.map((e) => {
          const pourcentage = (e.stockageUtilise / e.stockageTotal) * 100;
          return (
            <div key={e.adresse} className="card card-hover p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                    <Mail size={17} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{e.adresse}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{e.nom}</p>
                  </div>
                </div>
                <span className={badgeStatut(e.statut)}>{e.statut}</span>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Stockage</span>
                  <span>
                    {e.stockageUtilise.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Go /{" "}
                    {e.stockageTotal.toLocaleString("fr-FR")} Go
                  </span>
                </div>
                <BarreProgression valeur={pourcentage} couleur={couleurStockage(pourcentage)} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => reinitialiserMotDePasse(e.adresse)}
                  className="btn-secondary px-3 py-1.5 text-xs"
                >
                  <KeyRound size={14} />
                  Réinitialiser le mot de passe
                </button>
                <button
                  type="button"
                  onClick={() => supprimer(e.adresse)}
                  className="btn-ghost px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                >
                  <Trash2 size={14} />
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
