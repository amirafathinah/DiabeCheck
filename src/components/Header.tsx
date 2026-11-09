import { Activity, Moon, Sun, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onScrollToForm,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight whitespace-nowrap shrink-0 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-5 h-5" />
          </div>
          <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            DiabeCheck<span className="text-teal-500 text-xs ml-1 font-mono uppercase font-semibold">AI</span>
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#tentang"
            className="hover:text-indigo-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0"
          >
            Tentang Model
          </a>
          <a
            href="#faktor-risiko"
            className="hover:text-indigo-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0"
          >
            Faktor Risiko
          </a>
          <a
            href="#panduan"
            className="hover:text-indigo-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0"
          >
            Panduan Normal
          </a>
          <a
            href="#faq"
            className="hover:text-indigo-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0"
          >
            Tanya Jawab
          </a>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={darkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary CTA button */}
          <button
            onClick={onScrollToForm}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 rounded-lg shadow-sm shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:-translate-y-0.5 whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mulai Skrining</span>
          </button>
        </div>
      </div>
    </header>
  );
};
