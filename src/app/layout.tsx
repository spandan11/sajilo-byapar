import "@/styles/globals.css";

import { Figtree } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { AuthSessionProvider, ThemeProvider } from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Sajilo Byapar",
  description: "Grow your online business to the next level",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <AuthSessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthSessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
