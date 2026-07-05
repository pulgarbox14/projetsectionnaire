import { Award, LifeBuoy, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { CarteSection, PageHeader, StatCard } from "@/components/ui";
import { revenusMensuelsAdmin, trafic30Jours } from "@/lib/data";

const revenusParService = [
  { categorie: "Hébergement", montant: 31600000, couleur: "#2563eb" },
  { categorie: "Publicité", montant: 27400000, couleur: "#6366f1" },
  { categorie: "SEO", montant: 21300000, couleur: "#8b5cf6" },
  { categorie: "Domaines", montant: 10500000, couleur: "#0ea5e9" },
  { categorie: "Emails", montant: 6600000, couleur: "#94a3b8" },
];

export default function RapportsPage() {
  return (
    <div>
      <PageHeader
        titre="Statistiques & rapports"
        description="Analyse détaillée de l'activité de la plateforme Nexora."
      />

      <CarteSection titre="Trafic plateforme — 30 jours">
        <LineChart data={trafic30Jours} hauteur={220} />
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Visiteurs uniques quotidiens (en milliers), toutes régions confondues.
        </p>
      </CarteSection>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <CarteSection titre="Revenus mensuels">
          <BarChart
            data={revenusMensuelsAdmin.map((r) => ({ label: r.mois, valeur: r.montant }))}
            unite="FCFA"
          />
        </CarteSection>

        <CarteSection titre="Répartition des revenus par service">
          <DonutChart data={revenusParService} taille={160} />
        </CarteSection>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Taux de conversion"
          valeur="3,8 %"
          variation="+0,4 pt vs juin"
          icone={<TrendingUp size={18} />}
        />
        <StatCard
          label="Churn mensuel"
          valeur="1,2 %"
          variation="-0,3 pt vs juin"
          icone={<TrendingDown size={18} />}
        />
        <StatCard
          label="NPS"
          valeur="62"
          variation="Excellent (> 50)"
          icone={<Award size={18} />}
        />
        <StatCard
          label="Tickets résolus"
          valeur="96 %"
          variation="sous 24 h en moyenne"
          icone={<LifeBuoy size={18} />}
        />
      </div>
    </div>
  );
}
