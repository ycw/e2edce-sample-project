# About

A demo project for [ycw/e2ed2e](https://github.com/ycw/e2edce), showing how to 
eliminate deadcode for threejs appliaction. 

[Live preview stats](https://ycw.github.io/e2edce-sample-project) 
(open network panel, check 'content-length' of index.bulid.js for each test)

Stats:

```
Logs Vector2
┌─────────┬──────────┐
│ (index) │   size   │
├─────────┼──────────┤
│ bundle  │ '6.33Kb' │
│   dce   │ '2.03Kb' │
│  build  │  '88b'   │
│  gzip   │  '97b'   │
└─────────┴──────────┘

Rotating Cube
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│ bundle  │ '734.39Kb' │
│   dce   │ '440.26Kb' │
│  build  │ '247.96Kb' │
│  gzip   │ '61.86Kb'  │
└─────────┴────────────┘

webgl_shaders_ocean.html
┌─────────┬────────────┐
│ (index) │    size    │
├─────────┼────────────┤
│ bundle  │ '823.91Kb' │
│   dce   │ '603.59Kb' │
│  build  │ '337.37Kb' │
│  gzip   │ '87.69Kb'  │
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
3. Config e2edce in `foo.config.js`
4. Create build, `npm run build:foo` (foo only)
6. Check result at `http://localhost:8080/public/foo/index.html`



## Credits

- [ycw/e2edce](https://github.com/ycw/e2edce)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)
