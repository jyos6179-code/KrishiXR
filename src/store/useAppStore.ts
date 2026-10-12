import { create } from 'zustand';
import { Language, translations } from '../types/i18n';
import { ScanResult, DiseaseRecord, CROP_DISEASES } from '../types/crop';
import { FarmState, WeatherType, CropStage } from '../types/simulation';
import { TRAINING_TASKS, TrainingTask } from '../types/tasks';
import { storageService } from '../services/storageService';
import { speechService } from '../services/speechService';

export type AppModule = 'scanner' | 'simulation' | 'guidance' | 'history';

interface AppStore {
  // Navigation & Settings
  currentModule: AppModule;
  setCurrentModule: (mod: AppModule) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isAudioPlaying: boolean;
  toggleAudioNarration: (text: string) => void;
  stopAudio: () => void;
  isOfflineReady: boolean;

  // MODULE A: Scanner State
  currentScan: ScanResult | null;
  setCurrentScan: (scan: ScanResult | null) => void;
  selectedPreset: DiseaseRecord | null;
  setSelectedPreset: (preset: DiseaseRecord | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  isArOverlayOpen: boolean;
  setIsArOverlayOpen: (open: boolean) => void;
  scanHistory: ScanResult[];
  loadScanHistory: () => Promise<void>;
  saveCurrentScan: () => Promise<void>;
  deleteScanItem: (id: string) => Promise<void>;
  clearAllHistory: () => Promise<void>;

  // MODULE B: Simulation State
  farmState: FarmState;
  isVrMode: boolean;
  setIsVrMode: (vr: boolean) => void;
  setWeather: (weather: WeatherType) => void;
  setDayTime: (time: number) => void;
  advanceStage: () => void;
  applyAction: (actionType: 'irrigate' | 'fertilize' | 'pest' | 'harvest') => void;
  resetFarmSimulation: () => void;

  // MODULE C: Task Guidance State
  activeTask: TrainingTask;
  activeStepIndex: number;
  completedSteps: number[];
  isTaskCertified: boolean;
  setActiveTask: (task: TrainingTask) => void;
  setActiveStepIndex: (index: number) => void;
  markStepComplete: (stepNumber: number) => void;
  resetActiveTaskProgress: () => void;
}

const initialFarmState: FarmState = {
  stage: 'sowing',
  dayTime: 12, // High noon
  weather: 'sunny',
  soilHealth: 78,
  moisture: 65,
  pestPressure: 12,
  projectedYield: 28.5, // Quintals / acre
  waterSavedLiters: 1420,
  decisionsLog: [],
};

export const useAppStore = create<AppStore>((set, get) => {
  // Sync speech state
  speechService.subscribe((speaking) => {
    set({ isAudioPlaying: speaking });
  });

  return {
    // Navigation & Settings
    currentModule: 'scanner',
    setCurrentModule: (mod) => {
      speechService.stop();
      set({ currentModule: mod });
    },
    language: 'en',
    setLanguage: (lang) => {
      set({ language: lang });
      // If currently scanning or displaying task, update audio or results if needed
    },
    isAudioPlaying: false,
    toggleAudioNarration: (text: string) => {
      const { isAudioPlaying, language } = get();
      if (isAudioPlaying) {
        speechService.stop();
      } else {
        speechService.speak(text, language);
      }
    },
    stopAudio: () => {
      speechService.stop();
    },
    isOfflineReady: true,

    // Scanner
    currentScan: null,
    setCurrentScan: (scan) => set({ currentScan: scan }),
    selectedPreset: CROP_DISEASES[0],
    setSelectedPreset: (preset) => set({ selectedPreset: preset }),
    isAnalyzing: false,
    setIsAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
    isArOverlayOpen: false,
    setIsArOverlayOpen: (open) => set({ isArOverlayOpen: open }),
    scanHistory: [],
    loadScanHistory: async () => {
      const records = await storageService.getScans();
      set({ scanHistory: records });
    },
    saveCurrentScan: async () => {
      const { currentScan, loadScanHistory } = get();
      if (!currentScan) return;
      await storageService.saveScan(currentScan);
      await loadScanHistory();
    },
    deleteScanItem: async (id: string) => {
      await storageService.deleteScan(id);
      await get().loadScanHistory();
    },
    clearAllHistory: async () => {
      await storageService.clearAllScans();
      set({ scanHistory: [] });
    },

    // Simulation
    farmState: initialFarmState,
    isVrMode: false,
    setIsVrMode: (vr) => set({ isVrMode: vr }),
    setWeather: (weather) => {
      set((state) => {
        let moistureChange = 0;
        let pestChange = 0;
        if (weather === 'rain') {
          moistureChange = +18;
          pestChange = +5;
        } else if (weather === 'drought') {
          moistureChange = -20;
          pestChange = +8;
        } else if (weather === 'fog') {
          moistureChange = +8;
          pestChange = +12; // High fungal spore risk
        }
        return {
          farmState: {
            ...state.farmState,
            weather,
            moisture: Math.max(10, Math.min(100, state.farmState.moisture + moistureChange)),
            pestPressure: Math.max(0, Math.min(100, state.farmState.pestPressure + pestChange)),
          },
        };
      });
    },
    setDayTime: (time) => {
      set((state) => ({
        farmState: { ...state.farmState, dayTime: time },
      }));
    },
    advanceStage: () => {
      const order: CropStage[] = ['sowing', 'vegetative', 'flowering', 'pest_outbreak', 'harvest'];
      const current = get().farmState.stage;
      const nextIdx = (order.indexOf(current) + 1) % order.length;
      const nextStage = order[nextIdx];

      set((state) => {
        let yDelta = 0;
        if (nextStage === 'vegetative') yDelta = +4.5;
        if (nextStage === 'flowering') yDelta = +6.0;
        if (nextStage === 'pest_outbreak') yDelta = -3.5;

        return {
          farmState: {
            ...state.farmState,
            stage: nextStage,
            projectedYield: Math.max(12, state.farmState.projectedYield + yDelta),
          },
        };
      });
    },
    applyAction: (actionType) => {
      set((state) => {
        const fs = { ...state.farmState };
        let impactDesc = '';

        if (actionType === 'irrigate') {
          fs.moisture = Math.min(95, fs.moisture + 22);
          fs.waterSavedLiters += 450; // Drip precision conservation
          fs.projectedYield = Math.min(38, fs.projectedYield + 2.2);
          impactDesc = 'Precision drip delivered 15mm root zone moisture. Saved 450L groundwater.';
        } else if (actionType === 'fertilize') {
          fs.soilHealth = Math.min(98, fs.soilHealth + 14);
          fs.projectedYield = Math.min(38, fs.projectedYield + 3.8);
          impactDesc = 'Vermicompost + balanced bio-inoculants elevated microbial biomass and NPK availability.';
        } else if (actionType === 'pest') {
          fs.pestPressure = Math.max(4, fs.pestPressure - 35);
          fs.soilHealth = Math.min(98, fs.soilHealth + 4); // Eco-friendly neem
          fs.projectedYield = Math.min(38, fs.projectedYield + 2.5);
          impactDesc = '5% NSKE Neem bio-spray interrupted pest feeding without chemical residues.';
        } else if (actionType === 'harvest') {
          const finalYield = Math.round(fs.projectedYield * 10) / 10;
          const ecoScore = Math.round((fs.soilHealth * 0.6) + (fs.waterSavedLiters / 50));
          fs.harvestSuccess = {
            grade: finalYield >= 32 ? 'A+' : finalYield >= 28 ? 'A' : 'B',
            yieldAchieved: finalYield,
            profitScore: Math.round(finalYield * 2850), // ₹ per quintal
            ecoScore,
          };
          impactDesc = `Harvest completed with ${finalYield} Quintals/Acre! High crop market quality achieved.`;
        }

        fs.decisionsLog = [
          { stage: fs.stage, action: actionType, impact: impactDesc, timestamp: Date.now() },
          ...fs.decisionsLog.slice(0, 7),
        ];

        return { farmState: fs };
      });
    },
    resetFarmSimulation: () => {
      set({ farmState: { ...initialFarmState, decisionsLog: [] } });
    },

    // Guidance
    activeTask: TRAINING_TASKS[0],
    activeStepIndex: 0,
    completedSteps: [],
    isTaskCertified: false,
    setActiveTask: async (task) => {
      speechService.stop();
      const progress = await storageService.getTaskProgress(task.id);
      set({
        activeTask: task,
        activeStepIndex: 0,
        completedSteps: progress.completedSteps,
        isTaskCertified: progress.isCertified,
      });
    },
    setActiveStepIndex: (index) => {
      speechService.stop();
      set({ activeStepIndex: index });
    },
    markStepComplete: async (stepNumber: number) => {
      const { activeTask, completedSteps } = get();
      if (!completedSteps.includes(stepNumber)) {
        const nextCompleted = [...completedSteps, stepNumber];
        const isCert = nextCompleted.length >= activeTask.steps.length;
        set({
          completedSteps: nextCompleted,
          isTaskCertified: isCert,
        });
        await storageService.saveTaskProgress(activeTask.id, nextCompleted, isCert);
      }
    },
    resetActiveTaskProgress: async () => {
      const { activeTask } = get();
      set({ completedSteps: [], isTaskCertified: false, activeStepIndex: 0 });
      await storageService.saveTaskProgress(activeTask.id, [], false);
    },
  };
});
