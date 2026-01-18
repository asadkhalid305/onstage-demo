import { type OnboardingTheme } from "onstage";

export interface PlaygroundConfig {
  theme: OnboardingTheme;
  backdrop: "default" | "blur" | "transparent";
  gradient: "animated" | "static" | "none";
  allowClickOutside: boolean;
  primaryColor: string;
  radius: number;
}

export const DEFAULT_CONFIG: PlaygroundConfig = {
  theme: "light",
  backdrop: "default",
  gradient: "animated",
  allowClickOutside: true,
  primaryColor: "#6366f1",
  radius: 0.5,
};
