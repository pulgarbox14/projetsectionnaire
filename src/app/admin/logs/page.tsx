import { CarteSection, PageHeader } from "@/components/ui";
import { logsAdmin } from "@/lib/data";

const LOGS_SUPPLEMENTAIRES = [
  { temps: "2026-07-04 16:05", niveau: "info", message: "Nouvel utilisateur inscrit : kofi@mensah.africa (plan Starter)." },
  { temps: "2026-07-04 14:31", niveau: "warn", message: "Quota de stockage à 92 % pour le compte #2841 — notification envoyée." },
  { temps: "2026-07-04 12:12", niveau: "info", message: "Campagne CAM-209 soumise à validation (TikTok Ads)." },
  { temps: "2026-07-04 09:56", niveau: "error", message: "Timeout API registrar lors du transfert de dossou-consulting.bj — retry 2/3." },
  { temps: "2026-07-04 07:40", niveau: "info", message: "Rotation des journaux applicatifs terminée (14 jours conservés)." },
  { temps: "2026-07-03 22:18", niveau: "warn", message: "5 tentatives de connexion échouées depuis 41.85.176.12 — IP temporairement bloquée." },
  { temps: "2026-07-03 19:02", niveau: "info", message: "Facture FAC-2026-0142 générée et envoyée à aicha@entreprise.com." },
  { temps: "2026-07-03 15:44", niveau: "info", message: "Migration base de données 2026_07_seo_metrics appliquée en 1,2 s." },
  { temps: "2026-07-03 11:27", niveau: "error", message: "Webhook Flutterwave non délivré (HTTP 503) — replanifié dans 5 min." },
  { temps: "2026-07-03 08:15", niveau: "info", message: "Analyse antivirus hebdomadaire : 0 menace détectée sur 3 214 sites." },
];

const LOGS = [...logsAdmin, ...LOGS_SUPPLEMENTAIRES];

const STYLES_NIVEAU: Record<string, string> = {
  info: "bg-blue-500/15 text-blue-400",
  warn: "bg-amber-500/15 text-amber-400",
  error: "bg-red-500/15 text-red-400",
};

export default function LogsPage() {
  return (
    <div>
      <PageHeader
        titre="Logs système"
        description="Journal des événements de la plateforme en temps réel."
      />

      <CarteSection titre="Console">
        <div className="overflow-x-auto rounded-xl bg-gray-950 p-4 font-mono text-xs leading-relaxed">
          <ul className="space-y-1.5">
            {LOGS.map((l, i) => (
              <li key={i} className="flex min-w-max items-baseline gap-3 whitespace-nowrap">
                <span className="shrink-0 text-gray-500">{l.temps}</span>
                <span
                  className={`inline-flex w-14 shrink-0 justify-center rounded px-1.5 py-0.5 font-semibold uppercase ${
                    STYLES_NIVEAU[l.niveau] ?? "bg-gray-500/15 text-gray-400"
                  }`}
                >
                  {l.niveau}
                </span>
                <span className="text-gray-300">{l.message}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {LOGS.length} événements affichés — rétention : 14 jours.
        </p>
      </CarteSection>
    </div>
  );
}
