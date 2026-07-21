import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import DeviceFrame from "@/components/DeviceFrame";
import { AuthProvider } from "@/components/auth";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "EmbarqueSoft Mobile App",
  description: "Mobile-first prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} antialiased`}>
      <body className="m-0 font-sans bg-background text-foreground">
        <AuthProvider>
          <DeviceFrame>
            {children}
          </DeviceFrame>
        </AuthProvider>
      </body>
    </html>
  );
}

