import "../globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionProviderWrapper from "./components/SessionProviderWrapper";

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <head>
          <title>Digital Humanities</title>
        </head>
        <body className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
        </body>
      </html>
    </SessionProviderWrapper>
  );
}
