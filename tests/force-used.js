/** @param page {import('playwright').Page} */
export default {

  inject: () => {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial()
    )
    const raycaster = new THREE.Raycaster(
      new THREE.Vector3(0, 0, 2),
      new THREE.Vector3(0, 0, -1)
    )
    raycaster.intersectObjects([mesh])
  },

  test: async (page) => {
    await page.goto(
      'http://localhost:8081/public/force-used/index.html',
      { waitUntil: 'networkidle' }
    )
  }
}