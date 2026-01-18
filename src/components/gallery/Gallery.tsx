import { useState } from "react";
import { OnboardingProvider, OnboardingModal } from "onstage";
import { scenarios } from "../../data/scenarios";
import { baseSteps } from "../../data/steps";
import { Section, Grid, ScenarioButton } from "./components";

export function Gallery() {
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
