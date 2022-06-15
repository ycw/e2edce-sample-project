import foo_config from './foo.config.js'

const common = {
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
  debug: false,
}

export default [
  {
    ...common,
    input: 'src/named-import.js',
    output: 'public/named-import/index.build.js',
    test: 'tests/named-import.js',
  },
  {
    ...common,
    input: 'src/full-import.js',
    output: 'public/full-import/index.build.js',
    test: 'tests/full-import.js',
  },
  {
    ...common,
    input: 'src/from-examples.js',
    output: 'public/from-examples/index.build.js',
    test: 'tests/from-examples.js',
  },
  foo_config
]