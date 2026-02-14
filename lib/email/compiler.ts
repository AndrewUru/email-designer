import "server-only";

import type { RenderResponse } from "@/lib/email/render-contract";

const normalizeErrors = (errors: unknown): string[] => {
  if (!Array.isArray(errors)) {
    return [];
  }

  return errors
    .map((error) => {
      if (typeof error === "string") {
        return error;
      }
      if (error && typeof error === "object" && "message" in error) {
        const maybeLine = "line" in error ? String((error as { line?: number }).line ?? "?") : "?";
        return `L${maybeLine}: ${String((error as { message?: string }).message ?? "Error desconocido")}`;
      }
      return "";
    })
    .filter(Boolean);
};

export const compileMjmlToInlinedHtml = async (mjml: string): Promise<RenderResponse> => {
  const baseResponse: RenderResponse = {
    html: "",
    mjml,
    errors: [],
  };

  try {
    const [{ default: mjml2html }, { default: juice }] = await Promise.all([import("mjml"), import("juice")]);

    const result = mjml2html(mjml, {
      validationLevel: "soft",
      minify: false,
      keepComments: false,
    });

    const html = juice(result.html, {
      removeStyleTags: false,
      preserveMediaQueries: true,
    });

    return {
      html,
      mjml,
      errors: normalizeErrors(result.errors),
    };
  } catch (error) {
    return {
      ...baseResponse,
      errors: [error instanceof Error ? error.message : "No se pudo compilar MJML"],
    };
  }
};
