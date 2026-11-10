import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { UsvaProvider } from "@/lib/store";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usva – vuosi tähän hetkeen",
  description: "Lempeä, ohjattu matka tähän hetkeen. A gentle, guided journey into the present.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#120d22" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi">
      <body>
        <UsvaProvider>{children}</UsvaProvider>
      </body>
    </html>
  );
}
