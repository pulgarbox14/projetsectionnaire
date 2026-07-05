"use client";

import {
  ArrowLeftCircle,
  BarChart3,
  LayoutDashboard,
  ScrollText,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";
import AppShell from "@/components/AppShell";

const NAVIGATION = [
  {
    section: "Pilotage",
    items: [
      { label: "Vue d'ensemble", href: "/admin", icone: LayoutDashboard },
      { label: "Statistiques & rapports", href: "/admin/rapports", icone: BarChart3 },
    ],
  },
  {
    section: "Gestion",
    items: [
      { label: "Utilisateurs & clients", href: "/admin/utilisateurs", icone: Users },
      { label: "Commandes", href: "/admin/commandes", icone: ShoppingCart },
      { label: "Paiements & factures", href: "/admin/paiements", icone: Wallet },
    ],
  },
  {
    section: "Système",
    items: [
      { label: "Logs", href: "/admin/logs", icone: ScrollText },
      { label: "Paramètres", href: "/admin/parametres", icone: Settings },
      { label: "Retour au dashboard", href: "/dashboard", icone: ArrowLeftCircle },
    ],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      navigation={NAVIGATION}
      titreEspace="Administration Nexora"
      initiales="AD"
      nomUtilisateur="Administrateur"
      sousTitreUtilisateur="Super admin"
      accueilHref="/admin"
    >
      {children}
    </AppShell>
  );
}
