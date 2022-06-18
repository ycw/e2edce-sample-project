export default {

  inject: () => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1)
    )
    const raycaster = new THREE.Raycaster(
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(0, 0, -1)
    )
    raycaster.intersectObject(mesh)
  },

  /** @param page {import('playwright').Page} */
  test: async (page) => {
    await page.goto(
      'http://localhost:8081/public/use-cannon-es/index.html',
      { waitUntil: 'networkidle' }
    )

    await page.setViewportSize({ width: 400, height: 400 })
    await new Promise(ok => setTimeout(ok, 1000)) // prewarm
    await page.mouse.move(200, 300)
    await page.mouse.down()
    await page.mouse.move(300, 200)
    await page.mouse.up()
  }
}