import type { EmailBlock, EmailTemplate } from "@/lib/email/types";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const escapeAttribute = (value: string): string => escapeHtml(value).replaceAll("`", "&#96;");

const textContentToMjml = (value: string): string => {
  if (!value.trim()) {
    return "&nbsp;";
  }
  return escapeHtml(value).replaceAll("\n", "<br />");
};

const blockToMjml = (block: EmailBlock, textColor: string): string => {
  switch (block.type) {
    case "text":
      return `<mj-text align="${block.align}" font-size="${block.fontSize}px" color="${textColor}" line-height="1.55" padding="12px 24px">${textContentToMjml(block.content)}</mj-text>`;
    case "image":
      return `<mj-image src="${escapeAttribute(block.src)}" alt="${escapeAttribute(block.alt)}" width="${block.width}px" padding="4px 24px 14px" />`;
    case "button":
      return `<mj-button align="${block.align}" href="${escapeAttribute(block.url)}" background-color="#0F172A" color="#FFFFFF" font-size="15px" inner-padding="12px 20px" border-radius="6px" padding="8px 24px 14px">${escapeHtml(block.text)}</mj-button>`;
    case "divider":
      return `<mj-divider border-width="${block.thickness}px" border-color="${escapeAttribute(block.color)}" padding="${block.padding}px 24px" />`;
    default:
      return "";
  }
};

const wrapBlockInSection = (content: string, backgroundColor: string): string => {
  return `<mj-section background-color="${backgroundColor}" padding="0"><mj-column padding="0">${content}</mj-column></mj-section>`;
};

export const templateToMjml = (template: EmailTemplate): string => {
  const bodyContent = template.blocks
    .map((block) => wrapBlockInSection(blockToMjml(block, template.theme.textColor), template.theme.contentBackgroundColor))
    .join("");

  return `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="${escapeAttribute(template.theme.fontFamily)}" />
      <mj-section padding="0" />
      <mj-column padding="0" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="${escapeAttribute(template.theme.backgroundColor)}" width="${template.theme.contentWidth}px">
    ${bodyContent}
  </mj-body>
</mjml>`.trim();
};
