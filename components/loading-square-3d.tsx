'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { createLoadingSquare } from '@/lib/loading-square-model';

export default function LoadingSquare3D() {
  const host = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
    catch { setUnavailable(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x000000, 0);
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-4.5, 4.5, 3.15, -3.15, .1, 40);
    camera.position.set(0, 9, 12); camera.lookAt(0, .55, 0);
    scene.add(new THREE.HemisphereLight('#fff8ee', '#8b9a96', 1.25));
    const sun = new THREE.DirectionalLight('#fff5e8', 1.65);
    sun.position.set(-3, 9, 5); sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5 });
    sun.shadow.normalBias = .04; scene.add(sun);
    const model = createLoadingSquare(); scene.add(model);
    const resize = () => {
      const { width, height } = element.getBoundingClientRect();
      if (!width || !height) return;
      camera.left = -3.15 * width / height; camera.right = 3.15 * width / height;
      camera.updateProjectionMatrix(); renderer.setSize(width, height);
      renderer.render(scene, camera);
    };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let previous = 0;
    const animate = (time: number) => {
      if (previous && !reducedMotion.matches) model.rotation.y += Math.min(time - previous, 100) / 1000 * Math.PI * 2 / 18;
      previous = time;
      renderer.render(scene, camera);
    };
    const sync = () => {
      previous = 0;
      renderer.setAnimationLoop(document.hidden || reducedMotion.matches ? null : animate);
      renderer.render(scene, camera);
    };
    document.addEventListener('visibilitychange', sync); reducedMotion.addEventListener('change', sync); sync();
    return () => {
      renderer.setAnimationLoop(null); observer.disconnect();
      document.removeEventListener('visibilitychange', sync); reducedMotion.removeEventListener('change', sync);
      const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          for (const m of Array.isArray(object.material) ? object.material : [object.material]) materials.add(m);
        }
      });
      geometries.forEach(g => g.dispose());
      const textures = new Set<THREE.Texture>();
      materials.forEach(m => {
        if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshToonMaterial) {
          if (m.map) textures.add(m.map);
        }
        if (m instanceof THREE.MeshToonMaterial && m.gradientMap) textures.add(m.gradientMap);
        m.dispose();
      });
      textures.forEach(t => t.dispose());
      sun.shadow.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} style={{ width: '100%', height: '100%' }} role="img" aria-label="Modelo 3D da pracinha girando 360 graus">
    {unavailable && <p role="status">Não foi possível iniciar o 3D neste navegador.</p>}
  </div>;
}
