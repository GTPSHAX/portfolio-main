export type SocialIconType = "linkedin" | "twitter" | "github";

interface SocialLinkFrontmatter {
  type: SocialIconType;
  href: string;
  ariaLabel: string;
}

export interface HeroSectionFrontmatter {
  name: string;
  bigBoldTypography: string;
  socialLinks: SocialLinkFrontmatter[];
  openToWork: boolean;
  roles: string[];
}

export interface AboutSectionFrontmatter {
  title: string;
  description: string;
}
