"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [sombre, setSombre] = useState(false);
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setMonte(true);
    setSombre(document.documentElement.classList.contains("dark"));
  }, []);

  function basculer() {
    const prochain = !sombre;
    setSombre(prochain);
    document.documentElement.classList.toggle("dark", prochain);
    try {
      localStorage.setItem("nexora-theme", prochain ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      onClick={basculer}
      aria-label="Basculer le thème"
      className="grid h-9 w-9 place-items-center rounded-xl border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      {monte ? (sombre ? <Sun size={17} /> : <Moon size={17} />) : <Moon size={17} />}
    </button>
  );
}
