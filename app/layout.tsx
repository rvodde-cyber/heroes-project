import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HEROES Project · Moral Craftsmanship",
  description: "Participant Reflection Form",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
