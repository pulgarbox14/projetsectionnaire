import Link from "next/link";

export default function Logo({
  href = "/",
  taille = "md",
}: {
  href?: string;
  taille?: "md" | "lg";
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <span
        className={`grid place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-indigo-600 text-white font-bold shadow-card group-hover:shadow-card-hover transition-shadow ${
          taille === "lg" ? "h-11 w-11 text-xl" : "h-9 w-9 text-lg"
        }`}
      >
        N
      </span>
      <span
        className={`font-bold tracking-tight text-gray-900 dark:text-white ${
          taille === "lg" ? "text-2xl" : "text-xl"
        }`}
      >
        Nexora
      </span>
    </Link>
  );
}
