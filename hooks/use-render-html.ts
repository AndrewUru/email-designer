"use client";

import { useEffect, useMemo, useState } from "react";

import type { RenderRequest, RenderResponse } from "@/lib/email/render-contract";

interface RenderState {
  html: string;
  mjml: string;
  errors: string[];
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: RenderState = {
  html: "",
  mjml: "",
  errors: [],
  isLoading: false,
  errorMessage: null,
};

export const useRenderHtml = (request: RenderRequest) => {
  const [state, setState] = useState<RenderState>(initialState);
  const requestBody = useMemo(() => JSON.stringify(request), [request]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setState((current) => ({ ...current, isLoading: true, errorMessage: null }));

      try {
        const response = await fetch("/api/render", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Render falló con estado ${response.status}`);
        }

        const payload = (await response.json()) as RenderResponse;
        setState({
          html: payload.html,
          mjml: payload.mjml,
          errors: payload.errors ?? [],
          isLoading: false,
          errorMessage: null,
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }
        setState((current) => ({
          ...current,
          isLoading: false,
          errorMessage: error instanceof Error ? error.message : "No se pudo renderizar",
        }));
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [requestBody]);

  return state;
};
