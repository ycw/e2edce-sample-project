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
│  flat   │ '6.10Kb' │
│   dce   │ '1.91Kb' │
│   min   │  '87b'   │
│ min+gz  │  '96b'   │
└─────────┴──────────┘

Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '693.53Kb' │
│   dce   │ '412.68Kb' │
│   min   │ '218.51Kb' │
│ min+gz  │ '53.56Kb'  │
└─────────┴────────────┘

Pick Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '696.50Kb' │
│   dce   │ '427.08Kb' │
│   min   │ '226.27Kb' │
│ min+gz  │ '55.77Kb'  │
└─────────┴────────────┘

webgl_shaders_ocean.html
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '777.52Kb' │
│   dce   │ '576.02Kb' │
│   min   │ '307.84Kb' │
│ min+gz  │ '79.44Kb'  │
└─────────┴────────────┘

cannon-es/examples/threejs_mousepick
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '948.81Kb' │
│   dce   │ '627.66Kb' │
│   min   │ '296.49Kb' │
│ min+gz  │ '75.38Kb'  │
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
- [pmndrs/cannon-es](https://github.com/pmndrs/cannon-es)
