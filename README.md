# About

A demo project for [ycw/e2edce](https://github.com/ycw/e2edce), showing how to 
eliminate deadcode for threejs appliaction. 

📝 e2edce.base.config.js - threejs specific configuration. 

- it rewrites import source from `three` to `three/src/Three`, and 

- it minifies glsl sources in shaderchunk/ and shaderlib/.  

🧪 [Testbed](https://ycw.github.io/e2edce-sample-project)

- open devtools network panel, check size|content-length of 'index.bulid.js' for each test; if you're using chrome browsers, check also its coverage

🔢 Stats:

```
Logs Vector2
┌─────────┬──────────┐
│ (index) │   size   │
├─────────┼──────────┤
│ bundle  │ '6.20Kb' │
│   dce   │ '2.01Kb' │
│  build  │  '88b'   │
│  gzip   │  '97b'   │
└─────────┴──────────┘

Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│ bundle  │ '692.39Kb' │
│   dce   │ '411.54Kb' │
│  build  │ '215.45Kb' │
│  gzip   │ '53.26Kb'  │
└─────────┴────────────┘

Pick Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│ bundle  │ '695.55Kb' │
│   dce   │ '425.91Kb' │
│  build  │ '223.22Kb' │
│  gzip   │ '55.49Kb'  │
└─────────┴────────────┘

webgl_shaders_ocean.html
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│ bundle  │ '776.40Kb' │
│   dce   │ '574.81Kb' │
│  build  │ '304.86Kb' │
│  gzip   │ '79.19Kb'  │
└─────────┴────────────┘

cannon-es/examples/threejs_mousepick
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│ bundle  │ '947.86Kb' │
│   dce   │ '626.50Kb' │
│  build  │ '293.40Kb' │
│  gzip   │ '75.07Kb'  │
└─────────┴────────────┘
```



## Build Locally

1. Clone this repo
2. Install deps, `npm i`
3. Create builds, `npm run build`
4. Boot http server, `npm run serve`
5. Check testbed at `http://localhost:8080`

To test your own codes:

1. Put your codes in `src/foo.js`
2. Write tests in `tests/foo.js`
3. Config e2edce in `e2edce.config.js`
4. Create build, `npm run build`
6. Check result at `http://localhost:8080/public/foo/index.html`



## Credits

- [ycw/e2edce](https://github.com/ycw/e2edce)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)
