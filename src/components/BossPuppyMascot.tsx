import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import * as THREE from 'three';
import { 
  Sparkles as SparklesIcon, 
  Volume2, 
  VolumeX, 
  Glasses, 
  Palette, 
  Smile, 
  Heart, 
  Briefcase, 
  RefreshCw,
  MessageSquare
} from 'lucide-react';

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBark() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.16);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.19);
  }

  playSqueak() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(1100, now + 0.15);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.17);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.01, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.15, now + idx * 0.06 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.26);
    });
  }
}

const sfx = new SoundEffects();

const BOSS_QUOTES = [
  "Treats are up 34% this quarter! Excellent work, team.",
  "Paws up! Emergency belly rub stand-up in 3 minutes.",
  "I reviewed your spreadsheet... Needs more squeaky toys.",
  "As CEO (Chief Entertainment Officer), I approve this nap.",
  "Let's touch base after my 2:00 PM sunbeam snooze.",
  "Work hard, bark hard. That's our corporate motto!",
  "Drop the bone and schedule a 1-on-1 with me.",
  "You're doing great! Here is your quarterly paw-motion!"
];

const SUIT_PALETTES = [
  { name: 'Classic Navy', hex: '#24456e', lapel: '#1b3453', tie: '#3b78c4' },
  { name: 'Executive Charcoal', hex: '#2b2d35', lapel: '#1e2025', tie: '#d94b68' },
  { name: 'Blush Velvet', hex: '#c4627d', lapel: '#9f4961', tie: '#ffd1dc' },
  { name: 'Emerald Boardroom', hex: '#1e5445', lapel: '#153a30', tie: '#e6c875' },
  { name: 'Pastel Lavender', hex: '#6d6199', lapel: '#554a7c', tie: '#fed0ee' },
];

