<script lang="ts">
import { Mixins } from 'vue-property-decorator'
import { hasOwnProperty } from '../../../services/utils'
import { VNode, h } from 'vue'

import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'
import {
  makeContextablePropsMixin,
} from '../../context-test/context-provide/ContextPlugin'
import { Options } from 'vue-class-component'

const BreadcrumbsPropsMixin = makeContextablePropsMixin({
  separator: { type: String, default: '/' },
  color: { type: String, default: 'gray' },
  activeColor: { type: String, default: null },
  separatorColor: { type: String, default: null },
})

@Options({
  name: 'VaBreadcrumbs',
})
export default class VaBreadcrumbs extends Mixins(
  ColorThemeMixin,
  AlignMixin,
  BreadcrumbsPropsMixin,
) {
  get computedStyles () {
    return this.alignComputed
  }

  get computedThemesSeparatorColor () {
    return this.separatorColor ? this.computeColor(this.c_separatorColor) : this.colorComputed
  }

  get computedThemesActiveColor () {
    return this.activeColor ? this.computeColor(this.c_activeColor) : this.colorComputed
  }

  render () {
    // const childNodeFilter = (node?: VNode) => !!node?.tag?.match(/VaBreadcrumbsItem$/)
    const childNodeFilter = (node?: VNode) => !!(node?.type as any)?.name?.match(/VaBreadcrumbsItem$/)

    const childNodes = (this.$slots as any)?.default()?.filter(childNodeFilter) || []
    // .?default()?.filter(childNodeFilter) || []

    const childNodesLength = childNodes.length
    const isLastIndexChildNodes = (index: number) => index === childNodesLength - 1

    const separatorNode = (this.$slots.separator ? this.$slots.separator() : 0) || [this.separator]

    const createSeparatorComponent = () => h(
      'span',
      {
        class: ['va-breadcrumbs__separator',
        // this.computedClass
        ],
        style: [{ color: this.computedThemesSeparatorColor }],
      },
      separatorNode,
    )

    const isDisabledChild = (child: VNode) => {
      // const childPropData = child?.componentOptions?.propsData as RecordPropsDefinition<VaBreadcrumbsItem>
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
