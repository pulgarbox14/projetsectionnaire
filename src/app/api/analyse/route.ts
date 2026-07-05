import { NextResponse } from "next/server";
import { analyserSite } from "@/lib/analyse";

export async function POST(req: Request) {
  const { url } = await req.json().catch(() => ({ url: "" }));
  if (!url || typeof url !== "string" || url.trim().length < 4) {
    return NextResponse.json(
      { erreur: "Veuillez saisir une URL valide, par exemple https://monsite.com" },
      { status: 400 }
    );
  }
  // Petit délai pour un ressenti d'analyse réelle.
  await new Promise((r) => setTimeout(r, 1200));
  return NextResponse.json(analyserSite(url));
}
