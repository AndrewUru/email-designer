# Email Designer — Free drag-and-drop email builder (MJML) + Code Mode

**Email Designer** is an open-source MVP web app to design email templates in two ways:

- **No-code** (`/`): draggable/reorderable blocks with a properties sidebar.
- **Pro** (`/code`): direct **MJML** editing with live preview + HTML export.

🌐 Live demo: https://emaildesigner.elsaltoweb.es/  
💻 Repository: https://github.com/AndrewUru/email-designer

---

## Features (MVP)

- Drag & drop canvas (reorder blocks)
- Block properties editor (per-block settings)
- MJML code mode with preview
- **Production-ready HTML export** (MJML → HTML + inline CSS)
- Local persistence (auto save to `localStorage`)
- “Open in Gmail” helper (copies HTML + opens Gmail compose)
- “Send test email” via **Resend** (real HTML email rendering)

### Included blocks
- `text`
- `image`
- `button`
- `divider`
- `columns2` (two columns)

---

## Tech Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (v4)
- Zustand (global state)
- dnd-kit (drag & drop)
- Monaco Editor (`@monaco-editor/react` with `ssr: false`)
- MJML + Juice (`JSON → MJML → HTML (inline)`)

---

## Getting Started

### Install
```bash
npm install
Run
npm run dev
Open http://localhost:3000

Scripts
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
Project Structure
app/
  api/render/route.ts         # endpoint: render MJML -> inline HTML
  api/send-test/route.ts      # endpoint: send real HTML test email via Resend
  code/page.tsx               # Pro mode view
  page.tsx                    # No-code mode view

components/editor/
  no-code-editor.tsx
  code-editor-view.tsx
  block-palette.tsx
  canvas-panel.tsx
  sortable-canvas-item.tsx
  block-properties-panel.tsx
  email-preview.tsx
  export-actions.tsx

hooks/
  use-render-html.ts          # client hook: live render via /api/render

lib/email/
  types.ts                    # JSON model: blocks + theme + template
  default-template.ts
  blocks.ts                   # factories / duplicate helpers
  template-to-mjml.ts         # JSON -> MJML (source of truth)
  compiler.ts                 # MJML -> HTML + inline CSS (juice)
  render-contract.ts          # request/response contract for render API
  validation.ts               # basic validators

src/lib/gmail/
  compose-url.ts              # helper: build Gmail compose URL

store/
  email-store.ts              # global editor state + actions
Rendering Pipeline
Main state lives in store/email-store.ts as a template object.

The template is transformed into MJML in lib/email/template-to-mjml.ts.

POST /api/render compiles MJML using lib/email/compiler.ts.

compiler.ts runs:

mjml2html(...)

juice(...) to inline CSS for better email client compatibility

The final HTML is rendered in a sandboxed iframe and exported via copy/download.

Local Persistence (localStorage)
The app automatically saves/loads the template from localStorage using:

email-designer.template.v1

Behavior:

On load, it attempts to restore the saved template.

On any change (blocks/theme), it persists automatically.

The toolbar includes manual actions:

Save template

Load saved

Reset (clears storage and restores default template)

Open in Gmail
The toolbar action Open in Gmail lives in components/editor/export-actions.tsx.

How it works:

Uses the same final HTML as export (copy/download).

Always copies the HTML to clipboard before opening Gmail.

Builds the Gmail compose URL using buildGmailComposeUrl from src/lib/gmail/compose-url.ts.

Opens Gmail via:
window.open(url, "_blank", "noopener,noreferrer").

Limitations:

Gmail does not render pasted HTML in the compose body.

body only pre-fills plain text.

The compose opens with a short message (no HTML injected in the URL).

Send Test Email (Resend)
The toolbar action Send test sends the email as real HTML (MIME), which does render correctly in Gmail.

Flow:

Opens a modal with To and Subject.

Sends POST /api/send-test with { to, subject, html }.

Backend validates with zod and sends through resend.emails.send(...).

Environment Variables
Create .env.local:

RESEND_API_KEY=re_xxxxx
EMAIL_FROM="onboarding@resend.dev"
EMAIL_REPLY_TO="your-email@domain.com" # optional
Notes:

If EMAIL_FROM is not set, the app should fall back to onboarding@resend.dev.

EMAIL_REPLY_TO is optional.

Adding a New Block
Add the block type in lib/email/types.ts:

extend BlockType

create a block interface

include it in the EmailBlock union

Add default factory in lib/email/blocks.ts.

Render it to MJML in lib/email/template-to-mjml.ts (blockToMjml).

Expose insertion in components/editor/block-palette.tsx.

Add a summary/label in components/editor/sortable-canvas-item.tsx.

Implement its form in components/editor/block-properties-panel.tsx.

Roadmap
Image upload (drag & drop) with hosted URLs (Vercel Blob/S3/R2)

More blocks: header/footer, cards, spacers, multi-columns

Undo/redo

Template gallery

Shareable links / cloud persistence

Contributing
PRs and issues are welcome!
If you’re adding a new block, follow the Adding a New Block section above.

