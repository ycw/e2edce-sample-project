import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Vector3,
  DirectionalLight,
  TextureLoader,
  ShaderMaterial,
  ShaderLib,
  UniformsUtils,
  MeshLambertMaterial,
  MeshBasicMaterial,
  BackSide,
  MirroredRepeatWrapping,
  DoubleSide,
  Color
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// ----
// main
// ----

const renderer = new WebGLRenderer();
const scene = new Scene();
const camera = new PerspectiveCamera(75, 2, .1, 100);
const controls = new OrbitControls(camera, renderer.domElement);

controls.target.set(0, 1, 0)
camera.position.set(0, 1, 6);
controls.enableDamping = true;
renderer.shadowMap.enabled = true

const light = new DirectionalLight();
light.position.set(0, 3, 3);
light.castShadow = true;
scene.add(light);

const light2 = new DirectionalLight();
light2.position.set(3, 0, 0);
light2.castShadow = true;
scene.add(light2);

// ---
// texture by Michael Dziedzic - https://unsplash.com/photos/QC0hsHfnIpA
// model by - https://github.com/mrdoob/three.js/blob/r139/examples/models/gltf/LeePerrySmith/LeePerrySmith_License.txt
// ---

const map_url = 'https://images.unsplash.com/photo-1610259419044-3228653c278b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=512&q=80';
const tex0 = new TextureLoader().load(map_url);
tex0.repeat.set(10, 0.2);
tex0.wrapS = MirroredRepeatWrapping;
tex0.wrapT = MirroredRepeatWrapping;

const gltf_url = 'https://rawcdn.githack.com/mrdoob/three.js/r139/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb';
const gltf = await new GLTFLoader().loadAsync(gltf_url);
const mesh = gltf.scene.children[0];
const geom = mesh.geometry

geom.addGroup(0, Infinity, 0)
geom.addGroup(0, geom.index.count, 1);
geom.addGroup(0, Infinity, 2)

// outline https://codepen.io/ycw/pen/popBqBJ
const shdr0 = ShaderLib.basic;
const mat0 = new ShaderMaterial({
  side: BackSide,
  uniforms: UniformsUtils.merge([shdr0.uniforms, {
    diffuse: { value: new Color('white') }
  }]),
  vertexShader: shdr0.vertexShader.replace('#include <begin_vertex>', `
    vec3 transformed = vec3( position ) + normal * 0.04;
    `),
  fragmentShader: shdr0.fragmentShader
});

// textured
const mat1 = new MeshLambertMaterial({
  side: DoubleSide,
  map: tex0,
  emissiveMap: tex0, emissiveIntensity: 0.8, emissive: 'white'
});

// wireframe
const mat2 = new MeshBasicMaterial({ color: 'white', wireframe: true });

mesh.material = [mat0, mat1, mat2];
mesh.rotateY(Math.PI / 2);
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

function shuffle_3tuple(ab) {
  const total = ab.length / 3; // total 3tuple
  for (let i = 0; i < total; ++i) { // cursor
    const curr_index = total - 1 - i;
    const target_index = Math.random() * (curr_index) | 0; // excl curr_index
    swap_3tuple(ab, curr_index, target_index);
  }
}

function swap_elm(ab, i, j) {
  let x = ab[i];
  ab[i] = ab[j];
  ab[j] = x;
}

function swap_3tuple(ab, i, j) {
  swap_elm(ab, i * 3, j * 3);
  swap_elm(ab, i * 3 + 1, j * 3 + 1);
  swap_elm(ab, i * 3 + 2, j * 3 + 2);
}

shuffle_3tuple(geom.index.array);

// ----
// render
// ----

function to_mul3(x) {
  const n = Math.round(x);
  return n - (n % 3);
}

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(undefined, 1, 1, 0.5));

let dir = -1;
const min_count = to_mul3(geom.index.count / 2);
const group = geom.groups[1]
renderer.setAnimationLoop((t) => {
  if (group.count >= min_count && group.count <= geom.index.count) {
    group.count += dir * 3 * (100);
  } else {
    group.count = dir < 0 ? min_count : geom.index.count;
    shuffle_3tuple(geom.index.array);
    dir *= -1;
  }
  composer.render();
  controls.update();
  tex0.offset.x -= 0.0005;
  tex0.offset.y -= 0.002;
});

// ----
// view
// ----

function resize(w, h, dpr = devicePixelRatio) {
  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h, false);
  composer.setPixelRatio(dpr);
  composer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
addEventListener('resize', () => resize(innerWidth, innerHeight));
dispatchEvent(new Event('resize'));
document.body.prepend(renderer.domElement);