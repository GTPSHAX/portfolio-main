"use server";

import { frontmatter } from "#/content/navbar.mdx";
import Link from "next/link";
import { MonospaceNav, MonospaceNavBrand, MonospaceNavItem, MonospaceNavItemList } from "../MonospaceNav";

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
    <MonospaceNav
      ariaLabel={navbarFrontmatter.label}
      className=""
    >
      <MonospaceNavBrand href="/" ariaLabel="Brand Logo">
        {navbarFrontmatter.label}
      </MonospaceNavBrand>

      <MonospaceNavItemList ariaLabel="Navigation Items">
        {navbarFrontmatter.items.map((item) => (
          <MonospaceNavItem key={item.label} ariaLabel={item.ariaLabel}>
            <Link
              href={item.href}
              className="flex-1 text-center"
              aria-label={item.ariaLabel}
              prefetch={false}
            >
              {item.label}
            </Link>
          </MonospaceNavItem>
        ))}
      </MonospaceNavItemList>
    </MonospaceNav>
  );
};

export default Navbar;
