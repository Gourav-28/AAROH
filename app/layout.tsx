import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AAROH — Learn in your own tongue",
  description:
    "AI-powered learning platform bridging Hindi/English curriculum with Santhali, for rural and tribal primary education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body min-h-screen">{children}</body>
    </html>
  );
}
