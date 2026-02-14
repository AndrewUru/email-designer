"use client";

import { useEffect, useRef } from "react";

import { useEmailStore } from "@/store/email-store";

export function TemplatePersistenceSync() {
  const template = useEmailStore((state) => state.template);
  const saveTemplateToLocalStorage = useEmailStore((state) => state.saveTemplateToLocalStorage);
  const loadTemplateFromLocalStorage = useEmailStore((state) => state.loadTemplateFromLocalStorage);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (hasHydratedRef.current) {
      return;
    }

    loadTemplateFromLocalStorage();
    hasHydratedRef.current = true;
  }, [loadTemplateFromLocalStorage]);

  useEffect(() => {
    if (!hasHydratedRef.current) {
      return;
    }

    saveTemplateToLocalStorage();
  }, [template, saveTemplateToLocalStorage]);

  return null;
}
