import { useState, useEffect, useMemo } from "react";
import { OnboardingProvider, OnboardingModal, useOnboarding, type OnboardingStep } from "onstage";
import { hexToHsl } from "../../utils/colors";
import { type PlaygroundConfig, DEFAULT_CONFIG } from "./types";

interface OutputPanelProps {
  config: PlaygroundConfig;
}

const getPlaygroundSteps = (config: PlaygroundConfig): OnboardingStep[] => [
  {
    title: "Welcome to Onstage",
    description: `You are currently previewing the **${config.theme}** theme with a **${config.primaryColor}** primary color.`,
    image: {
      mobile: `https://placehold.co/400x500/${config.primaryColor.substring(1)}/fff?text=Welcome+to+Onstage+Modal`,
      tablet: `https://placehold.co/800x600/${config.primaryColor.substring(1)}/fff?text=Welcome+to+Onstage+Modal`,
      desktop: `https://placehold.co/1000x562/${config.primaryColor.substring(1)}/fff?text=Welcome+to+Onstage+Modal`,
    }
  },
  {
    title: "Responsive Design",
    description: `The **${config.theme}** layout adapts automatically. Try resizing your browser to see the mobile, tablet, and desktop image variants!`,
    image: {
      mobile: `https://placehold.co/400x500/1e293b/fff?text=Mobile+Portrait+(4:5)`,
      tablet: `https://placehold.co/800x600/4f46e5/fff?text=Tablet+View+(4:3)`,
      desktop: `https://placehold.co/1000x562/${config.primaryColor.substring(1)}/fff?text=Desktop+Landscape+(16:9)`
    }
  }
];

