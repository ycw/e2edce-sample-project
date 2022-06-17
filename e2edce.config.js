import foo_config from './foo.config.js'

const common = {
  compress: {
    passes: 2,
    pure_funcs: ['console.warn', 'console.error'],
    global_defs: {
      __THREE_DEVTOOLS__: undefined,
      'window.__THREE__': true
    }
  },
  mangle: true,
  minify: true,
  debug: false,

  headless: true,
  port: 8081
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
    input: 'src/use-examples.js',
    output: 'public/use-examples/index.build.js',
    test: 'tests/use-examples.js',
  },
  {
    ...common,
    input: 'src/force-used.js',
    output: 'public/force-used/index.build.js',
    test: 'tests/force-used.js'
  },
  foo_config
]