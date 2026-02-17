import { createBlockId } from "@/lib/email/blocks";
import type { EmailTemplate } from "@/lib/email/types";

export const createDefaultTemplate = (): EmailTemplate => ({
  theme: {
    backgroundColor: "#E7EEF8",
    contentBackgroundColor: "#FFFFFF",
    textColor: "#0F1B2D",
    contentWidth: 600,
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  blocks: [
    {
      id: createBlockId(),
      type: "image",
      src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2000&auto=format&fit=crop",
      alt: "Coleccion destacada",
      width: 560,
    },
    {
      id: createBlockId(),
      type: "text",
      content:
        "Summer Sale\nHasta 50% OFF en prendas seleccionadas.\nSolo por esta semana.",
      align: "center",
      fontSize: 24,
    },
    {
      id: createBlockId(),
      type: "text",
      content:
        "Nuevos lanzamientos, talles completos y envio en 24h para compras online.",
      align: "center",
      fontSize: 16,
    },
    {
      id: createBlockId(),
      type: "button",
      text: "Shop collection",
      url: "https://example.com/collection",
      align: "center",
    },
    {
      id: createBlockId(),
      type: "divider",
      thickness: 1,
      color: "#D6DFEE",
      padding: 20,
    },
    {
      id: createBlockId(),
      type: "columns2",
      leftTitle: "Envio express",
      leftContent: "Recibe tus productos en 24/48h en todo el pais.",
      rightTitle: "Cambios faciles",
      rightContent: "Primer cambio sin costo dentro de los 30 dias.",
      backgroundColor: "#F7FAFF",
      padding: 16,
    },
  ],
});
