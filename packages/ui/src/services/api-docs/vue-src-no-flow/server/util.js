/*       */

export const isJS = (file) => /\.js(\?[^.]+)?$/.test(file)

export const isCSS = (file) => /\.css(\?[^.]+)?$/.test(file)

export function createPromiseCallback () {
  let resolve, reject
  const promise = new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  const cb = (err, res) => {
    if (err) {
      return reject(err)
    }
    resolve(res || '')
  }
  return { promise, cb }
}