export function OutputPanel({ config }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"code" | "prompt">("prompt");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const playgroundSteps = useMemo(() => getPlaygroundSteps(config), [config]);
  const isDarkMode = config.theme === "dark" || config.theme === "glass" || config.theme === "midnight";

  // Package defaults per theme
  const THEME_DEFAULTS: Record<string, string> = {
    light: "#171717",
    dark: "#8249df",
    glass: "#ffffff",
    midnight: "#7c3aed",
    ocean: "#0ea5e9",
    sunset: "#f97316",
    minimal: "#000000"
  };

  const isPrimaryDefault = config.primaryColor.toLowerCase() === THEME_DEFAULTS[config.theme]?.toLowerCase();

  const generateCode = () => {
    const props = [];
    if (config.theme !== "light") props.push(`  theme="${config.theme}"`);
    if (config.backdrop !== "default") props.push(`  backdrop="${config.backdrop}"`);
    if (config.gradient !== "animated") props.push(`  gradient="${config.gradient}"`);
    if (!config.allowClickOutside) props.push(`  allowClickOutside={false}`);
    
    const styleProps = [];
    const hsl = hexToHsl(config.primaryColor);
    
    if (!isPrimaryDefault) {
      styleProps.push(`    '--primary': '${hsl}'`);
      const r = parseInt(config.primaryColor.substr(1, 2), 16);
      const g = parseInt(config.primaryColor.substr(3, 2), 16);
      const b = parseInt(config.primaryColor.substr(5, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      const foregroundHsl = brightness > 128 ? '0 0% 0%' : '0 0% 100%';
      styleProps.push(`    '--primary-foreground': '${foregroundHsl}'`);
    }

    if (config.radius !== 0.5) styleProps.push(`    '--radius': '${config.radius}rem'`);

    let styleString = "";
    if (styleProps.length > 0) {
      styleString = `\n  style={{
${styleProps.join(",\n")} 
  } as React.CSSProperties}`;
    }

    const modalTag = `<OnboardingModal${props.length > 0 ? `\n${props.join("\n")}` : ""}${styleString}${props.length > 0 || styleProps.length > 0 ? "\n/>" : " />"}`;

    return `import { OnboardingProvider, OnboardingModal } from "onstage";
import "onstage/styles.css";

const steps = [
  {
    title: "Welcome! 👋",
    description: "This is your first step.",
    image: "https://your-image-url.com/welcome.png"
  },
  // Add more steps here...
];

export default function App() {
  return (
    <OnboardingProvider steps={steps} defaultOpen={true}>
      <YourApp />
      ${modalTag}
    </OnboardingProvider>
  );
}`;
  };

  const generatePrompt = () => {
    const hasCustomSettings = 
      config.theme !== "light" || 
      config.backdrop !== "default" || 
      config.gradient !== "animated" || 
      !config.allowClickOutside || 
      !isPrimaryDefault || 
      config.radius !== 0.5;

    const setupInstructions = [
      "1. Install the package: `npm install onstage`",
      "2. Import the styles in my root file (App.tsx or main.tsx): `import 'onstage/styles.css'`",
      hasCustomSettings 
        ? "3. Implement the onboarding flow with these specific settings:"
        : "3. Implement the onboarding flow using the default settings from the package.",
    ];

    const parts = [
      "I want to add a professional onboarding wizard to my React app using the 'onstage' library.",
      "",
      "Please refer to the official documentation for full API details: https://github.com/asadkhalid305/onstage",
      "",
      ...setupInstructions,
      "",
    ];

    if (!hasCustomSettings) {
      parts.push("To implement this, wrap your main application component with the `OnboardingProvider` and place the `OnboardingModal` inside it. Use the `steps` array discussed below.");
    }

    if (config.theme !== "light") {
      parts.push(`- Theme: Use the "${config.theme}" preset.`);
    }

    if (config.backdrop !== "default") {
      parts.push(`- Backdrop: Set it to "${config.backdrop}".`);
    }

    if (config.gradient !== "animated") {
      parts.push(`- Gradient: Set the background gradient to "${config.gradient}".`);
    }

    if (!config.allowClickOutside) {
      parts.push("- Interaction: Enable Strict Mode (disable clicking outside to close).");
    }

    if (!isPrimaryDefault) {
      parts.push(`- Brand Color: Override the primary color to HSL "${hexToHsl(config.primaryColor)}". Ensure high contrast foreground text.`);
    }

    if (config.radius !== 0.5) {
      parts.push(`- Styling: Set the border radius to ${config.radius}rem.`);
    }

    parts.push("");
    parts.push("### Step Structure Example:");
    parts.push("The `steps` array should follow this structure (including responsive images if needed):");
    parts.push("```typescript");
    parts.push("const steps = [");
    parts.push("  {");
    parts.push("    title: 'Welcome!',");
    parts.push("    description: 'A beautiful description.',");
    parts.push("    image: { mobile: '...', tablet: '...', desktop: '...' } // Or just a string URL");
    parts.push("  }");
    parts.push("];");
    parts.push("```");
    parts.push("");
    parts.push("### Implementation Summary:");
    parts.push("```tsx");
    parts.push("<OnboardingProvider steps={steps} defaultOpen={true}>");
    parts.push("  <AppContent />");
    parts.push("  <OnboardingModal />");
    parts.push("</OnboardingProvider>");
    parts.push("```");

    return parts.join("\n");
  };

  return (
    <div style={{ 
      background: '#111827', 
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0, // Important for nested flex scroll
      overflow: 'hidden',
      position: 'relative' // Ensure relative positioning for contained elements
    }}>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #374151',
        background: '#1f2937'
      }}>
        {/* Left: Tabs */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <button 
            onClick={() => setActiveTab("prompt")}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeTab === "prompt" ? 'white' : '#9ca3af', 
              fontWeight: '700', 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              borderBottom: activeTab === "prompt" ? '2px solid #a855f7' : '2px solid transparent',
              paddingBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>✨ AI PROMPT</span>
          </button>
          <button 
            onClick={() => setActiveTab("code")}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeTab === "code" ? 'white' : '#9ca3af', 
              fontWeight: '700', 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              borderBottom: activeTab === "code" ? '2px solid #6366f1' : '2px solid transparent',
              paddingBottom: '4px'
            }}
          >
            REACT CODE
          </button>
        </div>

        {/* Center: Launch Button */}
        <LaunchButton onLaunch={() => setIsPreviewOpen(true)} />

        {/* Right: Copy Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => navigator.clipboard.writeText(activeTab === "code" ? generateCode() : generatePrompt())}
            style={{ 
              background: 'rgba(255,255,255,0.1)', 
              color: 'white', 
              border: 'none', 
              padding: '6px 12px', 
              borderRadius: '6px', 
              fontSize: '0.8rem', 
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            Copy
          </button>
        </div>
      </div>

      <div style={{ 
        padding: '24px', 
        overflowY: 'auto',
        flex: 1
      }}>
        <pre style={{ margin: 0 }}>
          <code style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#e5e7eb', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
            {activeTab === "code" ? generateCode() : generatePrompt()}
          </code>
        </pre>
      </div>

      {isPreviewOpen && (
        <OnboardingProvider 
          steps={playgroundSteps} 
          defaultOpen={true}
          onFinish={() => setIsPreviewOpen(false)}
          onSkip={() => setIsPreviewOpen(false)}
        >
          <ModalWrapper config={config} />
        </OnboardingProvider>
      )}
    </div>
  );
}

function LaunchButton({ onLaunch }: { onLaunch: () => void }) {
  return (
    <button 
      onClick={onLaunch}
      style={{
        padding: '8px 16px',
        fontSize: '0.9rem',
        fontWeight: '600',
        background: 'white',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.1s'
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      Open Preview
    </button>
  );
}

function ModalWrapper({ config }: { config: PlaygroundConfig }) {
  const hsl = hexToHsl(config.primaryColor);
  
  const r = parseInt(config.primaryColor.substr(1, 2), 16);
  const g = parseInt(config.primaryColor.substr(3, 2), 16);
  const b = parseInt(config.primaryColor.substr(5, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const foregroundHsl = brightness > 128 ? '0 0% 0%' : '0 0% 100%';

  const style = {
    '--primary': hsl,
    '--primary-foreground': foregroundHsl,
    ...(config.radius !== 0.5 ? { '--radius': `${config.radius}rem` } : {}),
  } as React.CSSProperties;

  return (
    <OnboardingModal 
      theme={config.theme}
      backdrop={config.backdrop}
      gradient={config.gradient}
      allowClickOutside={config.allowClickOutside}
      style={style}
    />
  );
}
