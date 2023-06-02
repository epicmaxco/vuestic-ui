import { computed, reactive, Ref } from 'vue'
import { useEvent } from '../../composables'

export const useCursorAnchor = (anchorRef: Ref<HTMLElement | undefined>, noUpdate: Ref<boolean>) => {
  const anchor = reactive({ x: 0, y: 0 })
  const mouse = reactive({ x: 0, y: 0 })

  useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
    if (noUpdate.value) { return }
    mouse.x = e.clientX
    mouse.y = e.clientY
    const { x, y } = anchorRef.value!.getBoundingClientRect()
    anchor.x = x
    anchor.y = y
  }, anchorRef)

  return computed(() => {
    return {
      getBoundingClientRect () {
        const { x, y } = anchorRef.value!.getBoundingClientRect()
        const { x: mx, y: my } = mouse
        const { x: ax, y: ay } = anchor
        const shiftX = ax - x
        const shiftY = ay - y
        const resX = mx - shiftX
        const resY = my - shiftY
        return {
          width: 0,
          height: 0,
          x: resX,
          y: resY,
          top: resY,
          right: resX,
          bottom: resY,
          left: resX,
        }
      },
    }
  })
  // computed(() => {
  //   return {
  //     getBoundingClientRect () {
  //       console.log('getBoundingClientRect')
  //       return {
  //         width: 0,
  //         height: 0,
  //         x: 0,
  //         y: 0,
  //         top: 300,
  //         left: 500,
  //         right: 0,
  //         bottom: 0,
  //       }
  //     },
  //     // contextElement: anchor.value,
  //   }
  // })
}

  // console.log(anchorRef)
  //
  // const mouse = reactive({ x: 0, y: 0 })
  //
  // useEvent(['mousemove', 'mousedown', 'mouseup'], (e: MouseEvent) => {
  //   console.log(anchorRef.value?.getBoundingClientRect())
  //   const { x, y } = anchorRef.value!.getBoundingClientRect()
  //   mouse.x = e.clientX - x
  //   mouse.y = e.clientY - y
  //   // mouse.x = e.clientX
  //   // mouse.y = e.clientY
  // }, anchorRef)
  //
  // const mouseOffset = {
  //   x: 0,
  //   y: 0,
  // }
  //
  // watchEffect(() => {
  //   if (noUpdate.value) { return }
  //   mouseOffset.x = mouse.x
  //   mouseOffset.y = mouse.y
  // })
  //
  // return computed(() => {
  //   if (!anchorRef.value) { return undefined }
  //
  //   const target = anchorRef.value
  //
  //   const getBoundingClientRect = () => {
  //     console.log('getBoundingClientRect')
  //     const rect = target.getBoundingClientRect()
  //     const x = rect.left + mouseOffset.x
  //     const y = rect.top + mouseOffset.y
  //
  //     return {
  //       ...rect,
  //       x: x,
  //       y: y,
  //       bottom: y + 1,
  //       right: x + 1,
  //       left: x,
  //       top: y,
  //     }
  //   }

    // if (!anchorRef.value) { return undefined }
    //
    // const clientX = mouse.x
    // const clientY = mouse.y
    //
    // const getBoundingClientRect = () => {
    //   return {
    //     width: 0,
    //     height: 0,
    //     x: clientX,
    //     y: clientY,
    //     top: clientY,
    //     left: clientX,
    //     right: clientX,
    //     bottom: clientY,
    //   }
    // }

    // return {
    //   getBoundingClientRect,
    //   contextElement: anchorRef.value,
    // }

    // return new Proxy<HTMLElement>(target, {
    //   get (target, key: keyof typeof target) {
    //     if (key === 'getBoundingClientRect') {
    //       return getBoundingClientRect
    //     }
    //
    //     return target[key]
    //   },
    // })
//   })
// }
