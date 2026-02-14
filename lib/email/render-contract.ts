import type { EmailTemplate } from "@/lib/email/types";

export interface TemplateRenderRequest {
  mode: "template";
  template: EmailTemplate;
}

export interface MjmlRenderRequest {
  mode: "mjml";
  mjml: string;
}

export type RenderRequest = TemplateRenderRequest | MjmlRenderRequest;

export interface RenderResponse {
  html: string;
  mjml: string;
  errors: string[];
}
