"use client";

import { useMemo } from "react";

import type {
  ButtonBlock,
  DividerBlock,
  ImageBlock,
  TextBlock,
  TwoColumnsBlock,
} from "@/lib/email/types";
import { clampNumber, isValidHttpUrl } from "@/lib/email/validation";
import { useEmailStore } from "@/store/email-store";

const inputClassName =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500";

const labelClassName =
  "block text-xs font-semibold uppercase tracking-wide text-slate-500";

interface LabeledFieldProps {
  label: string;
  children: React.ReactNode;
}

function LabeledField({ label, children }: LabeledFieldProps) {
  return (
    <label className="block">
      <span className={labelClassName}>{label}</span>
      {children}
    </label>
  );
}

function TextBlockFields({ block }: { block: TextBlock }) {
  const updateBlock = useEmailStore((state) => state.updateBlock);

  return (
    <div className="space-y-3">
      <LabeledField label="Contenido">
        <textarea
          value={block.content}
          rows={7}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "text"
                ? { ...current, content: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Alineacion">
        <select
          value={block.align}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "text"
                ? {
                    ...current,
                    align: event.target.value as TextBlock["align"],
                  }
                : current,
            )
          }
          className={inputClassName}
        >
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </LabeledField>

      <LabeledField label="Tamano de fuente (px)">
        <input
          type="number"
          min={12}
          max={48}
          value={block.fontSize}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "text"
                ? {
                    ...current,
                    fontSize: clampNumber(Number(event.target.value), 12, 48),
                  }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>
    </div>
  );
}

function ImageBlockFields({ block }: { block: ImageBlock }) {
  const updateBlock = useEmailStore((state) => state.updateBlock);
  const isValid = isValidHttpUrl(block.src);

  return (
    <div className="space-y-3">
      <LabeledField label="URL de imagen">
        <input
          type="url"
          value={block.src}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "image"
                ? { ...current, src: event.target.value }
                : current,
            )
          }
          className={inputClassName}
          placeholder="https://..."
        />
      </LabeledField>
      {!isValid ? (
        <p className="text-xs text-amber-700">
          Introduce una URL http/https valida.
        </p>
      ) : null}

      <LabeledField label="Texto alternativo">
        <input
          value={block.alt}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "image"
                ? { ...current, alt: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Ancho (px)">
        <input
          type="number"
          min={100}
          max={600}
          value={block.width}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "image"
                ? {
                    ...current,
                    width: clampNumber(Number(event.target.value), 100, 600),
                  }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>
    </div>
  );
}

function ButtonBlockFields({ block }: { block: ButtonBlock }) {
  const updateBlock = useEmailStore((state) => state.updateBlock);
  const isValid = isValidHttpUrl(block.url);

  return (
    <div className="space-y-3">
      <LabeledField label="Texto">
        <input
          value={block.text}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "button"
                ? { ...current, text: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="URL">
        <input
          type="url"
          value={block.url}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "button"
                ? { ...current, url: event.target.value }
                : current,
            )
          }
          className={inputClassName}
          placeholder="https://..."
        />
      </LabeledField>
      {!isValid ? (
        <p className="text-xs text-amber-700">
          La URL debe empezar por http:// o https://
        </p>
      ) : null}

      <LabeledField label="Alineacion">
        <select
          value={block.align}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "button"
                ? {
                    ...current,
                    align: event.target.value as ButtonBlock["align"],
                  }
                : current,
            )
          }
          className={inputClassName}
        >
          <option value="left">Izquierda</option>
          <option value="center">Centro</option>
          <option value="right">Derecha</option>
        </select>
      </LabeledField>
    </div>
  );
}

function DividerBlockFields({ block }: { block: DividerBlock }) {
  const updateBlock = useEmailStore((state) => state.updateBlock);

  return (
    <div className="space-y-3">
      <LabeledField label="Grosor (px)">
        <input
          type="number"
          min={1}
          max={8}
          value={block.thickness}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "divider"
                ? {
                    ...current,
                    thickness: clampNumber(Number(event.target.value), 1, 8),
                  }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Color">
        <input
          type="color"
          value={block.color}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "divider"
                ? { ...current, color: event.target.value }
                : current,
            )
          }
          className={`${inputClassName} h-10 p-1`}
        />
      </LabeledField>

      <LabeledField label="Padding vertical (px)">
        <input
          type="number"
          min={0}
          max={48}
          value={block.padding}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "divider"
                ? {
                    ...current,
                    padding: clampNumber(Number(event.target.value), 0, 48),
                  }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>
    </div>
  );
}

