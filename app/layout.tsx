// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shoplinky",
  description: "Next gen digital creators shop",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-gray-100`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
