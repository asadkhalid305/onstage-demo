import React from "react";
import { type Scenario } from "../../data/scenarios";

export function Section({ title }: { title: string }) {
  return (
    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px', marginTop: '40px', color: 'black' }}>
      {title}
    </h2>
  );
}

export function Grid({ children }: { children: React.ReactNode }) {
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

export function ScenarioButton({ scenario, onClick }: { scenario: Scenario, onClick: () => void }) {
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
