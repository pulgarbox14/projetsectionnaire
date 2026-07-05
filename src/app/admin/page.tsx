import Link from "next/link";
import { ArrowRight, LifeBuoy, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { BarChart } from "@/components/charts";
import { CarteSection, PageHeader, StatCard, Tableau, badgeStatut } from "@/components/ui";
import { commandesAdmin, logsAdmin, revenusMensuelsAdmin, statsAdmin } from "@/lib/data";

const ICONES_STATS = [Users, TrendingUp, ShoppingCart, LifeBuoy];

const COULEURS_NIVEAU: Record<string, string> = {
  info: "bg-blue-500",
  warn: "bg-amber-500",
  error: "bg-red-500",
};

export default function AdminPage() {
  return (
    <div>
      <PageHeader
        titre="Vue d'ensemble"
        description="Pilotage de la plateforme Nexora"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsAdmin.map((s, i) => {
          const Icone = ICONES_STATS[i];
          return (
            <StatCard
              key={s.label}
              label={s.label}
              valeur={s.valeur}
              variation={s.variation}
              icone={<Icone size={18} />}
            />
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <CarteSection titre="Revenus mensuels (MRR)">
          <BarChart
            data={revenusMensuelsAdmin.map((r) => ({ label: r.mois, valeur: r.montant }))}
            format={(v) => `${Math.round(v / 1000)} k€`}
          />
        </CarteSection>

        <CarteSection titre="Dernières commandes">
          <Tableau entetes={["Référence", "Client", "Service", "Montant", "Statut"]}>
            {commandesAdmin.slice(0, 5).map((c) => (
              <tr key={c.id}>
                <td className="py-3 pr-4 font-medium text-gray-900 dark:text-white">{c.id}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-gray-300">{c.client}</td>
                <td className="py-3 pr-4 text-gray-500 dark:text-gray-400">{c.service}</td>
                <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">
                  {c.montant.toLocaleString("fr-FR")} €
                </td>
                <td className="py-3">
                  <span className={badgeStatut(c.statut)}>{c.statut}</span>
                </td>
              </tr>
            ))}
          </Tableau>
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection
          titre="Derniers logs"
          action={
            <Link
              href="/admin/logs"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Tout voir <ArrowRight size={14} />
            </Link>
          }
        >
          <ul className="space-y-3">
            {logsAdmin.slice(0, 3).map((l, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${
                    COULEURS_NIVEAU[l.niveau] ?? "bg-gray-400"
                  }`}
                />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{l.message}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{l.temps}</p>
                </div>
              </li>
            ))}
          </ul>
        </CarteSection>
      </div>
    </div>
  );
}
