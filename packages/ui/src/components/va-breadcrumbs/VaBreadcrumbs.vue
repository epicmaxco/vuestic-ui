<script lang="ts">
import { defineComponent, computed, PropType, VNode, h, Fragment } from 'vue'

import { useAlign, useAlignProps } from '../../composables/useAlign'
import { useColors } from '../../composables/useColor'
import { hasOwnProperty } from '../../services/utils'

export default defineComponent({
  name: 'VaBreadcrumbs',
  props: {
    ...useAlignProps,
    separator: { type: String as PropType<string>, default: '/' },
    color: { type: String as PropType<string>, default: 'gray' },
    activeColor: { type: String as PropType<string>, default: null },
    separatorColor: { type: String as PropType<string>, default: null },
  },
  setup (props, { slots }) {
    const { alignComputed } = useAlign(props)

    const { getColor } = useColors()
    const computedThemesSeparatorColor = computed(() => {
      return props.separatorColor ? getColor(props.separatorColor) : getColor(props.color)
    })
    const computedThemesActiveColor = computed(() => {
      return props.activeColor ? getColor(props.activeColor) : getColor(props.color)
    })

    const childNodeFilter = (result: VNode[], node?: VNode) => {
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
      const separatorNode = slots.separator ? slots.separator() : [props.separator]

      return h('span', {
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

    const getChildren = () => {
      const childNodes = (slots as any)?.default()?.reduce(childNodeFilter, []) || []
      const childNodesLength = childNodes.length
      const isLastIndexChildNodes = (index: number) => index === childNodesLength - 1

      const createChildComponent = (child: VNode, index: number) => h(
        'span', {
          class: 'va-breadcrumbs__item',
          style: {
            color: (!isLastIndexChildNodes(index) && !isDisabledChild(child)) ? computedThemesActiveColor.value : null,
          },
        },
        [child],
      )

      const children = [] as VNode[]

      if (childNodesLength) {
        childNodes.forEach((child: VNode, index: number) => {
          children.push(createChildComponent(child, index))

          if (!isLastIndexChildNodes(index)) {
            children.push(createSeparatorComponent())
          }
        })
      }

      return children
    }

    return () => h('div', {
      class: 'va-breadcrumbs',
      style: alignComputed.value,
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
