<script lang="ts">
import { VNode, VNodeChildren } from 'vue'
import { RecordPropsDefinition } from 'vue/types/options'
import { Mixins, Component, Prop } from 'vue-property-decorator'

import { hasOwnProperty } from '../../../services/utils'
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'
import { ColorThemeMixin } from '../../vuestic-mixins/ColorMixin'
import VaBreadcrumbsItem from './VaBreadcrumbsItem.vue'

@Component({
  name: 'VaBreadcrumbs',
})
export default class VaBreadcrumbs extends Mixins(
  ColorThemeMixin,
  AlignMixin,
) {
  @Prop({ type: String, default: '/' }) separator!: string
  @Prop({ type: String, default: 'gray' }) color!: string
  @Prop({ type: String, default: null }) activeColor!: string
  @Prop({ type: String, default: null }) separatorColor!: string

  get computedStyles () {
    return this.alignComputed
  }

  get computedThemesSeparatorColor () {
    return this.separatorColor ? this.computeColor(this.separatorColor) : this.colorComputed
  }

  get computedThemesActiveColor () {
    return this.activeColor ? this.computeColor(this.activeColor) : this.colorComputed
  }

  render (createElement: Vue.CreateElement) {
    const childNodeFilter = (node?: VNode) => !!node?.tag?.match(/VaBreadcrumbsItem$/)

    const childNodes = this.$slots.default?.filter(childNodeFilter) || []

    const childNodesLength = childNodes.length
    const isLastIndexChildNodes = (index: number) => index === childNodesLength - 1

    const separatorNode = this.$slots.separator || [this.separator]

    const createSeparatorComponent = () => createElement(
      'span',
      {
        staticClass: 'va-breadcrumbs__separator',
        style: {
          color: this.computedThemesSeparatorColor,
        },
      },
      separatorNode,
    )

    const isDisabledChild = (child: VNode) => {
      const childPropData = child?.componentOptions?.propsData as RecordPropsDefinition<VaBreadcrumbsItem>
      if (!childPropData || !hasOwnProperty(childPropData, 'disabled')) {
        return false
      }

      if (childPropData.disabled === '') { // NOTE: by default empty attribute is ''
        return true
      }

      return Boolean(childPropData.disabled)
    }

    const createChildComponent = (child: VNode, index: number) => createElement(
      'span', {
        staticClass: 'va-breadcrumbs__item',
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

    return createElement('div', {
      staticClass: 'va-breadcrumbs',
      style: {
        ...this.computedStyles,
      },
    }, children as VNodeChildren)
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
