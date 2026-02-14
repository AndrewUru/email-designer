declare module "mjml" {
  interface MjmlError {
    line?: number;
    message?: string;
  }

  interface MjmlOptions {
    validationLevel?: "strict" | "soft" | "skip";
    minify?: boolean;
    keepComments?: boolean;
  }

  interface MjmlResult {
    html: string;
    errors: MjmlError[];
  }

  export default function mjml2html(mjml: string, options?: MjmlOptions): MjmlResult;
}
