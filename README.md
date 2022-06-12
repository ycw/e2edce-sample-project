# About

e2edce sample project - DCE for threejs app



# Usage

First, clone this repo

Then, run `npm i` to install deps (ycw/e2edce and three)

Then, run `npm run build`, this will create a min. build and a gzipped min. build.

A tiny report will print to stdout:

```
  ┌─────────┬─────────┐
  │ (index) │   sz    │
  ├─────────┼─────────┤
  │  entry  │  '5Kb'  │
  │ rollup  │ '734Kb' │
  │  build  │ '329Kb' │
  │  gzip   │ '82Kb'  │
  └─────────┴─────────┘

Info: The build included:
  three^0.141
    WebGLRenderer, Scene, PerspectiveCamera, 
    Vector3, Color,
    DirectionalLight, 
    ShaderLib, UniformsUtils,
    MeshLambertMaterial, MeshBasicMaterial, ShaderMaterial,
    BackSide, DoubleSide,
    TextureLoader, MirroredRepeatWrapping

  effectcomposer (unrealbloom)
  orbitcontrol (orbit+zoom by mouse)
```

Finally, run your favorite http server serving the 'index.html'. 🥳



# Credits

- [ycw/e2edce](https://github.com/ycw/e2edce)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)
- [chakra(code sample)](https://codepen.io/ycw/pen/QWQVaRb)
