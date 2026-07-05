import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Globe,
  Headphones,
  LineChart,
  Mail,
  Megaphone,
  Music2,
  Receipt,
  Rocket,
  Search,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Wallet,
  Zap,
} from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import AnalyseSearchBar from "@/components/landing/AnalyseSearchBar";
import FAQ from "@/components/landing/FAQ";

const AVANTAGES = [
  { icone: Sparkles, titre: "Analyse intelligente", texte: "Un diagnostic complet de votre site en moins de 60 secondes : performance, SEO, sécurité et accessibilité." },
  { icone: Zap, titre: "Hébergement ultra rapide", texte: "Serveurs NVMe, CDN mondial et mise en cache intelligente pour des temps de chargement records." },
  { icone: ShieldCheck, titre: "Sécurité avancée", texte: "SSL gratuit, pare-feu applicatif, sauvegardes quotidiennes et protection anti-DDoS incluse." },
  { icone: Search, titre: "SEO professionnel", texte: "Audits, mots-clés, backlinks et optimisation technique menés par des experts certifiés." },
  { icone: Megaphone, titre: "Publicités performantes", texte: "Campagnes Facebook Ads et TikTok Ads créées, lancées et optimisées pour votre ROI." },
  { icone: CreditCard, titre: "Paiements sécurisés", texte: "Stripe, PayPal, Mobile Money, Wave et cartes bancaires — vos transactions sont protégées." },
  { icone: Headphones, titre: "Support 24/7", texte: "Une équipe disponible jour et nuit par chat et tickets, avec assistance prioritaire en Premium." },
];

const SERVICES = [
  { icone: Activity, titre: "Analyse Web", texte: "Score sur 100, erreurs détectées et recommandations concrètes pour votre site.", href: "/dashboard/analyse" },
  { icone: Globe, titre: "Nom de domaine", texte: "Recherchez et achetez votre domaine parmi des dizaines d'extensions (.com, .fr, .africa…).", href: "/dashboard/domaines" },
  { icone: Server, titre: "Hébergement", texte: "Des offres Starter à Premium : SSL, sauvegardes, CDN et haute disponibilité.", href: "/dashboard/hebergement" },
  { icone: Mail, titre: "Emails Pro", texte: "Des adresses professionnelles à votre nom de domaine, avec gestion complète.", href: "/dashboard/emails" },
  { icone: LineChart, titre: "SEO", texte: "Audits local, national et international avec suivi de progression mensuel.", href: "/dashboard/seo" },
  { icone: Megaphone, titre: "Facebook Ads", texte: "Commandez une campagne clé en main : brief, paiement, lancement, résultats.", href: "/dashboard/facebook-ads" },
  { icone: Music2, titre: "TikTok Ads", texte: "Trafic, ventes, notoriété ou leads — touchez des millions d'utilisateurs.", href: "/dashboard/tiktok-ads" },
  { icone: Wallet, titre: "Gestion des dépenses", texte: "Un tableau de bord financier clair avec graphiques et exports PDF, Excel, CSV.", href: "/dashboard/depenses" },
  { icone: Receipt, titre: "Facturation", texte: "Factures PDF, devis et reçus générés automatiquement, historique complet.", href: "/dashboard/factures" },
  { icone: Headphones, titre: "Support", texte: "Chat en direct, tickets, FAQ et base de connaissances à votre disposition.", href: "/dashboard/support" },
];

const ETAPES = [
  { num: "1", titre: "Créez un compte", texte: "Inscription gratuite en moins d'une minute, sans carte bancaire." },
  { num: "2", titre: "Choisissez un service", texte: "Analyse, domaine, hébergement, publicité ou SEO — tout est au même endroit." },
  { num: "3", titre: "Payez en toute sécurité", texte: "Carte, Stripe, PayPal, Mobile Money ou Wave. Facture générée automatiquement." },
  { num: "4", titre: "Suivez vos projets", texte: "Tableaux de bord en temps réel, notifications et rapports détaillés." },
];

const TEMOIGNAGES = [
  { nom: "Aïcha K.", role: "Fondatrice, boutique e-commerce — Cotonou", texte: "En trois mois, Nexora a doublé le trafic de ma boutique. L'analyse gratuite m'a ouvert les yeux sur des erreurs que je traînais depuis des années.", note: 5 },
  { nom: "Pierre L.", role: "Directeur, cabinet de conseil — Lyon", texte: "Enfin une plateforme qui regroupe domaine, hébergement, emails et publicité. Je gérais cinq prestataires, aujourd'hui un seul tableau de bord suffit.", note: 5 },
  { nom: "Fatou N.", role: "Créatrice de marque — Dakar", texte: "Le paiement par Wave et Orange Money change tout pour nous. Les campagnes TikTok commandées via Nexora ont triplé mes ventes.", note: 5 },
  { nom: "Sarah C.", role: "CEO, startup SaaS — Paris", texte: "Le suivi SEO est d'une clarté rare : positions, backlinks, progression. Mon équipe consulte le dashboard tous les matins.", note: 4 },
];

