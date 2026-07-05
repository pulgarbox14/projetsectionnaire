# Nexora — Votre présence en ligne, unifiée.

Plateforme SaaS premium tout-en-un pour gérer la présence en ligne d'une entreprise :
analyse de site web, noms de domaine, hébergement, emails professionnels, campagnes
Facebook Ads & TikTok Ads, référencement SEO, gestion des dépenses, facturation,
paiements (dont Mobile Money africain) et support — depuis une seule interface.

![Stack](https://img.shields.io/badge/Next.js%2015-App%20Router-black) ![React](https://img.shields.io/badge/React-19-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![TS](https://img.shields.io/badge/TypeScript-strict-3178c6)

## Démarrage

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
```

## Visite guidée

| URL | Description |
|---|---|
| `/` | Landing page (hero, analyse gratuite, services, témoignages, stats, FAQ) |
| `/connexion` · `/inscription` | Authentification (démo : cliquez simplement sur le bouton) |
| `/dashboard` | Espace client — vue d'ensemble avec graphiques et activités |
| `/dashboard/analyse` | Analyse de site : score /100, 6 catégories, erreurs, recommandations |
| `/dashboard/domaines` | Recherche multi-extensions (.com, .fr, .africa, .bj…) et achat |
| `/dashboard/hebergement` | Offres Starter / Business / Premium |
| `/dashboard/emails` | Création et gestion d'emails professionnels |
| `/dashboard/seo` | Commande d'audits SEO (Local/National/International) et suivi |
| `/dashboard/facebook-ads` · `/dashboard/tiktok-ads` | Brief de campagne + paiement intégré |
| `/dashboard/depenses` | Tableau financier avec exports CSV / Excel / PDF |
| `/dashboard/factures` · `/dashboard/paiements` | Facturation et historique des paiements |
| `/dashboard/support` | Chat en direct, tickets, FAQ, base de connaissances |
| `/admin` | Panneau d'administration complet (utilisateurs, commandes, rapports, logs…) |

## Architecture

```
src/
├── app/
│   ├── page.tsx               # Landing page
│   ├── connexion/ inscription/
│   ├── api/analyse/ api/domaines/   # Endpoints de démo (déterministes)
│   ├── dashboard/…            # Espace client (13 écrans)
│   └── admin/…                # Administration (7 écrans)
├── components/                # AppShell (sidebar/topbar), charts SVG, UI kit, thème
└── lib/                       # Moteur d'analyse + données de démonstration typées
```

- **Design system** : tokens Tailwind (`tailwind.config.ts`) + classes composées (`globals.css`) — bleu `#2563EB`, indigo, cartes `rounded-2xl`, ombres légères, dark mode complet persistant.
- **Graphiques** : composants SVG maison (barres, courbes, donut, jauge) sans dépendance.
- **Démo autonome** : les API renvoient des résultats déterministes par URL/nom ; les
  écrans consomment des types exportés de `src/lib`, prêts à être rebranchés sur une
  vraie base (Prisma/PostgreSQL), une vraie analyse (PageSpeed API), un vrai registrar
  et de vrais PSP (Stripe, Flutterwave, Paystack, Wave…).

## Devise

Tous les montants de la plateforme sont en **FCFA (XOF)** — devise de la zone UEMOA,
sans centimes (montants entiers). Le formatage est centralisé dans
[`src/lib/devise.ts`](src/lib/devise.ts) (`fcfa()` et `fcfaCompact()`).

## Documentation

- [`docs/ARCHITECTURE-UX.md`](docs/ARCHITECTURE-UX.md) — identité visuelle, sitemap,
  parcours utilisateur, wireframes décrits, contenu marketing et plan technique.
- [`docs/INTEGRATIONS-API.md`](docs/INTEGRATIONS-API.md) — fournisseurs d'API recommandés
  par module (FedaPay, KkiaPay, CinetPay, Flutterwave, PageSpeed, Domainr, Meta/TikTok
  Marketing API…), avec un ordre d'intégration conseillé pour l'Afrique de l'Ouest.
