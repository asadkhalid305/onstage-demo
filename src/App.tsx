import { useState } from "react";
import { OnboardingProvider, OnboardingModal, type OnboardingStep, type OnboardingModalProps } from "onstage";
import { Playground } from "./Playground";

// --- Data & Configurations ---

const baseSteps: OnboardingStep[] = [
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

interface Scenario {
  id: string;
  category: "Interaction" | "Backdrop" | "Themes";
  label: string;
  description: string;
  modalProps: OnboardingModalProps;
}

const scenarios: Scenario[] = [
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

function App() {
  const [activeTab, setActiveTab] = useState<"gallery" | "playground">("playground");
  
  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      background: '#f8f9fa',
      overflow: 'hidden'
    }}>
      
      {/* Compact Header */}
      <header style={{ 
        height: '64px',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 24px',
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        flexShrink: 0,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.svg" alt="Onstage Logo" style={{ width: '32px', height: '32px' }} />
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '800', 
            color: 'black',
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            Onstage
          </h1>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', background: '#f3f4f6', padding: '4px', borderRadius: '10px' }}>
          <button
            onClick={() => setActiveTab("playground")}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === "playground" ? 'white' : 'transparent',
              color: activeTab === "playground" ? 'black' : '#666',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === "playground" ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Builder
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === "gallery" ? 'white' : 'transparent',
              color: activeTab === "gallery" ? 'black' : '#666',
              fontWeight: '600',
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === "gallery" ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            Gallery
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main style={{ 
        flex: 1, 
        overflow: 'hidden', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {activeTab === "playground" ? (
           <div style={{ flex: 1, padding: '24px', overflow: 'hidden' }}>
             <Playground />
           </div>
        ) : (
          <Gallery />
        )}
      </main>
    </div>
  );
}

function Gallery() {
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const activeScenario = scenarios.find(s => s.id === activeScenarioId);

  return (
    <div style={{ 
      height: '100%', 
      overflowY: 'auto', 
      padding: '40px 24px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#666', 
          marginBottom: '30px', 
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          Explore a collection of pre-configured interactions and themes. Click any card to launch the onboarding experience.
        </p>

        {/* Interaction Modes Section */}
        <Section title="1. Interaction Modes" />
        <Grid>
          {scenarios.filter(s => s.category === "Interaction").map((scenario) => (
            <ScenarioButton 
              key={scenario.id} 
              scenario={scenario} 
              onClick={() => setActiveScenarioId(scenario.id)} 
            />
          ))}
        </Grid>

        {/* Backdrop Section */}
        <Section title="2. Backdrop Styles" />
        <Grid>
          {scenarios.filter(s => s.category === "Backdrop").map((scenario) => (
            <ScenarioButton 
              key={scenario.id} 
              scenario={scenario} 
              onClick={() => setActiveScenarioId(scenario.id)} 
            />
          ))}
        </Grid>

        {/* Themes Section */}
        <Section title="3. Aesthetic Themes" />
        <Grid>
          {scenarios.filter(s => s.category === "Themes").map((scenario) => (
            <ScenarioButton 
              key={scenario.id} 
              scenario={scenario} 
              onClick={() => setActiveScenarioId(scenario.id)} 
            />
          ))}
        </Grid>
      </div>

      {activeScenario && (
        <div key={activeScenario.id}>
          <OnboardingProvider 
            steps={baseSteps} 
            defaultOpen={true}
            onFinish={() => setActiveScenarioId(null)}
            onSkip={() => setActiveScenarioId(null)}
          >
            <OnboardingModal {...activeScenario.modalProps} />
          </OnboardingProvider>
        </div>
      )}
    </div>
  );
}

function Section({ title }: { title: string }) {
  return (
    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', marginTop: '40px', color: 'black' }}>
      {title}
    </h2>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', 
      gap: '20px'
    }}>
      {children}
    </div>
  );
}

function ScenarioButton({ scenario, onClick }: { scenario: Scenario, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '20px',
        background: 'white',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '16px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        height: '100%'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.borderColor = '#000';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
      }}
    >
      <span style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '8px', color: '#111' }}>
        {scenario.label}
      </span>
      <span style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.4' }}>
        {scenario.description}
      </span>
    </button>
  );
}

export default App;
