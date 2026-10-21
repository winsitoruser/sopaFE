import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const BEE_GLB = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261017_132918_e8364d8f-7df2-4788-a725-dec28ec19af8.glb";
const WING_TEX = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261017_132814_3a56ac14-47d8-4e49-a163-94234dea5639.png";

const DESKTOP = [
  { x: -0.78, y: -0.72, s: 0.16, yaw: 210, pitch: 4, roll: 4 },
  { x: 0.86, y: 0.78, s: 0.22, yaw: 30, pitch: 4, roll: -4 },
  { x: 0.15, y: -0.9, s: 0.13, yaw: 25, pitch: 4, roll: -2 },
  { x: -0.32, y: 0.22, s: 0.55, yaw: 145, pitch: 8, roll: 5 },
  { x: 0.3, y: -0.16, s: 0.58, yaw: 35, pitch: -4, roll: -6 },
  { x: 0.36, y: 0.3, s: 0.52, yaw: 35, pitch: 6, roll: -4 },
  { x: -0.34, y: 0.26, s: 0.55, yaw: 200, pitch: 6, roll: 6 },
  { x: -0.78, y: -0.52, s: 0.32, yaw: 200, pitch: 6, roll: 4 },
  { x: 0.28, y: 0.18, s: 0.6, yaw: 55, pitch: 2, roll: -4 },
  { x: 0.92, y: 0.82, s: 0.14, yaw: 20, pitch: 4, roll: -2 },
  { x: 0.26, y: -0.22, s: 0.62, yaw: 150, pitch: 6, roll: 4 },
  { x: 0.22, y: 0.62, s: 0.42, yaw: 100, pitch: 4, roll: 0 },
];

const MOBILE = [
  { x: 0.9, y: 0.7, s: 0.14, yaw: 190, pitch: 4, roll: 2 },
  { x: 0.78, y: 0.82, s: 0.16, yaw: 125, pitch: 6, roll: 2 },
  { x: 0.86, y: 0.9, s: 0.12, yaw: 140, pitch: 4, roll: 2 },
  { x: 0.12, y: 0.28, s: 0.5, yaw: 40, pitch: -6, roll: -8 },
  { x: 0.08, y: 0.24, s: 0.5, yaw: 160, pitch: 8, roll: 4 },
  { x: 0.1, y: 0.12, s: 0.8, yaw: 125, pitch: 10, roll: 6 },
  { x: 0.15, y: -0.2, s: 0.75, yaw: 40, pitch: -6, roll: -8 },
  { x: 0.82, y: 0.58, s: 0.18, yaw: 150, pitch: 6, roll: 2 },
  { x: 0.12, y: 0.18, s: 0.55, yaw: 70, pitch: 4, roll: 0 },
  { x: 0.72, y: 0.9, s: 0.12, yaw: 140, pitch: 4, roll: 2 },
  { x: 0.18, y: 0.16, s: 0.55, yaw: 150, pitch: 6, roll: 4 },
  { x: 0, y: 0.1, s: 0.7, yaw: 105, pitch: 4, roll: 0 },
];

const canvas = document.querySelector("#bee");
if (!canvas) throw new Error("bee canvas missing");

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
camera.position.set(0, 0, 10);

function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
resize();
addEventListener("resize", resize);

scene.add(new THREE.HemisphereLight(0xf2eeff, 0x7a62c9, 1.3));
const sun = new THREE.DirectionalLight(0xfff1d6, 2.6);
sun.position.set(3, 5, 6);
scene.add(sun);
const rim = new THREE.DirectionalLight(0xc8b8ff, 2.2);
rim.position.set(-5, 2, -4);
scene.add(rim);

const flight = new THREE.Group();
const beeRoot = new THREE.Group();
flight.add(beeRoot);
scene.add(flight);

const flaps = [];
let modelReady = false;

