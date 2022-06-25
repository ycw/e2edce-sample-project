import minify_glsl from 'three-glsl-minifier'
import * as t from '@babel/types'
import parser from '@babel/parser'

const common = {
  compress: {
    passes: 2,
    pure_funcs: ['console.warn', 'console.error'],
    global_defs: {
      __THREE_DEVTOOLS__: undefined,
      'window.__THREE__': true
    },
  },
  mangle: true,
  beautify: false,
  debug: false,
  headless: true,
  port: 8081,
  /** @type import('@babel/traverse').Visitor */
  visitor: {
    ImportDeclaration(path) {
      if (path.node.source.value === 'three') {
        path.node.source.value = 'three/src/Three.js'
      }
    },
    StringLiteral(path) {
      if (path.node.leadingComments?.[0]?.value.trim() === 'glsl') {
        t.removeComments(path.node)
        path.node.value = minify_glsl(path.node.value)
      }
    },
    TemplateLiteral(path) {
      if (path.node.leadingComments?.[0]?.value.trim() === 'glsl') {
        const src = path.getSource()
        const glsl = src.substring(1, src.length - 1) // eat backticks
        const minified = [
          '`',
          minify_glsl(glsl),
          '`'
        ].join('') 
        t.removeComments(path.node)
        path.replaceWith(
          parser.parse(minified, {}).program.body[0].expression
        )
      }
    }
  }
}

export default {
  configs: [
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
      input: 'src/force-used.js',
      output: 'public/force-used/index.build.js',
      test: 'tests/force-used.js'
    },
    {
      ...common,
      input: 'src/use-examples.js',
      output: 'public/use-examples/index.build.js',
      test: 'tests/use-examples.js',
    },
    {
      ...common,
      input: 'src/use-cannon-es.js',
      output: 'public/use-cannon-es/index.build.js',
      test: 'tests/use-cannon-es.js'
    },
    {
      ...common,
      input: 'src/foo.js',
      output: 'public/foo/index.build.js',
      test: 'tests/foo.js'
    }
  ]
}