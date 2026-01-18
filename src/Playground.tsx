import { useState } from "react";
import { type PlaygroundConfig, DEFAULT_CONFIG } from "./components/playground/types";
import { Configurator } from "./components/playground/Configurator";
import { OutputPanel } from "./components/playground/OutputPanel";

export function Playground() {
  const [config, setConfig] = useState<PlaygroundConfig>(DEFAULT_CONFIG);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: '320px 1fr', 
      height: '100%',
      background: 'white',
      borderRadius: '24px',
      overflow: 'hidden',
      border: '1px solid #e5e7eb',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}>
      
      {/* Sidebar Controls */}
      <Configurator config={config} setConfig={setConfig} />

      {/* Main Content Area */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        overflow: 'hidden',
        borderLeft: '1px solid #e5e7eb'
      }}>
        
        {/* Code Output with integrated Dashboard/Preview button */}
        <OutputPanel config={config} />

      </div>
    </div>
  );
}
