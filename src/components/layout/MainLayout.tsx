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
    <div className={cn(`min-h-dvh`, className)}>
      { opening && opening }
      <Header />

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
