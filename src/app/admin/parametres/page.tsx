"use client";

import { useState } from "react";
import { CheckCircle2, Eye, EyeOff, RefreshCw, Save, Trash2 } from "lucide-react";
import { CarteSection, PageHeader } from "@/components/ui";
import { methodesPaiement } from "@/lib/data";

function Interrupteur({
  actif,
  onChange,
  label,
}: {
  actif: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={actif}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
        actif ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          actif ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function ParametresPage() {
  const [nomPlateforme, setNomPlateforme] = useState("Nexora");
  const [url, setUrl] = useState("https://nexora.com");
  const [devise, setDevise] = useState("XOF");
  const [langue, setLangue] = useState("Français");

  const [methodesActives, setMethodesActives] = useState<Record<string, boolean>>(
    Object.fromEntries(methodesPaiement.map((m) => [m, true]))
  );

  const [clesVisibles, setClesVisibles] = useState(false);
  const [messageCles, setMessageCles] = useState("");

  const [maintenance, setMaintenance] = useState(false);
  const [messageCache, setMessageCache] = useState("");

  const [messageGlobal, setMessageGlobal] = useState("");

  const basculerMethode = (m: string) => {
    setMethodesActives((prev) => ({ ...prev, [m]: !prev[m] }));
  };

  const regenererCles = () => {
    setMessageCles("Nouvelles clés générées — pensez à mettre à jour vos intégrations.");
    setTimeout(() => setMessageCles(""), 4000);
  };

  const viderCache = () => {
    setMessageCache("Cache vidé avec succès (1,2 Go libérés).");
    setTimeout(() => setMessageCache(""), 4000);
  };

  const enregistrer = () => {
    setMessageGlobal("Paramètres enregistrés ✓");
    setTimeout(() => setMessageGlobal(""), 4000);
  };

  const clePublique = clesVisibles ? "pk_demo_XXXXXXXXXXXXXXXXXXXX" : "pk_demo_••••••••";
  const cleSecrete = clesVisibles ? "sk_demo_XXXXXXXXXXXXXXXXXXXX" : "sk_demo_••••••••";

  return (
    <div>
      <PageHeader
        titre="Paramètres de la plateforme"
        description="Configuration générale, paiements, clés API et maintenance."
        action={
          <div className="flex items-center gap-3">
            {messageGlobal && (
              <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={15} /> {messageGlobal}
              </span>
            )}
            <button type="button" onClick={enregistrer} className="btn-primary">
              <Save size={17} />
              Enregistrer les modifications
            </button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <CarteSection titre="Général">
          <div className="space-y-4">
            <div>
              <label htmlFor="nom-plateforme" className="label">
                Nom de la plateforme
              </label>
              <input
                id="nom-plateforme"
                type="text"
                value={nomPlateforme}
                onChange={(e) => setNomPlateforme(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="url-plateforme" className="label">
                URL
              </label>
              <input
                id="url-plateforme"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="input"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="devise" className="label">
                  Devise
                </label>
                <select
                  id="devise"
                  value={devise}
                  onChange={(e) => setDevise(e.target.value)}
                  className="input"
                >
                  <option value="XOF">XOF (FCFA) — Franc CFA</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="USD">USD — Dollar américain</option>
                </select>
              </div>
              <div>
                <label htmlFor="langue" className="label">
                  Langue
                </label>
                <select
                  id="langue"
                  value={langue}
                  onChange={(e) => setLangue(e.target.value)}
                  className="input"
                >
                  <option value="Français">Français</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>
          </div>
        </CarteSection>

        <CarteSection titre="Moyens de paiement activés">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800/70">
            {methodesPaiement.map((m) => (
              <li key={m} className="flex items-center justify-between py-2.5">
                <span className="text-sm text-gray-700 dark:text-gray-300">{m}</span>
                <Interrupteur
                  actif={methodesActives[m]}
                  onChange={() => basculerMethode(m)}
                  label={`Activer ${m}`}
                />
              </li>
            ))}
          </ul>
        </CarteSection>

        <CarteSection titre="Clés API">
          <div className="space-y-4">
            <div>
              <span className="label">Clé publique</span>
              <input type="text" value={clePublique} readOnly className="input font-mono" />
            </div>
            <div>
              <span className="label">Clé secrète</span>
              <input type="text" value={cleSecrete} readOnly className="input font-mono" />
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setClesVisibles((v) => !v)}
                className="btn-secondary"
              >
                {clesVisibles ? <EyeOff size={16} /> : <Eye size={16} />}
                {clesVisibles ? "Masquer" : "Révéler"}
              </button>
              <button type="button" onClick={regenererCles} className="btn-secondary">
                <RefreshCw size={16} />
                Régénérer
              </button>
            </div>
            {messageCles && (
              <p className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={15} /> {messageCles}
              </p>
            )}
          </div>
        </CarteSection>

        <CarteSection titre="Maintenance">
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Mode maintenance
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  Rend la plateforme inaccessible aux clients pendant les opérations techniques.
                </p>
              </div>
              <Interrupteur
                actif={maintenance}
                onChange={() => setMaintenance((v) => !v)}
                label="Activer le mode maintenance"
              />
            </div>
            {maintenance && (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                Le mode maintenance est activé : les visiteurs verront une page d&apos;attente.
              </p>
            )}
            <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
              <button type="button" onClick={viderCache} className="btn-secondary">
                <Trash2 size={16} />
                Vider le cache
              </button>
              {messageCache && (
                <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={15} /> {messageCache}
                </p>
              )}
            </div>
          </div>
        </CarteSection>
      </div>
    </div>
  );
}
