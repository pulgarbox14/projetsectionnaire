"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import AuthShell from "@/components/AuthShell";

export default function InscriptionPage() {
  const router = useRouter();
  const [chargement, setChargement] = useState(false);

  function inscrire(e: React.FormEvent) {
    e.preventDefault();
    setChargement(true);
    setTimeout(() => router.push("/dashboard"), 800);
  }

  return (
    <AuthShell
      titre="Créez votre compte gratuit"
      soustitre="Aucune carte bancaire requise. Prêt en moins d'une minute."
      bas={
        <>
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={inscrire} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="nom" className="label">Nom complet</label>
            <input id="nom" type="text" required placeholder="Aïcha Koudjo" className="input" />
          </div>
          <div>
            <label htmlFor="entreprise" className="label">Entreprise</label>
            <input id="entreprise" type="text" placeholder="Entreprise SARL" className="input" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="label">Adresse email</label>
          <input id="email" type="email" required placeholder="vous@entreprise.com" className="input" />
        </div>
        <div>
          <label htmlFor="mdp" className="label">Mot de passe</label>
          <input id="mdp" type="password" required minLength={8} placeholder="8 caractères minimum" className="input" />
        </div>
        <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
          <span>
            J'accepte les{" "}
            <a href="#" className="font-medium text-brand-600 hover:underline dark:text-brand-400">conditions d'utilisation</a>{" "}
            et la{" "}
            <a href="#" className="font-medium text-brand-600 hover:underline dark:text-brand-400">politique de confidentialité</a>.
          </span>
        </label>
        <button type="submit" disabled={chargement} className="btn-primary w-full py-3">
          <UserPlus size={18} />
          {chargement ? "Création du compte…" : "Créer mon compte gratuit"}
        </button>
      </form>
    </AuthShell>
  );
}
