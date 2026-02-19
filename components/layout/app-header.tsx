import Link from "next/link";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:backdrop-blur">
      <div className="app-shell px-3 py-3 sm:px-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Brand row */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
              aria-label="Email Designer Home"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <span className="text-[11px] font-semibold tracking-wide text-slate-800">
                  ED
                </span>
              </span>
              <span>Email Designer</span>
            </Link>

            <span className="hidden h-5 w-px bg-slate-200 sm:inline-block" />

            <span className="inline-flex max-w-full items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600">
              <span className="shrink-0">Open Source</span>
              <span className="text-slate-400">·</span>
              <span className="truncate text-slate-500">
                “gratis”, pero bien 😄
              </span>
            </span>
          </div>

          {/* Nav + actions row */}
          <div className="flex items-center justify-between gap-2 sm:justify-end">
            {/* Segmented nav: scrollable on small screens */}
            <nav
              className="-mx-3 flex-1 overflow-x-auto px-3 sm:mx-0 sm:flex-none sm:overflow-visible sm:px-0"
              aria-label="Primary navigation"
            >
              <div className="inline-flex min-w-max items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <Link
                  href="/"
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  No-code
                </Link>
                <Link
                  href="/code"
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  Pro
                </Link>
                <Link
                  href="/code/templates"
                  className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  Templates
                </Link>
              </div>
            </nav>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <a
                href="https://github.com/AndrewUru/email-designer"
                target="_blank"
                rel="noreferrer"
                className="hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 sm:inline-flex"
              >
                GitHub
              </a>

              <Link
                href="/code"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800"
              >
                Ship →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
