<script lang="ts">
import { VNode, h, Fragment } from 'vue'
import { Options, prop, Vue, mixins } from 'vue-class-component'

import { hasOwnProperty } from '../../../services/utils'
import ColorMixin from '../../../services/color-config/ColorMixin'
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'

class BreadcrumbsProps {
  separator = prop<string>({ type: String, default: '/' })
  color = prop<string>({ type: String, default: 'gray' })
  activeColor = prop<string>({ type: String, default: null })
  separatorColor = prop<string>({ type: String, default: null })
}

const BreadcrumbsPropsMixin = Vue.with(BreadcrumbsProps)

@Options({
  name: 'VaBreadcrumbs',
})
export default class VaBreadcrumbs extends mixins(
  ColorMixin,
  AlignMixin,
  BreadcrumbsPropsMixin,
) {
  get computedStyles () {
    return this.alignComputed
  }

  get computedThemesSeparatorColor () {
    return this.separatorColor ? this.computeColor(this.separatorColor) : this.colorComputed
  }

  get computedThemesActiveColor () {
    return this.activeColor ? this.computeColor(this.activeColor) : this.colorComputed
  }

  render () {
    // TODO: use provide/inject for this not to stick to component's name
    const childNodeFilter = (result: VNode[], node?: VNode) => {
      const nodes = node && node.type === Fragment && node.children ? node.children as VNode[] : [node]

      return [
        ...result,
        ...nodes.filter((node?: VNode) => !!(node?.type as any)?.name?.match(/VaBreadcrumbsItem$/)),
      ]
    }

    const childNodes = (this.$slots as any)?.default()?.reduce(childNodeFilter, []) || []

    const childNodesLength = childNodes.length
    const isLastIndexChildNodes = (index: number) => index === childNodesLength - 1

    const separatorNode = (this.$slots.separator ? this.$slots.separator() : 0) || [this.separator]

    const createSeparatorComponent = () => h(
      'span',
      {
        class: ['va-breadcrumbs__separator'],
        style: [{ color: this.computedThemesSeparatorColor }],
      },
      separatorNode,
    )

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

    const createChildComponent = (child: VNode, index: number) => h(
      'span', {
        class: 'va-breadcrumbs__item',
        style: {
          color: (!isLastIndexChildNodes(index) && !isDisabledChild(child)) ? this.computedThemesActiveColor : null,
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

    return h('div', {
      class: 'va-breadcrumbs',
      style: { ...this.computedStyles },
    }, children)
  }
}
</script>

<style lang="scss">
.va-breadcrumbs {
  display: flex;
  width: 100%;
  justify-content: center;

  &__item {
    display: inline-flex;
  }

  &__separator {
    padding: 0 0.5rem;
    display: inline-flex;
  }
}

</style>
