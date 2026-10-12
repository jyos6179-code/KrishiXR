import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { WeatherType, CropStage } from '../../types/simulation';
import { 
  Sun, CloudRain, Flame, CloudFog, Droplets, HeartPulse, 
  Sprout, Bug, TrendingUp, Sparkles, RefreshCw, Glasses, ChevronRight, CheckCircle2
} from 'lucide-react';

export const SimulationControls: React.FC = () => {
  const { 
    farmState, 
    setWeather, 
    setDayTime, 
    advanceStage, 
    applyAction, 
    resetFarmSimulation, 
    language, 
    isVrMode, 
    setIsVrMode 
  } = useAppStore();

  const t = translations[language];

  const weatherIcons: Record<WeatherType, React.ReactNode> = {
    sunny: <Sun className="w-4 h-4 text-amber-400" />,
    rain: <CloudRain className="w-4 h-4 text-sky-400" />,
    drought: <Flame className="w-4 h-4 text-orange-400" />,
    fog: <CloudFog className="w-4 h-4 text-slate-300" />,
  };

  const stageLabels: Record<CropStage, string> = {
    sowing: '1. Sowing & Seedbed',
    vegetative: '2. Vegetative Growth',
    flowering: '3. Flowering & Bloom',
    pest_outbreak: '4. Pest Challenge',
    harvest: '5. Ripe Harvest',
  };

  const getMoistureStatus = (m: number) => {
    if (m < 25) return { label: 'Severe Stress', color: 'text-rose-400' };
    if (m < 45) return { label: 'Low Moisture', color: 'text-amber-400' };
    if (m > 85) return { label: 'Waterlogged', color: 'text-sky-400' };
    return { label: 'Optimal Field Capacity', color: 'text-emerald-400' };
  };

  const moistureInfo = getMoistureStatus(farmState.moisture);

  return (
    <div className="space-y-4">
      {/* KPI Stats HUD Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Soil Health */}
        <div className="p-3.5 rounded-xl glass-panel border border-emerald-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-1">
            <span className="flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5" />
              {t.simulation.soilHealth}
            </span>
            <span className="font-bold">{farmState.soilHealth}%</span>
          </div>
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
              style={{ width: `${farmState.soilHealth}%` }}
            />
          </div>
        </div>

        {/* Moisture */}
        <div className="p-3.5 rounded-xl glass-panel border border-sky-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-sky-400 mb-1">
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5" />
              {t.simulation.moisture}
            </span>
            <span className="font-bold">{farmState.moisture}%</span>
          </div>
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-400 transition-all duration-500"
              style={{ width: `${farmState.moisture}%` }}
            />
          </div>
          <div className={`text-[10px] mt-1 font-medium ${moistureInfo.color}`}>
            {moistureInfo.label}
          </div>
        </div>

        {/* Projected Yield */}
        <div className="p-3.5 rounded-xl glass-panel border border-amber-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-1">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {t.simulation.yieldEstimate}
            </span>
            <span className="font-bold">{farmState.projectedYield} Q/ac</span>
          </div>
          <div className="text-[11px] text-stone-300 font-medium">
            Est. Return: ₹{Math.round(farmState.projectedYield * 2850).toLocaleString()}
          </div>
        </div>

        {/* Water Saved */}
        <div className="p-3.5 rounded-xl glass-panel border border-teal-500/20">
          <div className="flex items-center justify-between text-xs font-mono text-teal-400 mb-1">
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5" />
              {t.simulation.waterSaved}
            </span>
            <span className="font-bold">{farmState.waterSavedLiters} L</span>
          </div>
          <div className="text-[11px] text-stone-300 font-medium">
            +38% vs Flood Irrigation
          </div>
        </div>
      </div>

      {/* Stage Progression & Time / Weather Panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Stage Timeline (7 cols) */}
        <div className="md:col-span-7 p-4 rounded-xl glass-panel border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
              <Sprout className="w-3.5 h-3.5 text-emerald-400" />
              {t.simulation.currentStage}
            </span>
            <button
              onClick={advanceStage}
              className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow"
            >
              <span>Next Growth Stage</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1 text-xs">
            {(['sowing', 'vegetative', 'flowering', 'pest_outbreak', 'harvest'] as CropStage[]).map((st, i) => {
              const isCurrent = farmState.stage === st;
              return (
                <div
                  key={st}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                    isCurrent
                      ? 'bg-emerald-500 text-stone-950 font-bold shadow-md shadow-emerald-950/40'
                      : 'bg-stone-900/60 text-stone-400 border border-stone-800'
                  }`}
                >
                  <span className="hidden sm:inline">{stageLabels[st]}</span>
                  <span className="sm:hidden">{i + 1}</span>
                </div>
              );
            })}
          </div>

          {/* Time of Day Control */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-4">
            <div className="text-xs text-stone-300 flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-400" />
              <span className="font-mono">{t.simulation.dayNight}: {Math.floor(farmState.dayTime)}:00 hrs</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDayTime(6)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                  farmState.dayTime === 6 ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                Dawn
              </button>
              <button
                onClick={() => setDayTime(12)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                  farmState.dayTime === 12 ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                Noon
              </button>
              <button
                onClick={() => setDayTime(18)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                  farmState.dayTime === 18 ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                Dusk
              </button>
              <button
                onClick={() => setDayTime(23)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                  farmState.dayTime === 23 ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                Night
              </button>
            </div>
          </div>
        </div>

        {/* Weather & VR Toggles (5 cols) */}
        <div className="md:col-span-5 p-4 rounded-xl glass-panel border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
              {t.simulation.weather}
            </span>
            <button
              onClick={() => setIsVrMode(!isVrMode)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                isVrMode
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40 animate-pulse'
                  : 'bg-stone-800 text-purple-300 hover:bg-stone-700 border border-purple-500/30'
              }`}
            >
              <Glasses className="w-3.5 h-3.5" />
              <span>{isVrMode ? t.simulation.exitVr : t.simulation.vrMode}</span>
            </button>
          </div>

          {/* Weather Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {(['sunny', 'rain', 'drought', 'fog'] as WeatherType[]).map((w) => {
              const active = farmState.weather === w;
              const labels = {
                sunny: t.simulation.weatherSunny,
                rain: t.simulation.weatherRain,
                drought: t.simulation.weatherDrought,
                fog: t.simulation.weatherFog,
              };
              return (
                <button
                  key={w}
                  onClick={() => setWeather(w)}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    active
                      ? 'bg-stone-800 text-white border border-emerald-400 shadow-sm'
                      : 'bg-stone-900/50 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {weatherIcons[w]}
                  <span className="truncate">{labels[w]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Agronomic Decision Actions */}
      <div className="p-4 rounded-xl glass-panel border border-emerald-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{t.simulation.actionsTitle}</span>
          </h4>
          <button
            onClick={resetFarmSimulation}
            className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Simulation</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Action 1: Irrigation */}
          <button
            onClick={() => applyAction('irrigate')}
            className="p-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-sky-500/30 hover:border-sky-400 text-left transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                <Droplets className="w-4 h-4" />
                {t.simulation.irrigateAction}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">
                +22% Moist
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Micro-drip irrigation directly delivers water to crop root zones without evaporation.
            </p>
          </button>

          {/* Action 2: Fertilize */}
          <button
            onClick={() => applyAction('fertilize')}
            className="p-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-emerald-500/30 hover:border-emerald-400 text-left transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sprout className="w-4 h-4" />
                {t.simulation.fertilizeAction}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded">
                +14% Health
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Enrich soil microbiome with mature vermicompost, humic acid, and balanced bio-NPK.
            </p>
          </button>

          {/* Action 3: Bio-Pest Shield */}
          <button
            onClick={() => applyAction('pest')}
            className="p-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 text-left transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Bug className="w-4 h-4" />
                {t.simulation.pestAction}
              </span>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-950/80 px-1.5 py-0.5 rounded">
                -35% Pests
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Spray cold-pressed Azadirachtin neem oil solution to disrupt pest reproduction cycles.
            </p>
          </button>

          {/* Action 4: Harvest */}
          <button
            onClick={() => applyAction('harvest')}
            className="p-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-teal-500/30 hover:border-teal-400 text-left transition-all cursor-pointer group active:scale-95"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {t.simulation.harvestAction}
              </span>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-1.5 py-0.5 rounded">
                Final Grade
              </span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Harvest at peak physiological maturity to record final crop yield and market valuation.
            </p>
          </button>
        </div>

        {/* Harvest Success Summary Popup if Harvested */}
        {farmState.harvestSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border-2 border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-emerald-400">
                  Grade {farmState.harvestSuccess.grade}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-stone-950">
                  Bumper Harvest Certified
                </span>
              </div>
              <p className="text-xs text-stone-200 mt-1">
                Achieved <strong>{farmState.harvestSuccess.yieldAchieved} Quintals/Acre</strong> with an Estimated Farm Revenue of <strong>₹{farmState.harvestSuccess.profitScore.toLocaleString()}</strong>.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase text-stone-400">Eco-Conservation Score</span>
              <div className="text-lg font-black text-teal-300">{farmState.harvestSuccess.ecoScore} / 100</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