function TwoColumnsBlockFields({ block }: { block: TwoColumnsBlock }) {
  const updateBlock = useEmailStore((state) => state.updateBlock);

  return (
    <div className="space-y-3">
      <LabeledField label="Titulo columna izquierda">
        <input
          value={block.leftTitle}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "columns2"
                ? { ...current, leftTitle: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Contenido columna izquierda">
        <textarea
          value={block.leftContent}
          rows={4}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "columns2"
                ? { ...current, leftContent: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Titulo columna derecha">
        <input
          value={block.rightTitle}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "columns2"
                ? { ...current, rightTitle: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Contenido columna derecha">
        <textarea
          value={block.rightContent}
          rows={4}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "columns2"
                ? { ...current, rightContent: event.target.value }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>

      <LabeledField label="Color de fondo">
        <input
          type="color"
          value={block.backgroundColor}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "columns2"
                ? { ...current, backgroundColor: event.target.value }
                : current,
            )
          }
          className={`${inputClassName} h-10 p-1`}
        />
      </LabeledField>

      <LabeledField label="Padding interno (px)">
        <input
          type="number"
          min={8}
          max={40}
          value={block.padding}
          onChange={(event) =>
            updateBlock(block.id, (current) =>
              current.type === "columns2"
                ? {
                    ...current,
                    padding: clampNumber(Number(event.target.value), 8, 40),
                  }
                : current,
            )
          }
          className={inputClassName}
        />
      </LabeledField>
    </div>
  );
}

export function BlockPropertiesPanel() {
  const template = useEmailStore((state) => state.template);
  const updateTheme = useEmailStore((state) => state.updateTheme);
  const selectedBlockId = useEmailStore((state) => state.selectedBlockId);
  const selectedBlock = useMemo(
    () => template.blocks.find((block) => block.id === selectedBlockId) ?? null,
    [template.blocks, selectedBlockId],
  );

  return (
    <aside className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm overflow-hidden">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Tema
        </h2>
        <div className="mt-3 space-y-3">
          <LabeledField label="Color fondo">
            <input
              type="color"
              value={template.theme.backgroundColor}
              onChange={(event) =>
                updateTheme((theme) => ({
                  ...theme,
                  backgroundColor: event.target.value,
                }))
              }
              className={`${inputClassName} h-10 p-1`}
            />
          </LabeledField>

          <LabeledField label="Fondo contenido">
            <input
              type="color"
              value={template.theme.contentBackgroundColor}
              onChange={(event) =>
                updateTheme((theme) => ({
                  ...theme,
                  contentBackgroundColor: event.target.value,
                }))
              }
              className={`${inputClassName} h-10 p-1`}
            />
          </LabeledField>

          <LabeledField label="Color texto">
            <input
              type="color"
              value={template.theme.textColor}
              onChange={(event) =>
                updateTheme((theme) => ({
                  ...theme,
                  textColor: event.target.value,
                }))
              }
              className={`${inputClassName} h-10 p-1`}
            />
          </LabeledField>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Propiedades
        </h2>
        {!selectedBlock ? (
          <p className="mt-3 rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Selecciona un bloque en el canvas para editarlo.
          </p>
        ) : (
          <div className="mt-3">
            {selectedBlock.type === "text" ? (
              <TextBlockFields block={selectedBlock} />
            ) : null}
            {selectedBlock.type === "image" ? (
              <ImageBlockFields block={selectedBlock} />
            ) : null}
            {selectedBlock.type === "button" ? (
              <ButtonBlockFields block={selectedBlock} />
            ) : null}
            {selectedBlock.type === "divider" ? (
              <DividerBlockFields block={selectedBlock} />
            ) : null}
            {selectedBlock.type === "columns2" ? (
              <TwoColumnsBlockFields block={selectedBlock} />
            ) : null}
          </div>
        )}
      </section>
    </aside>
  );
}
