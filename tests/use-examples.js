/** @param page {import('playwright').Page} */
export default {
  inject: () => {
    new GUI().add({ x: 1 }, 'x', 0, 1).listen(true)
  },
  test: async (page) => {
    await page.goto(
      'http://localhost:8081/public/use-examples/index.html',
      { waitUntil: 'networkidle' }
    )
    // resize 
    await page.setViewportSize({ width: 200, height: 200 })
    await page.setViewportSize({ width: 400, height: 400 })

    // orbit controls - orbit 
    await page.mouse.move(200, 200)
    await page.mouse.down()
    await page.mouse.move(200, 0, { steps: 10 })
    await page.mouse.move(0, 200, { steps: 10 })
    await page.mouse.up()

    // orbit controls - zoom
    await page.mouse.wheel(50, 50)
    await page.mouse.wheel(-50, -50)

    // lil-gui - slide
    await page.click('.lil-gui .children .controller:nth-of-type(1) .slider', { position: { x: 1, y: 1 } })
    await page.click('.lil-gui .children .controller:nth-of-type(1) .slider', { position: { x: 2, y: 2 } })

    // lil-gui - fold
    await page.click('.lil-gui .title')
  }
}