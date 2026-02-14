"use client";

import { type FormEvent, useState } from "react";

import { buildGmailComposeUrl } from "@/src/lib/gmail/compose-url";
import { useEmailStore } from "@/store/email-store";

interface ExportActionsProps {
  html: string;
  fileName: string;
}

const DEFAULT_SUBJECT = "Prueba desde Email Builder";
const SEND_TEST_TO_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GMAIL_BODY = [
  "He copiado el HTML al portapapeles.",
  "Nota: Gmail no renderiza HTML pegado en el editor.",
  "Para verlo bien, usa el boton 'Enviar prueba' (envio real).",
].join("\n");

export function ExportActions({ html, fileName }: ExportActionsProps) {
  const [status, setStatus] = useState<string | null>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [sendSubject, setSendSubject] = useState(DEFAULT_SUBJECT);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const saveTemplateToLocalStorage = useEmailStore((state) => state.saveTemplateToLocalStorage);
  const loadTemplateFromLocalStorage = useEmailStore((state) => state.loadTemplateFromLocalStorage);
  const resetTemplate = useEmailStore((state) => state.resetTemplate);

  const isDisabled = !html;
  const sendToIsValid = SEND_TEST_TO_PATTERN.test(sendTo.trim());
  const canSendTest = !isDisabled && sendToIsValid && sendSubject.trim().length > 0 && !isSendingTest;

  const handleCopy = async () => {
    if (!html) {
      return;
    }

    try {
      await navigator.clipboard.writeText(html);
      setStatus("HTML copiado al portapapeles.");
    } catch {
      setStatus("No se pudo copiar el HTML.");
    }
  };

  const handleDownload = () => {
    if (!html) {
      return;
    }

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("Archivo HTML descargado.");
  };

  const handleOpenInGmail = async () => {
    if (!html) {
      return;
    }

    let copied = false;
    try {
      await navigator.clipboard.writeText(html);
      copied = true;
    } catch {
      copied = false;
    }

    const url = buildGmailComposeUrl({
      subject: DEFAULT_SUBJECT,
      body: GMAIL_BODY,
    });

    const popup = window.open(url, "_blank", "noopener,noreferrer");
    if (!popup) {
      setStatus("No se pudo abrir Gmail. Habilita popups para este sitio.");
      return;
    }

    setStatus(copied ? "HTML copiado al portapapeles. Abriendo Gmail..." : "Abriendo Gmail (no se pudo copiar el HTML).");
  };

  const handleSendTest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSendTest || !html) {
      return;
    }

    setIsSendingTest(true);
    setStatus("Enviando prueba...");

    try {
      const response = await fetch("/api/send-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: sendTo.trim(),
          subject: sendSubject.trim(),
          html,
        }),
      });

      const payload = (await response.json()) as { ok?: boolean; id?: string; error?: string };
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? "No se pudo enviar la prueba.");
      }

      setStatus(payload.id ? `Prueba enviada. ID: ${payload.id}` : "Prueba enviada correctamente.");
      setIsSendModalOpen(false);
      setSendTo("");
      setSendSubject(DEFAULT_SUBJECT);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "No se pudo enviar la prueba.");
    } finally {
      setIsSendingTest(false);
    }
  };

  const handleSaveTemplate = () => {
    const didSave = saveTemplateToLocalStorage();
    setStatus(didSave ? "Template guardado en localStorage." : "No se pudo guardar el template.");
  };

  const handleLoadTemplate = () => {
    const didLoad = loadTemplateFromLocalStorage();
    setStatus(didLoad ? "Template cargado desde localStorage." : "No hay un template guardado en localStorage.");
  };

  const handleResetTemplate = () => {
    resetTemplate();
    setStatus("Template restablecido a valores iniciales y storage limpiado.");
  };

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Exportar</h3>

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void handleCopy()}
            disabled={isDisabled}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Copiar HTML
          </button>

          <button
            type="button"
            onClick={handleDownload}
            disabled={isDisabled}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            Descargar .html
          </button>

          <button
            type="button"
            onClick={() => void handleOpenInGmail()}
            disabled={isDisabled}
            className="rounded-lg border border-blue-300 px-3 py-2 text-sm font-medium text-blue-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Abrir en Gmail
          </button>

          <button
            type="button"
            onClick={() => setIsSendModalOpen(true)}
            disabled={isDisabled}
            className="rounded-lg border border-emerald-300 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          >
            Enviar prueba
          </button>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Template local</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleSaveTemplate}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Guardar template
            </button>
            <button
              type="button"
              onClick={handleLoadTemplate}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Cargar guardado
            </button>
            <button
              type="button"
              onClick={handleResetTemplate}
              className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-800 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Restablecer
            </button>
          </div>
        </div>

        <p aria-live="polite" className="mt-2 text-xs text-slate-600">
          {status ?? "El export usa HTML inline generado por MJML + Juice."}
        </p>
      </section>

      {isSendModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4" role="presentation">
          <form
            onSubmit={(event) => void handleSendTest(event)}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="send-test-title"
          >
            <h4 id="send-test-title" className="text-base font-semibold text-slate-900">
              Enviar prueba
            </h4>
            <p className="mt-1 text-sm text-slate-600">Este envio usa Resend para mandar el HTML real.</p>

            <label className="mt-4 block">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">To</span>
              <input
                type="email"
                value={sendTo}
                onChange={(event) => setSendTo(event.target.value)}
                required
                placeholder="destino@gmail.com"
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              />
            </label>
            {sendTo.trim() && !sendToIsValid ? (
              <p className="mt-2 text-xs text-amber-700">Introduce un email valido.</p>
            ) : null}

            <label className="mt-4 block">
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Subject</span>
              <input
                type="text"
                value={sendSubject}
                onChange={(event) => setSendSubject(event.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              />
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSendModalOpen(false)}
                disabled={isSendingTest}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:text-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!canSendTest}
                className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
              >
                {isSendingTest ? "Enviando..." : "Confirmar envio"}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
