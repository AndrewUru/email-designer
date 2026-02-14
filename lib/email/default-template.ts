import { createBlock } from "@/lib/email/blocks";
import type { EmailTemplate } from "@/lib/email/types";

export const createDefaultTemplate = (): EmailTemplate => ({
  theme: {
    backgroundColor: "#F1F5F9",
    contentBackgroundColor: "#FFFFFF",
    textColor: "#0F172A",
    contentWidth: 600,
    fontFamily: "Arial, Helvetica, sans-serif",
  },
  blocks: [createBlock("text"), createBlock("image"), createBlock("button"), createBlock("divider")],
});
