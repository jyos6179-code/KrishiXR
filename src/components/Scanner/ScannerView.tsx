import React, { useRef, useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { CROP_DISEASES, DiseaseRecord } from '../../types/crop';
import { classifierService } from '../../services/classifierService';
import { translations } from '../../types/i18n';
import { DiagnosisCard } from './DiagnosisCard';
import { ARPlantViewer } from './ARPlantViewer';
import { 
  Camera, Upload, Sparkles, RefreshCw, Eye, Box, 
  Layers, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle
} from 'lucide-react';

export const ScannerView: React.FC = () => {
  const { 
    language, 
    currentScan, 
    setCurrentScan, 
    selectedPreset, 
    setSelectedPreset,
    isAnalyzing, 
    setIsAnalyzing,
    isArOverlayOpen,
    setIsArOverlayOpen
  } = useAppStore();

  const t = translations[language];

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('All');
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  // Initialize with the first disease specimen or analyze default
  useEffect(() => {
    if (!currentScan && selectedPreset) {
      runAnalysis(selectedPreset.id);
    }
  }, []);

  // Camera Management
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API unsupported');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setUploadedImagePreview(null);
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError(t.scanner.noCameraMsg);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Run on-device classification
  const runAnalysis = async (presetId?: string) => {
    setIsAnalyzing(true);

    try {
      let result;
      if (presetId) {
        // Direct preset specimen simulation
        result = await classifierService.classifyCanvasOrImage(
          document.createElement('canvas'),
          language,
          presetId
        );
      } else if (cameraActive && videoRef.current && canvasRef.current) {
        // Capture frame from video
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          result = await classifierService.classifyCanvasOrImage(canvas, language);
        }
      } else if (uploadedImagePreview) {
        // Classify uploaded photo
        const img = new Image();
        img.src = uploadedImagePreview;
        await new Promise((res) => (img.onload = res));
        result = await classifierService.classifyCanvasOrImage(img, language);
      } else if (selectedPreset) {
        result = await classifierService.classifyCanvasOrImage(
          document.createElement('canvas'),
          language,
          selectedPreset.id
        );
      }

      if (result) {
        setCurrentScan(result);
      }
    } catch (e) {
      console.error('Classification error:', e);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 500);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setUploadedImagePreview(url);
        stopCamera();
        runAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPreset = (preset: DiseaseRecord) => {
    setSelectedPreset(preset);
    setUploadedImagePreview(null);
    stopCamera();
    runAnalysis(preset.id);
  };

  // Filter crops
  const cropList = ['All', 'Tomato', 'Rice', 'Wheat', 'Maize', 'Potato'];
  const filteredPresets = selectedCropFilter === 'All' 
    ? CROP_DISEASES 
    : CROP_DISEASES.filter(d => d.crop === selectedCropFilter);

  return (
    <div className="space-y-6">
      {/* Top Banner & Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              MODULE A • {t.scanner.onDeviceAi}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {t.modules.scanner}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            {t.modules.scannerDesc}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (cameraActive) {
                stopCamera();
              } else {
                startCamera();
              }
            }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              cameraActive 
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{cameraActive ? 'Stop Camera' : t.scanner.startCamera}</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold glass-panel text-stone-200 hover:text-white hover:bg-stone-800 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <span>{t.scanner.uploadPhoto}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Main Scanner Section Grid: Left Viewfinder, Right Diagnostic Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Viewfinder / Capture HUD (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border border-emerald-500/30 shadow-2xl bg-stone-950 flex flex-col justify-center items-center">
            {/* Live Video Element */}
            <video
              ref={videoRef}
              playsInline
              muted
              className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
            />
            <canvas ref={canvasRef} className="hidden" />

            {/* Uploaded Image or Preset Specimen View */}
            {!cameraActive && (
              <div className="w-full h-full relative flex items-center justify-center p-4">
                {uploadedImagePreview ? (
                  <img
                    src={uploadedImagePreview}
                    alt="Uploaded Plant"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <img
                    src={selectedPreset?.sampleImage || CROP_DISEASES[0].sampleImage}
                    alt="Specimen Preview"
                    className="w-56 h-56 object-contain filter drop-shadow-2xl transition-all"
                  />
                )}

                {/* Specimen Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-stone-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {selectedPreset ? selectedPreset.crop + ' Specimen' : 'Optical Viewfinder'}
                </div>
              </div>
            )}

            {/* AR Viewfinder HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
              {/* Corner Reticles */}
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                <div className="w-8 h-8 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
              </div>

              {/* Central Aiming Circle & Laser Sweep */}
              <div className="relative self-center w-36 h-36 border border-emerald-500/40 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border border-dashed border-emerald-400/60 rounded-full animate-spin [animation-duration:12s]" />
                <div className="w-3 h-3 bg-emerald-400/80 rounded-full animate-ping" />
                {/* Laser Sweep Bar */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-laser shadow-[0_0_12px_#34d399]" />
              </div>

              {/* Bottom Corner Reticles */}
              <div className="flex justify-between items-end">
                <div className="w-8 h-8 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                <div className="w-8 h-8 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />
              </div>
            </div>

            {/* Analyzing Indicator */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-emerald-400 font-bold text-sm tracking-wide">
                  {t.scanner.analyzing}
                </p>
                <p className="text-stone-400 text-xs mt-1 font-mono">
                  Extracting chlorophyll spectra & necrotic lesion geometry
                </p>
              </div>
            )}
          </div>

          {/* Trigger Scan Button */}
          <button
            onClick={() => runAnalysis()}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.scanner.capture}</span>
          </button>

          {cameraError && (
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs leading-relaxed">
              ⚠️ {cameraError}
            </div>
          )}
        </div>

        {/* Right Column: Glassmorphic Diagnosis Result Card (7 cols) */}
        <div className="lg:col-span-7">
          {currentScan ? (
            <DiagnosisCard 
              scan={currentScan} 
              onOpen3D={() => setIsArOverlayOpen(true)}
            />
          ) : (
            <div className="glass-panel p-8 rounded-2xl text-center text-stone-400">
              Select a plant specimen or capture an image to generate instant diagnosis.
            </div>
          )}
        </div>
      </div>

      {/* Preset Specimens Section (10+ diseases & 5 crops for instant hackathon demo) */}
      <div className="space-y-3 pt-4 border-t border-stone-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.scanner.samplePresets}</span>
            </h3>
            <p className="text-xs text-stone-400">
              {t.scanner.selectPresetPrompt}
            </p>
          </div>

          {/* Crop Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-stone-900/80 p-1 rounded-xl border border-stone-800">
            {cropList.map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCropFilter(crop)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCropFilter === crop
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Horizontal Specimen Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredPresets.map((preset) => {
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => selectPreset(preset)}
                className={`text-left p-2.5 rounded-xl transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/60 border-2 border-emerald-400 shadow-lg shadow-emerald-950/50'
                    : 'glass-panel hover:border-emerald-500/40 border border-stone-800 hover:bg-stone-900/60'
                }`}
              >
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-950 mb-2 flex items-center justify-center p-2">
                  <img
                    src={preset.sampleImage}
                    alt={preset.diseaseName}
                    className="w-full h-full object-contain"
                  />
                  <span className={`absolute top-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                    preset.isHealthy
                      ? 'bg-emerald-500 text-stone-950'
                      : preset.severity === 'critical'
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-500 text-stone-950'
                  }`}>
                    {preset.isHealthy ? 'Healthy' : preset.severity}
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-mono font-medium text-emerald-400 uppercase">
                    {preset.crop}
                  </div>
                  <div className="text-xs font-bold text-white line-clamp-1">
                    {preset.diseaseName}
                  </div>
                  <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                    {preset.confidence}% match
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fullscreen 3D AR Hologram Modal */}
      {isArOverlayOpen && currentScan && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-3 sm:p-6 flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-full max-w-4xl h-[85vh] relative flex flex-col">
            <ARPlantViewer
              scan={currentScan}
              onClose={() => setIsArOverlayOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
