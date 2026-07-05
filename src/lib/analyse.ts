// Moteur d'analyse de démonstration : produit des scores déterministes
// à partir de l'URL pour que la même adresse renvoie toujours le même rapport.

export type CategorieAnalyse =
  | "performance"
  | "vitesse"
  | "seo"
  | "securite"
  | "mobile"
  | "accessibilite";

export interface ResultatAnalyse {
  url: string;
  domaine: string;
  scoreGlobal: number;
  scores: Record<CategorieAnalyse, number>;
  metriques: {
    tempsChargement: string;
    poidsPage: string;
    requetes: number;
    ttfb: string;
  };
  erreurs: { niveau: "critique" | "important" | "mineur"; message: string }[];
  recommandations: string[];
}

function hashString(input: string): number {
  let h = 5381;
  for (let i = 0; i < input.length; i++) {
    h = (h * 33) ^ input.charCodeAt(i);
  }
  return h >>> 0;
}

function scoreFrom(seed: number, salt: number, min = 42, max = 98): number {
  const v = hashString(`${seed}:${salt}`);
  return min + (v % (max - min + 1));
}

const ERREURS_POOL: ResultatAnalyse["erreurs"] = [
  { niveau: "critique", message: "Certaines images ne sont pas compressées (gain possible : 1,2 Mo)." },
  { niveau: "critique", message: "Le certificat SSL n'impose pas la redirection HTTPS sur toutes les pages." },
  { niveau: "important", message: "Balise meta description absente sur 4 pages." },
  { niveau: "important", message: "Le JavaScript bloquant retarde le rendu initial de 800 ms." },
  { niveau: "important", message: "Aucun en-tête Content-Security-Policy détecté." },
  { niveau: "mineur", message: "12 liens internes pointent vers des redirections 301." },
  { niveau: "mineur", message: "Les polices web ne sont pas préchargées (font-display manquant)." },
  { niveau: "mineur", message: "Attributs alt manquants sur 6 images décoratives." },
];

const RECOS_POOL: string[] = [
  "Activer la compression Brotli et la mise en cache navigateur (Cache-Control).",
  "Convertir les images au format WebP/AVIF et utiliser le lazy loading.",
  "Ajouter des balises title et meta description uniques sur chaque page.",
  "Mettre en place un CDN pour réduire la latence internationale.",
  "Corriger le contraste des textes secondaires pour respecter WCAG AA.",
  "Ajouter les en-têtes de sécurité HSTS, X-Frame-Options et CSP.",
  "Réduire le JavaScript inutilisé (code splitting, imports dynamiques).",
  "Créer un sitemap.xml et le soumettre à Google Search Console.",
  "Optimiser les Core Web Vitals : LCP < 2,5 s, CLS < 0,1, INP < 200 ms.",
  "Structurer les données avec Schema.org (rich snippets).",
];

export function analyserSite(url: string): ResultatAnalyse {
  const propre = url.trim().replace(/^https?:\/\//i, "").replace(/\/.*$/, "");
  const seed = hashString(propre.toLowerCase());

  const scores: Record<CategorieAnalyse, number> = {
    performance: scoreFrom(seed, 1),
    vitesse: scoreFrom(seed, 2),
    seo: scoreFrom(seed, 3),
    securite: scoreFrom(seed, 4, 50, 99),
    mobile: scoreFrom(seed, 5, 55, 99),
    accessibilite: scoreFrom(seed, 6, 48, 97),
  };

  const scoreGlobal = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / 6
  );

  const nbErreurs = 3 + (seed % 4);
  const erreurs = Array.from({ length: nbErreurs }, (_, i) =>
    ERREURS_POOL[(seed + i * 7) % ERREURS_POOL.length]
  );

  const recommandations = Array.from({ length: 5 }, (_, i) =>
    RECOS_POOL[(seed + i * 3) % RECOS_POOL.length]
  ).filter((v, i, arr) => arr.indexOf(v) === i);

  return {
    url: `https://${propre}`,
    domaine: propre,
    scoreGlobal,
    scores,
    metriques: {
      tempsChargement: `${(1 + (seed % 30) / 10).toFixed(1)} s`,
      poidsPage: `${(0.8 + (seed % 40) / 10).toFixed(1)} Mo`,
      requetes: 28 + (seed % 60),
      ttfb: `${120 + (seed % 400)} ms`,
    },
    erreurs,
    recommandations,
  };
}

export interface ResultatDomaine {
  domaine: string;
  extension: string;
  disponible: boolean;
  prix: number;
  prixRenouvellement: number;
}

// Prix en FCFA (XOF)
const EXTENSIONS: { ext: string; prix: number; renouvellement: number }[] = [
  { ext: ".com", prix: 7900, renouvellement: 9800 },
  { ext: ".net", prix: 8500, renouvellement: 10500 },
  { ext: ".org", prix: 7200, renouvellement: 9200 },
  { ext: ".fr", prix: 5200, renouvellement: 6500 },
  { ext: ".io", prix: 26000, renouvellement: 32500 },
  { ext: ".ai", prix: 49000, renouvellement: 59000 },
  { ext: ".africa", prix: 10500, renouvellement: 13000 },
  { ext: ".bj", prix: 16500, renouvellement: 19500 },
  { ext: ".co", prix: 18500, renouvellement: 21500 },
  { ext: ".app", prix: 11000, renouvellement: 13000 },
  { ext: ".dev", prix: 9800, renouvellement: 11800 },
  { ext: ".shop", prix: 2600, renouvellement: 23000 },
];

export function rechercherDomaine(nom: string): ResultatDomaine[] {
  const base = nom
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\..*$/, "")
    .replace(/[^a-z0-9-]/g, "");
  const seed = hashString(base);

  return EXTENSIONS.map(({ ext, prix, renouvellement }, i) => ({
    domaine: `${base}${ext}`,
    extension: ext,
    disponible: hashString(`${seed}${ext}`) % 10 > 2, // ~70 % disponibles
    prix,
    prixRenouvellement: renouvellement,
  }));
}
