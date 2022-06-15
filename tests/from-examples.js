/** @param page {import('playwright').Page} */
export default async (page) => {
  await page.goto(
    'http://localhost:8081/public/from-examples/index.html',
    { waitUntil: 'networkidle' }
  )
  // resize 
  await page.setViewportSize({ width: 200, height: 200 })
  await page.setViewportSize({ width: 400, height: 400 })
  // orbit controls - orbit 
  await page.mouse.move(200, 200)
  await page.mouse.down()
  await page.mouse.move(100, 100, { steps: 10 })
  await page.mouse.up()
  // orbit controls - zoom
  await page.mouse.wheel(50, 50)
  await page.mouse.wheel(-50, -50)
}