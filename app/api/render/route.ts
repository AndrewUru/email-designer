import { NextResponse } from "next/server";

import { compileMjmlToInlinedHtml } from "@/lib/email/compiler";
import type { RenderRequest } from "@/lib/email/render-contract";
import { templateToMjml } from "@/lib/email/template-to-mjml";

export const runtime = "nodejs";

const isRenderRequest = (value: unknown): value is RenderRequest => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const mode = (value as { mode?: unknown }).mode;
  if (mode === "template") {
    return "template" in value;
  }
  if (mode === "mjml") {
    return typeof (value as { mjml?: unknown }).mjml === "string";
  }

  return false;
};

export async function POST(request: Request) {
  try {
    const payload: unknown = await request.json();

    if (!isRenderRequest(payload)) {
      return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
    }

    const mjml = payload.mode === "template" ? templateToMjml(payload.template) : payload.mjml;
    const result = await compileMjmlToInlinedHtml(mjml);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la solicitud" }, { status: 500 });
  }
}
