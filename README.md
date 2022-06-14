# About

e2edce sample project - DCE for threejs app

[Live preview on github page](https://ycw.github.io/e2edce-sample-project/)



# Usage

First, clone this repo

Then, run `npm i` to install deps.

Then, run `npm run build` to build artifacts.

Then, run `npm run serve` to boot http server.

Then, visit `http://localhost:8080`.

Then, open console network panel, check size of index.build.js. 😃

---

Now, try to update `src/index.js` as below

```js
import { Vector2 } from 'three'
console.log(new Vector2(0, 1))
```

Then, run `npm run build` to build artifacts, stdout shows its 245b(gzipped)

```
┌─────────┬────────┐
│ (index) │  size  │
├─────────┼────────┤
│ bundle  │ '11Kb' │
│   dce   │ '5Kb'  │
│  build  │ '339b' │
│  gzip   │ '245b' │
└─────────┴────────┘
```

Now, refresh `http://localhost:8080`, the vector2 should be logged in console.



# Credits

- [ycw/e2edce](https://github.com/ycw/e2edce)
- [mrdoob/three.js](https://github.com/mrdoob/three.js)
- [chakra(code sample)](https://codepen.io/ycw/pen/QWQVaRb)
