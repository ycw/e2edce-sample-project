# About

A demo project for [ycw/e2ed2e](https://github.com/ycw/e2edce), showing how to 
eliminate deadcode for threejs appliaction. 

Stats: [live preview](https://ycw.github.io/e2edce-sample-project)

```
                                  | min   | min + gz |
Logs vector2                      | 88b   | 97b      | 😲
Rotating cube                     | 296Kb | 73Kb     |
webgl/postprocessing/unrealbloom  | 410Kb | 106Kb    |
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
