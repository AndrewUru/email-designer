"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";

import { createBlock, duplicateBlock } from "@/lib/email/blocks";
import { createDefaultTemplate } from "@/lib/email/default-template";
import {
  clearTemplateFromLocalStorage,
  readTemplateFromLocalStorage,
  writeTemplateToLocalStorage,
} from "@/lib/email/local-storage";
import type { BlockType, EmailBlock, EmailTemplate } from "@/lib/email/types";

interface EmailStoreState {
  template: EmailTemplate;
  selectedBlockId: string | null;
  setTemplate: (template: EmailTemplate) => void;
  updateTheme: (updater: (theme: EmailTemplate["theme"]) => EmailTemplate["theme"]) => void;
  selectBlock: (blockId: string | null) => void;
  addBlock: (type: BlockType, index?: number) => void;
  updateBlock: (blockId: string, updater: (block: EmailBlock) => EmailBlock) => void;
  deleteBlock: (blockId: string) => void;
  duplicateBlock: (blockId: string) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  saveTemplateToLocalStorage: () => boolean;
  loadTemplateFromLocalStorage: () => boolean;
  resetTemplate: () => void;
}

const removeBlockById = (blocks: EmailBlock[], blockId: string): EmailBlock[] => blocks.filter((block) => block.id !== blockId);
const getFirstBlockId = (template: EmailTemplate): string | null => template.blocks[0]?.id ?? null;
const initialTemplate = createDefaultTemplate();

export const useEmailStore = create<EmailStoreState>((set, get) => ({
  template: initialTemplate,
  selectedBlockId: getFirstBlockId(initialTemplate),
  setTemplate: (template) =>
    set(() => ({
      template,
      selectedBlockId: getFirstBlockId(template),
    })),
  updateTheme: (updater) =>
    set((state) => ({
      template: {
        ...state.template,
        theme: updater(state.template.theme),
      },
    })),
  selectBlock: (blockId) => set(() => ({ selectedBlockId: blockId })),
  addBlock: (type, index) =>
    set((state) => {
      const nextBlock = createBlock(type);
      const safeIndex =
        typeof index === "number" && Number.isInteger(index)
          ? Math.min(Math.max(index, 0), state.template.blocks.length)
          : state.template.blocks.length;

      const nextBlocks = [...state.template.blocks];
      nextBlocks.splice(safeIndex, 0, nextBlock);

      return {
        template: {
          ...state.template,
          blocks: nextBlocks,
        },
        selectedBlockId: nextBlock.id,
      };
    }),
  updateBlock: (blockId, updater) =>
    set((state) => ({
      template: {
        ...state.template,
        blocks: state.template.blocks.map((block) => (block.id === blockId ? updater(block) : block)),
      },
    })),
  deleteBlock: (blockId) =>
    set((state) => ({
      template: {
        ...state.template,
        blocks: removeBlockById(state.template.blocks, blockId),
      },
      selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
    })),
  duplicateBlock: (blockId) =>
    set((state) => {
      const index = state.template.blocks.findIndex((block) => block.id === blockId);
      if (index < 0) {
        return state;
      }

      const original = state.template.blocks[index];
      const copy = duplicateBlock(original);
      const nextBlocks = [...state.template.blocks];
      nextBlocks.splice(index + 1, 0, copy);

      return {
        template: {
          ...state.template,
          blocks: nextBlocks,
        },
        selectedBlockId: copy.id,
      };
    }),
  reorderBlocks: (activeId, overId) =>
    set((state) => {
      const currentIndex = state.template.blocks.findIndex((block) => block.id === activeId);
      const targetIndex = state.template.blocks.findIndex((block) => block.id === overId);

      if (currentIndex < 0 || targetIndex < 0 || currentIndex === targetIndex) {
        return state;
      }

      return {
        template: {
          ...state.template,
          blocks: arrayMove(state.template.blocks, currentIndex, targetIndex),
        },
      };
    }),
  saveTemplateToLocalStorage: () => {
    return writeTemplateToLocalStorage(get().template);
  },
  loadTemplateFromLocalStorage: () => {
    const savedTemplate = readTemplateFromLocalStorage();
    if (!savedTemplate) {
      return false;
    }

    set(() => ({
      template: savedTemplate,
      selectedBlockId: getFirstBlockId(savedTemplate),
    }));
    return true;
  },
  resetTemplate: () => {
    const defaultTemplate = createDefaultTemplate();
    clearTemplateFromLocalStorage();
    set(() => ({
      template: defaultTemplate,
      selectedBlockId: getFirstBlockId(defaultTemplate),
    }));
  },
}));
