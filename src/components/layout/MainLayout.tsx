import Header from "@/components/layout/Header";
import React from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  opening?: React.ReactNode;
}

export default function MainLayout({ children, opening, className }: MainLayoutProps) {
  return (
    <>
      { opening && opening }
      <Header />

      <main className={className}>
        {children}
      </main>
    </>
  );
}
