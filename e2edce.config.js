export default {
  input: 'src/index.js',
  output: 'index.build.js',
  test: 'e2e/test.js',

  compress: { 
    passes: 2,
    pure_funcs: [ 'console.warn' ]
  },
  mangle: true,
  minify: true,

  headless: true,
  port: 8081,
  debug: false,
}