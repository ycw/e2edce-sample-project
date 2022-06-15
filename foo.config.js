export default {
  input: 'src/foo.js',
  output: 'public/foo/index.build.js',
  test: 'tests/foo.js',
  compress: {
    passes: 2,
    pure_funcs: ['console.warn'],
    global_defs: {
      __THREE_DEVTOOLS__: undefined,
      'window.__THREE__': true
    }
  },
  mangle: true,
  minify: true,

  headless: true,
  port: 8081,
  debug: false
}