export default {
  input: 'src/index.js',
  output: 'index.build.js',

  compress: true,
  mangle: true,
  minified: true, // trim wsp

  elim_uncov_class_method: false,
  elim_uncov_prop_method: true,
  elim_uncov_prop_fn_expr: true,

  dbg_mode: false,
  headless: true,
  port: 8080,

  async cov(page) {
    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' })
    // resize
    await page.setViewportSize({ width: 256, height: 256 })
    await page.setViewportSize({ width: 512, height: 512 })
    // orbit ctrl - orbit
    await page.mouse.move(256, 256)
    await page.mouse.down()
    await page.mouse.move(300, 300, { steps: 20 })
    await page.mouse.up()
    // orbit ctrl - zoom
    await page.mouse.wheel(50, 50)
    await page.mouse.wheel(-50, -50)
  }
}