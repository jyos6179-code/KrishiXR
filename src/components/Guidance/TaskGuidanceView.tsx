import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TRAINING_TASKS, TrainingTask } from '../../types/tasks';
import { translations } from '../../types/i18n';
import { TaskCanvas3D } from './TaskCanvas3D';
import { StepInstructions } from './StepInstructions';
import { CertificationModal } from './CertificationModal';
import { 
  ClipboardCheck, Clock, Award, ChevronRight, CheckCircle2, 
  RotateCcw, Sparkles, BookOpen
} from 'lucide-react';

export const TaskGuidanceView: React.FC = () => {
  const { 
    activeTask, 
    setActiveTask, 
    activeStepIndex, 
    setActiveStepIndex, 
    completedSteps, 
    markStepComplete, 
    isTaskCertified, 
    resetActiveTaskProgress, 
    language 
  } = useAppStore();

  const t = translations[language];
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  const currentStep = activeTask.steps[activeStepIndex] || activeTask.steps[0];
  const isCurrentStepDone = completedSteps.includes(currentStep.stepNumber);

  const handleCompleteCurrent = () => {
    markStepComplete(currentStep.stepNumber);
    // If this was the last step and everything is complete, trigger certificate modal
    if (completedSteps.length + 1 >= activeTask.steps.length) {
      setTimeout(() => {
        setShowCertModal(true);
      }, 400);
    } else if (activeStepIndex < activeTask.steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Guidance Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              MODULE C • {t.guidance.title}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.modules.guidance}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            {t.guidance.subtitle}
          </p>
        </div>

        {isTaskCertified && (
          <button
            onClick={() => setShowCertModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-900/30 cursor-pointer animate-pulse"
          >
            <Award className="w-4 h-4" />
            <span>View Certificate</span>
          </button>
        )}
      </div>

      {/* 6 Guided Agricultural Protocols Selector Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-stone-400 tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            {t.guidance.selectModule} (6 ICAR Field Masterclasses)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRAINING_TASKS.map((task) => {
            const isSelected = activeTask.id === task.id;
            const taskTitle = task.title[language] || task.title.en;
            return (
              <button
                key={task.id}
                onClick={() => setActiveTask(task)}
                className={`text-left p-3.5 rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/60 border-2 border-emerald-400 shadow-lg shadow-emerald-950/50'
                    : 'glass-panel hover:border-emerald-500/40 border border-stone-800 hover:bg-stone-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                      {task.category}
                    </span>
                    <span className="text-[10px] text-stone-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {task.estimatedMinutes} mins
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                    {taskTitle}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 mt-1 leading-snug">
                    {task.summary[language] || task.summary.en}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-800 text-[10px] text-stone-400 font-mono">
                  <span>{task.steps.length} Scientific Steps</span>
                  <span className={isSelected ? 'text-emerald-400 font-bold' : ''}>
                    {isSelected ? 'Active Training' : 'Select'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Task Studio: Left 3D Viewport, Right Step Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: 3D Animated Training Simulation (7 cols) */}
        <div className="lg:col-span-7 h-[46vh] min-h-[380px] max-h-[500px]">
          <TaskCanvas3D
            task={activeTask}
            currentStep={currentStep}
          />
        </div>

        {/* Right Column: Step Instructions & Voice Guidance (5 cols) */}
        <div className="lg:col-span-5">
          <StepInstructions
            task={activeTask}
            currentStep={currentStep}
            stepIndex={activeStepIndex}
            totalSteps={activeTask.steps.length}
            isCompleted={isCurrentStepDone}
            onNext={() => setActiveStepIndex(Math.min(activeTask.steps.length - 1, activeStepIndex + 1))}
            onPrev={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
            onComplete={handleCompleteCurrent}
          />
        </div>
      </div>

      {/* Certification Modal */}
      {showCertModal && (
        <CertificationModal
          task={activeTask}
          onClose={() => setShowCertModal(false)}
          onRestart={() => {
            resetActiveTaskProgress();
            setShowCertModal(false);
          }}
        />
      )}
    </div>
  );
};
