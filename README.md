# About

A demo project for [ycw/e2edce](https://github.com/ycw/e2edce), showing how to 
eliminate deadcode for threejs appliaction. 

🪚 GLSL sources are now minified using [ycw/three-glsl-minifier](https://github.com/ycw/three-glsl-minifier))

🧪 [Testbed](https://ycw.github.io/e2edce-sample-project)

🔢 Stats:

```
Logs Vector2
┌─────────┬──────────┐
│ (index) │   size   │
├─────────┼──────────┤
│  flat   │ '5.93Kb' │
│   dce   │ '1.63Kb' │
│   min   │  '87b'   │
│ min+gz  │  '96b'   │
└─────────┴──────────┘

Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '701.97Kb' │
│   dce   │ '409.01Kb' │
│   min   │ '212.36Kb' │
│ min+gz  │ '52.96Kb'  │
└─────────┴────────────┘

Pick Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '705.10Kb' │
│   dce   │ '423.65Kb' │
│   min   │ '220.12Kb' │
│ min+gz  │ '55.19Kb'  │
└─────────┴────────────┘

webgl_shaders_ocean.html
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '788.71Kb' │
│   dce   │ '568.86Kb' │
│   min   │ '297.01Kb' │
│ min+gz  │ '77.73Kb'  │
└─────────┴────────────┘

cannon-es/examples/threejs_mousepick
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│  flat   │ '957.42Kb' │
│   dce   │ '624.32Kb' │
│   min   │ '290.34Kb' │
│ min+gz  │ '74.79Kb'  │
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
- [ycw/three-glsl-minifier](https://github.com/ycw/three-glsl-minifier)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)
- [pmndrs/cannon-es](https://github.com/pmndrs/cannon-es)
