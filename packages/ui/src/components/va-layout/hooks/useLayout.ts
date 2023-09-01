import { ComputedRef, ExtractPropTypes, InjectionKey, PropType, Ref, computed, inject, onBeforeUnmount, provide, ref, watchEffect } from 'vue'
import { AreaName } from './useGridTemplateArea'

// Unwrap type, e.g.: removes name from type alias and returns the type
type UnwrapType<T> = true extends boolean ? T : never

export type AreaConfig = UnwrapType<{
  absolute?: boolean,
  order?: number,
  fixed?: boolean,
  overlay?: boolean,
}>

export const useLayoutProps = {
  top: {
    type: Object as PropType<AreaConfig>,
    default: () => ({ order: 2 }),
  },
  right: {
    type: Object as PropType<AreaConfig>,
    default: () => ({ order: 1 }),
  },
  left: {
    type: Object as PropType<AreaConfig>,
    default: () => ({ order: 1 }),
  },
  bottom: {
    type: Object as PropType<AreaConfig>,
    default: () => ({ order: 2 }),
  },
}

export type LayoutProps = ExtractPropTypes<typeof useLayoutProps>

type LayoutItem = {
  sizes: DOMRectReadOnly,
}

const VaLayoutKey = 'VaLayout' as unknown as InjectionKey<{
  items: Ref<Record<AreaName, LayoutItem | null>>,
  paddings: ComputedRef<Record<AreaName, number>>,
  orders: ComputedRef<Record<AreaName, number>>,
}>

export const useLayout = (props: ExtractPropTypes<typeof useLayoutProps>) => {
  const items = ref<Record<AreaName, LayoutItem | null>>({
    top: null,
    right: null,
    bottom: null,
    left: null,
  })

  const paddings = computed(() => {
    const { top, right, bottom, left } = items.value
    const { top: topConfig, right: rightConfig, bottom: bottomConfig, left: leftConfig } = props

    return {
      top: top && !topConfig.absolute ? top.sizes.height : 0,
      right: right && !rightConfig.absolute ? right.sizes.width : 0,
      bottom: bottom && !bottomConfig.absolute ? bottom.sizes.height : 0,
      left: left && !leftConfig.absolute ? left.sizes.width : 0,
    }
  })

  const orders = computed(() => ({
    top: props.top.order || 0,
    right: props.right.order || 0,
    bottom: props.bottom.order || 0,
    left: props.left.order || 0,
  }))

  provide(VaLayoutKey, {
    items,
    paddings,
    orders,
  })
}

export const useFixedLayoutChild = (area: AreaName, sizes: Ref<DOMRectReadOnly | null>) => {
  const layout = inject(VaLayoutKey, null)

  if (!layout) {
    throw new Error('VaLayoutChild must be used inside VaLayout')
  }

  watchEffect(() => {
    if (sizes.value) {
      layout.items.value[area] = {
        sizes: sizes.value,
      }
    } else {
      layout.items.value[area] = null
    }
  })

  onBeforeUnmount(() => {
    layout.items.value[area] = null
  })

  return {
    paddings: computed(() => {
      return Object
        .keys(layout.paddings.value)
        .reduce((acc, key) => {
          if (layout.orders.value[key as AreaName] > layout.orders.value[area]) {
            acc[key as AreaName] = layout.paddings.value[key as AreaName]
          }
          return acc
        }, {} as Record<AreaName, number>)
    }),
  }
}
