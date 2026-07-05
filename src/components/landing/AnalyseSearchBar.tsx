"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

export default function AnalyseSearchBar({ grande = false }: { grande?: boolean }) {
  const router = useRouter();
  const [url, setUrl] = useState("");

  function analyser(e: React.FormEvent) {
    e.preventDefault();
    const cible = url.trim() || "monsite.com";
    router.push(`/dashboard/analyse?url=${encodeURIComponent(cible)}`);
  }

  return (
    <form
      onSubmit={analyser}
      className={`flex w-full flex-col gap-3 sm:flex-row ${grande ? "max-w-2xl" : "max-w-xl"}`}
    >
      <div className="relative flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Analysez votre site gratuitement — https://monsite.com"
          className={`input pl-11 ${grande ? "py-3.5 text-base" : ""}`}
          aria-label="URL de votre site web"
        />
      </div>
      <button type="submit" className={`btn-primary shrink-0 ${grande ? "px-7 py-3.5 text-base" : ""}`}>
        <Sparkles size={18} />
        Analyser
      </button>
    </form>
  );
}
