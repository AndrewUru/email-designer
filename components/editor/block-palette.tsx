"use client";

import type { BlockType } from "@/lib/email/types";
import { useEmailStore } from "@/store/email-store";

const paletteItems: Array<{ type: BlockType; label: string; description: string }> = [
  {
    type: "text",
    label: "Texto",
    description: "Parrafo editable con alineacion y tamano de fuente.",
  },
  {
    type: "image",
    label: "Imagen",
    description: "Imagen principal con URL, alt y ancho.",
  },
  {
    type: "button",
    label: "Boton",
    description: "CTA con texto, URL y alineacion.",
  },
  {
    type: "divider",
    label: "Separador",
    description: "Linea horizontal con grosor y color.",
  },
  {
    type: "columns2",
    label: "2 columnas",
    description: "Dos columnas con titulo y contenido en paralelo.",
  },
];

export function BlockPalette() {
  const addBlock = useEmailStore((state) => state.addBlock);

  return (
    <aside className="rounded-2xl border border-blue-300/20 bg-[#0a1a34] p-4 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-100/80">Bloques</h2>
      <p className="mt-2 text-sm text-blue-100/70">Inserta elementos en el canvas.</p>

      <div className="mt-4 space-y-3">
        {paletteItems.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => addBlock(item.type)}
            className="w-full rounded-xl border border-blue-300/20 bg-blue-500/5 p-3 text-left transition hover:border-blue-300/45 hover:bg-blue-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
          >
            <span className="block text-sm font-semibold text-blue-50">{item.label}</span>
            <span className="block text-xs text-blue-100/70">{item.description}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
