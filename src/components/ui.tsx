import type { ReactNode } from "react";

export function PageHeader({
  titre,
  description,
  action,
}: {
  titre: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {titre}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  valeur,
  variation,
  icone,
}: {
  label: string;
  valeur: string;
  variation?: string;
  icone?: ReactNode;
}) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        {icone && (
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
            {icone}
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{valeur}</p>
      {variation && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{variation}</p>
      )}
    </div>
  );
}

export function CarteSection({
  titre,
  action,
  children,
  className = "",
}: {
  titre?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`card p-6 ${className}`}>
      {(titre || action) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {titre && (
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">{titre}</h2>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export function Tableau({
  entetes,
  children,
}: {
  entetes: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            {entetes.map((e) => (
              <th
                key={e}
                className="pb-3 pr-4 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400"
              >
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/70">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function badgeStatut(statut: string): string {
  const verts = ["Payée", "Réussi", "Actif", "Active", "Livrée", "Terminé", "Terminée", "Résolu", "Disponible"];
  const rouges = ["Échue", "Échoué", "Suspendu", "Annulée", "Pris"];
  const ambres = ["En attente", "En pause", "Expire bientôt", "En validation", "Ouvert"];
  if (verts.includes(statut)) return "badge-green";
  if (rouges.includes(statut)) return "badge-red";
  if (ambres.includes(statut)) return "badge-amber";
  return "badge-blue";
}
