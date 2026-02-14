import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Email Designer MVP",
  description: "Herramienta gratuita para diseñar emails con modo no-code y modo pro MJML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${jetBrainsMono.variable} antialiased`}>
        <TemplatePersistenceSync />
        {children}
      </body>
    </html>
  );
}