function showPage() {
  document.getElementById("loader")?.classList.add("done");
  document.body.classList.add("loaded");
}
setTimeout(showPage, 2500);

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - ((-2 * t + 2) ** 3) / 2;
}
function lerpAngle(a, b, t) {
  const d = ((b - a + 540) % 360) - 180;
  return a + d * t;
}
function route() {
  return innerWidth < 760 ? MOBILE : DESKTOP;
}
function scrollP() {
  const sections = [...document.querySelectorAll("main > section")];
  if (!sections.length) return 0;
  const y = window.scrollY;
  let i = 0;
  sections.forEach((sec, n) => {
    if (sec.offsetTop <= y + 2) i = n;
  });
  const start = sections[i].offsetTop;
  const end = sections[i + 1] ? sections[i + 1].offsetTop : start + sections[i].offsetHeight;
  const f = clamp((y - start) / Math.max(1, end - start), 0, 1);
  return i + f;
}
function targetAt(p) {
  const K = route();
  if (!Number.isFinite(p)) p = 0;
  p = clamp(p, 0, K.length - 1);
  const i = Math.min(K.length - 2, Math.floor(p));
  const f = p - i;
  const t = ease(clamp((f - 0.12) / 0.76, 0, 1));
  const a = K[i];
  const b = K[i + 1];
  const dive = Math.sin(t * Math.PI) * -0.22;
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t) + dive,
    s: lerp(a.s, b.s, t) * (1 + Math.sin(t * Math.PI) * 0.12),
    yaw: lerpAngle(a.yaw, b.yaw, t),
    pitch: lerp(a.pitch, b.pitch, t),
    roll: lerp(a.roll, b.roll, t),
    moving: Math.sin(t * Math.PI),
  };
}

function wingTexture() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const board = document.createElement("canvas");
      board.width = 1024;
      board.height = 576;
      const ctx = board.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, 1024, 576);
      const image = ctx.getImageData(0, 0, 1024, 576);
      const px = image.data;
      for (let n = 0; n < px.length; n += 4) {
        const l = (px[n] * 0.3 + px[n + 1] * 0.59 + px[n + 2] * 0.11) / 255;
        px[n + 3] = clamp((l - 0.035) * 4.2, 0, 1) * 255;
        px[n] = Math.min(255, px[n] * 1.5 + 30);
        px[n + 1] = Math.min(255, px[n + 1] * 1.5 + 30);
        px[n + 2] = Math.min(255, px[n + 2] * 1.5 + 40);
      }
      ctx.putImageData(image, 0, 0);
      const tex = new THREE.CanvasTexture(board);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onerror = reject;
    img.src = WING_TEX;
  });
}

function wingGeometry(span) {
  const geo = new THREE.PlaneGeometry(span, span * 9 / 16);
  geo.translate(span / 2 - span * 0.03, 0, 0);
  geo.rotateX(-Math.PI / 2);
  geo.rotateY(-Math.PI / 2);
  return geo;
}

function addWingSide(anchor, mirror, tex) {
  const side = new THREE.Group();
  side.position.set(anchor.x, anchor.y, anchor.z);
  if (mirror) side.scale.z = -1;
  [
    { span: 0.72, sweep: -0.42, phase: 0, lift: 0.02 },
    { span: 0.52, sweep: -0.95, phase: -0.5, lift: -0.01 },
  ].forEach((wing) => {
    const sweep = new THREE.Group();
    sweep.rotation.y = wing.sweep;
    sweep.position.y = wing.lift;
    [
      { off: 0, opacity: 0.95 },
      { off: 0.55, opacity: 0.28 },
      { off: -0.55, opacity: 0.28 },
    ].forEach((copy) => {
      const flap = new THREE.Group();
      const mesh = new THREE.Mesh(
        wingGeometry(wing.span),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: copy.opacity,
          side: THREE.DoubleSide,
          depthWrite: false,
          color: 0xffffff,
          blending: THREE.NormalBlending,
        })
      );
      flap.add(mesh);
      sweep.add(flap);
      flaps.push({ group: flap, phase: wing.phase + copy.off });
    });
    side.add(sweep);
  });
  beeRoot.add(side);
}

