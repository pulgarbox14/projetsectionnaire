"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Accessibility,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Gauge,
  Info,
  Lock,
  Search,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { BarreProgression, ScoreGauge } from "@/components/charts";
import { CarteSection, PageHeader } from "@/components/ui";
import type { ResultatAnalyse } from "@/lib/analyse";

const CATEGORIES: { cle: keyof ResultatAnalyse["scores"]; label: string; icone: React.ReactNode }[] = [
  { cle: "performance", label: "Performance", icone: <Gauge size={17} /> },
  { cle: "vitesse", label: "Vitesse", icone: <Zap size={17} /> },
  { cle: "seo", label: "SEO", icone: <Search size={17} /> },
  { cle: "securite", label: "Sécurité", icone: <Lock size={17} /> },
  { cle: "mobile", label: "Responsive mobile", icone: <Smartphone size={17} /> },
  { cle: "accessibilite", label: "Accessibilité", icone: <Accessibility size={17} /> },
];

const ICONES_NIVEAU = {
  critique: <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />,
  important: <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" />,
  mineur: <Info size={16} className="mt-0.5 shrink-0 text-brand-500" />,
};

function couleurBarre(score: number) {
  if (score >= 80) return "bg-emerald-500";
  if (score >= 60) return "bg-amber-500";
  return "bg-red-500";
}

function AnalyseContenu() {
  const params = useSearchParams();
  const [url, setUrl] = useState(params.get("url") ?? "");
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [resultat, setResultat] = useState<ResultatAnalyse | null>(null);

  const lancer = useCallback(async (cible: string) => {
    if (!cible.trim()) return;
    setChargement(true);
    setErreur("");
    setResultat(null);
    try {
      const res = await fetch("/api/analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: cible }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.erreur ?? "Analyse impossible.");
      setResultat(data);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Une erreur est survenue.");
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    const initial = params.get("url");
    if (initial) lancer(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <PageHeader
        titre="Analyse de site web"
        description="Obtenez un diagnostic complet : performance, vitesse, SEO, sécurité, mobile et accessibilité."
      />

      <CarteSection>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            lancer(url);
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://monsite.com"
            className="input flex-1"
            aria-label="URL à analyser"
          />
          <button type="submit" disabled={chargement} className="btn-primary shrink-0">
            <Sparkles size={17} />
            {chargement ? "Analyse en cours…" : "Analyser"}
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
            Analyse de <span className="font-semibold text-gray-900 dark:text-white">{url}</span> en cours…
            <br />
            Performance, SEO, sécurité, mobile et accessibilité.
          </p>
        </div>
      )}

      {resultat && (
        <div className="animate-fade-up">
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <CarteSection titre="Score global" className="flex flex-col items-center">
              <ScoreGauge score={resultat.scoreGlobal} taille={160} />
              <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
                {resultat.url}
                <br />
                <span className={resultat.scoreGlobal >= 80 ? "text-emerald-600 dark:text-emerald-400" : resultat.scoreGlobal >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}>
                  {resultat.scoreGlobal >= 80
                    ? "Excellent — votre site est bien optimisé."
                    : resultat.scoreGlobal >= 60
                      ? "Correct — des améliorations sont possibles."
                      : "Attention — des corrections sont nécessaires."}
                </span>
              </p>
            </CarteSection>

            <CarteSection titre="Scores par catégorie" className="lg:col-span-2">
              <ul className="space-y-4">
                {CATEGORIES.map((c) => {
                  const score = resultat.scores[c.cle];
                  return (
                    <li key={c.cle}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium text-gray-700 dark:text-gray-300">
                          <span className="text-brand-600 dark:text-brand-400">{c.icone}</span>
                          {c.label}
                        </span>
                        <span className="font-bold text-gray-900 dark:text-white">{score}/100</span>
                      </div>
                      <BarreProgression valeur={score} couleur={couleurBarre(score)} />
                    </li>
                  );
                })}
              </ul>
            </CarteSection>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Temps de chargement", valeur: resultat.metriques.tempsChargement },
              { label: "Poids de la page", valeur: resultat.metriques.poidsPage },
              { label: "Requêtes HTTP", valeur: `${resultat.metriques.requetes}` },
              { label: "TTFB (réponse serveur)", valeur: resultat.metriques.ttfb },
            ].map((m) => (
              <div key={m.label} className="card p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">{m.label}</p>
                <p className="mt-1 text-xl font-bold text-gray-900 dark:text-white">{m.valeur}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <CarteSection titre={`Erreurs détectées (${resultat.erreurs.length})`}>
              <ul className="space-y-3">
                {resultat.erreurs.map((err, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                    {ICONES_NIVEAU[err.niveau]}
                    <div>
                      <span
                        className={
                          err.niveau === "critique"
                            ? "badge-red mb-1"
                            : err.niveau === "important"
                              ? "badge-amber mb-1"
                              : "badge-blue mb-1"
                        }
                      >
                        {err.niveau}
                      </span>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{err.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CarteSection>

            <CarteSection titre="Recommandations">
              <ul className="space-y-3">
                {resultat.recommandations.map((r, i) => (
                  <li key={i} className="flex gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{r}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 p-5 text-white">
                <p className="font-semibold">Besoin d'aide pour corriger ces points ?</p>
                <p className="mt-1 text-sm text-brand-100">
                  Nos experts SEO et performance peuvent s'en charger pour vous.
                </p>
                <a href="/dashboard/seo" className="btn mt-4 bg-white text-brand-700 hover:bg-brand-50">
                  Commander un audit SEO
                </a>
              </div>
            </CarteSection>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AnalysePage() {
  return (
    <Suspense>
      <AnalyseContenu />
    </Suspense>
  );
}
