import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { UsvaProvider } from "@/lib/store";
import { Sky } from "@/components/Sky";
import "./globals.css";

export const metadata: Metadata = {
  title: "Usva – vuosi tähän hetkeen",
  description: "Lempeä, ohjattu matka tähän hetkeen. A gentle, guided journey into the present.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0c0920" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fi">
      <body>
        <Sky />
        <UsvaProvider>{children}</UsvaProvider>
      </body>
    </html>
  );
}
