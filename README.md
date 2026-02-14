# Email Designer MVP

MVP de una herramienta web para disenar emails en dos modos:

- `No-code` (`/`): bloques arrastrables/reordenables con panel de propiedades.
- `Pro` (`/code`): edicion directa de MJML con preview y export.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS (v4)
- Zustand (estado global)
- dnd-kit (drag and drop)
- Monaco Editor (`@monaco-editor/react` con `ssr: false`)
- MJML + Juice (`JSON -> MJML -> HTML inline`)

## Instalacion

```bash
npm install
```

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Estructura

```text
app/
  api/render/route.ts         # endpoint para render MJML -> HTML inline
  api/send-test/route.ts      # endpoint para enviar prueba HTML real via Resend
  code/page.tsx               # vista modo Pro
  page.tsx                    # vista modo No-code
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
  use-render-html.ts          # hook cliente para render en vivo via /api/render
lib/email/
  types.ts                    # modelo JSON: bloques + theme + template
  default-template.ts
  blocks.ts                   # factory/duplicado de bloques
  template-to-mjml.ts         # JSON -> MJML (fuente de verdad)
  compiler.ts                 # MJML -> HTML + inline CSS con juice
  render-contract.ts          # contrato request/response del render
  validation.ts               # validadores basicos
src/lib/gmail/
  compose-url.ts              # helper para construir URL de compose en Gmail
store/
  email-store.ts              # estado global y acciones del editor
```

## Flujo de render

1. Estado principal en `store/email-store.ts` (objeto `template`).
2. `template` se transforma a MJML en `lib/email/template-to-mjml.ts`.
3. `POST /api/render` compila MJML en `lib/email/compiler.ts`.
4. `compiler.ts` ejecuta:
   - `mjml2html(...)`
   - `juice(...)` para dejar estilos inline.
5. El HTML se muestra en `iframe sandbox` y se exporta con copiar/descargar.

## Persistencia local (localStorage)

La app guarda y carga el template en `localStorage` automaticamente con la clave:

- `email-designer.template.v1`

Detalles:

1. Al abrir la app, intenta cargar el template guardado.
2. Al cambiar bloques o tema, guarda en localStorage automaticamente.
3. En la toolbar (`Exportar`) hay acciones manuales:
   - `Guardar template`
   - `Cargar guardado`
   - `Restablecer` (limpia storage y vuelve al template por defecto)

## Abrir en Gmail

En `components/editor/export-actions.tsx` existe el boton `Abrir en Gmail`.

Funcionamiento:

1. Usa el mismo HTML final del export (el que se usa para copiar/descargar).
2. Copia siempre ese HTML al portapapeles antes de abrir Gmail.
3. Construye la URL de compose con `buildGmailComposeUrl` en `src/lib/gmail/compose-url.ts`.
4. Abre Gmail con `window.open(url, "_blank", "noopener,noreferrer")`.

Limitaciones:

- Gmail no renderiza HTML pegado en el body de compose.
- El parametro `body` solo pre-rellena texto.
- Por eso el compose se abre con un mensaje corto y no se inyecta HTML en la URL.

## Enviar prueba (Resend)

En la misma toolbar existe el boton `Enviar prueba`.

Funcionamiento:

1. Abre un modal con `To` y `Subject`.
2. Hace `POST /api/send-test` con `{ to, subject, html }`.
3. El backend valida con `zod` y envia el HTML real usando `resend.emails.send(...)`.
4. Este envio SI renderiza el email en Gmail como HTML real.

Variables de entorno requeridas:

```bash
RESEND_API_KEY=re_xxxxx
EMAIL_FROM="onboarding@resend.dev"
EMAIL_REPLY_TO="tu-email@dominio.com" # opcional
```

Notas:

- `EMAIL_FROM` usa `onboarding@resend.dev` por defecto si no se define.
- `EMAIL_REPLY_TO` es opcional.

## Como anadir un bloque nuevo

1. Anadir el tipo en `lib/email/types.ts`:
   - ampliar `BlockType`
   - crear interfaz del bloque
   - incluirlo en `EmailBlock`
2. Anadir factory por defecto en `lib/email/blocks.ts`.
3. Renderizarlo a MJML en `lib/email/template-to-mjml.ts` (`blockToMjml`).
4. Exponer insercion en `components/editor/block-palette.tsx`.
5. Mostrar resumen en `components/editor/sortable-canvas-item.tsx`.
6. Crear su formulario en `components/editor/block-properties-panel.tsx`.
