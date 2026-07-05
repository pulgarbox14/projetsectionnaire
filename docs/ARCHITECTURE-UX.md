# Nexora — Architecture UX/UI

> **Nom** : Nexora
> **Slogan** : *Votre présence en ligne, unifiée.*
> **Positionnement** : plateforme SaaS premium tout-en-un pour la présence en ligne des entreprises (analyse web, domaines, hébergement, emails pro, publicité, SEO, finances).

---

## 1. Identité visuelle

| Élément | Choix |
|---|---|
| Couleur primaire | Bleu `#2563EB` (brand-600) |
| Couleur secondaire | Indigo `#6366F1` — dégradés `brand → indigo` pour les CTA et icônes |
| Neutres | Blanc `#FFFFFF`, gris clair `#F9FAFB → #E5E7EB`, noir/gris foncé `#030712 → #111827` (dark mode) |
| États | Succès `#10B981`, alerte `#F59E0B`, erreur `#EF4444` |
| Typographie | Inter / system-ui — titres extrabold tracking-tight, corps regular |
| Rayons | Cartes `rounded-2xl` (16 px), boutons/champs `rounded-xl` (12 px) |
| Ombres | Légères au repos (`shadow-card`), teintées bleu au survol (`shadow-card-hover`) |
| Logo | Monogramme « N » blanc sur tuile dégradée bleu→indigo + wordmark « Nexora » |
| Thèmes | Clair par défaut + Dark Mode complet (classe `dark`, persistance `localStorage`) |
| Animations | `fade-up` / `fade-in` à l'apparition, micro-interactions au survol (échelle, ombre, flèches) |

**Ton éditorial** : professionnel, direct, orienté bénéfice. Vouvoiement. Vocabulaire concret (« en 60 secondes », « sans carte bancaire »).

**Devise** : tous les montants sont en **FCFA (XOF)**, entiers et sans centimes (zone UEMOA). Formatage centralisé dans `src/lib/devise.ts` ; les fournisseurs de paiement recommandés (FedaPay, KkiaPay, CinetPay, Flutterwave…) sont détaillés dans `docs/INTEGRATIONS-API.md`.

---

## 2. Sitemap

```
/                              Landing page (marketing)
├── /connexion                 Connexion
├── /inscription               Création de compte
│
├── /dashboard                 ESPACE CLIENT
│   ├── /dashboard             Vue d'ensemble (stats, graphiques, activités, factures)
│   ├── /dashboard/analyse     Analyse de site (score /100, 6 catégories, erreurs, recommandations)
│   ├── /dashboard/domaines    Recherche + achat de domaines, portefeuille de domaines
│   ├── /dashboard/hebergement Offres Starter/Business/Premium, état des serveurs
│   ├── /dashboard/emails      Création/suppression d'adresses, stockage, mots de passe
│   ├── /dashboard/seo         Commande d'audit (Local/National/International), suivi, mots-clés
│   ├── /dashboard/facebook-ads  Brief de campagne + paiement + suivi
│   ├── /dashboard/tiktok-ads  Brief de campagne + paiement + suivi
│   ├── /dashboard/depenses    Tableau financier, ajout, graphiques, exports PDF/Excel/CSV
│   ├── /dashboard/factures    Factures / Devis / Reçus, téléchargement
│   ├── /dashboard/paiements   Moyens de paiement, historique
│   ├── /dashboard/support     Chat en direct, tickets, FAQ, base de connaissances
│   └── /dashboard/parametres  Profil, sécurité, notifications, zone dangereuse
│
├── /admin                     ADMINISTRATION
│   ├── /admin                 Vue d'ensemble (MRR, commandes, logs)
│   ├── /admin/rapports        Statistiques & rapports (trafic, revenus, répartition)
│   ├── /admin/utilisateurs    Gestion utilisateurs & clients (recherche, filtres, suspension)
│   ├── /admin/commandes       Gestion des commandes (filtres par statut)
│   ├── /admin/paiements       Paiements & factures de la plateforme
│   ├── /admin/logs            Logs système
│   └── /admin/parametres      Paramètres plateforme (devise, moyens de paiement, API, maintenance)
│
└── /api
    ├── POST /api/analyse      Analyse d'une URL → scores + erreurs + recommandations
    └── POST /api/domaines     Recherche de disponibilité multi-extensions
```

---

## 3. Parcours utilisateur

### Parcours 1 — Visiteur → Client (activation)
1. **Découverte** : arrivée sur la landing (SEO, publicité, bouche-à-oreille).
2. **Accroche** : hero + barre « Analysez votre site gratuitement » → friction minimale, aucune inscription requise.
3. **Aha moment** : rapport d'analyse avec score /100, erreurs concrètes et recommandations → prise de conscience de la valeur.
4. **Conversion** : CTA contextuel « Commander un audit SEO » ou « Créer un compte gratuit ».
5. **Onboarding** : inscription en 4 champs, arrivée directe sur le dashboard.

### Parcours 2 — Achat d'un domaine + hébergement + email (equipement)
1. Dashboard → **Domaines** → recherche « entreprise » → grille d'extensions avec disponibilité et prix.
2. « Acheter » → panier → « Procéder au paiement » (Stripe / Mobile Money / Wave…).
3. Suggestion croisée : **Hébergement** (3 offres, « Commencer ») puis **Emails pro** (contact@, info@…).
4. Confirmation + facture PDF générée automatiquement dans **Factures**.

