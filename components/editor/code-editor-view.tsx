"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";

import { EmailPreview } from "@/components/editor/email-preview";
import { ExportActions } from "@/components/editor/export-actions";
import { useRenderHtml } from "@/hooks/use-render-html";
import type { RenderRequest } from "@/lib/email/render-contract";
import { templateToMjml } from "@/lib/email/template-to-mjml";
import { useEmailStore } from "@/store/email-store";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">Cargando editor...</div>,
});

export function CodeEditorView() {
  const template = useEmailStore((state) => state.template);
  const [mjml, setMjml] = useState(() => templateToMjml(template));

  const renderRequest = useMemo<RenderRequest>(() => ({ mode: "mjml", mjml }), [mjml]);
  const { html, errors, isLoading, errorMessage } = useRenderHtml(renderRequest);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 text-slate-900">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold">Email Designer - Pro (MJML)</h1>
            <p className="text-sm text-slate-600">Edita MJML directamente y exporta HTML inline.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/code/templates"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Ver templates MJML
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Volver a No-code
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_460px]">
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setMjml(templateToMjml(template))}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                Cargar MJML desde No-code
              </button>
              <span className="text-xs text-slate-600">SSR safe: Monaco con dynamic import (`ssr: false`).</span>
            </div>

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
            <EmailPreview html={html} isLoading={isLoading} errors={errors} errorMessage={errorMessage} />
            <ExportActions html={html} fileName="email-pro.html" />
          </section>
        </div>
      </div>
    </main>
  );
}
