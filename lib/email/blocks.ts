import type {
  BlockType,
  ButtonBlock,
  DividerBlock,
  EmailBlock,
  ImageBlock,
  TextBlock,
  TwoColumnsBlock,
} from "@/lib/email/types";

const randomToken = () => Math.random().toString(36).slice(2, 8);

export const createBlockId = () => `blk_${Date.now()}_${randomToken()}`;

const createTextBlock = (): TextBlock => ({
  id: createBlockId(),
  type: "text",
  content: "Escribe tu mensaje aquí",
  align: "left",
  fontSize: 16,
});

const createImageBlock = (): ImageBlock => ({
  id: createBlockId(),
  type: "image",
  src: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  alt: "Imagen principal",
  width: 520,
});

const createButtonBlock = (): ButtonBlock => ({
  id: createBlockId(),
  type: "button",
  text: "Llamado a la acción",
  url: "https://example.com",
  align: "left",
});

const createDividerBlock = (): DividerBlock => ({
  id: createBlockId(),
  type: "divider",
  thickness: 1,
  color: "#D1D5DB",
  padding: 16,
});

const createTwoColumnsBlock = (): TwoColumnsBlock => ({
  id: createBlockId(),
  type: "columns2",
  leftTitle: "Columna izquierda",
  leftContent: "Agrega aqui contenido de soporte, beneficios o contexto.",
  rightTitle: "Columna derecha",
  rightContent: "Usa esta columna para resumen, detalles o segundo CTA.",
  backgroundColor: "#FFFFFF",
  padding: 16,
});

const blockFactories: Record<BlockType, () => EmailBlock> = {
  text: createTextBlock,
  image: createImageBlock,
  button: createButtonBlock,
  divider: createDividerBlock,
  columns2: createTwoColumnsBlock,
};

export const createBlock = (type: BlockType): EmailBlock =>
  blockFactories[type]();

export const duplicateBlock = (block: EmailBlock): EmailBlock => {
  return {
    ...block,
    id: createBlockId(),
  };
};
