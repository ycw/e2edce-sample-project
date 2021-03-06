# About

A demo project for [ycw/e2edce](https://github.com/ycw/e2edce), showing how to 
eliminate deadcode for threejs appliaction. 

๐ช GLSL sources are now minified using [ycw/three-glsl-minifier](https://github.com/ycw/three-glsl-minifier))

๐งช [Testbed](https://ycw.github.io/e2edce-sample-project)

๐ข Stats:

```
Logs Vector2
โโโโโโโโโโโฌโโโโโโโโโโโ
โ (index) โ   size   โ
โโโโโโโโโโโผโโโโโโโโโโโค
โ  flat   โ '5.93Kb' โ
โ   dce   โ '1.63Kb' โ
โ   min   โ  '87b'   โ
โ min+gz  โ  '96b'   โ
โโโโโโโโโโโดโโโโโโโโโโโ

Rotating Cube
โโโโโโโโโโโฌโโโโโโโโโโโโโ
โ (index) โ    size    โ
โโโโโโโโโโโผโโโโโโโโโโโโโค
โ  flat   โ '701.97Kb' โ
โ   dce   โ '409.01Kb' โ
โ   min   โ '212.36Kb' โ
โ min+gz  โ '52.96Kb'  โ
โโโโโโโโโโโดโโโโโโโโโโโโโ

Pick Rotating Cube
โโโโโโโโโโโฌโโโโโโโโโโโโโ
โ (index) โ    size    โ
โโโโโโโโโโโผโโโโโโโโโโโโโค
โ  flat   โ '705.10Kb' โ
โ   dce   โ '423.65Kb' โ
โ   min   โ '220.12Kb' โ
โ min+gz  โ '55.19Kb'  โ
โโโโโโโโโโโดโโโโโโโโโโโโโ

webgl_shaders_ocean.html
โโโโโโโโโโโฌโโโโโโโโโโโโโ
โ (index) โ    size    โ
โโโโโโโโโโโผโโโโโโโโโโโโโค
โ  flat   โ '788.71Kb' โ
โ   dce   โ '568.86Kb' โ
โ   min   โ '297.01Kb' โ
โ min+gz  โ '77.73Kb'  โ
โโโโโโโโโโโดโโโโโโโโโโโโโ

cannon-es/examples/threejs_mousepick
โโโโโโโโโโโฌโโโโโโโโโโโโโ
โ (index) โ    size    โ
โโโโโโโโโโโผโโโโโโโโโโโโโค
โ  flat   โ '957.42Kb' โ
โ   dce   โ '624.32Kb' โ
โ   min   โ '290.34Kb' โ
โ min+gz  โ '74.79Kb'  โ
โโโโโโโโโโโดโโโโโโโโโโโโโ
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
