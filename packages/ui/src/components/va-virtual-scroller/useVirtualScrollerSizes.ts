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

import { warn } from '../../utils/console'
import { makeLengthProp, isPositiveLengthValue, LengthString, useLengthProp } from '../../composables/std/internal/props/useLengthProp'
const validateSizeProp = (v: number | string, propName: string) => {
  const isProperValue = isPositiveLengthValue(v)

  !isProperValue &&
  warn(`[va-virtual-scroller] ${propName} should be number or parsable int greater or equal to 0. Provided: ${v}.`)

  return isProperValue
}

export const useVirtualScrollerSizesProps = {
  horizontal: { type: Boolean, default: false },
  itemSize: makeLengthProp({ default: 0, validator: (v: LengthString | number) => validateSizeProp(v, 'itemSize') }),
  wrapperSize: makeLengthProp({ type: [Number, String] as PropType<LengthString | number | 'auto'>, default: 100, validator: (v: string | number | 'auto') => v === 'auto' || validateSizeProp(v, 'wrapperSize') }),
}

export const useVirtualScrollerSizes = (
  props: ExtractPropTypes<typeof useVirtualScrollerSizesProps>,
  scrollPosition: Ref<number>,
) => {
  const list = shallowRef<HTMLElement>()
  const wrapper = shallowRef<HTMLElement>()

  const clientSizeMeasure = computed(() => props.horizontal ? 'clientWidth' : 'clientHeight')

  const wrapperSizeNumber = useLengthProp(props, 'wrapperSize')
  const itemSizeNumber = useLengthProp(props, 'itemSize')

  const wrapperSize = computed(() => {
    if (wrapperSizeNumber.value === 'auto') {
      return wrapper.value?.[clientSizeMeasure.value] || 0
    }

    return wrapperSizeNumber.value
  })

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
    const sizeParsed = itemSizeNumber.value

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
