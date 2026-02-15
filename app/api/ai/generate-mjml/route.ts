import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

import { compileMjmlToInlinedHtml } from "@/lib/email/compiler";

export const runtime = "nodejs";

const generateMjmlPayloadSchema = z.object({
  brief: z.string().trim().min(20).max(2000),
  productName: z.string().trim().max(120).optional(),
  targetAudience: z.string().trim().max(180).optional(),
  tone: z.string().trim().max(80).optional(),
  language: z.string().trim().max(40).optional(),
});

const aiOutputSchema = z.object({
  subject: z.string().trim().min(1).max(180),
  previewText: z.union([z.string().trim().min(1).max(200), z.null()]),
  mjml: z.string().trim().min(20),
});

const outputFormatSchema: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  properties: {
    subject: { type: "string", minLength: 1, maxLength: 180 },
    previewText: {
      anyOf: [
        { type: "string", minLength: 1, maxLength: 200 },
        { type: "null" },
      ],
    },
    mjml: { type: "string", minLength: 20 },
  },
  required: ["subject", "previewText", "mjml"],
};

const normalizeOptional = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const buildUserPrompt = (payload: z.infer<typeof generateMjmlPayloadSchema>): string => {
  const details = [
    `Brief: ${payload.brief}`,
    `Producto: ${normalizeOptional(payload.productName) ?? "No especificado"}`,
    `Audiencia: ${normalizeOptional(payload.targetAudience) ?? "No especificada"}`,
    `Tono: ${normalizeOptional(payload.tone) ?? "Profesional y cercano"}`,
    `Idioma: ${normalizeOptional(payload.language) ?? "es"}`,
  ];

  return details.join("\n");
};

const systemPrompt = [
  "Eres un especialista en email marketing con MJML.",
  "Tu salida debe ser util para compilacion directa en MJML.",
  "Reglas obligatorias:",
  "1) Devuelve un objeto JSON que cumpla el esquema solicitado.",
  "2) El campo mjml debe incluir un documento completo que empiece con <mjml> y termine con </mjml>.",
  "3) No incluyas markdown, ni explicaciones, ni texto fuera del JSON.",
  "4) Usa contenido realista para marketing y CTA claro.",
  "5) Incluye siempre previewText. Si no aplica, usa null.",
].join("\n");

const stripMarkdownFence = (value: string): string => {
  const trimmed = value.trim();
  return trimmed.replace(/^```(?:mjml|xml|html)?\s*/i, "").replace(/\s*```$/i, "").trim();
};

const extractMjmlDocument = (value: string): string => {
  const withoutFence = stripMarkdownFence(value);
  const match = withoutFence.match(/<mjml[\s\S]*<\/mjml>/i);
  return (match?.[0] ?? withoutFence).trim();
};

export async function POST(request: Request) {
  let parsedPayload: z.infer<typeof generateMjmlPayloadSchema>;

  try {
    const payload = await request.json();
    parsedPayload = generateMjmlPayloadSchema.parse(payload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Payload invalido",
          fields: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({ error: "No se pudo parsear el payload" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Falta OPENAI_API_KEY" }, { status: 500 });
  }

  const model = process.env.OPENAI_MODEL?.trim() || "gpt-4.1-mini";
  const client = new OpenAI({ apiKey });

  try {
    const response = await client.responses.create({
      model,
      input: [
        { role: "system", content: systemPrompt },
        { role: "user", content: buildUserPrompt(parsedPayload) },
      ],
      max_output_tokens: 2600,
      text: {
        format: {
          type: "json_schema",
          name: "email_mjml_output",
          strict: true,
          schema: outputFormatSchema,
        },
      },
    });

    const rawOutput = response.output_text?.trim();
    if (!rawOutput) {
      return NextResponse.json({ error: "La IA no devolvio contenido util" }, { status: 502 });
    }

    let parsedOutput: unknown;
    try {
      parsedOutput = JSON.parse(rawOutput);
    } catch {
      return NextResponse.json({ error: "La IA devolvio un formato no valido" }, { status: 502 });
    }

    const aiOutput = aiOutputSchema.parse(parsedOutput);
    const mjml = extractMjmlDocument(aiOutput.mjml);
    const renderResult = await compileMjmlToInlinedHtml(mjml);
    const warnings = renderResult.errors ?? [];

    if (!renderResult.html.trim()) {
      return NextResponse.json(
        {
          error: "Se genero MJML invalido",
          warnings,
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      subject: aiOutput.subject,
      previewText: aiOutput.previewText,
      mjml,
      warnings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "No se pudo generar el MJML con IA",
      },
      { status: 500 },
    );
  }
}
