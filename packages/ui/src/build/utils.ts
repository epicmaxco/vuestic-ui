const fs = require('fs')
const { green, blue, red, magenta, grey } = require('chalk')
const path = require('path')
const zlib = require('zlib')

const logError = (err: any) => {
  console.error('\n' + red('[Error]'), err)
  console.log()
}

const getSize = (code: string) => {
  return (code.length / 1024).toFixed(2) + 'kb'
}

/**
 * Get colorful banner for console
 * @param destination
 */
const getBanner = (path: string): string => {
  if (path.endsWith('.js')) {
    // Spaces are intended (for lines to appear uniform).
    return green('[js]  ')
  }

  if (path.endsWith('.json')) {
    return grey('[json]')
  }

  if (path.endsWith('.css') || path.endsWith('.styl') || path.endsWith('.sass')) {
    return blue('[css] ')
  }

  if (path.endsWith('.ts')) {
    return magenta('[ts]  ')
  }

  throw new Error(`Unknown file type for getBanner: ${path}`)
}

/**
 * Writes file and logs it to console.
 *
 * @param destination
 * @param code
 * @param zip - pass true to zip
 */
const writeFile = (destination: string, code: string, zip = false): Promise<string> => {
  const fileSize = getSize(code)
  const filePath = path.relative(process.cwd(), destination)

  return new Promise((resolve, reject) => {
    const report = (gzippedString?: string) => {
      console.log(`${getBanner(destination)} ${filePath.padEnd(49)} ${fileSize.padStart(8)}${gzippedString || ''}`)
      resolve(code)
    }

    // @ts-ignore
    fs.writeFile(destination, code, err => {
      if (err) { return reject(err) }
      if (zip) {
        // @ts-ignore
        zlib.gzip(code, (err, zipped) => {
          if (err) { return reject(err) }
          const size = getSize(zipped)
          report(` (gzipped: ${size.padStart(8)})`)
        })
        return
      }
      report()
    })
  })
}

module.exports = {
  logError,
  getBanner,
  writeFile,
}
