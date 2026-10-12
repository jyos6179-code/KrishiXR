import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ScanResult, CROP_DISEASES } from '../../types/crop';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../types/i18n';
import { 
  Volume2, VolumeX, RotateCcw, Maximize2, ShieldAlert, 
  CheckCircle2, AlertTriangle, Layers, Eye
} from 'lucide-react';

interface ARPlantViewerProps {
  scan: ScanResult;
  onClose?: () => void;
  isArBackground?: boolean;
}

export const ARPlantViewer: React.FC<ARPlantViewerProps> = ({ scan, onClose, isArBackground = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, isAudioPlaying, toggleAudioNarration, stopAudio } = useAppStore();
  const t = translations[language];

  const [isWireframe, setIsWireframe] = useState(false);
  const [activeTab, setActiveTab] = useState<'3d' | 'spots' | 'info'>('3d');
  const [autoRotate, setAutoRotate] = useState(true);

  // Find visual disease params
  const diseaseRec = CROP_DISEASES.find(d => d.id === scan.diseaseId) || CROP_DISEASES[0];
  const visual = diseaseRec.visual3d;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Transparent if AR overlay, else deep dark studio
    if (!isArBackground) {
      scene.background = new THREE.Color(0x0a100d);
    } else {
      scene.background = null;
    }

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 2.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 5;
    controls.minDistance = 0.8;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.0);
    dirLight.position.set(3, 5, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x34d399, 1.5, 6);
    pointLight.position.set(-2, 1, 2);
    scene.add(pointLight);

    // Group for the entire plant
    const plantGroup = new THREE.Group();
    scene.add(plantGroup);

    // --- Procedural Plant Construction ---
    // 1. Stem
    const stemCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.9, 0),
      new THREE.Vector3(0.05, -0.3, 0.02),
      new THREE.Vector3(-0.04, 0.3, -0.02),
      new THREE.Vector3(0.02, 0.8, 0),
    ]);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 32, 0.035, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x2e7d32,
      roughness: 0.6,
      wireframe: isWireframe,
    });
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.castShadow = true;
    plantGroup.add(stemMesh);

    // 2. Leaf Geometry (Custom procedural leaf shape)
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.3, 0.2, 0.6, 0.6, 0.45, 1.1);
    leafShape.bezierCurveTo(0.3, 1.35, 0.1, 1.45, 0, 1.6);
    leafShape.bezierCurveTo(-0.1, 1.45, -0.3, 1.35, -0.45, 1.1);
    leafShape.bezierCurveTo(-0.6, 0.6, -0.3, 0.2, 0, 0);

    const extrudeSettings = {
      depth: 0.015,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 0.01,
      bevelThickness: 0.01,
    };
    const leafGeo = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);

    // Main Leaf Material
    const leafColorNum = parseInt(visual.leafColor.replace('#', '0x'), 16);
    const leafMat = new THREE.MeshStandardMaterial({
      color: leafColorNum,
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.DoubleSide,
      wireframe: isWireframe,
    });

    // Create Main Infected Leaf (center front)
    const mainLeaf = new THREE.Mesh(leafGeo, leafMat);
    mainLeaf.scale.set(0.7, 0.7 * (visual.wilted ? 0.85 : 1.0), 0.7);
    mainLeaf.rotation.x = Math.PI / 4 + (visual.wilted ? 0.3 : 0);
    mainLeaf.rotation.z = -0.15;
    mainLeaf.position.set(0.04, -0.1, 0.1);
    mainLeaf.castShadow = true;
    plantGroup.add(mainLeaf);

    // Secondary Leaves
    const leftLeaf = new THREE.Mesh(leafGeo, leafMat.clone());
    leftLeaf.scale.set(0.55, 0.55, 0.55);
    leftLeaf.rotation.set(0.4, -0.7, 0.6);
    leftLeaf.position.set(-0.04, -0.4, 0);
    plantGroup.add(leftLeaf);

    const rightLeaf = new THREE.Mesh(leafGeo, leafMat.clone());
    rightLeaf.scale.set(0.55, 0.55, 0.55);
    rightLeaf.rotation.set(0.3, 0.7, -0.6);
    rightLeaf.position.set(0.04, 0.2, -0.05);
    plantGroup.add(rightLeaf);

    // 3. Procedural Disease Lesion Spots on the Main Leaf
    const spotColorNum = parseInt(visual.spotColor.replace('#', '0x'), 16);
    const spotGroup = new THREE.Group();
    mainLeaf.add(spotGroup);

    if (visual.spotCount > 0) {
      const spotMat = new THREE.MeshStandardMaterial({
        color: spotColorNum,
        roughness: 0.8,
        metalness: 0.2,
      });

      const spotLocations = [
        { x: 0.12, y: 0.6, z: 0.02, r: visual.spotSize * 1.2 },
        { x: -0.15, y: 0.8, z: 0.02, r: visual.spotSize * 0.9 },
        { x: 0.05, y: 1.1, z: 0.02, r: visual.spotSize * 1.4 },
        { x: -0.08, y: 0.4, z: 0.02, r: visual.spotSize * 0.8 },
        { x: 0.2, y: 0.9, z: 0.02, r: visual.spotSize * 1.1 },
        { x: -0.22, y: 1.2, z: 0.02, r: visual.spotSize * 1.0 },
        { x: 0, y: 0.75, z: 0.02, r: visual.spotSize * 1.3 },
      ];

      for (let i = 0; i < Math.min(visual.spotCount, spotLocations.length); i++) {
        const loc = spotLocations[i];
        const sGeo = new THREE.CylinderGeometry(loc.r, loc.r * 1.1, 0.02, 16);
        const sMesh = new THREE.Mesh(sGeo, spotMat);
        sMesh.position.set(loc.x, loc.y, loc.z);
        sMesh.rotation.x = Math.PI / 2;
        spotGroup.add(sMesh);

        // Halo ring around spot (early blight target sign)
        const ringGeo = new THREE.RingGeometry(loc.r * 1.2, loc.r * 1.5, 16);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xeab308,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.set(loc.x, loc.y, loc.z + 0.011);
        spotGroup.add(ringMesh);
      }
    }

    // 4. Floating Holographic Pin/Marker
    const pinGroup = new THREE.Group();
    pinGroup.position.set(0.2, 0.6, 0.3);
    plantGroup.add(pinGroup);

    // Glowing orb
    const orbGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const orbMat = new THREE.MeshBasicMaterial({
      color: scan.isHealthy ? 0x22c55e : scan.severity === 'critical' ? 0xef4444 : 0xf59e0b,
    });
    const orbMesh = new THREE.Mesh(orbGeo, orbMat);
    pinGroup.add(orbMesh);

    // Pulsing ring
    const pulseRingGeo = new THREE.RingGeometry(0.06, 0.08, 24);
    const pulseRingMat = new THREE.MeshBasicMaterial({
      color: orbMat.color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const pulseRing = new THREE.Mesh(pulseRingGeo, pulseRingMat);
    pinGroup.add(pulseRing);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      controls.update();

      // Gentle foliage breathing animation
      mainLeaf.rotation.z = -0.15 + Math.sin(elapsed * 1.5) * 0.03;
      pinGroup.position.y = 0.6 + Math.sin(elapsed * 2.5) * 0.04;
      pulseRing.scale.setScalar(1 + Math.sin(elapsed * 4) * 0.25);
      pulseRing.lookAt(camera.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [scan.diseaseId, isWireframe, autoRotate, isArBackground]);

  // Audio text
  const narrationSummary = `${scan.crop}. ${scan.diseaseName}. ${scan.severity} severity. Confidence ${scan.confidence} percent. Symptoms: ${scan.symptoms}. Organic treatment: ${scan.organicTreatment}.`;

  return (
    <div className="relative w-full h-full flex flex-col bg-stone-950/90 rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl">
      {/* 3D Viewport Header */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-xl glass-panel text-xs font-mono font-medium text-emerald-400 flex items-center gap-2 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            3D HOLOGRAPHIC SPECIMEN
          </div>
          <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider ${
            scan.isHealthy 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : scan.severity === 'critical'
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            {scan.severity} Severity
          </span>
        </div>

        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotate"
            className={`p-2 rounded-xl text-xs transition-all ${
              autoRotate ? 'bg-emerald-600 text-white' : 'glass-panel text-stone-300 hover:text-white'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title="Toggle Wireframe Mesh"
            className={`p-2 rounded-xl text-xs transition-all ${
              isWireframe ? 'bg-emerald-600 text-white' : 'glass-panel text-stone-300 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleAudioNarration(narrationSummary)}
            className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all ${
              isAudioPlaying 
                ? 'bg-amber-600 text-white animate-pulse' 
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl glass-panel text-stone-300 hover:text-white hover:bg-rose-900/40"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full flex-1 relative cursor-grab active:cursor-grabbing min-h-[340px]"
      />

      {/* Floating Spatial Label Tag */}
      <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-auto">
        <div className="glass-panel p-3.5 rounded-xl border border-emerald-500/30 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-wide">{scan.diseaseName}</h4>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                  {scan.confidence}% Match
                </span>
              </div>
              <p className="text-xs text-stone-300 italic mt-0.5 font-serif">{scan.scientificName}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block font-mono">Host Crop</span>
              <span className="text-xs font-semibold text-emerald-300">{scan.crop}</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-stone-300 line-clamp-2 bg-stone-900/60 p-2 rounded-lg border border-stone-800">
            <span className="text-emerald-400 font-semibold">Diagnosis: </span>
            {scan.symptoms}
          </div>
        </div>
      </div>
    </div>
  );
};
