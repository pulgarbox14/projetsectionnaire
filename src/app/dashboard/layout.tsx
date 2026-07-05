import type { Metadata } from "next";
import {
  Activity,
  Globe,
  Headphones,
  LayoutDashboard,
  LineChart,
  Mail,
  Megaphone,
  Music2,
  Receipt,
  Server,
  Settings,
  ShieldCheck,
  Wallet,
  CreditCard,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { utilisateurDemo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tableau de bord",
};

const NAVIGATION = [
  {
    section: "Général",
    items: [{ label: "Vue d'ensemble", href: "/dashboard", icone: LayoutDashboard }],
  },
  {
    section: "Services",
    items: [
      { label: "Analyse de site", href: "/dashboard/analyse", icone: Activity },
      { label: "Domaines", href: "/dashboard/domaines", icone: Globe },
      { label: "Hébergement", href: "/dashboard/hebergement", icone: Server },
      { label: "Emails pro", href: "/dashboard/emails", icone: Mail },
      { label: "SEO", href: "/dashboard/seo", icone: LineChart },
      { label: "Facebook Ads", href: "/dashboard/facebook-ads", icone: Megaphone },
      { label: "TikTok Ads", href: "/dashboard/tiktok-ads", icone: Music2 },
    ],
  },
  {
    section: "Finances",
    items: [
      { label: "Dépenses", href: "/dashboard/depenses", icone: Wallet },
      { label: "Factures", href: "/dashboard/factures", icone: Receipt },
      { label: "Paiements", href: "/dashboard/paiements", icone: CreditCard },
    ],
  },
  {
    section: "Compte",
    items: [
      { label: "Support", href: "/dashboard/support", icone: Headphones },
      { label: "Paramètres", href: "/dashboard/parametres", icone: Settings },
      { label: "Espace admin", href: "/admin", icone: ShieldCheck },
    ],
  },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navigation={NAVIGATION}
      titreEspace="Tableau de bord"
      initiales={utilisateurDemo.avatarInitiales}
      nomUtilisateur={utilisateurDemo.nom}
      sousTitreUtilisateur={`Plan ${utilisateurDemo.plan}`}
      accueilHref="/dashboard"
    >
      {children}
    </AppShell>
  );
}
