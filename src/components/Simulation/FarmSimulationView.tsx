import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { FarmCanvas3D } from './FarmCanvas3D';
import { SimulationControls } from './SimulationControls';
import { VRCardboardOverlay } from './VRCardboardOverlay';
import { Glasses, Sparkles, Sprout } from 'lucide-react';

export const FarmSimulationView: React.FC = () => {
  const { farmState, isVrMode, setIsVrMode, applyAction, language } = useAppStore();
  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* Simulation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              MODULE B • {t.simulation.title}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.modules.simulation}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            {t.simulation.subtitle}
          </p>
        </div>

        <button
          onClick={() => setIsVrMode(!isVrMode)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg ${
            isVrMode
              ? 'bg-purple-600 text-white shadow-purple-900/30'
              : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/20'
          }`}
        >
          <Glasses className="w-4 h-4" />
          <span>{isVrMode ? t.simulation.exitVr : t.simulation.vrMode}</span>
        </button>
      </div>

      {/* 3D Farm Viewport + Cardboard Overlay */}
      <div className="relative w-full h-[52vh] min-h-[380px] max-h-[580px] rounded-2xl overflow-hidden shadow-2xl">
        <FarmCanvas3D
          farmState={farmState}
          isVrMode={isVrMode}
          onGazeAction={(action) => applyAction(action)}
        />

        {isVrMode && (
          <VRCardboardOverlay
            onAction={(action) => applyAction(action)}
            onExit={() => setIsVrMode(false)}
          />
        )}
      </div>

      {/* Controls & Decisions HUD */}
      {!isVrMode && <SimulationControls />}
    </div>
  );
};
