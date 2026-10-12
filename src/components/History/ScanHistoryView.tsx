import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { ScanResult } from '../../types/crop';
import { 
  BookmarkCheck, Trash2, Box, Volume2, Calendar, 
  ShieldCheck, AlertTriangle, ArrowRight, Eye, RefreshCw
} from 'lucide-react';

export const ScanHistoryView: React.FC = () => {
  const { 
    scanHistory, 
    loadScanHistory, 
    deleteScanItem, 
    clearAllHistory, 
    setCurrentScan, 
    setCurrentModule, 
    setIsArOverlayOpen, 
    toggleAudioNarration, 
    language 
  } = useAppStore();

  const t = translations[language];
  const [selectedCrop, setSelectedCrop] = useState<string>('All');

  useEffect(() => {
    loadScanHistory();
  }, []);

  const filteredHistory = selectedCrop === 'All'
    ? scanHistory
    : scanHistory.filter(s => s.crop.toLowerCase().includes(selectedCrop.toLowerCase()));

  const handleInspect = (scan: ScanResult) => {
    setCurrentScan(scan);
    setCurrentModule('scanner');
    setIsArOverlayOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* History Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              OFFLINE LOCAL STORAGE • INDEXEDDB
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.modules.history}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Browse stored field diagnoses, pathogen records, and treatment advisories preserved securely on this device without internet.
          </p>
        </div>

        {scanHistory.length > 0 && (
          <button
            onClick={clearAllHistory}
            className="px-3 py-2 rounded-xl text-xs font-semibold glass-panel text-rose-300 hover:text-white hover:bg-rose-900/40 border border-rose-500/30 flex items-center gap-1.5 transition-all cursor-pointer self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History Cards List */}
      {scanHistory.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
          <BookmarkCheck className="w-12 h-12 text-stone-600 mx-auto" />
          <h3 className="text-base font-bold text-stone-300">No Offline Scans Recorded Yet</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Scan a diseased plant or test one of the demo specimens in the AR Crop Doctor module to save records to your offline farm journal.
          </p>
          <button
            onClick={() => setCurrentModule('scanner')}
            className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Go to AR Crop Doctor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="glass-panel rounded-2xl p-4 border border-stone-800 hover:border-emerald-500/30 transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-stone-800 text-stone-300">
                      {item.crop}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      item.isHealthy
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : item.severity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.severity}
                    </span>
                  </div>

                  <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt={item.diseaseName}
                      className="w-16 h-16 rounded-xl object-contain bg-stone-900 border border-stone-800 p-1 shrink-0"
                    />
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-white line-clamp-1">{item.diseaseName}</h4>
                    <p className="text-[11px] text-stone-400 italic font-serif">{item.scientificName}</p>
                    <p className="text-[11px] text-emerald-400 font-mono mt-0.5">{item.confidence}% Match Confidence</p>
                  </div>
                </div>

                <div className="mt-2.5 text-xs text-stone-300 line-clamp-2 bg-stone-900/60 p-2.5 rounded-xl border border-stone-800/80">
                  <span className="text-emerald-400 font-semibold">Remedy: </span>
                  {item.organicTreatment}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-800/80">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleInspect(item)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <Box className="w-3.5 h-3.5" />
                    <span>View 3D</span>
                  </button>
                  <button
                    onClick={() => toggleAudioNarration(`${item.crop}. ${item.diseaseName}. ${item.organicTreatment}`)}
                    className="p-1.5 rounded-lg glass-panel text-stone-300 hover:text-white cursor-pointer"
                    title="Audio Guidance"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => deleteScanItem(item.id)}
                  className="p-1.5 rounded-lg glass-panel text-rose-400 hover:text-rose-200 hover:bg-rose-950/40 cursor-pointer"
                  title="Delete Record"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