### Parcours 3 — Commande d'une campagne publicitaire (croissance)
1. Dashboard → **Facebook Ads** ou **TikTok Ads**.
2. Brief guidé : objectif → budget → pays → audience → créations (texte, images, vidéo) → durée.
3. Récapitulatif dynamique → choix du moyen de paiement → confirmation « lancement sous 24 h ».
4. Suivi en tableau : impressions, clics, dépense, statut. Notifications aux étapes clés.

### Parcours 4 — Suivi financier (rétention)
1. **Dépenses** : ajout rapide (catégorie, montant, date, facture, commentaire).
2. Lecture : barres mensuelles, donut par catégorie, totaux.
3. Export comptable : CSV / Excel / PDF en un clic.

### Parcours 5 — Admin (exploitation)
1. **/admin** : santé de la plateforme (MRR, commandes, tickets, logs).
2. Gestion quotidienne : valider les commandes, suspendre un compte, suivre les paiements.
3. Configuration : moyens de paiement activés, devise, clés API, maintenance.

---

## 4. Wireframes (description)

### Landing page
```
[Nav sticky : logo | Services · Fonctionnement · Témoignages · FAQ | thème · Connexion · CTA]
[HERO 2 colonnes : H1 + sous-titre + 2 CTA + barre d'analyse | mockup dashboard (fenêtre navigateur,
 stat-cards, courbe de trafic, jauge 87/100)]
[BANDEAU STATS 5 colonnes : 10 000+ clients · 50 000+ domaines · 20 000+ sites · 100 000+ analyses · 98 %]
[POURQUOI NOUS : grille 4×2 de cartes icône+titre+texte]
[SERVICES : grille 5×2 de cartes cliquables → pages du dashboard]
[FONCTIONNEMENT : 4 étapes numérotées en cartes]
[TÉMOIGNAGES : 2×2 cartes avec étoiles, citation, avatar]
[FAQ : accordéon 8 questions]
[CTA FINAL : bloc dégradé bleu→indigo, 2 boutons]
[FOOTER : 4 colonnes de liens + réseaux sociaux + mentions RGPD/ISO]
```

### Dashboard (gabarit commun client & admin)
```
[Sidebar fixe 256 px : logo, sections (Général / Services / Finances / Compte),
 item actif fond bleu pâle, carte utilisateur en bas]
[Topbar sticky : burger (mobile), titre d'espace, cloche notifications avec panneau,
 bascule de thème, avatar]
[Contenu : PageHeader (titre + description + action) → rangée de StatCards →
 grilles de CarteSection (graphiques, tableaux, formulaires)]
```

### Analyse de site
```
[Formulaire URL + bouton Analyser] → [état chargement spinner]
[Jauge circulaire score global | 6 barres de progression par catégorie]
[4 métriques : temps de chargement · poids · requêtes · TTFB]
[Erreurs (badge critique/important/mineur) | Recommandations + CTA audit SEO]
```

### Commande publicitaire (Facebook/TikTok)
```
[Stat-cards campagnes] → [Formulaire brief en carte : objectif/budget/pays/audience/
 texte/uploads pointillés/durée] → [Récapitulatif dynamique + moyen de paiement + Payer]
→ [Confirmation avec n° de commande] · [Tableau des campagnes]
```

---

## 5. Contenu marketing clé

- **H1** : « Gérez toute votre présence en ligne depuis une seule plateforme. »
- **Sous-titre** : « Analysez votre site web, achetez votre nom de domaine, hébergez votre site, créez vos emails professionnels, commandez vos campagnes Facebook Ads, TikTok Ads et améliorez votre référencement SEO, le tout depuis une seule interface. »
- **CTA primaires** : « Analyser mon site » · « Commencer maintenant » · « Commencer gratuitement »
- **Preuves** : bandeau de statistiques, 4 témoignages géolocalisés (Cotonou, Lyon, Dakar, Paris), mentions RGPD / ISO 27001 / paiements sécurisés.
- **Argumentaire différenciant** : paiements africains natifs (Orange Money, MTN MoMo, Wave, Flutterwave, Paystack) + extensions .africa/.bj — marché sous-servi par les acteurs globaux.

---

## 6. Architecture technique

- **Framework** : Next.js 15 (App Router) + React 19 + TypeScript strict.
- **UI** : Tailwind CSS (design tokens dans `tailwind.config.ts`, classes composées dans `globals.css`), lucide-react pour les icônes, graphiques SVG maison (`src/components/charts.tsx`) — zéro dépendance lourde.
- **Découpage** :
  - `src/components` — composants transverses (AppShell sidebar/topbar, ui.tsx, charts, thème).
  - `src/lib` — logique métier de démo (`analyse.ts` : moteur déterministe, `data.ts` : jeux de données).
  - `src/app/api` — endpoints (analyse, domaines) prêts à être branchés sur de vrais services (Lighthouse/PageSpeed API, registrar, PSP).
- **Évolutivité prévue** : chaque écran consomme des types exportés de `lib/` ; remplacer les données de démo par Prisma/PostgreSQL + NextAuth + Stripe/Flutterwave se fait sans toucher aux vues.
- **Sécurité (production)** : validation des entrées côté API, en-têtes de sécurité, secrets en variables d'environnement, RBAC client/admin, chiffrement au repos, sauvegardes.
