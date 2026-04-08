import { getParadoxRatio } from '../lib/dagster';
import ThemeToggle from '../components/ThemeToggle';

export default async function Home() {
  // Fetching from Dagster (Port 3000)
  const ratio = await getParadoxRatio();

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 font-mono cyber-flicker">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-slate-200 dark:border-accent/30 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-foreground dark:drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">
              CALGARY_TECH_<span className="text-accent">PARADOX</span>
            </h1>
            <p className="text-slate-400 dark:text-accent/60 text-[10px] mt-2 tracking-[0.4em] uppercase">
              // OPERATIONAL_INTELLIGENCE_v2.0
            </p>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Paradox Ratio Card */}
          <div className="lg:col-span-5 bg-card-bg border border-slate-200 dark:border-red-900/50 p-10 shadow-xl backdrop-blur-md">
            <p className="text-red-600 text-[10px] font-bold tracking-widest mb-8 uppercase">{">"} tension_readout</p>
            <div className="flex items-baseline gap-4">
              <span className="text-8xl md:text-9xl font-black text-foreground">{ratio}</span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-tighter">Grads/Job</span>
            </div>
          </div>

          {/* Visual Report Card */}
          <div className="lg:col-span-7 bg-card-bg border border-slate-200 dark:border-accent/30 p-8 shadow-xl backdrop-blur-md">
            <h3 className="text-slate-400 text-[10px] font-bold tracking-widest mb-6 uppercase">supply_demand_visual</h3>
            <div className="bg-white/5 p-4 border border-slate-100 dark:border-accent/10">
              <img 
                src="/paradox-report.png" 
                alt="Market Data" 
                className="max-h-[300px] w-full object-contain dark:invert dark:brightness-150" 
              />
            </div>
          </div>
        </div>

        {/* Bottom Insights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { label: 'DATA_SOURCE', text: 'SAIT / UOFC / MRU Data Uplink Active.', border: 'border-blue-500' },
            { label: 'MARKET_ANALYSIS', text: 'Seniority bias affecting entry-level demand.', border: 'border-red-500' },
            { label: 'SYSTEM_STATUS', text: 'Dagster Pipeline / NextJS Bridge Healthy.', border: 'border-green-500' }
          ].map((item, i) => (
            <div key={i} className={`p-8 bg-card-bg border-l-4 ${item.border} border border-slate-200 dark:border-slate-800 shadow-lg`}>
              <h4 className="text-[10px] font-black text-foreground mb-3 tracking-widest uppercase">{item.label}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight uppercase tracking-tighter">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}