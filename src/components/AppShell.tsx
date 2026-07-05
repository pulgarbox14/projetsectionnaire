"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Bell, LogOut, Menu, X, type LucideIcon } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { notifications } from "@/lib/data";

export interface NavItem {
  label: string;
  href: string;
  icone: LucideIcon;
}

export default function AppShell({
  navigation,
  titreEspace,
  initiales,
  nomUtilisateur,
  sousTitreUtilisateur,
  accueilHref,
  children,
}: {
  navigation: { section: string; items: NavItem[] }[];
  titreEspace: string;
  initiales: string;
  nomUtilisateur: string;
  sousTitreUtilisateur: string;
  accueilHref: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [notifOuvert, setNotifOuvert] = useState(false);

  const nav = (
    <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
      {navigation.map((groupe) => (
        <div key={groupe.section}>
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            {groupe.section}
          </p>
          <ul className="space-y-0.5">
            {groupe.items.map((item) => {
              const actif =
                pathname === item.href ||
                (item.href !== accueilHref && pathname.startsWith(item.href + "/"));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOuvert(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                      actif
                        ? "bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`}
                  >
                    <item.icone size={18} className={actif ? "text-brand-600 dark:text-brand-400" : ""} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar bureau */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:flex">
        <div className="flex h-16 items-center border-b border-gray-200 px-5 dark:border-gray-800">
          <Logo href={accueilHref} />
        </div>
        {nav}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 text-sm font-bold text-white">
              {initiales}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">{nomUtilisateur}</p>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">{sousTitreUtilisateur}</p>
            </div>
            <Link href="/" aria-label="Se déconnecter" className="ml-auto text-gray-400 hover:text-red-500">
              <LogOut size={17} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Menu mobile */}
      {menuOuvert && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-gray-900/50" onClick={() => setMenuOuvert(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white dark:bg-gray-900">
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-5 dark:border-gray-800">
              <Logo href={accueilHref} />
              <button onClick={() => setMenuOuvert(false)} aria-label="Fermer le menu" className="text-gray-500">
                <X size={20} />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      {/* Contenu */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/80 px-4 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80 sm:px-6">
          <button
            onClick={() => setMenuOuvert(true)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-300 lg:hidden"
            aria-label="Ouvrir le menu"
          >
            <Menu size={18} />
          </button>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{titreEspace}</p>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotifOuvert(!notifOuvert)}
                aria-label="Notifications"
                className="relative grid h-9 w-9 place-items-center rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Bell size={17} />
                <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {notifications.filter((n) => !n.lu).length}
                </span>
              </button>
              {notifOuvert && (
                <div className="absolute right-0 top-12 w-80 max-w-[85vw] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card-hover dark:border-gray-700 dark:bg-gray-900">
                  <p className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 dark:border-gray-800 dark:text-white">
                    Notifications
                  </p>
                  <ul className="max-h-80 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800">
                    {notifications.map((n, i) => (
                      <li key={i} className={`px-4 py-3 ${n.lu ? "" : "bg-brand-50/50 dark:bg-brand-900/10"}`}>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{n.titre}</p>
                        <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">{n.texte}</p>
                        <p className="mt-1 text-[11px] text-gray-400">{n.temps}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ThemeToggle />
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-600 to-indigo-600 text-xs font-bold text-white lg:hidden">
              {initiales}
            </span>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