new GLTFLoader().load(BEE_GLB, async (gltf) => {
  const model = gltf.scene;
  model.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.frustumCulled = false;
    if (obj.material) obj.material.envMapIntensity = 0.7;
  });
  const holder = new THREE.Group();
  holder.add(model);
  model.rotation.set(0, Math.PI / 2, 0);
  beeRoot.add(holder);

  const box = new THREE.Box3().setFromObject(holder);
  const size = box.getSize(new THREE.Vector3());
  model.scale.multiplyScalar(1 / Math.max(size.x, size.y, size.z));
  box.setFromObject(holder);
  model.position.sub(box.getCenter(new THREE.Vector3()));
  box.setFromObject(holder);

  const anchor = {
    x: box.min.x + (box.max.x - box.min.x) * 0.66,
    y: box.max.y * 0.86,
    z: (box.max.z - box.min.z) * 0.05,
  };
  try {
    const tex = await wingTexture();
    addWingSide(anchor, false, tex);
    addWingSide(anchor, true, tex);
  } catch (error) {
    console.warn(error);
  }
  modelReady = true;
  canvas.classList.add("ready");
  showPage();
}, undefined, () => showPage());

const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
addEventListener("pointermove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / innerHeight) * 2 - 1);
});

const cur = { x: -0.08, y: 0.22, s: 0.3, yaw: 200, pitch: 6, roll: 4 };
const clock = new THREE.Clock();

function tick() {
  requestAnimationFrame(tick);
  if (!modelReady) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const goal = targetAt(scrollP());
  const prevX = cur.x;
  const prevY = cur.y;
  const k = 1 - Math.exp(-dt * 3.2);
  const ky = 1 - Math.exp(-dt * 2.6);
  cur.x += (goal.x - cur.x) * k;
  cur.y += (goal.y - cur.y) * k;
  cur.s += (goal.s - cur.s) * k;
  cur.pitch += (goal.pitch - cur.pitch) * k;
  cur.roll += (goal.roll - cur.roll) * k;
  cur.yaw = lerpAngle(cur.yaw, goal.yaw, ky);
  const vx = (cur.x - prevX) / Math.max(dt, 0.0001);
  const vy = (cur.y - prevY) / Math.max(dt, 0.0001);
  const mk = 1 - Math.exp(-dt * 2);
  mouse.sx += (mouse.x - mouse.sx) * mk;
  mouse.sy += (mouse.y - mouse.sy) * mk;

  const halfH = Math.tan(THREE.MathUtils.degToRad(15)) * camera.position.z;
  const halfW = halfH * camera.aspect;
  const hover = Math.sin(t * 2.1) * 0.045 + Math.sin(t * 3.7) * 0.015;
  flight.position.set(
    cur.x * halfW + Math.sin(t * 1.3) * 0.04 + mouse.sx * 0.12,
    cur.y * halfH + hover * halfH * 0.5 + mouse.sy * 0.08,
    Math.sin(t * 0.9) * 0.15
  );
  flight.scale.setScalar(halfH * 2 * 0.3 * cur.s);
  flight.rotation.set(0, -THREE.MathUtils.degToRad(cur.yaw + mouse.sx * 12), 0);

  const pitch = cur.pitch - clamp(vy * 22, -28, 28) + Math.sin(t * 2.1 + 1) * 3 + mouse.sy * 6;
  const roll = cur.roll + clamp(vx * 18, -30, 30) + Math.sin(t * 1.7) * 4;
  beeRoot.rotation.set(THREE.MathUtils.degToRad(roll), 0, THREE.MathUtils.degToRad(pitch), "YZX");

  const freq = Math.PI * 2 * (17 + goal.moving * 5);
  flaps.forEach((flap) => {
    const a = Math.sin(t * freq + flap.phase);
    flap.group.rotation.x = -0.25 + a * 0.95;
    flap.group.rotation.y = a * 0.18;
  });
  renderer.render(scene, camera);
}
requestAnimationFrame(tick);
