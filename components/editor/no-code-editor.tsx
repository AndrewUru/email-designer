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
        "rounded-2xl border border-slate-200/70 bg-white shadow-sm",
        "overflow-hidden",
        className,
      ].join(" ")}
    >
      {(title || subtitle) && (
        <div className="flex items-start justify-between gap-3 border-b border-slate-200/70 bg-slate-50/70 px-4 py-3">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-600">{subtitle}</p>
            )}
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
  const { html, errors, isLoading, errorMessage } =
    useRenderHtml(renderRequest);

  const hasErrors = (errors && errors.length > 0) || Boolean(errorMessage);

  return (
    <main className="min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <div className="mx-auto max-w-[1520px] px-3 py-4 sm:px-4 sm:py-6">
        {/* Topbar */}
        <header
          className={[
            "sticky top-3 z-50 mb-4",
            "rounded-2xl border border-slate-200/70",
            "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60",
            "shadow-sm",
          ].join(" ")}
        >
          <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-base font-semibold tracking-tight sm:text-lg">
                  Email Designer
                </h1>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  100% free &amp; open source
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-medium text-slate-700">
                  No-code
                </span>

                {hasErrors ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                    Render con avisos
                  </span>
                ) : isLoading ? (
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    Renderizando…
                  </span>
                ) : (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                    OK
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-slate-600 sm:text-sm">
                Diseña por bloques, previsualiza y exporta HTML inline.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* CTA secundario */}
              <Link
                href="/code"
                className={[
                  "inline-flex items-center justify-center",
                  "rounded-xl border border-slate-200 bg-white px-3 py-2",
                  "text-sm font-semibold text-slate-900",
                  "shadow-sm transition",
                  "hover:bg-slate-50 hover:shadow",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400",
                ].join(" ")}
              >
                Modo Pro (MJML)
              </Link>

              {/* CTA primario (opcional si luego querés link al repo) */}
              {/* <a
                href="https://github.com/..."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
              >
                GitHub
              </a> */}
            </div>
          </div>
        </header>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[300px_minmax(0,1fr)_380px]">
          {/* Left panel */}
          <aside className="xl:sticky xl:top-[88px] xl:self-start">
            <Panel
              title="Bloques"
              subtitle="Arrastra y suelta para construir el email."
              className="min-h-[220px]"
            >
              <BlockPalette />
            </Panel>
          </aside>

          {/* Center */}
          <section className="space-y-4">
            <Panel
              title="Canvas"
              subtitle="Ordena secciones, edita y ajusta el layout."
            >
              <CanvasPanel />
            </Panel>

            <Panel
              title="Preview"
              subtitle="Render HTML (inline). Verifica errores antes de exportar."
              className={hasErrors ? "border-amber-200/70" : ""}
            >
              <EmailPreview
                html={html}
                isLoading={isLoading}
                errors={errors}
                errorMessage={errorMessage}
              />
            </Panel>

            <Panel
              title="Export"
              subtitle="Descarga el HTML final para tu ESP / cliente."
            >
              <ExportActions html={html} fileName="email-no-code.html" />
            </Panel>
          </section>

          {/* Right panel */}
          <aside className="xl:sticky xl:top-[88px] xl:self-start">
            <Panel
              title="Propiedades"
              subtitle="Edita contenido, estilos y settings del bloque."
              className="min-h-[220px]"
            >
              <BlockPropertiesPanel />
            </Panel>
          </aside>
        </div>

        {/* Footer micro */}
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-500">
          <span>Editor UI · Next.js · Tailwind · Render HTML</span>
          <span className="opacity-70">MVP</span>
        </footer>
      </div>
    </main>
  );
}
