import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";

export const metadata = {
  title: "Maruthuvan - AI Healthcare Platform",
  description: "AI-powered rural healthcare & telemedicine platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
