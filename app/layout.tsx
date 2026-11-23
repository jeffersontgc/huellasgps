import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HuellaGPS | Búsqueda y Rescate en Moto - Granada, Nicaragua",
  description: "App táctica de rastreo GPS en moto para búsqueda de perritos perdidos en Granada, Nicaragua.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full bg-slate-950">
      <body className="h-full m-0 p-0 overflow-hidden bg-slate-950">{children}</body>
    </html>
  );
}
