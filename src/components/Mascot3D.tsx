// 3D Kawaii Mascot Component Snippet
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export interface Mascot3DProps {
  mood?: 'classic' | 'wink' | 'hearts' | 'surprised' | 'sleepy';
  finish?: 'clay' | 'glossy' | 'velvet';
}

export const Mascot3D: React.FC<Mascot3DProps> = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(380, 380);
    const mountEl = mountRef.current;
    mountEl?.appendChild(renderer.domElement);

    // Warm Lights
    scene.add(new THREE.AmbientLight(0xfff6ea, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(5, 7, 6);
    scene.add(dir);

    // Head Sphere
    const headGeom = new THREE.SphereGeometry(2.0, 64, 64);
    const headMat = new THREE.MeshStandardMaterial({ 
      color: 0xFDE47F, 
      roughness: 0.38 
    });
    const headMesh = new THREE.Mesh(headGeom, headMat);
    scene.add(headMesh);

    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      headMesh.rotation.y += 0.008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      renderer.dispose();
      if (mountEl?.contains(renderer.domElement)) {
        mountEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-[380px] h-[380px]" />;
};
