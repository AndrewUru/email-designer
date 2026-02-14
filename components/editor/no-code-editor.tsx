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

export function NoCodeEditor() {
  const template = useEmailStore((state) => state.template);

  const renderRequest = useMemo<RenderRequest>(() => ({ mode: "template", template }), [template]);
  const { html, errors, isLoading, errorMessage } = useRenderHtml(renderRequest);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-900">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold">Email Designer - No-code</h1>
            <p className="text-sm text-slate-600">Diseña por bloques y exporta HTML inline.</p>
          </div>
          <Link
            href="/code"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Ir a modo Pro (MJML)
          </Link>
        </header>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[260px_minmax(0,1fr)_340px]">
          <div className="xl:sticky xl:top-4 xl:self-start">
            <BlockPalette />
          </div>

          <section className="space-y-4">
            <CanvasPanel />
            <EmailPreview html={html} isLoading={isLoading} errors={errors} errorMessage={errorMessage} />
            <ExportActions html={html} fileName="email-no-code.html" />
          </section>

          <div className="xl:sticky xl:top-4 xl:self-start">
            <BlockPropertiesPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
