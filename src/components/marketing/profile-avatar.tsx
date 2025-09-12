"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface ProfileAvatarProps {
  name: string;
  image?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallbackType?: "initials" | "first-char";
  className?: string;
}

/**
 * Reusable profile avatar component with consistent sizing and fallback logic.
 * Used across team member and testimonial components.
 */
export function ProfileAvatar({
  name,
  image,
  size = "md",
  fallbackType = "initials",
  className,
}: ProfileAvatarProps) {
  // Generate better fallback initials from first and last name
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const getFallbackText = () => {
    return fallbackType === "initials" ? getInitials(name) : name.charAt(0);
  };

  const sizeClasses = {
    xs: "size-7.5",
    sm: "size-9",
    md: "size-10",
    lg: "size-20",
    xl: "size-24",
  };

  const fallbackTextClasses = {
    xs: "text-xs font-medium",
    sm: "text-xs font-medium",
    md: "text-sm font-medium",
    lg: "text-base font-medium",
    xl: "text-lg font-medium",
  };

  return (
    <Avatar className={cn(sizeClasses[size], "shrink-0", className)}>
      {image ? (
        <AvatarImage src={image} alt={name} />
      ) : (
        <AvatarFallback className={fallbackTextClasses[size]}>
          {getFallbackText()}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

ProfileAvatar.displayName = "ProfileAvatar";
