export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="app-shell px-3 py-4 sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[11px] font-medium tracking-wide text-slate-700">
              AT
            </div>

            <div className="leading-tight">
              <p className="text-xs font-medium text-slate-800">
                Andrés Tobío · Diseño & Desarrollo Web
              </p>
              <p className="text-xs text-slate-500">
                Emails que se ven caros (sin costarte caro).{" "}
                <span className="whitespace-nowrap">Open Source,</span> pero con
                gustos premium.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <a
              href="https://www.elsaltoweb.es"
              target="_blank"
              rel="noreferrer"
              className="rounded-md px-2 py-1 hover:bg-slate-50 hover:text-slate-700"
            >
              elsaltoweb.es
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="mailto:atobio459@gmail.com"
              className="rounded-md px-2 py-1 hover:bg-slate-50 hover:text-slate-700"
            >
              atobio459@gmail.com
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="tel:+34648226078"
              className="rounded-md px-2 py-1 hover:bg-slate-50 hover:text-slate-700"
            >
              +34 648 226 078
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Email Designer · Hecho con Next.js + MJML</p>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
              Valencia
            </span>
            <span className="text-slate-300">•</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
              Proyectos web · desde 2019
            </span>
            <span className="text-slate-300">•</span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5">
              Construyendo en público
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
