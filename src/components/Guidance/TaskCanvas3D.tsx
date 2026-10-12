import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { TrainingTask, TaskStep } from '../../types/tasks';
import { RotateCcw, HelpCircle, Eye } from 'lucide-react';

interface TaskCanvas3DProps {
  task: TrainingTask;
  currentStep: TaskStep;
}

export const TaskCanvas3D: React.FC<TaskCanvas3DProps> = ({ task, currentStep }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1310);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 4.5);

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
    controls.target.set(0, 0.5, 0);
    controls.minDistance = 1.5;
    controls.maxDistance = 12;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    dirLight.position.set(5, 8, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x34d399, 1.5, 8);
    accentLight.position.set(-3, 2, 2);
    scene.add(accentLight);

    // Floor Grid / Ground Plate
    const groundGeo = new THREE.CylinderGeometry(3.5, 3.5, 0.1, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x1f2923,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.05;
    ground.receiveShadow = true;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(6, 12, 0x10b981, 0x064e3b);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // Dynamic 3D Equipment / Model Group based on Task
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Animatable refs
    let dropletMesh: THREE.Mesh | null = null;
    let mistParticles: THREE.Points | null = null;
    let windFlag: THREE.Mesh | null = null;
    let ptoShaftMesh: THREE.Mesh | null = null;

    // Build specific 3D scene according to scene3dType
    switch (task.scene3dType) {
      // 1. SOWING & SPACING
      case 'sowing_spacing': {
        // Soil furrow bed
        const furrowGeo = new THREE.BoxGeometry(3.6, 0.2, 1.8);
        const furrowMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.9 });
        const furrow = new THREE.Mesh(furrowGeo, furrowMat);
        furrow.position.y = 0.1;
        furrow.receiveShadow = true;
        modelGroup.add(furrow);

        // Trench groove
        const grooveGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.6, 16);
        const grooveMat = new THREE.MeshStandardMaterial({ color: 0x22130c });
        const groove = new THREE.Mesh(grooveGeo, grooveMat);
        groove.rotation.z = Math.PI / 2;
        groove.position.set(0, 0.2, 0);
        modelGroup.add(groove);

        // 3D Measuring Ruler (45cm & 15cm marks)
        const rulerGeo = new THREE.BoxGeometry(3.2, 0.03, 0.15);
        const rulerMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3 });
        const ruler = new THREE.Mesh(rulerGeo, rulerMat);
        ruler.position.set(0, 0.25, 0.45);
        modelGroup.add(ruler);

        // Seeds placed at 15cm intervals
        for (let s = -1.2; s <= 1.2; s += 0.45) {
          const seedGeo = new THREE.SphereGeometry(0.04, 12, 12);
          const seedMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 }); // green bio-coated
          const seed = new THREE.Mesh(seedGeo, seedMat);
          seed.position.set(s, 0.22, 0);
          modelGroup.add(seed);

          // Sprouting leaflet
          const sproutGeo = new THREE.BoxGeometry(0.02, 0.18, 0.02);
          const sproutMat = new THREE.MeshStandardMaterial({ color: 0x4ade80 });
          const sprout = new THREE.Mesh(sproutGeo, sproutMat);
          sprout.position.set(s, 0.3, 0);
          modelGroup.add(sprout);
        }
        break;
      }

      // 2. DRIP IRRIGATION
      case 'drip_irrigation': {
        // Main Black Pipe
        const mainPipeGeo = new THREE.CylinderGeometry(0.12, 0.12, 3.8, 16);
        const pipeMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.3 });
        const mainPipe = new THREE.Mesh(mainPipeGeo, pipeMat);
        mainPipe.rotation.z = Math.PI / 2;
        mainPipe.position.set(0, 0.5, 0);
        modelGroup.add(mainPipe);

        // 120-Mesh Disc Filter Body
        const filterGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.9, 20);
        const filterMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.4 }); // Industrial Amber/Yellow
        const filter = new THREE.Mesh(filterGeo, filterMat);
        filter.position.set(-0.6, 0.85, 0);
        modelGroup.add(filter);

        // Pressure Gauge on Top
        const gaugeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.08, 16);
        const gaugeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.5 });
        const gauge = new THREE.Mesh(gaugeGeo, gaugeMat);
        gauge.position.set(-0.6, 1.4, 0);
        gauge.rotation.x = Math.PI / 2;
        modelGroup.add(gauge);

        // Venturi Injector Tee-Junction
        const venturiGeo = new THREE.TorusGeometry(0.2, 0.06, 12, 16);
        const venturiMat = new THREE.MeshStandardMaterial({ color: 0x0284c7 });
        const venturi = new THREE.Mesh(venturiGeo, venturiMat);
        venturi.position.set(0.8, 0.5, 0);
        modelGroup.add(venturi);

        // Dripping water droplet
        const dropGeo = new THREE.SphereGeometry(0.04, 12, 12);
        const dropMat = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          roughness: 0.1,
          metalness: 0.2,
          transparent: true,
          opacity: 0.85,
        });
        dropletMesh = new THREE.Mesh(dropGeo, dropMat);
        dropletMesh.position.set(0.8, 0.35, 0);
        modelGroup.add(dropletMesh);
        break;
      }

      // 3. PESTICIDE & PPE
      case 'pesticide_ppe': {
        // Knapsack Sprayer Tank
        const tankGeo = new THREE.BoxGeometry(0.7, 1.1, 0.45);
        const tankMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 }); // Blue tank
        const tank = new THREE.Mesh(tankGeo, tankMat);
        tank.position.set(-0.4, 0.8, 0);
        tank.castShadow = true;
        modelGroup.add(tank);

        // Spray Lance / Wand
        const lanceGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.4, 12);
        const lanceMat = new THREE.MeshStandardMaterial({ color: 0xeab308, metalness: 0.7 });
        const lance = new THREE.Mesh(lanceGeo, lanceMat);
        lance.position.set(0.6, 0.9, 0.2);
        lance.rotation.z = -Math.PI / 3;
        modelGroup.add(lance);

        // Hollow Cone Nozzle tip
        const nozzleGeo = new THREE.ConeGeometry(0.06, 0.12, 16);
        const nozzleMat = new THREE.MeshStandardMaterial({ color: 0xca8a04, metalness: 0.8 });
        const nozzle = new THREE.Mesh(nozzleGeo, nozzleMat);
        nozzle.position.set(1.2, 0.55, 0.2);
        nozzle.rotation.z = Math.PI / 2;
        modelGroup.add(nozzle);

        // Fine Mist Spray Particle System
        const mistCount = 250;
        const mistGeo = new THREE.BufferGeometry();
        const mistPos = new Float32Array(mistCount * 3);
        for (let i = 0; i < mistCount * 3; i += 3) {
          mistPos[i] = 1.2 + Math.random() * 0.8;
          mistPos[i + 1] = 0.55 - Math.random() * 0.5;
          mistPos[i + 2] = 0.2 + (Math.random() - 0.5) * 0.4;
        }
        mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPos, 3));
        const mistMat = new THREE.PointsMaterial({
          color: 0x67e8f9,
          size: 0.04,
          transparent: true,
          opacity: 0.6,
        });
        mistParticles = new THREE.Points(mistGeo, mistMat);
        modelGroup.add(mistParticles);

        // Wind Direction Vane & Ribbon
        const poleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.6, 8);
        const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const pole = new THREE.Mesh(poleGeo, poleMat);
        pole.position.set(-1.4, 0.8, 0);
        modelGroup.add(pole);

        const flagGeo = new THREE.BoxGeometry(0.4, 0.12, 0.01);
        const flagMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
        windFlag = new THREE.Mesh(flagGeo, flagMat);
        windFlag.position.set(-1.2, 1.5, 0);
        modelGroup.add(windFlag);
        break;
      }

      // 4. SCIENTIFIC COMPOSTING
      case 'compost_pit': {
        // Pit Brick/Wall Frame
        const wallGeo = new THREE.BoxGeometry(3.0, 1.0, 2.0);
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
        const wall = new THREE.Mesh(wallGeo, wallMat);
        wall.position.y = 0.5;
        modelGroup.add(wall);

        // Layer 1: Brown Carbon (Bottom)
        const brownGeo = new THREE.BoxGeometry(2.8, 0.25, 1.8);
        const brownMat = new THREE.MeshStandardMaterial({ color: 0x451a03 });
        const brownLayer = new THREE.Mesh(brownGeo, brownMat);
        brownLayer.position.set(0, 0.2, 0);
        modelGroup.add(brownLayer);

        // Layer 2: Green Nitrogen (Middle)
        const greenGeo = new THREE.BoxGeometry(2.8, 0.25, 1.8);
        const greenMat = new THREE.MeshStandardMaterial({ color: 0x15803d });
        const greenLayer = new THREE.Mesh(greenGeo, greenMat);
        greenLayer.position.set(0, 0.48, 0);
        modelGroup.add(greenLayer);

        // Layer 3: Cow Dung Bio-Slurry (Top)
        const slurryGeo = new THREE.BoxGeometry(2.8, 0.22, 1.8);
        const slurryMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.95 });
        const slurryLayer = new THREE.Mesh(slurryGeo, slurryMat);
        slurryLayer.position.set(0, 0.74, 0);
        modelGroup.add(slurryLayer);

        // Aeration Pitchfork stuck in heap
        const forkHandleGeo = new THREE.CylinderGeometry(0.025, 0.025, 1.4, 8);
        const forkMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
        const fork = new THREE.Mesh(forkHandleGeo, forkMat);
        fork.position.set(0.6, 1.3, 0.2);
        fork.rotation.z = -0.3;
        modelGroup.add(fork);
        break;
      }

      // 5. SRI RICE TRANSPLANTING
      case 'sri_rice': {
        // Wet Mud Puddle Bed
        const mudGeo = new THREE.BoxGeometry(3.2, 0.15, 3.2);
        const mudMat = new THREE.MeshStandardMaterial({ color: 0x271e16, roughness: 0.3 }); // glistening mud
        const mud = new THREE.Mesh(mudGeo, mudMat);
        mud.position.y = 0.08;
        modelGroup.add(mud);

        // 25cm x 25cm Square Grid Lines
        const gridMat = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.8 });
        for (let g = -1.2; g <= 1.2; g += 0.6) {
          const pointsX = [new THREE.Vector3(g, 0.16, -1.2), new THREE.Vector3(g, 0.16, 1.2)];
          const lineX = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pointsX), gridMat);
          modelGroup.add(lineX);

          const pointsZ = [new THREE.Vector3(-1.2, 0.16, g), new THREE.Vector3(1.2, 0.16, g)];
          const lineZ = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pointsZ), gridMat);
          modelGroup.add(lineZ);
        }

        // Young 8-12 Day Single Seedling at Grid Intersection
        const seedGroup = new THREE.Group();
        seedGroup.position.set(0, 0.16, 0);

        // Root-mud soil ball
        const rootBallGeo = new THREE.SphereGeometry(0.06, 12, 12);
        const rootBallMat = new THREE.MeshStandardMaterial({ color: 0x1c1917 });
        const rootBall = new THREE.Mesh(rootBallGeo, rootBallMat);
        seedGroup.add(rootBall);

        // Tender 2-leaf blades
        const bladeGeo = new THREE.BoxGeometry(0.02, 0.45, 0.06);
        const bladeMat = new THREE.MeshStandardMaterial({ color: 0x22c55e });
        const blade1 = new THREE.Mesh(bladeGeo, bladeMat);
        blade1.position.set(0.02, 0.2, 0);
        blade1.rotation.z = -0.2;
        seedGroup.add(blade1);

        const blade2 = new THREE.Mesh(bladeGeo, bladeMat);
        blade2.position.set(-0.02, 0.2, 0);
        blade2.rotation.z = 0.25;
        seedGroup.add(blade2);

        modelGroup.add(seedGroup);
        break;
      }

      // 6. TRACTOR SAFETY & MAINTENANCE
      case 'tractor_safety': {
        // Tractor Engine Hood & Body
        const hoodGeo = new THREE.BoxGeometry(1.4, 0.9, 2.2);
        const hoodMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.3 }); // Tractor Green
        const hood = new THREE.Mesh(hoodGeo, hoodMat);
        hood.position.set(0, 0.9, 0);
        hood.castShadow = true;
        modelGroup.add(hood);

        // Exhaust Smoke Pipe
        const exhaustGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.1, 12);
        const exhaustMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.8 });
        const exhaust = new THREE.Mesh(exhaustGeo, exhaustMat);
        exhaust.position.set(0.5, 1.7, 0.6);
        modelGroup.add(exhaust);

        // Big Rear Wheels
        const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.3, 24);
        const wheelMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.9 });
        const leftWheel = new THREE.Mesh(wheelGeo, wheelMat);
        leftWheel.rotation.z = Math.PI / 2;
        leftWheel.position.set(-0.85, 0.55, -0.6);
        modelGroup.add(leftWheel);

        const rightWheel = leftWheel.clone();
        rightWheel.position.x = 0.85;
        modelGroup.add(rightWheel);

        // Rotating PTO Shaft & Master Shield
        const ptoGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.5, 12);
        const ptoMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.6 });
        ptoShaftMesh = new THREE.Mesh(ptoGeo, ptoMat);
        ptoShaftMesh.rotation.x = Math.PI / 2;
        ptoShaftMesh.position.set(0, 0.45, -1.2);
        modelGroup.add(ptoShaftMesh);

        // Yellow PTO Guard
        const guardGeo = new THREE.BoxGeometry(0.35, 0.25, 0.3);
        const guardMat = new THREE.MeshStandardMaterial({ color: 0xeab308 });
        const guard = new THREE.Mesh(guardGeo, guardMat);
        guard.position.set(0, 0.65, -1.2);
        modelGroup.add(guard);

        // Oil Dipstick
        const stickGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.8, 8);
        const stickMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24 });
        const stick = new THREE.Mesh(stickGeo, stickMat);
        stick.position.set(0.65, 1.1, 0);
        stick.rotation.z = -0.3;
        modelGroup.add(stick);
        break;
      }
    }

    // Render loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      controls.update();

      // Animate specific features
      if (dropletMesh) {
        dropletMesh.position.y = 0.35 - ((elapsed * 2) % 0.4);
      }
      if (windFlag) {
        windFlag.rotation.y = Math.sin(elapsed * 4) * 0.15;
      }
      if (ptoShaftMesh) {
        ptoShaftMesh.rotation.z += 0.05;
      }
      if (mistParticles) {
        const arr = mistParticles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          arr[i] += 0.01;
          arr[i + 1] -= 0.005;
          if (arr[i] > 2.0) arr[i] = 1.2;
          if (arr[i + 1] < 0.1) arr[i + 1] = 0.55;
        }
        mistParticles.geometry.attributes.position.needsUpdate = true;
      }

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
  }, [task.id, currentStep.stepNumber]);

  return (
    <div className="relative w-full h-full min-h-[340px] rounded-2xl overflow-hidden glass-panel border border-emerald-500/20 shadow-2xl">
      {/* 3D Top Info Header */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl glass-panel text-xs font-mono font-medium text-emerald-400 flex items-center gap-2 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D OPERATIONAL BLUEPRINT</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Hotspots Info Bar if present */}
      {currentStep.hotspots && currentStep.hotspots.length > 0 && (
        <div className="absolute bottom-3 inset-x-3 z-10 flex gap-2 overflow-x-auto pb-1">
          {currentStep.hotspots.map((hs) => (
            <div
              key={hs.id}
              className="px-3 py-2 rounded-xl glass-panel border border-emerald-500/40 text-xs text-stone-200 shrink-0 max-w-xs shadow-lg backdrop-blur-md"
            >
              <div className="font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {hs.title}
              </div>
              <div className="text-[11px] text-stone-300 mt-0.5">{hs.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
