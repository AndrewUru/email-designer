"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { EmailBlock } from "@/lib/email/types";

interface SortableCanvasItemProps {
  block: EmailBlock;
  isSelected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const blockTypeLabel: Record<EmailBlock["type"], string> = {
  text: "Texto",
  image: "Imagen",
  button: "Boton",
  divider: "Separador",
  columns2: "2 columnas",
};

const blockSummary = (block: EmailBlock): string => {
  switch (block.type) {
    case "text":
      return block.content.slice(0, 90) || "Texto vacio";
    case "image":
      return block.src || "URL pendiente";
    case "button":
      return `${block.text} -> ${block.url}`;
    case "divider":
      return `Grosor ${block.thickness}px, color ${block.color}`;
    case "columns2":
      return `${block.leftTitle || "Columna izquierda"} | ${block.rightTitle || "Columna derecha"}`;
    default:
      return "";
  }
};

export function SortableCanvasItem({
  block,
  isSelected,
  onSelect,
  onDuplicate,
  onDelete,
}: SortableCanvasItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-xl border bg-[#102445] p-3 shadow-sm transition ${
        isSelected ? "border-blue-300/60 ring-1 ring-blue-300/35" : "border-blue-300/20"
      } ${isDragging ? "opacity-80" : "opacity-100"}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <button
          type="button"
          onClick={onSelect}
          className="min-w-0 flex-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          <span className="block text-xs font-semibold uppercase tracking-wide text-blue-100/70">
            {blockTypeLabel[block.type]}
          </span>
          <span className="mt-1 block break-all text-sm text-blue-50">{blockSummary(block)}</span>
        </button>

        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Reordenar bloque"
          className="shrink-0 touch-none select-none rounded-lg border border-blue-300/25 bg-blue-500/10 px-2 py-1 text-xs text-blue-100 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          Drag
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onDuplicate}
          className="rounded-lg border border-blue-300/25 bg-blue-500/10 px-2 py-1 text-xs text-blue-100 transition hover:bg-blue-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
        >
          Duplicar
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg border border-red-300/30 bg-red-500/10 px-2 py-1 text-xs text-red-200 transition hover:bg-red-500/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
        >
          Borrar
        </button>
      </div>
    </li>
  );
}
