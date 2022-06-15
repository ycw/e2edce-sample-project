# About

A demo project showing how to eliminate deadcode for threejs appliaction by using [ycw/e2ed2e](https://github.com/ycw/e2edce). Here's the [Testbed](https://ycw.github.io/e2edce-sample-project) hosted on github page.

```
Logs vector2 ... 97 bytes (gzipped)
Rotating cube .. 59 Kb (gzipped)
Chakra ......... 84 Kb (gzipped)
```


## Build Locally 

1. Clone this repo
2. Install deps, `npm i`
3. Create builds, `npm run build`
4. Boot http server, `npm run serve`
5. Check testbed at `http://localhost:8080`

To test your own codes:

1. Put your codes in `src/foo.js`
2. Write e2e tests in `tests/foo.js`
3. Config e2edce in `foo.config.js`
4. Create build, `npm run build:foo` (foo only)
6. Check result at `http://localhost:8080/public/foo/index.html`

## Credits

- [ycw/e2edce](https://github.com/ycw/e2edce)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)
- [chakra](https://codepen.io/ycw/pen/QWQVaRb)
