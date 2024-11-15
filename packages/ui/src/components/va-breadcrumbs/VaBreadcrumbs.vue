<script lang="ts">
import { computed, defineComponent, Fragment, h, ref, VNode } from 'vue'

import {
  useComponentPresetProp,
  useAlignable,
  useAlignableProps,
  useColors,
  useTranslation, useTranslationProp,
} from '../../composables'

import { hasOwnProperty } from '../../utils/has-own-property'
import { resolveSlot } from '../../utils/resolveSlot'

export default defineComponent({
  name: 'VaBreadcrumbs',
  props: {
    ...useAlignableProps,
    ...useComponentPresetProp,
    separator: { type: String, default: '/' },
    color: { type: String, default: null },
    disabledColor: { type: String, default: 'secondary' },
    activeColor: { type: String, default: null },
    separatorColor: { type: String, default: null },
    ariaLabel: useTranslationProp('$t:breadcrumbs'),
  },
  setup (props, { slots }) {
    const { alignComputed } = useAlignable(props)

    const { getColor } = useColors()
    const computedThemesSeparatorColor = computed(() => {
      return props.separatorColor ? getColor(props.separatorColor) : null
    })
    const computedThemesColor = computed(() => props.color ? getColor(props.color) : null)
    const computedThemesActiveColor = computed(() => {
      return props.activeColor ? getColor(props.activeColor) : null
    })

    const childNodeFilter = (result: VNode[], node: VNode) => {
      const nodes = node && node.type === Fragment && node.children ? node.children as VNode[] : [node]

      return [
        ...result,
        ...nodes.filter((node?: VNode) => !!(node?.type as any)?.name?.match(/VaBreadcrumbsItem$/)),
      ]
    }

    const createSeparatorComponent = () => {
      // Temp fix for https://github.com/intlify/vue-i18n-next/issues/412
      // `separatorNode` can be moved outside this method after update vuestic's minimal vue version to 3.1.0
      // testing: have to monitor errors after leaving breadcrumbs page in doc
      const separatorNode = resolveSlot(slots.separator) || [props.separator]

      return h('span', {
        'aria-hidden': true,
        class: ['va-breadcrumbs__separator'],
        style: [{ color: computedThemesSeparatorColor.value }],
      }, separatorNode)
    }

    const isDisabledChild = (child: VNode) => {
      const childPropData = child?.props
      if (!childPropData || !hasOwnProperty(childPropData, 'disabled')) {
        return false
      }

      if (childPropData.disabled === '') { // NOTE: by default empty attribute is ''
        return true
      }

      return Boolean(childPropData.disabled)
    }

    const isAllChildLinks = ref(true)
    const getChildren = () => {
      const defaultSlotContent = resolveSlot(slots.default)
      if (!defaultSlotContent) { return }
      const childNodes = defaultSlotContent.reduce(childNodeFilter, []) || []
      const childNodesLength = childNodes.length
      const isLastIndexChildNodes = (index: number) => index === childNodesLength - 1
      const isChildLink = (child: VNode) => {
        const childPropData = child?.props
        if (!childPropData || !hasOwnProperty(childPropData, 'to')) {
          return false
        }

        return !!(childPropData.to && !childPropData.disabled)
      }

      const createChildComponent = (child: VNode, index: number) => h(
        'span', {
          class: ['va-breadcrumbs__item', { 'va-breadcrumbs__item--disabled': isDisabledChild(child) }],
          'aria-current': (isLastIndexChildNodes(index) && isChildLink(child)) ? 'location' : false,
          style: {
            color: isDisabledChild(child)
              ? getColor(props.disabledColor)
              : isLastIndexChildNodes(index) ? computedThemesActiveColor.value : computedThemesColor.value,
          },
        },
        [child],
      )

      const children = [] as VNode[]

      if (childNodesLength) {
        childNodes.forEach((child: VNode, index: number) => {
          if (isAllChildLinks.value && !isChildLink(child)) {
            isAllChildLinks.value = false
          }

          children.push(createChildComponent(child, index))

          if (!isLastIndexChildNodes(index)) {
            children.push(createSeparatorComponent())
          }
        })
      }

      return children
    }

    const { tp } = useTranslation()

    return () => h('div', {
      class: 'va-breadcrumbs',
      style: alignComputed.value,
      role: isAllChildLinks.value ? 'navigation' : undefined,
      'aria-label': (isAllChildLinks.value ? tp(props.ariaLabel) : undefined),
    }, getChildren())
  },
})
</script>

<style lang="scss">
@import "variables";

.va-breadcrumbs {
  display: var(--va-breadcrumbs-display);
  width: var(--va-breadcrumbs-width);
  justify-content: var(--va-breadcrumbs-justify-content);
  font-family: var(--va-font-family);

  &__item {
    display: var(--va-breadcrumbs-item-display);
  }

  &__separator {
    padding: var(--va-breadcrumbs-separator-padding);
    display: var(--va-breadcrumbs-separator-display);
  }
}
</style>
