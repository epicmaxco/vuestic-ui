/*       */

export default function show (node, dir) {
  if (!dir.value) {
    const style = node.data.style || (node.data.style = {})
    if (Array.isArray(style)) {
      style.push({ display: 'none' })
    } else {
      style.display = 'none'
    }
  }
}
