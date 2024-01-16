import { useMount } from '../../../composables/useMount'
import { VaMenu } from '../va-menu'
import { ExtractComponentPropTypes } from '../../../utils/component-options'
import { onBeforeUnmount, computed } from 'vue'

type OmitMenuProps = 'modelValue' | 'anchor' | 'cursor' | 'stateful' | 'preset'

/** This hook can be used without plugin used */
export const useMenu = () => {
  const { createInstance } = useMount(VaMenu)
  const instances: (() => void)[] = []

  const destroyAll = () => instances.forEach(destroy => destroy())

  const show = (props: Omit<ExtractComponentPropTypes<typeof VaMenu>, OmitMenuProps> & { event: MouseEvent }) => {
    destroyAll()

    props.event.preventDefault()

    const destroy = createInstance({
      ...props,
      anchor: props.event.target,
      cursor: {
        getBoundingClientRect () {
          const resX = props.event.clientX
          const resY = props.event.clientY
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
        contextElement: props.event.target,
      },
      stateful: true,
      modelValue: true,
      preset: 'context',
      onBeforeUnmount: () => {
        destroy()
      },
    })

    instances.push(destroy)

    return () => {
      destroy()
      instances.splice(instances.indexOf(destroy), 1)
    }
  }

  onBeforeUnmount(destroyAll)

  return {
    show,
  }
}
