import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CreditCard,
  Globe,
  LineChart as LineChartIcon,
  Mail,
  Megaphone,
  Server,
} from "lucide-react";
import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { CarteSection, PageHeader, StatCard, Tableau, badgeStatut } from "@/components/ui";
import {
  activitesRecentes,
  depensesMensuelles,
  factures,
  repartitionDepenses,
  statsDashboard,
  trafic30Jours,
  utilisateurDemo,
} from "@/lib/data";

const ICONES_STATS = [Globe, Server, Mail, Megaphone];

const ICONES_ACTIVITE: Record<string, React.ReactNode> = {
  paiement: <CreditCard size={15} />,
  analyse: <Activity size={15} />,
  email: <Mail size={15} />,
  seo: <LineChartIcon size={15} />,
  alerte: <AlertTriangle size={15} />,
};

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        titre={`Bonjour, ${utilisateurDemo.nom.split(" ")[0]} 👋`}
        description="Voici un aperçu de votre présence en ligne aujourd'hui."
        action={
          <Link href="/dashboard/analyse" className="btn-primary">
            <Activity size={17} />
            Nouvelle analyse
          </Link>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsDashboard.map((s, i) => {
          const Icone = ICONES_STATS[i];
          return (
            <StatCard
              key={s.cle}
              label={s.label}
              valeur={s.valeur}
              variation={s.variation}
              icone={<Icone size={18} />}
            />
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <CarteSection titre="Trafic de vos sites — 30 derniers jours" className="xl:col-span-2">
          <LineChart data={trafic30Jours} hauteur={220} />
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Visiteurs uniques quotidiens (en centaines), tous sites confondus.
          </p>
        </CarteSection>
        <CarteSection titre="Répartition des dépenses">
          <DonutChart data={repartitionDepenses} taille={150} />
        </CarteSection>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <CarteSection titre="Dépenses mensuelles" className="xl:col-span-2">
          <BarChart
            data={depensesMensuelles.map((d) => ({ label: d.mois, valeur: d.montant }))}
            format={(v) => `${v} €`}
          />
        </CarteSection>
        <CarteSection titre="Activités récentes">
          <ul className="space-y-4">
            {activitesRecentes.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl ${
                    a.type === "alerte"
                      ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      : "bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300"
                  }`}
                >
                  {ICONES_ACTIVITE[a.type]}
                </span>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{a.texte}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{a.temps}</p>
                </div>
              </li>
            ))}
          </ul>
        </CarteSection>
      </div>

      <div className="mt-6">
        <CarteSection
          titre="Dernières factures"
          action={
            <Link
              href="/dashboard/factures"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              Tout voir <ArrowRight size={14} />
            </Link>
          }
        >
          <Tableau entetes={["Référence", "Date", "Description", "Montant", "Statut"]}>
            {factures.slice(0, 4).map((f) => (
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
