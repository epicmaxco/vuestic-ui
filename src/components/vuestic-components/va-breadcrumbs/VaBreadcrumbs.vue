<script>
import { ColorThemeMixin } from '../../../services/ColorThemePlugin'
import { AlignMixin } from '../../vuestic-mixins/AlignMixin'
import { ContextPluginMixin, getContextPropValue } from '../../context-test/context-provide/ContextPlugin'

export default {
  name: 'VaBreadcrumbs',
  mixins: [ColorThemeMixin, AlignMixin, ContextPluginMixin],
  props: {
    color: {
      type: String,
      default () {
        return getContextPropValue(this, 'color', 'gray')
      },
    },
    separatorColor: {
      type: String,
      default () {
        return getContextPropValue(this, 'separatorColor', null)
      },
    },
    activeColor: {
      type: String,
      default () {
        return getContextPropValue(this, 'activeColor', null)
      },
    },
    separator: {
      type: String,
      default () {
        return getContextPropValue(this, 'separator', '/')
      },
    },
  },
  computed: {
    computedStyles () {
      return this.alignComputed
    },
    computedThemesSeparatorColor () {
      return this.separatorColor ? this.computeColor(this.separatorColor) : this.colorComputed
    },
    computedThemesActiveColor () {
      return this.activeColor ? this.computeColor(this.activeColor) : this.colorComputed
    },
  },
  render (createElement) {
    const childNodeFilter = ({ tag } = null) => tag ? tag.match(/VaBreadcrumbsItem$/) : false

    const childNodes = this.$slots.default.filter(childNodeFilter) || []

    const childNodesLength = childNodes.length
    const isLastIndexChildNodes = (index) => index === childNodesLength - 1

    const separatorNode = this.$slots.separator || [this.separator]

    const createSeparatorComponent = () => createElement(
      'span',
      {
        staticClass: 'va-breadcrumbs__separator',
        class: this.computedClass,
        style: {
          color: this.computedThemesSeparatorColor,
        },
      },
      separatorNode
    )

    const isDisabledChild = (child) => {
      const childPropData = child && child.componentOptions && child.componentOptions.propsData
      if (!childPropData || !childPropData.hasOwnProperty('disabled')) {
        return false
      }

      if (childPropData.disabled === '') { // NOTE: by default empty attribute is ''
        return true
      }

      return Boolean(childPropData.disabled)
    }

    const createChildComponent = (child, index) => createElement(
      'span', {
        staticClass: 'va-breadcrumbs__item',
        style: {
          color: (!isLastIndexChildNodes(index) && !isDisabledChild(child)) ? this.computedThemesActiveColor : null,
        },
      },
      [child]
    )

    const children = []

    if (childNodesLength) {
      childNodes.forEach((child, index) => {
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
  },
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
