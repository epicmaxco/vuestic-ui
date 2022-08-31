import { PropType, ExtractPropTypes, ref, Ref, shallowRef, computed, watch, onMounted } from 'vue'

import { useResizeObserver } from '../../composables'

export const useVirtualScrollerSizesProps = {
  horizontal: { type: Boolean, default: false },
  itemSize: {
    type: [Number, String] as PropType<string | number>,
    default: 24,
    validator: (v: number | string) => {
      if (typeof v === 'string') { return (!isNaN(+v) || v.endsWith('px') || v.endsWith('rem')) && parseInt(v) > 0 }
      return v > 0
    },
  },
}

export const useVirtualScrollerSizes = (
  props: ExtractPropTypes<typeof useVirtualScrollerSizesProps>,
  currentScroll: Ref<number>,
) => {
  const wrapper = shallowRef<HTMLElement>()
  const list = shallowRef<HTMLElement>()

  const itemSizeCalculated = ref<number>(0)
  const wrapperSize = ref<number>(0)
  const bodyFontSize = ref<number>(16)

  const calcAverageItemsSize = () => {
    if (!list.value) { return }

    const sizes: number[] = []
    const itemsList = list.value.children
    const itemsAmount = itemsList.length

    for (let i = 0; i < itemsAmount; i++) {
      const currentChild = list.value.children.item(i)
      currentChild && sizes.push(currentChild[props.horizontal ? 'clientWidth' : 'clientHeight'])
    }

    itemSizeCalculated.value = itemsAmount
      ? Math.trunc(sizes.reduce((acc, el) => acc + el, 0) / (itemsAmount - 1))
      : 0
  }
  onMounted(() => {
    calcAverageItemsSize()
    handleWrapperResize()
  })
  watch(currentScroll, calcAverageItemsSize)

  const handleWrapperResize = () => {
    if (!wrapper.value) { return }

    wrapperSize.value = props.horizontal ? wrapper.value.offsetWidth : wrapper.value.offsetHeight
    bodyFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
    calcAverageItemsSize()
  }
  useResizeObserver([wrapper], handleWrapperResize)

  let oldItemSize = 0
  const itemSize = computed(() => {
    if (typeof props.itemSize === 'string') {
      const sizeParsed = parseInt(props.itemSize)
      return props.itemSize.endsWith('rem') ? sizeParsed * bodyFontSize.value : sizeParsed
    }

    const result = Math.max(props.itemSize, itemSizeCalculated.value)
    const diff = Math.abs(((oldItemSize / result) * 100) - 100)

    if (diff > 5 || oldItemSize === 0) {
      oldItemSize = result
      return result
    }

    return oldItemSize
  })

  return { list, wrapper, wrapperSize, itemSize }
}
