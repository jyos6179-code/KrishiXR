import React, { useState } from 'react';
import { useAppStore, AppModule } from '../store/useAppStore';
import { Language, translations } from '../types/i18n';
import { 
  Sparkles, Globe, Volume2, VolumeX, ShieldCheck, 
  Smartphone, Box, Glasses, ClipboardCheck, History, ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentModule, 
    setCurrentModule, 
    language, 
    setLanguage, 
    isAudioPlaying, 
    stopAudio 
  } = useAppStore();

  const t = translations[language];
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languagesList: Array<{ code: Language; name: string; native: string }> = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
  ];

  const modules: Array<{ id: AppModule; label: string; icon: React.ReactNode }> = [
    { id: 'scanner', label: t.modules.scanner, icon: <Box className="w-4 h-4" /> },
    { id: 'simulation', label: t.modules.simulation, icon: <Glasses className="w-4 h-4" /> },
    { id: 'guidance', label: t.modules.guidance, icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'history', label: t.modules.history, icon: <History className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-950/85 backdrop-blur-md border-b border-emerald-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-950/60 flex items-center justify-center">
              <div className="w-full h-full bg-stone-950 rounded-[14px] flex items-center justify-center">
                <span className="text-xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  कृ
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {t.appName}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> {t.offlineReady}
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-stone-400 font-medium">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Right Controls: Audio + Language */}
          <div className="flex items-center gap-2">
            {/* Audio Indicator */}
            {isAudioPlaying && (
              <button
                onClick={stopAudio}
                className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 animate-pulse cursor-pointer"
                title="Mute Audio Voice"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Speaking</span>
              </button>
            )}

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="px-3 py-1.5 rounded-xl glass-panel hover:bg-stone-800 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-800 hover:border-emerald-500/40 transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  {languagesList.find(l => l.code === language)?.native || 'English'}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-stone-900 border border-stone-800 shadow-2xl p-1.5 z-50 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-stone-400 border-b border-stone-800 mb-1">
                    Select Language
                  </div>
                  {languagesList.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                        language === l.code
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] opacity-70 font-mono">({l.name})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-stone-800/80 overflow-x-auto pb-1">
          {modules.map((m) => {
            const isActive = currentModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setCurrentModule(m.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/50 font-bold'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/80'
                }`}
              >
                {m.icon}
                <span>{m.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
