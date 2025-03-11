import { ref, shallowRef, onUnmounted, Ref, watch, unref, CSSProperties } from 'vue'

type PositionValue = number | `${number}%`

interface UseDraggableProps {
  draggableRef: Ref<HTMLElement | null | undefined>
  containerRef?: Ref<HTMLElement | null>
  isDraggable?: Ref<boolean> | boolean
  isBoundary?: Ref<boolean> | boolean
  initialPosition?: Ref<Partial<{ x: PositionValue; y: PositionValue }>> | Partial<{ x: PositionValue; y: PositionValue }>
}

const restrict = (value: number, max: number) => Math.max(0, Math.min(value, max))

const parsePosition = (value: PositionValue, maxSize: number, elementSize: number): number => {
  if (typeof value === 'string' && value.endsWith('%')) {
    return (parseFloat(value) / 100) * maxSize - elementSize / 2
  }

  return typeof value === 'number' ? value : 0
}

export function useDraggable ({
  draggableRef,
  containerRef,
  isDraggable = true,
  isBoundary = true,
  initialPosition,
}: UseDraggableProps) {
  const isDragging = ref(false)
  const position = ref({ x: 0, y: 0 })
  const offset = ref({ x: 0, y: 0 })

  const positionStyle = shallowRef<CSSProperties>({
    left: '0px',
    top: '0px',
    position: containerRef?.value ? 'absolute' : 'fixed',
  })

  const setPosition = (x: PositionValue, y: PositionValue) => {
    const element = draggableRef.value
    if (!element) { return }

    const container = containerRef?.value

    const [maxWidth, maxHeight] = container
      ? [container.clientWidth, container.clientHeight]
      : [window.innerWidth, window.innerHeight]

    const maxX = maxWidth - element.offsetWidth
    const maxY = maxHeight - element.offsetHeight

    const newX = parsePosition(x, maxWidth, element.offsetWidth)
    const newY = parsePosition(y, maxHeight, element.offsetHeight)

    const boundary = unref(isBoundary)

    position.value = {
      x: boundary ? restrict(newX, maxX) : newX,
      y: boundary ? restrict(newY, maxY) : newY,
    }
  }

  const onDrag = (event: MouseEvent) => {
    const element = draggableRef.value
    if (!element) { return }

    let newX = event.clientX - offset.value.x
    let newY = event.clientY - offset.value.y

    const container = containerRef?.value
    if (container) {
      const { left, top } = container.getBoundingClientRect()
      newX -= left
      newY -= top
    }

    setPosition(newX, newY)
  }

  const startDrag = (event: MouseEvent) => {
    if (!draggableRef.value || !unref(isDraggable) || isDragging.value) { return }

    isDragging.value = true

    const rect = draggableRef.value.getBoundingClientRect()
    offset.value.x = event.clientX - rect.left
    offset.value.y = event.clientY - rect.top

    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', stopDrag, { once: true })
  }

  const stopDrag = () => {
    if (!isDragging.value) { return }
    isDragging.value = false

    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
  }

  watch([draggableRef, () => unref(initialPosition)], ([el, newPosition]) => {
    if (!el) { return }

    const x = newPosition?.x ?? position.value.x
    const y = newPosition?.y ?? position.value.y
    setPosition(x, y)

    if (containerRef?.value) {
      containerRef.value.style.position = 'relative'
    }
  }, { deep: true })

  watch(() => unref(isBoundary), (newValue) => {
    if (newValue) {
      setPosition(position.value.x, position.value.y)
    }
  })

  watch(() => unref(isDraggable), (newValue) => {
    if (!newValue) {
      stopDrag()
    }
  })

  onUnmounted(() => {
    stopDrag()
  })

  watch(position, () => {
    positionStyle.value = {
      left: `${position.value.x}px`,
      top: `${position.value.y}px`,
      position: containerRef?.value ? 'absolute' : 'fixed',
    }
  })

  return {
    position,
    positionStyle,
    startDrag,
  }
}
