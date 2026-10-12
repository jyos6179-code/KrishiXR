import React from 'react';
import { TaskStep, TrainingTask } from '../../types/tasks';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { 
  Volume2, VolumeX, CheckCircle, CheckCircle2, ChevronRight, ChevronLeft, 
  Lightbulb, AlertTriangle, Sparkles, Check
} from 'lucide-react';

interface StepInstructionsProps {
  task: TrainingTask;
  currentStep: TaskStep;
  stepIndex: number;
  totalSteps: number;
  isCompleted: boolean;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

export const StepInstructions: React.FC<StepInstructionsProps> = ({
  task,
  currentStep,
  stepIndex,
  totalSteps,
  isCompleted,
  onNext,
  onPrev,
  onComplete,
}) => {
  const { language, isAudioPlaying, toggleAudioNarration } = useAppStore();
  const t = translations[language];

  const localizedTitle = currentStep.title[language] || currentStep.title.en;
  const localizedInstruction = currentStep.instruction[language] || currentStep.instruction.en;
  const localizedTips = currentStep.tips[language] || currentStep.tips.en;
  const localizedWarning = currentStep.warning[language] || currentStep.warning.en;

  const narrationText = `Step ${stepIndex + 1} of ${totalSteps}: ${localizedTitle}. Instructions: ${localizedInstruction}. Pro Tip: ${localizedTips}. Safety alert: ${localizedWarning}.`;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-emerald-500/20 shadow-2xl space-y-4">
      {/* Top Step Counter & Audio */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold">
            {t.guidance.step} {stepIndex + 1} {t.guidance.of} {totalSteps}
          </span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
              <Check className="w-3.5 h-3.5" /> {t.guidance.completed}
            </span>
          )}
        </div>

        <button
          onClick={() => toggleAudioNarration(narrationText)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isAudioPlaying
              ? 'bg-amber-600 text-white animate-pulse'
              : 'glass-panel text-stone-200 hover:text-white hover:bg-stone-800'
          }`}
        >
          {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          <span>{isAudioPlaying ? t.scanner.stopAudio : t.guidance.listenGuidance}</span>
        </button>
      </div>

      {/* Step Title & Instruction */}
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {localizedTitle}
        </h3>
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed bg-stone-900/60 p-3.5 rounded-xl border border-stone-800">
          {localizedInstruction}
        </p>
      </div>

      {/* Pro Tip Box */}
      <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
        <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider">
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.guidance.tips}</span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          {localizedTips}
        </p>
      </div>

      {/* Warning Box */}
      <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-1">
        <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          <span>{t.guidance.warning}</span>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          {localizedWarning}
        </p>
      </div>

      {/* Bottom Step Actions */}
      <div className="pt-2 flex items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={stepIndex === 0}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            stepIndex === 0
              ? 'opacity-40 pointer-events-none text-stone-600'
              : 'glass-panel text-stone-300 hover:text-white hover:bg-stone-800'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{t.common.previous}</span>
        </button>

        <button
          onClick={onComplete}
          className={`flex-1 max-w-xs py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
            isCompleted
              ? 'bg-stone-800 text-emerald-400 border border-emerald-500/30'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/40'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? t.guidance.completed : t.guidance.markDone}</span>
        </button>

        <button
          onClick={onNext}
          disabled={stepIndex === totalSteps - 1}
          className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            stepIndex === totalSteps - 1
              ? 'opacity-40 pointer-events-none text-stone-600'
              : 'glass-panel text-stone-300 hover:text-white hover:bg-stone-800'
          }`}
        >
          <span>{t.common.next}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
