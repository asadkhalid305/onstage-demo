import { useState } from "react";
import { OnboardingProvider, OnboardingModal, useOnboarding, type OnboardingModalProps, type OnboardingTheme, type OnboardingStep } from "onstage";

// Default Steps for the Playground
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
];

export function Playground() {
  // --- State ---
  const [config, setConfig] = useState<{ 
    theme: OnboardingTheme;
    backdrop: "default" | "blur" | "transparent";
    gradient: "animated" | "static" | "none";
    allowClickOutside: boolean;
    primaryColor: string;
    radius: number;
  }>({
    theme: "light",
    backdrop: "default",
    gradient: "animated",
    allowClickOutside: true,
    primaryColor: "#000000",
    radius: 0.5,
  });

  const generateCode = () => {
    const props = [];
    if (config.theme !== "light") props.push(`  theme="${config.theme}"`);
    if (config.backdrop !== "default") props.push(`  backdrop="${config.backdrop}"`);
    if (config.gradient !== "animated") props.push(`  gradient="${config.gradient}"`);
    if (!config.allowClickOutside) props.push(`  allowClickOutside={false}`);
    
    // Style prop generation
    const styleProps = [];
    if (config.primaryColor !== "#000000") styleProps.push(`    '--primary': '${config.primaryColor}'`);
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

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', minHeight: '600px' }}>
      
      {/* --- Sidebar Controls --- */}
      <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px' }}>Configurator</h2>
        
        {/* Theme */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Theme</label>
          <select 
            value={config.theme}
            onChange={(e) => setConfig(prev => ({ ...prev, theme: e.target.value as OnboardingTheme }))}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="glass">Glass</option>
            <option value="midnight">Midnight</option>
            <option value="minimal">Minimal</option>
            <option value="ocean">Ocean</option>
            <option value="sunset">Sunset</option>
          </select>
        </div>

        {/* Backdrop */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Backdrop</label>
          <select 
            value={config.backdrop}
            onChange={(e) => setConfig(prev => ({ ...prev, backdrop: e.target.value as any }))}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          >
            <option value="default">Default</option>
            <option value="blur">Blur</option>
            <option value="transparent">Transparent</option>
          </select>
        </div>

        {/* Gradient */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Gradient</label>
          <select 
            value={config.gradient}
            onChange={(e) => setConfig(prev => ({ ...prev, gradient: e.target.value as any }))}
            style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}
          >
            <option value="animated">Animated</option>
            <option value="static">Static</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Interaction */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={config.allowClickOutside}
              onChange={(e) => setConfig(prev => ({ ...prev, allowClickOutside: e.target.checked }))}
              style={{ marginRight: '10px' }}
            />
            Allow Click Outside
          </label>
        </div>

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />

        {/* Colors */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Primary Color</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input 
              type="color" 
              value={config.primaryColor}
              onChange={(e) => setConfig(prev => ({ ...prev, primaryColor: e.target.value }))}
              style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer', padding: 0, background: 'none' }}
            />
            <span style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'monospace' }}>{config.primaryColor}</span>
          </div>
        </div>

        {/* Radius */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Border Radius: {config.radius}rem</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1"
            value={config.radius}
            onChange={(e) => setConfig(prev => ({ ...prev, radius: parseFloat(e.target.value) }))}
            style={{ width: '100%' }}
          />
        </div>

      </div>

      {/* --- Preview & Code --- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Preview Area */}
        <div style={{ 
          flex: 1, 
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', 
          borderRadius: '16px', 
          border: '1px solid #d1d5db',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px', color: '#374151' }}>Preview Area</h3>
          
          {/* We mount the provider here with the current config */}
          <OnboardingProvider 
            key={JSON.stringify(config)} // Force remount on config change
            steps={playgroundSteps} 
            defaultOpen={false} 
          >
            <div style={{marginBottom: '20px'}}>
               <LaunchButton />
            </div>
            <ModalWrapper config={config} />
          </OnboardingProvider>
        </div>

        {/* Code Output */}
        <div style={{ background: '#111827', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.05em' }}>REACT CODE</span>
            <button 
              onClick={() => navigator.clipboard.writeText(generateCode())}
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Copy
            </button>
          </div>
          <pre style={{ margin: 0, overflowX: 'auto' }}>
            <code style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#e5e7eb', lineHeight: '1.5' }}>
              {generateCode()}
            </code>
          </pre>
        </div>

      </div>
    </div>
  );
}

// Helper component to trigger the modal from inside the provider
function LaunchButton() {
  const { resetOnboarding } = useOnboarding();
  return (
    <button 
      onClick={resetOnboarding}
      style={{
        padding: '16px 32px',
        fontSize: '1.1rem',
        fontWeight: '600',
        background: 'white',
        color: 'black',
        border: '1px solid #ccc',
        borderRadius: '12px',
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

// Wrapper to inject props
function ModalWrapper({ config }: { config: any }) {
  // Convert config to props
  const style = {
    ...(config.primaryColor !== "#000000" ? { '--primary': config.primaryColor } : {}),
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