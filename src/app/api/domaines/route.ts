import { NextResponse } from "next/server";
import { rechercherDomaine } from "@/lib/analyse";

export async function POST(req: Request) {
  const { nom } = await req.json().catch(() => ({ nom: "" }));
  if (!nom || typeof nom !== "string" || nom.trim().length < 2) {
    return NextResponse.json(
      { erreur: "Veuillez saisir un nom de domaine, par exemple entreprise" },
      { status: 400 }
    );
  }
  await new Promise((r) => setTimeout(r, 700));
  return NextResponse.json({ resultats: rechercherDomaine(nom) });
}
