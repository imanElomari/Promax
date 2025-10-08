import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import localFont from "next/font/local";
import "./app.css";
import Header from "@/components/Header";
import { ViewCanvas } from "@/components/ViewCanvas";
import Footer from "@/components/Footer";

const apino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino ",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={apino.variable}>
      {/* Inline initial paint to avoid FOUC / background flash before external CSS loads */}
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `/* initial paint */ html, body { background-color: #FFD1C4; }`,
          }}
        />
      </head>
      <body className="overflow-x-hidden bg-yellow-300">
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
        <Footer />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
