import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TrainingTask } from '../../types/tasks';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { Award, CheckCircle2, X, Download, Share2, Sparkles, ShieldCheck } from 'lucide-react';

interface CertificationModalProps {
  task: TrainingTask;
  onClose: () => void;
  onRestart: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({ task, onClose, onRestart }) => {
  const { language } = useAppStore();
  const t = translations[language];

  useEffect(() => {
    // Launch celebratory confetti blast
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#34d399', '#f59e0b', '#38bdf8', '#fbbf24'],
      });
    } catch {
      // ignore
    }
  }, []);

  const localizedTitle = task.title[language] || task.title.en;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl glass-panel border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
        {/* Glow behind badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-white glass-panel cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Badge Emblem */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-1 shadow-xl shadow-emerald-950/60 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
            <Award className="w-12 h-12 text-emerald-400" />
          </div>
          <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
        </div>

        {/* Text Header */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
            KRISHIXR FIELD MASTERY ACCREDITATION
          </span>
          <h3 className="text-2xl font-black text-white">
            {t.guidance.congrats}
          </h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            {t.guidance.certText}
          </p>
        </div>

        {/* Official Certificate Card Details */}
        <div className="p-4 rounded-2xl bg-stone-900/90 border border-emerald-500/30 text-left space-y-3">
          <div className="flex justify-between items-start border-b border-stone-800 pb-2">
            <div>
              <div className="text-[10px] font-mono text-stone-400 uppercase">Field Operational Module</div>
              <div className="text-sm font-bold text-emerald-300">{localizedTitle}</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-stone-400 uppercase">ICAR / FAO Rating</span>
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1 justify-end">
                <ShieldCheck className="w-3.5 h-3.5" /> Grade A+ Verified
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-stone-300">
            <div>
              <span className="text-[10px] text-stone-400 font-mono block">Competence Validation:</span>
              <span>100% Steps Practiced</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-400 font-mono block">Certificate ID:</span>
              <span className="font-mono text-emerald-400">KXR-{Date.now().toString().slice(-6)}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl glass-panel text-stone-300 hover:text-white hover:bg-stone-800 text-xs font-bold cursor-pointer transition-all"
          >
            {t.guidance.restartTask}
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 cursor-pointer transition-all"
          >
            Done & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
