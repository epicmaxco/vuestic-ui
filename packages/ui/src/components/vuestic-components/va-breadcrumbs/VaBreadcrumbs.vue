<script lang="ts">
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
// @ts-ignore
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'
import {
  ContextPluginMixin,
  getContextPropValue,
} from '../../context-test/context-provide/ContextPlugin'
import { hasOwnProperty } from '../../../services/utils'
import { Mixins, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'VaBreadcrumbs' })
export default class VaBreadcrumbs extends Mixins(ColorThemeMixin, AlignMixin, ContextPluginMixin) {
    @Prop({
      type: String,
      default () {
        return getContextPropValue(this as any, 'separator', '/' as any)
      },
    }) readonly separator!: string;

    @Prop({
      type: String,
      default () {
        return getContextPropValue(this as any, 'color', 'gray' as any)
      },
    }) readonly color!: string;

    @Prop({
      type: String,
      default () {
        return getContextPropValue(this as any, 'activeColor', null as any)
      },
    }) readonly activeColor!: string;

    @Prop({
      type: String,
      default () {
        return getContextPropValue(this as any, 'separatorColor', null as any)
      },
    }) readonly separatorColor!: string

    get computedStyles () {
      return (this as any).alignComputed
    }

    get computedThemesSeparatorColor () {
      return this.separatorColor ? this.computeColor(this.separatorColor) : this.colorComputed
    }

    get computedThemesActiveColor () {
      return this.activeColor ? this.computeColor(this.activeColor) : this.colorComputed
    }

    render (createElement: Vue.CreateElement) {
      const childNodeFilter = ({ tag }: any = null) => tag ? tag.match(/VaBreadcrumbsItem$/) : false

      const childNodes = this.$slots.default?.filter(childNodeFilter) || [] as any[]

      const childNodesLength = childNodes.length
      const isLastIndexChildNodes = (index: number) => index === childNodesLength - 1

      const separatorNode = this.$slots.separator || [this.separator]

      const createSeparatorComponent = () => createElement(
        'span',
        {
          staticClass: 'va-breadcrumbs__separator',
          class: (this as any).computedClass,
          style: {
            color: this.computedThemesSeparatorColor,
          },
        },
        separatorNode,
      )

      const isDisabledChild = (child: any) => {
        const childPropData = child?.componentOptions?.propsData
        if (!childPropData || !hasOwnProperty(childPropData, 'disabled')) {
          return false
        }

        if (childPropData.disabled === '') { // NOTE: by default empty attribute is ''
          return true
        }

        return Boolean(childPropData.disabled)
      }

      const createChildComponent = (child: any, index: number) => createElement(
        'span', {
          staticClass: 'va-breadcrumbs__item',
          style: {
            color: (!isLastIndexChildNodes(index) && !isDisabledChild(child)) ? this.computedThemesActiveColor : null,
          },
        },
        [child],
      )

      const children = [] as any[]

      if (childNodesLength) {
        childNodes.forEach((child: any, index: number) => {
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
