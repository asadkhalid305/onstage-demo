import { type OnboardingModalProps } from "onstage";

export interface Scenario {
  id: string;
  category: "Interaction" | "Backdrop" | "Themes";
  label: string;
  description: string;
  modalProps: OnboardingModalProps;
}

export const scenarios: Scenario[] = [
  // --- Interaction Modes ---
  {
    id: "permissive",
    category: "Interaction",
    label: "Permissive (Default)",
    description: "User can click the background or press ESC to close the modal.",
    modalProps: {
      theme: "light",
      allowClickOutside: true
    }
  },
  {
    id: "strict",
    category: "Interaction",
    label: "Strict (Locked)",
    description: "Clicking outside is disabled. User must finish or skip.",
    modalProps: {
      theme: "light",
      allowClickOutside: false
    }
  },
  // --- Backdrop ---
  {
    id: "backdrop-blur",
    category: "Backdrop",
    label: "Blurred Backdrop",
    description: "Frosted glass effect behind the modal.",
    modalProps: {
      theme: "light",
      backdrop: "blur"
    },
  },
  {
    id: "backdrop-transparent",
    category: "Backdrop",
    label: "Transparent Backdrop",
    description: "No visual overlay. Modal feels like part of the page.",
    modalProps: {
      theme: "light",
      backdrop: "transparent"
    },
  },
  // --- Themes ---
  {
    id: "dark",
    category: "Themes",
    label: "Dark Mode",
    description: "Standard polished dark mode experience.",
    modalProps: { theme: "dark" },
  },
  {
    id: "glass",
    category: "Themes",
    label: "Glassmorphism",
    description: "Frosted glass with heavy blur and translucent layers.",
    modalProps: { theme: "glass" },
  },
  {
    id: "midnight",
    category: "Themes",
    label: "Midnight",
    description: "Premium deep purple dark mode.",
    modalProps: { theme: "midnight" },
  },
  {
    id: "minimal",
    category: "Themes",
    label: "Minimal (Brutalist)",
    description: "Sharp corners, thick borders, no gradients.",
    modalProps: { theme: "minimal" }
  },
  {
    id: "ocean",
    category: "Themes",
    label: "Ocean Blue",
    description: "Soft blue palette for a calming experience.",
    modalProps: { theme: "ocean" }
  },
  {
    id: "sunset",
    category: "Themes",
    label: "Sunset Orange",
    description: "Warm orange tones for high energy.",
    modalProps: { theme: "sunset" }
  }
];
