"use client";

interface EmailPreviewProps {
  html: string;
  isLoading: boolean;
  errors: string[];
  errorMessage: string | null;
}

const emptyPreviewDocument = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #f1f5f9;
        color: #334155;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
      }
      .box {
        padding: 16px;
        border-radius: 8px;
        background: #ffffff;
        border: 1px solid #cbd5e1;
      }
    </style>
  </head>
  <body>
    <div class="box">No hay preview todavía.</div>
  </body>
</html>
`.trim();

export function EmailPreview({ html, isLoading, errors, errorMessage }: EmailPreviewProps) {
  return (
    <section>
      {isLoading ? <p className="text-xs text-slate-500">Renderizando...</p> : null}

      {errorMessage ? <p className="mt-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">{errorMessage}</p> : null}
      {errors.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-amber-700">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      ) : null}

      <div className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <iframe
          title="Vista previa del email"
          sandbox=""
          srcDoc={html || emptyPreviewDocument}
          className="h-[520px] w-full bg-white"
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">El iframe usa sandbox y muestra el email centrado en un ancho objetivo de 600px.</p>
    </section>
  );
}
