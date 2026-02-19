"use client";

import Link from "next/link";
import { useState } from "react";

import { proTemplateCatalog } from "@/lib/email/pro-template-catalog";

export function ProTemplateLibrary() {
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const handleCopy = async (templateId: string, mjml: string) => {
    try {
      await navigator.clipboard.writeText(mjml);
      setCopiedTemplateId(templateId);
      setTimeout(() => {
        setCopiedTemplateId((current) => (current === templateId ? null : current));
      }, 2200);
    } catch {
      setCopiedTemplateId(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-900">
      <div className="app-shell">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <div>
            <h1 className="text-xl font-semibold">Templates MJML para Editor PRO</h1>
            <p className="text-sm text-slate-500">
              Copia cualquier template y pegalo directamente en el editor PRO.
            </p>
          </div>
          <Link
            href="/code"
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Ir al editor PRO
          </Link>
        </header>

        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">
            Flujo rapido: copia un template, abre el editor PRO y pega el contenido completo en Monaco.
          </p>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {proTemplateCatalog.map((template) => {
            const isCopied = copiedTemplateId === template.id;

            return (
              <article key={template.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{template.name}</h2>
                    <p className="text-sm text-slate-500">{template.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(template.id, template.mjml)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                  >
                    {isCopied ? "Copiado" : "Copiar MJML"}
                  </button>
                </div>

                <pre className="mt-3 max-h-[460px] overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                  <code>{template.mjml}</code>
                </pre>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
