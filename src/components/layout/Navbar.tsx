"use server";

import { GlassNav, GlassNavItem } from "@/components/GlassNav";
import { frontmatter } from "#/content/navbar.mdx";
import Link from "next/link";

interface NavbarProps {
  label: string;
  items: {
    label: string;
    href: string;
    ariaLabel: string;
  }[];
}

const Navbar = async () => {
  const navbarFrontmatter = frontmatter as NavbarProps;

  return (
    <GlassNav label={navbarFrontmatter?.label ?? "Default Label"} ariaLabel="Main navigation">
      {navbarFrontmatter?.items.map((item) => (
        <GlassNavItem key={item.label} ariaLabel={item.ariaLabel}>
          <Link
            href={item.href}
            className="flex h-full w-full items-center justify-center px-4 py-2"
            aria-label={item.ariaLabel}
          >
            {item.label}
          </Link>
        </GlassNavItem>
      ))}
    </GlassNav>
    // <CardNav
    //   logo={vercel.src}
    //   logoAlt="Company Logo"
    //   items={items}
    //   baseColor="#fff"
    //   menuColor="#000"
    //   buttonBgColor="#111"
    //   buttonTextColor="#fff"
    //   ease="power3.out"
    // />
  );
};

export default Navbar;