const STATS = [
  { valeur: "10 000+", label: "clients accompagnés" },
  { valeur: "50 000+", label: "domaines enregistrés" },
  { valeur: "20 000+", label: "sites hébergés" },
  { valeur: "100 000+", label: "analyses réalisées" },
  { valeur: "98 %", label: "de satisfaction" },
];

const FOOTER_LIENS: { titre: string; liens: { label: string; href: string }[] }[] = [
  {
    titre: "Produit",
    liens: [
      { label: "Analyse de site", href: "/dashboard/analyse" },
      { label: "Noms de domaine", href: "/dashboard/domaines" },
      { label: "Hébergement web", href: "/dashboard/hebergement" },
      { label: "Emails professionnels", href: "/dashboard/emails" },
      { label: "Tarifs", href: "#services" },
    ],
  },
  {
    titre: "Services",
    liens: [
      { label: "Référencement SEO", href: "/dashboard/seo" },
      { label: "Facebook Ads", href: "/dashboard/facebook-ads" },
      { label: "TikTok Ads", href: "/dashboard/tiktok-ads" },
      { label: "Gestion des dépenses", href: "/dashboard/depenses" },
      { label: "Facturation", href: "/dashboard/factures" },
    ],
  },
  {
    titre: "Entreprise",
    liens: [
      { label: "À propos", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Centre d'aide", href: "/dashboard/support" },
      { label: "Contact", href: "/dashboard/support" },
    ],
  },
  {
    titre: "Légal",
    liens: [
      { label: "Mentions légales", href: "#" },
      { label: "Politique de confidentialité", href: "#" },
      { label: "Conditions d'utilisation", href: "#" },
    ],
  },
];

function ApercuDashboard() {
  return (
    <div className="card overflow-hidden border-gray-200/80 shadow-2xl shadow-brand-600/10 dark:border-gray-800">
      <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50/80 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/60">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 rounded-md bg-white px-3 py-0.5 text-[11px] text-gray-400 dark:bg-gray-800">
          app.nexora.com/dashboard
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4 sm:p-5">
        {[
          { l: "Score du site", v: "87/100", c: "text-emerald-500" },
          { l: "Visiteurs (30 j)", v: "24 812", c: "text-brand-600 dark:text-brand-400" },
          { l: "Campagnes", v: "5 actives", c: "text-indigo-500" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
            <p className="text-[10px] text-gray-500 sm:text-xs">{s.l}</p>
            <p className={`mt-1 text-sm font-bold sm:text-lg ${s.c}`}>{s.v}</p>
          </div>
        ))}
        <div className="col-span-3 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
          <p className="mb-2 text-[10px] text-gray-500 sm:text-xs">Trafic du site</p>
          <svg viewBox="0 0 300 60" className="w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon
              points="0,60 0,42 30,38 60,44 90,30 120,34 150,22 180,26 210,14 240,18 270,8 300,12 300,60"
              fill="url(#heroGrad)"
            />
            <polyline
              points="0,42 30,38 60,44 90,30 120,34 150,22 180,26 210,14 240,18 270,8 300,12"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="col-span-2 space-y-2 rounded-xl border border-gray-100 p-3 dark:border-gray-800">
          {["entreprise.com — Actif", "entreprise.fr — Actif", "ma-boutique.shop — Renouveler"].map((d) => (
            <div key={d} className="flex items-center gap-2 text-[10px] text-gray-600 dark:text-gray-300 sm:text-xs">
              <BadgeCheck size={13} className="text-emerald-500" />
              {d}
            </div>
          ))}
        </div>
        <div className="grid place-items-center rounded-xl border border-gray-100 p-3 dark:border-gray-800">
          <svg width="64" height="64" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="10" className="stroke-gray-100 dark:stroke-gray-800" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeLinecap="round" strokeDasharray="218 251" transform="rotate(-90 50 50)" />
            <text x="50" y="57" textAnchor="middle" fontSize="24" fontWeight="800" className="fill-gray-900 dark:fill-white">87</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg dark:border-gray-800/70 dark:bg-gray-950/80">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { label: "Services", href: "#services" },
              { label: "Fonctionnement", href: "#fonctionnement" },
              { label: "Témoignages", href: "#temoignages" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="btn-ghost px-3 py-2">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/connexion" className="btn-ghost hidden sm:inline-flex">
              Connexion
            </Link>
            <Link href="/inscription" className="btn-primary">
              Commencer
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(37,99,235,0.12),transparent_55%)]"
          />
          <div className="container-page grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-2">
            <div className="animate-fade-up">
              <span className="badge-blue mb-6">
                <Sparkles size={13} />
                Nouveau : analyse de site gratuite en 60 secondes
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
                Gérez toute votre présence en ligne depuis{" "}
                <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
                  une seule plateforme.
                </span>
              </h1>
              <p className="section-subtitle max-w-xl">
                Analysez votre site web, achetez votre nom de domaine, hébergez votre site,
                créez vos emails professionnels, commandez vos campagnes Facebook Ads et
                TikTok Ads et améliorez votre référencement SEO — le tout depuis une seule
                interface.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard/analyse" className="btn-primary px-7 py-3.5 text-base">
                  <Activity size={19} />
                  Analyser mon site
                </Link>
                <Link href="/inscription" className="btn-secondary px-7 py-3.5 text-base">
                  Commencer maintenant
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="mt-10">
                <p className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Analysez votre site gratuitement :
                </p>
                <AnalyseSearchBar />
              </div>
            </div>
            <div className="animate-fade-in lg:pl-6">
              <ApercuDashboard />
            </div>
          </div>
        </section>

        {/* Statistiques */}
        <section className="border-y border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/40">
          <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{s.valeur}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi nous choisir */}
        <section className="container-page py-20 sm:py-28" id="avantages">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Pourquoi choisir Nexora ?</h2>
            <p className="section-subtitle">
              Tout ce dont votre entreprise a besoin pour exister, performer et vendre en
              ligne — sans multiplier les prestataires.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {AVANTAGES.map((a) => (
              <div key={a.titre} className="card card-hover p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                  <a.icone size={21} />
                </span>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{a.titre}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{a.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/40 sm:py-28" id="services">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">Nos services</h2>
              <p className="section-subtitle">
                Dix services essentiels, une seule plateforme, un seul tableau de bord.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {SERVICES.map((s) => (
                <Link key={s.titre} href={s.href} className="card card-hover group p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white">
                    <s.icone size={21} />
                  </span>
                  <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{s.titre}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{s.texte}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-brand-400">
                    Découvrir <ArrowRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Comment ça fonctionne */}
        <section className="container-page py-20 sm:py-28" id="fonctionnement">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Comment ça fonctionne</h2>
            <p className="section-subtitle">De l'inscription au suivi de vos projets, en quatre étapes simples.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <div key={e.num} className="card p-6 text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-600 to-indigo-600 text-lg font-bold text-white">
                  {e.num}
                </span>
                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">{e.titre}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{e.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Témoignages */}
        <section className="border-y border-gray-200 bg-gray-50 py-20 dark:border-gray-800 dark:bg-gray-900/40 sm:py-28" id="temoignages">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="section-title">Ils nous font confiance</h2>
              <p className="section-subtitle">
                Des milliers d'entrepreneurs en Europe et en Afrique développent leur
                activité avec Nexora.
              </p>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {TEMOIGNAGES.map((t) => (
                <figure key={t.nom} className="card p-7">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: t.note }).map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-gray-700 dark:text-gray-300">
                    « {t.texte} »
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                      {t.nom.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.nom}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container-page py-20 sm:py-28" id="faq">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="section-title">Questions fréquentes</h2>
            <p className="section-subtitle">Tout ce qu'il faut savoir avant de commencer.</p>
          </div>
          <div className="mt-10">
            <FAQ />
          </div>
        </section>

        {/* CTA final */}
        <section className="container-page pb-24">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-700 px-8 py-16 text-center text-white sm:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
            <Rocket className="mx-auto mb-5" size={36} />
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Prêt à faire décoller votre présence en ligne ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-100">
              Créez votre compte gratuitement et lancez votre première analyse dès
              maintenant. Aucune carte bancaire requise.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/inscription" className="btn bg-white px-7 py-3.5 text-base text-brand-700 hover:bg-brand-50">
                Commencer gratuitement
              </Link>
              <Link href="/dashboard/analyse" className="btn border border-white/40 px-7 py-3.5 text-base text-white hover:bg-white/10">
                Analyser mon site
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/40">
        <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-gray-600 dark:text-gray-400">
              Votre présence en ligne, unifiée. Analyse, domaines, hébergement, emails,
              publicité et SEO depuis une seule plateforme.
            </p>
            <div className="mt-5 flex gap-3 text-gray-400">
              {["X", "in", "f", "IG"].map((r) => (
                <a
                  key={r}
                  href="#"
                  aria-label={`Réseau social ${r}`}
                  className="grid h-9 w-9 place-items-center rounded-xl border border-gray-200 text-xs font-bold transition-colors hover:border-brand-500 hover:text-brand-600 dark:border-gray-700"
                >
                  {r}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_LIENS.map((col) => (
            <div key={col.titre}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{col.titre}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.liens.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 py-6 dark:border-gray-800">
          <div className="container-page flex flex-wrap items-center justify-between gap-3 text-sm text-gray-500 dark:text-gray-400">
            <p>© 2026 Nexora. Tous droits réservés.</p>
            <p className="flex items-center gap-1.5">
              <Shield size={14} /> Paiements sécurisés · RGPD · ISO 27001
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
