"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Globe,
  Smartphone,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CarteSection, PageHeader, Tableau, badgeStatut } from "@/components/ui";
import { methodesPaiement, paiements } from "@/lib/data";
import { fcfa } from "@/lib/devise";

const ICONES_METHODES: Record<string, LucideIcon> = {
  "Carte bancaire": CreditCard,
  Stripe: CreditCard,
  PayPal: Wallet,
  Flutterwave: Globe,
  Paystack: Globe,
  "Orange Money": Smartphone,
  "MTN Mobile Money": Smartphone,
  Wave: Smartphone,
  "Apple Pay": Wallet,
  "Google Pay": Wallet,
};

const METHODES_ACTIVES = ["Carte bancaire", "Stripe", "PayPal"];

export default function PaiementsPage() {
  const [methode, setMethode] = useState<string>(methodesPaiement[0]);
  const [numero, setNumero] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const totalPaiements = paiements.reduce((somme, p) => somme + p.montant, 0);

  function enregistrerMethode(e: React.FormEvent) {
    e.preventDefault();
    setConfirmation(`Le moyen de paiement « ${methode} » a bien été enregistré ✓`);
    setNumero("");
    setExpiration("");
    setCvc("");
  }

  return (
    <div>
      <PageHeader
        titre="Paiements"
        description="Gérez vos moyens de paiement et consultez l'historique de vos transactions."
      />

      <CarteSection titre="Moyens de paiement disponibles">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {methodesPaiement.map((m) => {
            const Icone = ICONES_METHODES[m] ?? Globe;
            const active = METHODES_ACTIVES.includes(m);
            return (
              <div
                key={m}
                className="card card-hover flex flex-col items-start gap-3 p-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300">
                  <Icone size={19} />
                </span>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{m}</p>
                <span className={active ? "badge-green" : "badge-blue"}>
                  {active ? "Actif" : "Disponible"}
                </span>
              </div>
            );
          })}
        </div>
      </CarteSection>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <CarteSection titre="Historique des paiements" className="xl:col-span-2">
          <Tableau entetes={["Référence", "Date", "Méthode", "Montant", "Statut"]}>
            {paiements.map((p) => (
              <tr key={p.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{p.id}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{p.date}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{p.methode}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {fcfa(p.montant)}
                </td>
                <td className="py-3">
                  <span className={badgeStatut(p.statut)}>{p.statut}</span>
                </td>
              </tr>
            ))}
            <tr className="border-t border-gray-200 dark:border-gray-800">
              <td colSpan={3} className="py-3 pr-4 text-sm font-semibold text-gray-900 dark:text-white">
                Total
              </td>
              <td className="py-3 pr-4 font-bold text-gray-900 dark:text-white">
                {fcfa(totalPaiements)}
              </td>
              <td className="py-3" />
            </tr>
          </Tableau>
        </CarteSection>

        <CarteSection titre="Ajouter un moyen de paiement">
          <form onSubmit={enregistrerMethode} className="space-y-4">
            <div>
              <label htmlFor="pay-methode" className="label">
                Méthode
              </label>
              <select
                id="pay-methode"
                value={methode}
                onChange={(e) => setMethode(e.target.value)}
                className="input"
              >
                {methodesPaiement.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pay-numero" className="label">
                Numéro de carte
              </label>
              <input
                id="pay-numero"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pay-expiration" className="label">
                  Expiration
                </label>
                <input
                  id="pay-expiration"
                  type="text"
                  autoComplete="off"
                  value={expiration}
                  onChange={(e) => setExpiration(e.target.value)}
                  placeholder="MM/AA"
                  className="input"
                />
              </div>
              <div>
                <label htmlFor="pay-cvc" className="label">
                  CVC
                </label>
                <input
                  id="pay-cvc"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  className="input"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              <CreditCard size={16} /> Enregistrer
            </button>
            {confirmation && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                <CheckCircle2 size={15} className="shrink-0" /> {confirmation}
              </p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Démonstration : aucune donnée bancaire n&apos;est réellement enregistrée.
            </p>
          </form>
        </CarteSection>
      </div>
    </div>
  );
}
