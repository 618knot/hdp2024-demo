import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const NotoSansJP = Noto_Sans_JP({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ハードウェアデザインプロジェクト DEMO",
};

export default function RootLayout({
  children,
  menubar,
}: Readonly<{
  children: React.ReactNode;
  menubar: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={NotoSansJP.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <Toaster />
          {menubar}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
