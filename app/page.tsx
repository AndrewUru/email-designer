import { NoCodeEditor } from "@/components/editor/no-code-editor";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-baseline gap-3">
            <h1 className="text-sm font-semibold">Email Designer</h1>
            <span className="text-xs opacity-70">100% free & open source</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="opacity-70">No-code + MJML Pro</span>
            {/* opcional: link al repo */}
            {/* <a className="underline" href="https://github.com/..." target="_blank" rel="noreferrer">GitHub</a> */}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-4">
        <NoCodeEditor />
      </section>
    </main>
  );
}
