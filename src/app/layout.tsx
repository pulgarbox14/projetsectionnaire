import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nexora — Votre présence en ligne, unifiée",
    template: "%s · Nexora",
  },
  description:
    "Analysez votre site web, achetez votre nom de domaine, hébergez votre site, créez vos emails professionnels, lancez vos campagnes Facebook Ads et TikTok Ads et améliorez votre SEO — depuis une seule plateforme.",
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("nexora-theme");
    if (t === "dark" || (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
