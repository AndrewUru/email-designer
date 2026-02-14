export type BlockType = "text" | "image" | "button" | "divider" | "columns2";

export type HorizontalAlign = "left" | "center" | "right";

interface BlockBase {
  id: string;
  type: BlockType;
}

export interface TextBlock extends BlockBase {
  type: "text";
  content: string;
  align: HorizontalAlign;
  fontSize: number;
}

export interface ImageBlock extends BlockBase {
  type: "image";
  src: string;
  alt: string;
  width: number;
}

export interface ButtonBlock extends BlockBase {
  type: "button";
  text: string;
  url: string;
  align: HorizontalAlign;
}

export interface DividerBlock extends BlockBase {
  type: "divider";
  thickness: number;
  color: string;
  padding: number;
}

export interface TwoColumnsBlock extends BlockBase {
  type: "columns2";
  leftTitle: string;
  leftContent: string;
  rightTitle: string;
  rightContent: string;
  backgroundColor: string;
  padding: number;
}

export type EmailBlock = TextBlock | ImageBlock | ButtonBlock | DividerBlock | TwoColumnsBlock;

export interface EmailTheme {
  backgroundColor: string;
  contentBackgroundColor: string;
  textColor: string;
  contentWidth: number;
  fontFamily: string;
}

export interface EmailTemplate {
  theme: EmailTheme;
  blocks: EmailBlock[];
}
