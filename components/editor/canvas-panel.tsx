"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableCanvasItem } from "@/components/editor/sortable-canvas-item";
import { useEmailStore } from "@/store/email-store";

export function CanvasPanel() {
  const blocks = useEmailStore((state) => state.template.blocks);
  const selectedBlockId = useEmailStore((state) => state.selectedBlockId);
  const selectBlock = useEmailStore((state) => state.selectBlock);
  const duplicateBlock = useEmailStore((state) => state.duplicateBlock);
  const deleteBlock = useEmailStore((state) => state.deleteBlock);
  const reorderBlocks = useEmailStore((state) => state.reorderBlocks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    reorderBlocks(String(active.id), String(over.id));
  };

  return (
    <section className="rounded-2xl border border-blue-300/20 bg-[#0a1a34] p-4 shadow-sm">
      <header className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-100/80">Canvas</h2>
        <span className="text-xs text-blue-100/70">{blocks.length} bloques</span>
      </header>

      {blocks.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-blue-300/25 bg-blue-500/5 p-6 text-center text-sm text-blue-100/70">
          No hay bloques todavia. Anade uno desde la izquierda.
        </p>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map((block) => block.id)} strategy={verticalListSortingStrategy}>
            <ol className="mt-4 space-y-3">
              {blocks.map((block) => (
                <SortableCanvasItem
                  key={block.id}
                  block={block}
                  isSelected={selectedBlockId === block.id}
                  onSelect={() => selectBlock(block.id)}
                  onDuplicate={() => duplicateBlock(block.id)}
                  onDelete={() => deleteBlock(block.id)}
                />
              ))}
            </ol>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
}
