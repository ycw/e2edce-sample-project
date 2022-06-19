// ---
// Base config for threejs
// - minify glsl src for both ShaderChunk/ and ShaderLib/ 
// - replace 'three' with 'three/src/Three'
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
  const chuck_arr = source.match(chunk_re)

  if (chuck_arr) {
    return path.resolve(tmp_chunk_dir, chuck_arr[1])
  }

  const lib_re = new RegExp('three/src/renderers/shaders/ShaderLib/(.*\\.js)')
  const lib_arr = source.match(lib_re)

  if (lib_arr) {
    return path.resolve(tmp_lib_dir, lib_arr[1])
  }

  return null
}



// ----

function rm_block_comment(code) {
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



function rm_wsp_and_trailing_line_comment(code) {
  const delims = '()[]{};,+-*/='
  const wsps = ' \t\r\n'
  const chars = []

  let at = 0
  let head = true
  while (at < code.length) {

    // pragma - put as-is 

    if (head && code[at] === '#') {
      let end = code.indexOf('\n', at)
      end = end === -1
        ? code.length
        : end + 1
      chars.push(code.substring(at, end))
      at = end
      continue
    }

    // trailing comment

    if (code.substring(at, at + 2) === '//') {
      chars.push('\n')
      at = code.indexOf('\n', at)
      head = true
      continue
    }

    // it's safe to eat wsp following a delim

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

    // it's safe to eat all wsp IF next non-wsp is a delim

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

  // rm empty lines; 
  // trim lines; 
  // rm leading line comments

  code = code.split('\n')
    .map(r => r.trim())
    .filter(r => r.length && !r.startsWith('//'))
    .join('\n')

  code = rm_block_comment(code)
  code = rm_wsp_and_trailing_line_comment(code)

  return code
}