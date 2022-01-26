<script lang="ts">
import { defineComponent, computed, PropType, VNode, h, Fragment } from 'vue'

import { useAlign, useAlignProps } from '../../composables/useAlign'
import { useColor, useComputedColor } from '../../composables/useColor'
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

    const { computeColor } = useColor(props)
    const colorComputed = useComputedColor(props.color)
    const computedThemesSeparatorColor = computed(() => {
      return props.separatorColor ? computeColor(props.separatorColor) : colorComputed.value
    })
    const computedThemesActiveColor = computed(() => {
      return props.activeColor ? computeColor(props.activeColor) : colorComputed.value
    })

    const childNodeFilter = (result: VNode[], node?: VNode) => {
      const nodes = node && node.type === Fragment && node.children ? node.children as VNode[] : [node]

      return [
        ...result,
        ...nodes.filter((node?: VNode) => !!(node?.type as any)?.name?.match(/VaBreadcrumbsItem$/)),
      ]
    }

    const createSeparatorComponent = () => {
      // Temp fix for https://github.com/vuejs/vue-next/issues/3666. Move `separatorNode` outside this method.
      const separatorNode = (slots.separator ? slots.separator() : 0) || [props.separator]

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
