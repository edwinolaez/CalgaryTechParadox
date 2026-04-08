'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      console.log("Mode: Cyberpunk");
    } else {
      html.classList.remove('dark');
      console.log("Mode: Industrial");
    }
  }, [isDark]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-bold text-slate-400 dark:text-cyan-600 tracking-tighter">
        {isDark ? 'CYBER' : 'INDUS'}
      </span>
      <button
        onClick={() => setIsDark(!isDark)}
        className="w-12 h-6 bg-slate-300 dark:bg-cyan-900 rounded-full p-1 transition-colors duration-500"
      >
        <div className={`w-4 h-4 bg-white dark:bg-cyan-400 rounded-full transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}