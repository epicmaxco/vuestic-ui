import { Ref, reactive } from 'vue'
import { useEvent, useWindow } from './'
import { TemplateRef } from '../utils/types/template-ref'

export const useMousePosition = (el?: Ref<TemplateRef>) => {
  const mouse = reactive({ x: 0, y: 0 })

  const onMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  useEvent('mousemove', onMouseMove, el)

  return mouse
}
