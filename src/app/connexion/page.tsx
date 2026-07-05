"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn } from "lucide-react";
import AuthShell from "@/components/AuthShell";

export default function ConnexionPage() {
  const router = useRouter();
  const [chargement, setChargement] = useState(false);

  function connexion(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    setTimeout(() => router.push("/dashboard"), 600);
  }

  return (
    <AuthShell
      titre="Bon retour parmi nous"
      soustitre="Connectez-vous pour accéder à votre tableau de bord."
      bas={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Créer un compte gratuit
          </Link>
        </>
      }
    >
      <form onSubmit={connexion} className="space-y-5">
        <div>
          <label htmlFor="email" className="label">Adresse email</label>
          <input id="email" type="email" required placeholder="vous@entreprise.com" className="input" defaultValue="aicha@entreprise.com" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="mdp" className="label">Mot de passe</label>
            <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
              Mot de passe oublié ?
            </a>
          </div>
          <input id="mdp" type="password" required placeholder="••••••••" className="input" defaultValue="demo1234" />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          Se souvenir de moi
        </label>
        <button type="submit" disabled={chargement} className="btn-primary w-full py-3">
          <LogIn size={18} />
          {chargement ? "Connexion en cours…" : "Se connecter"}
        </button>
        <p className="rounded-xl bg-brand-50 p-3 text-center text-xs text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
          Démo : cliquez simplement sur « Se connecter » pour découvrir le tableau de bord.
        </p>
      </form>
    </AuthShell>
  );
}
