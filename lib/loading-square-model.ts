import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/** A fully volumetric interpretation of praca-central-circular-v01.png. */
export function createLoadingSquare() {
  const root = new THREE.Group();
  const bands = new THREE.DataTexture(new Uint8Array([88, 150, 205, 255]), 4, 1, THREE.RedFormat);
  bands.minFilter = bands.magFilter = THREE.NearestFilter;
  bands.needsUpdate = true;
  const materials = new Map<string, THREE.MeshToonMaterial>();
  const mat = (color: string) => {
    if (!materials.has(color)) materials.set(color, new THREE.MeshToonMaterial({ color, gradientMap: bands }));
    return materials.get(color)!;
  };
  const cream = '#f3dbad', red = '#f36943', blue = '#006aa1', green = '#38752b';
  // Back-face hulls give real geometry an ink contour from every viewing angle.
  const ink = new THREE.MeshBasicMaterial({ color: '#28251c', side: THREE.BackSide });
  ink.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ntransformed += normal * 0.012;');
  };
  ink.customProgramCacheKey = () => 'square-ink-0012';
  function mesh(g: THREE.BufferGeometry, color: string, x: number, y: number, z: number, parent = root) {
    const m = new THREE.Mesh(g, mat(color));
    g.computeBoundingSphere();
    if ((g.boundingSphere?.radius ?? 0) > .075) {
      const outline = new THREE.Mesh(g, ink); outline.castShadow = false; m.add(outline);
    }
    m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
  }
  function cylinder(r: number, h: number, color: string, x: number, y: number, z: number, parent = root, top = r, segments = 48) {
    return mesh(new THREE.CylinderGeometry(top, r, h, segments), color, x, y, z, parent);
  }
  function box(w: number, h: number, d: number, color: string, x: number, y: number, z: number, parent = root) {
    return mesh(new THREE.BoxGeometry(w, h, d), color, x, y, z, parent);
  }
  function ball(r: number, color: string, x: number, y: number, z: number, parent = root) {
    return mesh(new THREE.SphereGeometry(r, 20, 14), color, x, y, z, parent);
  }
  function ring(radius: number, tube: number, color: string, x: number, y: number, z: number, parent = root) {
    const m = mesh(new THREE.TorusGeometry(radius, tube, 8, 64), color, x, y, z, parent);
    m.rotation.x = Math.PI / 2; return m;
  }
  function rod(a: THREE.Vector3, b: THREE.Vector3, radius: number, color: string, parent = root) {
    const m = cylinder(radius, a.distanceTo(b), color, 0, 0, 0, parent);
    m.position.copy(a).add(b).multiplyScalar(.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  }
  function turned(profile: [number, number][], color: string, x: number, y: number, z: number, parent = root) {
    return mesh(new THREE.LatheGeometry(profile.map(([r, h]) => new THREE.Vector2(r, h)), 48), color, x, y, z, parent);
  }

  // Raised circular island, with concentric paving and four terracotta paths.
  cylinder(3.35, .18, '#bd986c', 0, -.06, 0);
  cylinder(3.38, .07, cream, 0, .065, 0);
  const paving = document.createElement('canvas'); paving.width = paving.height = 1024;
  const ctx = paving.getContext('2d')!;
  ctx.fillStyle = '#e9d7b7'; ctx.fillRect(0, 0, 1024, 1024);
  ctx.translate(512, 512); ctx.strokeStyle = '#baa486'; ctx.lineWidth = 2.2;
  for (let row = 0; row < 18; row++) {
    const inner = row * 30, outer = inner + 30;
    ctx.beginPath(); ctx.arc(0, 0, outer, 0, Math.PI * 2); ctx.stroke();
    const count = Math.max(8, row * 8);
    for (let i = 0; i < count; i++) {
      const a = (i + (row % 2) * .5) / count * Math.PI * 2;
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner);
      ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer); ctx.stroke();
    }
  }
  ctx.strokeStyle = '#d98f76'; ctx.lineWidth = 16;
  for (const r of [220, 403]) { ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke(); }
  const texture = new THREE.CanvasTexture(paving); texture.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.CircleGeometry(3.32, 96), new THREE.MeshToonMaterial({ map: texture, gradientMap: bands }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = .106; floor.receiveShadow = true; root.add(floor);
  for (let i = 0; i < 4; i++) {
    const path = new THREE.Group(); path.rotation.y = i * Math.PI / 2; root.add(path);
    for (let row = 0; row < 6; row++) for (let col = 0; col < 3; col++) {
      box(.18, .025, .21, (row + col) % 2 ? '#eaa38a' : '#dc947b', (col - 1) * .19, .12, 2.06 + row * .22, path);
    }
    for (const x of [-.34, .34]) box(.075, .045, 1.44, cream, x, .13, 2.62, path);
  }

  // Fountain and paving share the same center, including jets and flower border.
  cylinder(1.08, .14, cream, 0, .18, 0);
  cylinder(.99, .08, green, 0, .27, 0);
  cylinder(.81, .19, '#c4aa78', 0, .31, 0);
  cylinder(.74, .025, '#26b5e1', 0, .414, 0);
  ring(.78, .055, cream, 0, .42, 0);
  cylinder(.19, .12, cream, 0, .49, 0);
  turned([[.2, 0], [.2, .045], [.13, .09], [.085, .17], [.1, .25], [.19, .34], [.22, .4], [.4, .44], [.46, .5], [.48, .56], [.43, .56], [.38, .51], [.08, .48], [0, .48]], cream, 0, .51, 0);
  cylinder(.41, .025, '#26b5e1', 0, 1.07, 0);
  ring(.46, .035, cream, 0, 1.075, 0);
  turned([[.14, 0], [.15, .04], [.085, .1], [.075, .17], [.12, .23], [.24, .29], [.29, .35], [.3, .4], [.25, .4], [.2, .35], [0, .32]], cream, 0, 1.07, 0);
  cylinder(.26, .02, '#26b5e1', 0, 1.49, 0);
  const waterMaterial = new THREE.MeshBasicMaterial({ color: '#a9efff' });
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4;
    const points = [new THREE.Vector3(.28 * Math.cos(a), 1.46, .28 * Math.sin(a)), new THREE.Vector3(.52 * Math.cos(a), 1.35, .52 * Math.sin(a)), new THREE.Vector3(.65 * Math.cos(a), .45, .65 * Math.sin(a))];
    const jet = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 16, .012, 5, false), waterMaterial); root.add(jet);
    ring(.06, .012, '#a9efff', points[2].x, .44, points[2].z);
  }
  ball(.055, '#85e4ff', 0, 1.67, 0); cylinder(.025, .18, '#85e4ff', 0, 1.56, 0);

  function flowers(radius: number, x: number, z: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      const a = i / count * Math.PI * 2;
      const fx = x + radius * Math.cos(a), fz = z + radius * Math.sin(a);
      const color = ['#ffd74a', '#f99c76', '#f2ca3e'][i % 3];
      for (let p = 0; p < 4; p++) ball(.027, color, fx + Math.cos(p * Math.PI / 2) * .03, y, fz + Math.sin(p * Math.PI / 2) * .03);
      ball(.017, '#a06e27', fx, y + .015, fz);
    }
  }
  flowers(.94, 0, 0, .33, 32);
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + i * Math.PI / 2;
    const x = Math.cos(a), z = Math.sin(a);
    box(.16, .25, .16, cream, x, .31, z);
    box(.2, .055, .2, '#ffe8c1', x, .46, z);
  }
  // Small, uneven highlights suggest illustrated ripples rather than a flat blue disc.
  for (let i = 0; i < 19; i++) {
    const a = i * 2.399, r = .28 + (i % 5) * .083;
    const ripple = mesh(new THREE.TorusGeometry(.03 + (i % 3) * .014, .008, 4, 12, Math.PI * 1.3), '#78def7', Math.cos(a) * r, .435, Math.sin(a) * r);
    ripple.rotation.set(Math.PI / 2, 0, a);
  }

  // Octagonal bandstand with open sides, balustrades and segmented roof.
  const gazebo = new THREE.Group(); gazebo.position.set(0, 0, -2.3); root.add(gazebo);
  cylinder(.89, .17, '#c9b087', 0, .2, 0, gazebo, .89, 8);
  cylinder(.85, .07, cream, 0, .32, 0, gazebo, .85, 8);
  for (let i = 0; i < 3; i++) box(.62, .065, .21, cream, 0, .14 + i * .065, 1.02 - i * .17, gazebo);
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4 + Math.PI / 8, x = Math.cos(a) * .72, z = Math.sin(a) * .72;
    cylinder(.065, 1.24, cream, x, .97, z, gazebo);
    cylinder(.105, .13, red, x, .48, z, gazebo, .105, 8);
    cylinder(.083, .055, cream, x, .59, z, gazebo, .083, 8);
    cylinder(.08, .12, red, x, 1.46, z, gazebo, .08, 8);
    cylinder(.092, .08, cream, x, 1.54, z, gazebo, .092, 8);
    const b = a + Math.PI / 4;
    if (i !== 1) {
      for (const height of [.51, .82]) rod(new THREE.Vector3(x, height, z), new THREE.Vector3(Math.cos(b) * .72, height, Math.sin(b) * .72), .025, blue, gazebo);
      for (let j = 1; j <= 4; j++) {
        const t = j / 5, bx = x * (1 - t) + Math.cos(b) * .72 * t, bz = z * (1 - t) + Math.sin(b) * .72 * t;
        cylinder(.014, .3, blue, bx, .66, bz, gazebo); ball(.032, cream, bx, .67, bz, gazebo);
      }
    }
  }
  cylinder(.94, .09, cream, 0, 1.62, 0, gazebo, .94, 8);
  cylinder(.98, .055, '#f9e4bb', 0, 1.68, 0, gazebo, .98, 8).rotation.y = Math.PI / 8;
  const roof = cylinder(1, .65, red, 0, 1.97, 0, gazebo, .085, 8); roof.rotation.y = Math.PI / 8;
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4 + Math.PI / 8;
    rod(new THREE.Vector3(Math.sin(a), 1.655, Math.cos(a)), new THREE.Vector3(.085 * Math.sin(a), 2.295, .085 * Math.cos(a)), .018, '#a7482e', gazebo);
  }
  turned([[.15, 0], [.16, .04], [.13, .08], [.085, .1], [.065, .17]], cream, 0, 2.29, 0, gazebo);
  ball(.09, '#f2cb72', 0, 2.49, 0, gazebo);

  // Four planted trees: branched trunks and overlapping rounded leaf clusters.
  for (const [x, z] of [[-2.08, -1.12], [2.08, -1.12], [-2.08, 1.12], [2.08, 1.12]]) {
    cylinder(.5, .19, red, x, .23, z); ring(.48, .035, cream, x, .33, z);
    cylinder(.43, .025, green, x, .335, z); flowers(.35, x, z, .385, 12);
    turned([[.15, 0], [.12, .1], [.08, .35], [.09, .62], [.065, .9]], '#ba6e2e', x, .34, z);
    for (let j = 0; j < 5; j++) {
      const a = j * 2.4;
      rod(new THREE.Vector3(x, .87, z), new THREE.Vector3(x + Math.cos(a) * .27, 1.45, z + Math.sin(a) * .27), .035, '#9d5728');
    }
    // Broad scalloped crowns, with highlights on top and deep teal undersides.
    for (let j = 0; j < 7; j++) {
      const a = j * 2.399, r = j === 6 ? .06 : .36;
      const crown = new THREE.SphereGeometry(.39 + (j % 3) * .035, 32, 24);
      const positions = crown.attributes.position;
      for (let v = 0; v < positions.count; v++) {
        const p = new THREE.Vector3().fromBufferAttribute(positions, v);
        const n = p.clone().normalize();
        const scallop = 1 + .065 * Math.sin(n.x * 14 + j) * Math.sin(n.y * 13) * Math.cos(n.z * 14);
        p.multiplyScalar(scallop); positions.setXYZ(v, p.x, p.y * .78, p.z);
      }
      crown.computeVertexNormals();
      mesh(crown, j > 3 ? '#a3c844' : '#298044', x + Math.cos(a) * r, 1.5 + (j > 3 ? .3 : 0), z + Math.sin(a) * r);
    }
  }

  // Mirrored seating bays between the trees and paths; backs face the perimeter.
  for (const [x, z] of [[-1.38, -2.12], [1.38, -2.12], [-1.38, 2.12], [1.38, 2.12]]) {
    const a = Math.atan2(x, z);
    const bench = new THREE.Group(); bench.position.set(x, .12, z); bench.rotation.y = a; root.add(bench);
    for (const x of [-.33, .33]) {
      box(.045, .35, .36, blue, x, .19, 0, bench);
      box(.045, .55, .045, blue, x, .37, .16, bench);
      box(.045, .045, .35, blue, x, .51, 0, bench);
    }
    for (let j = 0; j < 3; j++) {
      box(.87, .055, .09, '#c88431', 0, .36, -.1 + j * .1, bench);
      box(.87, .08, .045, '#d9953a', 0, .48 + j * .09, .18, bench);
    }
    const lx = Math.sign(x) * 1.37, lz = Math.sign(z) * .8;
    cylinder(.12, .09, cream, lx, .17, lz); cylinder(.07, .12, blue, lx, .26, lz);
    cylinder(.025, .95, blue, lx, .78, lz); cylinder(.12, .06, blue, lx, 1.27, lz);
    cylinder(.09, .21, '#ffe5a0', lx, 1.4, lz, root, .12, 6);
    cylinder(.15, .13, blue, lx, 1.57, lz, root, .015, 6); ball(.035, '#e6b44d', lx, 1.66, lz);
    for (let j = 0; j < 4; j++) cylinder(.01, .22, blue, lx + Math.cos(j * Math.PI / 2) * .095, 1.41, lz + Math.sin(j * Math.PI / 2) * .095);
  }
  function curvedBed(inner: number, outer: number, start: number, end: number, height: number, color: string) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outer, start, end, false);
    shape.absarc(0, 0, inner, end, start, true); shape.closePath();
    const geometry = new THREE.ExtrudeGeometry(shape, { depth: height, bevelEnabled: false, curveSegments: 32 });
    geometry.rotateX(-Math.PI / 2);
    return mesh(geometry, color, 0, .12, 0);
  }
  for (let i = 0; i < 8; i++) {
    const a = i * Math.PI / 4 + .16, end = (i + 1) * Math.PI / 4 - .16;
    curvedBed(2.99, 3.28, a, end, .16, cream);
    curvedBed(3.04, 3.23, a + .02, end - .02, .18, green);
    for (let j = 0; j < 9; j++) {
      const t = a + .04 + (end - a - .08) * j / 8;
      const x = Math.cos(t) * 3.135, z = -Math.sin(t) * 3.135;
      ball(.075, '#386f29', x, .32, z);
      for (let p = 0; p < 5; p++) ball(.023, j % 2 ? '#ffd43b' : '#f78963', x + Math.cos(p * Math.PI * .4) * .035, .387, z + Math.sin(p * Math.PI * .4) * .035);
    }
  }
  for (const [x, z] of [[-2.65, -.6], [2.65, -.6], [-2.65, .6], [2.65, .6]]) {
    cylinder(.11, .28, blue, x, .27, z, root, .12, 16);
    cylinder(.085, .015, '#143544', x, .415, z);
    ring(.11, .02, '#138fbd', x, .425, z);
    ring(.105, .018, '#143544', x, .14, z);
    for (let j = 0; j < 10; j++) {
      const a = j * Math.PI / 5;
      cylinder(.007, .22, '#133d59', x + Math.cos(a) * .113, .27, z + Math.sin(a) * .113);
    }
  }
  // Static details share draw calls, keeping the loading preview inexpensive.
  root.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  const originals = new Set<THREE.BufferGeometry>();
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    const geometry = (object.geometry.index ? object.geometry.toNonIndexed() : object.geometry.clone()).applyMatrix4(object.matrixWorld);
    const material = object.material as THREE.Material;
    if (!batches.has(material)) batches.set(material, []);
    batches.get(material)!.push(geometry);
    originals.add(object.geometry);
  });
  const combined = new THREE.Group();
  for (const [material, geometries] of batches) {
    const geometry = mergeGeometries(geometries);
    if (geometry) {
      const part = new THREE.Mesh(geometry, material);
      part.castShadow = part.receiveShadow = material !== ink;
      combined.add(part);
    }
    geometries.forEach(g => g.dispose());
  }
  originals.forEach(g => g.dispose());
  return combined;
}
