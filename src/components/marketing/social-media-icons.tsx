import React from "react";
import {
  FaDiscord,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaSlack,
  FaTiktok,
  FaTwitter,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";
import { cn } from "@/lib/utils";

const socialMediaIconMap = {
  twitter: FaTwitter,
  x: FaXTwitter,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  instagram: FaInstagram,
  github: FaGithub,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  email: FaEnvelope,
  discord: FaDiscord,
  slack: FaSlack,
} as const;

const socialMediaNames = {
  twitter: "Twitter",
  x: "X",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  github: "GitHub",
  youtube: "YouTube",
  tiktok: "TikTok",
  email: "Email",
  discord: "Discord",
  slack: "Slack",
} as const;

export type SocialMediaIconType = keyof typeof socialMediaIconMap;

export const getSocialMediaIcon = (type: string) => {
  if (!(type in socialMediaIconMap)) {
    return null;
  }
  return socialMediaIconMap[type as SocialMediaIconType];
};

export const getSocialMediaName = (type: string) => {
  if (!(type in socialMediaNames)) {
    return type;
  }
  return socialMediaNames[type as SocialMediaIconType];
};

export interface SocialMediaLink {
  type: string;
  href: string;
}

export interface SocialMediaIconsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The collection of social link objects to render.
   */
  links: SocialMediaLink[];
  /**
   * Pixel size for each icon. Defaults to `16`.
   */
  iconSize?: number;
  /**
   * Gap utility class or numeric value between items. Defaults to Tailwind's `gap-3`.
   */
  gapClassName?: string;
}

export function SocialMediaIcons({
  links,
  iconSize = 16,
  gapClassName = "gap-3",
  className,
  ...props
}: SocialMediaIconsProps) {
  if (!links || links.length === 0) return null;

  return (
    <div
      className={cn("flex items-center", gapClassName, className)}
      {...props}
    >
      {links.map(({ type, href }) => {
        const IconComponent = getSocialMediaIcon(type);
        if (!IconComponent) return null;

        return (
          <Link
            key={`${type}-${href}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getSocialMediaName(type)}
            className="hover:underline transition-colors"
          >
            <IconComponent size={iconSize} aria-hidden="true" />
          </Link>
        );
      })}
    </div>
  );
}

SocialMediaIcons.displayName = "SocialMediaIcons";

// Export for backward compatibility
export { socialMediaIconMap as socialMediaIcons };
