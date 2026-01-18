import React from "react";
import { type OnboardingTheme } from "onstage";
import { type PlaygroundConfig, DEFAULT_CONFIG } from "./types";

interface ConfiguratorProps {
  config: PlaygroundConfig;
  setConfig: React.Dispatch<React.SetStateAction<PlaygroundConfig>>;
}

export function Configurator({ config, setConfig }: ConfiguratorProps) {
  const handleReset = () => setConfig(DEFAULT_CONFIG);

  return (
    <div style={{ 
      background: 'white', 
      padding: '24px', 
      borderRight: '1px solid #e5e7eb', 
      height: '100%', 
      overflowY: 'auto' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0 }}>Configurator</h2>
        <button 
          onClick={handleReset}
          style={{ 
            fontSize: '0.9rem', 
            color: '#374151', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            fontWeight: '600',
            padding: 0,
            textDecoration: 'underline',
            textUnderlineOffset: '4px'
          }}
        >
          Reset
        </button>
      </div>
      
      {/* Theme */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Theme</label>
        <select 
          value={config.theme}
          onChange={(e) => setConfig(prev => ({ ...prev, theme: e.target.value as OnboardingTheme }))}
          style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #d1d5db' }}
        >
          <option value="light">Light (Default)</option>
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
          <option value="default">Dark (Default)</option>
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
          <option value="animated">Animated (Default)</option>
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
  );
}
