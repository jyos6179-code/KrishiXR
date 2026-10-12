import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useAppStore } from '../../store/useAppStore';
import { FarmState } from '../../types/simulation';

interface FarmCanvas3DProps {
  farmState: FarmState;
  isVrMode: boolean;
  onGazeAction?: (action: 'irrigate' | 'fertilize' | 'pest' | 'harvest') => void;
}

export const FarmCanvas3D: React.FC<FarmCanvas3DProps> = ({ farmState, isVrMode, onGazeAction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(farmState);
  stateRef.current = farmState;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // initial sky blue

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Normal Perspective Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 4.5, 9);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below ground
    controls.minDistance = 3;
    controls.maxDistance = 25;
    controls.target.set(0, 0.5, 0);

    // Stereoscopic Cameras for Google Cardboard VR
    const stereoCamera = new THREE.StereoCamera();
    stereoCamera.aspect = 0.5; // each eye takes half width
    stereoCamera.eyeSep = 0.064; // average human IPD: 64mm

    // Ambient & Directional Sun/Moon Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff4e0, 2.0);
    sunLight.position.set(15, 25, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 60;
    sunLight.shadow.camera.left = -15;
    sunLight.shadow.camera.right = 15;
    sunLight.shadow.camera.top = 15;
    sunLight.shadow.camera.bottom = -15;
    scene.add(sunLight);

    // Dynamic Starfield for Night
    const starGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 120;
      starCoords[i + 1] = Math.random() * 50 + 10;
      starCoords[i + 2] = (Math.random() - 0.5) * 120;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.6, transparent: true, opacity: 0 });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- Terrain Construction ---
    // Ground Base
    const groundGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x3d2817, // Rich loam soil
      roughness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Farm Crop Raised Bed Furrows
    const furrowGroup = new THREE.Group();
    scene.add(furrowGroup);

    const furrowMat = new THREE.MeshStandardMaterial({
      color: 0x2e1a0d,
      roughness: 0.95,
    });

    const numRows = 7;
    const rowSpacing = 1.6;
    for (let r = 0; r < numRows; r++) {
      const zPos = (r - (numRows - 1) / 2) * rowSpacing;
      const ridgeGeo = new THREE.BoxGeometry(16, 0.18, 0.9);
      const ridge = new THREE.Mesh(ridgeGeo, furrowMat);
      ridge.position.set(0, 0.09, zPos);
      ridge.receiveShadow = true;
      furrowGroup.add(ridge);

      // Black Drip Lateral Pipe along each furrow
      const pipeGeo = new THREE.CylinderGeometry(0.02, 0.02, 16, 8);
      const pipeMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 });
      const pipe = new THREE.Mesh(pipeGeo, pipeMat);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, 0.2, zPos + 0.35);
      furrowGroup.add(pipe);
    }

    // --- Dynamic Crop Plant Instances ---
    const cropPlantsGroup = new THREE.Group();
    scene.add(cropPlantsGroup);

    const plantMeshes: THREE.Group[] = [];

    // Create 35 plants (5 rows x 7 plants each)
    for (let r = 0; r < numRows; r++) {
      const zPos = (r - (numRows - 1) / 2) * rowSpacing;
      for (let c = 0; c < 7; c++) {
        const xPos = (c - 3) * 2.2;
        const plant = new THREE.Group();
        plant.position.set(xPos, 0.18, zPos);

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.03, 0.04, 1.2, 8);
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.6 });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 0.6;
        stem.castShadow = true;
        plant.add(stem);

        // Leaves (4 radiating leaves)
        for (let l = 0; l < 4; l++) {
          const leafGeo = new THREE.BoxGeometry(0.55, 0.02, 0.22);
          const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.5 });
          const leaf = new THREE.Mesh(leafGeo, leafMat);
          leaf.position.set(0, 0.4 + l * 0.2, 0);
          leaf.rotation.y = (l * Math.PI) / 2 + Math.PI / 4;
          leaf.rotation.z = -0.35;
          leaf.castShadow = true;
          plant.add(leaf);
        }

        // Fruit / Flower head (visible at flowering/harvest)
        const fruitGeo = new THREE.SphereGeometry(0.12, 12, 12);
        const fruitMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3 });
        const fruit = new THREE.Mesh(fruitGeo, fruitMat);
        fruit.position.set(0, 1.25, 0);
        fruit.name = 'fruit';
        fruit.castShadow = true;
        plant.add(fruit);

        cropPlantsGroup.add(plant);
        plantMeshes.push(plant);
      }
    }

    // --- Windmill / Water Pump in Distance ---
    const windmillGroup = new THREE.Group();
    windmillGroup.position.set(-14, 0, -10);
    scene.add(windmillGroup);

    // Tower
    const towerGeo = new THREE.CylinderGeometry(0.5, 1.2, 7, 8);
    const towerMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.4 });
    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.y = 3.5;
    tower.castShadow = true;
    windmillGroup.add(tower);

    // Rotor Blades
    const rotor = new THREE.Group();
    rotor.position.set(0, 7, 0.6);
    windmillGroup.add(rotor);

    for (let b = 0; b < 4; b++) {
      const bladeGeo = new THREE.BoxGeometry(0.2, 2.2, 0.02);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.rotation.z = (b * Math.PI) / 2;
      blade.position.set(0, 1.1 * Math.cos((b * Math.PI) / 2), 0);
      rotor.add(blade);
    }

    // Barn Silhouette in Distance
    const barnGeo = new THREE.BoxGeometry(8, 4, 6);
    const barnMat = new THREE.MeshStandardMaterial({ color: 0x7f1d1d, roughness: 0.8 });
    const barn = new THREE.Mesh(barnGeo, barnMat);
    barn.position.set(15, 2, -14);
    barn.castShadow = true;
    scene.add(barn);

    const roofGeo = new THREE.ConeGeometry(5.8, 2.5, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x450a0a, roughness: 0.9 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(15, 5.25, -14);
    roof.rotation.y = Math.PI / 4;
    scene.add(roof);

    // --- Rain Particle System ---
    const rainCount = 1200;
    const rainGeo = new THREE.BufferGeometry();
    const rainCoords = new Float32Array(rainCount * 3);
    for (let i = 0; i < rainCount * 3; i += 3) {
      rainCoords[i] = (Math.random() - 0.5) * 30;
      rainCoords[i + 1] = Math.random() * 20;
      rainCoords[i + 2] = (Math.random() - 0.5) * 30;
    }
    rainGeo.setAttribute('position', new THREE.BufferAttribute(rainCoords, 3));
    const rainMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const rainParticles = new THREE.Points(rainGeo, rainMat);
    scene.add(rainParticles);

    // --- Pest Bug Particle System ---
    const pestCount = 60;
    const pestGeo = new THREE.BufferGeometry();
    const pestCoords = new Float32Array(pestCount * 3);
    for (let i = 0; i < pestCount * 3; i += 3) {
      pestCoords[i] = (Math.random() - 0.5) * 14;
      pestCoords[i + 1] = Math.random() * 1.5 + 0.3;
      pestCoords[i + 2] = (Math.random() - 0.5) * 8;
    }
    pestGeo.setAttribute('position', new THREE.BufferAttribute(pestCoords, 3));
    const pestMat = new THREE.PointsMaterial({
      color: 0xef4444,
      size: 0.22,
      transparent: true,
      opacity: 0,
    });
    const pestParticles = new THREE.Points(pestGeo, pestMat);
    scene.add(pestParticles);

    // Animation & Update Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const fs = stateRef.current;

      controls.update();

      // Spin windmill blades
      rotor.rotation.z += 0.025;

      // 1. Day / Night Calculation (0 - 24 hours)
      // Angle: 0h = -PI/2 (bottom), 6h = 0 (dawn), 12h = PI/2 (high noon), 18h = PI (dusk), 24h = 3PI/2
      const sunAngle = ((fs.dayTime - 6) / 24) * Math.PI * 2;
      const sunDist = 30;
      sunLight.position.x = Math.cos(sunAngle) * sunDist;
      sunLight.position.y = Math.sin(sunAngle) * sunDist;
      sunLight.position.z = 10;

      const isDay = sunLight.position.y > 0;
      const sunHeightNormalized = Math.max(0, sunLight.position.y / sunDist);

      // Sky and Fog Colors
      let skyColor = new THREE.Color();
      if (sunHeightNormalized > 0.4) {
        // High day
        skyColor.setHex(0x38bdf8); // crisp bright blue
        sunLight.color.setHex(0xfffbeb);
        sunLight.intensity = 2.0;
        ambientLight.intensity = 0.9;
        starMat.opacity = 0;
      } else if (sunHeightNormalized > 0) {
        // Dawn or Dusk
        skyColor.setHex(0xf97316).lerp(new THREE.Color(0x38bdf8), sunHeightNormalized / 0.4);
        sunLight.color.setHex(0xfb923c);
        sunLight.intensity = 1.2;
        ambientLight.intensity = 0.5;
        starMat.opacity = 0.2;
      } else {
        // Night
        skyColor.setHex(0x020617); // midnight dark blue
        sunLight.intensity = 0.15; // Moon glow
        ambientLight.intensity = 0.25;
        starMat.opacity = 0.9;
      }

      // Weather Overrides
      if (fs.weather === 'rain') {
        skyColor.setHex(0x334155); // overcast rain clouds
        rainParticles.visible = true;
        // Animate falling rain
        const rPos = rainGeo.attributes.position.array as Float32Array;
        for (let i = 1; i < rainCount * 3; i += 3) {
          rPos[i] -= 0.6;
          if (rPos[i] < 0) rPos[i] = 18;
        }
        rainGeo.attributes.position.needsUpdate = true;
      } else {
        rainParticles.visible = false;
      }

      if (fs.weather === 'drought') {
        skyColor.setHex(0xfef08a); // scorched dusty yellow haze
        groundMat.color.setHex(0x78350f); // cracked dried clay
      } else {
        // Soil darkens when moist
        const moistRatio = fs.moisture / 100;
        groundMat.color.setHex(0x3d2817).lerp(new THREE.Color(0x1c120c), moistRatio);
      }

      if (fs.weather === 'fog') {
        scene.fog = new THREE.FogExp2(0x94a3b8, 0.04);
      } else {
        scene.fog = null;
      }

      scene.background = skyColor;

      // 2. Crop Growth Scaling by Stage
      let targetPlantScale = 0.25;
      let fruitColor = 0xeab308;
      let fruitVisible = false;

      if (fs.stage === 'sowing') {
        targetPlantScale = 0.25;
        fruitVisible = false;
      } else if (fs.stage === 'vegetative') {
        targetPlantScale = 0.7;
        fruitVisible = false;
      } else if (fs.stage === 'flowering') {
        targetPlantScale = 1.0;
        fruitColor = 0xfef08a; // bright blossoms
        fruitVisible = true;
      } else if (fs.stage === 'pest_outbreak') {
        targetPlantScale = 1.05;
        fruitVisible = true;
      } else if (fs.stage === 'harvest') {
        targetPlantScale = 1.25;
        fruitColor = 0xef4444; // ripe red tomatoes or golden ears
        fruitVisible = true;
      }

      // Update plants
      plantMeshes.forEach((p, idx) => {
        p.scale.set(targetPlantScale, targetPlantScale, targetPlantScale);
        const fruit = p.getObjectByName('fruit') as THREE.Mesh;
        if (fruit) {
          fruit.visible = fruitVisible;
          (fruit.material as THREE.MeshStandardMaterial).color.setHex(fruitColor);
        }
        // Subtle wind breeze sway
        p.rotation.z = Math.sin(elapsed * 2 + idx) * 0.04;
      });

      // Pest particle visibility
      if (fs.stage === 'pest_outbreak' || fs.pestPressure > 30) {
        pestMat.opacity = Math.min(0.9, fs.pestPressure / 60);
        // Swarm flutter
        const pArr = pestGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < pestCount * 3; i += 3) {
          pArr[i] += (Math.random() - 0.5) * 0.05;
          pArr[i + 1] += (Math.random() - 0.5) * 0.03;
          pArr[i + 2] += (Math.random() - 0.5) * 0.05;
        }
        pestGeo.attributes.position.needsUpdate = true;
      } else {
        pestMat.opacity = 0;
      }

      // 3. Render Mode: Normal or Google Cardboard VR Split-Screen
      if (!isVrMode) {
        renderer.setScissorTest(false);
        renderer.setViewport(0, 0, width, height);
        renderer.render(scene, camera);
      } else {
        // Dual Stereo Viewport (Split Screen Google Cardboard)
        stereoCamera.update(camera);
        renderer.setScissorTest(true);

        const halfWidth = width / 2;

        // Left Eye Viewport
        renderer.setScissor(0, 0, halfWidth, height);
        renderer.setViewport(0, 0, halfWidth, height);
        renderer.render(scene, stereoCamera.cameraL);

        // Right Eye Viewport
        renderer.setScissor(halfWidth, 0, halfWidth, height);
        renderer.setViewport(halfWidth, 0, halfWidth, height);
        renderer.render(scene, stereoCamera.cameraR);
      }
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      stereoCamera.aspect = 0.5;
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [isVrMode]);

  return (
    <div className="relative w-full h-full min-h-[460px] rounded-2xl overflow-hidden glass-panel border border-emerald-500/20">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
