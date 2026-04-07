import { getParadoxRatio } from '../lib/dagster';

export default async function Home() {
  const ratio = await getParadoxRatio();

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12 border-b border-slate-800 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black tracking-tighter text-blue-500 mb-2">
              CALGARY TECH <span className="text-white">PARADOX</span>
            </h1>
            <p className="text-slate-500 font-mono text-sm tracking-[0.2em] uppercase">
              Market Intelligence Dashboard // v1.2
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">System Status</p>
            <div className="flex items-center gap-2 justify-end mt-1">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-500 text-sm font-medium">Dagster Node Live</span>
            </div>
          </div>
        </header>

        {/* Hero Section: The "Why" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Metric Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
            </div>
            
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-red-500 mb-6">Critical Tension Ratio</h2>
            <div className="flex items-baseline gap-3">
              <span className="text-8xl font-black text-white tracking-tighter">{ratio}</span>
              <span className="text-xl text-slate-500 font-light">Grads/Job</span>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-800/50">
              <p className="text-sm text-slate-400 leading-relaxed italic">
                "For every single entry-level opening in Calgary, over 23 qualified graduates are competing for the seat."
              </p>
            </div>
          </div>

          {/* Asset Visualization */}
          <div className="lg:col-span-8 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6 px-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">Refined Supply vs Demand</h3>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">ASSET #08</span>
            </div>
            <div className="bg-white rounded-2xl p-2 shadow-inner">
              <img src="/paradox-report.png" alt="Dagster Generated Chart" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>

        {/* Market Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all group">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            </div>
            <h4 className="font-bold text-white mb-2">The Supply Source</h4>
            <p className="text-xs text-slate-400 leading-normal">
              Aggregated graduates from **SAIT**, **UofC**, and **MRU**. The supply side is robust, with approximately 350+ new developers entering the local economy annually.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-all group">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            </div>
            <h4 className="font-bold text-white mb-2">The Demand Gap</h4>
            <p className="text-xs text-slate-400 leading-normal">
              Market demand remains heavily skewed. **85%** of available roles require Senior-level experience, leaving a narrow **15%** window for emerging talent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-green-500/50 transition-all group">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-500 mb-4 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <h4 className="font-bold text-white mb-2">System Resilience</h4>
            <p className="text-xs text-slate-400 leading-normal">
              Built on a **Python/Next.js** bridge. This data is pulled live via Dagster's GraphQL engine, ensuring the "Paradox" reflects the latest materializations.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}