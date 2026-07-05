import { ArrowLeftRight, CheckCircle2, ShoppingBag, Wallet } from "lucide-react";
import { CarteSection, PageHeader, StatCard, Tableau, badgeStatut } from "@/components/ui";
import { factures, paiements } from "@/lib/data";

export default function PaiementsPage() {
  const reussis = paiements.filter((p) => p.statut === "Réussi");
  const volume = reussis.reduce((a, p) => a + p.montant, 0);
  const tauxReussite = Math.round((reussis.length / paiements.length) * 100);
  const panierMoyen = reussis.length > 0 ? volume / reussis.length : 0;

  return (
    <div>
      <PageHeader
        titre="Paiements & factures"
        description="Suivi des transactions et de la facturation de la plateforme."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Volume encaissé"
          valeur={`${volume.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`}
          variation={`${reussis.length} paiements réussis`}
          icone={<Wallet size={18} />}
        />
        <StatCard
          label="Transactions"
          valeur={`${paiements.length}`}
          variation="30 derniers jours"
          icone={<ArrowLeftRight size={18} />}
        />
        <StatCard
          label="Taux de réussite"
          valeur={`${tauxReussite} %`}
          variation={`${paiements.length - reussis.length} échec(s)`}
          icone={<CheckCircle2 size={18} />}
        />
        <StatCard
          label="Panier moyen"
          valeur={`${panierMoyen.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €`}
          variation="par transaction réussie"
          icone={<ShoppingBag size={18} />}
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <CarteSection titre="Transactions">
          <Tableau entetes={["Référence", "Date", "Méthode", "Montant", "Statut"]}>
            {paiements.map((p) => (
              <tr key={p.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{p.id}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{p.date}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{p.methode}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {p.montant.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3">
                  <span className={badgeStatut(p.statut)}>{p.statut}</span>
                </td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>

        <CarteSection titre="Factures émises">
          <Tableau entetes={["Référence", "Date", "Description", "Montant", "Statut"]}>
            {factures.map((f) => (
              <tr key={f.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{f.id}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{f.date}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{f.description}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {f.montant.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3">
                  <span className={badgeStatut(f.statut)}>{f.statut}</span>
                </td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>
      </div>
    </div>
  );
}
