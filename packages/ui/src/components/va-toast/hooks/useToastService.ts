import { computed, getCurrentInstance, onBeforeUnmount, onMounted, Ref, ref, VNode } from 'vue'
import { ToastOptions } from '../types'

const GAP = 5

// Expect as client-side used only
const toastInstances = ref([]) as Ref<VNode[]>

type OptionKeys = keyof ToastOptions;

const getNodeProps = (vNode: VNode): Record<OptionKeys, any> => {
  return (vNode.component?.props as Record<OptionKeys, any>) || {}
}

const getTranslateValue = (item: VNode) => {
  if (item.el) {
    return (item.el.offsetHeight + GAP)
  }
  return 0
}

export const useToastService = (props: {
  position: NonNullable<ToastOptions['position']>,
}) => {
  const currentInstance = getCurrentInstance()!

  const yOffset = computed(() => {
    const currentIndex = toastInstances.value.findIndex((instance) => instance === currentInstance.vnode)

    if (currentIndex === -1) { return 0 }

    return toastInstances.value.slice(currentIndex + 1).reduce((acc, instance) => {
      const {
        position: itemPosition,
      } = getNodeProps(instance)

      const { position } = props

      if (position === itemPosition) {
        return getTranslateValue(instance) + acc
      }

      return acc
    }, 0)
  })

  onMounted(() => {
    toastInstances.value.unshift(currentInstance.vnode)
  })

  onBeforeUnmount(() => {
    toastInstances.value = toastInstances.value.filter((item) => item !== currentInstance.vnode)
  })

  return {
    yOffset,
    updateYOffset: () => {
      toastInstances.value = toastInstances.value.filter((item) => item !== currentInstance.vnode)
    },
  }
}
