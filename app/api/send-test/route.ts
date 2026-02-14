import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const sendTestPayloadSchema = z.object({
  to: z.string().email(),
  subject: z.string().trim().min(1).max(180),
  html: z.string().trim().min(1),
});

const defaultFrom = "onboarding@resend.dev";

export async function POST(request: Request) {
  let parsedPayload: z.infer<typeof sendTestPayloadSchema>;

  try {
    const payload = await request.json();
    parsedPayload = sendTestPayloadSchema.parse(payload);
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

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "Falta RESEND_API_KEY" }, { status: 500 });
  }

  const from = process.env.EMAIL_FROM?.trim() || defaultFrom;
  const replyTo = process.env.EMAIL_REPLY_TO?.trim();
  const resend = new Resend(apiKey);

  try {
    const sendResult = await resend.emails.send({
      from,
      to: parsedPayload.to,
      subject: parsedPayload.subject,
      html: parsedPayload.html,
      ...(replyTo ? { replyTo } : {}),
    });

    if (sendResult.error) {
      return NextResponse.json({ error: sendResult.error.message || "Error enviando email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, id: sendResult.data?.id ?? null });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo enviar la prueba" },
      { status: 500 },
    );
  }
}
