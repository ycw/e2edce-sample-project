/** @param page {import('playwright').Page} */
export default async (page) => {
  await page.goto(
    'http://localhost:8081/public/foo/index.html',
    { waitUntil: 'networkidle' }
  )
}
