import { type OnboardingStep } from "onstage";

export const baseSteps: OnboardingStep[] = [
  {
    title: "Welcome to Onstage",
    description: "This is a demo of the **Onstage** library.",
    image: "https://placehold.co/1000x562/1e293b/fff?text=Welcome+to+Onstage", 
  },
  {
    title: "Backdrop Control",
    description: "Notice the background behind the modal? You can make it **blur**, **transparent**, or **dark**.",
    image: {
      mobile: "https://placehold.co/400x500/475569/fff?text=Mobile+Portrait+(4:5)",
      tablet: "https://placehold.co/800x600/4f46e5/fff?text=Tablet+View+(4:3)",
      desktop: "https://placehold.co/1000x562/1e293b/fff?text=Desktop+Landscape+(16:9)"
    }
  },
];
