"use client";

import Link from "next/link";
import { useMemo } from "react";

import { BlockPalette } from "@/components/editor/block-palette";
import { BlockPropertiesPanel } from "@/components/editor/block-properties-panel";
import { CanvasPanel } from "@/components/editor/canvas-panel";
import { EmailPreview } from "@/components/editor/email-preview";
import { ExportActions } from "@/components/editor/export-actions";
import { useRenderHtml } from "@/hooks/use-render-html";
import type { RenderRequest } from "@/lib/email/render-contract";
import { useEmailStore } from "@/store/email-store";

function Panel({
  title,
  subtitle,
  children,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={[
        "overflow-hidden rounded-2xl border border-blue-300/20",
        "bg-[#0b1a34]/85 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)] backdrop-blur",
        className,
      ].join(" ")}
    >
      {(title || subtitle) && (
        <div className="flex items-start justify-between gap-3 border-b border-blue-300/20 bg-[#08162d] px-4 py-3">
          <div>
            {title ? <h2 className="text-sm font-semibold text-blue-50">{title}</h2> : null}
            {subtitle ? <p className="mt-0.5 text-xs text-blue-100/70">{subtitle}</p> : null}
          </div>
        </div>
      )}
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}

export function NoCodeEditor() {
  const template = useEmailStore((state) => state.template);

  const renderRequest = useMemo<RenderRequest>(
    () => ({ mode: "template", template }),
    [template],
  );
  const { html, errors, isLoading, errorMessage } = useRenderHtml(renderRequest);

  const hasErrors = (errors && errors.length > 0) || Boolean(errorMessage);

  return (
    <main className="min-h-dvh text-blue-50">
      <div className="mx-auto max-w-[1520px] px-3 py-4 sm:px-4 sm:py-6">
        <header className="sticky top-3 z-50 mb-4 rounded-2xl border border-blue-300/20 bg-[#091429]/85 shadow-[0_14px_28px_-16px_rgba(0,0,0,0.85)] backdrop-blur">
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">Email Designer</h1>
                <span className="rounded-full border border-blue-300/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-100">
                  100% free &amp; open source
                </span>
                {hasErrors ? (
                  <span className="rounded-full border border-amber-300/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
                    Render con avisos
                  </span>
                ) : isLoading ? (
                  <span className="rounded-full border border-blue-300/20 bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-100/80">
                    Renderizando...
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
                    OK
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-blue-100/70 sm:text-sm">
                Disena por bloques, previsualiza y exporta HTML inline.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/code"
                className="inline-flex items-center justify-center rounded-xl border border-blue-300/30 bg-blue-500/15 px-3 py-2 text-sm font-semibold text-blue-50 transition hover:bg-blue-500/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              >
                Modo Pro (MJML)
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[300px_minmax(0,1fr)_380px]">
          <aside className="xl:sticky xl:top-[88px] xl:self-start">
            <Panel title="Bloques" subtitle="Arrastra y suelta para construir el email." className="min-h-[220px]">
              <BlockPalette />
            </Panel>
          </aside>

          <section className="space-y-4">
            <Panel title="Canvas" subtitle="Ordena secciones, edita y ajusta el layout.">
              <CanvasPanel />
            </Panel>

            <Panel
              title="Preview"
              subtitle="Render HTML (inline). Verifica errores antes de exportar."
              className={hasErrors ? "border-amber-300/30" : ""}
            >
              <EmailPreview
                html={html}
                isLoading={isLoading}
                errors={errors}
                errorMessage={errorMessage}
              />
            </Panel>

            <Panel title="Export" subtitle="Descarga el HTML final para tu ESP / cliente.">
              <ExportActions html={html} fileName="email-no-code.html" />
            </Panel>
          </section>

          <aside className="xl:sticky xl:top-[88px] xl:self-start">
            <Panel title="Propiedades" subtitle="Edita contenido, estilos y settings del bloque." className="min-h-[220px]">
              <BlockPropertiesPanel />
            </Panel>
          </aside>
        </div>
      </div>
    </main>
  );
}
