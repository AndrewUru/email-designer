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
      className={`overflow-hidden rounded-lg border bg-white p-3 transition ${
        isSelected ? "border-slate-400 ring-1 ring-slate-300" : "border-slate-200"
      } ${isDragging ? "opacity-80" : "opacity-100"}`}
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <button
          type="button"
          onClick={onSelect}
          className="min-w-0 flex-1 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            {blockTypeLabel[block.type]}
          </span>
          <span className="mt-1 block break-all text-sm text-slate-900">
            {blockSummary(block)}
          </span>
        </button>

        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label="Reordenar bloque"
          className="shrink-0 touch-none select-none rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          Drag
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onDuplicate}
          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
        >
          Duplicar
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="rounded-md border border-red-300 bg-red-50 px-2 py-1 text-xs text-red-700 transition hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
        >
          Borrar
        </button>
      </div>
    </li>
  );
}
