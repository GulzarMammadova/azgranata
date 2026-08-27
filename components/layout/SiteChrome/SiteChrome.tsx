"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function SiteChrome() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}
