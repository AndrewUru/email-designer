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
    <main className="min-h-screen px-4 py-5 text-blue-50">
      <div className="mx-auto max-w-[1480px]">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-300/20 bg-[#091429]/85 px-4 py-3 shadow-[0_14px_28px_-16px_rgba(0,0,0,0.85)] backdrop-blur">
          <div>
            <h1 className="text-xl font-semibold">Templates MJML para Editor PRO</h1>
            <p className="text-sm text-blue-100/70">
              Copia cualquier template y pegalo directamente en el editor PRO.
            </p>
          </div>
          <Link
            href="/code"
            className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-50 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          >
            Ir al editor PRO
          </Link>
        </header>

        <section className="rounded-2xl border border-blue-300/20 bg-[#0a1a34] p-4 shadow-sm">
          <p className="text-sm text-blue-100/70">
            Flujo rapido: copia un template, abre el editor PRO y pega el contenido completo en Monaco.
          </p>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {proTemplateCatalog.map((template) => {
            const isCopied = copiedTemplateId === template.id;

            return (
              <article key={template.id} className="rounded-2xl border border-blue-300/20 bg-[#0a1a34] p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-50">{template.name}</h2>
                    <p className="text-sm text-blue-100/70">{template.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(template.id, template.mjml)}
                    className="rounded-lg border border-blue-300/30 bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-50 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                  >
                    {isCopied ? "Copiado" : "Copiar MJML"}
                  </button>
                </div>

                <pre className="mt-3 max-h-[460px] overflow-auto rounded-xl border border-blue-300/20 bg-[#08162d] p-3 text-xs leading-relaxed text-blue-100">
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
