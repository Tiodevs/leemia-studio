"use server";

import type { BriefForm, BriefingResult } from "@/data/brief";

export async function submitBriefing(
  payload: BriefForm,
): Promise<BriefingResult> {
  const apiUrl = process.env.BRIEFING_API_URL?.replace(/\/$/, "");
  const apiSecret = process.env.BRIEFING_API_SECRET;

  if (!apiUrl || !apiSecret) {
    return {
      ok: false,
      error:
        "O envio está temporariamente indisponível. Tente de novo em alguns minutos.",
    };
  }

  try {
    const response = await fetch(`${apiUrl}/briefings`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiSecret,
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok || !data?.ok) {
      return {
        ok: false,
        error:
          data?.error ||
          "Não foi possível enviar o briefing. Tente novamente.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Falha de conexão ao enviar o briefing. Tente novamente.",
    };
  }
}
