"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  CreditCard,
  Megaphone,
  MousePointerClick,
  ShoppingCart,
  Sparkles,
  Upload,
  Users,
  Video,
} from "lucide-react";
import { CarteSection, PageHeader, Tableau, badgeStatut } from "@/components/ui";
import { campagnes, methodesPaiement } from "@/lib/data";

const OBJECTIFS: { nom: string; description: string; icone: React.ReactNode }[] = [
  { nom: "Trafic", description: "Attirez des visiteurs sur votre site.", icone: <MousePointerClick size={18} /> },
  { nom: "Ventes", description: "Boostez vos conversions e-commerce.", icone: <ShoppingCart size={18} /> },
  { nom: "Notoriété", description: "Faites connaître votre marque.", icone: <Megaphone size={18} /> },
  { nom: "Génération de leads", description: "Collectez des contacts qualifiés.", icone: <Users size={18} /> },
];

const PAYS = ["Bénin", "France", "Sénégal", "Côte d'Ivoire", "Multi-pays (Afrique de l'Ouest)"];
const DUREES = [7, 14, 30, 60];

export default function TikTokAdsPage() {
  const campagnesTikTok = campagnes.filter((c) => c.plateforme === "TikTok");

  const [objectif, setObjectif] = useState("Notoriété");
  const [budget, setBudget] = useState("400");
  const [pays, setPays] = useState(PAYS[0]);
  const [audience, setAudience] = useState("");
  const [texteAnnonce, setTexteAnnonce] = useState("");
  const [videoChoisie, setVideoChoisie] = useState(false);
  const [duree, setDuree] = useState(30);
  const [paiement, setPaiement] = useState(methodesPaiement[0]);
  const [numeroCommande, setNumeroCommande] = useState<string | null>(null);

  const budgetNum = Number(budget) || 0;

  const reinitialiser = () => {
    setNumeroCommande(null);
    setVideoChoisie(false);
    setAudience("");
    setTexteAnnonce("");
  };

  return (
    <div>
      <PageHeader
        titre="Publicités TikTok"
        description="Créez des campagnes vidéo percutantes gérées par nos experts."
      />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-700 p-6 text-white">
        <div className="flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10">
            <Sparkles size={20} />
          </span>
          <div>
            <p className="font-semibold">Touchez plus d&apos;un milliard d&apos;utilisateurs actifs</p>
            <p className="mt-0.5 text-sm text-gray-300">
              TikTok est la plateforme à la croissance la plus rapide au monde. Lancez votre première
              campagne vidéo dès aujourd&apos;hui.
            </p>
          </div>
        </div>
      </div>

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
              setNumeroCommande(`TT-2026-${Math.floor(10000 + Math.random() * 90000)}`);
            }}
          >
            <p className="label">Objectif de la campagne</p>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {OBJECTIFS.map((o) => {
                const actif = o.nom === objectif;
                return (
                  <button
                    key={o.nom}
                    type="button"
                    onClick={() => setObjectif(o.nom)}
                    aria-pressed={actif}
                    className={`rounded-2xl border-2 p-4 text-left transition-all ${
                      actif
                        ? "border-brand-600 bg-brand-50/50 shadow-card-hover dark:border-brand-500 dark:bg-brand-900/20"
                        : "border-gray-200 bg-white hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-xl ${
                          actif
                            ? "bg-brand-600 text-white"
                            : "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300"
                        }`}
                      >
                        {o.icone}
                      </span>
                      {actif ? (
                        <CheckCircle2 size={18} className="text-brand-600 dark:text-brand-400" />
                      ) : (
                        <Circle size={18} className="text-gray-300 dark:text-gray-700" />
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-gray-900 dark:text-white">{o.nom}</p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{o.description}</p>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <div>
                <label htmlFor="tt-budget" className="label">
                  Budget total (€)
                </label>
                <input
                  id="tt-budget"
                  type="number"
                  min={50}
                  step={10}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="input"
                  placeholder="400"
                />
              </div>

              <div>
                <label htmlFor="tt-pays" className="label">
                  Pays cible
                </label>
                <select
                  id="tt-pays"
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
                <label htmlFor="tt-audience" className="label">
                  Audience cible
                </label>
                <textarea
                  id="tt-audience"
                  rows={4}
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="input resize-none"
                  placeholder="Âge, centres d'intérêt, types de contenus suivis… Ex. : 18-30 ans, mode et lifestyle."
                />
              </div>

              <div>
                <label htmlFor="tt-texte" className="label">
                  Texte de l&apos;annonce
                </label>
                <textarea
                  id="tt-texte"
                  rows={4}
                  value={texteAnnonce}
                  onChange={(e) => setTexteAnnonce(e.target.value)}
                  className="input resize-none"
                  placeholder="Accroche courte et percutante adaptée à TikTok…"
                />
              </div>

              <div className="lg:col-span-2">
                <span className="label">
                  Vidéo <span className="badge-red ml-1">Obligatoire</span>
                </span>
                <button
                  type="button"
                  onClick={() => setVideoChoisie(true)}
                  className={`flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed p-10 text-sm transition-colors ${
                    videoChoisie
                      ? "border-emerald-400 bg-emerald-50/50 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                      : "border-brand-300 bg-brand-50/40 text-brand-600 hover:border-brand-500 dark:border-brand-800 dark:bg-brand-900/10 dark:text-brand-300 dark:hover:border-brand-600"
                  }`}
                >
                  {videoChoisie ? <Video size={26} /> : <Upload size={26} />}
                  <span className="font-medium">
                    {videoChoisie ? "3 fichiers sélectionnés" : "Glissez vos fichiers ici"}
                  </span>
                  <span className="text-xs opacity-80">
                    Format vertical 9:16 recommandé · MP4 ou MOV · 60 s max
                  </span>
                </button>
              </div>

              <div>
                <label htmlFor="tt-duree" className="label">
                  Durée de la campagne
                </label>
                <select
                  id="tt-duree"
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
            </div>

            <div className="mt-6 rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50">
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
                  <label htmlFor="tt-paiement" className="label">
                    Moyen de paiement
                  </label>
                  <select
                    id="tt-paiement"
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

      <div className="mt-6">
        <CarteSection titre="Vos campagnes TikTok">
          <Tableau
            entetes={["Nom", "Objectif", "Budget", "Dépensé", "Impressions", "Clics", "Statut"]}
          >
            {campagnesTikTok.map((c) => (
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
