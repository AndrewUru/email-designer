import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { AppFooter } from "@/components/layout/app-footer";
import { AppHeader } from "@/components/layout/app-header";
import { TemplatePersistenceSync } from "@/components/editor/template-persistence-sync";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const APP_NAME = "Email Designer";
const APP_TAGLINE = "100% free & open source";

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_TAGLINE}`,
  description:
    "100% free y open source. Diseñá emails con editor no-code y modo Pro con MJML. Exportá/Render HTML. Repo público para PRs.",
  applicationName: APP_NAME,
  metadataBase: new URL("https://emaildesigner.elsaltoweb.es/"), // cámbialo por tu dominio cuando lo tengas
  openGraph: {
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description:
      "100% free y open source. Editor no-code + MJML Pro para diseñar emails y exportar HTML.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${APP_NAME} — ${APP_TAGLINE}`,
    description:
      "100% free y open source. Editor no-code + MJML Pro para diseñar emails y exportar HTML.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${manrope.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <TemplatePersistenceSync />
        <div className="flex min-h-dvh flex-col bg-slate-50 text-slate-900">
          <AppHeader />
          <div className="flex-1">{children}</div>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
