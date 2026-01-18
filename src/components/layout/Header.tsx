import React from "react";

interface HeaderProps {
  activeTab: "gallery" | "playground";
  setActiveTab: (tab: "gallery" | "playground") => void;
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
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
        <span style={{ 
          fontSize: '0.8rem', 
          color: '#666', 
          background: '#f3f4f6', 
          padding: '2px 8px', 
          borderRadius: '12px',
          fontWeight: '600'
        }}>
          Beta
        </span>
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
  );
}
