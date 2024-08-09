import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue"

const MIN_ZOOM = 0.5
const MAX_ZOOM = 2

export const useAppTransform = () => {
  const zoom = ref(1)

  const zoomIn = () => {
    if (zoom.value >= MAX_ZOOM) {
      return
    }
    zoom.value += 0.1
  }

  const zoomOut = () => {
    if (zoom.value <= MIN_ZOOM) {
      return
    }
    zoom.value -= 0.1
  }

  const onWheel = (e: WheelEvent) => {
    if (e.deltaY > 0) {
      zoomOut()
    } else {
      zoomIn()
    }
  }

  const translate = reactive({ x: 0, y: 0 })

  let pressed = false

  const onMouseMove = (event: MouseEvent) => {
    if (!pressed) {
      return
    }
    translate.x += event.movementX / (zoom.value)
    translate.y += event.movementY / (zoom.value)
  }

  const onMouseDown = (event: MouseEvent) => {
    // right button
    if (event.button === 2) {
      pressed = true
    }
  }

  const onMouseUp = (event: MouseEvent) => {
    // right button
    if (event.button === 2) {
      pressed = false
    }
  }

  const onBlur = () => {
    pressed = false
  }

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault()
  }

  onMounted(() => {
    window.addEventListener('blur', onBlur)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('blur', onBlur)
  })

  return {
    zoom,
    listeners: {
      wheel: onWheel,
      mousemove: onMouseMove,
      mousedown: onMouseDown,
      mouseup: onMouseUp,
      contextmenu: onContextMenu,
    },
    zoomIn,
    zoomOut,
    translate,
  }
}
