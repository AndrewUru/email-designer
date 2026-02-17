"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { type FormEvent, useMemo, useState } from "react";

import { EmailPreview } from "@/components/editor/email-preview";
import { ExportActions } from "@/components/editor/export-actions";
import { useRenderHtml } from "@/hooks/use-render-html";
import type { RenderRequest } from "@/lib/email/render-contract";
import { templateToMjml } from "@/lib/email/template-to-mjml";
import { useEmailStore } from "@/store/email-store";

const MonacoEditor = dynamic(
  () => import("@monaco-editor/react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-blue-300/20 bg-[#08162d] p-4 text-sm text-blue-100/70">
        Cargando editor...
      </div>
    ),
  },
);

interface GenerateMjmlPayload {
  subject: string;
  previewText: string | null;
  mjml: string;
  warnings?: string[];
  error?: string;
}

const MIN_BRIEF_LENGTH = 20;

export function CodeEditorView() {
  const template = useEmailStore((state) => state.template);
  const [mjml, setMjml] = useState(() => templateToMjml(template));
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiBrief, setAiBrief] = useState("");
  const [aiProductName, setAiProductName] = useState("");
  const [aiTargetAudience, setAiTargetAudience] = useState("");
  const [aiTone, setAiTone] = useState("");
  const [aiLanguage, setAiLanguage] = useState("es");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiStatus, setAiStatus] = useState<string | null>(null);
  const [aiSuggestedSubject, setAiSuggestedSubject] = useState<string | null>(
    null,
  );

  const renderRequest = useMemo<RenderRequest>(
    () => ({ mode: "mjml", mjml }),
    [mjml],
  );
  const { html, errors, isLoading, errorMessage } =
    useRenderHtml(renderRequest);
  const canGenerateAi =
    aiBrief.trim().length >= MIN_BRIEF_LENGTH && !isGeneratingAi;

  const resetAiForm = () => {
    setAiBrief("");
    setAiProductName("");
    setAiTargetAudience("");
    setAiTone("");
    setAiLanguage("es");
  };

  const handleGenerateAi = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canGenerateAi) {
      return;
    }

    setIsGeneratingAi(true);
    setAiSuggestedSubject(null);
    setAiStatus("Generando MJML con IA...");

    try {
      const response = await fetch("/api/ai/generate-mjml", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          brief: aiBrief.trim(),
          productName: aiProductName.trim() || undefined,
          targetAudience: aiTargetAudience.trim() || undefined,
          tone: aiTone.trim() || undefined,
          language: aiLanguage.trim() || undefined,
        }),
      });

      const payload = (await response.json()) as GenerateMjmlPayload;
      if (!response.ok || !payload.mjml) {
        throw new Error(payload.error ?? "No se pudo generar MJML con IA.");
      }

      setMjml(payload.mjml);
      setAiSuggestedSubject(payload.subject);
      setAiStatus(
        payload.warnings && payload.warnings.length > 0
          ? `MJML generado con ${payload.warnings.length} advertencias de compilacion.`
          : "MJML generado con IA y cargado en el editor.",
      );
      setIsAiModalOpen(false);
      resetAiForm();
    } catch (error) {
      setAiStatus(
        error instanceof Error
          ? error.message
          : "No se pudo generar MJML con IA.",
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-5 text-blue-50">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-300/20 bg-[#091429]/85 px-4 py-3 shadow-[0_14px_28px_-16px_rgba(0,0,0,0.85)] backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold">
              Email Designer - Pro (MJML)
            </h1>
            <p className="text-sm text-blue-100/70">
              Edita MJML directamente y exporta HTML inline.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/code/templates"
              className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-50 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Ver templates MJML
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-50 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
            >
              Volver a No-code
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_460px]">
          <section className="rounded-2xl border border-blue-300/20 bg-[#0a1a34] p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMjml(templateToMjml(template))}
                className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-50 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Cargar MJML desde No-code
              </button>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(true)}
                className="rounded-lg border border-emerald-300/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              >
                Generar con IA
              </button>
              <span className="text-xs text-blue-100/70">
                SSR safe: Monaco con dynamic import (`ssr: false`).
              </span>
            </div>
            <p className="mb-3 text-xs text-blue-100/70">
              {aiStatus ??
                (aiSuggestedSubject
                  ? `Asunto sugerido por IA: ${aiSuggestedSubject}`
                  : "Puedes generar un primer borrador de MJML desde un brief.")}
            </p>

            <MonacoEditor
              height="620px"
              defaultLanguage="xml"
              language="xml"
              value={mjml}
              onChange={(value) => setMjml(value ?? "")}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
                tabSize: 2,
                smoothScrolling: true,
                automaticLayout: true,
              }}
            />
          </section>

          <section className="space-y-4">
            <EmailPreview
              html={html}
              isLoading={isLoading}
              errors={errors}
              errorMessage={errorMessage}
            />
            <ExportActions html={html} fileName="email-pro.html" />
          </section>
        </div>
      </div>

      {isAiModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4"
          role="presentation"
        >
          <form
            onSubmit={(event) => void handleGenerateAi(event)}
            className="w-full max-w-2xl rounded-2xl border border-blue-300/25 bg-[#0a1a34] p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="generate-ai-title"
          >
            <h4
              id="generate-ai-title"
              className="text-base font-semibold text-blue-50"
            >
              Generar MJML con IA
            </h4>
            <p className="mt-1 text-sm text-blue-100/70">
              Describe el email que necesitas. El resultado se cargara
              automaticamente en el editor.
            </p>

            <label className="mt-4 block">
              <span className="block text-xs font-semibold uppercase tracking-wide text-blue-100/70">
                Brief
              </span>
              <textarea
                value={aiBrief}
                onChange={(event) => setAiBrief(event.target.value)}
                required
                rows={7}
                placeholder="Ejemplo: Email de lanzamiento para una nueva feature, con beneficio principal, 3 bullets y CTA a demo."
                className="mt-1 w-full resize-y rounded-lg border border-blue-300/30 bg-[#0f2242] px-3 py-2 text-sm text-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              />
              <span className="mt-1 block text-xs text-blue-100/65">
                Minimo {MIN_BRIEF_LENGTH} caracteres. Actual:{" "}
                {aiBrief.trim().length}
              </span>
            </label>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-wide text-blue-100/70">
                  Producto
                </span>
                <input
                  type="text"
                  value={aiProductName}
                  onChange={(event) => setAiProductName(event.target.value)}
                  placeholder="Nombre del producto"
                  className="mt-1 w-full rounded-lg border border-blue-300/30 bg-[#0f2242] px-3 py-2 text-sm text-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-wide text-blue-100/70">
                  Audiencia
                </span>
                <input
                  type="text"
                  value={aiTargetAudience}
                  onChange={(event) => setAiTargetAudience(event.target.value)}
                  placeholder="Ejemplo: founders B2B"
                  className="mt-1 w-full rounded-lg border border-blue-300/30 bg-[#0f2242] px-3 py-2 text-sm text-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-wide text-blue-100/70">
                  Tono
                </span>
                <input
                  type="text"
                  value={aiTone}
                  onChange={(event) => setAiTone(event.target.value)}
                  placeholder="Ejemplo: directo, claro y cercano"
                  className="mt-1 w-full rounded-lg border border-blue-300/30 bg-[#0f2242] px-3 py-2 text-sm text-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-wide text-blue-100/70">
                  Idioma
                </span>
                <input
                  type="text"
                  value={aiLanguage}
                  onChange={(event) => setAiLanguage(event.target.value)}
                  placeholder="es"
                  className="mt-1 w-full rounded-lg border border-blue-300/30 bg-[#0f2242] px-3 py-2 text-sm text-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                />
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsAiModalOpen(false);
                  setAiStatus(null);
                }}
                disabled={isGeneratingAi}
                className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-50 transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:text-blue-100/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!canGenerateAi}
                className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                {isGeneratingAi ? "Generando..." : "Generar MJML"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </main>
  );
}
