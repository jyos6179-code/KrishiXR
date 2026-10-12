import React, { useState } from 'react';
import { ScanResult } from '../../types/crop';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { 
  Sparkles, Leaf, FlaskConical, ShieldCheck, AlertOctagon, 
  Volume2, VolumeX, BookmarkCheck, Box, Eye, Check, ChevronDown, ChevronUp
} from 'lucide-react';

interface DiagnosisCardProps {
  scan: ScanResult;
  onOpen3D: () => void;
}

export const DiagnosisCard: React.FC<DiagnosisCardProps> = ({ scan, onOpen3D }) => {
  const { language, isAudioPlaying, toggleAudioNarration, saveCurrentScan } = useAppStore();
  const t = translations[language];

  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'treatment' | 'prevention' | 'safety'>('treatment');

  const handleSave = async () => {
    await saveCurrentScan();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const narrationText = `Diagnosis for ${scan.crop}: ${scan.diseaseName}. Scientific pathogen: ${scan.scientificName}. Infection Severity: ${scan.severity}. Confidence match: ${scan.confidence} percent. Key symptoms: ${scan.symptoms}. Recommended organic remedy: ${scan.organicTreatment}. Chemical control: ${scan.chemicalTreatment}. Safe dosage advisory: ${scan.safeDosageWarning}.`;

  const getSeverityBadge = () => {
    if (scan.isHealthy) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <ShieldCheck className="w-3.5 h-3.5" /> Healthy Vigour
        </span>
      );
    }
    if (scan.severity === 'critical') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
          <AlertOctagon className="w-3.5 h-3.5" /> Critical Alert
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
        <Sparkles className="w-3.5 h-3.5" /> Moderate Infection
      </span>
    );
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-5 border border-emerald-500/20 shadow-2xl space-y-5 transition-all">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-medium bg-stone-800 text-stone-300 border border-stone-700">
              {scan.crop}
            </span>
            {getSeverityBadge()}
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-lg border border-emerald-800/60 font-semibold">
              {scan.confidence}% Confidence
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {scan.diseaseName}
          </h3>
          <p className="text-xs text-stone-400 italic font-serif mt-0.5">
            Pathogen: {scan.scientificName}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpen3D}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-emerald-900/30 transition-all transform active:scale-95 cursor-pointer"
          >
            <Box className="w-4 h-4" />
            <span>{t.scanner.viewIn3dAr}</span>
          </button>

          <button
            onClick={() => toggleAudioNarration(narrationText)}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
              isAudioPlaying
                ? 'bg-amber-600 text-white animate-pulse'
                : 'glass-panel text-stone-200 hover:text-white hover:bg-stone-800'
            }`}
            title={isAudioPlaying ? t.scanner.stopAudio : t.scanner.readAloud}
          >
            {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1 transition-all ${
              isSaved
                ? 'bg-emerald-600 text-white'
                : 'glass-panel text-stone-200 hover:text-white hover:bg-stone-800'
            }`}
            title={t.scanner.saveScan}
          >
            {isSaved ? <Check className="w-4 h-4" /> : <BookmarkCheck className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Key Symptoms Box */}
      <div className="bg-stone-900/70 rounded-xl p-4 border border-stone-800">
        <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1.5 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          {t.scanner.symptoms}
        </div>
        <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
          {scan.symptoms}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-stone-800 gap-2">
        <button
          onClick={() => setActiveTab('treatment')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'treatment'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <Leaf className="w-4 h-4" />
          <span>Treatments (Bio & Chemical)</span>
        </button>
        <button
          onClick={() => setActiveTab('prevention')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'prevention'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{t.scanner.prevention}</span>
        </button>
        <button
          onClick={() => setActiveTab('safety')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'safety'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-stone-400 hover:text-stone-200'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>Safety & PPE Warning</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'treatment' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organic Treatment */}
            <div className="rounded-xl p-4 bg-emerald-950/30 border border-emerald-500/30">
              <div className="flex items-center gap-2 mb-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>{t.scanner.organicTreatment}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {scan.organicTreatment}
              </p>
            </div>

            {/* Chemical Treatment */}
            <div className="rounded-xl p-4 bg-amber-950/30 border border-amber-500/30">
              <div className="flex items-center gap-2 mb-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <FlaskConical className="w-4 h-4 text-amber-400" />
                <span>{t.scanner.chemicalTreatment}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                {scan.chemicalTreatment}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="rounded-xl p-4 bg-stone-900/60 border border-stone-800">
            <div className="flex items-center gap-2 mb-2 text-teal-300 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{t.scanner.prevention}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {scan.prevention}
            </p>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="rounded-xl p-4 bg-rose-950/30 border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-rose-400" />
              <span>{t.scanner.safeDosageWarning}</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              {scan.safeDosageWarning}
            </p>
          </div>
        )}
      </div>

      {isSaved && (
        <div className="text-center py-1.5 px-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-medium animate-fadeIn">
          ✓ {t.scanner.savedSuccessfully}
        </div>
      )}
    </div>
  );
};
