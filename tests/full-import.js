/** @param page {import('playwright').Page} */
export default async (page) => {
  await page.goto(
    'http://localhost:8081/public/full-import/index.html',
    { waitUntil: 'networkidle' }
  )
}