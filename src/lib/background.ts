export type BgToken =
  | "none"
  | "default"
  | "card"
  | "primary"
  | "secondary"
  | "muted"
  | "accent"
  | "inverse";

export type BgImage = {
  src: string;
  position?: string; // default "center"
  size?: string; // default "cover"
  repeat?: string; // default "no-repeat"
  overlay?: string; // className for overlay
  token?: BgToken; // optional base token for bg + text mapping
};

export type Bg = BgToken | BgImage;

export const bgTokenClasses: Record<BgToken, string> = {
  none: "",
  default: "bg-background text-foreground",
  card: "bg-card text-card-foreground",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  muted: "bg-muted text-muted-foreground",
  accent: "bg-accent text-accent-foreground",
  inverse: "bg-foreground text-background",
};

export function resolveBgClasses(bg?: Bg): string {
  if (!bg || typeof bg === "string") {
    return bgTokenClasses[(bg ?? "none") as BgToken] || "";
  }
  return bg.token ? bgTokenClasses[bg.token] : "";
}
