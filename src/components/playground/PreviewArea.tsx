import React from "react";
import { OnboardingProvider, OnboardingModal, useOnboarding, type OnboardingStep } from "onstage";
import { hexToHsl } from "../../utils/colors";
import { type PlaygroundConfig } from "./types";

const playgroundSteps: OnboardingStep[] = [
  {
    title: "Design Your Experience",
    description: "Use the controls to **customize** this modal in real-time.",
    image: "https://placehold.co/1000x562/3b82f6/fff?text=Playground+Preview",
  },
  {
    title: "Copy & Paste",
    description: "When you are happy with the look, **copy the code** below!",
    image: "https://placehold.co/1000x562/10b981/fff?text=Ready+to+Ship",
  },
  {
      title: "All Done",
      description: "You are ready to go!",
      image: "https://placehold.co/1000x562/6366f1/fff?text=Done",
  }
];

interface PreviewAreaProps {
  config: PlaygroundConfig;
}

export function PreviewArea({ config }: PreviewAreaProps) {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', 
      borderBottom: '1px solid #d1d5db',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '200px', // Reduced height as requested
      flexShrink: 0, // Don't shrink below content
    }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px', color: '#374151' }}>Preview</h3>
      
      <OnboardingProvider 
        steps={playgroundSteps} 
        defaultOpen={false} 
      >
        <div style={{ marginBottom: '20px' }}>
            <LaunchButton />
        </div>
        <ModalWrapper config={config} />
      </OnboardingProvider>
    </div>
  );
}

function LaunchButton() {
  const { resetOnboarding } = useOnboarding();
  return (
    <button 
      onClick={resetOnboarding}
      style={{
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: '600',
        background: 'white',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '10px',
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
    ...(config.primaryColor !== "#6366f1" ? { 
      '--primary': hsl,
      '--primary-foreground': foregroundHsl
    } : {}),
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
