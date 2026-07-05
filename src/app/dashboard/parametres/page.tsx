"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, KeyRound, Save, Trash2 } from "lucide-react";
import { CarteSection, PageHeader } from "@/components/ui";
import { utilisateurDemo } from "@/lib/data";

// Petit interrupteur (switch) maison, stylé Tailwind, sans dépendance.
function Interrupteur({
  actif,
  onChange,
  ariaLabel,
}: {
  actif: boolean;
  onChange: (valeur: boolean) => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={actif}
      aria-label={ariaLabel}
      onClick={() => onChange(!actif)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
        actif ? "bg-brand-600" : "bg-gray-200 dark:bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow transition-transform ${
          actif ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

const NOTIFICATIONS = [
  { cle: "facturation", label: "Emails de facturation", description: "Recevoir chaque facture par email dès son émission." },
  { cle: "domaines", label: "Alertes d'expiration de domaine", description: "Être prévenu 30 jours avant l'expiration d'un domaine." },
  { cle: "seo", label: "Rapports SEO mensuels", description: "Recevoir un rapport de positionnement chaque début de mois." },
  { cle: "produit", label: "Nouveautés produit", description: "Être informé des nouvelles fonctionnalités Nexora." },
] as const;

type CleNotification = (typeof NOTIFICATIONS)[number]["cle"];

export default function ParametresPage() {
  // — Profil —
  const [nom, setNom] = useState(utilisateurDemo.nom);
  const [email, setEmail] = useState(utilisateurDemo.email);
  const [entreprise, setEntreprise] = useState(utilisateurDemo.entreprise);
  const [telephone, setTelephone] = useState("+229 01 97 00 00 00");
  const [adresse, setAdresse] = useState("Cotonou, Bénin");
  const [messageProfil, setMessageProfil] = useState("");

  // — Sécurité —
  const [mdpActuel, setMdpActuel] = useState("");
  const [mdpNouveau, setMdpNouveau] = useState("");
  const [mdpConfirmation, setMdpConfirmation] = useState("");
  const [messageMdp, setMessageMdp] = useState("");
  const [erreurMdp, setErreurMdp] = useState("");
  const [deuxFacteurs, setDeuxFacteurs] = useState(false);

  // — Notifications —
  const [prefs, setPrefs] = useState<Record<CleNotification, boolean>>({
    facturation: true,
    domaines: true,
    seo: true,
    produit: false,
  });

  function enregistrerProfil(e: React.FormEvent) {
    e.preventDefault();
    setMessageProfil("Profil mis à jour ✓");
  }

  function changerMotDePasse(e: React.FormEvent) {
    e.preventDefault();
    setMessageMdp("");
    setErreurMdp("");
    if (mdpNouveau.length < 8) {
      setErreurMdp("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    if (mdpNouveau !== mdpConfirmation) {
      setErreurMdp("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }
    setMessageMdp("Mot de passe modifié ✓");
    setMdpActuel("");
    setMdpNouveau("");
    setMdpConfirmation("");
  }

  function supprimerCompte() {
    const premiere = window.confirm(
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    );
    if (!premiere) return;
    const seconde = window.confirm(
      "Dernière confirmation : tous vos domaines, sites, emails et données seront définitivement supprimés. Continuer ?"
    );
    if (seconde) {
      window.alert("Demande de suppression enregistrée. Notre équipe vous contactera sous 24 h.");
    }
  }

  return (
    <div>
      <PageHeader
        titre="Paramètres"
        description="Gérez votre profil, votre sécurité et vos préférences."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <CarteSection titre="Profil">
          <form onSubmit={enregistrerProfil} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="prof-nom" className="label">
                  Nom complet
                </label>
                <input
                  id="prof-nom"
                  type="text"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="prof-email" className="label">
                  Email
                </label>
                <input
                  id="prof-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="prof-entreprise" className="label">
                  Entreprise
                </label>
                <input
                  id="prof-entreprise"
                  type="text"
                  value={entreprise}
                  onChange={(e) => setEntreprise(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="prof-telephone" className="label">
                  Téléphone
                </label>
                <input
                  id="prof-telephone"
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className="input"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="prof-adresse" className="label">
                  Adresse
                </label>
                <input
                  id="prof-adresse"
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button type="submit" className="btn-primary">
                <Save size={16} /> Enregistrer
              </button>
              {messageProfil && (
                <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={15} /> {messageProfil}
                </p>
              )}
            </div>
          </form>
        </CarteSection>

        <CarteSection titre="Sécurité">
          <form onSubmit={changerMotDePasse} className="space-y-4">
            <div>
              <label htmlFor="sec-actuel" className="label">
                Mot de passe actuel
              </label>
              <input
                id="sec-actuel"
                type="password"
                required
                autoComplete="current-password"
                value={mdpActuel}
                onChange={(e) => setMdpActuel(e.target.value)}
                className="input"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="sec-nouveau" className="label">
                  Nouveau mot de passe
                </label>
                <input
                  id="sec-nouveau"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={mdpNouveau}
                  onChange={(e) => setMdpNouveau(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="sec-confirmation" className="label">
                  Confirmation
                </label>
                <input
                  id="sec-confirmation"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={mdpConfirmation}
                  onChange={(e) => setMdpConfirmation(e.target.value)}
                  className="input"
                />
              </div>
            </div>
            {erreurMdp && (
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{erreurMdp}</p>
            )}
            {messageMdp && (
              <p className="flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={15} /> {messageMdp}
              </p>
            )}
            <button type="submit" className="btn-secondary">
              <KeyRound size={16} /> Changer le mot de passe
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4 dark:border-gray-800">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Authentification à deux facteurs
              </p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Ajoutez une couche de sécurité supplémentaire à votre compte.
              </p>
            </div>
            <Interrupteur
              actif={deuxFacteurs}
              onChange={setDeuxFacteurs}
              ariaLabel="Activer l'authentification à deux facteurs"
            />
          </div>
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection titre="Préférences de notifications">
          <ul className="divide-y divide-gray-100 dark:divide-gray-800/70">
            {NOTIFICATIONS.map((n) => (
              <li key={n.cle} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{n.label}</p>
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{n.description}</p>
                </div>
                <Interrupteur
                  actif={prefs[n.cle]}
                  onChange={(valeur) => setPrefs((prec) => ({ ...prec, [n.cle]: valeur }))}
                  ariaLabel={n.label}
                />
              </li>
            ))}
          </ul>
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection
          titre="Zone dangereuse"
          className="border-red-200 dark:border-red-900/50"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Supprimer mon compte
                </p>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                  Cette action supprimera définitivement vos domaines, sites, emails et données.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={supprimerCompte}
              className="btn bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
            >
              <Trash2 size={16} /> Supprimer mon compte
            </button>
          </div>
        </CarteSection>
      </div>
    </div>
  );
}
