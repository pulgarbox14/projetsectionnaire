"use client";

// Bibliothèque de graphiques SVG légère, compatible dark mode,
// sans dépendance externe.

export function BarChart({
  data,
  hauteur = 180,
  unite = "",
}: {
  data: { label: string; valeur: number }[];
  hauteur?: number;
  /** Unité affichée au survol : "" | "€" | "k€" (sérialisable serveur → client). */
  unite?: "" | "€" | "k€";
}) {
  const max = Math.max(...data.map((d) => d.valeur), 1);
  const format = (v: number) =>
    unite === "k€"
      ? `${Math.round(v / 1000).toLocaleString("fr-FR")} k€`
      : `${v.toLocaleString("fr-FR")}${unite ? ` ${unite}` : ""}`;
  return (
    <div className="flex items-end gap-2 sm:gap-3" style={{ height: hauteur }}>
      {data.map((d) => (
        <div key={d.label} className="group flex flex-1 flex-col items-center gap-2">
          <span className="text-[11px] font-medium text-gray-500 opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400">
            {format(d.valeur)}
          </span>
          <div
            className="w-full max-w-[44px] rounded-t-lg bg-gradient-to-t from-brand-600 to-indigo-500 transition-all group-hover:from-brand-500 group-hover:to-indigo-400"
            style={{ height: `${Math.max((d.valeur / max) * 100, 3)}%` }}
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({
  data,
  hauteur = 160,
}: {
  data: number[];
  hauteur?: number;
}) {
  const w = 600;
  const h = 160;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const pas = w / (data.length - 1 || 1);
  const y = (v: number) => h - 8 - ((v - min) / (max - min || 1)) * (h - 24);
  const points = data.map((v, i) => `${i * pas},${y(v)}`).join(" ");
  const aire = `0,${h} ${points} ${w},${h}`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      style={{ height: hauteur }}
      preserveAspectRatio="none"
      role="img"
      aria-label="Graphique en courbe"
    >
      <defs>
        <linearGradient id="aireGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={aire} fill="url(#aireGrad)" />
      <polyline
        points={points}
        fill="none"
        stroke="#2563eb"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DonutChart({
  data,
  taille = 170,
}: {
  data: { categorie: string; montant: number; couleur: string }[];
  taille?: number;
}) {
  const total = data.reduce((a, b) => a + b.montant, 0) || 1;
  const r = 40;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg
        width={taille}
        height={taille}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Répartition"
      >
        <circle cx="50" cy="50" r={r} fill="none" strokeWidth="14" className="stroke-gray-100 dark:stroke-gray-800" />
        {data.map((d) => {
          const frac = d.montant / total;
          const seg = (
            <circle
              key={d.categorie}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={d.couleur}
              strokeWidth="14"
              strokeDasharray={`${frac * circ} ${circ}`}
              strokeDashoffset={-offset * circ}
              transform="rotate(-90 50 50)"
              strokeLinecap="butt"
            />
          );
          offset += frac;
          return seg;
        })}
        <text
          x="50"
          y="47"
          textAnchor="middle"
          className="fill-gray-900 dark:fill-white"
          fontSize="13"
          fontWeight="700"
        >
          {total.toLocaleString("fr-FR")} €
        </text>
        <text x="50" y="60" textAnchor="middle" className="fill-gray-500 dark:fill-gray-400" fontSize="7">
          Total
        </text>
      </svg>
      <ul className="space-y-2 text-sm">
        {data.map((d) => (
          <li key={d.categorie} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.couleur }} />
            <span className="text-gray-600 dark:text-gray-300">{d.categorie}</span>
            <span className="ml-auto pl-4 font-semibold text-gray-900 dark:text-white">
              {d.montant.toLocaleString("fr-FR")} €
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ScoreGauge({
  score,
  taille = 140,
  libelle = "Score global",
}: {
  score: number;
  taille?: number;
  libelle?: string;
}) {
  const r = 42;
  const circ = 2 * Math.PI * r;
  const couleur = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <svg width={taille} height={taille} viewBox="0 0 100 100" role="img" aria-label={`${libelle} : ${score} sur 100`}>
      <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" className="stroke-gray-100 dark:stroke-gray-800" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        stroke={couleur}
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${(score / 100) * circ} ${circ}`}
        transform="rotate(-90 50 50)"
        style={{ transition: "stroke-dasharray 0.8s ease" }}
      />
      <text x="50" y="50" textAnchor="middle" fontSize="24" fontWeight="800" className="fill-gray-900 dark:fill-white">
        {score}
      </text>
      <text x="50" y="64" textAnchor="middle" fontSize="8" className="fill-gray-500 dark:fill-gray-400">
        / 100
      </text>
    </svg>
  );
}

export function BarreProgression({
  valeur,
  couleur = "bg-brand-600",
}: {
  valeur: number;
  couleur?: string;
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
      <div
        className={`h-full rounded-full ${couleur} transition-all duration-700`}
        style={{ width: `${Math.min(valeur, 100)}%` }}
      />
    </div>
  );
}
