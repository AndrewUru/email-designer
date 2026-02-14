import type { BlockType, EmailBlock, EmailTemplate } from "@/lib/email/types";

export const EMAIL_TEMPLATE_STORAGE_KEY = "email-designer.template.v1";

const isObjectRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const hasType = (block: Record<string, unknown>, type: BlockType): boolean => block.type === type;

const isHorizontalAlign = (value: unknown): value is "left" | "center" | "right" => {
  return value === "left" || value === "center" || value === "right";
};

const isEmailBlock = (value: unknown): value is EmailBlock => {
  if (!isObjectRecord(value) || typeof value.id !== "string" || typeof value.type !== "string") {
    return false;
  }

  if (hasType(value, "text")) {
    return (
      typeof value.content === "string" &&
      isHorizontalAlign(value.align) &&
      typeof value.fontSize === "number" &&
      Number.isFinite(value.fontSize)
    );
  }

  if (hasType(value, "image")) {
    return (
      typeof value.src === "string" &&
      typeof value.alt === "string" &&
      typeof value.width === "number" &&
      Number.isFinite(value.width)
    );
  }

  if (hasType(value, "button")) {
    return typeof value.text === "string" && typeof value.url === "string" && isHorizontalAlign(value.align);
  }

  if (hasType(value, "divider")) {
    return (
      typeof value.thickness === "number" &&
      Number.isFinite(value.thickness) &&
      typeof value.color === "string" &&
      typeof value.padding === "number" &&
      Number.isFinite(value.padding)
    );
  }

  if (hasType(value, "columns2")) {
    return (
      typeof value.leftTitle === "string" &&
      typeof value.leftContent === "string" &&
      typeof value.rightTitle === "string" &&
      typeof value.rightContent === "string" &&
      typeof value.backgroundColor === "string" &&
      typeof value.padding === "number" &&
      Number.isFinite(value.padding)
    );
  }

  return false;
};

const isEmailTemplate = (value: unknown): value is EmailTemplate => {
  if (!isObjectRecord(value) || !isObjectRecord(value.theme) || !Array.isArray(value.blocks)) {
    return false;
  }

  const theme = value.theme;
  if (
    typeof theme.backgroundColor !== "string" ||
    typeof theme.contentBackgroundColor !== "string" ||
    typeof theme.textColor !== "string" ||
    typeof theme.contentWidth !== "number" ||
    typeof theme.fontFamily !== "string"
  ) {
    return false;
  }

  return value.blocks.every((block) => isEmailBlock(block));
};

export const writeTemplateToLocalStorage = (template: EmailTemplate): boolean => {
  try {
    window.localStorage.setItem(EMAIL_TEMPLATE_STORAGE_KEY, JSON.stringify(template));
    return true;
  } catch {
    return false;
  }
};

export const readTemplateFromLocalStorage = (): EmailTemplate | null => {
  try {
    const raw = window.localStorage.getItem(EMAIL_TEMPLATE_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    return isEmailTemplate(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const clearTemplateFromLocalStorage = (): boolean => {
  try {
    window.localStorage.removeItem(EMAIL_TEMPLATE_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
};
