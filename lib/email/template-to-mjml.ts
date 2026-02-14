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

const blockToMjml = (block: EmailBlock, textColor: string, contentBackgroundColor: string): string => {
  switch (block.type) {
    case "text":
      return `<mj-text align="${block.align}" font-size="${block.fontSize}px" color="${textColor}" line-height="1.55" padding="12px 24px">${textContentToMjml(block.content)}</mj-text>`;
    case "image":
      return `<mj-image src="${escapeAttribute(block.src)}" alt="${escapeAttribute(block.alt)}" width="${block.width}px" padding="4px 24px 14px" />`;
    case "button":
      return `<mj-button align="${block.align}" href="${escapeAttribute(block.url)}" background-color="#0F172A" color="#FFFFFF" font-size="15px" inner-padding="12px 20px" border-radius="6px" padding="8px 24px 14px">${escapeHtml(block.text)}</mj-button>`;
    case "divider":
      return `<mj-divider border-width="${block.thickness}px" border-color="${escapeAttribute(block.color)}" padding="${block.padding}px 24px" />`;
    case "columns2":
      return `<mj-section background-color="${escapeAttribute(block.backgroundColor || contentBackgroundColor)}" padding="0">
        <mj-column width="50%" padding="${block.padding}px 12px ${block.padding}px 24px">
          <mj-text color="${textColor}" font-size="16px" font-weight="700" line-height="1.4" padding="0 0 8px">${textContentToMjml(block.leftTitle)}</mj-text>
          <mj-text color="${textColor}" font-size="14px" line-height="1.55" padding="0">${textContentToMjml(block.leftContent)}</mj-text>
        </mj-column>
        <mj-column width="50%" padding="${block.padding}px 24px ${block.padding}px 12px">
          <mj-text color="${textColor}" font-size="16px" font-weight="700" line-height="1.4" padding="0 0 8px">${textContentToMjml(block.rightTitle)}</mj-text>
          <mj-text color="${textColor}" font-size="14px" line-height="1.55" padding="0">${textContentToMjml(block.rightContent)}</mj-text>
        </mj-column>
      </mj-section>`;
    default:
      return "";
  }
};

const wrapBlockInSection = (content: string, backgroundColor: string): string => {
  return `<mj-section background-color="${backgroundColor}" padding="0"><mj-column padding="0">${content}</mj-column></mj-section>`;
};

export const templateToMjml = (template: EmailTemplate): string => {
  const bodyContent = template.blocks
    .map((block) => {
      if (block.type === "columns2") {
        return blockToMjml(block, template.theme.textColor, template.theme.contentBackgroundColor);
      }

      return wrapBlockInSection(
        blockToMjml(block, template.theme.textColor, template.theme.contentBackgroundColor),
        template.theme.contentBackgroundColor,
      );
    })
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
