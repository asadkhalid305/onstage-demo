import { useState } from "react";
import { hexToHsl } from "../../utils/colors";
import { type PlaygroundConfig, DEFAULT_CONFIG } from "./types";

interface OutputPanelProps {
  config: PlaygroundConfig;
}

export function OutputPanel({ config }: OutputPanelProps) {
  const [activeTab, setActiveTab] = useState<"code" | "prompt">("prompt");

  const generateCode = () => {
    const props = [];
    if (config.theme !== "light") props.push(`  theme="${config.theme}"`);
    if (config.backdrop !== "default") props.push(`  backdrop="${config.backdrop}"`);
    if (config.gradient !== "animated") props.push(`  gradient="${config.gradient}"`);
    if (!config.allowClickOutside) props.push(`  allowClickOutside={false}`);
    
    const styleProps = [];
    if (config.primaryColor !== DEFAULT_CONFIG.primaryColor) {
      const hsl = hexToHsl(config.primaryColor);
      styleProps.push(`    '--primary': '${hsl}'`);
    }
    if (config.radius !== 0.5) styleProps.push(`    '--radius': '${config.radius}rem'`);

    let styleString = "";
    if (styleProps.length > 0) {
      styleString = `
  style={{
${styleProps.join(",\n")} 
  } as React.CSSProperties}`;
    }

    return `<OnboardingModal
${props.join("\n")}${styleString}
/>`;
  };

  const generatePrompt = () => {
    const parts = [
      "I want to add a professional onboarding wizard to my React app using the 'onstage' library.",
      "",
      "Please refer to the official documentation for full API details: https://github.com/asadkhalid305/onstage",
      "",
      "1. Install the package: `npm install onstage`",
      "2. Import the styles in my root file (App.tsx or main.tsx): `import 'onstage/styles.css'`",
      "3. Implement the onboarding flow with these specific settings:",
      "",
      `- Theme: Use the "${config.theme}" preset.`, 
    ];

    if (config.backdrop !== "default") {
      parts.push(`- Backdrop: Set it to "${config.backdrop}".`);
    }

    if (config.gradient !== "animated") {
      parts.push(`- Gradient: Set the background gradient to "${config.gradient}".`);
    }

    if (!config.allowClickOutside) {
      parts.push("- Interaction: Enable Strict Mode (disable clicking outside to close).");
    }

    if (config.primaryColor !== DEFAULT_CONFIG.primaryColor) {
      parts.push(`- Brand Color: Override the primary color to HSL "${hexToHsl(config.primaryColor)}". Ensure high contrast foreground text.`);
    }

    if (config.radius !== 0.5) {
      parts.push(`- Styling: Set the border radius to ${config.radius}rem.`);
    }

    parts.push("");
    parts.push("Please set up the provider and modal with these props.");

    return parts.join("\n");
  };

  return (
    <div style={{ 
      background: '#111827', 
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: 0, // Important for nested flex scroll
      overflow: 'hidden' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px',
        borderBottom: '1px solid #374151',
        background: '#1f2937'
      }}>
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
    </div>
  );
}
