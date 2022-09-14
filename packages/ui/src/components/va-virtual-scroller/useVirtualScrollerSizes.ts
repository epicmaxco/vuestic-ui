import { PropType, ExtractPropTypes, ref, Ref, shallowRef, computed, watch, onMounted } from 'vue'

import { useEvent } from '../../composables'
import { warn, isParsablePositiveMeasure } from '../../services/utils'

const validateSizeProp = (v: number | string, propName: string) => {
  const isProperValue = isParsablePositiveMeasure(v)

  !isProperValue &&
  warn(`[va-virtual-scroller] ${propName} should be number or parsable int greater or equal to 0. Provided: ${v}.`)

  return isProperValue
}

export const useVirtualScrollerSizesProps = {
  horizontal: { type: Boolean, default: false },
  itemSize: {
    type: [Number, String] as PropType<string | number>,
    default: 0,
    validator: (v: number | string) => { return validateSizeProp(v, 'itemSize') },
  },
  wrapperSize: {
    type: [Number, String] as PropType<string | number>,
    default: 100,
    validator: (v: number | string) => { return validateSizeProp(v, 'wrapperSize') },
  },
}

export const useVirtualScrollerSizes = (
  props: ExtractPropTypes<typeof useVirtualScrollerSizesProps>,
  scrollPosition: Ref<number>,
) => {
  const list = shallowRef<HTMLElement>()
  const wrapper = shallowRef<HTMLElement>()

  const parseSizeValue = (value: number | string) => {
    if (typeof value === 'string') {
      const parsedValue = parseInt(value)

      if (isNaN(parsedValue)) { return 0 }

      return value.endsWith('rem') ? parsedValue * pageFontSize.value : parsedValue
    }
    return value
  }

  const wrapperSize = computed(() => {
    return parseSizeValue(props.wrapperSize)
  })

  const pageFontSize = ref(16)
  const handleWindowResize = () => {
    pageFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
  }
  useEvent('resize', handleWindowResize, true)

  const itemSizeCalculated = ref(0)
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
  onMounted(calcAverageItemsSize)
  watch(scrollPosition, calcAverageItemsSize)
  watch(wrapperSize, calcAverageItemsSize)

  let oldItemSize = 0
  const itemSize = computed(() => {
    const sizeParsed = parseSizeValue(props.itemSize)

    const result = Math.max(sizeParsed, itemSizeCalculated.value, 1)
    const diff = Math.abs(((oldItemSize / result) * 100) - 100)

    /**
     * 5 - empirically derived number, some kind of debounce but without freezes.
     * While recalculating rendered items average size, if difference is too small, this can cause list 'shaking' because of algorithm:
     * `rendering items -> calculating their size -> rebuilding list total size -> items offset -> rendering items`
     * This smoothing is intended to prevent such cases.
     */
    if (diff > 5 || oldItemSize === 0) {
      oldItemSize = result
      return result
    }

    return oldItemSize
  })

  return { list, wrapper, itemSize, wrapperSize }
}
