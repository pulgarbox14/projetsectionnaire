import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { BadgeCheck } from "lucide-react";

const ARGUMENTS = [
  "Analyse gratuite de votre site en 60 secondes",
  "Domaines, hébergement et emails pro au même endroit",
  "Campagnes Facebook & TikTok gérées par des experts",
  "Paiements locaux : Mobile Money, Wave, cartes…",
];

export default function AuthShell({
  titre,
  soustitre,
  children,
  bas,
}: {
  titre: string;
  soustitre: string;
  children: React.ReactNode;
  bas: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {titre}
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{soustitre}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">{bas}</div>
        </div>
        <p className="text-center text-xs text-gray-400">
          © 2026 Nexora ·{" "}
          <Link href="/" className="hover:text-brand-600">
            Retour à l'accueil
          </Link>
        </p>
      </div>
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-700 lg:flex lg:flex-col lg:justify-center lg:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.15),transparent_55%)]" />
        <h2 className="max-w-md text-3xl font-extrabold leading-tight text-white">
          Votre présence en ligne, unifiée.
        </h2>
        <ul className="mt-8 space-y-4">
          {ARGUMENTS.map((a) => (
            <li key={a} className="flex items-start gap-3 text-brand-50">
              <BadgeCheck size={20} className="mt-0.5 shrink-0 text-emerald-300" />
              {a}
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-md rounded-2xl bg-white/10 p-5 text-sm text-brand-50 backdrop-blur">
          « Je gérais cinq prestataires, aujourd'hui un seul tableau de bord suffit. »
          <span className="mt-2 block font-semibold text-white">
            Pierre L. — Directeur de cabinet, Lyon
          </span>
        </p>
      </div>
    </div>
  );
}
