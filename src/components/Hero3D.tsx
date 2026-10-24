import { useEffect, useRef, useState, type FC } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { 
  Sparkles, 
  CalendarCheck, 
  UtensilsCrossed, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  ShieldCheck,
  RotateCw,
  Layers,
  ChevronDown,
  ChevronUp,
  Eye
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, EASE } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

// Software WebGL Detection for adaptive high performance
const getIsSoftwareGl = (): boolean => {
  if (typeof document === 'undefined') return true;
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
};

type FeastViewPreset = 'thali' | 'curries' | 'chaat' | 'spices';

export const Hero3D: FC = () => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [isSoftwareGl] = useState(getIsSoftwareGl);
  const [activePreset, setActivePreset] = useState<FeastViewPreset>('thali');
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState(false);

  // References for cross-loop interaction without re-mounting Three.js
  const viewPresetRef = useRef<FeastViewPreset>('thali');
  const autoRotateRef = useRef(true);
  const explodedRef = useRef(false);

  useEffect(() => {
    viewPresetRef.current = activePreset;
  }, [activePreset]);

  useEffect(() => {
    autoRotateRef.current = isAutoRotating;
  }, [isAutoRotating]);

  useEffect(() => {
    explodedRef.current = isExploded;
  }, [isExploded]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFDFBF7, 0.04);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.8);

    // 2. High-Fidelity ACESFilmic PBR Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // 3. Studio Reflection Environment via PMREMGenerator
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Procedural Textures Generator for Authentic North Indian Curries
    const createCurryTexture = (type: 'dal' | 'paneer' | 'pulao' | 'raita' | 'naan'): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;

      if (type === 'dal') {
        // Rich velvety black lentils with cream swirl
        const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
        grad.addColorStop(0, '#3A1408');
        grad.addColorStop(0.6, '#280A04');
        grad.addColorStop(1, '#1A0602');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // White cream swirl
        ctx.strokeStyle = 'rgba(255, 245, 230, 0.85)';
        ctx.lineWidth = 14;
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 4; a += 0.1) {
          const r = 25 + a * 18;
          const x = 256 + Math.cos(a) * r;
          const y = 256 + Math.sin(a) * r;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Butter pat in center
        ctx.fillStyle = '#FFE57F';
        ctx.beginPath();
        ctx.roundRect(236, 236, 40, 40, 8);
        ctx.fill();

        // Coriander garnish flecks
        ctx.fillStyle = '#2E7D32';
        for (let i = 0; i < 30; i++) {
          const rx = 256 + (Math.random() - 0.5) * 220;
          const ry = 256 + (Math.random() - 0.5) * 220;
          ctx.beginPath();
          ctx.arc(rx, ry, 3 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'paneer') {
        // Golden Saffron Makhani Gravy
        const grad = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
        grad.addColorStop(0, '#E65100');
        grad.addColorStop(0.5, '#F57C00');
        grad.addColorStop(1, '#D84315');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Paneer Cubes
        ctx.fillStyle = '#FFFDE7';
        ctx.strokeStyle = '#FFE082';
        ctx.lineWidth = 3;
        const cubes = [
          { x: 190, y: 190, s: 50 },
          { x: 265, y: 220, s: 45 },
          { x: 210, y: 280, s: 48 },
          { x: 290, y: 160, s: 42 }
        ];
        cubes.forEach(c => {
          ctx.beginPath();
          ctx.roundRect(c.x, c.y, c.s, c.s, 6);
          ctx.fill();
          ctx.stroke();
        });

        // Golden Ghee drizzle
        ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
        ctx.beginPath();
        ctx.arc(256, 256, 120, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'pulao') {
        // Saffron Rice & Basmati grains
        ctx.fillStyle = '#FFF8E1';
        ctx.fillRect(0, 0, 512, 512);

        // Golden saffron streaks
        ctx.fillStyle = '#FFA000';
        for (let i = 0; i < 180; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const len = 12 + Math.random() * 15;
          const ang = Math.random() * Math.PI;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(ang);
          ctx.fillRect(-len / 2, -2, len, 4);
          ctx.restore();
        }

        // Green peas & fried cashews
        ctx.fillStyle = '#4CAF50';
        for (let i = 0; i < 40; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * 512, Math.random() * 512, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'raita') {
        // Cool Mint & Cucumber Raita with roasted cumin
        ctx.fillStyle = '#F1F8E9';
        ctx.fillRect(0, 0, 512, 512);

        // Mint puree swirl
        ctx.fillStyle = '#81C784';
        for (let i = 0; i < 20; i++) {
          ctx.beginPath();
          ctx.arc(100 + Math.random() * 312, 100 + Math.random() * 312, 12 + Math.random() * 16, 0, Math.PI * 2);
          ctx.fill();
        }

        // Boondi pearls
        ctx.fillStyle = '#FFB74D';
        for (let i = 0; i < 50; i++) {
          ctx.beginPath();
          ctx.arc(Math.random() * 512, Math.random() * 512, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'naan') {
        // Tandoori blistered naan texture
        ctx.fillStyle = '#FFF3E0';
        ctx.fillRect(0, 0, 512, 512);

        // Blistered tandoor char spots
        ctx.fillStyle = '#5D4037';
        for (let i = 0; i < 25; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const r = 8 + Math.random() * 18;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        // Nigella seeds / kalonji
        ctx.fillStyle = '#212121';
        for (let i = 0; i < 80; i++) {
          ctx.fillRect(Math.random() * 512, Math.random() * 512, 4, 3);
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return texture;
    };

    // 5. Build Composite 3D Feast Hierarchy (THREE.Group)
    const masterFeastGroup = new THREE.Group();
    scene.add(masterFeastGroup);

    // Root grounding shadow plane right beneath the thali
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const shadowGrad = shadowCtx.createRadialGradient(128, 128, 20, 128, 128, 126);
    shadowGrad.addColorStop(0, 'rgba(25, 10, 5, 0.65)');
    shadowGrad.addColorStop(0.5, 'rgba(40, 20, 10, 0.35)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    shadowCtx.fillStyle = shadowGrad;
    shadowCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(6.5, 6.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });
    const groundShadow = new THREE.Mesh(shadowGeo, shadowMat);
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.set(0.6, -1.52, 0);
    masterFeastGroup.add(groundShadow);

    // Thali Core Group (Platter + Bowls + Breads)
    const thaliGroup = new THREE.Group();
    thaliGroup.position.set(0.6, -0.4, 0);
    masterFeastGroup.add(thaliGroup);

    // 5.1 Royal Embossed Brass Thali (LatheGeometry with bevel and ornate lip)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(2.1, 0));
    points.push(new THREE.Vector2(2.35, 0.08));
    points.push(new THREE.Vector2(2.45, 0.32));
    points.push(new THREE.Vector2(2.52, 0.34));
    points.push(new THREE.Vector2(2.48, 0.28));
    points.push(new THREE.Vector2(2.38, 0.05));
    points.push(new THREE.Vector2(0, 0.02));

    const thaliGeo = new THREE.LatheGeometry(points, 64);
    const brassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xE2BA48,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.6,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9
    });
    const thaliMesh = new THREE.Mesh(thaliGeo, brassMaterial);
    thaliMesh.castShadow = !isSoftwareGl;
    thaliMesh.receiveShadow = !isSoftwareGl;
    thaliGroup.add(thaliMesh);

    // Concentric engraving ring inside thali
    const ringGeo = new THREE.RingGeometry(1.6, 1.66, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xC19522,
      roughness: 0.3,
      metalness: 0.85,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = 0.025;
    thaliGroup.add(ringMesh);

    // 5.2 Handcrafted Hammered Copper & Brass Bowls (4 Katoris)
    const katoriConfigs = [
      { id: 'dal', x: -0.75, z: -0.85, type: 'dal' as const, name: 'Dal Makhani' },
      { id: 'paneer', x: 0.75, z: -0.85, type: 'paneer' as const, name: 'Shahi Paneer' },
      { id: 'pulao', x: -1.05, z: 0.45, type: 'pulao' as const, name: 'Basmati Pulao' },
      { id: 'raita', x: 1.05, z: 0.45, type: 'raita' as const, name: 'Cucumber Mint Raita' }
    ];

    const katoriMeshArray: THREE.Group[] = [];

    katoriConfigs.forEach((cfg) => {
      const kGroup = new THREE.Group();
      kGroup.position.set(cfg.x, 0.03, cfg.z);

      // Copper Bowl Body
      const bowlGeo = new THREE.CylinderGeometry(0.56, 0.38, 0.46, 32);
      const copperMat = new THREE.MeshPhysicalMaterial({
        color: 0xC86D3B, // Hammered Pure Copper
        roughness: 0.24,
        metalness: 0.88,
        clearcoat: 0.35
      });
      const bowlMesh = new THREE.Mesh(bowlGeo, copperMat);
      bowlMesh.position.y = 0.23;
      bowlMesh.castShadow = !isSoftwareGl;
      kGroup.add(bowlMesh);

      // Brass Rim on top of Copper Bowl
      const lipGeo = new THREE.TorusGeometry(0.57, 0.032, 16, 32);
      const lipMesh = new THREE.Mesh(lipGeo, brassMaterial);
      lipMesh.rotation.x = Math.PI / 2;
      lipMesh.position.y = 0.46;
      kGroup.add(lipMesh);

      // Food surface disc with rich procedural texture
      const foodTex = createCurryTexture(cfg.type);
      const foodGeo = new THREE.CircleGeometry(0.52, 32);
      const foodMat = new THREE.MeshStandardMaterial({
        map: foodTex,
        roughness: 0.35,
        metalness: 0.15
      });
      const foodMesh = new THREE.Mesh(foodGeo, foodMat);
      foodMesh.rotation.x = -Math.PI / 2;
      foodMesh.position.y = 0.44;
      kGroup.add(foodMesh);

      thaliGroup.add(kGroup);
      katoriMeshArray.push(kGroup);
    });

    // 5.3 Warm Golden Tandoori Naan & Fresh Crisp Samosas in center
    const naanGroup = new THREE.Group();
    naanGroup.position.set(0, 0.06, 0.7);

    // Naan bread mesh
    const naanShape = new THREE.Shape();
    naanShape.moveTo(0, -0.6);
    naanShape.quadraticCurveTo(0.7, -0.2, 0.5, 0.5);
    naanShape.quadraticCurveTo(0, 0.9, -0.5, 0.5);
    naanShape.quadraticCurveTo(-0.7, -0.2, 0, -0.6);

    const naanGeo = new THREE.ExtrudeGeometry(naanShape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.04,
      bevelSegments: 4
    });
    const naanTex = createCurryTexture('naan');
    const naanMat = new THREE.MeshStandardMaterial({
      map: naanTex,
      roughness: 0.65,
      metalness: 0.05
    });
    const naanMesh = new THREE.Mesh(naanGeo, naanMat);
    naanMesh.rotation.x = -Math.PI / 2 + 0.15;
    naanMesh.rotation.z = 0.3;
    naanMesh.scale.set(0.9, 0.9, 0.9);
    naanMesh.castShadow = !isSoftwareGl;
    naanGroup.add(naanMesh);

    // Crisp Golden Samosas
    const samosaGeo = new THREE.ConeGeometry(0.32, 0.45, 3);
    const samosaMat = new THREE.MeshStandardMaterial({
      color: 0xE8A246, // Deep fried pastry golden
      roughness: 0.5,
      metalness: 0.1
    });
    const samosa1 = new THREE.Mesh(samosaGeo, samosaMat);
    samosa1.rotation.y = 0.4;
    samosa1.position.set(0.42, 0.22, 0.15);
    samosa1.castShadow = !isSoftwareGl;
    naanGroup.add(samosa1);

    const samosa2 = new THREE.Mesh(samosaGeo, samosaMat);
    samosa2.rotation.y = -0.6;
    samosa2.position.set(-0.35, 0.2, -0.1);
    samosa2.scale.setScalar(0.85);
    samosa2.castShadow = !isSoftwareGl;
    naanGroup.add(samosa2);

    thaliGroup.add(naanGroup);

    // Initial slight isometric angle for gorgeous readability
    thaliGroup.rotation.x = 0.52;
    thaliGroup.rotation.y = -0.2;

    // 6. Floating 3D Whole Spices in Orbit
    const spicesGroup = new THREE.Group();
    masterFeastGroup.add(spicesGroup);

    interface FloatingSpice {
      group: THREE.Group | THREE.Mesh;
      baseX: number;
      baseY: number;
      baseZ: number;
      orbitSpeed: number;
      rotSpeed: { x: number; y: number; z: number };
      phase: number;
    }

    const floatingSpices: FloatingSpice[] = [];

    // Helper: Star Anise (8 petals with star center)
    const createStarAniseMesh = () => {
      const star = new THREE.Group();
      const spiceMat = new THREE.MeshStandardMaterial({
        color: 0x4E2715,
        roughness: 0.65,
        metalness: 0.08
      });
      for (let i = 0; i < 8; i++) {
        const petalGeo = new THREE.ConeGeometry(0.09, 0.42, 5);
        const petal = new THREE.Mesh(petalGeo, spiceMat);
        const a = (i * Math.PI * 2) / 8;
        petal.position.x = Math.cos(a) * 0.22;
        petal.position.y = Math.sin(a) * 0.22;
        petal.rotation.z = a - Math.PI / 2;
        star.add(petal);
      }
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), spiceMat);
      star.add(core);
      return star;
    };

    // Helper: Green Cardamom Pod
    const createCardamomMesh = () => {
      const pod = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 16, 16),
        new THREE.MeshStandardMaterial({
          color: 0x558B2F,
          roughness: 0.45,
          metalness: 0.12
        })
      );
      pod.scale.set(0.9, 1.85, 0.9);
      return pod;
    };

    // Helper: Cinnamon Quill Tube
    const createCinnamonMesh = () => {
      const cinGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.8, 16, 1, true);
      const cinMat = new THREE.MeshStandardMaterial({
        color: 0x6D4C41,
        roughness: 0.8,
        metalness: 0.05,
        side: THREE.DoubleSide
      });
      return new THREE.Mesh(cinGeo, cinMat);
    };

    // Helper: Golden Saffron Thread
    const createSaffronThreadMesh = () => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-0.3, -0.2, 0),
        new THREE.Vector3(-0.1, 0.15, 0.1),
        new THREE.Vector3(0.2, -0.1, -0.1),
        new THREE.Vector3(0.4, 0.2, 0)
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.025, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0xF36C21,
        emissive: 0x882200,
        roughness: 0.3,
        metalness: 0.5
      });
      return new THREE.Mesh(tubeGeo, tubeMat);
    };

    const spiceConfigs = [
      { creator: createStarAniseMesh, x: -2.3, y: 1.6, z: 1.1, scale: 1.2, orbit: 0.6 },
      { creator: createStarAniseMesh, x: 2.8, y: 1.4, z: 0.8, scale: 0.95, orbit: -0.5 },
      { creator: createCardamomMesh, x: -2.7, y: -0.6, z: 1.5, scale: 1.25, orbit: 0.7 },
      { creator: createCardamomMesh, x: 2.9, y: -1.2, z: 1.2, scale: 1.1, orbit: -0.8 },
      { creator: createCardamomMesh, x: 0.3, y: 2.3, z: 1.0, scale: 1.0, orbit: 0.4 },
      { creator: createCinnamonMesh, x: -1.9, y: 2.1, z: -0.4, scale: 1.1, orbit: -0.6 },
      { creator: createCinnamonMesh, x: 2.6, y: -0.2, z: 1.4, scale: 1.0, orbit: 0.5 },
      { creator: createSaffronThreadMesh, x: -1.2, y: -1.6, z: 1.8, scale: 1.4, orbit: 0.9 },
      { creator: createSaffronThreadMesh, x: 1.8, y: 2.2, z: 1.3, scale: 1.3, orbit: -0.7 }
    ];

    spiceConfigs.forEach((cfg, idx) => {
      const obj = cfg.creator();
      obj.position.set(cfg.x, cfg.y, cfg.z);
      obj.scale.setScalar(cfg.scale);
      spicesGroup.add(obj);

      floatingSpices.push({
        group: obj,
        baseX: cfg.x,
        baseY: cfg.y,
        baseZ: cfg.z,
        orbitSpeed: cfg.orbit,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.025,
          y: (Math.random() - 0.5) * 0.025,
          z: (Math.random() - 0.5) * 0.025
        },
        phase: idx * 0.8
      });
    });

    // 7. Rising Scent & Steam Particles (Culinary warmth)
    const steamParticleCount = 28;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);

    for (let i = 0; i < steamParticleCount; i++) {
      steamPositions[i * 3] = (Math.random() - 0.5) * 2.2;
      steamPositions[i * 3 + 1] = Math.random() * 2.5;
      steamPositions[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));
    const steamMat = new THREE.PointsMaterial({
      color: 0xFFE0B2,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const steamPoints = new THREE.Points(steamGeo, steamMat);
    steamPoints.position.set(0.6, 0.2, 0);
    masterFeastGroup.add(steamPoints);

    // 8. Studio 3-Point PBR Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xFFF9EE, 0.85);
    scene.add(ambientLight);

    // Warm Saffron Key Light with crisp soft shadows
    const keyLight = new THREE.DirectionalLight(0xFFB300, 2.4);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Deep Burgundy & Rose Warm Fill Light
    const fillLight = new THREE.DirectionalLight(0x751424, 1.4);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Rim highlight light for brass rim reflections
    const rimLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Dynamic mouse-following soft accent light
    const pointerLight = new THREE.PointLight(0xF36C21, 1.8, 10);
    pointerLight.position.set(0, 0, 4);
    scene.add(pointerLight);

    // 9. Mouse & Drag Interaction State
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragDeltaX = 0;
    let dragDeltaY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStartX = clientX;
      dragStartY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const dx = (clientX - dragStartX) * 0.006;
        const dy = (clientY - dragStartY) * 0.006;
        dragDeltaX += dx;
        dragDeltaY += dy;
        dragStartX = clientX;
        dragStartY = clientY;
      }

      const rect = currentMount.getBoundingClientRect();
      targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handlePointerDown);
    dom.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchend', handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // 10. Animation Loop with Spring Damping
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const time = clock.getElapsedTime();

      // Target camera and platter rotations based on preset
      let targetRotX = 0.52;
      let targetRotY = -0.2;
      let targetCamY = 1.8;
      let targetCamZ = 6.8;

      if (viewPresetRef.current === 'curries') {
        targetRotX = 0.75;
        targetRotY = 0.4;
        targetCamY = 2.2;
        targetCamZ = 5.8;
      } else if (viewPresetRef.current === 'chaat') {
        targetRotX = 0.65;
        targetRotY = -0.6;
        targetCamY = 1.5;
        targetCamZ = 5.9;
      } else if (viewPresetRef.current === 'spices') {
        targetRotX = 0.35;
        targetRotY = 0.1;
        targetCamY = 1.2;
        targetCamZ = 7.4;
      }

      // Smooth damping camera transitions
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 3, delta);

      // Auto Orbit or Interactive Drag
      if (autoRotateRef.current) {
        thaliGroup.rotation.y += 0.008;
      } else {
        thaliGroup.rotation.y = THREE.MathUtils.damp(thaliGroup.rotation.y, targetRotY, 3, delta);
      }

      // Add drag deltas and mouse parallax smoothly
      thaliGroup.rotation.y += dragDeltaX;
      thaliGroup.rotation.x = THREE.MathUtils.damp(
        thaliGroup.rotation.x,
        targetRotX + (dragDeltaY - targetY * 0.25),
        4,
        delta
      );
      dragDeltaX *= 0.92;
      dragDeltaY *= 0.92;

      // Pointer light track
      pointerLight.position.x = THREE.MathUtils.damp(pointerLight.position.x, targetX * 3, 4, delta);
      pointerLight.position.y = THREE.MathUtils.damp(pointerLight.position.y, targetY * 2 + 1, 4, delta);

      // Floating Spices Animation & Explosion Spread
      const explodeFactor = explodedRef.current ? 1.8 : 1.0;

      floatingSpices.forEach((spice) => {
        spice.group.rotation.x += spice.rotSpeed.x;
        spice.group.rotation.y += spice.rotSpeed.y;
        spice.group.rotation.z += spice.rotSpeed.z;

        const bob = Math.sin(time * 1.5 + spice.phase) * 0.18;
        const orbitAngle = time * spice.orbitSpeed * 0.4 + spice.phase;

        const targetPosX = (spice.baseX + Math.cos(orbitAngle) * 0.2) * explodeFactor;
        const targetPosY = (spice.baseY + bob) * explodeFactor;
        const targetPosZ = (spice.baseZ + Math.sin(orbitAngle) * 0.2) * explodeFactor;

        spice.group.position.x = THREE.MathUtils.damp(spice.group.position.x, targetPosX, 3.5, delta);
        spice.group.position.y = THREE.MathUtils.damp(spice.group.position.y, targetPosY, 3.5, delta);
        spice.group.position.z = THREE.MathUtils.damp(spice.group.position.z, targetPosZ, 3.5, delta);
      });

      // Gently drift steam particles upwards
      const posAttr = steamGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      for (let i = 0; i < steamParticleCount; i++) {
        posArray[i * 3 + 1] += 0.015;
        if (posArray[i * 3 + 1] > 2.8) {
          posArray[i * 3 + 1] = 0.4;
          posArray[i * 3] = (Math.random() - 0.5) * 2.0;
          posArray[i * 3 + 2] = (Math.random() - 0.5) * 2.0;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources properly
    return () => {
      cancelAnimationFrame(animFrameId);
      dom.removeEventListener('mousedown', handlePointerDown);
      dom.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      thaliGeo.dispose();
      brassMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      steamGeo.dispose();
      steamMat.dispose();
      naanGeo.dispose();
      naanMat.dispose();
      samosaGeo.dispose();
      samosaMat.dispose();
    };
  }, [isSoftwareGl]);

  // Entrance animations via GSAP
  useEffect(() => {
    if (prefersReducedMotion() || !heroSectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: EASE.editorial } });

      tl.from('.hero-badge-pill', {
        y: -20,
        opacity: 0,
        duration: 0.7,
        delay: 0.1
      })
      .from('.hero-word', {
        yPercent: 120,
        opacity: 0,
        duration: 0.85,
        stagger: 0.06,
        ease: EASE.editorial
      }, '-=0.4')
      .from('.hero-copy', {
        y: 20,
        opacity: 0,
        duration: 0.75,
        ease: EASE.luxury
      }, '-=0.45')
      .from('.hero-trust-item', {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: EASE.smooth
      }, '-=0.4')
      .from('.hero-cta-btn', {
        y: 22,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: EASE.snappy
      }, '-=0.35')
      .from('.hero-contact-banner', {
        opacity: 0,
        y: 10,
        duration: 0.5
      }, '-=0.3')
      .from('.hero-3d-dock', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: EASE.snappy
      }, '-=0.2');

      // Scroll parallax for background ambient glows
      gsap.to('.hero-parallax-bg', {
        yPercent: 35,
        ease: 'none',
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroSectionRef}
      id="hero" 
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FFF9EE] to-[#FDFBF7] pt-28 sm:pt-32 lg:pt-34 pb-16 lg:pb-20"
    >
      {/* Background Decorative Ambient Glows */}
      <div 
        className="hero-parallax-bg absolute top-1/4 -left-32 w-96 h-96 bg-[#F36C21]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="hero-parallax-bg absolute bottom-10 right-0 w-[32rem] h-[32rem] bg-[#FFB300]/15 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="hero-parallax-bg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] bg-[#4A0E17]/5 rounded-full blur-[130px] pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clear High-Contrast Headline & Direct Actions */}
          <div className="lg:col-span-7 text-left space-y-6 sm:space-y-7">
            
            {/* Location & Authenticity Pill */}
            <div className="hero-badge-pill inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#F36C21]/10 border border-[#F36C21]/25 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#F36C21]" />
              <MapPin className="w-4 h-4 text-[#F36C21]" />
              <span className="text-xs sm:text-sm font-bold tracking-wide text-[#4A0E17]">
                Authentic Event Catering in Ganaur & Sonipat, Haryana
              </span>
            </div>

            {/* Main Headline with Masked Word Reveals */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#1F2421] tracking-tight leading-[1.12]">
              <span className="word-mask-wrap mr-2.5 sm:mr-3.5"><span className="word-mask-inner hero-word">Good</span></span>
              <span className="word-mask-wrap mr-2.5 sm:mr-3.5"><span className="word-mask-inner hero-word">Food.</span></span>{' '}
              <span className="word-mask-wrap mr-2.5 sm:mr-3.5"><span className="word-mask-inner hero-word text-gradient-saffron">Great</span></span>
              <span className="word-mask-wrap"><span className="word-mask-inner hero-word text-gradient-saffron">Gatherings.</span></span>{' '}
              <br className="hidden sm:inline" />
              <span className="word-mask-wrap mr-2.5 sm:mr-3.5"><span className="word-mask-inner hero-word">Unforgettable</span></span>
              <span className="word-mask-wrap"><span className="word-mask-inner hero-word">Celebrations.</span></span>
            </h1>

            {/* Supporting Copy */}
            <p className="hero-copy text-lg sm:text-xl text-[#565C58] max-w-2xl font-normal leading-relaxed">
              Making every occasion more special with food made for sharing. From royal wedding buffets to lively street chaat counters, we bring authentic flavours, hygienic preparations, and warm hospitality to your celebrations.
            </p>

            {/* Trust Highlights Strip with 3D Tactile Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 pb-1">
              <div className="hero-trust-item flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs text-xs sm:text-sm font-semibold text-[#1F2421]">
                <div className="w-6 h-6 rounded-lg bg-[#4E9F3D]/15 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#4E9F3D]" />
                </div>
                <span>100% Pure Veg Menus</span>
              </div>
              <div className="hero-trust-item flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs text-xs sm:text-sm font-semibold text-[#1F2421]">
                <div className="w-6 h-6 rounded-lg bg-[#F36C21]/15 flex items-center justify-center shrink-0">
                  <UtensilsCrossed className="w-4 h-4 text-[#F36C21]" />
                </div>
                <span>Live Tawa & Tandoor</span>
              </div>
              <div className="hero-trust-item flex items-center gap-2.5 p-2 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs text-xs sm:text-sm font-semibold text-[#1F2421] col-span-2 sm:col-span-1">
                <div className="w-6 h-6 rounded-lg bg-[#FFB300]/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#D4530E]" />
                </div>
                <span>Custom Quotes in 1 Tap</span>
              </div>
            </div>

            {/* CTAs Strip */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#enquire"
                className="hero-cta-btn btn-3d-cta sheen-effect inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-extrabold text-sm sm:text-base focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C21]/40 cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5 drop-shadow-xs" />
                <span>Plan Your Event</span>
              </a>

              <a
                href="#menu"
                className="hero-cta-btn btn-3d-phone inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F36C21]/20 cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#F36C21]" />
                <span>Explore Dishes</span>
              </a>

              {/* Direct WhatsApp Action */}
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappDefaultMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-btn btn-3d-whatsapp inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                aria-label="Direct WhatsApp Inquiry"
              >
                <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                <span>WhatsApp Quote</span>
              </a>
            </div>

            {/* Direct Phone Assistance Banner */}
            <div className="hero-contact-banner pt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#565C58]">
              <PhoneCall className="w-4 h-4 text-[#F36C21] shrink-0" />
              <span>Direct Consultation:</span>
              <a 
                href={`tel:${siteConfig.contact.phoneNumber}`}
                className="font-bold text-[#4A0E17] hover:text-[#F36C21] underline decoration-[#F36C21]/50 underline-offset-2 transition-colors"
              >
                {siteConfig.contact.displayPhone}
              </a>
              <span className="text-stone-300">•</span>
              <a 
                href={`tel:${siteConfig.contact.secondaryPhone}`}
                className="font-bold text-[#4A0E17] hover:text-[#F36C21] underline decoration-[#F36C21]/50 underline-offset-2 transition-colors"
              >
                {siteConfig.contact.displaySecondaryPhone}
              </a>
            </div>

          </div>

          {/* Right Column: 3D Interactive Three.js Culinary Feast Viewport */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[600px]">
            
            {/* Dedicated Three.js WebGL Mount Container */}
            <div 
              ref={mountRef} 
              className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing z-10 rounded-3xl"
              title="Drag with mouse or touch to rotate 3D royal feast platter"
            />

            {/* Top Interactive Mode Hint */}
            <div className="absolute top-2 inset-x-0 z-20 flex justify-between items-center px-4 pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#4A0E17] border border-[#F36C21]/20 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F36C21]" />
                <span>Real-Time 3D Feast • Drag to Inspect</span>
              </div>

              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-mono backdrop-blur-md">
                <Eye className="w-3 h-3 text-[#FFB300]" />
                <span>PBR Shaders</span>
              </div>
            </div>

            {/* Collapsible Unified Bottom Control Dock (Adheres to Three.js Ergonomics) */}
            <div className="hero-3d-dock absolute bottom-2 z-30 flex flex-col items-center w-full max-w-[94%] pointer-events-auto">
              
              {/* Collapse / Expand Toggle Button */}
              <button
                type="button"
                onClick={() => setIsHudCollapsed(!isHudCollapsed)}
                className="mb-1.5 flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 hover:bg-white text-[10px] font-bold uppercase tracking-wider text-[#565C58] border border-black/5 shadow-xs transition-all"
                aria-label={isHudCollapsed ? 'Expand 3D Controls' : 'Hide 3D Controls'}
              >
                {isHudCollapsed ? (
                  <>
                    <ChevronUp className="w-3 h-3 text-[#F36C21]" />
                    <span>3D Controls</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 text-[#F36C21]" />
                    <span>Hide Controls</span>
                  </>
                )}
              </button>

              {/* Dock Body */}
              {!isHudCollapsed && (
                <div className="w-full bg-white/95 backdrop-blur-xl border border-white/80 rounded-2xl p-2 sm:p-2.5 shadow-xl flex flex-wrap items-center justify-between gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  
                  {/* Preset Views */}
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                    <button
                      type="button"
                      onClick={() => setActivePreset('thali')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        activePreset === 'thali'
                          ? 'bg-[#4A0E17] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      👑 Royal Thali
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePreset('curries')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        activePreset === 'curries'
                          ? 'bg-[#4A0E17] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      🍲 Handi Curries
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePreset('chaat')}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                        activePreset === 'chaat'
                          ? 'bg-[#4A0E17] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      🥟 Samosas
                    </button>
                  </div>

                  {/* Actions: Orbit & Explode Spices */}
                  <div className="flex items-center gap-1.5 ml-auto">
                    <button
                      type="button"
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-colors ${
                        isAutoRotating
                          ? 'bg-[#F36C21]/15 text-[#F36C21] border border-[#F36C21]/30'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                      title="Toggle automatic turntable rotation"
                    >
                      <RotateCw className={`w-3 h-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
                      <span>{isAutoRotating ? 'Orbit On' : 'Orbit Off'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsExploded(!isExploded)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-bold transition-colors ${
                        isExploded
                          ? 'bg-[#4E9F3D] text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                      title="Deconstruct spices in 3D orbit"
                    >
                      <Layers className="w-3 h-3" />
                      <span>{isExploded ? 'Spices Exploded' : 'Spices Orbit'}</span>
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