export function BossPuppyMascot({ headerAction }: { headerAction?: ReactNode }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [glassesVisible, setGlassesVisible] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bossMode, setBossMode] = useState(false);
  const [heartParticles, setHeartParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Internal mutable refs to sync with Three.js render loop without reinitializing
  const stateRef = useRef({
    glassesVisible: true,
    suitColor: SUIT_PALETTES[0],
    bounceEnergy: 0,
    blinkVal: 0,
    isHovered: false,
    mousePos: { x: 0, y: 0 }
  });

  useEffect(() => {
    stateRef.current.glassesVisible = glassesVisible;
  }, [glassesVisible]);

  useEffect(() => {
    stateRef.current.suitColor = SUIT_PALETTES[colorIndex];
  }, [colorIndex]);

  useEffect(() => {
    sfx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Click reaction handler
  const handlePuppyClick = useCallback(() => {
    sfx.playBark();
    stateRef.current.bounceEnergy = 1.0;
    setQuoteIndex((prev) => (prev + 1) % BOSS_QUOTES.length);

    const newHeart = {
      id: Date.now() + Math.random(),
      x: 46 + (Math.random() * 8 - 4),
      y: 40 + (Math.random() * 6 - 3),
    };
    setHeartParticles((prev) => [...prev.slice(-5), newHeart]);

    setTimeout(() => {
      setHeartParticles((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.65, 4.4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5f8, 0.95);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1.6);
    mainLight.position.set(4, 6, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xdce7ff, 0.8);
    fillLight.position.set(-4, 3, -2);
    scene.add(fillLight);

    const softFrontLight = new THREE.PointLight(0xffe9f2, 0.5, 10);
    softFrontLight.position.set(0, 1.8, 2.5);
    scene.add(softFrontLight);

    const puppyRoot = new THREE.Group();
    puppyRoot.position.set(0, -0.65, 0);
    scene.add(puppyRoot);

    // Soft Fur Material
    const furMat = new THREE.MeshStandardMaterial({
      color: 0xfbf9fd,
      roughness: 0.9,
      metalness: 0.02,
    });

    // Suit materials (mutable colors)
    const suitMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(SUIT_PALETTES[0].hex),
      roughness: 0.45,
      metalness: 0.08,
    });
    const lapelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(SUIT_PALETTES[0].lapel),
      roughness: 0.4,
    });
    const tieMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(SUIT_PALETTES[0].tie),
      roughness: 0.3,
      metalness: 0.15,
    });
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
    });
    const noseMat = new THREE.MeshStandardMaterial({
      color: 0x1b1718,
      roughness: 0.3,
      metalness: 0.15,
    });

    // --- HEAD GROUP ---
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.52, 0.05);
    puppyRoot.add(headGroup);

    // Main Head Skull
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(1.02, 32, 32), furMat);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Fluffy Cheeks
    const leftCheek = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), furMat);
    leftCheek.position.set(-0.62, -0.25, 0.32);
    leftCheek.scale.set(1, 0.9, 0.9);
    headGroup.add(leftCheek);

    const rightCheek = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 24), furMat);
    rightCheek.position.set(0.62, -0.25, 0.32);
    rightCheek.scale.set(1, 0.9, 0.9);
    headGroup.add(rightCheek);

    // Forehead tuft
    const tuft = new THREE.Mesh(new THREE.SphereGeometry(0.42, 20, 20), furMat);
    tuft.position.set(0, 0.85, 0.38);
    tuft.scale.set(0.8, 0.5, 0.6);
    headGroup.add(tuft);

    // Soft Muzzle
    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.36, 24, 24), furMat);
    muzzle.position.set(0, -0.23, 0.76);
    muzzle.scale.set(1.15, 0.8, 0.85);
    headGroup.add(muzzle);

    // Puppy Nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.1, 18, 18), noseMat);
    nose.position.set(0, -0.13, 1.02);
    nose.scale.set(1.25, 0.85, 0.7);
    headGroup.add(nose);

    // Droopy Puppy Ears
    const leftEar = new THREE.Group();
    leftEar.position.set(-0.92, 0.32, 0);
    const leftEarMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.8, 0.5, 16, 16), furMat);
    leftEarMesh.rotation.set(0.1, 0, 0.45);
    leftEarMesh.scale.set(0.45, 1.05, 0.38);
    leftEar.add(leftEarMesh);
    headGroup.add(leftEar);

    const rightEar = new THREE.Group();
    rightEar.position.set(0.92, 0.32, 0);
    const rightEarMesh = new THREE.Mesh(new THREE.CapsuleGeometry(0.8, 0.5, 16, 16), furMat);
    rightEarMesh.rotation.set(0.1, 0, -0.45);
    rightEarMesh.scale.set(0.45, 1.05, 0.38);
    rightEar.add(rightEarMesh);
    headGroup.add(rightEar);

    const createEye = (xPos: number) => {
      const eyeGroup = new THREE.Group();
      eyeGroup.position.set(xPos, 0.06, 0.76);

      // Sclera
      const sclera = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 28, 28),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
      );
      eyeGroup.add(sclera);

      // Iris
      const iris = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 24, 24),
        new THREE.MeshStandardMaterial({ color: 0x2264a8, roughness: 0.2 })
      );
      iris.position.set(0, 0, 0.16);
      eyeGroup.add(iris);

      // Black Pupil
      const pupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 20, 20),
        new THREE.MeshBasicMaterial({ color: 0x08080a })
      );
      pupil.position.set(0, 0, 0.2);
      eyeGroup.add(pupil);

      // Highlights
      const highlight1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      highlight1.position.set(0.045, 0.05, 0.22);
      eyeGroup.add(highlight1);

      const highlight2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      highlight2.position.set(-0.035, -0.04, 0.22);
      eyeGroup.add(highlight2);

      return eyeGroup;
    };

    const leftEye = createEye(-0.46);
    const rightEye = createEye(0.46);
    headGroup.add(leftEye);
    headGroup.add(rightEye);

    // Glasses Frame
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.08, 0.94);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x202226, roughness: 0.25, metalness: 0.4 });
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0xd2e9ff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.1,
      transmission: 0.8
    });

    const leftRim = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 18, 36), frameMat);
    leftRim.position.set(-0.48, 0, 0);
    glassesGroup.add(leftRim);

    const rightRim = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.045, 18, 36), frameMat);
    rightRim.position.set(0.48, 0, 0);
    glassesGroup.add(rightRim);

    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.32, 16), frameMat);
    bridge.position.set(0, 0.1, 0);
    bridge.rotation.z = Math.PI / 2;
    glassesGroup.add(bridge);

    const leftLens = new THREE.Mesh(new THREE.CircleGeometry(0.31, 32), lensMat);
    leftLens.position.set(-0.48, 0, -0.01);
    glassesGroup.add(leftLens);

    const rightLens = new THREE.Mesh(new THREE.CircleGeometry(0.31, 32), lensMat);
    rightLens.position.set(0.48, 0, -0.01);
    glassesGroup.add(rightLens);

    headGroup.add(glassesGroup);

    // Flower Clip builder
    const createFlower = (pos: [number, number, number], rot: [number, number, number]) => {
      const flower = new THREE.Group();
      flower.position.set(...pos);
      flower.rotation.set(...rot);
      flower.scale.set(0.72, 0.72, 0.72);

      const center = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xfed330, roughness: 0.3 })
      );
      flower.add(center);

      const petalMat = new THREE.MeshStandardMaterial({ color: 0xff8fb1, roughness: 0.4 });
      [0, 72, 144, 216, 288].forEach((deg) => {
        const rad = (deg * Math.PI) / 180;
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 16), petalMat);
        petal.position.set(Math.cos(rad) * 0.11, Math.sin(rad) * 0.11, -0.01);
        petal.scale.set(1, 1, 0.6);
        flower.add(petal);
      });
      return flower;
    };

    headGroup.add(createFlower([-0.68, 0.78, 0.62], [0.2, 0.3, 0.4]));
    headGroup.add(createFlower([0.68, 0.78, 0.62], [0.2, -0.3, -0.4]));

    const bodyGroup = new THREE.Group();
    bodyGroup.position.set(0, 0.28, 0);
    puppyRoot.add(bodyGroup);

    // Blazer Torso
    const torso = new THREE.Mesh(new THREE.SphereGeometry(0.96, 32, 32), suitMat);
    torso.position.set(0, 0.2, 0);
    torso.scale.set(1.12, 1.02, 0.9);
    torso.castShadow = true;
    bodyGroup.add(torso);

    // Collar
    const collar = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), shirtMat);
    collar.position.set(0, 0.96, 0.55);
    collar.scale.set(0.56, 0.26, 0.32);
    bodyGroup.add(collar);

    // Tie
    const tieGroup = new THREE.Group();
    tieGroup.position.set(0, 0.72, 0.73);
    tieGroup.rotation.x = -0.08;
    const tieKnot = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), tieMat);
    tieKnot.position.set(0, 0.12, 0);
    tieGroup.add(tieKnot);
    const tieBody = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.44, 16), tieMat);
    tieBody.position.set(0, -0.12, 0);
    tieGroup.add(tieBody);
    bodyGroup.add(tieGroup);

    // Lapels
    const leftLapel = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), lapelMat);
    leftLapel.position.set(-0.26, 0.58, 0.69);
    leftLapel.rotation.set(0.1, -0.2, -0.25);
    leftLapel.scale.set(0.16, 0.52, 0.06);
    bodyGroup.add(leftLapel);

    const rightLapel = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), lapelMat);
    rightLapel.position.set(0.26, 0.58, 0.69);
    rightLapel.rotation.set(0.1, 0.2, 0.25);
    rightLapel.scale.set(0.16, 0.52, 0.06);
    bodyGroup.add(rightLapel);

    // Crossed Sleeves
    const foldedArms = new THREE.Mesh(new THREE.CapsuleGeometry(1, 0.7, 16, 16), suitMat);
    foldedArms.position.set(0, 0.44, 0.82);
    foldedArms.rotation.z = Math.PI / 2;
    foldedArms.scale.set(0.26, 0.8, 0.28);
    bodyGroup.add(foldedArms);

    // White Shirt Cuffs
    const leftCuff = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), shirtMat);
    leftCuff.position.set(-0.42, 0.44, 0.88);
    leftCuff.scale.set(0.08, 0.22, 0.24);
    bodyGroup.add(leftCuff);

    const rightCuff = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), shirtMat);
    rightCuff.position.set(0.42, 0.44, 0.88);
    rightCuff.scale.set(0.08, 0.22, 0.24);
    bodyGroup.add(rightCuff);

    // Tucked Paws
    const leftFrontPaw = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), furMat);
    leftFrontPaw.position.set(-0.48, 0.44, 0.94);
    bodyGroup.add(leftFrontPaw);

    const rightFrontPaw = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), furMat);
    rightFrontPaw.position.set(0.48, 0.44, 0.94);
    bodyGroup.add(rightFrontPaw);

    // Wagging Tail
    const tailGroup = new THREE.Group();
    tailGroup.position.set(-0.6, 0.08, -0.65);
    const tailMesh = new THREE.Mesh(new THREE.CapsuleGeometry(1, 0.9, 16, 16), furMat);
    tailMesh.position.set(0, 0, 0);
    tailMesh.rotation.set(0.4, 0.3, -0.75);
    tailMesh.scale.set(0.25, 0.75, 0.25);
    tailGroup.add(tailMesh);
    bodyGroup.add(tailGroup);

    // Seated Paws
    const leftSeatPaw = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMat);
    leftSeatPaw.position.set(-0.4, -0.4, 0.56);
    leftSeatPaw.scale.set(1.2, 0.72, 1.4);
    bodyGroup.add(leftSeatPaw);

    const rightSeatPaw = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMat);
    rightSeatPaw.position.set(0.4, -0.4, 0.56);
    rightSeatPaw.scale.set(1.2, 0.72, 1.4);
    bodyGroup.add(rightSeatPaw);

    // Ground Contact Shadow Mesh
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x6a2b4b,
      transparent: true,
      opacity: 0.28,
    });
    const shadowMesh = new THREE.Mesh(new THREE.CircleGeometry(1.6, 32), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.02;
    scene.add(shadowMesh);

    const sparkleCount = 40;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePositions = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount * 3; i += 3) {
      sparklePositions[i] = (Math.random() - 0.5) * 8;
      sparklePositions[i + 1] = (Math.random() - 0.5) * 6 + 0.5;
      sparklePositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    sparkleGeo.setAttribute('position', new THREE.BufferAttribute(sparklePositions, 3));
    const sparkleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparkles);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.mousePos = { x, y };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        stateRef.current.mousePos = { x, y };
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Organic blink ticker
    const blinkInterval = setInterval(() => {
      stateRef.current.blinkVal = 1;
      setTimeout(() => {
        stateRef.current.blinkVal = 0;
      }, 140);
    }, 4000);

    let animationFrameId: number;
    const timer = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update();

      const t = timer.getElapsed();
      const { mousePos, blinkVal, glassesVisible: showGlasses, suitColor, isHovered } = stateRef.current;

      // Sync accessories & outfit colors
      glassesGroup.visible = showGlasses;
      suitMat.color.set(suitColor.hex);
      lapelMat.color.set(suitColor.lapel);
      tieMat.color.set(suitColor.tie);

      // Decay excitement bounce energy
      stateRef.current.bounceEnergy = THREE.MathUtils.lerp(stateRef.current.bounceEnergy, 0, 0.08);
      const bounce = stateRef.current.bounceEnergy;

      // Head cursor tracking & tilt
      const targetRotY = mousePos.x * 0.42;
      const targetRotX = -mousePos.y * 0.28;
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetRotY, 0.1);
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetRotX, 0.1);
      headGroup.rotation.z = Math.sin(t * 1.5) * 0.03 + mousePos.x * 0.05;

      // Organic blinking
      const eyeScaleY = blinkVal === 1 ? 0.08 : 1.0;
      leftEye.scale.y = eyeScaleY;
      rightEye.scale.y = eyeScaleY;

      // Floppy ear physics
      const earWiggle = Math.sin(t * 3.5) * 0.05 + bounce * Math.sin(t * 22) * 0.25;
      leftEar.rotation.z = 0.45 + earWiggle;
      rightEar.rotation.z = -0.45 - earWiggle;

      // Tail wagging (speeds up when hovered or excited)
      const wagSpeed = (isHovered ? 12 : 5) + bounce * 16;
      tailGroup.rotation.y = Math.sin(t * wagSpeed) * 0.45;
      tailGroup.rotation.z = Math.cos(t * wagSpeed * 0.7) * 0.2;

      // Breathing cycle and jumping bounce
      const breathe = Math.sin(t * 2.2) * 0.02;
      bodyGroup.scale.y = 1 + breathe + bounce * 0.12;
      puppyRoot.position.y = -0.65 + Math.sin(t * 2.2) * 0.03 + bounce * 0.3;

      // Gentle floating sparkles shimmer
      sparkles.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(blinkInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handlePetMascot = () => {
    sfx.playSqueak();
    stateRef.current.bounceEnergy = 1.0;
    setQuoteIndex((prev) => (prev + 1) % BOSS_QUOTES.length);
  };

  const handleSayHi = () => {
    sfx.playBark();
    stateRef.current.bounceEnergy = 1.0;
  };

  const handleBossModeToggle = () => {
    sfx.playChime();
    setBossMode((prev) => !prev);
    stateRef.current.bounceEnergy = 1.0;
  };

  const handleCycleSuit = () => {
    sfx.playSqueak();
    setColorIndex((prev) => (prev + 1) % SUIT_PALETTES.length);
  };

  const currentSuit = SUIT_PALETTES[colorIndex];

  return (
    <div className="relative h-full w-full overflow-hidden select-none font-sans bg-linear-to-b from-[#fcd3e1] via-[#f7b7cb] to-[#f59eb8]">
      {/* Background Decorative Diamond & Watermarks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] bg-white/25 rounded-[70px] rotate-45 blur-[1px] border border-white/40 shadow-inner" />
        <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-white/40 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/4 w-44 h-44 bg-pink-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-white/30 rounded-full blur-xl" />

        {/* Cute Paw Print SVGs */}
        <svg className="absolute top-12 left-12 w-12 h-12 text-white/40 fill-current" viewBox="0 0 24 24">
          <circle cx="12" cy="15" r="4" />
          <circle cx="7" cy="9" r="2" />
          <circle cx="11" cy="6" r="2" />
          <circle cx="15" cy="7" r="2" />
          <circle cx="18" cy="11" r="1.8" />
        </svg>
        <svg className="absolute bottom-16 right-16 w-16 h-16 text-white/30 fill-current rotate-12" viewBox="0 0 24 24">
          <circle cx="12" cy="15" r="4" />
          <circle cx="7" cy="9" r="2" />
          <circle cx="11" cy="6" r="2" />
          <circle cx="15" cy="7" r="2" />
          <circle cx="18" cy="11" r="1.8" />
        </svg>
      </div>

      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-pink-600 font-extrabold text-xl">
            🐾
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-gray-800 drop-shadow-sm flex items-center gap-2">
              Boss Puppy Mascot
              {bossMode && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400 text-gray-900 font-bold uppercase tracking-wider shadow-sm animate-pulse">
                  CEO Mode
                </span>
              )}
            </h1>
            <p className="text-xs text-pink-900/70 font-medium">Click on the mascot to interact & hear barks</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {headerAction}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-full bg-white/80 backdrop-blur-md hover:bg-white text-gray-700 shadow-md transition-all active:scale-95 flex items-center gap-2 text-sm font-semibold cursor-pointer"
            title={soundEnabled ? "Mute cute sound effects" : "Enable sound effects"}
          >
            {soundEnabled ? <Volume2 size={18} className="text-pink-600" /> : <VolumeX size={18} className="text-gray-400" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Audio On' : 'Muted'}</span>
          </button>
        </div>
      </header>

      {/* Floating Animated Speech Bubble */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 max-w-sm sm:max-w-md w-11/12 pointer-events-none">
        <div className="relative mx-auto bg-white/95 backdrop-blur-lg px-5 py-3.5 rounded-3xl shadow-xl border border-pink-100 text-center pointer-events-auto">
          <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-gray-800">
            <MessageSquare size={16} className="text-pink-500 shrink-0" />
            <span>"{BOSS_QUOTES[quoteIndex]}"</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/95 rotate-45 border-r border-b border-pink-100" />
        </div>
      </div>

      {/* Floating Heart Reactions */}
      {heartParticles.map((h) => (
        <div
          key={h.id}
          className="absolute z-30 pointer-events-none text-pink-500 animate-ping font-extrabold text-2xl flex items-center gap-1"
          style={{ top: `${h.y}%`, left: `${h.x}%` }}
        >
          <Heart fill="#ec4899" size={28} />
        </div>
      ))}

      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        onClick={handlePuppyClick}
        onMouseEnter={() => { stateRef.current.isHovered = true; }}
        onMouseLeave={() => { stateRef.current.isHovered = false; }}
        className="w-full h-full cursor-pointer flex items-center justify-center"
      />

      {/* Bottom Floating Control Dock */}
      <footer className="absolute bottom-6 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-2 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/60 shadow-2xl pointer-events-auto">
          <button
            onClick={handlePetMascot}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <Smile size={16} />
            <span>Pet Me</span>
          </button>

          <button
            onClick={handleSayHi}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <SparklesIcon size={16} />
            <span>Say Hi (Bark)</span>
          </button>

          <button
            onClick={() => {
              sfx.playSqueak();
              setGlassesVisible(!glassesVisible);
            }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm cursor-pointer ${
              glassesVisible
                ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-500'
            }`}
          >
            <Glasses size={16} />
            <span>{glassesVisible ? 'Glasses On' : 'Glasses Off'}</span>
          </button>

          <button
            onClick={handleCycleSuit}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-sm cursor-pointer"
          >
            <Palette size={16} />
            <span className="hidden sm:inline">Suit:</span>
            <span>{currentSuit.name.split(' ')[0]}</span>
          </button>

          <button
            onClick={handleBossModeToggle}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm transition-transform active:scale-95 shadow-sm cursor-pointer ${
              bossMode
                ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <Briefcase size={16} />
            <span>{bossMode ? 'Boss Mode On' : 'Boss Mode'}</span>
          </button>

          <button
            onClick={() => {
              sfx.playSqueak();
              setQuoteIndex((prev) => (prev + 1) % BOSS_QUOTES.length);
            }}
            className="p-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-transform active:scale-95 shadow-sm cursor-pointer"
            title="Next puppy quote"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}