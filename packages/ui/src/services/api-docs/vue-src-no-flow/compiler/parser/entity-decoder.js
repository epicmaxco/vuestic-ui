/*       */

let decoder

export default {
  decode (html) {
    decoder = decoder || document.createElement('div')
    decoder.innerHTML = html
    return decoder.textContent
  },
}
