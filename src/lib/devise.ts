// Devise de la plateforme : Franc CFA (XOF — UEMOA).
// Tous les montants de l'application sont stockés en FCFA (entiers).

export const DEVISE = "FCFA";

/** Format complet : 229 500 FCFA */
export function fcfa(montant: number): string {
  return `${Math.round(montant).toLocaleString("fr-FR")} ${DEVISE}`;
}

/** Format compact pour les espaces réduits : 2,7 M FCFA · 275 k FCFA · 950 FCFA */
export function fcfaCompact(montant: number): string {
  if (montant >= 1_000_000) {
    return `${(montant / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} M ${DEVISE}`;
  }
  if (montant >= 10_000) {
    return `${Math.round(montant / 1_000).toLocaleString("fr-FR")} k ${DEVISE}`;
  }
  return fcfa(montant);
}
