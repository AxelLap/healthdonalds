import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Healthdonalds",
  description: "Start eating healthy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={cn(
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          "h-full"
        )}
      >
        <Toaster />
        <div className="flex flex-col min-h-full max-w-md m-auto border-x gap-2">
          <Header />
          <main className="py-4 px-2 flex-1">
            <div className="flex flex-col gap-2">
              <Card>
                <CardHeader>
                  <CardTitle>Test</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Test</CardTitle>
                </CardHeader>
              </Card>
            </div>

            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
