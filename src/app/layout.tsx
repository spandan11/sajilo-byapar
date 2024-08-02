import "@/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Figtree, Poppins, Roboto_Slab } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { AuthSessionProvider, ThemeProvider } from "@/lib/providers";
import { Toaster } from "@/components/ui/toaster";

// const inter = Figtree({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });
// const robotoSlab = Roboto_Slab({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
// });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
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
      <body className={`font-sans ${poppins.className}`}>
        <TRPCReactProvider>
          <AuthSessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextSSRPlugin
                /**
                 * The `extractRouterConfig` will extract **only** the route configs
                 * from the router to prevent additional information from being
                 * leaked to the client. The data passed to the client is the same
                 * as if you were to fetch `/api/uploadthing` directly.
                 */
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthSessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
