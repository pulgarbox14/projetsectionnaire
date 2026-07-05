"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Eye,
  Image as ImageIcon,
  Megaphone,
  Upload,
  Video,
  Wallet,
} from "lucide-react";
import { CarteSection, PageHeader, StatCard, Tableau, badgeStatut } from "@/components/ui";
import { campagnes, methodesPaiement } from "@/lib/data";

const OBJECTIFS = ["Trafic", "Ventes", "Notoriété", "Génération de leads"];
const PAYS = ["Bénin", "France", "Sénégal", "Côte d'Ivoire", "Multi-pays (Afrique de l'Ouest)"];
const DUREES = [7, 14, 30, 60];

const versNombre = (s: string) => parseInt(s.replace(/\D/g, ""), 10) || 0;

export default function FacebookAdsPage() {
  const campagnesFacebook = campagnes.filter((c) => c.plateforme === "Facebook");
  const actives = campagnesFacebook.filter((c) => c.statut === "Active").length;
  const budgetTotal = campagnesFacebook.reduce((a, c) => a + c.budget, 0);
  const impressionsTotales = campagnesFacebook.reduce((a, c) => a + versNombre(c.impressions), 0);

  const [objectif, setObjectif] = useState(OBJECTIFS[0]);
  const [budget, setBudget] = useState("300");
  const [pays, setPays] = useState(PAYS[0]);
  const [audience, setAudience] = useState("");
  const [texteAnnonce, setTexteAnnonce] = useState("");
  const [imagesChoisies, setImagesChoisies] = useState(false);
  const [videoChoisie, setVideoChoisie] = useState(false);
  const [duree, setDuree] = useState(30);
  const [paiement, setPaiement] = useState(methodesPaiement[0]);
  const [numeroCommande, setNumeroCommande] = useState<string | null>(null);

  const budgetNum = Number(budget) || 0;

  const commander = () => {
    setNumeroCommande(`FB-2026-${Math.floor(10000 + Math.random() * 90000)}`);
  };

  const reinitialiser = () => {
    setNumeroCommande(null);
    setImagesChoisies(false);
    setVideoChoisie(false);
    setAudience("");
    setTexteAnnonce("");
  };

  return (
    <div>
      <PageHeader
        titre="Publicités Facebook"
        description="Commandez une campagne clé en main et suivez vos performances."
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard
          label="Campagnes actives"
          valeur={`${actives}`}
          variation={`${campagnesFacebook.length} campagnes au total`}
          icone={<Megaphone size={18} />}
        />
        <StatCard
          label="Budget total"
          valeur={`${budgetTotal.toLocaleString("fr-FR")} €`}
          variation="Toutes campagnes Facebook"
          icone={<Wallet size={18} />}
        />
        <StatCard
          label="Impressions cumulées"
          valeur={impressionsTotales.toLocaleString("fr-FR")}
          variation="30 derniers jours"
          icone={<Eye size={18} />}
        />
      </div>

      <div className="mt-6">
        <CarteSection titre="Commander une campagne">
          {numeroCommande ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center animate-fade-up">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                <CheckCircle2 size={28} />
              </span>
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">Commande reçue !</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Votre campagne sera lancée sous 24 h.
                </p>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Numéro de commande :{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">{numeroCommande}</span>
                  {" "}· {objectif} · {budgetNum.toLocaleString("fr-FR")} € · {duree} jours · paiement par {paiement}
                </p>
              </div>
              <button type="button" onClick={reinitialiser} className="btn-secondary">
                Commander une autre campagne
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                commander();
              }}
              className="grid gap-5 lg:grid-cols-2"
            >
              <div>
                <label htmlFor="fb-objectif" className="label">
                  Objectif de la campagne
                </label>
                <select
                  id="fb-objectif"
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  className="input"
                >
                  {OBJECTIFS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fb-budget" className="label">
                  Budget total (€)
                </label>
                <input
                  id="fb-budget"
                  type="number"
                  min={50}
                  step={10}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="input"
                  placeholder="300"
                />
              </div>

              <div>
                <label htmlFor="fb-pays" className="label">
                  Pays cible
                </label>
                <select
                  id="fb-pays"
                  value={pays}
                  onChange={(e) => setPays(e.target.value)}
                  className="input"
                >
                  {PAYS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fb-duree" className="label">
                  Durée de la campagne
                </label>
                <select
                  id="fb-duree"
                  value={duree}
                  onChange={(e) => setDuree(Number(e.target.value))}
                  className="input"
                >
                  {DUREES.map((d) => (
                    <option key={d} value={d}>
                      {d} jours
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fb-audience" className="label">
                  Audience cible
                </label>
                <textarea
                  id="fb-audience"
                  rows={4}
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="input resize-none"
                  placeholder="Âge, sexe, centres d'intérêt, comportements… Ex. : femmes 25-45 ans intéressées par la mode."
                />
              </div>

              <div>
                <label htmlFor="fb-texte" className="label">
                  Texte de l&apos;annonce
                </label>
                <textarea
                  id="fb-texte"
                  rows={4}
                  value={texteAnnonce}
                  onChange={(e) => setTexteAnnonce(e.target.value)}
                  className="input resize-none"
                  placeholder="Rédigez le message principal de votre publicité…"
                />
              </div>

              <div>
                <span className="label">Images</span>
                <button
                  type="button"
                  onClick={() => setImagesChoisies(true)}
                  className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-sm transition-colors ${
                    imagesChoisies
                      ? "border-emerald-400 bg-emerald-50/50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "border-gray-300 text-gray-500 hover:border-brand-400 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-600"
                  }`}
                >
                  {imagesChoisies ? <ImageIcon size={22} /> : <Upload size={22} />}
                  {imagesChoisies ? "3 fichiers sélectionnés" : "Glissez vos fichiers ici"}
                </button>
              </div>

              <div>
                <span className="label">Vidéo</span>
                <button
                  type="button"
                  onClick={() => setVideoChoisie(true)}
                  className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-sm transition-colors ${
                    videoChoisie
                      ? "border-emerald-400 bg-emerald-50/50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "border-gray-300 text-gray-500 hover:border-brand-400 hover:text-brand-600 dark:border-gray-700 dark:text-gray-400 dark:hover:border-brand-600"
                  }`}
                >
                  {videoChoisie ? <Video size={22} /> : <Upload size={22} />}
                  {videoChoisie ? "3 fichiers sélectionnés" : "Glissez vos fichiers ici"}
                </button>
              </div>

              <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50 lg:col-span-2">
                <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Récapitulatif de la commande
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Objectif</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">{objectif}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Budget</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                      {budgetNum.toLocaleString("fr-FR")} €
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Durée</p>
                    <p className="mt-0.5 text-sm font-semibold text-gray-900 dark:text-white">
                      {duree} jours ({(budgetNum / duree).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} € / jour)
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="flex-1">
                    <label htmlFor="fb-paiement" className="label">
                      Moyen de paiement
                    </label>
                    <select
                      id="fb-paiement"
                      value={paiement}
                      onChange={(e) => setPaiement(e.target.value)}
                      className="input"
                    >
                      {methodesPaiement.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn-primary shrink-0">
                    <CreditCard size={17} />
                    Procéder au paiement — {budgetNum.toLocaleString("fr-FR")} €
                  </button>
                </div>
              </div>
            </form>
          )}
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection titre="Vos campagnes Facebook">
          <Tableau
            entetes={["Nom", "Objectif", "Budget", "Dépensé", "Impressions", "Clics", "Statut"]}
          >
            {campagnesFacebook.map((c) => (
              <tr key={c.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{c.nom}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{c.objectif}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {c.budget.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                  {c.depense.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{c.impressions}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{c.clics}</td>
                <td className="py-3">
                  <span className={badgeStatut(c.statut)}>{c.statut}</span>
                </td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>
      </div>
    </div>
  );
}
