# Nexora — Fournisseurs d'API à intégrer

Guide des fournisseurs recommandés pour brancher chaque module de Nexora sur de vrais
services, avec une priorité au contexte **Afrique de l'Ouest / zone UEMOA (FCFA — XOF)**.
Les endpoints de démo à remplacer sont indiqués pour chaque module.

---

## 1. Paiements (module `dashboard/paiements`, checkout des commandes)

Priorité aux agrégateurs qui encaissent **directement en XOF** et supportent le Mobile Money.

| Fournisseur | Points forts | Couverture | Notes d'intégration |
|---|---|---|---|
| **FedaPay** 🇧🇯 | Agrégateur béninois : MTN MoMo, Moov Money, cartes ; encaisse en XOF | Bénin, Togo, Côte d'Ivoire… | API REST + SDK JS/PHP, webhooks. Idéal comme PSP principal au Bénin. |
| **KkiaPay** 🇧🇯 | Widget de paiement très simple (MoMo + cartes), XOF natif | Bénin et UEMOA | SDK JS embarquable en une balise, sandbox gratuite. |
| **CinetPay** | Agrégateur panafricain francophone (MoMo, Wave, cartes) | 10+ pays UEMOA/CEMAC | API REST, paiement par lien ou checkout intégré. |
| **Flutterwave** | Standard panafricain, nombreux moyens (cartes, MoMo, Wave) | 30+ pays | SDK Node officiel, webhooks signés, payouts. |
| **Paystack** | Très bonne DX (docs, dashboard), filiale Stripe | Nigéria, Ghana, Afrique du Sud, Côte d'Ivoire | Checkout hébergé + API. |
| **Wave Business API** | Frais très bas, populaire au Sénégal/CI | Sénégal, Côte d'Ivoire | API checkout B2B (accès sur demande). |
| **MTN MoMo API** / **Orange Money API** | Intégration directe opérateur (sans agrégateur) | UEMOA | Portails développeurs officiels ; plus de travail que via un agrégateur. |
| **Stripe** / **PayPal** | Clients internationaux, cartes et wallets (Apple/Google Pay) | Monde | Stripe ne couvre pas l'encaissement local XOF : à réserver aux paiements internationaux. |

**Architecture conseillée** : une interface `PaymentProvider` unique (créerPaiement, vérifierStatut,
webhook) avec adaptateurs FedaPay (défaut Bénin), CinetPay/Flutterwave (reste Afrique), Stripe (international).
Montants toujours en XOF entiers — le XOF n'a pas de centimes, ce que l'app respecte déjà.

## 2. Analyse de site web (remplace `POST /api/analyse`)

| Fournisseur | Usage |
|---|---|
| **Google PageSpeed Insights API** (gratuite) | Performance, vitesse, Core Web Vitals, accessibilité, SEO de base — c'est le cœur du rapport. |
| **Lighthouse CI** (auto-hébergé) | Même moteur en interne, sans quota Google. |
| **SSL Labs API** (gratuite) | Note du certificat et de la configuration TLS. |
| **Mozilla HTTP Observatory** (gratuite) | En-têtes de sécurité (CSP, HSTS…). |
| **Google Safe Browsing API** | Détection site compromis/phishing. |

## 3. Noms de domaine (remplace `POST /api/domaines`)

| Fournisseur | Usage |
|---|---|
| **Domainr API** | Recherche de disponibilité multi-extensions ultra rapide (l'UX actuelle correspond déjà). |
| **Namecheap API** / **ResellerClub** / **OpenSRS** | Compte revendeur : enregistrement, renouvellement, DNS, tarifs de gros. ResellerClub gère bien les nTLD (.africa…). |
| **Registre .bj** | Les .bj passent par un registrar accrédité local (ex. via ResellerClub ou un registrar béninois partenaire). |

## 4. Hébergement web

| Fournisseur | Usage |
|---|---|
| **cPanel/WHM API** ou **Plesk API** | Provisionner automatiquement les comptes Starter/Business/Premium sur vos serveurs. |
| **DigitalOcean / Vultr / OVH API** | Créer les VPS/instances sous-jacents ; OVH a des datacenters proches (Europe) à faible latence pour l'Afrique de l'Ouest. |
| **Cloudflare API** | CDN, SSL, DNS, protection DDoS — correspond aux promesses des offres Business/Premium. |

## 5. Emails professionnels

| Fournisseur | Usage |
|---|---|
| **Google Workspace Admin SDK** ou **Microsoft 365 Graph API** | Revente de boîtes premium. |
| **Zoho Mail API** | Alternative économique (plans gratuits/low-cost), API de création de boîtes complète. |
| **Titan Email (API partenaire)** | Conçu pour être revendu par les hébergeurs (c'est ce qu'utilise Hostinger). |
| **Brevo / Resend / Mailgun** | Emails transactionnels de la plateforme (factures, notifications). |

## 6. Publicités Facebook & TikTok

| Fournisseur | Usage |
|---|---|
| **Meta Marketing API** | Création/gestion des campagnes Facebook & Instagram depuis le brief client (comptes en agence via Business Manager). |
| **TikTok Marketing API** (TikTok for Business) | Même principe pour TikTok Ads. |

Les briefs commandés dans Nexora deviennent des campagnes créées par ces API, et les
métriques (impressions, clics, dépense) remontent dans le tableau de suivi.

## 7. SEO

| Fournisseur | Usage |
|---|---|
| **Google Search Console API** (gratuite) | Positions réelles, impressions, requêtes des sites clients. |
| **DataForSEO** | SERP, volumes de mots-clés, backlinks — tarification à l'usage, adapté à une jeune plateforme. |
| **SerpAPI** | Suivi de positions simple. |
| **Moz / Semrush / Ahrefs API** | Données premium (autorité de domaine, backlinks) quand le volume le justifie. |

## 8. Notifications & support

| Fournisseur | Usage |
|---|---|
| **Africa's Talking** | SMS/USSD dans toute l'Afrique — parfait pour les alertes (expiration domaine, paiement reçu). |
| **Twilio / Termii** | SMS + WhatsApp Business API. |
| **Crisp / Chatwoot (open source)** | Chat en direct du centre de support. |
| **Firebase Cloud Messaging** | Notifications push web/mobile. |

## 9. Facturation

| Outil | Usage |
|---|---|
| **react-pdf / pdfmake / Puppeteer** | Génération serveur des factures PDF en FCFA (le bouton « Télécharger » du module Factures est prêt à être branché). |
| **Taxes** | TVA Bénin 18 % à paramétrer dans le module admin. |

---

## Ordre d'intégration recommandé

1. **FedaPay ou KkiaPay** (paiement XOF réel) + webhooks → débloque tous les modules de commande.
2. **PageSpeed Insights API** → l'analyse devient réelle (l'accroche marketing n°1).
3. **Domainr + ResellerClub** → vente de domaines réelle.
4. **Google Search Console API** → suivi SEO réel.
5. **Meta / TikTok Marketing API** → automatisation des campagnes.
6. cPanel/WHM + Titan/Zoho → hébergement et emails automatisés.
