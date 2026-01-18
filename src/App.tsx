import { useState } from "react";
import { Playground } from "./Playground";
import { Gallery } from "./components/gallery/Gallery";
import { Header } from "./components/layout/Header";

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
      
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

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

export default App;
