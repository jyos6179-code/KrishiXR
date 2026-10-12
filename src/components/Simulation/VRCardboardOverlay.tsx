import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { Glasses, X, Droplets, Sprout, Bug, TrendingUp } from 'lucide-react';

interface VRCardboardOverlayProps {
  onAction: (action: 'irrigate' | 'fertilize' | 'pest' | 'harvest') => void;
  onExit: () => void;
}

export const VRCardboardOverlay: React.FC<VRCardboardOverlayProps> = ({ onAction, onExit }) => {
  const { farmState, language } = useAppStore();
  const t = translations[language];

  const [hoveredAction, setHoveredAction] = useState<'irrigate' | 'fertilize' | 'pest' | 'harvest' | null>(null);
  const [gazeProgress, setGazeProgress] = useState<number>(0);

  // Gaze dwell timer: when user gazes at an action, fill ring over 1.8s then trigger!
  useEffect(() => {
    let interval: any;
    if (hoveredAction) {
      setGazeProgress(0);
      const startTime = Date.now();
      const duration = 1600; // ms

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / duration) * 100);
        setGazeProgress(progress);

        if (progress >= 100) {
          clearInterval(interval);
          onAction(hoveredAction);
          setHoveredAction(null);
          setGazeProgress(0);
        }
      }, 30);
    } else {
      setGazeProgress(0);
    }

    return () => clearInterval(interval);
  }, [hoveredAction]);

  const renderEyeHUD = (eyeSide: 'left' | 'right') => (
    <div className="relative w-1/2 h-full flex flex-col justify-between p-6 pointer-events-none">
      {/* Top Eye Stats */}
      <div className="flex items-center justify-between pointer-events-auto">
        <div className="glass-panel px-3 py-1.5 rounded-xl border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-2">
          <Glasses className="w-4 h-4" />
          <span>Cardboard VR [{eyeSide.toUpperCase()}]</span>
        </div>
        <div className="glass-panel px-3 py-1 rounded-xl text-[11px] font-mono text-emerald-400">
          Soil: {farmState.soilHealth}% | Yield: {farmState.projectedYield} Q/ac
        </div>
      </div>

      {/* Center Gaze Reticle */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Outer Gaze Progress Ring */}
          <svg className="w-10 h-10 -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="3"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="#a855f7"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset={100 - gazeProgress}
              className="transition-all duration-75"
            />
          </svg>
          {/* Inner Dot */}
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
        </div>
      </div>

      {/* Bottom Gaze Action Buttons Bar */}
      <div className="flex items-center justify-center gap-2 pointer-events-auto pb-4">
        <button
          onMouseEnter={() => setHoveredAction('irrigate')}
          onMouseLeave={() => setHoveredAction(null)}
          onClick={() => onAction('irrigate')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            hoveredAction === 'irrigate'
              ? 'bg-sky-500 text-white scale-110 shadow-lg'
              : 'glass-panel text-stone-200 border border-sky-500/30'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-sky-400" />
          <span>Drip Irrigate</span>
        </button>

        <button
          onMouseEnter={() => setHoveredAction('fertilize')}
          onMouseLeave={() => setHoveredAction(null)}
          onClick={() => onAction('fertilize')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            hoveredAction === 'fertilize'
              ? 'bg-emerald-500 text-white scale-110 shadow-lg'
              : 'glass-panel text-stone-200 border border-emerald-500/30'
          }`}
        >
          <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          <span>Fertilize</span>
        </button>

        <button
          onMouseEnter={() => setHoveredAction('pest')}
          onMouseLeave={() => setHoveredAction(null)}
          onClick={() => onAction('pest')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            hoveredAction === 'pest'
              ? 'bg-amber-500 text-white scale-110 shadow-lg'
              : 'glass-panel text-stone-200 border border-amber-500/30'
          }`}
        >
          <Bug className="w-3.5 h-3.5 text-amber-400" />
          <span>Neem Spray</span>
        </button>

        <button
          onMouseEnter={() => setHoveredAction('harvest')}
          onMouseLeave={() => setHoveredAction(null)}
          onClick={() => onAction('harvest')}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
            hoveredAction === 'harvest'
              ? 'bg-teal-500 text-white scale-110 shadow-lg'
              : 'glass-panel text-stone-200 border border-teal-500/30'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
          <span>Harvest</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute inset-0 z-30 flex pointer-events-none select-none">
      {/* Center Dividing Notch for Headset */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black/90 -translate-x-1/2 z-40 pointer-events-none" />

      {/* Exit Button Top Center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <button
          onClick={onExit}
          className="px-4 py-2 rounded-full glass-panel text-stone-200 hover:text-white bg-stone-900/90 border border-stone-700 text-xs font-bold flex items-center gap-1.5 shadow-xl cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Exit VR</span>
        </button>
      </div>

      {/* Left Eye */}
      {renderEyeHUD('left')}

      {/* Right Eye */}
      {renderEyeHUD('right')}
    </div>
  );
};
