export default function () {
  const layout = document.querySelector('#base-layout')
  setTimeout(() => {
    layout.scroll(0, 0)
  }, 0)
  return { x: 0, y: 0 }
}
