import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={cn("fixed w-full top-0 z-50 border-white", className)}>
      <Navbar />
    </header>
  )
}