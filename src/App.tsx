/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/Header';
import { ScannerView } from './components/Scanner/ScannerView';
import { FarmSimulationView } from './components/Simulation/FarmSimulationView';
import { TaskGuidanceView } from './components/Guidance/TaskGuidanceView';
import { ScanHistoryView } from './components/History/ScanHistoryView';
import { translations } from './types/i18n';
import { ShieldCheck, WifiOff, Sparkles, Heart } from 'lucide-react';

export default function App() {
  const { currentModule, language } = useAppStore();
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-emerald-500 selection:text-white">
      {/* Top App Header & Module Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentModule === 'scanner' && <ScannerView />}
        {currentModule === 'simulation' && <FarmSimulationView />}
        {currentModule === 'guidance' && <TaskGuidanceView />}
        {currentModule === 'history' && <ScanHistoryView />}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stone-800 bg-stone-950/80 py-6 mt-12 text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-semibold text-stone-300">KrishiXR Core Engine</span>
            <span>•</span>
            <span className="flex items-center gap-1 font-mono text-emerald-400">
              <WifiOff className="w-3.5 h-3.5" /> 100% Offline Edge Mode
            </span>
          </div>

          <div className="text-center sm:text-right text-[11px] text-stone-500">
            Compliant with ICAR & FAO Precision Agriculture Protocols • Built for Low-Resource Field Conditions
          </div>
        </div>
      </footer>
    </div>
  );
}
