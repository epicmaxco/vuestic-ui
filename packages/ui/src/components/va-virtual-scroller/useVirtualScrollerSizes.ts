import {
  PropType,
  ExtractPropTypes,
  ref,
  Ref,
  shallowRef,
  computed,
  watch,
  onMounted,
  getCurrentInstance,
} from 'vue'

import { useEvent, useParsableMeasure } from '../../composables'

import { warn } from '../../utils/console'

const { isParsablePositiveMeasure, parseSizeValue } = useParsableMeasure()

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
    type: [Number, String] as PropType<number | string | 'auto'>,
    default: 100,
    validator: (v: number | string | 'auto') => {
      return v === 'auto' || validateSizeProp(v, 'wrapperSize')
    },
  },
}

export const useVirtualScrollerSizes = (
  props: ExtractPropTypes<typeof useVirtualScrollerSizesProps>,
  scrollPosition: Ref<number>,
) => {
  const list = shallowRef<HTMLElement>()
  const wrapper = shallowRef<HTMLElement>()

  const clientSizeMeasure = computed(() => props.horizontal ? 'clientWidth' : 'clientHeight')

  const wrapperSize = computed(() => {
    if (props.wrapperSize === 'auto') {
      return wrapper.value?.[clientSizeMeasure.value] || 0
    }

    return parseSizeValue(props.wrapperSize, pageFontSize)
  })

  const pageFontSize = ref(16)
  const handleWindowResize = () => {
    pageFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize)

    calcAverageItemsSize()
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
      currentChild && sizes.push(currentChild[clientSizeMeasure.value])
    }

    itemSizeCalculated.value = itemsAmount
      ? Math.trunc(sizes.reduce((acc, el) => acc + el, 0) / (itemsAmount - 1))
      : 0
  }

  const instance = getCurrentInstance()
  onMounted(() => {
    if (!list.value) { list.value = instance?.parent?.refs?.list as HTMLElement | undefined }
    calcAverageItemsSize()
  })
  watch(scrollPosition, calcAverageItemsSize)
  watch(wrapperSize, calcAverageItemsSize)

  let oldItemSize = 0
  const itemSize = computed(() => {
    const sizeParsed = parseSizeValue(props.itemSize, pageFontSize)

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
