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
    default: () => ({}),
  },
  right: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
  left: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
  bottom: {
    type: Object as PropType<AreaConfig>,
    default: () => ({}),
  },
}

export type LayoutProps = ExtractPropTypes<typeof useLayoutProps>

type LayoutItem = {
  sizes: DOMRectReadOnly,
  order: number,
  absolute: boolean,
}

const VaLayoutKey = 'VaLayout' as unknown as InjectionKey<{
  items: Ref<Record<AreaName, LayoutItem | null>>,
  paddings: ComputedRef<Record<AreaName, number>>,
  orders: ComputedRef<Record<AreaName, number>>,
}>

export const useLayout = () => {
  const items = ref<Record<AreaName, LayoutItem | null>>({
    top: null,
    right: null,
    bottom: null,
    left: null,
  })

  const paddings = computed(() => ({
    top: items.value.top && !items.value.top.absolute ? items.value.top.sizes.height : 0,
    right: items.value.right && !items.value.right.absolute ? items.value.right.sizes.width : 0,
    bottom: items.value.bottom && !items.value.bottom.absolute ? items.value.bottom.sizes.height : 0,
    left: items.value.left && !items.value.left.absolute ? items.value.left.sizes.width : 0,
  }))

  const orders = computed(() => ({
    top: items.value.top ? items.value.top.order : 0,
    right: items.value.right ? items.value.right.order : 0,
    bottom: items.value.bottom ? items.value.bottom.order : 0,
    left: items.value.left ? items.value.left.order : 0,
  }))

  provide(VaLayoutKey, {
    items,
    paddings,
    orders,
  })
}

export const useLayoutChild = (area: AreaName, sizes: Ref<DOMRectReadOnly | null>, order: Ref<number>, absolute: Ref<boolean>) => {
  const layout = inject(VaLayoutKey, null)

  if (!layout) {
    throw new Error('VaLayoutChild must be used inside VaLayout')
  }

  watchEffect(() => {
    if (sizes.value) {
      layout.items.value[area] = {
        absolute: absolute.value,
        sizes: sizes.value,
        order: order.value,
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
      return Object.keys(layout.paddings.value).reduce((acc, key) => {
        if (layout.orders.value[key as AreaName] > order.value) {
          acc[key as AreaName] = layout.paddings.value[key as AreaName]
        }
        return acc
      }, {} as Record<AreaName, number>)
    }),
  }
}
