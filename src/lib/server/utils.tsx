"use server";

import { JSX } from "react";
import { GrLinkedin, GrGithub } from "react-icons/gr";
import { BsTwitterX } from "react-icons/bs";

export type SocialIconType = "linkedin" | "twitter" | "github";

export async function getSocialIcon(type: SocialIconType, size: number = 24): Promise<JSX.Element | null> {
  switch (type) {
    case "linkedin":
      return <GrLinkedin size={size} />;
    case "twitter":
      return <BsTwitterX size={size} />;
    case "github":
      return <GrGithub size={size} />;
    default:
      return null;
  }
}