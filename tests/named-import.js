/** @param page {import('playwright').Page} */
export default async (page) => {
  await page.goto(
    'http://localhost:8081/public/named-import/index.html',
    { waitUntil: 'networkidle' }
  )
}