// ---
// Base config for threejs
// - minify glsl src for both ShaderChunk/ and ShaderLib/ 
// - replace import source 'three' with 'three/src/Three'
// ---

import fs from 'node:fs/promises'
import path from 'node:path'
import url from 'node:url'

const tmp_dir = './.e2edce'
const tmp_chunk_dir = path.join(tmp_dir, 'ShaderChunk')
const tmp_lib_dir = path.join(tmp_dir, 'ShaderLib')
const chunk_dir = 'node_modules/three/src/renderers/shaders/ShaderChunk/'
const lib_dir = 'node_modules/three/src/renderers/shaders/ShaderLib/'

export async function setup() {
  await fs.mkdir(tmp_chunk_dir, { recursive: true })

  const chunk_files = await fs.readdir(chunk_dir)

  for (const filename of chunk_files) {
    const code = (await import(
      url.pathToFileURL(
        path.resolve(chunk_dir, filename)
      )
    )).default

    const minified_code = minify_glsl(code)

    await fs.writeFile(
      path.resolve(tmp_chunk_dir, filename),
      'export default `' + minified_code + '`'
    )
  }

  await fs.mkdir(tmp_lib_dir, { recursive: true })

  const lib_files = await fs.readdir(lib_dir)

  for (const filename of lib_files) {
    const { vertex, fragment } = (await import(
      url.pathToFileURL(
        path.resolve(lib_dir, filename)
      )
    ))

    const minified_vs = minify_glsl(vertex)
    const minified_fs = minify_glsl(fragment)

    await fs.writeFile(
      path.resolve(tmp_lib_dir, filename),
      `
      export const vertex = \`${minified_vs}\`;
      export const fragment = \`${minified_fs}\`;
      `
    )
  }

}

export async function teardown() {
  await fs.rm(tmp_dir, { recursive: true })
}

export async function resolve(source, _importer) {
  if (source === 'three') {
    return 'node_modules/three/src/Three.js'
  }

  source = source.replaceAll('\\', '/') // win

  const chunk_re = new RegExp('three/src/renderers/shaders/ShaderChunk/(.*\\.js)')
  const chunk_arr = source.match(chunk_re)

  if (chunk_arr) {
    return path.resolve(tmp_chunk_dir, chunk_arr[1])
  }

  const lib_re = new RegExp('three/src/renderers/shaders/ShaderLib/(.*\\.js)')
  const lib_arr = source.match(lib_re)

  if (lib_arr) {
    return path.resolve(tmp_lib_dir, lib_arr[1])
  }

  return null
}



// ----

function rm_blockcomments(code) {
  const chars = []
  let at = 0
  while (at < code.length) {
    if (code.substring(at, at + 2) === '/*') {
      at = code.indexOf('*/', at) + 2
      continue
    }
    chars.push(code[at])
    at += 1
  }
  return chars.join('')
}



function rm_wsp_and_linecomments(code) {
  const delims = '()[]{};,+-*/=<>|&'
  const wsps = ' \t\r\n'
  const chars = []

  let at = 0
  let head = true
  while (at < code.length) {

    // pragma - put as-is (rm line comment)

    if (head && code[at] === '#') {
      let end = code.indexOf('\n', at)
      end = end === -1
        ? code.length
        : end + 1

      const pragma_code = code.substring(at, end)
      const slashslash_at = pragma_code.indexOf('//')
      const pragma_end = slashslash_at === -1
        ? pragma_code.length
        : slashslash_at
      chars.push(pragma_code.substring(0, pragma_end), '\n')

      at = end
      continue
    }

    // rm line comment '//'

    if (code.substring(at, at + 2) === '//') {
      const end = code.indexOf('\n', at)

      if (end === -1) { // eof
        at = code.length
        head = false
      } else {
        chars.push('\n')
        at = end + 1
        head = true
      }
      continue
    }

    // rm wsps in a row `[   0` -> `[0`

    if (delims.includes(code[at])) {
      chars.push(code[at])
      at += 1
      let newline = false
      while (at < code.length && wsps.includes(code[at])) {
        if (code[at] === '\n') {
          newline = true
        }
        at += 1
      }

      if (newline) {
        chars.push('\n')
        head = true
      } else {
        head = false
      }
      continue
    }

    // rm wsps in a row (2) `0   ]` -> `0]`

    if (wsps.includes(code[at])) {
      let newline = code[at] === '\n'
      at += 1
      while (at < code.length && wsps.includes(code[at])) {
        if (code[at] === '\n') {
          newline = true
        }
        at += 1
      }

      if (!delims.includes(code[at])) {
        if (newline) {
          chars.push('\n')
          head = true
        } else {
          chars.push(' ')
          head = false
        }
      }
      continue
    }

    chars.push(code[at])
    at += 1
    head = false
  }

  return chars.join('')
}



function minify_glsl(code) {

  code = code.split('\n')
    .map(r => r.trim()) // trim
    .filter(r => r.length) // rm empty line
    .join('\n')

  code = rm_blockcomments(code)
  code = rm_wsp_and_linecomments(code)

  return code
}