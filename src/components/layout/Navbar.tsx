"use server";

import { GlassNav, GlassNavItem } from "@/components/GlassNav";
import * as navbarContent from "#/content/navbar.mdx";

interface NavbarProps {
  label: string;
  items: {
    label: string;
    href: string;
    ariaLabel: string;
  }[];
}

const Navbar = async () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company", href: "#" },
        { label: "Careers", ariaLabel: "About Careers", href: "#" },
      ],
    },
    {
      label: "Projects",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects", href: "#" },
        { label: "Case Studies", ariaLabel: "Project Case Studies", href: "#" },
      ],
    },
    {
      label: "Contact",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us", href: "#" },
        { label: "Twitter", ariaLabel: "Twitter", href: "#" },
        { label: "LinkedIn", ariaLabel: "LinkedIn", href: "#" },
      ],
    },
  ];

  const navbarFrontmatter = (navbarContent as { frontmatter?: NavbarProps }).frontmatter;

  return (
    <GlassNav label={navbarFrontmatter?.label ?? "Default Label"} ariaLabel="Main navigation">
      {navbarFrontmatter?.items.map((item) => (
        <GlassNavItem key={item.label} ariaLabel={item.ariaLabel}>
          {item.label}
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
